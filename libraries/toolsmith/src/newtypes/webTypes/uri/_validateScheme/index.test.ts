import { assertEquals } from "@std/assert"
import _validateScheme from "./index.ts"

Deno.test("_validateScheme: accepts http", function () {
	const result = _validateScheme("http")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http")
	}
})

Deno.test("_validateScheme: accepts https", function () {
	const result = _validateScheme("https")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts ftp", function () {
	const result = _validateScheme("ftp")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts mailto", function () {
	const result = _validateScheme("mailto")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts urn", function () {
	const result = _validateScheme("urn")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts file", function () {
	const result = _validateScheme("file")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts data", function () {
	const result = _validateScheme("data")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts tel", function () {
	const result = _validateScheme("tel")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts ssh", function () {
	const result = _validateScheme("ssh")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts git", function () {
	const result = _validateScheme("git")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts svn with plus", function () {
	const result = _validateScheme("svn+ssh")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts scheme with dot", function () {
	const result = _validateScheme("x.test")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts scheme with hyphen", function () {
	const result = _validateScheme("x-test")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: accepts scheme with digits", function () {
	const result = _validateScheme("h2")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateScheme: rejects empty scheme", function () {
	const result = _validateScheme("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_EMPTY")
	}
})

Deno.test("_validateScheme: rejects uppercase before normalization", function () {
	const result = _validateScheme("HTTP")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_INVALID_FORMAT")
	}
})

Deno.test("_validateScheme: rejects scheme starting with digit", function () {
	const result = _validateScheme("123scheme")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_INVALID_FORMAT")
	}
})

Deno.test("_validateScheme: rejects scheme with underscore", function () {
	const result = _validateScheme("my_scheme")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_INVALID_FORMAT")
	}
})

Deno.test("_validateScheme: rejects scheme with space", function () {
	const result = _validateScheme("my scheme")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_INVALID_FORMAT")
	}
})

Deno.test("_validateScheme: rejects scheme too long", function () {
	const longScheme = "a" + "b".repeat(64)
	const result = _validateScheme(longScheme)
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_SCHEME_TOO_LONG")
	}
})

Deno.test("_validateScheme: accepts scheme exactly 64 chars", function () {
	const exactScheme = "a" + "b".repeat(63)
	const result = _validateScheme(exactScheme)
	assertEquals(result._tag, "Ok")
})
