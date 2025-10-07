import { assertEquals } from "@std/assert"
import unsafeUrl from "../unsafeUrl/index.ts"
import unwrapUrl from "./index.ts"

Deno.test("unwrapUrl: extracts raw string value", function () {
	const urlValue = unsafeUrl("http://example.com")
	const result = unwrapUrl(urlValue)
	assertEquals(result, "http://example.com")
})

Deno.test("unwrapUrl: round-trip preserves value", function () {
	const original = "https://example.com/path?query=value#fragment"
	const wrapped = unsafeUrl(original)
	const unwrapped = unwrapUrl(wrapped)
	assertEquals(unwrapped, original)
})
