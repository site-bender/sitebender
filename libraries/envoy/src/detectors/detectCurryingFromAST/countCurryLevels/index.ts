import type { AstNode } from "../../detectMathPropertiesFromAST/types/index.ts"

import contains from "../../../../../toolkit/src/simple/string/contains/index.ts"
import some from "../../../../../toolkit/src/simple/array/some/index.ts"
import {
	ARROW_FUNCTION_KIND,
	CURRY_PATTERNS,
	FUNCTION_DECLARATION_KIND,
	FUNCTION_EXPRESSION_KIND,
	METHOD_DECLARATION_KIND,
	RETURN_STATEMENT_KIND,
} from "../constants/index.ts"

//++ Counts the levels of currying in a function
export default function countCurryLevels(node: AstNode): number {
	// Check if this is a function node
	const isFunctionNode = node.kind === FUNCTION_DECLARATION_KIND ||
		node.kind === FUNCTION_EXPRESSION_KIND ||
		node.kind === ARROW_FUNCTION_KIND ||
		node.kind === METHOD_DECLARATION_KIND

	if (!isFunctionNode) {
		return 0
	}

	// Start with 1 level for the function itself
	const baseLevel = 1

	// Check for returned functions
	const nestedLevels = countNestedReturns(node)

	return baseLevel + nestedLevels
}

function countNestedReturns(node: AstNode): number {
	if (!node.getText) {
		return 0
	}

	const nodeText = node.getText()

	// Check for curry patterns in text
	const hasCurryPattern = some(function checkPattern(pattern: string) {
		return contains(pattern)(nodeText)
	})(CURRY_PATTERNS)

	if (!hasCurryPattern) {
		return 0
	}

	// Count nested function returns
	const maxNestedLevel = countMaxNesting(node)

	return maxNestedLevel
}

function countMaxNesting(node: AstNode): number {
	const maxLevel = { value: 0 }

	if (node.forEachChild) {
		node.forEachChild(function checkChild(child: AstNode): void {
			// Check if this is a return statement
			if (child.kind === RETURN_STATEMENT_KIND) {
				// Check if it returns a function
				const returnedLevel = checkReturnedFunction(child)
				if (returnedLevel > maxLevel.value) {
					maxLevel.value = returnedLevel
				}
			}

			// Recursively check children
			const childLevel = countMaxNesting(child)
			if (childLevel > maxLevel.value) {
				maxLevel.value = childLevel
			}
		})
	}

	return maxLevel.value
}

function checkReturnedFunction(returnNode: AstNode): number {
	if (!returnNode.getText) {
		return 0
	}

	const returnText = returnNode.getText()

	// Check if it returns a function
	const returnsFunction = contains("return function")(returnText) ||
		contains("return (")(returnText) && contains("=>")(returnText)

	if (returnsFunction) {
		// Try to count further nesting
		return 1 + countMaxNesting(returnNode)
	}

	return 0
}

//?? [EXAMPLE] countCurryLevels(curriedAddNode) // 2 for add = a => b => a + b
//?? [EXAMPLE] countCurryLevels(regularFunctionNode) // 1 for non-curried
//?? [GOTCHA] Text-based detection may miss complex patterns
