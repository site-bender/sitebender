import type { FunctionSignature } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getDefaultValueForLevel(
	_level: number,
	signature: FunctionSignature,
): unknown {
	// Try to infer from the return type what kind of value is expected
	const returnType = signature.returnType.raw

	// For numeric functions, use a small number
	if (returnType.includes("number")) {
		return 1
	}

	// For string functions, use a simple string
	if (returnType.includes("string")) {
		return "test"
	}

	// For array functions, use a small array
	if (returnType.includes("Array")) {
		return [1, 2, 3]
	}

	// Default to 1 for simplicity
	return 1
}
