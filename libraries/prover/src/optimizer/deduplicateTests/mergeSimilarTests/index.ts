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
export default function mergeSimilarTests(tests: Array<TestCase>): Array<TestCase> {
	return tests.reduce((acc: Array<{ test: TestCase, merged: boolean }>, current, i) => {
		// Skip if already merged with a previous test
		if (acc.some(item => item.merged && item.test === current)) {
			return acc
		}

		// Find all similar tests starting from current index
		const similarTests = tests
			.slice(i + 1)
			.filter(test => !acc.some(item => item.merged && item.test === test))
			.filter(test => areSimilar(current, test))

		// If we found similar tests, merge them
		if (similarTests.length > 0) {
			const allSimilar = [current, ...similarTests]
			const merged = mergeTestCases(allSimilar)

			// Mark all similar tests as merged
			similarTests.forEach(test => {
				const index = acc.findIndex(item => item.test === test)
				if (index === -1) {
					acc.push({ test, merged: true })
				}
			})

			return [...acc, { test: merged, merged: false }]
		}

		// No similar tests found, keep original
		return [...acc, { test: current, merged: false }]
	}, [])
	.filter(item => !item.merged)
	.map(item => item.test)
}
