import { assertEquals } from "@std/assert"
import _isIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/_isIpv4Address/index.ts"

Deno.test("_isIpv4Address returns true for valid IPv4 addresses", function () {
	assertEquals(_isIpv4Address("0.0.0.0"), true)
	assertEquals(_isIpv4Address("127.0.0.1"), true)
	assertEquals(_isIpv4Address("192.168.1.1"), true)
	assertEquals(_isIpv4Address("255.255.255.255"), true)
	assertEquals(_isIpv4Address("10.0.0.0"), true)
	assertEquals(_isIpv4Address("172.16.0.0"), true)
	assertEquals(_isIpv4Address("8.8.8.8"), true)
	assertEquals(_isIpv4Address("1.2.3.4"), true)
})

Deno.test("_isIpv4Address returns false for addresses with leading zeros", function () {
	assertEquals(_isIpv4Address("192.168.001.001"), false)
	assertEquals(_isIpv4Address("01.0.0.0"), false)
	assertEquals(_isIpv4Address("192.168.1.01"), false)
})

Deno.test("_isIpv4Address returns false for addresses with too few octets", function () {
	assertEquals(_isIpv4Address("192.168.1"), false)
	assertEquals(_isIpv4Address("192.168"), false)
	assertEquals(_isIpv4Address("192"), false)
})

Deno.test("_isIpv4Address returns false for addresses with too many octets", function () {
	assertEquals(_isIpv4Address("192.168.1.1.1"), false)
	assertEquals(_isIpv4Address("1.2.3.4.5"), false)
})

Deno.test("_isIpv4Address returns false for addresses with octets out of range", function () {
	assertEquals(_isIpv4Address("256.0.0.0"), false)
	assertEquals(_isIpv4Address("192.256.1.1"), false)
	assertEquals(_isIpv4Address("192.168.1.256"), false)
	assertEquals(_isIpv4Address("999.999.999.999"), false)
	assertEquals(_isIpv4Address("-1.0.0.0"), false)
})

Deno.test("_isIpv4Address returns false for addresses with non-numeric octets", function () {
	assertEquals(_isIpv4Address("abc.def.ghi.jkl"), false)
	assertEquals(_isIpv4Address("192.168.a.1"), false)
	assertEquals(_isIpv4Address("192.168.1.1x"), false)
})

Deno.test("_isIpv4Address returns false for empty string", function () {
	assertEquals(_isIpv4Address(""), false)
})

Deno.test("_isIpv4Address returns false for addresses with empty octets", function () {
	assertEquals(_isIpv4Address("..."), false)
	assertEquals(_isIpv4Address("192..1.1"), false)
	assertEquals(_isIpv4Address(".168.1.1"), false)
})

Deno.test("_isIpv4Address returns false for addresses with extra dots", function () {
	assertEquals(_isIpv4Address("192.168.1.1."), false)
	assertEquals(_isIpv4Address(".192.168.1.1"), false)
})

Deno.test("_isIpv4Address returns false for addresses with spaces", function () {
	assertEquals(_isIpv4Address("192. 168.1.1"), false)
	assertEquals(_isIpv4Address("192.168.1 .1"), false)
})
