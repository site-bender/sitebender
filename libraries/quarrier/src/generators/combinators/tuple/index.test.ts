import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

import type { ShrinkTree } from "../../../types/index.ts"

import createSeed from "../../../random/createSeed/index.ts"
import boolean from "../../primitives/boolean/index.ts"
import integer from "../../primitives/integer/index.ts"
import string from "../../primitives/string/index.ts"
import tuple from "./index.ts"

Deno.test("tuple: generates tuple with correct types", () => {
	const gen = tuple([
		integer(0, 100),
		boolean,
		string({ minLength: 1, maxLength: 5 }),
	])
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(result.value.length, 3)
	assertEquals(typeof result.value[0], "number")
	assertEquals(typeof result.value[1], "boolean")
	assertEquals(typeof result.value[2], "string")
})

Deno.test("tuple: generates empty tuple", () => {
	const gen = tuple([])
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(result.value.length, 0)
	assertEquals(result.value, [])
})

Deno.test("tuple: single element tuple", () => {
	const gen = tuple([integer(10, 20)])
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	assertEquals(result.value.length, 1)
	assertEquals(result.value[0] >= 10 && result.value[0] <= 20, true)
})

Deno.test("tuple: deterministic generation", () => {
	const gen = tuple([integer(0, 100), boolean, integer(0, 10)])
	const seedResult1 = createSeed(12345)
	const seedResult2 = createSeed(12345)
	if (seedResult1._tag === "Error" || seedResult2._tag === "Error") {
		throw new Error("Invalid seed")
	}

	const result1 = gen.next(seedResult1.value)
	const result2 = gen.next(seedResult2.value)

	assertEquals(result1.value, result2.value)
})

Deno.test("tuple: shrinks tuple elements", () => {
	const gen = tuple([integer(0, 100), integer(0, 200)])
	const original = [50, 150] as [number, number]
	const shrinkTree = gen.shrink(original)

	assertEquals(shrinkTree.value, original)
	const children = shrinkTree.children()

	// Should have shrinks available
	assertEquals(children.length > 0, true)

	// Should shrink individual elements
	const hasShrunkFirst = children.some((child: ShrinkTree<[number, number]>) =>
		child.value[0] !== original[0] && child.value[1] === original[1]
	)
	const hasShrunkSecond = children.some((child: ShrinkTree<[number, number]>) =>
		child.value[0] === original[0] && child.value[1] !== original[1]
	)

	assertEquals(hasShrunkFirst, true)
	assertEquals(hasShrunkSecond, true)
})

Deno.test("tuple: shrinks empty tuple to no children", () => {
	const gen = tuple([])
	const shrinkTree = gen.shrink([])

	assertEquals(shrinkTree.value, [])
	assertEquals(shrinkTree.children().length, 0)
})

Deno.test("tuple: parses valid tuples", () => {
	const gen = tuple([integer(0, 100), boolean])

	const result1 = gen.parse!([42, true])
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, [42, true])
	}

	const result2 = gen.parse!([0, false])
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, [0, false])
	}
})

Deno.test("tuple: rejects tuples with wrong length", () => {
	const gen = tuple([integer(0, 100), boolean])

	const result1 = gen.parse!([42])
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.type, "ValidationFailed")
	}

	const result2 = gen.parse!([42, true, "extra"])
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.type, "ValidationFailed")
	}
})

Deno.test("tuple: rejects non-arrays", () => {
	const gen = tuple([integer(0, 100), boolean])

	const result = gen.parse!("not an array")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "TypeMismatch")
	}
})

Deno.test("tuple: rejects tuples with invalid element types", () => {
	const gen = tuple([integer(0, 100), boolean])

	const result = gen.parse!(["not a number", true])
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
	}
})

Deno.test("tuple: size calculation includes all element sizes", () => {
	const gen = tuple([
		integer(0, 1000),
		boolean,
		string({ minLength: 5, maxLength: 5 }),
	])
	const seedResult = createSeed(42)
	if (seedResult._tag === "Error") throw new Error("Invalid seed")
	const seed = seedResult.value
	const result = gen.next(seed)

	// Size should be sum of element sizes
	assertEquals(result.size >= 3, true) // At least 1 for each element
})

Deno.test("tuple: property test - maintains tuple length", () => {
	fc.assert(
		fc.property(fc.integer(), (seedValue) => {
			const gen = tuple([integer(0, 100), boolean, integer(-10, 10)])
			const seedResult = createSeed(seedValue)
			if (seedResult._tag === "Error") return true

			const result = gen.next(seedResult.value)
			return result.value.length === 3
		}),
	)
})
