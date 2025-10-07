import { assertEquals } from "@std/assert"
import _validateIriPath from "./index.ts"

Deno.test("_validateIriPath validates correct paths", async function (t) {
	await t.step("accepts empty path", function () {
		const result = _validateIriPath("")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts root path", function () {
		const result = _validateIriPath("/")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts ASCII path", function () {
		const result = _validateIriPath("/path/to/resource")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode path with café", function () {
		const result = _validateIriPath("/café")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode path with Chinese", function () {
		const result = _validateIriPath("/文件")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode path with Russian", function () {
		const result = _validateIriPath("/путь")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts mixed Unicode scripts", function () {
		const result = _validateIriPath("/café/文件/путь")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts emoji in path", function () {
		const result = _validateIriPath("/🚀/emoji")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Devanagari script", function () {
		const result = _validateIriPath("/मराठी")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Hindi with combining marks", function () {
		const result = _validateIriPath("/हिन्दी")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Arabic script", function () {
		const result = _validateIriPath("/العربية")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Korean script", function () {
		const result = _validateIriPath("/한글")
		assertEquals(result._tag, "Ok")
	})
})

Deno.test("_validateIriPath rejects invalid paths", async function (t) {
	await t.step("rejects null character", function () {
		const result = _validateIriPath("/path\x00test")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects control character \\x1F", function () {
		const result = _validateIriPath("/path\x1Ftest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects control character \\x7F", function () {
		const result = _validateIriPath("/path\x7Ftest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects LRM bidi format char", function () {
		const result = _validateIriPath("/path\u200Etest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})

	await t.step("rejects RLM bidi format char", function () {
		const result = _validateIriPath("/path\u200Ftest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})

	await t.step("rejects bidi embedding char", function () {
		const result = _validateIriPath("/path\u202Atest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})
})
