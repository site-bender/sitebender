import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import toLower from "../../../../../../toolsmith/src/vanilla/string/toCase/toLower/index.ts"
import { IDEMPOTENT_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if function name suggests idempotent operation
export default function hasIdempotentFunctionName(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = toLower(node.getText())

	return some(function checkName(name: string) {
		// Check for function declarations and assignments
		return (
			contains(`function ${name}`)(nodeText) ||
			contains(`const ${name} =`)(nodeText) ||
			contains(`export default function ${name}`)(nodeText)
		)
	})(IDEMPOTENT_FUNCTION_NAMES)
}
