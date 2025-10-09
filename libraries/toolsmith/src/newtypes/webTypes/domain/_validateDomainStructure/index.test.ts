import { assertEquals } from "@std/assert"
import _validateDomainStructure from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainStructure/index.ts"

Deno.test("_validateDomainStructure - accepts valid simple domain", function () {
	const result = _validateDomainStructure("example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "example.com")
	}
})

Deno.test("_validateDomainStructure - accepts subdomain", function () {
	const result = _validateDomainStructure("www.example.com")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts multi-level TLD", function () {
	const result = _validateDomainStructure("example.co.uk")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts internationalized domain", function () {
	const result = _validateDomainStructure("münchen.de")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts maximum length domain (253 chars)", function () {
	const longDomain = "a".repeat(63) + "." + "b".repeat(63) + "." +
		"c".repeat(63) + "." + "d".repeat(58) + ".co"
	const result = _validateDomainStructure(longDomain)

	assertEquals(result._tag, "Ok")
	assertEquals(longDomain.length, 253)
})

Deno.test("_validateDomainStructure - rejects empty string", function () {
	const result = _validateDomainStructure("")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_EMPTY")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects domain too long (> 253 chars)", function () {
	const tooLong = "a".repeat(251) + ".co"
	const result = _validateDomainStructure(tooLong)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_TOO_LONG")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects domain without TLD (no dot)", function () {
	const result = _validateDomainStructure("example")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_NO_TLD")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects localhost (no dot)", function () {
	const result = _validateDomainStructure("localhost")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_NO_TLD")
	}
})

Deno.test("_validateDomainStructure - rejects leading dot", function () {
	const result = _validateDomainStructure(".example.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LEADING_DOT")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects trailing dot", function () {
	const result = _validateDomainStructure("example.com.")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_TRAILING_DOT")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects consecutive dots", function () {
	const result = _validateDomainStructure("example..com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_CONSECUTIVE_DOTS")
		assertEquals(result.error.field, "domain")
	}
})

Deno.test("_validateDomainStructure - rejects triple consecutive dots", function () {
	const result = _validateDomainStructure("example...com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_CONSECUTIVE_DOTS")
	}
})

Deno.test("_validateDomainStructure - accepts single character labels", function () {
	const result = _validateDomainStructure("a.b.com")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts numeric domain", function () {
	const result = _validateDomainStructure("123.com")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts hyphenated domain", function () {
	const result = _validateDomainStructure("my-example.com")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts Punycode domain", function () {
	const result = _validateDomainStructure("xn--mnchen-3ya.de")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainStructure - accepts deep nesting", function () {
	const result = _validateDomainStructure("a.b.c.d.e.example.com")

	assertEquals(result._tag, "Ok")
})
