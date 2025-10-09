import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import _validateUuidFormat from "./index.ts"

describe("_validateUuidFormat", () => {
	describe("valid UUIDs", () => {
		it("accepts standard v4 UUID", () => {
			const result = _validateUuidFormat("550e8400-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Ok")
		})

		it("accepts uppercase UUID", () => {
			const result = _validateUuidFormat("550E8400-E29B-41D4-A716-446655440000")
			assertEquals(result._tag, "Ok")
		})

		it("accepts mixed case UUID", () => {
			const result = _validateUuidFormat("550e8400-E29B-41d4-A716-446655440000")
			assertEquals(result._tag, "Ok")
		})

		it("accepts nil UUID (all zeros)", () => {
			const result = _validateUuidFormat("00000000-0000-0000-0000-000000000000")
			assertEquals(result._tag, "Ok")
		})

		it("accepts all f's UUID", () => {
			const result = _validateUuidFormat("ffffffff-ffff-ffff-ffff-ffffffffffff")
			assertEquals(result._tag, "Ok")
		})

		it("accepts all F's UUID", () => {
			const result = _validateUuidFormat("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")
			assertEquals(result._tag, "Ok")
		})

		it("accepts v1 timestamp-based UUID", () => {
			const result = _validateUuidFormat("6ba7b810-9dad-11d1-80b4-00c04fd430c8")
			assertEquals(result._tag, "Ok")
		})

		it("accepts v5 name-based UUID", () => {
			const result = _validateUuidFormat("886313e1-3b8a-5372-9b90-0c9aee199e5d")
			assertEquals(result._tag, "Ok")
		})

		it("accepts numeric-only UUID", () => {
			const result = _validateUuidFormat("12345678-1234-5678-1234-567812345678")
			assertEquals(result._tag, "Ok")
		})
	})

	describe("empty/length validation", () => {
		it("rejects empty string", () => {
			const result = _validateUuidFormat("")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_EMPTY")
			}
		})

		it("rejects too short (35 chars)", () => {
			const result = _validateUuidFormat("550e8400-e29b-41d4-a716-44665544000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects too long (37 chars)", () => {
			const result = _validateUuidFormat(
				"550e8400-e29b-41d4-a716-4466554400000",
			)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects no hyphens (32 chars)", () => {
			const result = _validateUuidFormat("550e8400e29b41d4a716446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})
	})

	describe("hyphen validation", () => {
		it("rejects underscore instead of hyphen", () => {
			const result = _validateUuidFormat("550e8400_e29b_41d4_a716_446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_MISSING_HYPHEN")
			}
		})

		it("rejects missing hyphen at position 13", () => {
			const result = _validateUuidFormat("550e8400-e29b41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				// This is 36 chars but missing hyphen at position 13
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects double hyphen", () => {
			const result = _validateUuidFormat(
				"550e8400-e29b--41d4-a716-446655440000",
			)
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				// This is 37 chars, so length check catches it first
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})
	})

	describe("character validation", () => {
		it("rejects invalid hex character 'g'", () => {
			const result = _validateUuidFormat("550e8400-e29b-41d4-a716-44665544000g")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})

		it("rejects invalid hex character 'z'", () => {
			const result = _validateUuidFormat("550e840z-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})

		it("rejects space in UUID", () => {
			const result = _validateUuidFormat("550e8400-e29b-41d4-a716-44665544 000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})
	})
})
