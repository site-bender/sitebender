import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import uuid from "./index.ts"
import unwrapUuid from "./unwrapUuid/index.ts"

describe("uuid", () => {
	describe("valid UUIDs (should pass and normalize)", () => {
		it("accepts standard v4 UUID", () => {
			const result = uuid("550e8400-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"550e8400-e29b-41d4-a716-446655440000",
				)
			}
		})

		it("normalizes uppercase to lowercase", () => {
			const result = uuid("550E8400-E29B-41D4-A716-446655440000")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"550e8400-e29b-41d4-a716-446655440000",
				)
			}
		})

		it("normalizes mixed case to lowercase", () => {
			const result = uuid("550e8400-E29B-41d4-A716-446655440000")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"550e8400-e29b-41d4-a716-446655440000",
				)
			}
		})

		it("accepts nil UUID (all zeros)", () => {
			const result = uuid("00000000-0000-0000-0000-000000000000")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"00000000-0000-0000-0000-000000000000",
				)
			}
		})

		it("accepts all f's (lowercase)", () => {
			const result = uuid("ffffffff-ffff-ffff-ffff-ffffffffffff")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"ffffffff-ffff-ffff-ffff-ffffffffffff",
				)
			}
		})

		it("normalizes all F's to lowercase", () => {
			const result = uuid("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"ffffffff-ffff-ffff-ffff-ffffffffffff",
				)
			}
		})

		it("accepts v1 timestamp-based UUID", () => {
			const result = uuid("6ba7b810-9dad-11d1-80b4-00c04fd430c8")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"6ba7b810-9dad-11d1-80b4-00c04fd430c8",
				)
			}
		})

		it("accepts v5 name-based UUID", () => {
			const result = uuid("886313e1-3b8a-5372-9b90-0c9aee199e5d")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"886313e1-3b8a-5372-9b90-0c9aee199e5d",
				)
			}
		})

		it("accepts numeric-only UUID", () => {
			const result = uuid("12345678-1234-5678-1234-567812345678")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"12345678-1234-5678-1234-567812345678",
				)
			}
		})

		it("accepts and normalizes mix of letters and numbers", () => {
			const result = uuid("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					unwrapUuid(result.value),
					"a1b2c3d4-e5f6-7890-abcd-ef1234567890",
				)
			}
		})
	})

	describe("invalid UUIDs (should fail)", () => {
		it("rejects empty string", () => {
			const result = uuid("")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_EMPTY")
			}
		})

		it("rejects too short (35 chars)", () => {
			const result = uuid("550e8400-e29b-41d4-a716-44665544000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects too long (37 chars)", () => {
			const result = uuid("550e8400-e29b-41d4-a716-4466554400000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects no hyphens (32 chars)", () => {
			const result = uuid("550e8400e29b41d4a716446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects underscores instead of hyphens", () => {
			const result = uuid("550e8400_e29b_41d4_a716_446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_MISSING_HYPHEN")
			}
		})

		it("rejects invalid hex character 'g'", () => {
			const result = uuid("550e8400-e29b-41d4-a716-44665544000g")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})

		it("rejects invalid hex character 'z'", () => {
			const result = uuid("550e840z-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})

		it("rejects space in UUID", () => {
			const result = uuid("550e8400-e29b-41d4-a716-44665544 000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_CHARACTER")
			}
		})

		it("rejects missing hyphen at position 13", () => {
			const result = uuid("550e8400-e29b41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				// This is 35 chars, so length check catches it
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects double hyphen", () => {
			const result = uuid("550e8400-e29b--41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				// This is 37 chars, so length check catches it first
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects incomplete UUID", () => {
			const result = uuid("550e8400-e29b-41d4-a716")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects UUID with braces (Microsoft format)", () => {
			const result = uuid("{550e8400-e29b-41d4-a716-446655440000}")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects UUID with urn prefix", () => {
			const result = uuid("urn:uuid:550e8400-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects wrong segment lengths (9-3-4-4-12)", () => {
			const result = uuid("550e84000-e29-41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				// This is 37 chars and hyphen 5 is at wrong position
				assertEquals(result.error.code, "UUID_MISSING_HYPHEN")
			}
		})

		it("rejects special characters", () => {
			const result = uuid("550e8400-e29b-41d4-a716-446655440000!")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects leading whitespace", () => {
			const result = uuid(" 550e8400-e29b-41d4-a716-446655440000")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})

		it("rejects trailing whitespace", () => {
			const result = uuid("550e8400-e29b-41d4-a716-446655440000 ")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "UUID_INVALID_LENGTH")
			}
		})
	})
})
