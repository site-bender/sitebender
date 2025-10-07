import { assertEquals } from "@std/assert"
import unsafeEmailAddress from "./index.ts"

Deno.test("unsafeEmailAddress: brands valid email", function () {
	const result = unsafeEmailAddress("user@example.com")

	assertEquals(typeof result, "string")
	assertEquals(result, "user@example.com")
})

Deno.test("unsafeEmailAddress: brands without validation", function () {
	const result = unsafeEmailAddress("invalid")

	assertEquals(typeof result, "string")
	assertEquals(result, "invalid")
})

Deno.test("unsafeEmailAddress: preserves exact input", function () {
	const result = unsafeEmailAddress("User@EXAMPLE.COM")

	assertEquals(result, "User@EXAMPLE.COM")
})

Deno.test("unsafeEmailAddress: handles internationalized email", function () {
	const result = unsafeEmailAddress("josé@españa.es")

	assertEquals(result, "josé@españa.es")
})
