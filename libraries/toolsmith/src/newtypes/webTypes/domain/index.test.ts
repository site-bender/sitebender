import { assertEquals } from "@std/assert"
import domain from "@sitebender/toolsmith/newtypes/webTypes/domain/index.ts"
import unwrapDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unwrapDomain/index.ts"

Deno.test("domain - accepts and normalizes simple domain", function () {
	const result = domain("example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "example.com")
	}
})

Deno.test("domain - normalizes uppercase to lowercase", function () {
	const result = domain("EXAMPLE.COM")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "example.com")
	}
})

Deno.test("domain - normalizes mixed case to lowercase", function () {
	const result = domain("Example.Com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "example.com")
	}
})

Deno.test("domain - accepts subdomain", function () {
	const result = domain("www.example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "www.example.com")
	}
})

Deno.test("domain - accepts deep subdomain", function () {
	const result = domain("blog.site.example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "blog.site.example.com")
	}
})

Deno.test("domain - accepts multi-level TLD", function () {
	const result = domain("example.co.uk")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "example.co.uk")
	}
})

Deno.test("domain - accepts internationalized domain (German)", function () {
	const result = domain("münchen.de")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "münchen.de")
	}
})

Deno.test("domain - normalizes internationalized domain uppercase", function () {
	const result = domain("MÜNCHEN.DE")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "münchen.de")
	}
})

Deno.test("domain - accepts internationalized domain (French)", function () {
	const result = domain("café.fr")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "café.fr")
	}
})

Deno.test("domain - accepts internationalized domain (Japanese)", function () {
	const result = domain("例え.jp")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "例え.jp")
	}
})

Deno.test("domain - accepts Punycode domain", function () {
	const result = domain("xn--mnchen-3ya.de")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "xn--mnchen-3ya.de")
	}
})

Deno.test("domain - normalizes Punycode uppercase", function () {
	const result = domain("XN--MNCHEN-3YA.DE")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "xn--mnchen-3ya.de")
	}
})

Deno.test("domain - accepts hyphenated domain", function () {
	const result = domain("my-example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "my-example.com")
	}
})

Deno.test("domain - accepts domain with multiple hyphens", function () {
	const result = domain("my-long-example.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "my-long-example.com")
	}
})

Deno.test("domain - accepts numeric domain", function () {
	const result = domain("123.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "123.com")
	}
})

Deno.test("domain - accepts domain with numbers", function () {
	const result = domain("example123.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "example123.com")
	}
})

Deno.test("domain - accepts single character labels", function () {
	const result = domain("a.b.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "a.b.com")
	}
})

Deno.test("domain - accepts single character domain", function () {
	const result = domain("x.com")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapDomain(result.value), "x.com")
	}
})

Deno.test("domain - accepts maximum length label (63 chars)", function () {
	const maxLabel =
		"a123456789012345678901234567890123456789012345678901234567890bc"
	const result = domain(`${maxLabel}.com`)

	assertEquals(result._tag, "Ok")
})

Deno.test("domain - accepts maximum length domain (253 chars)", function () {
	const longDomain = "a".repeat(63) + "." + "b".repeat(63) + "." +
		"c".repeat(63) + "." + "d".repeat(58) + ".co"
	const result = domain(longDomain)

	assertEquals(result._tag, "Ok")
	assertEquals(longDomain.length, 253)
})

Deno.test("domain - rejects empty string", function () {
	const result = domain("")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_EMPTY")
	}
})

Deno.test("domain - rejects domain without TLD", function () {
	const result = domain("example")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_NO_TLD")
	}
})

Deno.test("domain - rejects localhost", function () {
	const result = domain("localhost")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_NO_TLD")
	}
})

Deno.test("domain - rejects leading dot", function () {
	const result = domain(".example.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LEADING_DOT")
	}
})

Deno.test("domain - rejects trailing dot", function () {
	const result = domain("example.com.")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_TRAILING_DOT")
	}
})

Deno.test("domain - rejects consecutive dots", function () {
	const result = domain("example..com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_CONSECUTIVE_DOTS")
	}
})

Deno.test("domain - rejects triple consecutive dots", function () {
	const result = domain("example...com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_CONSECUTIVE_DOTS")
	}
})

Deno.test("domain - rejects domain too long (> 253 chars)", function () {
	const tooLong = "a".repeat(251) + ".co"
	const result = domain(tooLong)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_TOO_LONG")
	}
})

Deno.test("domain - rejects label too long (> 63 chars)", function () {
	const longLabel = "a".repeat(64)
	const result = domain(`${longLabel}.com`)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_TOO_LONG")
	}
})

Deno.test("domain - rejects label with leading hyphen", function () {
	const result = domain("-example.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_LEADING_HYPHEN")
	}
})

Deno.test("domain - rejects subdomain with leading hyphen", function () {
	const result = domain("sub.-example.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_LEADING_HYPHEN")
	}
})

Deno.test("domain - rejects label with trailing hyphen", function () {
	const result = domain("example-.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_TRAILING_HYPHEN")
	}
})

Deno.test("domain - rejects TLD with trailing hyphen", function () {
	const result = domain("example.com-")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_TRAILING_HYPHEN")
	}
})

Deno.test("domain - rejects label with space", function () {
	const result = domain("ex ample.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("domain - rejects label with at symbol", function () {
	const result = domain("example@.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("domain - rejects label with exclamation mark", function () {
	const result = domain("example!.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("domain - rejects label with dollar sign", function () {
	const result = domain("example$.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("domain - rejects Punycode conflict (-- at positions 3-4)", function () {
	const result = domain("ab--cd.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_PUNYCODE_CONFLICT")
	}
})

Deno.test("domain - rejects another Punycode conflict", function () {
	const result = domain("te--st.com")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_PUNYCODE_CONFLICT")
	}
})

Deno.test("domain - applies NFC normalization", function () {
	const decomposed = "café.com"
	const result = domain(decomposed)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const unwrapped = unwrapDomain(result.value)
		assertEquals(unwrapped.normalize("NFC"), unwrapped)
	}
})
