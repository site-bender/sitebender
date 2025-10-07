import { assertEquals } from "@std/assert"
import unsafeEmailAddress from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/unsafeEmailAddress/index.ts"
import unwrapEmailAddress from "./index.ts"

Deno.test("unwrapEmailAddress: extracts original string value", function () {
	const email = unsafeEmailAddress("user@example.com")
	const unwrapped = unwrapEmailAddress(email)

	assertEquals(unwrapped, "user@example.com")
	assertEquals(typeof unwrapped, "string")
})

Deno.test("unwrapEmailAddress: preserves exact value", function () {
	const email = unsafeEmailAddress("josé@españa.es")
	const unwrapped = unwrapEmailAddress(email)

	assertEquals(unwrapped, "josé@españa.es")
})

Deno.test("unwrapEmailAddress: roundtrip preservation", function () {
	const original = "user+tag@example.com"
	const email = unsafeEmailAddress(original)
	const unwrapped = unwrapEmailAddress(email)

	assertEquals(unwrapped, original)
})
