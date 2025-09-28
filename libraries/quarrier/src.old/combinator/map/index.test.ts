import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Generator, Seed } from "../../types/index.ts"

import generateInteger from "../../arbitrary/generateInteger/index.ts"
import map from "./index.ts"

Deno.test("map - transforms generated values", () => {
	// Create a simple integer generator
	const intGenerator: Generator<number> = generateInteger(1)(10)

	// Map to double the value
	const doubleGenerator = map((n: number) => n * 2)(intGenerator)

	const seed: Seed = { value: 12345, path: [] }
	const result = doubleGenerator(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		// Should be double of an integer in range [1,10], so [2,20]
		assertEquals(value >= 2, true)
		assertEquals(value <= 20, true)
		assertEquals(value % 2, 0) // Should be even
	}
})

Deno.test("map - preserves determinism", () => {
	const intGenerator: Generator<number> = generateInteger(0)(100)

	// Map to string
	const stringGenerator = map((n: number) => `value-${n}`)(intGenerator)

	const seed: Seed = { value: 99999, path: [] }
	const result1 = stringGenerator(seed)
	const result2 = stringGenerator(seed)

	if (isOk(result1) && isOk(result2)) {
		assertEquals(result1.right, result2.right)
	}
})

Deno.test("map - propagates errors from underlying generator", () => {
	// Create a generator that always fails
	const failingGenerator: Generator<number> = (_seed: Seed) =>
		err({ type: "GenerationFailed" as const, reason: "Test failure" })

	const mappedGenerator = map((n: number) => n * 2)(failingGenerator)

	const seed: Seed = { value: 12345, path: [] }
	const result = mappedGenerator(seed)

	assertEquals(isError(result), true)
	if (isError(result)) {
		assertEquals(result.left.type, "GenerationFailed")
	}
})

Deno.test("map - handles complex transformations", () => {
	const intGenerator: Generator<number> = generateInteger(1)(5)

	// Map to object
	const objectGenerator = map((n: number) => ({
		original: n,
		doubled: n * 2,
		squared: n * n,
		isEven: n % 2 === 0,
	}))(intGenerator)

	const seed: Seed = { value: 7777, path: [] }
	const result = objectGenerator(seed)

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		const obj = result.right
		assertEquals(typeof obj, "object")
		assertEquals(obj.doubled, obj.original * 2)
		assertEquals(obj.squared, obj.original * obj.original)
		assertEquals(obj.isEven, obj.original % 2 === 0)
	}
})

Deno.test("map - composes with multiple maps", () => {
	const intGenerator: Generator<number> = generateInteger(1)(10)

	// Chain multiple maps
	const doubled = map((n: number) => n * 2)(intGenerator)
	const stringified = map((n: number) => n.toString())(doubled)
	const prefixed = map((s: string) => `num-${s}`)(stringified)

	const seed: Seed = { value: 12345, path: [] }
	const result = prefixed(seed)

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		const value = result.right
		assertEquals(typeof value, "string")
		assertEquals(value.startsWith("num-"), true)
	}
})

Deno.test("map - handles identity function", () => {
	const intGenerator: Generator<number> = generateInteger(1)(100)

	// Identity map should not change values
	const identityGenerator = map((n: number) => n)(intGenerator)

	const seed: Seed = { value: 42, path: [] }
	const original = intGenerator(seed)
	const mapped = identityGenerator(seed)

	if (isOk(original) && isOk(mapped)) {
		assertEquals(original.right, mapped.right)
	}
})

Deno.test("map - works with different types", () => {
	const intGenerator: Generator<number> = generateInteger(0)(1)

	// Map to boolean
	const boolGenerator = map((n: number) => n === 1)(intGenerator)

	const seed1: Seed = { value: 12345, path: [] }
	const seed2: Seed = { value: 54321, path: [] }

	const result1 = boolGenerator(seed1)
	const result2 = boolGenerator(seed2)

	assertEquals(isOk(result1), true)
	assertEquals(isOk(result2), true)

	if (isOk(result1) && isOk(result2)) {
		assertEquals(typeof result1.right, "boolean")
		assertEquals(typeof result2.right, "boolean")
	}
})

Deno.test("map - can be used with pipe for composition", () => {
	const intGenerator: Generator<number> = generateInteger(1)(10)

	// Using map in a more functional way
	const transform = map((n: number) => ({
		value: n,
		isSmall: n <= 5,
		category: n <= 3 ? "low" : n <= 7 ? "medium" : "high",
	}))

	const categorizedGenerator = transform(intGenerator)

	const seed: Seed = { value: 8888, path: [] }
	const result = categorizedGenerator(seed)

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		const obj = result.right
		assertEquals(typeof obj.value, "number")
		assertEquals(typeof obj.isSmall, "boolean")
		assertEquals(["low", "medium", "high"].includes(obj.category), true)
	}
})
