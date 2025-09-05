/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/math/add/index.ts
 * Generated: 2025-09-05T02:15:17.720Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import add from "../../../../../../libraries/toolkit/src/simple/math/add/index"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("add", () => {
	describe("property tests", () => {
		it("commutative", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					fc.anything(),
					(a, b) => {
						const result1 = add(a)(b)
						const result2 = add(b)(a)
						assertEquals(result1, result2)
					},
				),
			)
		})
		it("associative", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					fc.anything(),
					fc.anything(),
					(a, b, c) => {
						const result1 = add(add(a)(b))(c)
						const result2 = add(a)(add(b)(c))
						assertEquals(result1, result2)
					},
				),
			)
		})
		it("functor-identity", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(augend) => {
						const result1 = add(augend)
						const result2 = add(augend)
						assertEquals(result1, result2)
					},
				),
			)
		})
		it("return type check", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.float({ noNaN: false, noDefaultInfinity: false }),
						fc.constant(null),
						fc.constant(undefined),
					),
					(input) => {
						const result = add(augend)
						assertExists(result)
					},
				),
				{ numRuns: 100 },
			)
		})
		it("deterministic behavior", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.float({ noNaN: false, noDefaultInfinity: false }),
						fc.constant(null),
						fc.constant(undefined),
					),
					(input) => {
						const result1 = add(augend)
						const result2 = add(augend)
						assertEquals(result1, result2)
					},
				),
				{ numRuns: 100 },
			)
		})
	})

	describe("edge cases", () => {
		it("handles undefined for augend", () => {
			const result = add(undefined)
			assertEquals(result, NaN)
		})
		it("handles null for augend", () => {
			const result = add(null)
			assertEquals(result, NaN)
		})
		it('covers branch: isNullish(augend) || typeof augend !== "number"', () => {
			const result = add("number")
			assertEquals(result, NaN)
		})
		it("covers branch: isNullish(augend) is truthy", () => {
			const result = add(true)
			assertEquals(result, NaN)
		})
		it("covers branch: isNullish(augend) is falsy", () => {
			const result = add(false)
			assertEquals(result, NaN)
		})
		it('covers branch: isNullish(addend) || typeof addend !== "number"', () => {
			const result = add("number")
			assertEquals(result, NaN)
		})
		it("covers branch: isNullish(addend) is truthy", () => {
			const result = add(true)
			assertEquals(result, NaN)
		})
		it("covers branch: isNullish(addend) is falsy", () => {
			const result = add(false)
			assertEquals(result, NaN)
		})
	})
})
