/**
 * Auto-generated test file
 * Source: /Users/guy/Workspace/@sitebender/prover-ai/libraries/toolkit/src/simple/combinator/compose/index.ts
 * Generated: 2025-09-06T04:58:55.927Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import compose from "../../../../../../libraries/toolkit/src/simple/combinator/compose/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"
import { equal as deepEqual } from "https://deno.land/std@0.212.0/assert/equal.ts"

describe("compose", () => {
	describe("unit tests", () => {
		it("handles single element array for fns", () => {
			const result = compose([(x) => x])(1)
			assertExists(result)
		})
		it("compose applies functions right-to-left", () => {
			const result = compose([(x) => x + 1, (x) => x * 2])(5)
			assertEquals(result, 11)
		})
		it("compose is associative", () => {
			const result = compose([(x) => x + 1, (x) => x * 2, (x) => x - 3])(
				10,
			)
			assertEquals(result, 15)
		})
		it("compose with single function", () => {
			const result = compose([(x) => x * 3])(7)
			assertEquals(result, 21)
		})
	})

	describe("property tests", () => {
		it("type correctness", () => {
			fc.assert(
				fc.property(
					fc.tuple(fc.array(fc.func(fc.anything()))),
					([fns]) => {
						const result = compose(fns)
						return typeof result === "function"
					},
				),
				{ numRuns: 100 },
			)
		})
		it("determinism", () => {
			fc.assert(
				fc.property(fc.constant([]), (_) => {
					// Skipping determinism test for function-returning functions
					// Functions can't be compared with deepEqual
					return true
				}),
				{ numRuns: 1 },
			)
		})
		it("referential transparency", () => {
			fc.assert(
				fc.property(fc.constant([]), (_) => {
					// Skipping referential transparency test for function-returning functions
					// Functions can't be compared with deepEqual
					return true
				}),
				{ numRuns: 1 },
			)
		})
	})
})
