import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import unsafeUuid from "./index.ts"

describe("unsafeUuid", () => {
	it("brands a valid UUID string", () => {
		const result = unsafeUuid("550e8400-e29b-41d4-a716-446655440000")
		assertEquals(result, "550e8400-e29b-41d4-a716-446655440000")
	})

	it("brands without validation (invalid UUID)", () => {
		const result = unsafeUuid("not-a-uuid")
		assertEquals(result, "not-a-uuid")
	})

	it("brands empty string", () => {
		const result = unsafeUuid("")
		assertEquals(result, "")
	})

	it("brands uppercase UUID", () => {
		const result = unsafeUuid("550E8400-E29B-41D4-A716-446655440000")
		assertEquals(result, "550E8400-E29B-41D4-A716-446655440000")
	})

	it("brands nil UUID", () => {
		const result = unsafeUuid("00000000-0000-0000-0000-000000000000")
		assertEquals(result, "00000000-0000-0000-0000-000000000000")
	})
})
