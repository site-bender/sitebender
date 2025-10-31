import { assertEquals } from "@std/assert"

import creditCardNumber from "@sitebender/toolsmith/newtypes/stringTypes/creditCardNumber/index.ts"

Deno.test("creditCardNumber returns Ok for valid test cards", function returnsOkForValid() {
	// Visa
	const result1 = creditCardNumber("4111111111111111")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "4111111111111111" as any)
	}

	// Mastercard
	const result2 = creditCardNumber("5555555555554444")
	assertEquals(result2._tag, "Ok")

	// American Express
	const result3 = creditCardNumber("378282246310005")
	assertEquals(result3._tag, "Ok")

	// Discover
	const result4 = creditCardNumber("6011111111111117")
	assertEquals(result4._tag, "Ok")
})

Deno.test("creditCardNumber handles spaces and hyphens", function handlesFormatting() {
	const result1 = creditCardNumber("4111 1111 1111 1111")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "4111111111111111" as any) // Cleaned
	}

	const result2 = creditCardNumber("5555-5555-5555-4444")
	assertEquals(result2._tag, "Ok")
	if (result2._tag === "Ok") {
		assertEquals(result2.value, "5555555555554444" as any)
	}
})

Deno.test("creditCardNumber returns Error for non-digits", function returnsErrorForNonDigits() {
	const result = creditCardNumber("4111111111111a11")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "CREDIT_CARD_NUMBER_INVALID_CHARACTERS")
		assertEquals(result.error.field, "creditCardNumber")
	}
})

Deno.test("creditCardNumber returns Error for invalid length", function returnsErrorForInvalidLength() {
	const result1 = creditCardNumber("411111111111") // Too short
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "CREDIT_CARD_NUMBER_INVALID_LENGTH")
	}

	const result2 = creditCardNumber("41111111111111111111") // Too long
	assertEquals(result2._tag, "Error")
	if (result2._tag === "Error") {
		assertEquals(result2.error.code, "CREDIT_CARD_NUMBER_INVALID_LENGTH")
	}
})

Deno.test("creditCardNumber returns Error for invalid Luhn checksum", function returnsErrorForInvalidLuhn() {
	const result = creditCardNumber("4111111111111112") // Wrong check digit
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "CREDIT_CARD_NUMBER_INVALID_CHECKSUM")
	}
})
