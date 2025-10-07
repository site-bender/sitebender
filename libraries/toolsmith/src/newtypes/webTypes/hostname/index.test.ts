import { assertEquals } from "@std/assert"
import hostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/index.ts"
import unwrapHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unwrapHostname/index.ts"

Deno.test("hostname - accepts lowercase localhost", function () {
	const result = hostname("localhost")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "localhost")
	}
})

Deno.test("hostname - normalizes uppercase localhost", function () {
	const result = hostname("LOCALHOST")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "localhost")
	}
})

Deno.test("hostname - normalizes mixed case localhost", function () {
	const result = hostname("LocalHost")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "localhost")
	}
})

Deno.test("hostname - accepts simple domain", function () {
	const result = hostname("example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "example.com")
	}
})

Deno.test("hostname - normalizes domain to lowercase", function () {
	const result = hostname("EXAMPLE.COM")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "example.com")
	}
})

Deno.test("hostname - accepts subdomain", function () {
	const result = hostname("www.example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "www.example.com")
	}
})

Deno.test("hostname - accepts deep subdomain", function () {
	const result = hostname("blog.site.example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "blog.site.example.com")
	}
})

Deno.test("hostname - accepts internationalized domain", function () {
	const result = hostname("münchen.de")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "münchen.de")
	}
})

Deno.test("hostname - normalizes internationalized domain", function () {
	const result = hostname("MÜNCHEN.DE")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "münchen.de")
	}
})

Deno.test("hostname - accepts Punycode domain", function () {
	const result = hostname("xn--mnchen-3ya.de")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "xn--mnchen-3ya.de")
	}
})

Deno.test("hostname - accepts IPv4 address", function () {
	const result = hostname("192.168.1.1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "192.168.1.1")
	}
})

Deno.test("hostname - accepts IPv4 loopback", function () {
	const result = hostname("127.0.0.1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "127.0.0.1")
	}
})

Deno.test("hostname - accepts IPv4 broadcast", function () {
	const result = hostname("255.255.255.255")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "255.255.255.255")
	}
})

Deno.test("hostname - accepts IPv4 network zero", function () {
	const result = hostname("0.0.0.0")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "0.0.0.0")
	}
})

Deno.test("hostname - accepts IPv6 address", function () {
	const result = hostname("2001:db8::1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "2001:db8::1")
	}
})

Deno.test("hostname - accepts IPv6 loopback", function () {
	const result = hostname("::1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "::1")
	}
})

Deno.test("hostname - accepts full IPv6 address", function () {
	const result = hostname("2001:0db8:0000:0000:0000:0000:0000:0001")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "2001:db8::1")
	}
})

Deno.test("hostname - accepts IPv6 with embedded IPv4", function () {
	const result = hostname("::ffff:192.168.1.1")

	assertEquals(result._tag, "Ok")
})

Deno.test("hostname - accepts IPv6 all zeros compressed", function () {
	const result = hostname("::")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "::")
	}
})

Deno.test("hostname - rejects empty string", function () {
	const result = hostname("")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_EMPTY")
	}
})

Deno.test("hostname - rejects single label domain (no TLD)", function () {
	const result = hostname("example")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - accepts numeric domain that looks like malformed IPv4 with too many octets", function () {
	const result = hostname("192.168.1.1.1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "192.168.1.1.1")
	}
})

Deno.test("hostname - accepts numeric domain with octet-like value out of IPv4 range", function () {
	const result = hostname("192.168.1.256")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "192.168.1.256")
	}
})

Deno.test("hostname - accepts numeric domain with leading zeros", function () {
	const result = hostname("192.168.001.1")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "192.168.001.1")
	}
})

Deno.test("hostname - rejects invalid IPv6 (invalid hex)", function () {
	const result = hostname("gggg::1")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects invalid IPv6 (too many groups)", function () {
	const result = hostname("2001:db8:0:0:0:0:0:0:1")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects domain with space", function () {
	const result = hostname("ex ample.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects domain with leading hyphen", function () {
	const result = hostname("-example.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects domain with trailing hyphen", function () {
	const result = hostname("example-.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects domain with special characters", function () {
	const result = hostname("example!.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - rejects random string", function () {
	const result = hostname("not a valid hostname!")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HOSTNAME_INVALID_FORMAT")
	}
})

Deno.test("hostname - accepts hyphenated domain", function () {
	const result = hostname("my-example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "my-example.com")
	}
})

Deno.test("hostname - accepts numeric domain", function () {
	const result = hostname("123.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "123.com")
	}
})

Deno.test("hostname - accepts single character labels", function () {
	const result = hostname("a.b.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapHostname(result.value), "a.b.com")
	}
})

Deno.test("hostname - applies NFC normalization to domains", function () {
	const decomposed = "café.com"
	const result = hostname(decomposed)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const unwrapped = unwrapHostname(result.value)
		assertEquals(unwrapped.normalize("NFC"), unwrapped)
	}
})
