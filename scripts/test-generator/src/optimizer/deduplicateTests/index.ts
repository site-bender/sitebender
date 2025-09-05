/**
 * Main test deduplication orchestrator
 */

import type { TestCase } from "../../types/index.ts"
import removeDuplicates from "./removeDuplicates/index.ts"
import mergeSimilarTests from "./mergeSimilarTests/index.ts"
import consolidatePropertyTests from "./consolidatePropertyTests/index.ts"
import removeRedundantEdgeCases from "./removeRedundantEdgeCases/index.ts"
import optimizeBranchTests from "./optimizeBranchTests/index.ts"

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