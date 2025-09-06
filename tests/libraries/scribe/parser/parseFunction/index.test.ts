/**
 * Auto-generated test file
 * Source: /Users/guy/Workspace/@sitebender/scribe-ai/libraries/scribe/src/parser/parseFunction/index.ts
 * Generated: 2025-09-06T02:28:59.387Z
 * Generator: @sitebender/test-generator v1.0.0
 * 
 * DO NOT EDIT MANUALLY
 * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts
 */
import parseFunction from "../../../../../libraries/scribe/src/parser/parseFunction/index.ts"
import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"
import { assertEquals, assertThrows, assertExists } from "https://deno.land/std@0.212.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.0"

describe("parseFunction", () => {

	describe("unit tests", () => {
		it("handles unicode string for source", () => {
			const result = parseFunction("🚀 Unicode 文字")
			assertEquals(result, undefined)
		})
		it("Ok wraps success", () => {
			const result = parseFunction(42)
			assertEquals(result, { tag: "Ok", value: 42 })
		})
		it("Err wraps failure", () => {
			const result = parseFunction({  })
			assertEquals(result, { tag: "Err", error: "failed" })
		})
		it("covers branch: node.kind !== \"FunctionDeclaration\" && node.kind !== \"ArrowFunction\"", () => {
			const result = parseFunction(true)
			assertEquals(result, undefined)
		})
		it("covers branch: !(node.kind !== \"FunctionDeclaration\" && node.kind !== \"ArrowFunction\")", () => {
			const result = parseFunction(false)
			assertEquals(result, undefined)
		})
		it("covers branch: generics: generics.length > 0", () => {
			const result = parseFunction(1)
			assertEquals(result, undefined)
		})
		it("covers branch: no error", () => {
			const result = parseFunction(0)
			assertEquals(result, undefined)
		})
		it("covers branch: error thrown", () => {
			const result = parseFunction(null)
			assertEquals(result, undefined)
		})
	})

	describe("property tests", () => {
		it("error propagation", () => {
			fc.assert(
				fc.property(fc.anything(), fc.func(fc.anything()), (input) => {
					
										const err = Result.Err(error)
										const chained = err.chain(f)
										return err.equals(chained)
									
				})
			)
		})
	})

	describe("edge cases", () => {
		it("handles empty string for source", () => {
			const result = parseFunction("")
			assertEquals(result, undefined)
		})
	})

})