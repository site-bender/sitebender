import type { FunctionSignature } from "../../types/index.ts"
import { TypeKind } from "../../types/index.ts"

/**
 * Determines if a function signature requires curried function handling
 * @param signature Function signature to check
 * @returns True if the function is curried and returns a function
 */
export default function needsCurriedHandling(
	signature: FunctionSignature,
): boolean {
	// Check if function is curried and returns another function
	return signature.isCurried &&
		signature.returnType.raw.includes("=>") &&
		signature.returnType.kind === TypeKind.Function
}
