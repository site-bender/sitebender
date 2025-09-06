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
	const propertyTests = tests.filter(t => t.properties && t.properties.length > 0)
	const nonPropertyTests = tests.filter(t => !t.properties || t.properties.length === 0)
	
	const filtered = nonPropertyTests.filter(test => 
		!propertyTests.some(propTest => isEdgeCaseCoveredByProperty(test, propTest))
	)
	
	return [...propertyTests, ...filtered]
}