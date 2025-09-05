/**
 * Generate tests for curried pattern functions
 */

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

/**
 * Generate test cases for curried functions
 * @param signature Function signature
 * @returns Array of curry-specific test cases
 */
export default function generateCurriedPatternTests(
	signature: FunctionSignature
): Array<TestCase> {
	const tests: Array<TestCase> = []
	
	// Test partial application
	tests.push({
		name: "supports partial application",
		description: "Can apply arguments one at a time",
		input: [5, 3],
		expectedOutput: 8, // assuming add function
		properties: [{
			name: "partial application equivalence",
			generator: "fc.integer(), fc.integer()",
			property: `
				const partial = curried(a)
				const full = curried(a)(b)
				const direct = uncurried(a, b)
				return partial(b) === full && full === direct
			`,
		}],
	})
	
	// Test argument order preservation
	tests.push({
		name: "preserves argument order",
		description: "Arguments are applied in correct order",
		input: [10, 3],
		expectedOutput: 7, // assuming subtract: 10 - 3
		properties: [{
			name: "argument order",
			generator: "fc.integer(), fc.integer()",
			property: `
				const result1 = curried(a)(b)
				const result2 = curried(a, b)
				const expected = operation(a, b)
				return result1 === expected && result2 === expected
			`,
		}],
	})
	
	// Test reusability
	tests.push({
		name: "partially applied functions are reusable",
		description: "Can reuse partially applied function",
		input: [5],
		expectedOutput: undefined, // returns a function
		properties: [{
			name: "reusability",
			generator: "fc.integer(), fc.array(fc.integer(), { minLength: 2 })",
			property: `
				const partial = curried(fixedArg)
				const results = values.map(v => partial(v))
				const expected = values.map(v => operation(fixedArg, v))
				return JSON.stringify(results) === JSON.stringify(expected)
			`,
		}],
	})
	
	// Test with different arities
	if (signature.parameters.length === 3) {
		tests.push({
			name: "handles triple curry",
			description: "Three-parameter curry works correctly",
			input: [1, 2, 3],
			expectedOutput: 6, // assuming (a, b, c) => a + b + c
			properties: [{
				name: "triple curry",
				generator: "fc.integer(), fc.integer(), fc.integer()",
				property: `
					const r1 = curried(a)(b)(c)
					const r2 = curried(a, b)(c)
					const r3 = curried(a)(b, c)
					const r4 = curried(a, b, c)
					const expected = operation(a, b, c)
					return r1 === expected && r2 === expected && 
					       r3 === expected && r4 === expected
				`,
			}],
		})
	}
	
	return tests
}