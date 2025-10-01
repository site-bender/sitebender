import type { FunctionSignature } from "../../types/index.ts"

import countCurryLevels from "../countCurryLevels/index.ts"
import getDefaultValueForLevel from "../getDefaultValueForLevel/index.ts"
import needsCurriedHandling from "../needsCurriedHandling/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateCurriedInputs(
	baseInput: Array<unknown>,
	signature: FunctionSignature,
): Array<unknown> {
	if (!needsCurriedHandling(signature)) {
		return baseInput
	}

	// For curried functions, we need to provide inputs for all stages
	// Extract the number of curry levels from the return type
	const curryLevels = countCurryLevels(signature.returnType.raw)

	// If we only have one input, add dummy values for remaining parameters
	while (baseInput.length <= curryLevels) {
		baseInput.push(getDefaultValueForLevel(baseInput.length, signature))
	}

	return baseInput
}
