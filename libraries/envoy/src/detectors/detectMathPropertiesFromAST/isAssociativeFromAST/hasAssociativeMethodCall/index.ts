import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../toolkit/src/simple/string/contains/index.ts"
import {
	ASSOCIATIVE_MATH_METHODS,
	ASSOCIATIVE_METHOD_NAMES,
} from "../constants/index.ts"

//++ Checks if AST node contains method calls known to be associative
export default function hasAssociativeMethodCall(node: AstNode): boolean {
	const text = node.getText()

	const hasMathMethod = some(function checkMathMethod(method: string) {
		return contains(method)(text)
	})(ASSOCIATIVE_MATH_METHODS)

	if (hasMathMethod) {
		return true
	}

	const hasInstanceMethod = some(function checkInstanceMethod(method: string) {
		return contains(`.${method}(`)(text)
	})(ASSOCIATIVE_METHOD_NAMES)

	return hasInstanceMethod
}

//?? [EXAMPLE] hasAssociativeMethodCall(mathMinNode) // true
//?? [EXAMPLE] hasAssociativeMethodCall(concatNode) // true
//?? [PRO] Uses toolkit functions instead of native methods
//?? [CON] Still relies on string matching rather than pure AST traversal
