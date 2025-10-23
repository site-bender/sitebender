import { assertEquals } from "@std/assert"
import isIpv6Address from "./index.ts"

Deno.test("_isIpv6Address - valid full form returns true", function () {
	assertEquals(isIpv6Address("2001:0db8:0000:0000:0000:0000:0000:0001"), true)
})

Deno.test("_isIpv6Address - valid compressed form returns true", function () {
	assertEquals(isIpv6Address("2001:db8::1"), true)
})

Deno.test("_isIpv6Address - loopback returns true", function () {
	assertEquals(isIpv6Address("::1"), true)
})

Deno.test("_isIpv6Address - unspecified returns true", function () {
	assertEquals(isIpv6Address("::"), true)
})

Deno.test("_isIpv6Address - IPv4-mapped returns true", function () {
	assertEquals(isIpv6Address("::ffff:192.0.2.1"), true)
})

Deno.test("_isIpv6Address - IPv4-embedded returns true", function () {
	assertEquals(isIpv6Address("64:ff9b::192.0.2.33"), true)
})

Deno.test("_isIpv6Address - link-local returns true", function () {
	assertEquals(isIpv6Address("fe80::204:61ff:fe9d:f156"), true)
})

Deno.test("_isIpv6Address - empty string returns false", function () {
	assertEquals(isIpv6Address(""), false)
})

Deno.test("_isIpv6Address - invalid characters return false", function () {
	assertEquals(isIpv6Address("2001:db8::xyz"), false)
})

Deno.test("_isIpv6Address - multiple compressions return false", function () {
	assertEquals(isIpv6Address("2001::db8::1"), false)
})

Deno.test("_isIpv6Address - too many groups returns false", function () {
	assertEquals(isIpv6Address("2001:db8:0:0:0:0:0:1:2"), false)
})

Deno.test("_isIpv6Address - too few groups returns false", function () {
	assertEquals(isIpv6Address("2001:db8"), false)
})

Deno.test("_isIpv6Address - invalid IPv4 embedding returns false", function () {
	assertEquals(isIpv6Address("::ffff:256.0.0.1"), false)
})

Deno.test("_isIpv6Address - leading colon returns false", function () {
	assertEquals(isIpv6Address(":2001:db8::1"), false)
})

Deno.test("_isIpv6Address - trailing colon returns false", function () {
	assertEquals(isIpv6Address("2001:db8::1:"), false)
})
