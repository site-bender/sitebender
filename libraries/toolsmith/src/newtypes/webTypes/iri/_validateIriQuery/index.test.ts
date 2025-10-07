import { assertEquals } from "@std/assert"
import _validateIriQuery from "./index.ts"

Deno.test("_validateIriQuery validates correct queries", async function (t) {
	await t.step("accepts empty query", function () {
		const result = _validateIriQuery("")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts ASCII query", function () {
		const result = _validateIriQuery("key=value")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode query with Chinese", function () {
		const result = _validateIriQuery("名前=値")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode query with Russian", function () {
		const result = _validateIriQuery("запрос=значение")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Unicode query with café", function () {
		const result = _validateIriQuery("autre=café")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts mixed Unicode query", function () {
		const result = _validateIriQuery("名前=値&autre=café&запрос=значение")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Devanagari in query", function () {
		const result = _validateIriQuery("कुंजी=मूल्य")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts Arabic in query", function () {
		const result = _validateIriQuery("مفتاح=قيمة")
		assertEquals(result._tag, "Ok")
	})
})

Deno.test("_validateIriQuery rejects invalid queries", async function (t) {
	await t.step("rejects null character", function () {
		const result = _validateIriQuery("key=\x00value")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_QUERY_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects control character", function () {
		const result = _validateIriQuery("key=\x1Fvalue")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_QUERY_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects LRM bidi format char", function () {
		const result = _validateIriQuery("key=\u200Evalue")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_QUERY_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})

	await t.step("rejects bidi embedding char", function () {
		const result = _validateIriQuery("key=\u202Avalue")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_QUERY_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})
})
