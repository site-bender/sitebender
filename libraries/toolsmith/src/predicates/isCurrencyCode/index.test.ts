import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isCurrencyCode from "@sitebender/toolsmith/predicates/isCurrencyCode/index.ts"

Deno.test("isCurrencyCode returns true for valid currency codes", function returnsTrueForValid() {
	// Major currencies
	assertEquals(isCurrencyCode("USD"), true) // US Dollar
	assertEquals(isCurrencyCode("EUR"), true) // Euro
	assertEquals(isCurrencyCode("GBP"), true) // British Pound
	assertEquals(isCurrencyCode("JPY"), true) // Japanese Yen
	assertEquals(isCurrencyCode("CNY"), true) // Chinese Yuan
	assertEquals(isCurrencyCode("INR"), true) // Indian Rupee
	assertEquals(isCurrencyCode("BRL"), true) // Brazilian Real
	assertEquals(isCurrencyCode("AUD"), true) // Australian Dollar
	assertEquals(isCurrencyCode("CAD"), true) // Canadian Dollar
	assertEquals(isCurrencyCode("CHF"), true) // Swiss Franc
	assertEquals(isCurrencyCode("SEK"), true) // Swedish Krona
	assertEquals(isCurrencyCode("NZD"), true) // New Zealand Dollar
	assertEquals(isCurrencyCode("MXN"), true) // Mexican Peso
	assertEquals(isCurrencyCode("SGD"), true) // Singapore Dollar
	assertEquals(isCurrencyCode("HKD"), true) // Hong Kong Dollar
})

Deno.test("isCurrencyCode is case-insensitive", function caseInsensitive() {
	assertEquals(isCurrencyCode("usd"), true) // Lowercase
	assertEquals(isCurrencyCode("Usd"), true) // Mixed case
	assertEquals(isCurrencyCode("UsD"), true) // Mixed case
	assertEquals(isCurrencyCode("eur"), true) // Lowercase
	assertEquals(isCurrencyCode("Eur"), true) // Mixed case
	assertEquals(isCurrencyCode("gbp"), true) // Lowercase
})

Deno.test("isCurrencyCode returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isCurrencyCode(""), false) // Empty
	assertEquals(isCurrencyCode("US"), false) // 2 chars
	assertEquals(isCurrencyCode("USDA"), false) // 4 chars
	assertEquals(isCurrencyCode("USDAA"), false) // 5 chars
	assertEquals(isCurrencyCode("A"), false) // 1 char
})

Deno.test("isCurrencyCode returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isCurrencyCode("US1"), false) // Number
	assertEquals(isCurrencyCode("USD "), false) // Space
	assertEquals(isCurrencyCode("US-"), false) // Hyphen
	assertEquals(isCurrencyCode("US_"), false) // Underscore
	assertEquals(isCurrencyCode("US."), false) // Dot
	assertEquals(isCurrencyCode("US@"), false) // Special char
	assertEquals(isCurrencyCode("123"), false) // All numbers
})

Deno.test("isCurrencyCode returns false for non-string inputs", function returnsFalseForNonStrings() {
	assertEquals(isCurrencyCode(42 as any), false)
	assertEquals(isCurrencyCode(null as any), false)
	assertEquals(isCurrencyCode(undefined as any), false)
	assertEquals(isCurrencyCode({} as any), false)
	assertEquals(isCurrencyCode([] as any), false)
	assertEquals(isCurrencyCode(true as any), false)
})

Deno.test("isCurrencyCode works as type guard", function typeGuard() {
	const value: string | number = "USD"

	if (isCurrencyCode(value)) {
		// TypeScript knows value is CurrencyCode here
		assertEquals(typeof value, "string")
		assertEquals(value.length, 3)
	}

	const invalidValue: string | number = "USDA"

	if (!isCurrencyCode(invalidValue)) {
		// TypeScript knows invalidValue is not CurrencyCode here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("isCurrencyCode - property: valid currency codes pass", function validCurrencyCodesPass() {
	const validCurrencyCodes = [
		"USD",
		"EUR",
		"GBP",
		"JPY",
		"CNY",
		"INR",
		"BRL",
		"AUD",
		"CAD",
		"CHF",
		"SEK",
		"NZD",
		"MXN",
		"SGD",
		"HKD",
		"NOK",
		"KRW",
		"TRY",
		"RUB",
		"ZAR",
	]

	validCurrencyCodes.forEach(function testValidCurrencyCode(code) {
		assertEquals(isCurrencyCode(code), true, `Expected ${code} to be valid`)
	})
})

Deno.test("isCurrencyCode - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				return s.length !== 3
			}),
			function propertyInvalidLength(value) {
				assertEquals(isCurrencyCode(value), false)
			},
		),
	)
})

Deno.test("isCurrencyCode - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 3, maxLength: 3 }).filter(function hasInvalidChars(s) {
				const normalized = s.toLocaleUpperCase()
				return !/^[A-Z]{3}$/.test(normalized)
			}),
			function propertyInvalidChars(value) {
				assertEquals(isCurrencyCode(value), false)
			},
		),
	)
})

Deno.test("isCurrencyCode - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isCurrencyCode(value)
				const second = isCurrencyCode(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isCurrencyCode - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isCurrencyCode(value as any), false)
			},
		),
	)
})
