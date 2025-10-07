import { assertEquals } from "@std/assert"
import _isHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/_isHostname/index.ts"

Deno.test("_isHostname - accepts lowercase localhost", function () {
	assertEquals(_isHostname("localhost"), true)
})

Deno.test("_isHostname - accepts uppercase localhost", function () {
	assertEquals(_isHostname("LOCALHOST"), true)
})

Deno.test("_isHostname - accepts mixed case localhost", function () {
	assertEquals(_isHostname("LocalHost"), true)
})

Deno.test("_isHostname - accepts valid domain", function () {
	assertEquals(_isHostname("example.com"), true)
})

Deno.test("_isHostname - accepts subdomain", function () {
	assertEquals(_isHostname("www.example.com"), true)
})

Deno.test("_isHostname - accepts internationalized domain", function () {
	assertEquals(_isHostname("münchen.de"), true)
})

Deno.test("_isHostname - accepts IPv4 address", function () {
	assertEquals(_isHostname("192.168.1.1"), true)
})

Deno.test("_isHostname - accepts IPv4 loopback", function () {
	assertEquals(_isHostname("127.0.0.1"), true)
})

Deno.test("_isHostname - accepts IPv6 address", function () {
	assertEquals(_isHostname("2001:db8::1"), true)
})

Deno.test("_isHostname - accepts IPv6 loopback", function () {
	assertEquals(_isHostname("::1"), true)
})

Deno.test("_isHostname - accepts full IPv6 address", function () {
	assertEquals(
		_isHostname("2001:0db8:0000:0000:0000:0000:0000:0001"),
		true,
	)
})

Deno.test("_isHostname - rejects empty string", function () {
	assertEquals(_isHostname(""), false)
})

Deno.test("_isHostname - rejects invalid domain (no TLD)", function () {
	assertEquals(_isHostname("example"), false)
})

Deno.test("_isHostname - accepts numeric domain that looks like malformed IPv4", function () {
	assertEquals(_isHostname("192.168.1.1.1"), true)
})

Deno.test("_isHostname - accepts numeric domain with large numbers", function () {
	assertEquals(_isHostname("192.168.1.256"), true)
})

Deno.test("_isHostname - rejects invalid IPv6", function () {
	assertEquals(_isHostname("gggg::1"), false)
})

Deno.test("_isHostname - rejects random string", function () {
	assertEquals(_isHostname("not a hostname!"), false)
})

Deno.test("_isHostname - rejects domain with spaces", function () {
	assertEquals(_isHostname("ex ample.com"), false)
})
