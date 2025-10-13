import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/string/contains/index.ts"
import {
	ASSOCIATIVE_FUNCTION_NAMES,
	FUNCTION_DECLARATION_PATTERNS,
} from "../constants/index.ts"

//++ Checks if function name itself suggests associativity
export default function hasAssociativeFunctionName(node: AstNode): boolean {
	const text = node.getText()

	return some(function checkName(name: string) {
		return some(function checkPattern(pattern: string) {
			return contains(`${pattern}${name}`)(text)
		})(FUNCTION_DECLARATION_PATTERNS)
	})(ASSOCIATIVE_FUNCTION_NAMES)
}
