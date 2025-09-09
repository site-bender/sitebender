//++ Checks if a function declaration has an export modifier
import some from "@sitebender/toolkit/simple/array/some/index.ts"
import * as typescript from "npm:typescript@5.7.2"

import isExportKeyword from "./isExportKeyword/index.ts"

export default function hasExportModifier(
	node: typescript.FunctionDeclaration,
): boolean {
	if (!node.modifiers) {
		return false
	}

	const modifiersArray = Array.from(node.modifiers)

	return some(isExportKeyword)(modifiersArray)
}

//?? [EXAMPLE] hasExportModifier(exportedFunction) // true
//?? [EXAMPLE] hasExportModifier(privateFunction) // false
//?? [GOTCHA] Only works with FunctionDeclaration nodes
