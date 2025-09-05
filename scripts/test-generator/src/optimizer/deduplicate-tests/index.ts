/**
 * Main test deduplication orchestrator
 */

import type { TestCase } from "../../types/index.ts"
import removeDuplicates from "./remove-duplicates/index.ts"
import mergeSimilarTests from "./merge-similar-tests/index.ts"
import consolidatePropertyTests from "./consolidate-property-tests/index.ts"
import removeRedundantEdgeCases from "./remove-redundant-edge-cases/index.ts"
import optimizeBranchTests from "./optimize-branch-tests/index.ts"

/**
 * Deduplicate and optimize test cases
 * @param tests Array of test cases to deduplicate
 * @returns Optimized array with duplicates removed and similar tests merged
 */
export default function deduplicateTests(tests: Array<TestCase>): Array<TestCase> {
	// Step 1: Remove exact duplicates
	let optimized = removeDuplicates(tests)
	
	// Step 2: Merge similar tests that can be combined
	optimized = mergeSimilarTests(optimized)
	
	// Step 3: Consolidate property tests with overlapping generators
	optimized = consolidatePropertyTests(optimized)
	
	// Step 4: Remove redundant edge cases covered by property tests
	optimized = removeRedundantEdgeCases(optimized)
	
	// Step 5: Optimize branch coverage tests
	optimized = optimizeBranchTests(optimized)
	
	return optimized
}