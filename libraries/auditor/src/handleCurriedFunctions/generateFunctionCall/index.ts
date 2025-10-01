import type { FunctionSignature } from "../../types/index.ts"

import formatValue from "../formatValue/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateFunctionCall(
	functionName: string,
	inputs: Array<unknown>,
	signature: FunctionSignature,
): string {
	if (signature.isCurried) {
		return inputs.reduce<string>(
			(acc, input) => `${acc}(${formatValue(input)})`,
			functionName,
		)
	}

	if (inputs.length === 1) {
		return `${functionName}(${formatValue(inputs[0])})`
	}
	return `${functionName}(${inputs.map((i) => formatValue(i)).join(", ")})`
}
