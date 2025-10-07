import { assertEquals } from "@std/assert"
import _validateQuery from "./index.ts"

Deno.test("_validateQuery: accepts empty query", function () {
	const result = _validateQuery("")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("_validateQuery: accepts simple query", function () {
	const result = _validateQuery("key=value")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts multiple parameters", function () {
	const result = _validateQuery("key1=value1&key2=value2")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with percent encoding", function () {
	const result = _validateQuery("search=hello%20world")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with special chars", function () {
	const result = _validateQuery("filter=(category:books)")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with @ symbol", function () {
	const result = _validateQuery("email=user@example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with slash", function () {
	const result = _validateQuery("path=/some/path")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with question mark", function () {
	const result = _validateQuery("search=what?")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with international characters", function () {
	const result = _validateQuery("город=Москва")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with semicolon", function () {
	const result = _validateQuery("params;format=json")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with plus", function () {
	const result = _validateQuery("search=hello+world")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with comma", function () {
	const result = _validateQuery("tags=one,two,three")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts query with exclamation", function () {
	const result = _validateQuery("sort=name!")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts empty value", function () {
	const result = _validateQuery("key=")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: accepts no value", function () {
	const result = _validateQuery("flag")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateQuery: rejects query with unencoded spaces", function () {
	const result = _validateQuery("search=hello world")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_QUERY_INVALID_CHARACTER")
	}
})

Deno.test("_validateQuery: rejects query with brackets", function () {
	const result = _validateQuery("filter[category]=books")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_QUERY_INVALID_CHARACTER")
	}
})

Deno.test("_validateQuery: rejects query with backslash", function () {
	const result = _validateQuery("path=C:\\folder")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_QUERY_INVALID_CHARACTER")
	}
})

Deno.test("_validateQuery: rejects query with pipe", function () {
	const result = _validateQuery("filter=a|b")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_QUERY_INVALID_CHARACTER")
	}
})

Deno.test("_validateQuery: rejects query with caret", function () {
	const result = _validateQuery("op=a^b")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_QUERY_INVALID_CHARACTER")
	}
})
