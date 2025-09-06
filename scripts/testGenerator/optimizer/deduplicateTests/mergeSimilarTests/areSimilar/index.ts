/**
 * Check if two test cases are similar enough to merge
 */

import type { TestCase } from "../../../../types/index.ts"

/**
 * Determine if two test cases are similar and can be merged
 * @param a First test case
 * @param b Second test case
 * @returns True if tests are similar enough to merge
 */
export default function areSimilar(a: TestCase, b: TestCase): boolean {
	// Same type of test (both property or both unit)
	if ((a.properties && !b.properties) || (!a.properties && b.properties)) {
		return false
	}
	
	// Both testing errors
	if (a.expectedError && b.expectedError) {
		return a.expectedError === b.expectedError
	}
	
	// Both testing same branch coverage
	if (a.branchCoverage && b.branchCoverage) {
		const aBranches = new Set(a.branchCoverage)
		const bBranches = new Set(b.branchCoverage)
		
		// Check if they cover the same branches
		if (aBranches.size === bBranches.size) {
			for (const branch of aBranches) {
				if (!bBranches.has(branch)) return false
			}
			return true
		}
	}
	
	// Similar names indicate similar purpose
	const nameDistance = levenshteinDistance(a.name, b.name)
	const maxLength = Math.max(a.name.length, b.name.length)
	const similarity = 1 - (nameDistance / maxLength)
	
	return similarity > 0.8
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
	const matrix: Array<Array<number>> = []
	
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i]
	}
	
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j
	}
	
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b[i - 1] === a[j - 1]) {
				matrix[i][j] = matrix[i - 1][j - 1]
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j] + 1
				)
			}
		}
	}
	
	return matrix[b.length][a.length]
}