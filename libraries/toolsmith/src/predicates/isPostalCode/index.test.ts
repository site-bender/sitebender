import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isPostalCode from "@sitebender/toolsmith/predicates/isPostalCode/index.ts"

Deno.test("isPostalCode returns true for valid UK postal codes", function returnsTrueForValidUk() {
	assertEquals(isPostalCode("SW1A 1AA"), true) // Buckingham Palace
	assertEquals(isPostalCode("EC1A 1BB"), true) // Barbican
	assertEquals(isPostalCode("W1A 0AX"), true) // BBC Broadcasting House
	assertEquals(isPostalCode("M1 1AE"), true) // Manchester
	assertEquals(isPostalCode("B33 8TH"), true) // Birmingham
})

Deno.test("isPostalCode returns true for valid Canadian postal codes", function returnsTrueForValidCanadian() {
	assertEquals(isPostalCode("K1A 0B1"), true) // Ottawa
	assertEquals(isPostalCode("M5V 3A8"), true) // Toronto
	assertEquals(isPostalCode("H3Z 2Y7"), true) // Montreal
	assertEquals(isPostalCode("V6B 4Y8"), true) // Vancouver
	assertEquals(isPostalCode("T2P 2M5"), true) // Calgary
})

Deno.test("isPostalCode returns true for valid German postal codes", function returnsTrueForValidGerman() {
	assertEquals(isPostalCode("10115"), true) // Berlin
	assertEquals(isPostalCode("80331"), true) // Munich
	assertEquals(isPostalCode("20095"), true) // Hamburg
	assertEquals(isPostalCode("60311"), true) // Frankfurt
	assertEquals(isPostalCode("70173"), true) // Stuttgart
})

Deno.test("isPostalCode returns true for valid Japanese postal codes", function returnsTrueForValidJapanese() {
	assertEquals(isPostalCode("100-0001"), true) // Tokyo
	assertEquals(isPostalCode("530-0001"), true) // Osaka
	assertEquals(isPostalCode("450-0002"), true) // Nagoya
	assertEquals(isPostalCode("060-0001"), true) // Sapporo
	assertEquals(isPostalCode("810-0001"), true) // Fukuoka
})

Deno.test("isPostalCode returns true for valid US ZIP codes", function returnsTrueForValidUs() {
	assertEquals(isPostalCode("90210"), true) // Beverly Hills
	assertEquals(isPostalCode("10001"), true) // New York
	assertEquals(isPostalCode("60601"), true) // Chicago
	assertEquals(isPostalCode("90210-1234"), true) // ZIP+4
})

Deno.test("isPostalCode returns false for too short strings", function returnsFalseForTooShort() {
	assertEquals(isPostalCode(""), false) // Empty
	assertEquals(isPostalCode("1"), false) // 1 char
	assertEquals(isPostalCode("12"), false) // 2 chars
	assertEquals(isPostalCode("  "), false) // Just spaces
})

Deno.test("isPostalCode returns false for too long strings", function returnsFalseForTooLong() {
	assertEquals(isPostalCode("12345678901"), false) // 11 chars - too long
	assertEquals(isPostalCode("123456789012"), false) // 12 chars
	assertEquals(isPostalCode("1234567890123"), false) // 13 chars
})

Deno.test("isPostalCode returns false for invalid characters", function returnsFalseForInvalidChars() {
	assertEquals(isPostalCode("SW1A@1AA"), false) // @ symbol
	assertEquals(isPostalCode("K1A.0B1"), false) // Dot
	assertEquals(isPostalCode("10115!"), false) // Exclamation
	assertEquals(isPostalCode("100-0001#"), false) // Hash
	assertEquals(isPostalCode("90210_1234"), false) // Underscore
})

Deno.test("isPostalCode handles trimming correctly", function handlesTrimming() {
	assertEquals(isPostalCode("  SW1A 1AA  "), true) // Leading/trailing spaces
	assertEquals(isPostalCode("\t10115\t"), true) // Tabs
	assertEquals(isPostalCode(" K1A 0B1 "), true) // Spaces
})

Deno.test("isPostalCode returns false for non-string inputs", function returnsFalseForNonStrings() {
	assertEquals(isPostalCode(90210 as any), false)
	assertEquals(isPostalCode(null as any), false)
	assertEquals(isPostalCode(undefined as any), false)
	assertEquals(isPostalCode({} as any), false)
	assertEquals(isPostalCode([] as any), false)
	assertEquals(isPostalCode(true as any), false)
})

Deno.test("isPostalCode works as type guard", function typeGuard() {
	const value: string | number = "SW1A 1AA"

	if (isPostalCode(value)) {
		// TypeScript knows value is PostalCode here
		assertEquals(typeof value, "string")
		assertEquals(value.trim().length >= 3 && value.trim().length <= 10, true)
	}

	const invalidValue: string | number = "invalid!@#"

	if (!isPostalCode(invalidValue)) {
		// TypeScript knows invalidValue is not PostalCode here
		assertEquals(typeof invalidValue, "string")
	}
})

Deno.test("isPostalCode - property: valid postal codes pass", function validPostalCodesPass() {
	const validPostalCodes = [
		"SW1A 1AA",
		"K1A 0B1",
		"10115",
		"100-0001",
		"90210",
		"M1 1AE",
		"H3Z 2Y7",
		"80331",
		"530-0001",
		"60601",
	]

	validPostalCodes.forEach(function testValidPostalCode(code) {
		assertEquals(isPostalCode(code), true, `Expected ${code} to be valid`)
	})
})

Deno.test("isPostalCode - property: invalid length strings fail", function invalidLengthFail() {
	fc.assert(
		fc.property(
			fc.string().filter(function notValidLength(s) {
				const trimmed = s.trim()
				return trimmed.length < 3 || trimmed.length > 10
			}),
			function propertyInvalidLength(value) {
				assertEquals(isPostalCode(value), false)
			},
		),
	)
})

Deno.test("isPostalCode - property: strings with invalid characters fail", function invalidCharsFail() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 3, maxLength: 10 }).filter(
				function hasInvalidChars(s) {
					return !/^[A-Z0-9\s-]+$/i.test(s)
				},
			),
			function propertyInvalidChars(value) {
				assertEquals(isPostalCode(value), false)
			},
		),
	)
})

Deno.test("isPostalCode - property: idempotent", function idempotent() {
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

Deno.test("isPostalCode - property: non-string inputs fail", function nonStringInputsFail() {
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
