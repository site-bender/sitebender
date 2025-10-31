import { assertEquals } from "@std/assert"

import countryCode from "@sitebender/toolsmith/newtypes/stringTypes/countryCode/index.ts"

Deno.test("countryCode returns Ok for valid ISO 3166-1 alpha-2", function returnsOkForValid() {
	const result1 = countryCode("US")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "US" as any)
	}

	const result2 = countryCode("GB")
	assertEquals(result2._tag, "Ok")

	const result3 = countryCode("FR")
	assertEquals(result3._tag, "Ok")
})

Deno.test("countryCode normalizes to uppercase", function normalizesToUppercase() {
	const result = countryCode("us")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "US" as any)
	}

	const result2 = countryCode("gb")
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, "GB" as any)
	}
})

Deno.test("countryCode returns Error for invalid length", function returnsErrorForInvalidLength() {
	const result1 = countryCode("U")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "COUNTRY_CODE_INVALID_LENGTH")
		assertEquals(result1.error.field, "countryCode")
	}

	const result2 = countryCode("USA")
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.code, "COUNTRY_CODE_INVALID_LENGTH")
	}
})

Deno.test("countryCode returns Error for invalid characters", function returnsErrorForInvalidChars() {
	const result = countryCode("U1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "COUNTRY_CODE_INVALID_FORMAT")
	}
})
