import { assertEquals } from "@std/assert"
import unsafeHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unsafeHostname/index.ts"
import unwrapHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unwrapHostname/index.ts"

Deno.test("unsafeHostname - brands localhost without validation", function () {
	const branded = unsafeHostname("localhost")
	assertEquals(unwrapHostname(branded), "localhost")
})

Deno.test("unsafeHostname - brands domain without validation", function () {
	const branded = unsafeHostname("example.com")
	assertEquals(unwrapHostname(branded), "example.com")
})

Deno.test("unsafeHostname - brands IPv4 without validation", function () {
	const branded = unsafeHostname("192.168.1.1")
	assertEquals(unwrapHostname(branded), "192.168.1.1")
})

Deno.test("unsafeHostname - brands IPv6 without validation", function () {
	const branded = unsafeHostname("::1")
	assertEquals(unwrapHostname(branded), "::1")
})

Deno.test("unsafeHostname - brands invalid value without validation", function () {
	const branded = unsafeHostname("not valid!")
	assertEquals(unwrapHostname(branded), "not valid!")
})
