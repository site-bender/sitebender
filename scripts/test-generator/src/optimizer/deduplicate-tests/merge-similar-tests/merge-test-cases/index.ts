/**
 * Merge multiple similar test cases into one
 */

import type { TestCase } from "../../../../types/index.ts"

/**
 * Merge multiple similar test cases into a single comprehensive test
 * @param tests Array of similar test cases to merge
 * @returns Single merged test case
 */
export default function mergeTestCases(tests: Array<TestCase>): TestCase {
	// Use the most descriptive name
	const name = tests
		.map(t => t.name)
		.reduce((longest, current) => 
			current.length > longest.length ? current : longest
		)
	
	// Combine descriptions
	const descriptions = [...new Set(tests.map(t => t.description))]
	const description = descriptions.join("; ")
	
	// Merge branch coverage
	const branchCoverage = tests
		.flatMap(t => t.branchCoverage || [])
		.filter((v, i, arr) => arr.indexOf(v) === i)
	
	// Combine properties
	const properties = tests
		.flatMap(t => t.properties || [])
		.filter((prop, index, arr) => 
			arr.findIndex(p => p.name === prop.name) === index
		)
	
	// Use the first test's input/output as representative
	const base = tests[0]
	
	return {
		name,
		description,
		input: base.input,
		expectedOutput: base.expectedOutput,
		expectedError: base.expectedError,
		branchCoverage: branchCoverage.length > 0 ? branchCoverage : undefined,
		properties: properties.length > 0 ? properties : undefined,
	}
}