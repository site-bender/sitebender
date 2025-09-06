/**
 * Auto-generated test file
 * Source: /Users/guy/Workspace/@sitebender/prover-ai/libraries/toolkit/src/simple/string/trimStart/index.ts
 * Generated: 2025-09-06T04:58:50.278Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import trimStart from "../../../../../../libraries/toolkit/src/simple/string/trimStart/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"
import { equal as deepEqual } from "https://deno.land/std@0.212.0/assert/equal.ts"

describe("trimStart", () => {
	describe("unit tests", () => {
		it("handles whitespace for str", () => {
			const result = trimStart(" ")
			assertExists(result)
		})
		it("handles unicode string for str", () => {
			const result = trimStart("🎯 Unicode 文字")
			assertExists(result)
		})
	})

	describe("property tests", () => {
		it("type correctness", () => {
			fc.assert(
				fc.property(fc.tuple(fc.string()), ([str]) => {
					const result = trimStart(str)
					return typeof result === "string"
				}),
				{ numRuns: 100 },
			)
		})
		it("determinism", () => {
			fc.assert(
				fc.property(fc.tuple(fc.string()), ([str]) => {
					const result1 = trimStart(str)
					const result2 = trimStart(str)
					return deepEqual(result1, result2)
				}),
				{ numRuns: 50 },
			)
		})
		it("string handling", () => {
			fc.assert(
				fc.property(fc.tuple(fc.string()), ([str]) => {
					const result = trimStart(str)
					return typeof result === "string"
				}),
				{ numRuns: 100 },
			)
		})
		it("referential transparency", () => {
			fc.assert(
				fc.property(fc.tuple(fc.string()), ([str]) => {
					const value = trimStart(str)
					// Calling again with same inputs should give same result
					const value2 = trimStart(str)
					return deepEqual(value, value2)
				}),
				{ numRuns: 50 },
			)
		})
	})
})
