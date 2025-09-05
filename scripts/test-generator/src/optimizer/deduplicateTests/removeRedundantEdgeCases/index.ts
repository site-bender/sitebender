/**
 * Remove edge cases that are covered by property tests
 */

import type { TestCase } from "../../../types/index.ts"
import isEdgeCaseCoveredByProperty from "./isEdgeCaseCoveredByProperty/index.ts"

/**
 * Remove edge case tests that are already covered by property tests
 * @param tests Array of test cases
 * @returns Array with redundant edge cases removed
 */
export default function removeRedundantEdgeCases(tests: Array<TestCase>): Array<TestCase> {
	// Separate property tests and edge cases
	const propertyTests = tests.filter(t => t.properties && t.properties.length > 0)
	const nonPropertyTests = tests.filter(t => !t.properties || t.properties.length === 0)
	
	// Filter out edge cases covered by property tests
	const filtered: Array<TestCase> = []
	
	for (const test of nonPropertyTests) {
		let isCovered = false
		
		for (const propTest of propertyTests) {
			if (isEdgeCaseCoveredByProperty(test, propTest)) {
				isCovered = true
				break
			}
		}
		
		if (!isCovered) {
			filtered.push(test)
		}
	}
	
	// Keep all property tests and non-redundant edge cases
	return [...propertyTests, ...filtered]
}