import { assertEquals } from "@std/assert"
import _validatePath from "./index.ts"

Deno.test("_validatePath: accepts empty path", function () {
	const result = _validatePath("")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("_validatePath: accepts root path", function () {
	const result = _validatePath("/")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts simple path", function () {
	const result = _validatePath("/path")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts nested path", function () {
	const result = _validatePath("/path/to/resource")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with hyphens", function () {
	const result = _validatePath("/my-path/to-resource")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with underscores", function () {
	const result = _validatePath("/my_path/to_resource")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with dots", function () {
	const result = _validatePath("/path/file.html")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with percent encoding", function () {
	const result = _validatePath("/path%20with%20spaces")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with query-like chars", function () {
	const result = _validatePath("/path/item(123)")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with @ symbol", function () {
	const result = _validatePath("/users/@username")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with international characters", function () {
	const result = _validatePath("/путь/文件")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with colon", function () {
	const result = _validatePath("/path:value")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with semicolon", function () {
	const result = _validatePath("/path;param")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: accepts path with equals", function () {
	const result = _validatePath("/path=value")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePath: rejects path not starting with slash", function () {
	const result = _validatePath("path")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_MUST_START_WITH_SLASH")
	}
})

Deno.test("_validatePath: rejects path with spaces", function () {
	const result = _validatePath("/path with spaces")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})

Deno.test("_validatePath: rejects path with unencoded brackets", function () {
	const result = _validatePath("/path[0]")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})

Deno.test("_validatePath: rejects path with backslash", function () {
	const result = _validatePath("/path\\file")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})

Deno.test("_validatePath: rejects path with pipe", function () {
	const result = _validatePath("/path|value")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})

Deno.test("_validatePath: rejects path with caret", function () {
	const result = _validatePath("/path^value")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})
