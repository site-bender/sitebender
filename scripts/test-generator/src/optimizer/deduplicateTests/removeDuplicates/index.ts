/**
 * Remove exact duplicate test cases
 */

import type { TestCase } from "../../../types/index.ts"
import computeTestHash from "./computeTestHash/index.ts"

/**
 * Remove exact duplicate test cases based on input/output combinations
 * @param tests Array of test cases
 * @returns Array with exact duplicates removed
 */
export default function removeDuplicates(tests: Array<TestCase>): Array<TestCase> {
	const seen = new Set<string>()
	const unique: Array<TestCase> = []
	
	for (const test of tests) {
		const hash = computeTestHash(test)
		
		if (!seen.has(hash)) {
			seen.add(hash)
			unique.push(test)
		}
	}
	
	return unique
}