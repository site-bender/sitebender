/**
 * Auto-generated test file
 * Source: libraries/toolkit/src/simple/string/trim/index.ts
 * Generated: 2025-09-05T04:39:28.076Z
 * Generator: @sitebender/test-generator v1.0.0
 *
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import trim from "../../../../../../libraries/toolkit/src/simple/string/trim/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import {
	assertEquals,
	assertExists,
	assertThrows,
} from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("trim", () => {
	describe("unit tests", () => {
		it("handles unicode string for str", () => {
			const result = trim("🚀 Unicode 文字")
			assertEquals(result, "🚀 Unicode 文字")
		})
	})

	describe("property tests", () => {
		it("string type", () => {
			fc.assert(
				fc.property(fc.string(), (input) => {
					const result = trim(input)
					return typeof result === "string"
				}),
				{ numRuns: 100 },
			)
		})
	})
})
