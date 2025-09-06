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
export default function deduplicateTests(
	tests: Array<TestCase>,
): Array<TestCase> {
	return optimizeBranchTests(
		removeRedundantEdgeCases(
			consolidatePropertyTests(
				mergeSimilarTests(
					removeDuplicates(tests),
				),
			),
		),
	)
}
