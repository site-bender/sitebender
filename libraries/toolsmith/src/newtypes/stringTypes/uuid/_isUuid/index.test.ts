import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import _isUuid from "./index.ts"

describe("_isUuid", () => {
	describe("valid UUIDs", () => {
		it("returns true for standard v4 UUID", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716-446655440000"), true)
		})

		it("returns true for uppercase UUID", () => {
			assertEquals(_isUuid("550E8400-E29B-41D4-A716-446655440000"), true)
		})

		it("returns true for mixed case UUID", () => {
			assertEquals(_isUuid("550e8400-E29B-41d4-A716-446655440000"), true)
		})

		it("returns true for nil UUID", () => {
			assertEquals(_isUuid("00000000-0000-0000-0000-000000000000"), true)
		})

		it("returns true for all f's UUID", () => {
			assertEquals(_isUuid("ffffffff-ffff-ffff-ffff-ffffffffffff"), true)
		})

		it("returns true for all F's UUID", () => {
			assertEquals(_isUuid("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF"), true)
		})

		it("returns true for v1 timestamp UUID", () => {
			assertEquals(_isUuid("6ba7b810-9dad-11d1-80b4-00c04fd430c8"), true)
		})

		it("returns true for v5 name-based UUID", () => {
			assertEquals(_isUuid("886313e1-3b8a-5372-9b90-0c9aee199e5d"), true)
		})

		it("returns true for numeric-only UUID", () => {
			assertEquals(_isUuid("12345678-1234-5678-1234-567812345678"), true)
		})
	})

	describe("invalid UUIDs", () => {
		it("returns false for empty string", () => {
			assertEquals(_isUuid(""), false)
		})

		it("returns false for too short UUID", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716-44665544000"), false)
		})

		it("returns false for too long UUID", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716-4466554400000"), false)
		})

		it("returns false for no hyphens", () => {
			assertEquals(_isUuid("550e8400e29b41d4a716446655440000"), false)
		})

		it("returns false for underscores", () => {
			assertEquals(_isUuid("550e8400_e29b_41d4_a716_446655440000"), false)
		})

		it("returns false for invalid hex character 'g'", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716-44665544000g"), false)
		})

		it("returns false for invalid hex character 'z'", () => {
			assertEquals(_isUuid("550e840z-e29b-41d4-a716-446655440000"), false)
		})

		it("returns false for space in UUID", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716-44665544 000"), false)
		})

		it("returns false for missing hyphen", () => {
			assertEquals(_isUuid("550e8400-e29b41d4-a716-446655440000"), false)
		})

		it("returns false for double hyphen", () => {
			assertEquals(_isUuid("550e8400-e29b--41d4-a716-446655440000"), false)
		})

		it("returns false for incomplete UUID", () => {
			assertEquals(_isUuid("550e8400-e29b-41d4-a716"), false)
		})
	})
})
