type FunctionMetadata = {
	hasThrowStatements: boolean
	hasAwaitExpressions: boolean
	hasGlobalAccess: boolean
	cyclomaticComplexity: number
	hasReturnStatements: boolean
}

//++ Returns the pre-calculated cyclomatic complexity from Parser metadata
export default function calculateCyclomaticComplexity(metadata: FunctionMetadata): number {
	return metadata.cyclomaticComplexity
}

//?? [EXAMPLE] calculateCyclomaticComplexity({ cyclomaticComplexity: 1, ... }) // 1
//?? [EXAMPLE] calculateCyclomaticComplexity({ cyclomaticComplexity: 5, ... }) // 5
//?? [PRO] Uses pre-calculated value from Parser - no re-computation needed
