import { assertEquals } from "@std/assert"
import ipv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/index.ts"
import unwrapIpv4Address from "@sitebender/toolsmith/newtypes/webTypes/ipv4Address/unwrapIpv4Address/index.ts"

Deno.test("ipv4Address accepts valid IPv4 addresses", function () {
	const result1 = ipv4Address("192.168.1.1")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(unwrapIpv4Address(result1.value), "192.168.1.1")
	}

	const result2 = ipv4Address("0.0.0.0")
	assertEquals(result2._tag, "Ok")

	const result3 = ipv4Address("255.255.255.255")
	assertEquals(result3._tag, "Ok")

	const result4 = ipv4Address("127.0.0.1")
	assertEquals(result4._tag, "Ok")

	const result5 = ipv4Address("8.8.8.8")
	assertEquals(result5._tag, "Ok")
})

Deno.test("ipv4Address rejects empty string with helpful error", function () {
	const result = ipv4Address("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_EMPTY")
		assertEquals(result.error.field, "ipv4Address")
		assertEquals(
			result.error.messages[0],
			"The system needs an IPv4 address.",
		)
	}
})

Deno.test("ipv4Address rejects addresses with too few octets", function () {
	const result = ipv4Address("192.168.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_INVALID_FORMAT")
		assertEquals(result.error.field, "ipv4Address")
	}
})

Deno.test("ipv4Address rejects addresses with too many octets", function () {
	const result = ipv4Address("192.168.1.1.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_INVALID_FORMAT")
	}
})

Deno.test("ipv4Address rejects addresses with leading zeros", function () {
	const result = ipv4Address("192.168.001.001")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_LEADING_ZERO")
		assertEquals(result.error.field, "ipv4Address.octet3")
	}
})

Deno.test("ipv4Address rejects addresses with octets out of range (too high)", function () {
	const result = ipv4Address("256.0.0.0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_OCTET_OUT_OF_RANGE")
		assertEquals(result.error.field, "ipv4Address.octet1")
	}
})

Deno.test("ipv4Address rejects addresses with negative octets", function () {
	const result = ipv4Address("-1.0.0.0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_OCTET_OUT_OF_RANGE")
	}
})

Deno.test("ipv4Address rejects addresses with non-numeric octets", function () {
	const result = ipv4Address("abc.def.ghi.jkl")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_INVALID_OCTET")
		assertEquals(result.error.field, "ipv4Address.octet1")
	}
})

Deno.test("ipv4Address rejects addresses with empty octets", function () {
	const result = ipv4Address("192..1.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV4_ADDRESS_EMPTY_OCTET")
		assertEquals(result.error.field, "ipv4Address.octet2")
	}
})

Deno.test("ipv4Address provides actionable suggestions in errors", function () {
	const result = ipv4Address("192.168.001.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(
			result.error.suggestion,
			"Remove leading zero from '001' (use 1)",
		)
	}
})

Deno.test("ipv4Address includes constraints for out of range octets", function () {
	const result = ipv4Address("999.0.0.0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.constraints?.min, 0)
		assertEquals(result.error.constraints?.max, 255)
	}
})
