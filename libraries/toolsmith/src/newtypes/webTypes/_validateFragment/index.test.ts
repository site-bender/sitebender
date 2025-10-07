import { assertEquals } from "@std/assert"
import _validateFragment from "./index.ts"

Deno.test("_validateFragment: accepts empty fragment", function () {
	const result = _validateFragment("")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("_validateFragment: accepts simple fragment", function () {
	const result = _validateFragment("section")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with hyphens", function () {
	const result = _validateFragment("main-content")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with underscores", function () {
	const result = _validateFragment("main_content")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with dots", function () {
	const result = _validateFragment("section.1.2")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with percent encoding", function () {
	const result = _validateFragment("section%201")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with slash", function () {
	const result = _validateFragment("path/to/section")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with question mark", function () {
	const result = _validateFragment("what?")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with equals", function () {
	const result = _validateFragment("key=value")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with @ symbol", function () {
	const result = _validateFragment("@anchor")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with international characters", function () {
	const result = _validateFragment("秘密")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with colon", function () {
	const result = _validateFragment("time:12:30")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with parentheses", function () {
	const result = _validateFragment("item(1)")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with exclamation", function () {
	const result = _validateFragment("important!")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: accepts fragment with ampersand", function () {
	const result = _validateFragment("a&b")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateFragment: rejects fragment with unencoded spaces", function () {
	const result = _validateFragment("main content")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_FRAGMENT_INVALID_CHARACTER")
	}
})

Deno.test("_validateFragment: rejects fragment with brackets", function () {
	const result = _validateFragment("section[1]")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_FRAGMENT_INVALID_CHARACTER")
	}
})

Deno.test("_validateFragment: rejects fragment with backslash", function () {
	const result = _validateFragment("path\\section")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_FRAGMENT_INVALID_CHARACTER")
	}
})

Deno.test("_validateFragment: rejects fragment with pipe", function () {
	const result = _validateFragment("a|b")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_FRAGMENT_INVALID_CHARACTER")
	}
})

Deno.test("_validateFragment: rejects fragment with caret", function () {
	const result = _validateFragment("a^b")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_FRAGMENT_INVALID_CHARACTER")
	}
})
