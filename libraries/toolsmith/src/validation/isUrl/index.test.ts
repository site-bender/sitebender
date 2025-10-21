import { assertEquals } from "@std/assert"
import isUrl from "@sitebender/toolsmith/validation/isUrl/index.ts"

Deno.test("_isUrl: accepts valid http URL", function () {
	assertEquals(isUrl("http://example.com"), true)
})

Deno.test("_isUrl: accepts valid https URL", function () {
	assertEquals(isUrl("https://example.com"), true)
})

Deno.test("_isUrl: accepts URL with subdomain", function () {
	assertEquals(isUrl("https://sub.example.com"), true)
})

Deno.test("_isUrl: accepts URL with port", function () {
	assertEquals(isUrl("http://example.com:8080"), true)
})

Deno.test("_isUrl: accepts URL with path", function () {
	assertEquals(isUrl("https://example.com/path/to/resource"), true)
})

Deno.test("_isUrl: accepts URL with query", function () {
	assertEquals(isUrl("https://example.com?key=value"), true)
})

Deno.test("_isUrl: accepts URL with fragment", function () {
	assertEquals(isUrl("https://example.com#section"), true)
})

Deno.test("_isUrl: accepts complete URL", function () {
	assertEquals(
		isUrl("https://example.com:443/path?query=value#fragment"),
		true,
	)
})

Deno.test("_isUrl: accepts internationalized domain", function () {
	assertEquals(isUrl("https://münchen.de"), true)
})

Deno.test("_isUrl: accepts ftp URL", function () {
	assertEquals(isUrl("ftp://files.example.com"), true)
})

Deno.test("_isUrl: accepts websocket URL", function () {
	assertEquals(isUrl("ws://example.com"), true)
})

Deno.test("_isUrl: accepts secure websocket URL", function () {
	assertEquals(isUrl("wss://example.com"), true)
})

Deno.test("_isUrl: rejects empty string", function () {
	assertEquals(isUrl(""), false)
})

Deno.test("_isUrl: rejects URL without protocol", function () {
	assertEquals(isUrl("example.com"), false)
})

Deno.test("_isUrl: rejects URL without ://", function () {
	assertEquals(isUrl("httpexample.com"), false)
})

Deno.test("_isUrl: rejects URL with unsupported protocol", function () {
	assertEquals(isUrl("mailto:user@example.com"), false)
})

Deno.test("_isUrl: rejects URL with IP address", function () {
	assertEquals(isUrl("http://192.168.1.1"), false)
})

Deno.test("_isUrl: rejects URL with IPv6 address", function () {
	assertEquals(isUrl("http://[2001:db8::1]"), false)
})

Deno.test("_isUrl: rejects URL without TLD", function () {
	assertEquals(isUrl("http://localhost"), false)
})

Deno.test("_isUrl: rejects URL with invalid domain", function () {
	assertEquals(isUrl("http://.example.com"), false)
})

Deno.test("_isUrl: rejects URL with invalid port", function () {
	assertEquals(isUrl("http://example.com:99999"), false)
})

Deno.test("_isUrl: rejects URL with invalid path", function () {
	assertEquals(isUrl("http://example.com/path with spaces"), false)
})

Deno.test("_isUrl: rejects relative URL", function () {
	assertEquals(isUrl("/path/to/resource"), false)
})

Deno.test("_isUrl: rejects protocol-relative URL", function () {
	assertEquals(isUrl("//example.com"), false)
})
