import { assertEquals } from "@std/assert"
import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"
import unsafeIpv6Address from "./index.ts"

Deno.test("unsafeIpv6Address - brands valid address", function () {
	const result: Ipv6Address = unsafeIpv6Address("2001:db8::1")
	assertEquals(result, "2001:db8::1")
})

Deno.test("unsafeIpv6Address - brands invalid address without validation", function () {
	const result: Ipv6Address = unsafeIpv6Address("not-an-ipv6")
	assertEquals(result, "not-an-ipv6")
})

Deno.test("unsafeIpv6Address - brands IPv4-mapped address", function () {
	const result: Ipv6Address = unsafeIpv6Address("::ffff:192.0.2.1")
	assertEquals(result, "::ffff:192.0.2.1")
})
