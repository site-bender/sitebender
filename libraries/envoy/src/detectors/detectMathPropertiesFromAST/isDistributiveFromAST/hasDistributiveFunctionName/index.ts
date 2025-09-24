import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import toLower from "../../../../../../toolsmith/src/vanilla/string/toCase/toLower/index.ts"
import { DISTRIBUTIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if function name suggests distributive operation
export default function hasDistributiveFunctionName(node: AstNode): boolean {
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
	})(DISTRIBUTIVE_FUNCTION_NAMES)
}

//?? [EXAMPLE] hasDistributiveFunctionName(distributeFunctionNode) // true
//?? [EXAMPLE] hasDistributiveFunctionName(simpleFunctionNode) // false
//?? [PRO] Simple heuristic based on common naming patterns
//?? [CON] Relies on naming conventions which may not always be accurate
