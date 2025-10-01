import type { FunctionSignature } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getExpectedOutputForInvalid(
	signature: FunctionSignature,
): unknown {
	// Most toolsmith functions return NaN for invalid numeric inputs
	if (
		signature.returnType.raw.includes("number") ||
		signature.name.includes("add") ||
		signature.name.includes("multiply") ||
		signature.name.includes("subtract") ||
		signature.name.includes("divide")
	) {
		return NaN
	}

	// Some functions might return undefined
	return undefined
}
