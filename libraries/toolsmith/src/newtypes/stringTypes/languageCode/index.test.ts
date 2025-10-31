import { assertEquals } from "@std/assert"

import languageCode from "@sitebender/toolsmith/newtypes/stringTypes/languageCode/index.ts"

Deno.test("languageCode returns Ok for valid ISO 639-1", function returnsOkForValid() {
	const result1 = languageCode("en")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "en" as any)
	}

	const result2 = languageCode("fr")
	assertEquals(result2._tag, "Ok")

	const result3 = languageCode("de")
	assertEquals(result3._tag, "Ok")
})

Deno.test("languageCode normalizes to lowercase", function normalizesToLowercase() {
	const result = languageCode("EN")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "en" as any)
	}

	const result2 = languageCode("FR")
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, "fr" as any)
	}
})

Deno.test("languageCode returns Error for invalid length", function returnsErrorForInvalidLength() {
	const result1 = languageCode("e")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "LANGUAGE_CODE_INVALID_LENGTH")
		assertEquals(result1.error.field, "languageCode")
	}

	const result2 = languageCode("eng")
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.code, "LANGUAGE_CODE_INVALID_LENGTH")
	}
})

Deno.test("languageCode returns Error for invalid characters", function returnsErrorForInvalidChars() {
	const result = languageCode("e1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "LANGUAGE_CODE_INVALID_FORMAT")
	}
})
