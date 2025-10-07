import { assertEquals } from "@std/assert"
import _normalizeIpv6Address from "./index.ts"

Deno.test("_normalizeIpv6Address - full form to compressed", function () {
	const result = _normalizeIpv6Address([0x2001, 0x0db8, 0, 0, 0, 0, 0, 1])
	assertEquals(result, "2001:db8::1")
})

Deno.test("_normalizeIpv6Address - lowercase hex digits", function () {
	const result = _normalizeIpv6Address([
		0x2001,
		0x0DB8,
		0,
		0,
		0,
		0xFF00,
		0x0042,
		0x8329,
	])
	assertEquals(result, "2001:db8::ff00:42:8329")
})

Deno.test("_normalizeIpv6Address - remove leading zeros", function () {
	const result = _normalizeIpv6Address([
		0x2001,
		0x0db8,
		0x0001,
		0x0002,
		0x0003,
		0x0004,
		0x0005,
		0x0006,
	])
	assertEquals(result, "2001:db8:1:2:3:4:5:6")
})

Deno.test("_normalizeIpv6Address - compress loopback", function () {
	const result = _normalizeIpv6Address([0, 0, 0, 0, 0, 0, 0, 1])
	assertEquals(result, "::1")
})

Deno.test("_normalizeIpv6Address - compress unspecified", function () {
	const result = _normalizeIpv6Address([0, 0, 0, 0, 0, 0, 0, 0])
	assertEquals(result, "::")
})

Deno.test("_normalizeIpv6Address - compress at start", function () {
	const result = _normalizeIpv6Address([0, 0, 0, 0, 0, 0, 0x8a2e, 0x370])
	assertEquals(result, "::8a2e:370")
})

Deno.test("_normalizeIpv6Address - compress at end", function () {
	const result = _normalizeIpv6Address([0xfe80, 0, 0, 0, 0, 0, 0, 0])
	assertEquals(result, "fe80::")
})

Deno.test("_normalizeIpv6Address - compress in middle", function () {
	const result = _normalizeIpv6Address([
		0x2001,
		0x0db8,
		0,
		0,
		0,
		0x8a2e,
		0x370,
		0x7334,
	])
	assertEquals(result, "2001:db8::8a2e:370:7334")
})

Deno.test("_normalizeIpv6Address - compress longest run", function () {
	const result = _normalizeIpv6Address([0x2001, 0, 0, 0, 0, 0, 0x370, 0x7334])
	assertEquals(result, "2001::370:7334")
})

Deno.test("_normalizeIpv6Address - compress leftmost when equal length", function () {
	const result = _normalizeIpv6Address([0x2001, 0x0db8, 0, 0, 1, 0, 0, 1])
	assertEquals(result, "2001:db8::1:0:0:1")
})

Deno.test("_normalizeIpv6Address - do not compress single zero", function () {
	const result = _normalizeIpv6Address([0x2001, 0x0db8, 0, 1, 2, 3, 4, 5])
	assertEquals(result, "2001:db8:0:1:2:3:4:5")
})

Deno.test("_normalizeIpv6Address - no zeros to compress", function () {
	const result = _normalizeIpv6Address([0x2001, 0x0db8, 1, 2, 3, 4, 5, 6])
	assertEquals(result, "2001:db8:1:2:3:4:5:6")
})

Deno.test("_normalizeIpv6Address - link-local address", function () {
	const result = _normalizeIpv6Address([
		0xfe80,
		0,
		0,
		0,
		0x204,
		0x61ff,
		0xfe9d,
		0xf156,
	])
	assertEquals(result, "fe80::204:61ff:fe9d:f156")
})

Deno.test("_normalizeIpv6Address - multicast address", function () {
	const result = _normalizeIpv6Address([0xff02, 0, 0, 0, 0, 0, 0, 1])
	assertEquals(result, "ff02::1")
})

Deno.test("_normalizeIpv6Address - IPv4-mapped address preserves IPv4", function () {
	// ::ffff:192.0.2.1 = [0, 0, 0, 0, 0, 0xFFFF, 0xC000, 0x0201]
	const result = _normalizeIpv6Address(
		[0, 0, 0, 0, 0, 0xffff, 0xc000, 0x0201],
		"192.0.2.1",
	)
	assertEquals(result, "::ffff:192.0.2.1")
})

Deno.test("_normalizeIpv6Address - IPv4-embedded with compression preserves IPv4", function () {
	// 64:ff9b::192.0.2.33 = [0x64, 0xFF9B, 0, 0, 0, 0, 0xC000, 0x0221]
	const result = _normalizeIpv6Address([
		0x64,
		0xff9b,
		0,
		0,
		0,
		0,
		0xc000,
		0x0221,
	], "192.0.2.33")
	assertEquals(result, "64:ff9b::192.0.2.33")
})

Deno.test("_normalizeIpv6Address - IPv4-compatible address preserves IPv4", function () {
	// ::192.0.2.1 = [0, 0, 0, 0, 0, 0, 0xC000, 0x0201]
	const result = _normalizeIpv6Address(
		[0, 0, 0, 0, 0, 0, 0xc000, 0x0201],
		"192.0.2.1",
	)
	assertEquals(result, "::192.0.2.1")
})

Deno.test("_normalizeIpv6Address - IPv4 suffix without compression", function () {
	// 2001:db8:1:2:3:4:192.0.2.1 = [0x2001, 0xDB8, 1, 2, 3, 4, 0xC000, 0x0201]
	const result = _normalizeIpv6Address([
		0x2001,
		0xdb8,
		1,
		2,
		3,
		4,
		0xc000,
		0x0201,
	], "192.0.2.1")
	assertEquals(result, "2001:db8:1:2:3:4:192.0.2.1")
})

Deno.test("_normalizeIpv6Address - compress before IPv4 suffix", function () {
	// 2001:db8::192.0.2.1 = [0x2001, 0xDB8, 0, 0, 0, 0, 0xC000, 0x0201]
	const result = _normalizeIpv6Address([
		0x2001,
		0xdb8,
		0,
		0,
		0,
		0,
		0xc000,
		0x0201,
	], "192.0.2.1")
	assertEquals(result, "2001:db8::192.0.2.1")
})

Deno.test("_normalizeIpv6Address - all zeros with IPv4", function () {
	// ::192.0.2.1
	const result = _normalizeIpv6Address(
		[0, 0, 0, 0, 0, 0, 0xc000, 0x0201],
		"192.0.2.1",
	)
	assertEquals(result, "::192.0.2.1")
})
