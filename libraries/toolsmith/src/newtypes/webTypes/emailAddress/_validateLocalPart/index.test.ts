import { assert, assertEquals } from "@std/assert"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import _validateLocalPart from "./index.ts"

Deno.test("_validateLocalPart: accepts simple ASCII local part", function () {
	const result = _validateLocalPart("user")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts dots in middle", function () {
	const result = _validateLocalPart("first.last")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts plus signs", function () {
	const result = _validateLocalPart("user+tag")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts underscores", function () {
	const result = _validateLocalPart("user_name")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts hyphens", function () {
	const result = _validateLocalPart("user-name")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts numbers", function () {
	const result = _validateLocalPart("user123")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts Unicode letters (Chinese)", function () {
	const result = _validateLocalPart("用户")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts Unicode letters (German)", function () {
	const result = _validateLocalPart("müller")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts Unicode letters (Spanish)", function () {
	const result = _validateLocalPart("josé")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: accepts Unicode letters (Hindi)", function () {
	const result = _validateLocalPart("संपर्क")

	assert(isOk(result))
})

Deno.test("_validateLocalPart: rejects empty string", function () {
	const result = _validateLocalPart("")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_EMPTY")
})

Deno.test("_validateLocalPart: rejects string over 64 chars", function () {
	const result = _validateLocalPart("a".repeat(65))

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_TOO_LONG")
})

Deno.test("_validateLocalPart: accepts exactly 64 chars", function () {
	const result = _validateLocalPart("a".repeat(64))

	assert(isOk(result))
})

Deno.test("_validateLocalPart: rejects leading dot", function () {
	const result = _validateLocalPart(".user")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_LEADING_DOT")
})

Deno.test("_validateLocalPart: rejects trailing dot", function () {
	const result = _validateLocalPart("user.")

	assert(isError(result))
	assertEquals(result.error.code, "EMAIL_ADDRESS_LOCAL_PART_TRAILING_DOT")
})

Deno.test("_validateLocalPart: rejects consecutive dots", function () {
	const result = _validateLocalPart("user..name")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_CONSECUTIVE_DOTS",
	)
})

Deno.test("_validateLocalPart: rejects spaces", function () {
	const result = _validateLocalPart("user name")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
	)
})

Deno.test("_validateLocalPart: rejects special chars (exclamation)", function () {
	const result = _validateLocalPart("user!")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
	)
})

Deno.test("_validateLocalPart: rejects special chars (at symbol)", function () {
	const result = _validateLocalPart("user@name")

	assert(isError(result))
	assertEquals(
		result.error.code,
		"EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
	)
})

Deno.test("_validateLocalPart: accepts complex valid local part", function () {
	const result = _validateLocalPart("first.last+tag_name-123")

	assert(isOk(result))
})
