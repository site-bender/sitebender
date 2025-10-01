import type { TraversalMetadata } from "../../../types/index.ts"

//++ Returns the pre-calculated cyclomatic complexity from Arborist metadata
export default function calculateCyclomaticComplexity(
	metadata: TraversalMetadata,
): number {
	return metadata.cyclomaticComplexity
}
