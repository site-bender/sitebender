/**
 * Consolidate overlapping property tests
 */

import type { TestCase, PropertyTest } from "../../../types/index.ts"
import haveOverlappingGenerators from "./have-overlapping-generators/index.ts"
import mergeProperties from "./merge-properties/index.ts"

/**
 * Consolidate property tests with overlapping generators
 * @param tests Array of test cases
 * @returns Array with consolidated property tests
 */
export default function consolidatePropertyTests(tests: Array<TestCase>): Array<TestCase> {
	const propertyTests: Array<TestCase> = []
	const nonPropertyTests: Array<TestCase> = []
	
	// Separate property tests from others
	for (const test of tests) {
		if (test.properties && test.properties.length > 0) {
			propertyTests.push(test)
		} else {
			nonPropertyTests.push(test)
		}
	}
	
	// Group property tests by similar generators
	const consolidated: Array<TestCase> = []
	const processed = new Set<number>()
	
	for (let i = 0; i < propertyTests.length; i++) {
		if (processed.has(i)) continue
		
		const current = propertyTests[i]
		const toMerge: Array<PropertyTest> = [...(current.properties || [])]
		processed.add(i)
		
		// Find overlapping property tests
		for (let j = i + 1; j < propertyTests.length; j++) {
			if (processed.has(j)) continue
			
			const other = propertyTests[j]
			if (haveOverlappingGenerators(current, other)) {
				toMerge.push(...(other.properties || []))
				processed.add(j)
			}
		}
		
		// Create consolidated test
		consolidated.push({
			...current,
			name: `property tests: ${toMerge.map(p => p.name).join(", ")}`,
			properties: mergeProperties(toMerge),
		})
	}
	
	return [...nonPropertyTests, ...consolidated]
}