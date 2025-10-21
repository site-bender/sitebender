import { assertEquals } from "@std/assert"
import isHostname from "@sitebender/toolsmith/validation/isHostname/index.ts"

Deno.test("_isHostname - accepts lowercase localhost", function () {
	assertEquals(isHostname("localhost"), true)
})

Deno.test("_isHostname - accepts uppercase localhost", function () {
	assertEquals(isHostname("LOCALHOST"), true)
})

Deno.test("_isHostname - accepts mixed case localhost", function () {
	assertEquals(isHostname("LocalHost"), true)
})

Deno.test("_isHostname - accepts valid domain", function () {
	assertEquals(isHostname("example.com"), true)
})

Deno.test("_isHostname - accepts subdomain", function () {
	assertEquals(isHostname("www.example.com"), true)
})

Deno.test("_isHostname - accepts internationalized domain", function () {
	assertEquals(isHostname("münchen.de"), true)
})

Deno.test("_isHostname - accepts IPv4 address", function () {
	assertEquals(isHostname("192.168.1.1"), true)
})

Deno.test("_isHostname - accepts IPv4 loopback", function () {
	assertEquals(isHostname("127.0.0.1"), true)
})

Deno.test("_isHostname - accepts IPv6 address", function () {
	assertEquals(isHostname("2001:db8::1"), true)
})

Deno.test("_isHostname - accepts IPv6 loopback", function () {
	assertEquals(isHostname("::1"), true)
})

Deno.test("_isHostname - accepts full IPv6 address", function () {
	assertEquals(
		isHostname("2001:0db8:0000:0000:0000:0000:0000:0001"),
		true,
	)
})

Deno.test("_isHostname - rejects empty string", function () {
	assertEquals(isHostname(""), false)
})

Deno.test("_isHostname - rejects invalid domain (no TLD)", function () {
	assertEquals(isHostname("example"), false)
})

Deno.test("_isHostname - accepts numeric domain that looks like malformed IPv4", function () {
	assertEquals(isHostname("192.168.1.1.1"), true)
})

Deno.test("_isHostname - accepts numeric domain with large numbers", function () {
	assertEquals(isHostname("192.168.1.256"), true)
})

Deno.test("_isHostname - rejects invalid IPv6", function () {
	assertEquals(isHostname("gggg::1"), false)
})

Deno.test("_isHostname - rejects random string", function () {
	assertEquals(isHostname("not a hostname!"), false)
})

Deno.test("_isHostname - rejects domain with spaces", function () {
	assertEquals(isHostname("ex ample.com"), false)
})
