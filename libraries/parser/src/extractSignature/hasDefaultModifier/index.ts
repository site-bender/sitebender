import some from "@sitebender/toolkit/simple/array/some/index.ts"
//++ Checks if a function declaration has a default modifier
import * as typescript from "npm:typescript@5.7.2"

import isDefaultKeyword from "./isDefaultKeyword/index.ts"

export default function hasDefaultModifier(
	node: typescript.FunctionDeclaration,
): boolean {
	if (!node.modifiers) {
		return false
	}

	const modifiersArray = Array.from(node.modifiers)

	return some(isDefaultKeyword)(modifiersArray)
}

//?? [EXAMPLE] hasDefaultModifier(defaultExportFunction) // true
//?? [EXAMPLE] hasDefaultModifier(namedExportFunction) // false
