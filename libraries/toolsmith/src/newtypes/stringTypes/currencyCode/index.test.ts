import { assertEquals } from "@std/assert"

import currencyCode from "@sitebender/toolsmith/newtypes/stringTypes/currencyCode/index.ts"

Deno.test("currencyCode returns Ok for valid ISO 4217", function returnsOkForValid() {
	const result1 = currencyCode("USD")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "USD" as any)
	}

	const result2 = currencyCode("EUR")
	assertEquals(result2._tag, "Ok")

	const result3 = currencyCode("GBP")
	assertEquals(result3._tag, "Ok")
})

Deno.test("currencyCode normalizes to uppercase", function normalizesToUppercase() {
	const result = currencyCode("usd")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result._tag, "Ok")
		assertEquals(result.value, "USD" as any)
	}

	const result2 = currencyCode("eur")
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, "EUR" as any)
	}
})

Deno.test("currencyCode returns Error for invalid length", function returnsErrorForInvalidLength() {
	const result1 = currencyCode("US")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "CURRENCY_CODE_INVALID_LENGTH")
		assertEquals(result1.error.field, "currencyCode")
	}

	const result2 = currencyCode("USDA")
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.code, "CURRENCY_CODE_INVALID_LENGTH")
	}
})

Deno.test("currencyCode returns Error for invalid characters", function returnsErrorForInvalidChars() {
	const result = currencyCode("US1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "CURRENCY_CODE_INVALID_FORMAT")
	}
})
