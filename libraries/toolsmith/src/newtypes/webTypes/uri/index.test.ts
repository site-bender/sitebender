import { assertEquals } from "@std/assert"
import uri from "./index.ts"

// Network URIs
Deno.test("uri: accepts http URL", function () {
	const result = uri("http://example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts https URL with path", function () {
	const result = uri("https://example.com/path")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts ftp URL", function () {
	const result = uri("ftp://192.168.1.1/file.txt")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts websocket URL", function () {
	const result = uri("ws://example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts URL with userinfo", function () {
	const result = uri("https://user@example.com:8080/path?query=value#fragment")
	assertEquals(result._tag, "Ok")
})

// Email/Communication URIs
Deno.test("uri: accepts mailto URI", function () {
	const result = uri("mailto:user@example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts mailto with query", function () {
	const result = uri("mailto:user@example.com?subject=Hello")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts tel URI", function () {
	const result = uri("tel:+1234567890")
	assertEquals(result._tag, "Ok")
})

// Data URIs
Deno.test("uri: accepts data URI", function () {
	const result = uri("data:text/plain,hello")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts data URI with base64", function () {
	const result = uri("data:text/plain;base64,SGVsbG8=")
	assertEquals(result._tag, "Ok")
})

// File URIs
Deno.test("uri: accepts file URI", function () {
	const result = uri("file:///path/to/file.txt")
	assertEquals(result._tag, "Ok")
})

// URN
Deno.test("uri: accepts URN ISBN", function () {
	const result = uri("urn:isbn:0451450523")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts URN UUID", function () {
	const result = uri("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6")
	assertEquals(result._tag, "Ok")
})

// Other schemes
Deno.test("uri: accepts SSH URI", function () {
	const result = uri("ssh://git@github.com/user/repo.git")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts Git URI", function () {
	const result = uri("git://github.com/user/repo.git")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts SVN+SSH URI", function () {
	const result = uri("svn+ssh://svn.example.com/repo")
	assertEquals(result._tag, "Ok")
})

// IPv6
Deno.test("uri: accepts IPv6 authority", function () {
	const result = uri("http://[2001:db8::1]:8080/path")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: accepts IPv6 localhost", function () {
	const result = uri("ftp://[::1]/")
	assertEquals(result._tag, "Ok")
})

// Normalization
Deno.test("uri: normalizes scheme to lowercase", function () {
	const result = uri("HTTP://example.com")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com")
	}
})

Deno.test("uri: normalizes authority domain", function () {
	const result = uri("http://EXAMPLE.COM")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com")
	}
})

Deno.test("uri: preserves path case", function () {
	const result = uri("http://example.com/Path/To/File")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com/Path/To/File")
	}
})

// Error cases
Deno.test("uri: rejects empty string", function () {
	const result = uri("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_EMPTY")
	}
})

Deno.test("uri: rejects missing scheme", function () {
	const result = uri("example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_MISSING_SCHEME")
	}
})

Deno.test("uri: rejects invalid scheme", function () {
	const result = uri("123://example.com")
	assertEquals(result._tag, "Error")
})

Deno.test("uri: accepts empty authority with path", function () {
	const result = uri("file:///path")
	assertEquals(result._tag, "Ok")
})

Deno.test("uri: rejects invalid IPv6", function () {
	const result = uri("http://[2001:db8::1")
	assertEquals(result._tag, "Error")
})

Deno.test("uri: rejects port out of range", function () {
	const result = uri("http://example.com:99999")
	assertEquals(result._tag, "Error")
})

Deno.test("uri: rejects invalid domain as authority", function () {
	const result = uri("scheme://invalid..domain/path")
	assertEquals(result._tag, "Error")
})

Deno.test("uri: rejects URI too long", function () {
	const longUri = "http://example.com/" + "a".repeat(2050)
	const result = uri(longUri)
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URI_TOO_LONG")
	}
})
