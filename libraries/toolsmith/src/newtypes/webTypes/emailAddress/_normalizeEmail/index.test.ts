import { assertEquals } from "@std/assert"
import _normalizeEmail from "./index.ts"

Deno.test("_normalizeEmail: converts uppercase to lowercase", function () {
	assertEquals(_normalizeEmail("USER@EXAMPLE.COM"), "user@example.com")
})

Deno.test("_normalizeEmail: handles mixed case", function () {
	assertEquals(_normalizeEmail("User@Example.Com"), "user@example.com")
})

Deno.test("_normalizeEmail: preserves already lowercase", function () {
	assertEquals(_normalizeEmail("user@example.com"), "user@example.com")
})

Deno.test("_normalizeEmail: handles Unicode characters", function () {
	assertEquals(_normalizeEmail("JOSÉ@ESPAÑA.ES"), "josé@españa.es")
})

Deno.test("_normalizeEmail: handles Chinese characters", function () {
	assertEquals(_normalizeEmail("用户@EXAMPLE.COM"), "用户@example.com")
})

Deno.test("_normalizeEmail: applies NFC normalization", function () {
	const combined = "jose\u0301@example.com"
	const single = "josé@example.com"

	const normalizedCombined = _normalizeEmail(combined)
	const normalizedSingle = _normalizeEmail(single)

	assertEquals(normalizedCombined, normalizedSingle)
})

Deno.test("_normalizeEmail: handles German umlaut", function () {
	assertEquals(_normalizeEmail("MÜLLER@MÜNCHEN.DE"), "müller@münchen.de")
})

Deno.test("_normalizeEmail: handles Hindi characters", function () {
	assertEquals(_normalizeEmail("संपर्क@डोमेन.भारत"), "संपर्क@डोमेन.भारत")
})

Deno.test("_normalizeEmail: preserves dots and special chars", function () {
	assertEquals(
		_normalizeEmail("First.Last+Tag@Example.Com"),
		"first.last+tag@example.com",
	)
})

Deno.test("_normalizeEmail: handles empty string", function () {
	assertEquals(_normalizeEmail(""), "")
})
