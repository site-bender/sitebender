/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/string/chomp/index.ts
 * Generated: 2025-09-05T04:51:04.671Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import chomp from "../../../../../../libraries/toolkit/src/simple/string/chomp/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("chomp", () => {
	describe("property tests", () => {
		it("string type", () => {
			fc.assert(
				fc.property(fc.string(), (input) => {
					const result = chomp(input)
					return typeof result === "string"
				}),
				{ numRuns: 100 },
			)
		})
	})

	describe("edge cases", () => {
		it("handles undefined for str", () => {
			const result = chomp(undefined)
			assertEquals(result, "")
		})
	})
})
