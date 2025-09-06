/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/math/subtract/index.ts
 * Generated: 2025-09-05T04:51:20.426Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import subtract from "../../../../../../libraries/toolkit/src/simple/math/subtract/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("subtract", () => {
	describe("unit tests", () => {
		it("handles valid numbers", () => {
			const result = subtract(5)(3)
			assertEquals(result, 2)
		})
	})

	describe("property tests", () => {
		it("partial application equivalence", () => {
			fc.assert(
				fc.property(fc.integer(), fc.integer(), (a, b) => {
					const partial = subtract(a)
					const result = partial(b)
					return typeof partial === "function" && typeof result !== "undefined"
				}),
			)
		})
		it("reusability", () => {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.array(fc.integer(), { minLength: 2, maxLength: 5 }),
					(fixedArg, values) => {
						const partial = subtract(fixedArg)
						const results = values.map((v) => partial(v))
						// Check all results are defined
						return results.every((r) => r !== undefined)
					},
				),
			)
		})
	})

	describe("edge cases", () => {
		it("handles first parameter null", () => {
			const result = subtract(null)(3)
			assertEquals(result, NaN)
		})
		it("handles second parameter null", () => {
			const result = subtract(5)(null)
			assertEquals(result, NaN)
		})
	})
})
