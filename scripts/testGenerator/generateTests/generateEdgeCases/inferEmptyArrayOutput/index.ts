import type { FunctionSignature } from "../../../types/index.ts"

/**
 * Infers expected output for empty array inputs
 * @param signature Function signature information
 * @returns Inferred output value for empty array
 */
export default function inferEmptyArrayOutput(signature: FunctionSignature): unknown {
	const returnType = signature.returnType.raw
	
	if (returnType.includes("Array") || returnType.includes("[]")) {
		return []
	}
	
	if (returnType === "number") {
		return 0
	}
	
	if (returnType === "string") {
		return ""
	}
	
	if (returnType === "boolean") {
		return false
	}
	
	// For functions that return NaN on invalid input
	if (signature.name === "add" || returnType.includes("number")) {
		return NaN
	}
	
	return undefined
}