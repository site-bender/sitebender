import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

// import type { Seed } from "../../types/index.ts"

import createSeed from "./index.ts"

Deno.test("createSeed - creates seed from positive integer", () => {
	const result = createSeed(12345)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const seed = result.right
		assertEquals(seed.value, 12345)
		assertEquals(seed.path, [])
	}
})

Deno.test("createSeed - creates seed from zero", () => {
	const result = createSeed(0)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const seed = result.right
		assertEquals(seed.value, 1) // Zero should become 1 for PRNG
		assertEquals(seed.path, [])
	}
})

Deno.test("createSeed - creates deterministic seed from negative integer", () => {
	const result = createSeed(-42)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const seed = result.right
		// Negative numbers should be made positive deterministically
		assertEquals(seed.value, 42)
		assertEquals(seed.path, [])
	}
})

Deno.test("createSeed - creates different seeds for different inputs", () => {
	const result1 = createSeed(123)
	const result2 = createSeed(456)

	if (isOk(result1) && isOk(result2)) {
		const seed1 = result1.right
		const seed2 = result2.right

		// Different inputs should produce different seeds
		assertEquals(seed1.value !== seed2.value, true)
	}
})

Deno.test("createSeed - creates same seed for same input (deterministic)", () => {
	const result1 = createSeed(999)
	const result2 = createSeed(999)

	if (isOk(result1) && isOk(result2)) {
		const seed1 = result1.right
		const seed2 = result2.right

		// Same input should always produce same seed
		assertEquals(seed1.value, seed2.value)
		assertEquals(seed1.path, seed2.path)
	}
})

Deno.test("createSeed - handles maximum safe integer", () => {
	const result = createSeed(Number.MAX_SAFE_INTEGER)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const seed = result.right
		// Should handle large numbers gracefully
		assertEquals(seed.value > 0, true)
		assertEquals(seed.path, [])
	}
})

Deno.test("createSeed - rejects NaN", () => {
	const result = createSeed(NaN)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidSeed")
	}
})

Deno.test("createSeed - rejects Infinity", () => {
	const result = createSeed(Infinity)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidSeed")
	}
})

Deno.test("createSeed - rejects negative Infinity", () => {
	const result = createSeed(-Infinity)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidSeed")
	}
})

Deno.test("createSeed - handles floating point numbers by truncating", () => {
	const result = createSeed(123.456)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const seed = result.right
		// Should truncate to integer
		assertEquals(seed.value, 123)
		assertEquals(seed.path, [])
	}
})
