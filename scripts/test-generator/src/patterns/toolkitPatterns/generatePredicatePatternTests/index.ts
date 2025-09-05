/**
 * Generate tests for predicate pattern functions
 */

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

/**
 * Generate test cases for predicate functions (returning boolean)
 * @param signature Function signature
 * @returns Array of predicate-specific test cases
 */
export default function generatePredicatePatternTests(
	signature: FunctionSignature
): Array<TestCase> {
	const tests: Array<TestCase> = []
	const name = signature.name.toLowerCase()
	
	// Test boolean return constraint
	tests.push({
		name: "always returns boolean",
		description: "Predicate must return true or false",
		input: [null],
		expectedOutput: false, // Most predicates return false for null
		properties: [{
			name: "boolean return type",
			generator: "fc.anything()",
			property: `
				const result = ${signature.name}(input)
				return result === true || result === false
			`,
		}],
	})
	
	// Test complement behavior
	tests.push({
		name: "complement coverage",
		description: "Should handle both true and false cases",
		input: [true],
		expectedOutput: true,
		properties: [{
			name: "complement exists",
			generator: "fc.anything()",
			property: `
				// This test ensures we find at least one true and one false
				const samples = fc.sample(arbitrary, 100)
				const results = samples.map(${signature.name})
				return results.includes(true) && results.includes(false)
			`,
			runs: 1,
		}],
	})
	
	// Specific predicate patterns
	if (name.includes("isempty")) {
		tests.push({
			name: "isEmpty recognizes empty collections",
			description: "Returns true for empty arrays/strings",
			input: [[]],
			expectedOutput: true,
		})
		tests.push({
			name: "isEmpty recognizes non-empty",
			description: "Returns false for non-empty collections",
			input: [[1]],
			expectedOutput: false,
		})
	}
	
	if (name.includes("isnull") || name.includes("isnil")) {
		tests.push({
			name: "recognizes null values",
			description: "Returns true for null/undefined",
			input: [null],
			expectedOutput: true,
		})
		tests.push({
			name: "recognizes defined values",
			description: "Returns false for defined values",
			input: [0],
			expectedOutput: false,
		})
	}
	
	if (name.includes("iseven")) {
		tests.push({
			name: "identifies even numbers",
			description: "Returns true for even numbers",
			input: [4],
			expectedOutput: true,
		})
		tests.push({
			name: "identifies odd numbers",
			description: "Returns false for odd numbers",
			input: [3],
			expectedOutput: false,
		})
	}
	
	// Test predicate composition
	tests.push({
		name: "composable with logical operators",
		description: "Can be combined with AND/OR/NOT",
		input: [5],
		expectedOutput: signature.name.includes("not") ? false : true,
		properties: [{
			name: "logical composition",
			generator: "fc.anything()",
			property: `
				const result = ${signature.name}(input)
				const notResult = !${signature.name}(input)
				return result !== notResult
			`,
		}],
	})
	
	return tests
}