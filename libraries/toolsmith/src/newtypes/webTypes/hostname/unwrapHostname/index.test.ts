import { assertEquals } from "@std/assert"
import unsafeHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unsafeHostname/index.ts"
import unwrapHostname from "@sitebender/toolsmith/newtypes/webTypes/hostname/unwrapHostname/index.ts"

Deno.test("unwrapHostname - unwraps localhost", function () {
	const branded = unsafeHostname("localhost")
	assertEquals(unwrapHostname(branded), "localhost")
})

Deno.test("unwrapHostname - unwraps domain", function () {
	const branded = unsafeHostname("example.com")
	assertEquals(unwrapHostname(branded), "example.com")
})

Deno.test("unwrapHostname - unwraps IPv4 address", function () {
	const branded = unsafeHostname("192.168.1.1")
	assertEquals(unwrapHostname(branded), "192.168.1.1")
})

Deno.test("unwrapHostname - unwraps IPv6 address", function () {
	const branded = unsafeHostname("2001:db8::1")
	assertEquals(unwrapHostname(branded), "2001:db8::1")
})
