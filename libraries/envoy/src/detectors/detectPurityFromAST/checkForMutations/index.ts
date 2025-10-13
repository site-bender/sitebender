import type { AstNode } from "../../detectMathPropertiesFromAST/types/index.ts"

import some from "../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../toolsmith/src/string/contains/index.ts"
import {
	ASSIGNMENT_OPERATOR_KINDS,
	INCREMENT_DECREMENT_KINDS,
	MUTATING_ARRAY_METHODS,
} from "../constants/index.ts"

//++ Checks if AST node contains mutations
export default function checkForMutations(node: AstNode): boolean {
	// Check for assignment operators
	const hasAssignment = some(function checkKind(kind: number) {
		return node.kind === kind
	})(ASSIGNMENT_OPERATOR_KINDS)

	if (hasAssignment) {
		return true
	}

	// Check for increment/decrement operators
	const hasIncrementDecrement = some(function checkKind(kind: number) {
		return node.kind === kind
	})(INCREMENT_DECREMENT_KINDS)

	if (hasIncrementDecrement) {
		return true
	}

	// Check for mutating array methods
	if (node.getText) {
		const nodeText = node.getText()
		const hasMutatingMethod = some(function checkMethod(method: string) {
			return contains(`.${method}(`)(nodeText)
		})(MUTATING_ARRAY_METHODS)

		if (hasMutatingMethod) {
			return true
		}

		// Check for property assignments like obj.prop = value
		if (contains(".")(nodeText) && contains("=")(nodeText)) {
			// Simple heuristic for property mutations
			return true
		}
	}

	// Recursively check children
	if (node.forEachChild) {
		const foundMutation = node.forEachChild(function checkChild(
			child: AstNode,
		): boolean | undefined {
			return checkForMutations(child) || undefined
		})

		return !!foundMutation
	}

	return false
}
