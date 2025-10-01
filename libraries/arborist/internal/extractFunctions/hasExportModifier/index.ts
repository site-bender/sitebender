//++ Checks if a function declaration has an export modifier
import some from "@sitebender/toolsmith/vanilla/array/some/index.ts"
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
