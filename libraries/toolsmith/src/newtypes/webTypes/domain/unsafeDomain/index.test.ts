import { assertEquals } from "@std/assert"
import unsafeDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unsafeDomain/index.ts"

Deno.test("unsafeDomain - brands valid domain without validation", function () {
	const result = unsafeDomain("example.com")

	assertEquals(result, "example.com")
})

Deno.test("unsafeDomain - brands invalid domain without validation (no TLD)", function () {
	const result = unsafeDomain("example")

	assertEquals(result, "example")
})

Deno.test("unsafeDomain - brands invalid domain without validation (empty)", function () {
	const result = unsafeDomain("")

	assertEquals(result, "")
})
