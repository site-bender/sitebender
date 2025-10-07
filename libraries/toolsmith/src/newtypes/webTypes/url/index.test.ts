import { assertEquals } from "@std/assert"
import url from "./index.ts"

Deno.test("url: accepts valid http URL", function () {
	const result = url("http://example.com")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com")
	}
})

Deno.test("url: accepts valid https URL", function () {
	const result = url("https://example.com")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "https://example.com")
	}
})

Deno.test("url: accepts URL with subdomain", function () {
	const result = url("https://sub.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with port", function () {
	const result = url("http://example.com:8080")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with path", function () {
	const result = url("https://example.com/path/to/resource")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with query", function () {
	const result = url("https://example.com?key=value")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with fragment", function () {
	const result = url("https://example.com#section")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts complete URL with all components", function () {
	const result = url(
		"https://sub.example.com:443/path/to/resource?key=value&foo=bar#section",
	)
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts internationalized domain", function () {
	const result = url("https://münchen.de")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts ftp URL", function () {
	const result = url("ftp://files.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts ftps URL", function () {
	const result = url("ftps://secure.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts websocket URL", function () {
	const result = url("ws://example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts secure websocket URL", function () {
	const result = url("wss://example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts ssh URL", function () {
	const result = url("ssh://git.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts git URL", function () {
	const result = url("git://github.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: normalizes protocol to lowercase", function () {
	const result = url("HTTP://example.com")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com")
	}
})

Deno.test("url: normalizes domain to lowercase", function () {
	const result = url("http://EXAMPLE.COM")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com")
	}
})

Deno.test("url: normalizes protocol and domain together", function () {
	const result = url("HTTPS://EXAMPLE.COM")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "https://example.com")
	}
})

Deno.test("url: preserves path case", function () {
	const result = url("http://example.com/CamelCase")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com/CamelCase")
	}
})

Deno.test("url: preserves query case", function () {
	const result = url("http://example.com?Key=Value")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com?Key=Value")
	}
})

Deno.test("url: preserves fragment case", function () {
	const result = url("http://example.com#CamelCase")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http://example.com#CamelCase")
	}
})

Deno.test("url: applies NFC Unicode normalization", function () {
	const composed = "http://café.com"
	const decomposed = "http://caf\u0065\u0301.com"
	const result1 = url(composed)
	const result2 = url(decomposed)
	assertEquals(result1._tag, "Ok")
	assertEquals(result2._tag, "Ok")
	if (result1._tag === "Ok" && result2._tag === "Ok") {
		assertEquals(result1.value, result2.value)
	}
})

Deno.test("url: rejects empty URL", function () {
	const result = url("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_EMPTY")
	}
})

Deno.test("url: rejects URL without protocol", function () {
	const result = url("example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL_SEPARATOR")
	}
})

Deno.test("url: rejects URL without :// separator", function () {
	const result = url("httpexample.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL_SEPARATOR")
	}
})

Deno.test("url: rejects URL with unsupported protocol (no separator)", function () {
	const result = url("mailto:user@example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL_SEPARATOR")
	}
})

Deno.test("url: rejects URL without domain", function () {
	const result = url("http://")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_DOMAIN")
	}
})

Deno.test("url: rejects URL with IPv4 address", function () {
	const result = url("http://192.168.1.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("url: rejects URL with IPv6 address", function () {
	const result = url("http://[2001:db8::1]")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED")
	}
})

Deno.test("url: rejects URL with localhost (no TLD)", function () {
	const result = url("http://localhost")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_NO_TLD")
	}
})

Deno.test("url: rejects URL with invalid domain", function () {
	const result = url("http://.example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_DOMAIN_LEADING_DOT")
	}
})

Deno.test("url: rejects URL with invalid port", function () {
	const result = url("http://example.com:99999")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
	}
})

Deno.test("url: rejects URL with invalid path characters", function () {
	const result = url("http://example.com/path with spaces")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PATH_INVALID_CHARACTER")
	}
})

Deno.test("url: rejects relative URL", function () {
	const result = url("/path/to/resource")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL_SEPARATOR")
	}
})

Deno.test("url: rejects protocol-relative URL", function () {
	const result = url("//example.com")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL_SEPARATOR")
	}
})

Deno.test("url: rejects URL exceeding 2048 characters", function () {
	const longPath = "/" + "a".repeat(2050)
	const result = url(`http://example.com${longPath}`)
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_TOO_LONG")
	}
})

Deno.test("url: accepts URL with percent-encoded path", function () {
	const result = url("http://example.com/path%20with%20encoded%20spaces")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with international path", function () {
	const result = url("http://example.com/путь/文件")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with complex query string", function () {
	const result = url("http://example.com?foo=bar&baz=qux&flag")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with query and fragment", function () {
	const result = url("http://example.com?query=value#fragment")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with path and fragment (no query)", function () {
	const result = url("http://example.com/path#fragment")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with just fragment", function () {
	const result = url("http://example.com#fragment")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts URL with empty path but query", function () {
	const result = url("http://example.com?query=value")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts gopher URL", function () {
	const result = url("gopher://example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: accepts ldap URL", function () {
	const result = url("ldap://directory.example.com")
	assertEquals(result._tag, "Ok")
})

Deno.test("url: rejects file:// URL", function () {
	const result = url("file:///path/to/file")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})

Deno.test("url: rejects data: URL", function () {
	const result = url("data:text/plain,hello")
	assertEquals(result._tag, "Error")
})

Deno.test("url: rejects tel: URL", function () {
	const result = url("tel:+1234567890")
	assertEquals(result._tag, "Error")
})
