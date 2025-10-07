import { assertEquals } from "@std/assert"
import unsafeIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unsafeIpv4Address/index.ts"
import unwrapIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unwrapIpv4Address/index.ts"

Deno.test("unwrapIpv4Address unwraps Ipv4Address back to string", function () {
	const address = unsafeIpv4Address("192.168.1.1")
	assertEquals(unwrapIpv4Address(address), "192.168.1.1")
})

Deno.test("unwrapIpv4Address unwraps different addresses correctly", function () {
	assertEquals(
		unwrapIpv4Address(unsafeIpv4Address("127.0.0.1")),
		"127.0.0.1",
	)
	assertEquals(
		unwrapIpv4Address(unsafeIpv4Address("0.0.0.0")),
		"0.0.0.0",
	)
	assertEquals(
		unwrapIpv4Address(unsafeIpv4Address("255.255.255.255")),
		"255.255.255.255",
	)
})
