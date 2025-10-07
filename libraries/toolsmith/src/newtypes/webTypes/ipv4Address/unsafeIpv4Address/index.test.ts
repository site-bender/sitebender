import { assertEquals } from "@std/assert"
import unsafeIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unsafeIpv4Address/index.ts"
import unwrapIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unwrapIpv4Address/index.ts"

Deno.test("unsafeIpv4Address brands a string as Ipv4Address without validation", function () {
	const address = unsafeIpv4Address("192.168.1.1")
	assertEquals(unwrapIpv4Address(address), "192.168.1.1")
})

Deno.test("unsafeIpv4Address allows invalid IPv4 addresses (unsafe)", function () {
	const invalid = unsafeIpv4Address("999.999.999.999")
	assertEquals(unwrapIpv4Address(invalid), "999.999.999.999")
})
