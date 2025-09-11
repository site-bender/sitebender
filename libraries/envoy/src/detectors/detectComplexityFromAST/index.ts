import type { TraversalMetadata } from "../../types/index.ts"
import type { Complexity } from "./types/index.ts"

import calculateCyclomaticComplexity from "./calculateCyclomaticComplexity/index.ts"

//++ Detects the complexity of a function by analyzing its AST
//++ [PRO] Provides a simple complexity metric based on control flow
//++ [CON] Doesn't account for algorithmic complexity (Big O)
export default function detectComplexityFromAST(
	metadata: TraversalMetadata,
): Complexity {
	const cyclomaticComplexity = calculateCyclomaticComplexity(metadata)

	// Map cyclomatic complexity to Big O notation (heuristic mapping)
	// Note: This is a rough approximation based on cyclomatic complexity
	if (cyclomaticComplexity <= 1) {
		return "O(1)"
	} else if (cyclomaticComplexity <= 3) {
		return "O(log n)"
	} else if (cyclomaticComplexity <= 5) {
		return "O(n)"
	} else if (cyclomaticComplexity <= 8) {
		return "O(n log n)"
	} else if (cyclomaticComplexity <= 12) {
		return "O(n²)"
	} else if (cyclomaticComplexity <= 15) {
		return "O(n³)"
	} else if (cyclomaticComplexity <= 20) {
		return "O(2^n)"
	} else {
		return "Unknown"
	}
}

//?? [EXAMPLE] detectComplexityFromAST({ cyclomaticComplexity: 1, hasThrowStatements: false, hasAwaitExpressions: false, hasGlobalAccess: false, hasReturnStatements: true }) // "O(1)"
//?? [EXAMPLE] detectComplexityFromAST({ cyclomaticComplexity: 10, hasThrowStatements: false, hasAwaitExpressions: false, hasGlobalAccess: false, hasReturnStatements: true }) // "O(n²)"
//?? [GOTCHA] This measures cyclomatic complexity, not time complexity
