import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import _checkMissingKeys from "./index.ts"

Deno.test("_checkMissingKeys: passes when all keys present", () => {
	const expectedKeys = ["a", "b", "c"]
	const inputObj = { a: 1, b: 2, c: 3, d: 4 } // Extra key is ok

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkMissingKeys: fails when key is missing", () => {
	const expectedKeys = ["a", "b", "c"]
	const inputObj = { a: 1, c: 3 } // Missing "b"

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.type, "ValidationFailed")
		assertEquals(result.error.reason, "Missing required property: b")
	}
})

Deno.test("_checkMissingKeys: passes with empty keys", () => {
	const expectedKeys: string[] = []
	const inputObj = { a: 1, b: 2 }

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkMissingKeys: passes with empty object when no keys expected", () => {
	const expectedKeys: string[] = []
	const inputObj = {}

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkMissingKeys: fails on first missing key", () => {
	const expectedKeys = ["a", "b", "c"]
	const inputObj = {} // Missing all keys

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		// Should fail on first key "a"
		assertEquals(result.error.reason, "Missing required property: a")
	}
})

Deno.test("_checkMissingKeys: handles single key", () => {
	const expectedKeys = ["only"]

	// Present
	const result1 = _checkMissingKeys(expectedKeys)({ only: true })
	assertEquals(result1._tag, "Ok")

	// Missing
	const result2 = _checkMissingKeys(expectedKeys)({ other: true })
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.reason, "Missing required property: only")
	}
})

Deno.test("_checkMissingKeys: handles keys with special characters", () => {
	const expectedKeys = ["a-b", "c.d", "e_f"]
	const inputObj = { "a-b": 1, "c.d": 2, "e_f": 3 }

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	assertEquals(result._tag, "Ok")
})

Deno.test("_checkMissingKeys: checks presence not value", () => {
	const expectedKeys = ["a", "b"]
	const inputObj = { a: undefined, b: null }

	const result = _checkMissingKeys(expectedKeys)(inputObj)

	// Should pass because keys are present even if values are undefined/null
	assertEquals(result._tag, "Ok")
})
