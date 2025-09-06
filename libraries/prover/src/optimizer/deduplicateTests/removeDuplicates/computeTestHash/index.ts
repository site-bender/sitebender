/**
 * Compute hash for test case deduplication
 */

import type { TestCase } from "../../../../types/index.ts"

/**
 * Compute a hash for a test case based on its input and expected output
 * @param test Test case to hash
 * @returns Hash string for comparison
 */
export default function computeTestHash(test: TestCase): string {
	const parts: Array<string> = []

	// Include input values
	parts.push(JSON.stringify(test.input))

	// Include expected output if defined
	if (test.expectedOutput !== undefined) {
		parts.push(JSON.stringify(test.expectedOutput))
	}

	// Include error expectation if defined
	if (test.expectedError) {
		parts.push(`error:${test.expectedError}`)
	}

	// Include property tests if present
	if (test.properties) {
		test.properties.forEach(prop => {
			parts.push(`prop:${prop.name}:${prop.generator}`)
		})
	}

	return parts.join("|")
}
