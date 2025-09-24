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
	signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []
	const functionName = signature.name

	// For map-like functions (mapper function first, then array)
	if (
		functionName === "map" || functionName === "filter" ||
		functionName === "reduce"
	) {
		// Simple identity law test for map
		if (functionName === "map") {
			tests.push({
				name: "identity law",
				description: "map(id) === id",
				input: [],
				expectedOutput: undefined,
				properties: [{
					name: "identity law",
					generator: "fc.array(fc.anything())",
					property: `(arr) => {
						const result = ${functionName}((x) => x)(arr)
						return JSON.stringify(result) === JSON.stringify(arr)
					}`,
				}],
			})
		}

		// Partial application test
		tests.push({
			name: "partial application",
			description: "Can apply function first, then array",
			input: [],
			expectedOutput: undefined,
			properties: [{
				name: "partial application",
				generator: "fc.func(fc.integer()), fc.array(fc.integer())",
				property: `(fn, arr) => {
					const partial = ${functionName}(fn)
					const result = partial(arr)
					const direct = ${functionName}(fn)(arr)
					return JSON.stringify(result) === JSON.stringify(direct)
				}`,
			}],
		})
	} // For triple curry (check more specific condition first)
	else if (
		signature.parameters.length === 1 &&
		signature.returnType?.raw.includes("=>") &&
		signature.returnType?.raw.split("=>").length > 2
	) {
		tests.push({
			name: "triple curry",
			description: "Three-parameter curry works correctly",
			input: [],
			expectedOutput: undefined,
			properties: [{
				name: "triple curry",
				generator: "fc.integer(), fc.integer(), fc.integer()",
				property: `(a, b, c) => {
					const step1 = ${functionName}(a)
					const step2 = step1(b)
					const result = step2(c)
					return typeof step1 === 'function' &&
					       typeof step2 === 'function' &&
					       result !== undefined
				}`,
			}],
		})
	} // For binary curry (general case)
	// Skip compose and pipe since they take arrays of functions, not simple values
	else if (
		signature.parameters.length === 1 &&
		signature.returnType?.raw.includes("=>") &&
		!functionName.toLowerCase().includes("compose") &&
		!functionName.toLowerCase().includes("pipe")
	) {
		tests.push({
			name: "binary curry",
			description: "Two-parameter curry works correctly",
			input: [],
			expectedOutput: undefined,
			properties: [{
				name: "binary curry",
				generator: "fc.integer(), fc.integer()",
				property: `(a, b) => {
					const partial = ${functionName}(a)
					const result = partial(b)
					return typeof partial === 'function' &&
					       result !== undefined
				}`,
			}],
		})
	}

	return tests
}
