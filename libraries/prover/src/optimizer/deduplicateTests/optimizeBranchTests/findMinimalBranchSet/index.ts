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
export default function findMinimalBranchSet(
	tests: Array<TestCase>,
): Array<TestCase> {
	// Collect all unique branches
	const allBranches = tests.reduce((acc, test) => {
		if (test.branchCoverage) {
			return new Set([...acc, ...test.branchCoverage])
		}
		return acc
	}, new Set<string>())

	// Greedy set cover algorithm using recursion
	const findMinimalSetRecursive = (
		remainingTests: Array<TestCase>,
		coveredSoFar: Set<string>,
		selectedTests: Array<TestCase>,
	): Array<TestCase> => {
		if (
			coveredSoFar.size >= allBranches.size || remainingTests.length === 0
		) {
			return selectedTests
		}

		// Find test that covers the most uncovered branches
		const testWithCoverage = remainingTests.map((test) => {
			const newBranches = test.branchCoverage
				? test.branchCoverage.filter((branch) =>
					!coveredSoFar.has(branch)
				)
				: []
			return { test, newCoverageCount: newBranches.length, newBranches }
		})

		const best = testWithCoverage.reduce(
			(acc, curr) =>
				curr.newCoverageCount > acc.newCoverageCount ? curr : acc,
			{
				test: null as TestCase | null,
				newCoverageCount: 0,
				newBranches: [] as string[],
			},
		)

		if (best.test && best.newCoverageCount > 0) {
			const newCovered = new Set([...coveredSoFar, ...best.newBranches])
			const newRemaining = remainingTests.filter((t) => t !== best.test)
			const newSelected = [...selectedTests, best.test]
			return findMinimalSetRecursive(
				newRemaining,
				newCovered,
				newSelected,
			)
		}

		return selectedTests
	}

	return findMinimalSetRecursive(tests, new Set<string>(), [])
}
