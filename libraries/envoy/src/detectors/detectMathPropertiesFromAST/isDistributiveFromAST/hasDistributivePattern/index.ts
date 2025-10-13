import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/string/contains/index.ts"
import {
	ADDITION_KIND,
	DISTRIBUTIVE_PATTERNS,
	MULTIPLICATION_KIND,
	SUBTRACTION_KIND,
} from "../constants/index.ts"

//++ Checks if AST node contains patterns suggesting distributive property
export default function hasDistributivePattern(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for text patterns that suggest distribution
	const hasTextPattern = some(function checkPattern(pattern: string) {
		return contains(pattern)(nodeText)
	})(DISTRIBUTIVE_PATTERNS)

	// Check for specific AST structure: multiplication over addition/subtraction
	const hasDistributiveStructure = checkDistributiveStructure(node)

	return hasTextPattern || hasDistributiveStructure
}

function checkDistributiveStructure(node: AstNode): boolean {
	if (!node.forEachChild) {
		return false
	}

	// Look for patterns like a * (b + c) or (a + b) * c
	const foundDistributive = node.forEachChild(function checkChild(
		child: AstNode,
	): boolean | undefined {
		// Check if this is a multiplication node
		if (child.kind === MULTIPLICATION_KIND) {
			// Check if children contain addition or subtraction
			const hasAddOrSub = child.forEachChild &&
				child.forEachChild(function checkGrandchild(
					grandchild: AstNode,
				): boolean | undefined {
					return (
						grandchild.kind === ADDITION_KIND ||
						grandchild.kind === SUBTRACTION_KIND
					) || undefined
				})

			if (hasAddOrSub) {
				return true
			}
		}

		// Recursively check children
		return checkDistributiveStructure(child) || undefined
	})

	return !!foundDistributive
}
