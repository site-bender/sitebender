import { assertEquals } from "@std/assert"
import unsafeIpv6Address from "@sitebender/toolsmith/newtypes/webTypes/ipv6Address/unsafeIpv6Address/index.ts"
import unwrapIpv6Address from "./index.ts"

Deno.test("unwrapIpv6Address - unwraps compressed address", function () {
	const address = unsafeIpv6Address("2001:db8::1")
	const result = unwrapIpv6Address(address)
	assertEquals(result, "2001:db8::1")
})

Deno.test("unwrapIpv6Address - unwraps loopback address", function () {
	const address = unsafeIpv6Address("::1")
	const result = unwrapIpv6Address(address)
	assertEquals(result, "::1")
})

Deno.test("unwrapIpv6Address - unwraps IPv4-mapped address", function () {
	const address = unsafeIpv6Address("::ffff:192.0.2.1")
	const result = unwrapIpv6Address(address)
	assertEquals(result, "::ffff:192.0.2.1")
})
