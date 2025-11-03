import { assertEquals } from "@std/assert"

import isBase58 from "@sitebender/toolsmith/predicates/isBase58/index.ts"

Deno.test("isBase58 returns true for valid Base58 strings", function returnsTrueForValid() {
	assertEquals(isBase58("3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy"), true)
	assertEquals(
		isBase58("5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ"),
		true,
	)
	assertEquals(isBase58("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"), true)
	assertEquals(isBase58("abc123"), true)
	assertEquals(isBase58("zzzz"), true)
})

Deno.test("isBase58 returns false for empty string", function returnsFalseForEmpty() {
	assertEquals(isBase58(""), false)
})

Deno.test("isBase58 returns false for strings with excluded characters", function returnsFalseForExcluded() {
	assertEquals(isBase58("0123456789"), false)
	assertEquals(isBase58("OOO"), false)
	assertEquals(isBase58("III"), false)
	assertEquals(isBase58("lll"), false)
	assertEquals(isBase58("test0"), false)
	assertEquals(isBase58("testO"), false)
	assertEquals(isBase58("testI"), false)
	assertEquals(isBase58("testl"), false)
})

Deno.test("isBase58 returns false for strings with invalid characters", function returnsFalseForInvalid() {
	assertEquals(isBase58("abc@def"), false)
	assertEquals(isBase58("hello world"), false)
	assertEquals(isBase58("test+value"), false)
	assertEquals(isBase58("test-value"), false)
	assertEquals(isBase58("test_value"), false)
})

Deno.test("isBase58 returns false for non-strings", function returnsFalseForNonStrings() {
	assertEquals(isBase58(null as any), false)
	assertEquals(isBase58(undefined as any), false)
	assertEquals(isBase58(123 as any), false)
	assertEquals(isBase58({} as any), false)
	assertEquals(isBase58([] as any), false)
})
