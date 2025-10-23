import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isIsbn10 from "./index.ts"

Deno.test("_isIsbn10 returns true for valid ISBN-10 strings", function returnsTrueForValidIsbn10() {
	// Known valid ISBN-10 examples
	assertEquals(isIsbn10("0471958697"), true) // Algorithms in C
	assertEquals(isIsbn10("0321146530"), true) // Programming Pearls
	assertEquals(isIsbn10("0596000480"), true) // JavaScript: The Good Parts
	assertEquals(isIsbn10("0201633612"), true) // Design Patterns
	assertEquals(isIsbn10("0131103628"), true) // The C Programming Language
	assertEquals(isIsbn10("0262033844"), true) // Introduction to Algorithms
	assertEquals(isIsbn10("020161622X"), true) // The Practice of Programming (X check digit)
	assertEquals(isIsbn10("0132350882"), true) // Clean Code
	assertEquals(isIsbn10("0321127420"), true) // Patterns of Enterprise Application Architecture
	assertEquals(isIsbn10("0735619670"), true) // Code Complete
})

Deno.test("_isIsbn10 returns false for invalid ISBN-10 checksums", function returnsFalseForInvalidChecksums() {
	// Same format but wrong check digits
	assertEquals(isIsbn10("0471958698"), false) // Should be 7
	assertEquals(isIsbn10("0321146531"), false) // Should be 0
	assertEquals(isIsbn10("0596000481"), false) // Should be 0
	assertEquals(isIsbn10("0201633613"), false) // Should be 2
	assertEquals(isIsbn10("0131103629"), false) // Should be 8
})

Deno.test("_isIsbn10 returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isIsbn10(""), false) // Empty
	assertEquals(isIsbn10("123456789"), false) // Too short
	assertEquals(isIsbn10("12345678901"), false) // Too long
	assertEquals(isIsbn10("123456789012"), false) // Much too long
})

Deno.test("_isIsbn10 returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isIsbn10("047195869A"), false) // A not allowed (except X)
	assertEquals(isIsbn10("047195869a"), false) // Lowercase not allowed
	assertEquals(isIsbn10("047195869 "), false) // Space not allowed
	assertEquals(isIsbn10("047195869-"), false) // Hyphen not allowed
	assertEquals(isIsbn10("047195869."), false) // Dot not allowed
	assertEquals(isIsbn10("047195869@"), false) // Special char not allowed
})

Deno.test("_isIsbn10 returns false for strings with X in wrong positions", function returnsFalseForXInWrongPosition() {
	assertEquals(isIsbn10("X471958697"), false) // X in first position
	assertEquals(isIsbn10("0X71958697"), false) // X in second position
	assertEquals(isIsbn10("047195869X"), false) // X in last position but invalid checksum
})

Deno.test("_isIsbn10 returns false for non-string inputs", function returnsFalseForNonStrings() {
	// TypeScript should prevent these, but test runtime behavior
	assertEquals(isIsbn10(1234567890 as any), false)
	assertEquals(isIsbn10(null as any), false)
	assertEquals(isIsbn10(undefined as any), false)
	assertEquals(isIsbn10({} as any), false)
	assertEquals(isIsbn10([] as any), false)
})

Deno.test("_isIsbn10 works as type guard", function typeGuard() {
	const value: string | number = "0471958697"

	if (isIsbn10(value)) {
		// TypeScript knows value is Isbn10 here
		assertEquals(typeof value, "string")
		assertEquals(value.length, 10)
	}

	const invalidValue: string | number = "invalid"

	if (!isIsbn10(invalidValue)) {
		// TypeScript knows invalidValue is not Isbn10 here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("_isIsbn10 - property: valid ISBN-10 strings pass", function validIsbn10Pass() {
	// Test with known valid ISBN-10 strings
	const validIsbn10s = [
		"0471958697",
		"0321146530",
		"0596000480",
		"0201633612",
		"0131103628",
		"0262033844",
		"020161622X",
		"0132350882",
		"0321127420",
		"0735619670",
	]

	validIsbn10s.forEach(function testValidIsbn10(isbn) {
		assertEquals(isIsbn10(isbn), true, `Expected ${isbn} to be valid`)
	})
})

Deno.test("_isIsbn10 - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notLength10(s) {
				return s.length !== 10
			}),
			function propertyInvalidLength(value) {
				assertEquals(isIsbn10(value), false)
			},
		),
	)
})

Deno.test("_isIsbn10 - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function length10(s) {
				return s.length === 10
			}).filter(function hasInvalidChars(s) {
				return s.split("").some(function isInvalidChar(c) {
					return !"0123456789X".includes(c)
				})
			}),
			function propertyInvalidChars(value) {
				assertEquals(isIsbn10(value), false)
			},
		),
	)
})

Deno.test("_isIsbn10 - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isIsbn10(value)
				const second = isIsbn10(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("_isIsbn10 - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isIsbn10(value as any), false)
			},
		),
	)
})
