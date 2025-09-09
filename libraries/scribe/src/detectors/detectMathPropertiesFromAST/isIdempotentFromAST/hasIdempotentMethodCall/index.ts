import type { AstNode } from "../../types/index.ts"

import contains from "../../../../../../toolkit/src/simple/string/contains/index.ts"
import some from "../../../../../../toolkit/src/simple/array/some/index.ts"
import {
	IDEMPOTENT_MATH_METHODS,
	IDEMPOTENT_METHOD_NAMES,
} from "../constants/index.ts"

//++ Checks if AST node contains method calls known to be idempotent
export default function hasIdempotentMethodCall(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for Math methods like Math.abs, Math.floor
	const hasMathMethod = some(function checkMathMethod(method: string) {
		return contains(method)(nodeText)
	})(IDEMPOTENT_MATH_METHODS)

	// Check for general method names
	const hasMethodName = some(function checkMethodName(method: string) {
		return contains(`.${method}(`)(nodeText) || contains(`${method}(`)(nodeText)
	})(IDEMPOTENT_METHOD_NAMES)

	return hasMathMethod || hasMethodName
}

//?? [EXAMPLE] hasIdempotentMethodCall(mathFloorCallNode) // true
//?? [EXAMPLE] hasIdempotentMethodCall(incrementCallNode) // false
//?? [PRO] Catches common idempotent method patterns
//?? [CON] Uses text search which can have false positives in strings/comments
