import { assertEquals } from "@std/assert"
import _validateDomain from "./index.ts"

Deno.test("_validateDomain: accepts valid domain", function () {
	const result = _validateDomain("example.com")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "example.com")
	}
})

Deno.test("_validateDomain: accepts subdomain", function () {
	const result = _validateDomain("sub.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts multi-level subdomain", function () {
	const result = _validateDomain("deep.sub.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts domain with hyphen", function () {
	const result = _validateDomain("my-domain.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts internationalized domain", function () {
	const result = _validateDomain("münchen.de")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts Hindi domain with combining marks", function () {
	const result = _validateDomain("डोमेन.भारत")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts country code TLD", function () {
	const result = _validateDomain("example.co.uk")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: rejects empty domain", function () {
	const result = _validateDomain("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_EMPTY")
	}
})

Deno.test("_validateDomain: rejects IPv4 address", function () {
	const result = _validateDomain("192.168.1.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("_validateDomain: rejects IPv4 localhost", function () {
	const result = _validateDomain("127.0.0.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("_validateDomain: rejects IPv6 address brackets", function () {
	const result = _validateDomain("[2001:db8::1]")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("_validateDomain: rejects IPv6 localhost brackets", function () {
	const result = _validateDomain("[::1]")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("_validateDomain: rejects domain without TLD", function () {
	const result = _validateDomain("localhost")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_NO_TLD")
	}
})

Deno.test("_validateDomain: rejects domain with leading dot", function () {
	const result = _validateDomain(".example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_LEADING_DOT")
	}
})

Deno.test("_validateDomain: rejects domain with trailing dot", function () {
	const result = _validateDomain("example.com.")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_TRAILING_DOT")
	}
})

Deno.test("_validateDomain: rejects domain with consecutive dots", function () {
	const result = _validateDomain("example..com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_CONSECUTIVE_DOTS")
	}
})

Deno.test("_validateDomain: rejects label starting with hyphen", function () {
	const result = _validateDomain("-example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_LABEL_LEADING_HYPHEN")
	}
})

Deno.test("_validateDomain: rejects label ending with hyphen", function () {
	const result = _validateDomain("example-.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_LABEL_TRAILING_HYPHEN")
	}
})

Deno.test("_validateDomain: rejects label too long", function () {
	const longLabel = "a".repeat(64)
	const result = _validateDomain(`${longLabel}.com`)
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_LABEL_TOO_LONG")
	}
})

Deno.test("_validateDomain: rejects domain too long", function () {
	const longDomain = "a".repeat(250) + ".com"
	const result = _validateDomain(longDomain)
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_TOO_LONG")
	}
})

Deno.test("_validateDomain: rejects domain with invalid characters", function () {
	const result = _validateDomain("exam_ple.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomain: rejects domain with spaces", function () {
	const result = _validateDomain("exam ple.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomain: accepts exact 63 char label", function () {
	const label = "a".repeat(63)
	const result = _validateDomain(`${label}.com`)
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomain: accepts exact 253 char domain", function () {
	const domain = "a".repeat(60) + "." + "b".repeat(60) + "." +
		"c".repeat(60) + "." + "d".repeat(60) + ".com"
	const result = _validateDomain(domain)
	assertEquals(result._tag, "Ok")
})
