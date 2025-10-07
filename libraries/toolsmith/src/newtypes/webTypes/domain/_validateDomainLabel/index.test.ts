import { assertEquals } from "@std/assert"
import _validateDomainLabel from "@sitebender/toolsmith/newtypes/webTypes/domain/_validateDomainLabel/index.ts"

Deno.test("_validateDomainLabel - accepts simple label", function () {
	const result = _validateDomainLabel("example")

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "example")
	}
})

Deno.test("_validateDomainLabel - accepts single character label", function () {
	const result = _validateDomainLabel("a")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts numeric label", function () {
	const result = _validateDomainLabel("123")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts label with hyphens in middle", function () {
	const result = _validateDomainLabel("my-example")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts label with multiple hyphens", function () {
	const result = _validateDomainLabel("my-long-example")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts Punycode prefix xn--", function () {
	const result = _validateDomainLabel("xn--mnchen-3ya")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts internationalized label (German)", function () {
	const result = _validateDomainLabel("münchen")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts internationalized label (Japanese)", function () {
	const result = _validateDomainLabel("例え")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts label with combining marks (Hindi)", function () {
	const result = _validateDomainLabel("उदाहरण")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts maximum length label (63 chars)", function () {
	const maxLabel = "a123456789012345678901234567890123456789012345678901234567890bc"
	const result = _validateDomainLabel(maxLabel)

	assertEquals(result._tag, "Ok")
	assertEquals(maxLabel.length, 63)
})

Deno.test("_validateDomainLabel - accepts alphanumeric mix", function () {
	const result = _validateDomainLabel("example123")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts starting with number", function () {
	const result = _validateDomainLabel("123example")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - rejects empty label", function () {
	const result = _validateDomainLabel("")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_EMPTY")
		assertEquals(result.error.field, "domain.label")
	}
})

Deno.test("_validateDomainLabel - rejects label too long (> 63 chars)", function () {
	const tooLong = "a123456789012345678901234567890123456789012345678901234567890123"
	const result = _validateDomainLabel(tooLong)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_TOO_LONG")
		assertEquals(result.error.field, "domain.label")
	}
	assertEquals(tooLong.length, 64)
})

Deno.test("_validateDomainLabel - rejects leading hyphen", function () {
	const result = _validateDomainLabel("-example")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_LEADING_HYPHEN")
		assertEquals(result.error.field, "domain.label")
	}
})

Deno.test("_validateDomainLabel - rejects trailing hyphen", function () {
	const result = _validateDomainLabel("example-")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_TRAILING_HYPHEN")
		assertEquals(result.error.field, "domain.label")
	}
})

Deno.test("_validateDomainLabel - rejects just hyphen", function () {
	const result = _validateDomainLabel("-")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_LEADING_HYPHEN")
	}
})

Deno.test("_validateDomainLabel - rejects Punycode conflict (-- at positions 3-4)", function () {
	const result = _validateDomainLabel("ab--cd")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_PUNYCODE_CONFLICT")
		assertEquals(result.error.field, "domain.label")
	}
})

Deno.test("_validateDomainLabel - rejects another Punycode conflict", function () {
	const result = _validateDomainLabel("te--st")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_PUNYCODE_CONFLICT")
	}
})

Deno.test("_validateDomainLabel - rejects label with space", function () {
	const result = _validateDomainLabel("ex ample")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
		assertEquals(result.error.field, "domain.label")
	}
})

Deno.test("_validateDomainLabel - rejects label with at symbol", function () {
	const result = _validateDomainLabel("example@")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomainLabel - rejects label with exclamation mark", function () {
	const result = _validateDomainLabel("example!")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomainLabel - rejects label with dollar sign", function () {
	const result = _validateDomainLabel("example$")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomainLabel - rejects label with underscore", function () {
	const result = _validateDomainLabel("example_test")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "DOMAIN_LABEL_INVALID_CHARACTER")
	}
})

Deno.test("_validateDomainLabel - accepts label starting with Unicode letter", function () {
	const result = _validateDomainLabel("café")

	assertEquals(result._tag, "Ok")
})

Deno.test("_validateDomainLabel - accepts label ending with Unicode letter", function () {
	const result = _validateDomainLabel("testcafé")

	assertEquals(result._tag, "Ok")
})
