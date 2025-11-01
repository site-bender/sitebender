import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import base58 from "@sitebender/toolsmith/newtypes/stringTypes/base58/index.ts"

Deno.test("base58 returns Ok for valid Base58 strings", function returnsOkForValid() {
	const result1 = base58("3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy" as any)
	}

	const result2 = base58("5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ")
	assertEquals(result2._tag, "Ok")

	const result3 = base58("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2")
	assertEquals(result3._tag, "Ok")

	const result4 = base58("abc123")
	assertEquals(result4._tag, "Ok")
})

Deno.test("base58 returns Error for empty string", function returnsErrorForEmpty() {
	const result = base58("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "BASE58_EMPTY")
		assertEquals(result.error.field, "base58")
		assertEquals(result.error.severity, "requirement")
	}
})

Deno.test("base58 returns Error for strings with excluded characters", function returnsErrorForExcluded() {
	const result1 = base58("0123456789")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "BASE58_INVALID_CHARACTERS")
	}

	const result2 = base58("OOO")
	assertEquals(result2._tag, "Error")

	const result3 = base58("III")
	assertEquals(result3._tag, "Error")

	const result4 = base58("lll")
	assertEquals(result4._tag, "Error")
})

Deno.test("base58 returns Error for strings with invalid characters", function returnsErrorForInvalid() {
	const result1 = base58("abc@def")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "BASE58_INVALID_CHARACTERS")
	}

	const result2 = base58("hello world")
	assertEquals(result2._tag, "Error")

	const result3 = base58("test+value")
	assertEquals(result3._tag, "Error")
})

Deno.test("base58 - property: valid Base58 alphabet returns Ok", function propertyValidReturnsOk() {
	const base58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

	fc.assert(
		fc.property(
			fc.array(fc.constantFrom(...base58Alphabet.split("")), { minLength: 1, maxLength: 100 }),
			function propertyValidBase58(chars) {
				const value = chars.join("")
				const result = base58(value)
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("base58 - property: strings with 0OIl return Error", function propertyExcludedReturnsError() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }).filter(function containsExcluded(s) {
				return /[0OIl]/.test(s)
			}),
			function propertyInvalidChars(value) {
				const result = base58(value)
				assertEquals(result._tag, "Error")
			},
		),
	)
})
