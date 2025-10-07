import { assertEquals } from "@std/assert"
import unsafeUrl from "./index.ts"

Deno.test("unsafeUrl: brands string as Url", function () {
	const result = unsafeUrl("http://example.com")
	assertEquals(result, "http://example.com")
})

Deno.test("unsafeUrl: does not validate", function () {
	const result = unsafeUrl("not-a-url")
	assertEquals(result, "not-a-url")
})

Deno.test("unsafeUrl: preserves the value", function () {
	const value = "https://example.com/path?query=value#fragment"
	const result = unsafeUrl(value)
	assertEquals(result, value)
})
