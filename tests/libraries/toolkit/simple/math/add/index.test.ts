/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/math/add/index.ts
 * Generated: 2025-09-05T01:42:59.483Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import add from "../../../../../../../src/simple/math/add/index"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"

describe("add", () => {
	describe("edge cases", () => {
		it("handles undefined for augend", () => {
			const result = add(undefined)
			assertEquals(result, undefined)
		})
		it("handles null for augend", () => {
			const result = add(null)
			assertEquals(result, undefined)
		})
		it('covers branch: isNullish(augend) || typeof augend !== "number"', () => {
			const result = add("number")
			assertEquals(result, undefined)
		})
		it("covers branch: isNullish(augend) is truthy", () => {
			const result = add(true)
			assertEquals(result, undefined)
		})
		it("covers branch: isNullish(augend) is falsy", () => {
			const result = add(false)
			assertEquals(result, undefined)
		})
		it('covers branch: isNullish(addend) || typeof addend !== "number"', () => {
			const result = add("number")
			assertEquals(result, undefined)
		})
		it("covers branch: isNullish(addend) is truthy", () => {
			const result = add(true)
			assertEquals(result, undefined)
		})
		it("covers branch: isNullish(addend) is falsy", () => {
			const result = add(false)
			assertEquals(result, undefined)
		})
	})
})
