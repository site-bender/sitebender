import { assertEquals } from "@std/assert"
import _normalizeUrl from "./index.ts"

Deno.test("_normalizeUrl: normalizes protocol to lowercase", function () {
	assertEquals(_normalizeUrl("HTTP://example.com"), "http://example.com")
	assertEquals(_normalizeUrl("HTTPS://example.com"), "https://example.com")
	assertEquals(_normalizeUrl("FTP://example.com"), "ftp://example.com")
})

Deno.test("_normalizeUrl: normalizes domain to lowercase", function () {
	assertEquals(_normalizeUrl("http://EXAMPLE.COM"), "http://example.com")
	assertEquals(_normalizeUrl("http://Example.Com"), "http://example.com")
	assertEquals(
		_normalizeUrl("http://SUB.EXAMPLE.COM"),
		"http://sub.example.com",
	)
})

Deno.test("_normalizeUrl: normalizes protocol and domain together", function () {
	assertEquals(_normalizeUrl("HTTP://EXAMPLE.COM"), "http://example.com")
	assertEquals(_normalizeUrl("HTTPS://Example.COM"), "https://example.com")
})

Deno.test("_normalizeUrl: preserves path case", function () {
	assertEquals(
		_normalizeUrl("http://example.com/Path/To/File"),
		"http://example.com/Path/To/File",
	)
	assertEquals(
		_normalizeUrl("HTTP://EXAMPLE.COM/CamelCase"),
		"http://example.com/CamelCase",
	)
})

Deno.test("_normalizeUrl: preserves query case", function () {
	assertEquals(
		_normalizeUrl("http://example.com?Query=Value"),
		"http://example.com?Query=Value",
	)
	assertEquals(
		_normalizeUrl("HTTP://EXAMPLE.COM?foo=BAR&baz=QUX"),
		"http://example.com?foo=BAR&baz=QUX",
	)
})

Deno.test("_normalizeUrl: preserves fragment case", function () {
	assertEquals(
		_normalizeUrl("http://example.com#Fragment"),
		"http://example.com#Fragment",
	)
	assertEquals(
		_normalizeUrl("HTTP://EXAMPLE.COM#CamelCase"),
		"http://example.com#CamelCase",
	)
})

Deno.test("_normalizeUrl: handles complete URLs with all components", function () {
	assertEquals(
		_normalizeUrl("HTTP://Example.COM:8080/Path?query=Value#Fragment"),
		"http://example.com:8080/Path?query=Value#Fragment",
	)
})

Deno.test("_normalizeUrl: applies NFC Unicode normalization", function () {
	const composed = "http://café.com"
	const decomposed = "http://caf\u0065\u0301.com"
	assertEquals(_normalizeUrl(composed), "http://café.com")
	assertEquals(_normalizeUrl(decomposed), "http://café.com")
})

Deno.test("_normalizeUrl: handles internationalized domain names", function () {
	assertEquals(_normalizeUrl("http://münchen.de"), "http://münchen.de")
	assertEquals(_normalizeUrl("HTTP://MÜNCHEN.DE"), "http://münchen.de")
	assertEquals(_normalizeUrl("http://日本.jp"), "http://日本.jp")
})

Deno.test("_normalizeUrl: handles URLs with ports", function () {
	assertEquals(_normalizeUrl("HTTP://EXAMPLE.COM:8080"), "http://example.com:8080")
	assertEquals(_normalizeUrl("https://Example.com:443"), "https://example.com:443")
})

Deno.test("_normalizeUrl: handles URLs without paths", function () {
	assertEquals(_normalizeUrl("HTTP://EXAMPLE.COM"), "http://example.com")
	assertEquals(_normalizeUrl("https://Example.COM"), "https://example.com")
})

Deno.test("_normalizeUrl: handles empty path with query", function () {
	assertEquals(
		_normalizeUrl("http://EXAMPLE.com?query=value"),
		"http://example.com?query=value",
	)
})

Deno.test("_normalizeUrl: handles empty path with fragment", function () {
	assertEquals(
		_normalizeUrl("http://EXAMPLE.com#fragment"),
		"http://example.com#fragment",
	)
})
