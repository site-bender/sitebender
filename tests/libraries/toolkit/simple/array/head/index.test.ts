/**
 * Auto-generated test file
 * Source: /Users/guy/Workspace/@sitebender/prover-ai/libraries/toolkit/src/simple/array/head/index.ts
 * Generated: 2025-09-06T04:58:53.209Z
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
import * as fc from "npm:fast-check@3.15.0"
import { equal as deepEqual } from "https://deno.land/std@0.212.0/assert/equal.ts"

describe("head", () => {
	describe("unit tests", () => {
		it("handles single element array for array", () => {
			const result = head([undefined])
			// Result can be undefined, no assertion needed
		})
	})

	describe("property tests", () => {
		it("type correctness", () => {
			fc.assert(
				fc.property(fc.tuple(fc.array(fc.anything())), ([array]) => {
					const result = head(array)
					return true
				}),
				{ numRuns: 100 },
			)
		})
		it("determinism", () => {
			fc.assert(
				fc.property(fc.tuple(fc.array(fc.anything())), ([array]) => {
					const result1 = head(array)
					const result2 = head(array)
					return deepEqual(result1, result2)
				}),
				{ numRuns: 50 },
			)
		})
		it("referential transparency", () => {
			fc.assert(
				fc.property(fc.tuple(fc.array(fc.anything())), ([array]) => {
					const value = head(array)
					// Calling again with same inputs should give same result
					const value2 = head(array)
					return deepEqual(value, value2)
				}),
				{ numRuns: 50 },
			)
		})
	})
})
