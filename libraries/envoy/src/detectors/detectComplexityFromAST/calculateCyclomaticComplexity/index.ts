import type { TraversalMetadata } from "../../../types/index.ts"

//++ Returns the pre-calculated cyclomatic complexity from Linguist metadata
export default function calculateCyclomaticComplexity(
	metadata: TraversalMetadata,
): number {
	return metadata.cyclomaticComplexity
}

//?? [EXAMPLE] calculateCyclomaticComplexity({ cyclomaticComplexity: 1, ... }) // 1
//?? [EXAMPLE] calculateCyclomaticComplexity({ cyclomaticComplexity: 5, ... }) // 5
//?? [PRO] Uses pre-calculated value from Linguist - no re-computation needed
