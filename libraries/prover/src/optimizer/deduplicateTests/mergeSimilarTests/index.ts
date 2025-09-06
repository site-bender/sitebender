/**
 * Merge similar test cases that can be combined
 */

import type { TestCase } from "../../../types/index.ts"
import areSimilar from "./areSimilar/index.ts"
import mergeTestCases from "./mergeTestCases/index.ts"

/**
 * Merge similar test cases that test the same behavior
 * @param tests Array of test cases
 * @returns Array with similar tests merged
 */
export default function mergeSimilarTests(
	tests: Array<TestCase>,
): Array<TestCase> {
	const merged: Array<TestCase> = []
	const processed = new Set<number>()

	for (let i = 0; i < tests.length; i++) {
		if (processed.has(i)) continue

		const current = tests[i]
		const similar: Array<TestCase> = [current]
		processed.add(i)

		// Find all similar tests
		for (let j = i + 1; j < tests.length; j++) {
			if (processed.has(j)) continue

			if (areSimilar(current, tests[j])) {
				similar.push(tests[j])
				processed.add(j)
			}
		}

		// Merge if multiple similar tests found
		if (similar.length > 1) {
			merged.push(mergeTestCases(similar))
		} else {
			merged.push(current)
		}
	}

	return merged
}
