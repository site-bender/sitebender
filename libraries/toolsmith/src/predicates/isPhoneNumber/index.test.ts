import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isPhoneNumber from "@sitebender/toolsmith/predicates/isPhoneNumber/index.ts"

Deno.test("_isPhoneNumber returns true for valid 10-digit phone numbers", function returnsTrueForValid10Digit() {
	// Known valid 10-digit phone numbers
	assertEquals(isPhoneNumber("5551234567"), true) // Plain 10 digits
	assertEquals(isPhoneNumber("2125551234"), true) // NYC area code
	assertEquals(isPhoneNumber("3105551234"), true) // LA area code
	assertEquals(isPhoneNumber("4155551234"), true) // SF area code
	assertEquals(isPhoneNumber("7135551234"), true) // Houston area code
})

Deno.test("_isPhoneNumber returns true for valid parentheses format", function returnsTrueForValidParentheses() {
	// Known valid (123) 456-7890 format
	assertEquals(isPhoneNumber("(555) 123-4567"), true)
	assertEquals(isPhoneNumber("(212) 555-1234"), true)
	assertEquals(isPhoneNumber("(310) 555-1234"), true)
	assertEquals(isPhoneNumber("(415) 555-1234"), true)
	assertEquals(isPhoneNumber("(713) 555-1234"), true)
})

Deno.test("_isPhoneNumber returns true for valid hyphenated format", function returnsTrueForValidHyphenated() {
	// Known valid 123-456-7890 format
	assertEquals(isPhoneNumber("555-123-4567"), true)
	assertEquals(isPhoneNumber("212-555-1234"), true)
	assertEquals(isPhoneNumber("310-555-1234"), true)
	assertEquals(isPhoneNumber("415-555-1234"), true)
	assertEquals(isPhoneNumber("713-555-1234"), true)
})

Deno.test("_isPhoneNumber returns true for valid international format", function returnsTrueForValidInternational() {
	// Known valid +1-123-456-7890 format
	assertEquals(isPhoneNumber("+1-555-123-4567"), true)
	assertEquals(isPhoneNumber("+1-212-555-1234"), true)
	assertEquals(isPhoneNumber("+1-310-555-1234"), true)
	assertEquals(isPhoneNumber("+1-415-555-1234"), true)
	assertEquals(isPhoneNumber("+1-713-555-1234"), true)
})

Deno.test("_isPhoneNumber returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isPhoneNumber(""), false) // Empty
	assertEquals(isPhoneNumber("555123456"), false) // Too short
	assertEquals(isPhoneNumber("55512345678"), false) // 11 digits
	assertEquals(isPhoneNumber("555123456789"), false) // 12 digits
	assertEquals(isPhoneNumber("5551234567890"), false) // 13 digits
	assertEquals(isPhoneNumber("55512345678901"), false) // Much too long
})

Deno.test("_isPhoneNumber returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isPhoneNumber("555-123-456A"), false) // Letter in line number
	assertEquals(isPhoneNumber("(555) 123-456A"), false) // Letter in parentheses format
	assertEquals(isPhoneNumber("555.123.4567"), false) // Dots instead of hyphens
	assertEquals(isPhoneNumber("555_123_4567"), false) // Underscores instead of hyphens
	assertEquals(isPhoneNumber("555 123 4567"), false) // Spaces instead of hyphens
})

Deno.test("_isPhoneNumber returns false for invalid parentheses format", function returnsFalseForInvalidParentheses() {
	assertEquals(isPhoneNumber("555) 123-4567"), false) // Missing opening paren
	assertEquals(isPhoneNumber("(555 123-4567"), false) // Missing closing paren
	assertEquals(isPhoneNumber("(555)123-4567"), false) // Missing space
	assertEquals(isPhoneNumber("(555) 1234567"), false) // Missing hyphen
	assertEquals(isPhoneNumber("(555) 123-456"), false) // Too few digits after hyphen
	assertEquals(isPhoneNumber("(555) 123-45678"), false) // Too many digits after hyphen
	assertEquals(isPhoneNumber("(55) 123-4567"), false) // Too few digits in area code
	assertEquals(isPhoneNumber("(5555) 123-4567"), false) // Too many digits in area code
})

Deno.test("_isPhoneNumber returns false for invalid hyphenated format", function returnsFalseForInvalidHyphenated() {
	assertEquals(isPhoneNumber("555123-4567"), false) // Missing first hyphen
	assertEquals(isPhoneNumber("555-1234567"), false) // Missing second hyphen
	assertEquals(isPhoneNumber("55-123-4567"), false) // Too few digits in area code
	assertEquals(isPhoneNumber("5555-123-4567"), false) // Too many digits in area code
	assertEquals(isPhoneNumber("555-12-4567"), false) // Too few digits in exchange
	assertEquals(isPhoneNumber("555-1234-4567"), false) // Too many digits in exchange
	assertEquals(isPhoneNumber("555-123-456"), false) // Too few digits in line number
	assertEquals(isPhoneNumber("555-123-45678"), false) // Too many digits in line number
})

