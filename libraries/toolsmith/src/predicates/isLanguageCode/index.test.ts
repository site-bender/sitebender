import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isLanguageCode from "@sitebender/toolsmith/predicates/isLanguageCode/index.ts"

Deno.test("isLanguageCode returns true for valid language codes", function returnsTrueForValid() {
	// Major languages
	assertEquals(isLanguageCode("en"), true) // English
	assertEquals(isLanguageCode("fr"), true) // French
	assertEquals(isLanguageCode("de"), true) // German
	assertEquals(isLanguageCode("es"), true) // Spanish
	assertEquals(isLanguageCode("ja"), true) // Japanese
	assertEquals(isLanguageCode("zh"), true) // Chinese
	assertEquals(isLanguageCode("hi"), true) // Hindi
	assertEquals(isLanguageCode("pt"), true) // Portuguese
	assertEquals(isLanguageCode("it"), true) // Italian
	assertEquals(isLanguageCode("ru"), true) // Russian
	assertEquals(isLanguageCode("ar"), true) // Arabic
	assertEquals(isLanguageCode("ko"), true) // Korean
	assertEquals(isLanguageCode("nl"), true) // Dutch
	assertEquals(isLanguageCode("sv"), true) // Swedish
	assertEquals(isLanguageCode("no"), true) // Norwegian
})

Deno.test("isLanguageCode is case-insensitive", function caseInsensitive() {
	assertEquals(isLanguageCode("EN"), true) // Uppercase
	assertEquals(isLanguageCode("En"), true) // Mixed case
	assertEquals(isLanguageCode("eN"), true) // Mixed case
	assertEquals(isLanguageCode("FR"), true) // Uppercase
	assertEquals(isLanguageCode("Fr"), true) // Mixed case
	assertEquals(isLanguageCode("DE"), true) // Uppercase
})

Deno.test("isLanguageCode returns false for wrong length strings", function returnsFalseForWrongLength() {
	assertEquals(isLanguageCode(""), false) // Empty
	assertEquals(isLanguageCode("e"), false) // 1 char
	assertEquals(isLanguageCode("eng"), false) // 3 chars
	assertEquals(isLanguageCode("engl"), false) // 4 chars
	assertEquals(isLanguageCode("a"), false) // 1 char
})

Deno.test("isLanguageCode returns false for strings with invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isLanguageCode("e1"), false) // Number
	assertEquals(isLanguageCode("en "), false) // Space
	assertEquals(isLanguageCode("e-"), false) // Hyphen
	assertEquals(isLanguageCode("e_"), false) // Underscore
	assertEquals(isLanguageCode("e."), false) // Dot
	assertEquals(isLanguageCode("e@"), false) // Special char
	assertEquals(isLanguageCode("12"), false) // All numbers
})

Deno.test("isLanguageCode returns false for non-string inputs", function returnsFalseForNonStrings() {
	assertEquals(isLanguageCode(42 as any), false)
	assertEquals(isLanguageCode(null as any), false)
	assertEquals(isLanguageCode(undefined as any), false)
	assertEquals(isLanguageCode({} as any), false)
	assertEquals(isLanguageCode([] as any), false)
	assertEquals(isLanguageCode(true as any), false)
})

Deno.test("isLanguageCode works as type guard", function typeGuard() {
	const value: string | number = "en"

	if (isLanguageCode(value)) {
		// TypeScript knows value is LanguageCode here
		assertEquals(typeof value, "string")
		assertEquals(value.length, 2)
	}

	const invalidValue: string | number = "eng"

	if (!isLanguageCode(invalidValue)) {
		// TypeScript knows invalidValue is not LanguageCode here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("isLanguageCode - property: valid language codes pass", function validLanguageCodesPass() {
	const validLanguageCodes = [
		"en",
		"fr",
		"de",
		"es",
		"ja",
		"zh",
		"hi",
		"pt",
		"it",
		"ru",
		"ar",
		"ko",
		"nl",
		"sv",
		"no",
		"da",
		"fi",
		"pl",
		"tr",
		"vi",
	]

	validLanguageCodes.forEach(function testValidLanguageCode(code) {
		assertEquals(isLanguageCode(code), true, `Expected ${code} to be valid`)
	})
})

Deno.test("isLanguageCode - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				return s.length !== 2
			}),
			function propertyInvalidLength(value) {
				assertEquals(isLanguageCode(value), false)
			},
		),
	)
})

Deno.test("isLanguageCode - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 2, maxLength: 2 }).filter(function hasInvalidChars(s) {
				const normalized = s.toLocaleLowerCase()
				return !/^[a-z]{2}$/.test(normalized)
			}),
			function propertyInvalidChars(value) {
				assertEquals(isLanguageCode(value), false)
			},
		),
	)
})

Deno.test("isLanguageCode - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = isLanguageCode(value)
				const second = isLanguageCode(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isLanguageCode - property: non-string inputs fail", function nonStringInputsFail() {
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
				assertEquals(isLanguageCode(value as any), false)
			},
		),
	)
})
