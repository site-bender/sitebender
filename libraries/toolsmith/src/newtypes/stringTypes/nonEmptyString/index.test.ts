import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import nonEmptyString from "@sitebender/toolsmith/newtypes/stringTypes/nonEmptyString/index.ts"

Deno.test("nonEmptyString returns Ok for non-empty strings", function returnsOkForNonEmpty() {
	const result1 = nonEmptyString("Hello")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "Hello" as any)
	}

	const result2 = nonEmptyString("A")
	assertEquals(result2._tag, "Ok")

	const result3 = nonEmptyString("Test string")
	assertEquals(result3._tag, "Ok")
})

Deno.test("nonEmptyString trims whitespace and returns Ok", function trimsWhitespace() {
	const result1 = nonEmptyString("  Hello  ")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "Hello" as any)
	}

	const result2 = nonEmptyString("\t\nTest\n\t")
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, "Test" as any)
	}
})

Deno.test("nonEmptyString returns Error for empty strings", function returnsErrorForEmpty() {
	const result1 = nonEmptyString("")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "NON_EMPTY_STRING_EMPTY")
		assertEquals(result1.error.field, "nonEmptyString")
		assertEquals(result1.error.severity, "requirement")
	}

	const result2 = nonEmptyString("   ")
	assertEquals(result2._tag, "Error")

	const result3 = nonEmptyString("\t\n\r")
	assertEquals(result3._tag, "Error")
})

Deno.test("nonEmptyString - property: non-empty strings return Ok", function propertyNonEmptyReturnsOk() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }).filter(function hasNonWhitespace(s) {
				return s.trim().length > 0
			}),
			function propertyValidNonEmpty(value) {
				const result = nonEmptyString(value)
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("nonEmptyString - property: whitespace-only strings return Error", function propertyWhitespaceReturnsError() {
	fc.assert(
		fc.property(
			fc.stringMatching(/^\s+$/),
			function propertyWhitespaceOnly(value) {
				const result = nonEmptyString(value)
				assertEquals(result._tag, "Error")
			},
		),
	)
})