Deno.test("_isPhoneNumber returns false for invalid international format", function returnsFalseForInvalidInternational() {
	assertEquals(isPhoneNumber("1-555-123-4567"), false) // Missing + prefix
	assertEquals(isPhoneNumber("+2-555-123-4567"), false) // Wrong country code
	assertEquals(isPhoneNumber("+1-555-1234567"), false) // Missing second hyphen
	assertEquals(isPhoneNumber("+1555-123-4567"), false) // Missing first hyphen
	assertEquals(isPhoneNumber("+1-555-123-456"), false) // Too few digits in line number
	assertEquals(isPhoneNumber("+1-555-123-45678"), false) // Too many digits in line number
})

Deno.test("_isPhoneNumber returns false for non-string inputs", function returnsFalseForNonStrings() {
	// TypeScript should prevent these, but test runtime behavior
	assertEquals(isPhoneNumber(5551234567 as any), false)
	assertEquals(isPhoneNumber(null as any), false)
	assertEquals(isPhoneNumber(undefined as any), false)
	assertEquals(isPhoneNumber({} as any), false)
	assertEquals(isPhoneNumber([] as any), false)
})

Deno.test("_isPhoneNumber works as type guard", function typeGuard() {
	const value: string | number = "5551234567"

	if (isPhoneNumber(value)) {
		// TypeScript knows value is PhoneNumber here
		assertEquals(typeof value, "string")
		assertEquals([10, 12, 14, 15].includes(value.length), true)
	}

	const invalidValue: string | number = "invalid"

	if (!isPhoneNumber(invalidValue)) {
		// TypeScript knows invalidValue is not PhoneNumber here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("_isPhoneNumber - property: valid phone numbers pass", function validPhoneNumbersPass() {
	// Test with known valid phone numbers
	const validPhoneNumbers = [
		"5551234567",
		"(555) 123-4567",
		"555-123-4567",
		"+1-555-123-4567",
		"2125551234",
		"(212) 555-1234",
		"212-555-1234",
		"+1-212-555-1234",
	]

	validPhoneNumbers.forEach(function testValidPhoneNumber(number) {
		assertEquals(isPhoneNumber(number), true, `Expected ${number} to be valid`)
	})
})

Deno.test("_isPhoneNumber - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				return ![10, 12, 14, 15].includes(s.length)
			}),
			function propertyInvalidLength(value) {
				assertEquals(isPhoneNumber(value), false)
			},
		),
	)
})

Deno.test("_isPhoneNumber - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string({ minLength: 10, maxLength: 10 }).filter(function hasInvalidChars(s) {
					return s.split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
				}),
				fc.tuple(
					fc.constant("("),
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant(") "),
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant("-"),
					fc.string({ minLength: 4, maxLength: 4 })
				).filter(function hasInvalidChars(tuple) {
					const areaCode = tuple[1].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const exchange = tuple[3].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const lineNumber = tuple[5].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					return areaCode || exchange || lineNumber
				}).map(function tupleToString(tuple) {
					return tuple[0] + tuple[1] + tuple[2] + tuple[3] + tuple[4] + tuple[5]
				}),
				fc.tuple(
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant("-"),
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant("-"),
					fc.string({ minLength: 4, maxLength: 4 })
				).filter(function hasInvalidChars(tuple) {
					const areaCode = tuple[0].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const exchange = tuple[2].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const lineNumber = tuple[4].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					return areaCode || exchange || lineNumber
				}).map(function tupleToString(tuple) {
					return tuple[0] + tuple[1] + tuple[2] + tuple[3] + tuple[4]
				}),
				fc.tuple(
					fc.constant("+1-"),
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant("-"),
					fc.string({ minLength: 3, maxLength: 3 }),
					fc.constant("-"),
					fc.string({ minLength: 4, maxLength: 4 })
				).filter(function hasInvalidChars(tuple) {
					const areaCode = tuple[1].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const exchange = tuple[3].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const lineNumber = tuple[5].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					return areaCode || exchange || lineNumber
				}).map(function tupleToString(tuple) {
					return tuple[0] + tuple[1] + tuple[2] + tuple[3] + tuple[4] + tuple[5]
				})
			),
			function propertyInvalidChars(value) {
				assertEquals(isPhoneNumber(value), false)
			},
		),
	)
})

Deno.test("_isPhoneNumber - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isPhoneNumber(value)
				const second = isPhoneNumber(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("_isPhoneNumber - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isPhoneNumber(value as any), false)
			},
		),
	)
})
