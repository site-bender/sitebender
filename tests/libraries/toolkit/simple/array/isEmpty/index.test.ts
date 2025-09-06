/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/array/isEmpty/index.ts
 * Generated: 2025-09-05T02:40:44.878Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import isEmpty from "../../../../../../libraries/toolkit/src/simple/array/isEmpty/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("isEmpty", () => {
	describe("unit tests", () => {
		it("handles single element array for array", () => {
			const result = isEmpty([1])(1)
			assertEquals(result, undefined)
		})
		it("covers branch: Array.isArray(array) is falsy", () => {
			const result = isEmpty(false)(1)
			assertEquals(result, undefined)
		})
		it("covers branch: Array.isArray(array) is truthy", () => {
			const result = isEmpty(true)(1)
			assertEquals(result, undefined)
		})
	})

	describe("property tests", () => {
		it("functor-identity", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(array) => {
						const result1 = isEmpty(array)
						const result2 = isEmpty(array)
						assertEquals(result1, result2)
					},
				),
			)
		})
		it("return type check", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (input) => {
					const result = isEmpty(input)
					assert(typeof result === "boolean")
				}),
				{ numRuns: 100 },
			)
		})
		it("deterministic behavior", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (input) => {
					const result1 = isEmpty(input)
					const result2 = isEmpty(input)
					assertEquals(result1, result2)
				}),
				{ numRuns: 100 },
			)
		})
	})

	describe("edge cases", () => {
		it("handles empty array for array", () => {
			const result = isEmpty([])
			assertEquals(result, false)
		})
		it("isEmpty array properties", () => {
			const result = isEmpty()
			assertEquals(result, undefined)
		})
	})
})
