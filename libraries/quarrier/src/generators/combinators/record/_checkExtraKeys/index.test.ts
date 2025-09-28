import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import _checkExtraKeys from "./index.ts"

Deno.test("_checkExtraKeys: passes when all keys are expected", () => {
	const expectedKeys = ["a", "b", "c"]
	const inputKeys = ["a", "b", "c"]

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkExtraKeys: passes with subset of expected keys", () => {
	const expectedKeys = ["a", "b", "c", "d"]
	const inputKeys = ["a", "c"] // Subset is ok

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkExtraKeys: fails when extra key present", () => {
	const expectedKeys = ["a", "b"]
	const inputKeys = ["a", "b", "c"] // "c" is extra

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
		assertEquals(result.error.reason, "Unexpected property: c")
	}
})

Deno.test("_checkExtraKeys: passes with empty keys", () => {
	const expectedKeys: string[] = []
	const inputKeys: string[] = []

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkExtraKeys: fails when input has keys but none expected", () => {
	const expectedKeys: string[] = []
	const inputKeys = ["a", "b"]

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.reason, "Unexpected property: a")
	}
})

Deno.test("_checkExtraKeys: fails on first extra key", () => {
	const expectedKeys = ["a"]
	const inputKeys = ["a", "x", "y", "z"] // Multiple extra keys

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		// Should fail on first extra key "x"
		assertEquals(result.error.reason, "Unexpected property: x")
	}
})

Deno.test("_checkExtraKeys: handles single key", () => {
	const expectedKeys = ["only"]

	// Exact match
	const result1 = _checkExtraKeys(expectedKeys)(["only"])
	assertEquals(result1._tag, "Ok")

	// Extra key
	const result2 = _checkExtraKeys(expectedKeys)(["only", "extra"])
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.reason, "Unexpected property: extra")
	}
})

Deno.test("_checkExtraKeys: handles keys with special characters", () => {
	const expectedKeys = ["a-b", "c.d", "e_f"]
	const inputKeys = ["a-b", "c.d", "e_f"]

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkExtraKeys: order doesn't matter", () => {
	const expectedKeys = ["a", "b", "c"]
	const inputKeys = ["c", "a", "b"] // Different order

	const result = _checkExtraKeys(expectedKeys)(inputKeys)

	assertEquals(result._tag, "Ok")
})
