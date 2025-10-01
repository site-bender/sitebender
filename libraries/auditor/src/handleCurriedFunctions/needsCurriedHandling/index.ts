import type { FunctionSignature } from "../../types/index.ts"

import { TypeKind } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function needsCurriedHandling(
	signature: FunctionSignature,
): boolean {
	// Check if function is curried and returns another function
	return signature.isCurried &&
		signature.returnType.raw.includes("=>") &&
		signature.returnType.kind === TypeKind.Function
}
