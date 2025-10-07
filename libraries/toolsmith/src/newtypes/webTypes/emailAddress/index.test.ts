import { assert, assertEquals } from "@std/assert"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import emailAddress from "./index.ts"

Deno.test("emailAddress: accepts valid simple email", function () {
	const result = emailAddress("user@example.com")

	assert(isOk(result))
	assertEquals(result.value, "user@example.com")
})

Deno.test("emailAddress: accepts email with dots in local", function () {
	const result = emailAddress("first.last@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts email with plus addressing", function () {
	const result = emailAddress("user+tag@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts email with underscore", function () {
	const result = emailAddress("user_name@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts email with hyphen", function () {
	const result = emailAddress("user-name@example.co.uk")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts email with numbers", function () {
	const result = emailAddress("user123@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts single character local", function () {
	const result = emailAddress("a@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts Chinese characters", function () {
	const result = emailAddress("用户@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts German umlaut in local", function () {
	const result = emailAddress("müller@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts Spanish accent in local", function () {
	const result = emailAddress("josé@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts Hindi characters in local", function () {
	const result = emailAddress("संपर्क@example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts internationalized domain (German)", function () {
	const result = emailAddress("user@münchen.de")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts internationalized domain (Spanish)", function () {
	const result = emailAddress("user@españa.es")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts fully internationalized email", function () {
	const result = emailAddress("josé@españa.es")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts subdomain", function () {
	const result = emailAddress("user@mail.example.com")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts multiple subdomains", function () {
	const result = emailAddress("user@sub.domain.example.co.uk")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts hyphen in domain", function () {
	const result = emailAddress("user@example-domain.com")

	assert(isOk(result))
})

Deno.test("emailAddress: normalizes to lowercase", function () {
	const result = emailAddress("User@EXAMPLE.COM")

	assert(isOk(result))
	assertEquals(result.value, "user@example.com")
})

Deno.test("emailAddress: normalizes mixed case", function () {
	const result = emailAddress("First.Last@Example.Co.Uk")

	assert(isOk(result))
	assertEquals(result.value, "first.last@example.co.uk")
})

Deno.test("emailAddress: normalizes internationalized uppercase", function () {
	const result = emailAddress("JOSÉ@ESPAÑA.ES")

	assert(isOk(result))
	assertEquals(result.value, "josé@españa.es")
})

Deno.test("emailAddress: rejects empty string", function () {
	const result = emailAddress("")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_EMPTY")
})

Deno.test("emailAddress: rejects missing @ symbol", function () {
	const result = emailAddress("userexample.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_MISSING_AT_SYMBOL")
})

Deno.test("emailAddress: rejects multiple @ symbols", function () {
	const result = emailAddress("user@@example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_MULTIPLE_AT_SYMBOLS")
})

Deno.test("emailAddress: rejects missing local part", function () {
	const result = emailAddress("@example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_EMPTY")
})

Deno.test("emailAddress: rejects missing domain", function () {
	const result = emailAddress("user@")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_EMPTY")
})

Deno.test("emailAddress: rejects domain without TLD", function () {
	const result = emailAddress("user@example")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_NO_TLD")
})

Deno.test("emailAddress: rejects leading dot in local part", function () {
	const result = emailAddress(".user@example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_LEADING_DOT")
})

Deno.test("emailAddress: rejects trailing dot in local part", function () {
	const result = emailAddress("user.@example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_TRAILING_DOT")
})

Deno.test("emailAddress: rejects consecutive dots in local part", function () {
	const result = emailAddress("user..name@example.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_CONSECUTIVE_DOTS",
	)
})

Deno.test("emailAddress: rejects local part over 64 chars", function () {
	const longLocal = "a".repeat(65) + "@example.com"
	const result = emailAddress(longLocal)

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_TOO_LONG")
})

Deno.test("emailAddress: accepts local part exactly 64 chars", function () {
	const exactLocal = "a".repeat(64) + "@example.com"
	const result = emailAddress(exactLocal)

	assert(isOk(result))
})

Deno.test("emailAddress: rejects space in local part", function () {
	const result = emailAddress("user name@example.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
	)
})

Deno.test("emailAddress: rejects special chars in local part", function () {
	const result = emailAddress("user!#$@example.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
	)
})

Deno.test("emailAddress: rejects leading dot in domain", function () {
	const result = emailAddress("user@.example.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_LEADING_DOT")
})

Deno.test("emailAddress: rejects trailing dot in domain", function () {
	const result = emailAddress("user@example.com.")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_TRAILING_DOT")
})

Deno.test("emailAddress: rejects consecutive dots in domain", function () {
	const result = emailAddress("user@example..com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_CONSECUTIVE_DOTS")
})

Deno.test("emailAddress: rejects label starting with hyphen", function () {
	const result = emailAddress("user@-example.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_DOMAIN_LABEL_LEADING_HYPHEN",
	)
})

Deno.test("emailAddress: rejects label ending with hyphen", function () {
	const result = emailAddress("user@example-.com")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_DOMAIN_LABEL_TRAILING_HYPHEN",
	)
})

Deno.test("emailAddress: rejects domain label over 63 chars", function () {
	const longLabel = "a".repeat(64) + ".com"
	const result = emailAddress("user@" + longLabel)

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_LABEL_TOO_LONG")
})

Deno.test("emailAddress: accepts domain label exactly 63 chars", function () {
	const exactLabel = "a".repeat(63) + ".com"
	const result = emailAddress("user@" + exactLabel)

	assert(isOk(result))
})

Deno.test("emailAddress: rejects total length over 254 chars", function () {
	const local = "a".repeat(64)
	const domain = "b".repeat(63) + "." + "c".repeat(63) + "." + "d".repeat(63) + ".com"
	const longEmail = local + "@" + domain
	const result = emailAddress(longEmail)

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_TOO_LONG")
})

Deno.test("emailAddress: rejects invalid chars in domain", function () {
	const result = emailAddress("user@example!.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER")
})

Deno.test("emailAddress: rejects underscore in domain", function () {
	const result = emailAddress("user@example_domain.com")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER")
})

Deno.test("emailAddress: accepts complex valid email", function () {
	const result = emailAddress("first.last+tag_name-123@sub.example-domain.co.uk")

	assert(isOk(result))
})

Deno.test("emailAddress: accepts short but valid email", function () {
	const result = emailAddress("a@b.co")

	assert(isOk(result))
})
