/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/object/keys/index.ts
 * Generated: 2025-09-05T04:55:40.923Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import keys from "../../../../../../libraries/toolkit/src/simple/object/keys/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("keys", () => {
	describe("unit tests", () => {
		it("handles regular object", () => {
			const result = keys({ a: 1, b: 2 })
			assertEquals(result, ["a", "b"])
		})
		it("handles string input", () => {
			const result = keys("abc")
			assertEquals(result, ["0", "1", "2"])
		})
		it("handles number input", () => {
			const result = keys(42)
			assertEquals(result, [])
		})
	})

	describe("property tests", () => {
		it("length preservation", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (input) => {
					const result = keys(input)
					return Array.isArray(result)
				}),
				{ numRuns: 100 },
			)
		})
	})

	describe("edge cases", () => {
		it("handles empty object", () => {
			const result = keys({})
			assertEquals(result, [])
		})
	})
})
