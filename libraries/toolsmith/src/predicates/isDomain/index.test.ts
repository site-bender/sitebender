import { assertEquals } from "@std/assert"
import isDomain from "./index.ts"

Deno.test("_isDomain - returns true for valid simple domain", function () {
	assertEquals(isDomain("example.com"), true)
})

Deno.test("_isDomain - returns true for subdomain", function () {
	assertEquals(isDomain("www.example.com"), true)
})

Deno.test("_isDomain - returns true for multi-level TLD", function () {
	assertEquals(isDomain("example.co.uk"), true)
})

Deno.test("_isDomain - returns true for internationalized domain", function () {
	assertEquals(isDomain("münchen.de"), true)
})

Deno.test("_isDomain - returns true for Punycode domain", function () {
	assertEquals(isDomain("xn--mnchen-3ya.de"), true)
})

Deno.test("_isDomain - returns true for hyphenated domain", function () {
	assertEquals(isDomain("my-example.com"), true)
})

Deno.test("_isDomain - returns true for numeric domain", function () {
	assertEquals(isDomain("123.com"), true)
})

Deno.test("_isDomain - returns true for single character labels", function () {
	assertEquals(isDomain("a.b.com"), true)
})

Deno.test("_isDomain - returns false for empty string", function () {
	assertEquals(isDomain(""), false)
})

Deno.test("_isDomain - returns false for domain without TLD", function () {
	assertEquals(isDomain("example"), false)
})

Deno.test("_isDomain - returns false for localhost", function () {
	assertEquals(isDomain("localhost"), false)
})

Deno.test("_isDomain - returns false for leading dot", function () {
	assertEquals(isDomain(".example.com"), false)
})

Deno.test("_isDomain - returns false for trailing dot", function () {
	assertEquals(isDomain("example.com."), false)
})

Deno.test("_isDomain - returns false for consecutive dots", function () {
	assertEquals(isDomain("example..com"), false)
})

Deno.test("_isDomain - returns false for label with leading hyphen", function () {
	assertEquals(isDomain("-example.com"), false)
})

Deno.test("_isDomain - returns false for label with trailing hyphen", function () {
	assertEquals(isDomain("example-.com"), false)
})

Deno.test("_isDomain - returns false for Punycode conflict", function () {
	assertEquals(isDomain("ab--cd.com"), false)
})

Deno.test("_isDomain - returns false for label with space", function () {
	assertEquals(isDomain("ex ample.com"), false)
})

Deno.test("_isDomain - returns false for label with invalid character", function () {
	assertEquals(isDomain("example@.com"), false)
})

Deno.test("_isDomain - returns false for domain too long", function () {
	const tooLong = "a".repeat(251) + ".co"
	assertEquals(isDomain(tooLong), false)
})

Deno.test("_isDomain - returns false for label too long", function () {
	const longLabel = "a".repeat(64)
	assertEquals(isDomain(`${longLabel}.com`), false)
})
