import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import toLower from "../../../../../../toolsmith/src/vanilla/string/toCase/toLower/index.ts"
import { COMMUTATIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if function name suggests commutative operation
export default function hasCommutativeFunctionName(node: AstNode): boolean {
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
	})(COMMUTATIVE_FUNCTION_NAMES)
}
