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
			const allBranchesMatch = Array.from(aBranches).every(branch => 
				bBranches.has(branch)
			)
			if (allBranchesMatch) return true
		}
	}
	
	// Similar names indicate similar purpose
	const nameDistance = levenshteinDistance(a.name, b.name)
	const maxLength = Math.max(a.name.length, b.name.length)
	const similarity = 1 - (nameDistance / maxLength)
	
	return similarity > 0.8
}

/**
 * Calculate Levenshtein distance between two strings using functional approach
 * Uses recursion with memoization for pure functional implementation
 */
function levenshteinDistance(a: string, b: string): number {
	// Memoization cache for recursive calls
	const cache = new Map<string, number>()
	
	const computeDistance = (i: number, j: number): number => {
		// Base cases
		if (i === 0) return j
		if (j === 0) return i
		
		// Check cache
		const key = `${i},${j}`
		const cached = cache.get(key)
		if (cached !== undefined) return cached
		
		// Compute distance
		const cost = b[i - 1] === a[j - 1] ? 0 : 1
		const result = Math.min(
			computeDistance(i - 1, j - 1) + cost,  // substitution
			computeDistance(i, j - 1) + 1,         // insertion
			computeDistance(i - 1, j) + 1          // deletion
		)
		
		// Store in cache
		cache.set(key, result)
		return result
	}
	
	return computeDistance(b.length, a.length)
}