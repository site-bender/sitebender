/**
 * Auto-generated test file
 * Source: ../../libraries/toolkit/src/simple/array/head/index.ts
 * Generated: 2025-09-05T03:29:18.624Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import head from "../../../../../../libraries/toolkit/src/simple/array/head/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"

describe("head", () => {
	describe("unit tests", () => {
		it("handles single element array for array", () => {
			const result = head([1])
			assertEquals(result, undefined)
		})
	})

	describe("edge cases", () => {
		it("handles empty array for array", () => {
			const result = head([])
			assertEquals(result, undefined)
		})
	})
})
