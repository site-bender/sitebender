import { assertEquals } from "@std/assert"
import iri from "./index.ts"

Deno.test("iri validates and creates valid IRIs", async function (t) {
	await t.step("accepts simple HTTP IRI", function () {
		const result = iri("http://example.com")
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "http://example.com")
		}
	})

	await t.step("accepts HTTPS IRI", function () {
		const result = iri("https://example.com/path")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Unicode domain", function () {
		const result = iri("http://例え.jp")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Russian domain", function () {
		const result = iri("http://пример.рф/путь")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Devanagari domain", function () {
		const result = iri("http://मराठी.भारत/मार्ग")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Unicode path", function () {
		const result = iri("http://example.com/café")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with mixed Unicode scripts", function () {
		const result = iri("http://example.com/café/文件/путь")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with emoji", function () {
		const result = iri("http://example.com/🚀/emoji")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Unicode query", function () {
		const result = iri("http://example.com?名前=値")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with Unicode fragment", function () {
		const result = iri("http://example.com#セクション")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts mailto IRI with Unicode", function () {
		const result = iri("mailto:用户@例え.jp")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts data IRI with Unicode", function () {
		const result = iri("data:text/plain,Привет мир")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts file IRI with Unicode", function () {
		const result = iri("file:///путь/к/файлу.txt")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with IPv6 and Unicode path", function () {
		const result = iri("http://[2001:db8::1]:8080/café")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts IRI with port", function () {
		const result = iri("http://example.com:8080/path")
		assertEquals(result._tag, "Ok")
	})
})

Deno.test("iri normalizes IRIs correctly", async function (t) {
	await t.step("normalizes scheme to lowercase", function () {
		const result = iri("HTTP://example.com")
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "http://example.com")
		}
	})

	await t.step("normalizes MAILTO to lowercase", function () {
		const result = iri("MAILTO:user@example.com")
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "mailto:user@example.com")
		}
	})

	await t.step("applies NFC normalization to Unicode", function () {
		// Decomposed: e + combining acute
		const result = iri("http://example.com/cafe\u0301")
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			// Should normalize to precomposed é
			assertEquals(result.value, "http://example.com/café")
		}
	})
})

Deno.test("iri rejects invalid IRIs", async function (t) {
	await t.step("rejects empty string", function () {
		const result = iri("")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_EMPTY")
		}
	})

	await t.step("rejects IRI without scheme", function () {
		const result = iri("example.com")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_MISSING_SCHEME")
		}
	})

	await t.step("rejects IRI with Unicode in scheme", function () {
		const result = iri("café://example.com")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_CONTAINS_UNICODE")
		}
	})

	await t.step("rejects IRI with invalid scheme format", function () {
		const result = iri("123://example.com")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_INVALID_FORMAT")
		}
	})

	await t.step("rejects IRI with control char in path", function () {
		const result = iri("http://example.com/path\x00test")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects IRI with bidi format char in path", function () {
		const result = iri("http://example.com/path\u200Etest")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})

	await t.step("rejects IRI with control char in query", function () {
		const result = iri("http://example.com?key=\x00value")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_QUERY_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects IRI with control char in fragment", function () {
		const result = iri("http://example.com#section\x00")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_FRAGMENT_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects IRI with invalid port", function () {
		const result = iri("http://example.com:99999")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
		}
	})

	await t.step("rejects IRI that is too long", function () {
		const result = iri("http://example.com/" + "a".repeat(8200))
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_TOO_LONG")
		}
	})
})
