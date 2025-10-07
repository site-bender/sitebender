import { assertEquals } from "@std/assert"
import ipv6Address from "./index.ts"
import unwrapIpv6Address from "./unwrapIpv6Address/index.ts"

// Valid addresses that should normalize
Deno.test("ipv6Address - full form normalizes to compressed", function () {
	const result = ipv6Address("2001:0db8:0000:0000:0000:0000:0000:0001")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::1")
	}
})

Deno.test("ipv6Address - already compressed stays compressed", function () {
	const result = ipv6Address("2001:db8::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::1")
	}
})

Deno.test("ipv6Address - uppercase normalizes to lowercase", function () {
	const result = ipv6Address("2001:0DB8::FF00:42:8329")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::ff00:42:8329")
	}
})

Deno.test("ipv6Address - loopback address", function () {
	const result = ipv6Address("::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "::1")
	}
})

Deno.test("ipv6Address - unspecified address", function () {
	const result = ipv6Address("::")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "::")
	}
})

Deno.test("ipv6Address - link-local address", function () {
	const result = ipv6Address("fe80::204:61ff:fe9d:f156")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "fe80::204:61ff:fe9d:f156")
	}
})

Deno.test("ipv6Address - multicast address", function () {
	const result = ipv6Address("ff02::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "ff02::1")
	}
})

Deno.test("ipv6Address - compress at end", function () {
	const result = ipv6Address("fe80::")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "fe80::")
	}
})

Deno.test("ipv6Address - compress in middle", function () {
	const result = ipv6Address("2001:db8::8a2e:370:7334")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::8a2e:370:7334")
	}
})

Deno.test("ipv6Address - compress leftmost when equal runs", function () {
	const result = ipv6Address("2001:db8:0:0:1:0:0:1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::1:0:0:1")
	}
})

Deno.test("ipv6Address - do not compress single zero", function () {
	const result = ipv6Address("2001:db8:0:1:2:3:4:5")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8:0:1:2:3:4:5")
	}
})

Deno.test("ipv6Address - no zeros to compress", function () {
	const result = ipv6Address("2001:db8:1:2:3:4:5:6")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8:1:2:3:4:5:6")
	}
})

Deno.test("ipv6Address - remove leading zeros from groups", function () {
	const result = ipv6Address("2001:0db8:0001:0002:0003:0004:0005:0006")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8:1:2:3:4:5:6")
	}
})

// IPv4 embedding tests
Deno.test("ipv6Address - IPv4-mapped address preserves IPv4", function () {
	const result = ipv6Address("::ffff:192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "::ffff:192.0.2.1")
	}
})

Deno.test("ipv6Address - IPv4-embedded with compression", function () {
	const result = ipv6Address("64:ff9b::192.0.2.33")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "64:ff9b::192.0.2.33")
	}
})

Deno.test("ipv6Address - IPv4-compatible address", function () {
	const result = ipv6Address("::192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "::192.0.2.1")
	}
})

Deno.test("ipv6Address - IPv4 suffix without compression", function () {
	const result = ipv6Address("2001:db8:1:2:3:4:192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8:1:2:3:4:192.0.2.1")
	}
})

Deno.test("ipv6Address - compress before IPv4 suffix", function () {
	const result = ipv6Address("2001:db8::192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::192.0.2.1")
	}
})

Deno.test("ipv6Address - full form with IPv4 normalizes", function () {
	const result = ipv6Address("0:0:0:0:0:ffff:192.0.2.1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "::ffff:192.0.2.1")
	}
})

// Error cases
Deno.test("ipv6Address - empty string fails", function () {
	const result = ipv6Address("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_EMPTY")
	}
})

Deno.test("ipv6Address - invalid characters fail", function () {
	const result = ipv6Address("2001:db8::xyz")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_CHARACTERS")
	}
})

Deno.test("ipv6Address - multiple compressions fail", function () {
	const result = ipv6Address("2001::db8::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_MULTIPLE_COMPRESSIONS")
	}
})

Deno.test("ipv6Address - triple colon fails", function () {
	const result = ipv6Address("2001:::db8")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_CONSECUTIVE_COLONS")
	}
})

Deno.test("ipv6Address - leading single colon fails", function () {
	const result = ipv6Address(":2001:db8::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_LEADING_COLON")
	}
})

Deno.test("ipv6Address - trailing single colon fails", function () {
	const result = ipv6Address("2001:db8::1:")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TRAILING_COLON")
	}
})

Deno.test("ipv6Address - group too long fails", function () {
	const result = ipv6Address("2001:db8:12345::1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_GROUP_TOO_LONG")
	}
})

Deno.test("ipv6Address - too many groups fails", function () {
	const result = ipv6Address("2001:db8:0:0:0:0:0:1:2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_MANY_GROUPS")
	}
})

Deno.test("ipv6Address - too few groups fails", function () {
	const result = ipv6Address("2001:db8:0:0:0:0:0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_FEW_GROUPS")
	}
})

Deno.test("ipv6Address - invalid IPv4 embedded fails", function () {
	const result = ipv6Address("::ffff:256.0.0.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

Deno.test("ipv6Address - IPv4 with leading zeros fails", function () {
	const result = ipv6Address("::ffff:192.168.001.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

Deno.test("ipv6Address - too many groups with IPv4 fails", function () {
	const result = ipv6Address("2001:db8:1:2:3:4:5:192.0.2.1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_TOO_MANY_GROUPS_WITH_IPV4")
	}
})

Deno.test("ipv6Address - incomplete IPv4 fails", function () {
	const result = ipv6Address("::ffff:192.0.2")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_IPV4_EMBEDDED")
	}
})

// Special addresses
Deno.test("ipv6Address - documentation prefix", function () {
	const result = ipv6Address("2001:db8::1234:5678")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8::1234:5678")
	}
})

Deno.test("ipv6Address - unique local address", function () {
	const result = ipv6Address("fc00::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "fc00::1")
	}
})

Deno.test("ipv6Address - teredo prefix", function () {
	const result = ipv6Address("2001::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001::1")
	}
})

Deno.test("ipv6Address - all f's", function () {
	const result = ipv6Address("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(
			unwrapIpv6Address(result.value),
			"ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
		)
	}
})

Deno.test("ipv6Address - mixed case normalizes", function () {
	const result = ipv6Address("2001:DB8:AbCd:EfGh::1")
	assertEquals(result._tag, "Error") // Invalid hex digits 'g' and 'h'
	if (result._tag === "Error") {
		assertEquals(result.error.code, "IPV6_ADDRESS_INVALID_CHARACTERS")
	}
})

Deno.test("ipv6Address - valid mixed case", function () {
	const result = ipv6Address("2001:DB8:AbCd:EFab::1")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(unwrapIpv6Address(result.value), "2001:db8:abcd:efab::1")
	}
})
