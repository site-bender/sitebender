import { assertEquals } from "@std/assert"
import _normalizeIri from "./index.ts"

Deno.test("_normalizeIri normalizes scheme to lowercase", async function (t) {
	await t.step("normalizes HTTP to http", function () {
		const result = _normalizeIri("HTTP://example.com")
		assertEquals(result, "http://example.com")
	})

	await t.step("normalizes HTTPS to https", function () {
		const result = _normalizeIri("HTTPS://example.com/path")
		assertEquals(result, "https://example.com/path")
	})

	await t.step("normalizes MAILTO to mailto", function () {
		const result = _normalizeIri("MAILTO:user@example.com")
		assertEquals(result, "mailto:user@example.com")
	})

	await t.step("preserves lowercase scheme", function () {
		const result = _normalizeIri("http://example.com")
		assertEquals(result, "http://example.com")
	})

	await t.step("normalizes mixed case scheme", function () {
		const result = _normalizeIri("HtTp://example.com")
		assertEquals(result, "http://example.com")
	})
})

Deno.test("_normalizeIri preserves case of non-scheme components", async function (t) {
	await t.step("preserves authority case", function () {
		const result = _normalizeIri("http://Example.COM")
		assertEquals(result, "http://Example.COM")
	})

	await t.step("preserves path case", function () {
		const result = _normalizeIri("http://example.com/Path/To/Resource")
		assertEquals(result, "http://example.com/Path/To/Resource")
	})

	await t.step("preserves query case", function () {
		const result = _normalizeIri("http://example.com?Key=Value")
		assertEquals(result, "http://example.com?Key=Value")
	})

	await t.step("preserves fragment case", function () {
		const result = _normalizeIri("http://example.com#Section")
		assertEquals(result, "http://example.com#Section")
	})
})

Deno.test("_normalizeIri applies NFC normalization", async function (t) {
	await t.step("normalizes decomposed café to precomposed", function () {
		// Decomposed: e + combining acute
		const decomposed = "http://example.com/cafe\u0301"
		const result = _normalizeIri(decomposed)
		// Should normalize to precomposed é
		const expected = "http://example.com/café"
		assertEquals(result, expected)
	})

	await t.step("normalizes decomposed Unicode in authority", function () {
		// Decomposed: e + combining acute
		const decomposed = "http://cafe\u0301.com"
		const result = _normalizeIri(decomposed)
		// Should normalize to precomposed é
		const expected = "http://café.com"
		assertEquals(result, expected)
	})

	await t.step("normalizes already precomposed forms", function () {
		const precomposed = "http://example.com/café"
		const result = _normalizeIri(precomposed)
		assertEquals(result, precomposed)
	})
})

Deno.test("_normalizeIri handles Unicode IRIs", async function (t) {
	await t.step("normalizes IRI with Japanese", function () {
		const result = _normalizeIri("HTTP://例え.jp/パス")
		assertEquals(result, "http://例え.jp/パス")
	})

	await t.step("normalizes IRI with Russian", function () {
		const result = _normalizeIri("HTTP://пример.рф/путь")
		assertEquals(result, "http://пример.рф/путь")
	})

	await t.step("normalizes IRI with Devanagari", function () {
		const result = _normalizeIri("HTTP://मराठी.भारत/मार्ग")
		assertEquals(result, "http://मराठी.भारत/मार्ग")
	})
})
