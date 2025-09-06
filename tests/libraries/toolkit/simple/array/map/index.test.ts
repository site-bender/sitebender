/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/array/map/index.ts
 * Generated: 2025-09-05T04:38:52.872Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import map from "../../../../../../libraries/toolkit/src/simple/array/map/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("map", () => {
	describe("unit tests", () => {
		it("handles single element array", () => {
			const result = map((x) => x)([1])
			assertEquals(result, [1])
		})
	})

	describe("property tests", () => {
		it("identity law", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = map((x) => x)(arr)
					return JSON.stringify(result) === JSON.stringify(arr)
				}),
			)
		})
		it("partial application", () => {
			fc.assert(
				fc.property(
					fc.func(fc.integer()),
					fc.array(fc.integer()),
					(fn, arr) => {
						const partial = map(fn)
						const result = partial(arr)
						const direct = map(fn)(arr)
						return JSON.stringify(result) === JSON.stringify(direct)
					},
				),
			)
		})
		it("length preservation", () => {
			fc.assert(
				fc.property(
					fc.func(fc.anything()),
					fc.array(fc.anything()),
					(fn, arr) => {
						const result = map(fn)(arr)
						return result.length === arr.length
					},
				),
			)
		})
	})

	describe("edge cases", () => {
		it("handles empty array", () => {
			const result = map((x) => x)([])
			assertEquals(result, [])
		})
		it("handles null array", () => {
			const result = map((x) => x)(null)
			assertEquals(result, [])
		})
	})
})
