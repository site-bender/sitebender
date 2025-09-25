import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"

import calculateCyclomaticComplexity from "./index.ts"

type FunctionMetadata = {
	hasThrowStatements: boolean
	hasAwaitExpressions: boolean
	hasGlobalAccess: boolean
	cyclomaticComplexity: number
	hasReturnStatements: boolean
}

describe("calculateCyclomaticComplexity", () => {
	describe("using pre-calculated Arborist metadata", () => {
		it("should return the pre-calculated complexity from metadata", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 1,
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 1)
		})

		it("should return complexity for function with conditional logic", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 3, // if statement + two branches
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 3)
		})

		it("should return complexity for async function with error handling", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: true,
				hasAwaitExpressions: true,
				hasGlobalAccess: true,
				cyclomaticComplexity: 3, // if + try/catch
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 3)
		})

		it("should return complexity for function with loops", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 4, // for loop + while loop + if condition
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 4)
		})

		it("should return complexity for generator function", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 2, // while loop
				hasReturnStatements: false, // generators use yield
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 2)
		})

		it("should return complexity for complex function with multiple branches", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: true,
				hasAwaitExpressions: true,
				hasGlobalAccess: false,
				cyclomaticComplexity: 6, // multiple if/else, loops, try/catch
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 6)
		})

		it("should return zero complexity if metadata specifies it", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 0, // Edge case - empty or malformed function
				hasReturnStatements: false,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 0)
		})

		it("should handle high complexity functions", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: true,
				hasAwaitExpressions: true,
				hasGlobalAccess: true,
				cyclomaticComplexity: 15, // Very complex function
				hasReturnStatements: true,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 15)
		})

		it("should work with minimal metadata object", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: false,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 1,
				hasReturnStatements: false,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 1)
		})

		it("should handle function with only throws", () => {
			const metadata: FunctionMetadata = {
				hasThrowStatements: true,
				hasAwaitExpressions: false,
				hasGlobalAccess: false,
				cyclomaticComplexity: 1, // Just throw, no branching
				hasReturnStatements: false,
			}
			const result = calculateCyclomaticComplexity(metadata)
			assertEquals(result, 1)
		})
	})
})
