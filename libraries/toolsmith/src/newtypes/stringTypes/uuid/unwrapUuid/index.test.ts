import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"

import unsafeUuid from "@sitebender/toolsmith/newtypes/stringTypes/uuid/unsafeUuid/index.ts"
import unwrapUuid from "./index.ts"

describe("unwrapUuid", () => {
	it("unwraps branded UUID to string", () => {
		const branded = unsafeUuid("550e8400-e29b-41d4-a716-446655440000")
		const result = unwrapUuid(branded)
		assertEquals(result, "550e8400-e29b-41d4-a716-446655440000")
	})

	it("unwraps uppercase UUID", () => {
		const branded = unsafeUuid("550E8400-E29B-41D4-A716-446655440000")
		const result = unwrapUuid(branded)
		assertEquals(result, "550E8400-E29B-41D4-A716-446655440000")
	})

	it("unwraps nil UUID", () => {
		const branded = unsafeUuid("00000000-0000-0000-0000-000000000000")
		const result = unwrapUuid(branded)
		assertEquals(result, "00000000-0000-0000-0000-000000000000")
	})
})
