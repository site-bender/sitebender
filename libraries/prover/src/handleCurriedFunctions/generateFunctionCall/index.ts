import type { FunctionSignature } from "../../types/index.ts"
import formatValue from "../formatValue/index.ts"

/**
 * Generates function call code for tests
 * @param functionName Name of the function to call
 * @param inputs Array of input values
 * @param signature Function signature information
 * @returns Generated function call string
 */
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
