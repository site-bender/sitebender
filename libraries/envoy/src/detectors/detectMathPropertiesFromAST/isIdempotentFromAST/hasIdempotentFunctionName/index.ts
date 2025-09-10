import type { AstNode } from "../../types/index.ts"

import contains from "../../../../../../toolkit/src/simple/string/contains/index.ts"
import some from "../../../../../../toolkit/src/simple/array/some/index.ts"
import toLowerCase from "../../../../../../toolkit/src/simple/string/toLowerCase/index.ts"
import { IDEMPOTENT_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if function name suggests idempotent operation
export default function hasIdempotentFunctionName(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = toLowerCase(node.getText())

	return some(function checkName(name: string) {
		// Check for function declarations and assignments
		return (
			contains(`function ${name}`)(nodeText) ||
			contains(`const ${name} =`)(nodeText) ||
			contains(`export default function ${name}`)(nodeText)
		)
	})(IDEMPOTENT_FUNCTION_NAMES)
}

//?? [EXAMPLE] hasIdempotentFunctionName(absoluteFunctionNode) // true
//?? [EXAMPLE] hasIdempotentFunctionName(incrementFunctionNode) // false
//?? [PRO] Simple heuristic based on common naming patterns
//?? [CON] Relies on naming conventions which may not always be accurate
