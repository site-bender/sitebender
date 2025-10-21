import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isIsbn13 from "@sitebender/toolsmith/validation/isIsbn13/index.ts"

Deno.test("_isIsbn13 returns true for valid ISBN-13 strings", function returnsTrueForValidIsbn13() {
	// Known valid ISBN-13 examples
	assertEquals(isIsbn13("9780306406157"), true) // The Feynman Lectures on Physics
	assertEquals(isIsbn13("9780471958697"), true) // Algorithms in C
	assertEquals(isIsbn13("9780321146533"), true) // Programming Pearls
	assertEquals(isIsbn13("9780131103627"), true) // The C Programming Language
	assertEquals(isIsbn13("9780201633610"), true) // Design Patterns
	assertEquals(isIsbn13("9780131103627"), true) // The C Programming Language
	assertEquals(isIsbn13("9780262033848"), true) // Introduction to Algorithms
	assertEquals(isIsbn13("9780132350884"), true) // Clean Code
	assertEquals(isIsbn13("9780321127426"), true) // Patterns of Enterprise Application Architecture
	assertEquals(isIsbn13("9780735619678"), true) // Code Complete
})

Deno.test("_isIsbn13 returns false for invalid ISBN-13 checksums", function returnsFalseForInvalidChecksums() {
	// Same format but wrong check digits
	assertEquals(isIsbn13("9780306406158"), false) // Should be 7
	assertEquals(isIsbn13("9780471958698"), false) // Should be 7
	assertEquals(isIsbn13("9780321146534"), false) // Should be 3
	assertEquals(isIsbn13("9780596000481"), false) // Should be 0
	assertEquals(isIsbn13("9780201633611"), false) // Should be 0
	assertEquals(isIsbn13("9780131103628"), false) // Should be 7
})

Deno.test("_isIsbn13 returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isIsbn13(""), false) // Empty
	assertEquals(isIsbn13("123456789012"), false) // Too short
	assertEquals(isIsbn13("12345678901234"), false) // Too long
	assertEquals(isIsbn13("123456789012345"), false) // Much too long
})

Deno.test("_isIsbn13 returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isIsbn13("978030640615A"), false) // A not allowed
	assertEquals(isIsbn13("978030640615a"), false) // Lowercase not allowed
	assertEquals(isIsbn13("978030640615 "), false) // Space not allowed
	assertEquals(isIsbn13("978030640615-"), false) // Hyphen not allowed
	assertEquals(isIsbn13("978030640615."), false) // Dot not allowed
	assertEquals(isIsbn13("978030640615@"), false) // Special char not allowed
})

Deno.test("_isIsbn13 returns false for strings with invalid prefixes", function returnsFalseForInvalidPrefixes() {
	assertEquals(isIsbn13("9770306406157"), false) // 977 not valid prefix
	assertEquals(isIsbn13("9790306406157"), false) // 979 with invalid checksum
	assertEquals(isIsbn13("9800306406157"), false) // 980 not valid prefix
	assertEquals(isIsbn13("1230306406157"), false) // 123 not valid prefix
})

Deno.test("_isIsbn13 returns false for non-string inputs", function returnsFalseForNonStrings() {
	// TypeScript should prevent these, but test runtime behavior
	assertEquals(isIsbn13(1234567890123 as any), false)
	assertEquals(isIsbn13(null as any), false)
	assertEquals(isIsbn13(undefined as any), false)
	assertEquals(isIsbn13({} as any), false)
	assertEquals(isIsbn13([] as any), false)
})

Deno.test("_isIsbn13 works as type guard", function typeGuard() {
	const value: string | number = "9780306406157"

	if (isIsbn13(value)) {
		// TypeScript knows value is Isbn13 here
		assertEquals(typeof value, "string")
		assertEquals(value.length, 13)
	}

	const invalidValue: string | number = "invalid"

	if (!isIsbn13(invalidValue)) {
		// TypeScript knows invalidValue is not Isbn13 here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("_isIsbn13 - property: valid ISBN-13 strings pass", function validIsbn13Pass() {
	// Test with known valid ISBN-13 strings
	const validIsbn13s = [
		"9780306406157",
		"9780471958697",
		"9780321146533",
		"9780131103627",
		"9780201633610",
		"9780262033848",
		"9780132350884",
		"9780321127426",
		"9780735619678",
	]

	validIsbn13s.forEach(function testValidIsbn13(isbn) {
		assertEquals(isIsbn13(isbn), true, `Expected ${isbn} to be valid`)
	})
})

Deno.test("_isIsbn13 - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notLength13(s) {
				return s.length !== 13
			}),
			function propertyInvalidLength(value) {
				assertEquals(isIsbn13(value), false)
			},
		),
	)
})

Deno.test("_isIsbn13 - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function length13(s) {
				return s.length === 13
			}).filter(function hasInvalidChars(s) {
				return s.split("").some(function isInvalidChar(c) {
					return !"0123456789".includes(c)
				})
			}),
			function propertyInvalidChars(value) {
				assertEquals(isIsbn13(value), false)
			},
		),
	)
})

Deno.test("_isIsbn13 - property: strings with invalid prefixes fail", function invalidPrefixesFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function length13(s) {
				return s.length === 13
			}).filter(function hasValidChars(s) {
				return s.split("").every(function isValidChar(c) {
					return "0123456789".includes(c)
				})
			}).filter(function invalidPrefix(s) {
				return !["978", "979"].includes(s.substring(0, 3))
			}),
			function propertyInvalidPrefixes(value) {
				assertEquals(isIsbn13(value), false)
			},
		),
	)
})

Deno.test("_isIsbn13 - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isIsbn13(value)
				const second = isIsbn13(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("_isIsbn13 - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isIsbn13(value as any), false)
			},
		),
	)
})
