import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isCountryCode from "@sitebender/toolsmith/predicates/isCountryCode/index.ts"

Deno.test("isCountryCode returns true for valid country codes", function returnsTrueForValid() {
	// Major countries
	assertEquals(isCountryCode("US"), true) // United States
	assertEquals(isCountryCode("GB"), true) // United Kingdom
	assertEquals(isCountryCode("FR"), true) // France
	assertEquals(isCountryCode("DE"), true) // Germany
	assertEquals(isCountryCode("JP"), true) // Japan
	assertEquals(isCountryCode("CN"), true) // China
	assertEquals(isCountryCode("IN"), true) // India
	assertEquals(isCountryCode("BR"), true) // Brazil
	assertEquals(isCountryCode("AU"), true) // Australia
	assertEquals(isCountryCode("CA"), true) // Canada
	assertEquals(isCountryCode("MX"), true) // Mexico
	assertEquals(isCountryCode("IT"), true) // Italy
	assertEquals(isCountryCode("ES"), true) // Spain
	assertEquals(isCountryCode("RU"), true) // Russia
	assertEquals(isCountryCode("KR"), true) // South Korea
})

Deno.test("isCountryCode is case-insensitive", function caseInsensitive() {
	assertEquals(isCountryCode("us"), true) // Lowercase
	assertEquals(isCountryCode("Us"), true) // Mixed case
	assertEquals(isCountryCode("uS"), true) // Mixed case
	assertEquals(isCountryCode("gb"), true) // Lowercase
	assertEquals(isCountryCode("Gb"), true) // Mixed case
	assertEquals(isCountryCode("fr"), true) // Lowercase
})

Deno.test("isCountryCode returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isCountryCode(""), false) // Empty
	assertEquals(isCountryCode("U"), false) // 1 char
	assertEquals(isCountryCode("USA"), false) // 3 chars
	assertEquals(isCountryCode("USAA"), false) // 4 chars
	assertEquals(isCountryCode("A"), false) // 1 char
})

Deno.test("isCountryCode returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isCountryCode("U1"), false) // Number
	assertEquals(isCountryCode("US "), false) // Space
	assertEquals(isCountryCode("U-"), false) // Hyphen
	assertEquals(isCountryCode("U_"), false) // Underscore
	assertEquals(isCountryCode("U."), false) // Dot
	assertEquals(isCountryCode("U@"), false) // Special char
	assertEquals(isCountryCode("12"), false) // All numbers
})

Deno.test("isCountryCode returns false for non-string inputs", function returnsFalseForNonStrings() {
	assertEquals(isCountryCode(42 as any), false)
	assertEquals(isCountryCode(null as any), false)
	assertEquals(isCountryCode(undefined as any), false)
	assertEquals(isCountryCode({} as any), false)
	assertEquals(isCountryCode([] as any), false)
	assertEquals(isCountryCode(true as any), false)
})

Deno.test("isCountryCode works as type guard", function typeGuard() {
	const value: string | number = "US"

	if (isCountryCode(value)) {
		// TypeScript knows value is CountryCode here
		assertEquals(typeof value, "string")
		assertEquals(value.length, 2)
	}

	const invalidValue: string | number = "USA"

	if (!isCountryCode(invalidValue)) {
		// TypeScript knows invalidValue is not CountryCode here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("isCountryCode - property: valid country codes pass", function validCountryCodesPass() {
	const validCountryCodes = [
		"US",
		"GB",
		"FR",
		"DE",
		"JP",
		"CN",
		"IN",
		"BR",
		"AU",
		"CA",
		"MX",
		"IT",
		"ES",
		"RU",
		"KR",
		"ZA",
		"NG",
		"EG",
		"SE",
		"NO",
	]

	validCountryCodes.forEach(function testValidCountryCode(code) {
		assertEquals(isCountryCode(code), true, `Expected ${code} to be valid`)
	})
})

Deno.test("isCountryCode - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				return s.length !== 2
			}),
			function propertyInvalidLength(value) {
				assertEquals(isCountryCode(value), false)
			},
		),
	)
})

Deno.test("isCountryCode - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 2, maxLength: 2 }).filter(
				function hasInvalidChars(s) {
					const normalized = s.toLocaleUpperCase()
					return !/^[A-Z]{2}$/.test(normalized)
				},
			),
			function propertyInvalidChars(value) {
				assertEquals(isCountryCode(value), false)
			},
		),
	)
})

Deno.test("isCountryCode - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isCountryCode(value)
				const second = isCountryCode(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isCountryCode - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isCountryCode(value as any), false)
			},
		),
	)
})
