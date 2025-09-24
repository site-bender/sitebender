import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import type { Seed } from "../../types/index.ts"

import generateString from "./index.ts"

Deno.test("generateString - generates string with specified length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(5)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		assertEquals(typeof value, "string")
		assertEquals(value.length, 5)
	}
})

Deno.test("generateString - generates empty string for length 0", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(0)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right, "")
	}
})

Deno.test("generateString - generates different strings for different seeds", () => {
	const seed1: Seed = { value: 12345, path: [] }
	const seed2: Seed = { value: 54321, path: [] }

	const result1 = generateString(10)(seed1)
	const result2 = generateString(10)(seed2)

	if (isOk(result1) && isOk(result2)) {
		// Different seeds should produce different strings
		assertEquals(result1.right !== result2.right, true)
	}
})

Deno.test("generateString - generates same string for same seed (deterministic)", () => {
	const seed: Seed = { value: 99999, path: [] }

	const result1 = generateString(10)(seed)
	const result2 = generateString(10)(seed)

	if (isOk(result1) && isOk(result2)) {
		assertEquals(result1.right, result2.right)
	}
})

Deno.test("generateString - generates strings with printable ASCII characters", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(100)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		const value = result.right
		// Check all characters are printable ASCII (32-126)
		for (const char of value) {
			const code = char.charCodeAt(0)
			assertEquals(code >= 32, true)
			assertEquals(code <= 126, true)
		}
	}
})

Deno.test("generateString - rejects negative length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(-1)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidLength")
	}
})

Deno.test("generateString - rejects NaN length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(NaN)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidLength")
	}
})

Deno.test("generateString - rejects Infinity length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(Infinity)(seed)

	assertExists(result)
	assertEquals(isError(result), true)

	if (isError(result)) {
		assertEquals(result.left.type, "InvalidLength")
	}
})

Deno.test("generateString - truncates floating point length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(5.7)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right.length, 5)
	}
})

Deno.test("generateString - handles large length", () => {
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(1000)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right.length, 1000)
	}
})

Deno.test("generateString - generates consistent characters across multiple calls", () => {
	// Verify that character distribution is reasonable
	const seed: Seed = { value: 12345, path: [] }
	const result = generateString(1000)(seed)

	if (isOk(result)) {
		const charSet = new Set(result.right)
		// Should use a reasonable variety of characters
		assertEquals(charSet.size > 10, true)
	}
})

Deno.test("generateString - handles maximum safe length", () => {
	const seed: Seed = { value: 12345, path: [] }
	// Test with a reasonable max length (not too large to avoid memory issues)
	const result = generateString(10000)(seed)

	assertExists(result)
	assertEquals(isOk(result), true)

	if (isOk(result)) {
		assertEquals(result.right.length, 10000)
	}
})
