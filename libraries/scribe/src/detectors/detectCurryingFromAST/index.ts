import * as ts from "npm:typescript@5.7.2"

/**
 * Detects if a function is curried and counts the curry levels by analyzing its AST
 * @param node - The function AST node to analyze
 * @returns Object with isCurried flag and number of levels
 */
export default function detectCurryingFromAST(node: ts.Node): { isCurried: boolean; levels: number } {
	let levels = 0

	function countNestedFunctions(currentNode: ts.Node): number {
		// Base case: if it's a function that returns another function
		if (ts.isFunctionDeclaration(currentNode) ||
			ts.isFunctionExpression(currentNode) ||
			ts.isArrowFunction(currentNode) ||
			ts.isMethodDeclaration(currentNode)) {
			
			levels++

			// Check the body/return value
			if (ts.isArrowFunction(currentNode) && currentNode.body) {
				// Arrow function with expression body
				if (!ts.isBlock(currentNode.body)) {
					// Direct return expression
					if (ts.isArrowFunction(currentNode.body) ||
						ts.isFunctionExpression(currentNode.body)) {
						return countNestedFunctions(currentNode.body)
					}
				} else {
					// Arrow function with block body - check for return statements
					return checkBlockForReturnedFunctions(currentNode.body)
				}
			} else if ((ts.isFunctionDeclaration(currentNode) ||
						ts.isFunctionExpression(currentNode) ||
						ts.isMethodDeclaration(currentNode)) && currentNode.body) {
				// Regular function with body - check for return statements
				return checkBlockForReturnedFunctions(currentNode.body)
			}
		}

		return levels
	}

	function checkBlockForReturnedFunctions(block: ts.Block): number {
		let foundReturn = false

		function visitBlock(node: ts.Node): void {
			if (foundReturn) return

			if (ts.isReturnStatement(node) && node.expression) {
				// Check if returning a function
				if (ts.isFunctionExpression(node.expression) ||
					ts.isArrowFunction(node.expression)) {
					foundReturn = true
					countNestedFunctions(node.expression)
				} else if (ts.isCallExpression(node.expression)) {
					// Check if it's returning a function call that returns a function
					// This is a simplified check - could be expanded
				}
			}

			if (!foundReturn && !ts.isFunctionLike(node)) {
				ts.forEachChild(node, visitBlock)
			}
		}

		visitBlock(block)
		return levels
	}

	// Start counting from the root function
	const totalLevels = countNestedFunctions(node)

	return {
		isCurried: totalLevels > 1,
		levels: totalLevels > 0 ? totalLevels : 1
	}
}