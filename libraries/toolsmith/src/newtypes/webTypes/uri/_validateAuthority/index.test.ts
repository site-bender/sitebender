import { assertEquals } from "@std/assert"
import _validateAuthority from "./index.ts"

// Domain authorities
Deno.test("_validateAuthority: accepts domain", function () {
	const result = _validateAuthority("example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts subdomain", function () {
	const result = _validateAuthority("sub.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts domain with port", function () {
	const result = _validateAuthority("example.com:8080")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts userinfo@domain", function () {
	const result = _validateAuthority("user@example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts user:pass@domain", function () {
	const result = _validateAuthority("user:pass@example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts user@domain:port", function () {
	const result = _validateAuthority("user@example.com:8080")
	assertEquals(result._tag, "Ok")
})

// IPv4 authorities
Deno.test("_validateAuthority: accepts IPv4", function () {
	const result = _validateAuthority("192.168.1.1")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts IPv4 with port", function () {
	const result = _validateAuthority("192.168.1.1:8080")
	assertEquals(result._tag, "Ok")
})

// IPv6 authorities
Deno.test("_validateAuthority: accepts IPv6 in brackets", function () {
	const result = _validateAuthority("[2001:db8::1]")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts IPv6 with port", function () {
	const result = _validateAuthority("[2001:db8::1]:8080")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: accepts IPv6 localhost", function () {
	const result = _validateAuthority("[::1]")
	assertEquals(result._tag, "Ok")
})

// Error cases
Deno.test("_validateAuthority: accepts empty authority", function () {
	const result = _validateAuthority("")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateAuthority: rejects IPv6 without closing bracket", function () {
	const result = _validateAuthority("[2001:db8::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_AUTHORITY_IPV6_INVALID")
	}
})

Deno.test("_validateAuthority: rejects invalid IPv4", function () {
	const result = _validateAuthority("256.256.256.256")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_AUTHORITY_IPV4_INVALID")
	}
})

Deno.test("_validateAuthority: rejects IPv4 with leading zeros", function () {
	const result = _validateAuthority("192.168.001.001")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_AUTHORITY_IPV4_INVALID")
	}
})

Deno.test("_validateAuthority: rejects invalid port", function () {
	const result = _validateAuthority("example.com:99999")
	assertEquals(result._tag, "Error")
})

Deno.test("_validateAuthority: rejects invalid domain", function () {
	const result = _validateAuthority("invalid..domain")
	assertEquals(result._tag, "Error")
})
