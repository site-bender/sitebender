import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import char from "@sitebender/toolsmith/newtypes/stringTypes/char/index.ts"

Deno.test("char returns Ok for single ASCII characters", function returnsOkForSingleAscii() {
	const result1 = char("A")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "A" as any)
	}

	const result2 = char("z")
	assertEquals(result2._tag, "Ok")

	const result3 = char("5")
	assertEquals(result3._tag, "Ok")

	const result4 = char("!")
	assertEquals(result4._tag, "Ok")
})

Deno.test("char returns Ok for single Unicode characters", function returnsOkForSingleUnicode() {
	const result1 = char("ñ")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "ñ" as any)
	}

	const result2 = char("€")
	assertEquals(result2._tag, "Ok")

	const result3 = char("中")
	assertEquals(result3._tag, "Ok")

	const result4 = char("😀")
	assertEquals(result4._tag, "Ok")
})

Deno.test("char returns Error for empty strings", function returnsErrorForEmpty() {
	const result = char("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "CHAR_INVALID_LENGTH")
		assertEquals(result.error.field, "char")
		assertEquals(result.error.severity, "requirement")
	}
})

Deno.test("char returns Error for multi-character strings", function returnsErrorForMultiChar() {
	const result1 = char("AB")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "CHAR_INVALID_LENGTH")
	}

	const result2 = char("Hello")
	assertEquals(result2._tag, "Error")

	const result3 = char("😀😀")
	assertEquals(result3._tag, "Error")
})

Deno.test("char - property: single characters return Ok", function propertySingleCharReturnsOk() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1, maxLength: 1 }),
			function propertyValidChar(value) {
				//++ Only test single code point characters
				if (Array.from(value).length === 1) {
					const result = char(value)
					assertEquals(result._tag, "Ok")
				}
			},
		),
	)
})

Deno.test("char - property: multi-character strings return Error", function propertyMultiCharReturnsError() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 2 }),
			function propertyInvalidChar(value) {
				const result = char(value)
				assertEquals(result._tag, "Error")
			},
		),
	)
})
