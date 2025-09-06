import type { FunctionSignature } from "../../types/index.ts"

/**
 * Gets expected output for invalid input cases
 * @param signature Function signature information
 * @returns Expected output for invalid inputs
 */
export default function getExpectedOutputForInvalid(signature: FunctionSignature): unknown {
	// Most toolkit functions return NaN for invalid numeric inputs
	if (signature.returnType.raw.includes("number") || 
	    signature.name.includes("add") ||
	    signature.name.includes("multiply") ||
	    signature.name.includes("subtract") ||
	    signature.name.includes("divide")) {
		return NaN
	}
	
	// Some functions might return undefined
	return undefined
}