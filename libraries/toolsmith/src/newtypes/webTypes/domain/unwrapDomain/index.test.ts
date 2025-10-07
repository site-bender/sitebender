import { assertEquals } from "@std/assert"
import unsafeDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unsafeDomain/index.ts"
import unwrapDomain from "@sitebender/toolsmith/newtypes/webTypes/domain/unwrapDomain/index.ts"

Deno.test("unwrapDomain - unwraps branded domain to string", function () {
	const branded = unsafeDomain("example.com")
	const result = unwrapDomain(branded)

	assertEquals(result, "example.com")
	assertEquals(typeof result, "string")
})

Deno.test("unwrapDomain - unwraps internationalized domain", function () {
	const branded = unsafeDomain("münchen.de")
	const result = unwrapDomain(branded)

	assertEquals(result, "münchen.de")
})

Deno.test("unwrapDomain - unwraps subdomain", function () {
	const branded = unsafeDomain("www.example.com")
	const result = unwrapDomain(branded)

	assertEquals(result, "www.example.com")
})
