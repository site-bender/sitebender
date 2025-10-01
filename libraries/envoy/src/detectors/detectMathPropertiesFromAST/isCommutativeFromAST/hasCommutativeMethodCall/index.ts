import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import {
	COMMUTATIVE_MATH_METHODS,
	COMMUTATIVE_METHOD_NAMES,
} from "../constants/index.ts"

//++ Checks if AST node contains method calls known to be commutative
export default function hasCommutativeMethodCall(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for Math methods like Math.min, Math.max
	const hasMathMethod = some(function checkMathMethod(method: string) {
		return contains(method)(nodeText)
	})(COMMUTATIVE_MATH_METHODS)

	// Check for general method names
	const hasMethodName = some(function checkMethodName(method: string) {
		return contains(`.${method}(`)(nodeText) || contains(`${method}(`)(nodeText)
	})(COMMUTATIVE_METHOD_NAMES)

	return hasMathMethod || hasMethodName
}
