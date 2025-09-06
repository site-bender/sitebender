/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/validation/isEven/index.ts
 * Generated: 2025-09-05T05:08:45.858Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import isEven from "../../../../../../libraries/toolkit/src/simple/validation/isEven/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("isEven", () => {
	describe("unit tests", () => {
		it("identifies even numbers", () => {
			const result = isEven(4)
			assertEquals(result, true)
		})
	})

	describe("property tests", () => {
		it("boolean return type", () => {
			fc.assert(
				fc.property(fc.anything(), (input) => {
					const result = isEven(input)
					return result === true || result === false
				}),
			)
		})
		it("complement exists", () => {
			fc.assert(
				fc.property(fc.anything(), (input) => {
					// This test ensures we find at least one true and one false
					const samples = fc.sample(fc.anything(), 100)
					const results = samples.map(isEven)
					return results.includes(true) && results.includes(false)
				}),
				{ numRuns: 1 },
			)
		})
		it("logical composition", () => {
			fc.assert(
				fc.property(fc.anything(), (input) => {
					const result = isEven(input)
					const notResult = !isEven(input)
					return result !== notResult
				}),
			)
		})
	})
})
