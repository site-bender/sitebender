import { assertEquals } from "@std/assert"
import _parseIpv6Address from "./index.ts"

Deno.test("_parseIpv6Address - empty string fails", function () {
	const result = _parseIpv6Address("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_EMPTY")
	}
})

Deno.test("_parseIpv6Address - invalid characters fail", function () {
	const result = _parseIpv6Address("2001:db8::1@2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_CHARACTERS")
	}
})

Deno.test("_parseIpv6Address - multiple :: compressions fail", function () {
	const result = _parseIpv6Address("2001::db8::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_MULTIPLE_COMPRESSIONS")
	}
})

Deno.test("_parseIpv6Address - triple colon fails", function () {
	const result = _parseIpv6Address("2001:::db8")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_CONSECUTIVE_COLONS")
	}
})

Deno.test("_parseIpv6Address - leading single colon fails", function () {
	const result = _parseIpv6Address(":2001:db8::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_LEADING_COLON")
	}
})

Deno.test("_parseIpv6Address - trailing single colon fails", function () {
	const result = _parseIpv6Address("2001:db8::1:")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TRAILING_COLON")
	}
})

Deno.test("_parseIpv6Address - group too long fails", function () {
	const result = _parseIpv6Address("2001:db8:12345::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_GROUP_TOO_LONG")
	}
})

Deno.test("_parseIpv6Address - invalid hex group fails", function () {
	const result = _parseIpv6Address("2001:db8:xyz::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_CHARACTERS")
	}
})

Deno.test("_parseIpv6Address - too many groups without compression fails", function () {
	const result = _parseIpv6Address("2001:db8:0:0:0:0:0:1:2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_MANY_GROUPS")
	}
})

Deno.test("_parseIpv6Address - too few groups without compression fails", function () {
	const result = _parseIpv6Address("2001:db8:0:0:0:0:0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_FEW_GROUPS")
	}
})

Deno.test("_parseIpv6Address - too many groups with compression fails", function () {
	const result = _parseIpv6Address("1:2:3:4:5:6:7:8::9")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_MANY_GROUPS")
	}
})

Deno.test("_parseIpv6Address - empty group without compression fails", function () {
	const result = _parseIpv6Address("2001:db8::1::2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_MULTIPLE_COMPRESSIONS")
	}
})

Deno.test("_parseIpv6Address - full form address succeeds", function () {
	const result = _parseIpv6Address("2001:0db8:0000:0000:0000:0000:0000:0001")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0x2001, 0x0db8, 0, 0, 0, 0, 0, 1])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - compressed form succeeds", function () {
	const result = _parseIpv6Address("2001:db8::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0x2001, 0x0db8, 0, 0, 0, 0, 0, 1])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - loopback succeeds", function () {
	const result = _parseIpv6Address("::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0, 0, 0, 0, 0, 0, 0, 1])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - unspecified address succeeds", function () {
	const result = _parseIpv6Address("::")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0, 0, 0, 0, 0, 0, 0, 0])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - compression at end succeeds", function () {
	const result = _parseIpv6Address("fe80::")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0xfe80, 0, 0, 0, 0, 0, 0, 0])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - compression in middle succeeds", function () {
	const result = _parseIpv6Address("2001:db8::8a2e:370:7334")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [
			0x2001,
			0x0db8,
			0,
			0,
			0,
			0x8a2e,
			0x370,
			0x7334,
		])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - uppercase hex succeeds", function () {
	const result = _parseIpv6Address("2001:DB8::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0x2001, 0x0db8, 0, 0, 0, 0, 0, 1])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - IPv4-mapped address succeeds", function () {
	const result = _parseIpv6Address("::ffff:192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		// 192.0.2.1 = 0xC000:0x0201
		assertEquals(result.value.groups, [0, 0, 0, 0, 0, 0xffff, 0xc000, 0x0201])
		assertEquals(result.value.ipv4Suffix, "192.0.2.1")
	}
})

Deno.test("_parseIpv6Address - IPv4-embedded address succeeds", function () {
	const result = _parseIpv6Address("64:ff9b::192.0.2.33")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		// 192.0.2.33 = 0xC000:0x0221
		assertEquals(result.value.groups, [
			0x64,
			0xff9b,
			0,
			0,
			0,
			0,
			0xc000,
			0x0221,
		])
		assertEquals(result.value.ipv4Suffix, "192.0.2.33")
	}
})

Deno.test("_parseIpv6Address - invalid IPv4 embedded fails", function () {
	const result = _parseIpv6Address("::ffff:256.0.0.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

Deno.test("_parseIpv6Address - IPv4 with leading zeros fails", function () {
	const result = _parseIpv6Address("::ffff:192.168.001.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

Deno.test("_parseIpv6Address - too many groups with IPv4 fails", function () {
	const result = _parseIpv6Address("2001:db8:1:2:3:4:5:192.0.2.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4")
	}
})

Deno.test("_parseIpv6Address - incomplete IPv4 fails", function () {
	const result = _parseIpv6Address("::ffff:192.0.2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

Deno.test("_parseIpv6Address - no compression 8 groups succeeds", function () {
	const result = _parseIpv6Address("2001:db8:1:2:3:4:5:6")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0x2001, 0x0db8, 1, 2, 3, 4, 5, 6])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - link-local address succeeds", function () {
	const result = _parseIpv6Address("fe80::204:61ff:fe9d:f156")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [
			0xfe80,
			0,
			0,
			0,
			0x204,
			0x61ff,
			0xfe9d,
			0xf156,
		])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})

Deno.test("_parseIpv6Address - multicast address succeeds", function () {
	const result = _parseIpv6Address("ff02::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.groups, [0xff02, 0, 0, 0, 0, 0, 0, 1])
		assertEquals(result.value.ipv4Suffix, undefined)
	}
})
