/**
 * Find minimal set of tests covering all branches
 */

import type { TestCase } from "../../../../types/index.ts"

/**
 * Find the minimal set of tests that cover all branches
 * Uses a greedy set cover algorithm
 * @param tests Array of tests with branch coverage
 * @returns Minimal set of tests covering all branches
 */
export default function findMinimalBranchSet(tests: Array<TestCase>): Array<TestCase> {
	// Collect all unique branches
	const allBranches = new Set<string>()
	for (const test of tests) {
		if (test.branchCoverage) {
			for (const branch of test.branchCoverage) {
				allBranches.add(branch)
			}
		}
	}
	
	// Greedy set cover algorithm
	const minimalSet: Array<TestCase> = []
	const coveredBranches = new Set<string>()
	
	while (coveredBranches.size < allBranches.size) {
		let bestTest: TestCase | null = null
		let bestNewCoverage = 0
		
		// Find test that covers the most uncovered branches
		for (const test of tests) {
			if (!test.branchCoverage) continue
			
			let newCoverage = 0
			for (const branch of test.branchCoverage) {
				if (!coveredBranches.has(branch)) {
					newCoverage++
				}
			}
			
			if (newCoverage > bestNewCoverage) {
				bestTest = test
				bestNewCoverage = newCoverage
			}
		}
		
		// Add best test to minimal set
		if (bestTest && bestTest.branchCoverage) {
			minimalSet.push(bestTest)
			for (const branch of bestTest.branchCoverage) {
				coveredBranches.add(branch)
			}
			// Remove from candidate pool
			const index = tests.indexOf(bestTest)
			if (index > -1) {
				tests.splice(index, 1)
			}
		} else {
			break // No more tests can improve coverage
		}
	}
	
	return minimalSet
}