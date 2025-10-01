//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { TestCase } from "../../types/index.ts"

import consolidatePropertyTests from "./consolidatePropertyTests/index.ts"
import mergeSimilarTests from "./mergeSimilarTests/index.ts"
import optimizeBranchTests from "./optimizeBranchTests/index.ts"
import removeDuplicates from "./removeDuplicates/index.ts"
import removeRedundantEdgeCases from "./removeRedundantEdgeCases/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
