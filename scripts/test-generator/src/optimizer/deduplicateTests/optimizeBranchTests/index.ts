/**
 * Optimize branch coverage tests
 */

import type { TestCase } from "../../../types/index.ts"
import findMinimalBranchSet from "./findMinimalBranchSet/index.ts"

/**
 * Optimize branch coverage tests to find minimal set covering all branches
 * @param tests Array of test cases
 * @returns Optimized array with minimal branch coverage
 */
export default function optimizeBranchTests(tests: Array<TestCase>): Array<TestCase> {
	// Separate tests with branch coverage from others
	const branchTests = tests.filter(t => t.branchCoverage && t.branchCoverage.length > 0)
	const nonBranchTests = tests.filter(t => !t.branchCoverage || t.branchCoverage.length === 0)
	
	if (branchTests.length === 0) {
		return tests
	}
	
	// Find minimal set of tests that cover all branches
	const minimalSet = findMinimalBranchSet(branchTests)
	
	return [...nonBranchTests, ...minimalSet]
}