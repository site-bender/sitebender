import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Seed } from "../../types/index.ts"

import generateInteger from "./index.ts"

Deno.test("generateInteger - generates integer within bounds", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(1)(10)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(typeof value, "number")
		assertEquals(Number.isInteger(value), true)
		assertEquals(value >= 1, true)
		assertEquals(value <= 10, true)
	}
})

Deno.test("generateInteger - generates different values for different seeds", () => {
	const seed1: Seed = { value: 12345, path: [] }
	const seed2: Seed = { value: 54321, path: [] }

	const result1 = generateInteger(0)(100)(seed1)
	const result2 = generateInteger(0)(100)(seed2)

	if (isOk(result1) && isOk(result2)) {
		// Different seeds should typically produce different values
		// Though collisions are possible, they should be rare for this range
		assertEquals(result1.right !== result2.right, true)
	}
})

Deno.test("generateInteger - generates same value for same seed (deterministic)", () => {
	const seed: Seed = { value: 99999, path: [] }

	const result1 = generateInteger(1)(100)(seed)
	const result2 = generateInteger(1)(100)(seed)

	if (isOk(result1) && isOk(result2)) {
		assertEquals(result1.right, result2.right)
	}
})

Deno.test("generateInteger - handles min equal to max", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(42)(42)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right, 42)
	}
})

Deno.test("generateInteger - handles negative bounds", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(-10)(-1)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(value >= -10, true)
		assertEquals(value <= -1, true)
	}
})

Deno.test("generateInteger - handles mixed sign bounds", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(-5)(5)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(value >= -5, true)
		assertEquals(value <= 5, true)
	}
})

Deno.test("generateInteger - rejects invalid bounds (min > max)", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(10)(1)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidBounds")
	}
})

Deno.test("generateInteger - rejects NaN for min", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(NaN)(10)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidBounds")
	}
})

Deno.test("generateInteger - rejects NaN for max", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(1)(NaN)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidBounds")
	}
})

Deno.test("generateInteger - rejects Infinity for min", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(Infinity)(10)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidBounds")
	}
})

Deno.test("generateInteger - rejects Infinity for max", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(1)(Infinity)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidBounds")
	}
})

Deno.test("generateInteger - handles large range", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(0)(1000000)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(value >= 0, true)
		assertEquals(value <= 1000000, true)
	}
})

Deno.test("generateInteger - handles zero bounds", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(0)(0)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right, 0)
	}
})

Deno.test("generateInteger - truncates floating point bounds", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateInteger(1.5)(10.9)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(Number.isInteger(value), true)
		assertEquals(value >= 1, true)
		assertEquals(value <= 10, true)
	}
})
