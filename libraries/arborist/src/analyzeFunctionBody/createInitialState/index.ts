// @sitebender/arborist/src/analyzeFunctionBody/createInitialState
// Creates initial analysis state for function body analysis

import type { FunctionBody } from "../../types/index.ts"

//++ Creates initial analysis state with all flags false and base complexity 1
export default function createInitialState(): FunctionBody {
	return {
		hasReturn: false,
		hasThrow: false,
		hasAwait: false,
		hasTryCatch: false,
		hasLoops: false,
		cyclomaticComplexity: 1,
	}
}
