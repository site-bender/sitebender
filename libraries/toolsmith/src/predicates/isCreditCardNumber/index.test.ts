import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isCreditCardNumber from "@sitebender/toolsmith/predicates/isCreditCardNumber/index.ts"

Deno.test("isCreditCardNumber returns true for valid test card numbers", function returnsTrueForValid() {
	// Visa test cards
	assertEquals(isCreditCardNumber("4111111111111111"), true) // Visa
	assertEquals(isCreditCardNumber("4012888888881881"), true) // Visa
	assertEquals(isCreditCardNumber("4222222222222"), true) // Visa (13 digits)

	// Mastercard test cards
	assertEquals(isCreditCardNumber("5555555555554444"), true) // Mastercard
	assertEquals(isCreditCardNumber("5105105105105100"), true) // Mastercard
	assertEquals(isCreditCardNumber("2221000000000009"), true) // Mastercard (2-series)

	// American Express test cards
	assertEquals(isCreditCardNumber("378282246310005"), true) // Amex
	assertEquals(isCreditCardNumber("371449635398431"), true) // Amex

	// Discover test cards
	assertEquals(isCreditCardNumber("6011111111111117"), true) // Discover
	assertEquals(isCreditCardNumber("6011000990139424"), true) // Discover

	// Diners Club test cards
	assertEquals(isCreditCardNumber("3056930009020004"), true) // Diners Club
	assertEquals(isCreditCardNumber("36227206271667"), true) // Diners Club (14 digits)

	// JCB test cards
	assertEquals(isCreditCardNumber("3530111333300000"), true) // JCB
	assertEquals(isCreditCardNumber("3566002020360505"), true) // JCB
})

Deno.test("isCreditCardNumber handles spaces and hyphens", function handlesFormatting() {
	// Spaces
	assertEquals(isCreditCardNumber("4111 1111 1111 1111"), true) // Visa with spaces
	assertEquals(isCreditCardNumber("5555 5555 5555 4444"), true) // Mastercard with spaces
	assertEquals(isCreditCardNumber("3782 822463 10005"), true) // Amex with spaces

	// Hyphens
	assertEquals(isCreditCardNumber("4111-1111-1111-1111"), true) // Visa with hyphens
	assertEquals(isCreditCardNumber("5555-5555-5555-4444"), true) // Mastercard with hyphens
	assertEquals(isCreditCardNumber("3782-822463-10005"), true) // Amex with hyphens

	// Mixed
	assertEquals(isCreditCardNumber("4111 1111-1111-1111"), true) // Mixed formatting
})

Deno.test("isCreditCardNumber returns false for wrong length", function returnsFalseForWrongLength() {
	assertEquals(isCreditCardNumber(""), false) // Empty
	assertEquals(isCreditCardNumber("411111111111"), false) // 12 digits - too short
	assertEquals(isCreditCardNumber("41111111111111111111"), false) // 20 digits - too long
})

Deno.test("isCreditCardNumber returns false for invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isCreditCardNumber("4111111111111111a"), false) // Letter
	assertEquals(isCreditCardNumber("4111111111111111!"), false) // Special char
	assertEquals(isCreditCardNumber("4111.1111.1111.1111"), false) // Dots
	assertEquals(isCreditCardNumber("4111_1111_1111_1111"), false) // Underscores
})

Deno.test("isCreditCardNumber returns false for invalid Luhn checksum", function returnsFalseForInvalidLuhn() {
	// Valid length but invalid Luhn
	assertEquals(isCreditCardNumber("4111111111111112"), false) // Wrong check digit
	assertEquals(isCreditCardNumber("5555555555554445"), false) // Wrong check digit
	assertEquals(isCreditCardNumber("378282246310006"), false) // Wrong check digit
	assertEquals(isCreditCardNumber("6011111111111118"), false) // Wrong check digit
})

Deno.test("isCreditCardNumber returns false for all same digits", function returnsFalseForSameDigits() {
	// These don't pass Luhn
	assertEquals(isCreditCardNumber("1111111111111111"), false) // All 1s
	assertEquals(isCreditCardNumber("2222222222222222"), false) // All 2s
	assertEquals(isCreditCardNumber("9999999999999999"), false) // All 9s
})

Deno.test("isCreditCardNumber returns false for non-string inputs", function returnsFalseForNonStrings() {
	assertEquals(isCreditCardNumber(4111111111111111 as any), false)
	assertEquals(isCreditCardNumber(null as any), false)
	assertEquals(isCreditCardNumber(undefined as any), false)
	assertEquals(isCreditCardNumber({} as any), false)
	assertEquals(isCreditCardNumber([] as any), false)
	assertEquals(isCreditCardNumber(true as any), false)
})

Deno.test("isCreditCardNumber works as type guard", function typeGuard() {
	const value: string | number = "4111111111111111"

	if (isCreditCardNumber(value)) {
		// TypeScript knows value is CreditCardNumber here
		assertEquals(typeof value, "string")
		const cleaned = value.replace(/[\s-]/g, "")
		assertEquals(cleaned.length >= 13 && cleaned.length <= 19, true)
	}

	const invalidValue: string | number = "1234567890"

	if (!isCreditCardNumber(invalidValue)) {
		// TypeScript knows invalidValue is not CreditCardNumber here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("isCreditCardNumber - property: valid test cards pass", function validTestCardsPass() {
	const validTestCards = [
		"4111111111111111", // Visa
		"4012888888881881", // Visa
		"5555555555554444", // Mastercard
		"5105105105105100", // Mastercard
		"378282246310005", // Amex
		"371449635398431", // Amex
		"6011111111111117", // Discover
		"6011000990139424", // Discover
		"3530111333300000", // JCB
		"3566002020360505", // JCB
	]

	validTestCards.forEach(function testValidCard(card) {
		assertEquals(isCreditCardNumber(card), true, `Expected ${card} to be valid`)
	})
})

Deno.test("isCreditCardNumber - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				const cleaned = s.replace(/[\s-]/g, "")
				return cleaned.length < 13 || cleaned.length > 19 || !/^\d+$/.test(cleaned)
			}),
			function propertyInvalidLength(value) {
				assertEquals(isCreditCardNumber(value), false)
			},
		),
	)
})

Deno.test("isCreditCardNumber - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isCreditCardNumber(value)
				const second = isCreditCardNumber(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isCreditCardNumber - property: non-string inputs fail", function nonStringInputsFail() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.boolean(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			function propertyNonStrings(value) {
				assertEquals(isCreditCardNumber(value as any), false)
			},
		),
	)
})
