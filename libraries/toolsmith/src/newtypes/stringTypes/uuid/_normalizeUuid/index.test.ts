import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import _normalizeUuid from "./index.ts"

describe("_normalizeUuid", () => {
	it("converts uppercase to lowercase", () => {
		const result = _normalizeUuid("550E8400-E29B-41D4-A716-446655440000")
		assertEquals(result, "550e8400-e29b-41d4-a716-446655440000")
	})

	it("converts mixed case to lowercase", () => {
		const result = _normalizeUuid("550e8400-E29B-41d4-A716-446655440000")
		assertEquals(result, "550e8400-e29b-41d4-a716-446655440000")
	})

	it("preserves already lowercase UUID", () => {
		const result = _normalizeUuid("550e8400-e29b-41d4-a716-446655440000")
		assertEquals(result, "550e8400-e29b-41d4-a716-446655440000")
	})

	it("converts all uppercase F's", () => {
		const result = _normalizeUuid("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")
		assertEquals(result, "ffffffff-ffff-ffff-ffff-ffffffffffff")
	})

	it("preserves numeric-only UUID", () => {
		const result = _normalizeUuid("12345678-1234-5678-1234-567812345678")
		assertEquals(result, "12345678-1234-5678-1234-567812345678")
	})

	it("preserves nil UUID", () => {
		const result = _normalizeUuid("00000000-0000-0000-0000-000000000000")
		assertEquals(result, "00000000-0000-0000-0000-000000000000")
	})

	it("preserves hyphens in correct positions", () => {
		const result = _normalizeUuid("6BA7B810-9DAD-11D1-80B4-00C04FD430C8")
		assertEquals(result, "6ba7b810-9dad-11d1-80b4-00c04fd430c8")
	})

	it("converts all hex letters (a-f)", () => {
		const result = _normalizeUuid("ABCDEF01-ABCD-ABCD-ABCD-ABCDEF012345")
		assertEquals(result, "abcdef01-abcd-abcd-abcd-abcdef012345")
	})

	it("handles partial uppercase", () => {
		const result = _normalizeUuid("A1b2C3d4-E5f6-7890-ABcd-EF1234567890")
		assertEquals(result, "a1b2c3d4-e5f6-7890-abcd-ef1234567890")
	})

	it("handles single uppercase letter", () => {
		const result = _normalizeUuid("550e8400-e29b-41d4-a716-44665544000A")
		assertEquals(result, "550e8400-e29b-41d4-a716-44665544000a")
	})
})
