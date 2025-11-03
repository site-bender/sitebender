import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isPostalCode from "@sitebender/toolsmith/predicates/isPostalCode/index.ts"

Deno.test("_isPostalCode returns true for valid 5-digit ZIP codes", function returnsTrueForValid5Digit() {
	// Known valid 5-digit ZIP codes
	assertEquals(isPostalCode("90210"), true) // Beverly Hills
	assertEquals(isPostalCode("10001"), true) // New York
	assertEquals(isPostalCode("60601"), true) // Chicago
	assertEquals(isPostalCode("77001"), true) // Houston
	assertEquals(isPostalCode("33101"), true) // Miami
})

Deno.test("_isPostalCode returns true for valid 9-digit ZIP codes", function returnsTrueForValid9Digit() {
	// Known valid 9-digit ZIP codes
	assertEquals(isPostalCode("902101234"), true) // Beverly Hills +4
	assertEquals(isPostalCode("100011234"), true) // New York +4
	assertEquals(isPostalCode("606011234"), true) // Chicago +4
})

Deno.test("_isPostalCode returns true for valid ZIP+4 format", function returnsTrueForValidZipPlus4() {
	// Known valid ZIP+4 format
	assertEquals(isPostalCode("90210-1234"), true) // Beverly Hills
	assertEquals(isPostalCode("10001-5678"), true) // New York
	assertEquals(isPostalCode("60601-9012"), true) // Chicago
})

Deno.test("_isPostalCode returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isPostalCode(""), false) // Empty
	assertEquals(isPostalCode("1234"), false) // Too short
	assertEquals(isPostalCode("123456"), false) // Invalid length
	assertEquals(isPostalCode("1234567"), false) // Invalid length
	assertEquals(isPostalCode("12345678"), false) // Invalid length
	assertEquals(isPostalCode("1234567890"), false) // Too long
	assertEquals(isPostalCode("12345678901"), false) // Much too long
})

Deno.test("_isPostalCode returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isPostalCode("9021A"), false) // Letter in 5-digit
	assertEquals(isPostalCode("90210-123A"), false) // Letter in ZIP+4
	assertEquals(isPostalCode("90210 1234"), false) // Space instead of hyphen
	assertEquals(isPostalCode("90210_1234"), false) // Underscore instead of hyphen
	assertEquals(isPostalCode("90210.1234"), false) // Dot instead of hyphen
})

Deno.test("_isPostalCode returns false for invalid ZIP+4 format", function returnsFalseForInvalidZipPlus4() {
	assertEquals(isPostalCode("902101234-"), false) // Hyphen at end
	assertEquals(isPostalCode("-902101234"), false) // Hyphen at start
	assertEquals(isPostalCode("90210-123"), false) // Too few digits after hyphen
	assertEquals(isPostalCode("90210-12345"), false) // Too many digits after hyphen
	assertEquals(isPostalCode("9021-01234"), false) // Too few digits before hyphen
	assertEquals(isPostalCode("902101-234"), false) // Too many digits before hyphen
})

Deno.test("_isPostalCode returns false for non-string inputs", function returnsFalseForNonStrings() {
	// TypeScript should prevent these, but test runtime behavior
	assertEquals(isPostalCode(90210 as any), false)
	assertEquals(isPostalCode(null as any), false)
	assertEquals(isPostalCode(undefined as any), false)
	assertEquals(isPostalCode({} as any), false)
	assertEquals(isPostalCode([] as any), false)
})

Deno.test("_isPostalCode works as type guard", function typeGuard() {
	const value: string | number = "90210"

	if (isPostalCode(value)) {
		// TypeScript knows value is PostalCode here
		assertEquals(typeof value, "string")
		assertEquals(value.length >= 5 && value.length <= 10, true)
	}

	const invalidValue: string | number = "invalid"

	if (!isPostalCode(invalidValue)) {
		// TypeScript knows invalidValue is not PostalCode here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("_isPostalCode - property: valid postal codes pass", function validPostalCodesPass() {
	// Test with known valid postal codes
	const validPostalCodes = [
		"90210",
		"10001",
		"60601",
		"902101234",
		"100011234",
		"606011234",
		"90210-1234",
		"10001-5678",
		"60601-9012",
	]

	validPostalCodes.forEach(function testValidPostalCode(code) {
		assertEquals(isPostalCode(code), true, `Expected ${code} to be valid`)
	})
})

Deno.test("_isPostalCode - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				return ![5, 9, 10].includes(s.length)
			}),
			function propertyInvalidLength(value) {
				assertEquals(isPostalCode(value), false)
			},
		),
	)
})

Deno.test("_isPostalCode - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string({ minLength: 5, maxLength: 5 }).filter(
					function hasInvalidChars(s) {
						return s.split("").some(function isInvalidChar(c) {
							return !"0123456789".includes(c)
						})
					},
				),
				fc.string({ minLength: 9, maxLength: 9 }).filter(
					function hasInvalidChars(s) {
						return s.split("").some(function isInvalidChar(c) {
							return !"0123456789".includes(c)
						})
					},
				),
				fc.tuple(
					fc.string({ minLength: 5, maxLength: 5 }),
					fc.constant("-"),
					fc.string({ minLength: 4, maxLength: 4 }),
				).filter(function hasInvalidChars(tuple) {
					const first = tuple[0].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					const second = tuple[2].split("").some(function isInvalidChar(c) {
						return !"0123456789".includes(c)
					})
					return first || second
				}).map(function tupleToString(tuple) {
					return tuple[0] + tuple[1] + tuple[2]
				}),
			),
			function propertyInvalidChars(value) {
				assertEquals(isPostalCode(value), false)
			},
		),
	)
})

Deno.test("_isPostalCode - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isPostalCode(value)
				const second = isPostalCode(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("_isPostalCode - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isPostalCode(value as any), false)
			},
		),
	)
})
