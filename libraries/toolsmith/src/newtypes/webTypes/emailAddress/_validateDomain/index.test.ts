import { assert, assertEquals } from "@std/assert"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import _validateDomain from "./index.ts"

Deno.test("_validateDomain: accepts simple domain", function () {
	const result = _validateDomain("example.com")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts subdomain", function () {
	const result = _validateDomain("mail.example.com")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts multiple subdomains", function () {
	const result = _validateDomain("sub.domain.example.co.uk")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts hyphen in label", function () {
	const result = _validateDomain("my-domain.com")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts internationalized domain (German)", function () {
	const result = _validateDomain("münchen.de")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts internationalized domain (Spanish)", function () {
	const result = _validateDomain("españa.es")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts internationalized domain (Hindi)", function () {
	const result = _validateDomain("डोमेन.भारत")

	assert(isOk(result))
})

Deno.test("_validateDomain: accepts numbers in labels", function () {
	const result = _validateDomain("domain123.com")

	assert(isOk(result))
})

Deno.test("_validateDomain: rejects empty string", function () {
	const result = _validateDomain("")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_EMPTY")
})

Deno.test("_validateDomain: rejects domain over 253 chars", function () {
	const longDomain = "a".repeat(250) + ".com"
	const result = _validateDomain(longDomain)

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_TOO_LONG")
})

Deno.test("_validateDomain: rejects domain without TLD", function () {
	const result = _validateDomain("example")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_NO_TLD")
})

Deno.test("_validateDomain: rejects leading dot", function () {
	const result = _validateDomain(".example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_LEADING_DOT")
})

Deno.test("_validateDomain: rejects trailing dot", function () {
	const result = _validateDomain("example.com.")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_TRAILING_DOT")
})

Deno.test("_validateDomain: rejects consecutive dots", function () {
	const result = _validateDomain("example..com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_CONSECUTIVE_DOTS")
})

Deno.test("_validateDomain: rejects label over 63 chars", function () {
	const longLabel = "a".repeat(64) + ".com"
	const result = _validateDomain(longLabel)

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_LABEL_TOO_LONG")
})

Deno.test("_validateDomain: accepts label exactly 63 chars", function () {
	const exactLabel = "a".repeat(63) + ".com"
	const result = _validateDomain(exactLabel)

	assert(isOk(result))
})

Deno.test("_validateDomain: rejects label starting with hyphen", function () {
	const result = _validateDomain("-example.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_DOMAIN_LABEL_LEADING_HYPHEN",
	)
})

Deno.test("_validateDomain: rejects label ending with hyphen", function () {
	const result = _validateDomain("example-.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_DOMAIN_LABEL_TRAILING_HYPHEN",
	)
})

Deno.test("_validateDomain: rejects invalid characters", function () {
	const result = _validateDomain("example!.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER")
})

Deno.test("_validateDomain: rejects spaces", function () {
	const result = _validateDomain("exam ple.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER")
})

Deno.test("_validateDomain: rejects underscore in label", function () {
	const result = _validateDomain("example_domain.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER")
})
