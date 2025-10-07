import { assertEquals } from "@std/assert"
import _normalize from "@sitebender/toolsmith/newtypes/webTypes/_normalize/index.ts"

Deno.test("_normalize - converts ASCII uppercase to lowercase", function () {
	const result = _normalize("EXAMPLE.COM")

	assertEquals(result, "example.com")
})

Deno.test("_normalize - converts mixed case to lowercase", function () {
	const result = _normalize("Example.Com")

	assertEquals(result, "example.com")
})

Deno.test("_normalize - preserves already lowercase", function () {
	const result = _normalize("example.com")

	assertEquals(result, "example.com")
})

Deno.test("_normalize - normalizes Unicode to NFC", function () {
	const decomposed = "e\u0301" // e + combining acute accent
	const result = _normalize(decomposed)

	assertEquals(result, "\u00e9") // é as single character
})

Deno.test("_normalize - converts Unicode uppercase to lowercase", function () {
	const result = _normalize("MÜNCHEN.DE")

	assertEquals(result, "münchen.de")
})

Deno.test("_normalize - handles mixed Unicode case", function () {
	const result = _normalize("München.De")

	assertEquals(result, "münchen.de")
})

Deno.test("_normalize - handles French accents", function () {
	const result = _normalize("CAFÉ.FR")

	assertEquals(result, "café.fr")
})

Deno.test("_normalize - handles Japanese characters", function () {
	const result = _normalize("例え.JP")

	assertEquals(result, "例え.jp")
})

Deno.test("_normalize - handles Arabic characters", function () {
	const result = _normalize("مثال.COM")

	assertEquals(result, "مثال.com")
})

Deno.test("_normalize - handles Punycode", function () {
	const result = _normalize("XN--MNCHEN-3YA.DE")

	assertEquals(result, "xn--mnchen-3ya.de")
})

Deno.test("_normalize - handles empty string", function () {
	const result = _normalize("")

	assertEquals(result, "")
})

Deno.test("_normalize - preserves hyphens", function () {
	const result = _normalize("MY-EXAMPLE.COM")

	assertEquals(result, "my-example.com")
})

Deno.test("_normalize - preserves numbers", function () {
	const result = _normalize("EXAMPLE123.COM")

	assertEquals(result, "example123.com")
})

Deno.test("_normalize - handles combining marks (Hindi)", function () {
	const result = _normalize("उदाहरण.COM")

	assertEquals(result, "उदाहरण.com")
})

Deno.test("_normalize - applies NFC before lowercase", function () {
	const decomposed = "CAFÉ" // C A F E + combining acute
	const result = _normalize(decomposed)

	assertEquals(result.normalize("NFC"), result) // Verify NFC form
	assertEquals(result, "café")
})
