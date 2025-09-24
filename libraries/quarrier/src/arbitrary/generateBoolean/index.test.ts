import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Seed } from "../../types/index.ts"

import generateBoolean from "./index.ts"

Deno.test("generateBoolean - generates a boolean value", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateBoolean(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(typeof value, "boolean")
		assertEquals(value === true || value === false, true)
	}
})

Deno.test("generateBoolean - generates different values for different seeds", () => {
	// Test multiple seeds to find ones that produce different values
	const seed1: Seed = { value: 12345, path: [] }
	const seed2: Seed = { value: 12346, path: [] }
	const seed3: Seed = { value: 54321, path: [] }
	const seed4: Seed = { value: 99999, path: [] }

	const result1 = generateBoolean(seed1)
	const result2 = generateBoolean(seed2)
	const result3 = generateBoolean(seed3)
	const result4 = generateBoolean(seed4)

	if (isOk(result1) && isOk(result2) && isOk(result3) && isOk(result4)) {
		const values = [result1.right, result2.right, result3.right, result4.right]
		const hasBothValues = values.includes(true) && values.includes(false)
		// Should generate both true and false across different seeds
		assertEquals(hasBothValues, true)
	}
})

Deno.test("generateBoolean - generates same value for same seed (deterministic)", () => {
	const seed: Seed = { value: 99999, path: [] }

	const result1 = generateBoolean(seed)
	const result2 = generateBoolean(seed)
	const result3 = generateBoolean(seed)

	if (isOk(result1) && isOk(result2) && isOk(result3)) {
		assertEquals(result1.right, result2.right)
		assertEquals(result2.right, result3.right)
	}
})

Deno.test("generateBoolean - generates roughly balanced distribution", () => {
	// Test that over many seeds, we get a reasonable distribution
	let trueCount = 0
	let falseCount = 0

	for (let i = 0; i < 1000; i++) {
		const seed: Seed = { value: i, path: [] }
		const result = generateBoolean(seed)

		if (isOk(result)) {
			if (result.right === true) {
				trueCount++
			} else {
				falseCount++
			}
		}
	}

	// Should have both values
	assertEquals(trueCount > 0, true)
	assertEquals(falseCount > 0, true)

	// Distribution should be somewhat balanced (not all one value)
	// Allow for some variance but not extreme skew
	const ratio = Math.min(trueCount, falseCount) /
		Math.max(trueCount, falseCount)
	assertEquals(ratio > 0.2, true) // At least 20% of the minority value
})

Deno.test("generateBoolean - works with seeds having paths", () => {
	const seed: Seed = { value: 12345, path: [0, 1, 2] }
	const result = generateBoolean(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(typeof result.right, "boolean")
	}
})

Deno.test("generateBoolean - handles edge case seed values", () => {
	const seeds: Array<Seed> = [
		{ value: 0, path: [] },
		{ value: 1, path: [] },
		{ value: Number.MAX_SAFE_INTEGER, path: [] },
		{ value: 2147483647, path: [] }, // Max 32-bit int
	]

	for (const seed of seeds) {
		const result = generateBoolean(seed)
		assertExists(result)
		assertEquals(isOk(result), true)

		if (isOk(result)) {
			assertEquals(typeof result.right, "boolean")
		}
	}
})
