/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/array/filter/index.ts
 * Generated: 2025-09-05T04:39:40.586Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import filter from "../../../../../../libraries/toolkit/src/simple/array/filter/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("filter", () => {
	describe("unit tests", () => {
		it("handles single element array", () => {
			const result = filter((x) => x)([1])
			assertEquals(result, [1])
		})
	})

	describe("property tests", () => {
		it("partial application", () => {
			fc.assert(
				fc.property(
					fc.func(fc.integer()),
					fc.array(fc.integer()),
					(fn, arr) => {
						const partial = filter(fn)
						const result = partial(arr)
						const direct = filter(fn)(arr)
						return JSON.stringify(result) === JSON.stringify(direct)
					},
				),
			)
		})
		it("subset property", () => {
			fc.assert(
				fc.property(fc.func(fc.boolean()), fc.array(fc.anything()), (input) => {
					const result = filter(pred)(arr)
					return result.every((item) => arr.includes(item)) &&
						result.length <= arr.length
				}),
			)
		})
		it("order preservation", () => {
			fc.assert(
				fc.property(fc.func(fc.boolean()), fc.array(fc.integer()), (input) => {
					const result = filter(pred)(arr)
					for (let i = 0; i < result.length - 1; i++) {
						const idx1 = arr.indexOf(result[i])
						const idx2 = arr.indexOf(result[i + 1])
						if (idx1 >= idx2) return false
					}
					return true
				}),
			)
		})
	})

	describe("edge cases", () => {
		it("handles empty array", () => {
			const result = filter((x) => x)([])
			assertEquals(result, [])
		})
		it("handles null array", () => {
			const result = filter((x) => x)(null)
			assertEquals(result, [])
		})
	})
})
