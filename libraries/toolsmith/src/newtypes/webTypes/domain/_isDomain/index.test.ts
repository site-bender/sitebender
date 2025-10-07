import { assertEquals } from "@std/assert"
import _isDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/_isDomain/index.ts"

Deno.test("_isDomain - returns true for valid simple domain", function () {
	assertEquals(_isDomain("example.com"), true)
})

Deno.test("_isDomain - returns true for subdomain", function () {
	assertEquals(_isDomain("www.example.com"), true)
})

Deno.test("_isDomain - returns true for multi-level TLD", function () {
	assertEquals(_isDomain("example.co.uk"), true)
})

Deno.test("_isDomain - returns true for internationalized domain", function () {
	assertEquals(_isDomain("münchen.de"), true)
})

Deno.test("_isDomain - returns true for Punycode domain", function () {
	assertEquals(_isDomain("xn--mnchen-3ya.de"), true)
})

Deno.test("_isDomain - returns true for hyphenated domain", function () {
	assertEquals(_isDomain("my-example.com"), true)
})

Deno.test("_isDomain - returns true for numeric domain", function () {
	assertEquals(_isDomain("123.com"), true)
})

Deno.test("_isDomain - returns true for single character labels", function () {
	assertEquals(_isDomain("a.b.com"), true)
})

Deno.test("_isDomain - returns false for empty string", function () {
	assertEquals(_isDomain(""), false)
})

Deno.test("_isDomain - returns false for domain without TLD", function () {
	assertEquals(_isDomain("example"), false)
})

Deno.test("_isDomain - returns false for localhost", function () {
	assertEquals(_isDomain("localhost"), false)
})

Deno.test("_isDomain - returns false for leading dot", function () {
	assertEquals(_isDomain(".example.com"), false)
})

Deno.test("_isDomain - returns false for trailing dot", function () {
	assertEquals(_isDomain("example.com."), false)
})

Deno.test("_isDomain - returns false for consecutive dots", function () {
	assertEquals(_isDomain("example..com"), false)
})

Deno.test("_isDomain - returns false for label with leading hyphen", function () {
	assertEquals(_isDomain("-example.com"), false)
})

Deno.test("_isDomain - returns false for label with trailing hyphen", function () {
	assertEquals(_isDomain("example-.com"), false)
})

Deno.test("_isDomain - returns false for Punycode conflict", function () {
	assertEquals(_isDomain("ab--cd.com"), false)
})

Deno.test("_isDomain - returns false for label with space", function () {
	assertEquals(_isDomain("ex ample.com"), false)
})

Deno.test("_isDomain - returns false for label with invalid character", function () {
	assertEquals(_isDomain("example@.com"), false)
})

Deno.test("_isDomain - returns false for domain too long", function () {
	const tooLong = "a".repeat(251) + ".co"
	assertEquals(_isDomain(tooLong), false)
})

Deno.test("_isDomain - returns false for label too long", function () {
	const longLabel = "a".repeat(64)
	assertEquals(_isDomain(`${longLabel}.com`), false)
})
