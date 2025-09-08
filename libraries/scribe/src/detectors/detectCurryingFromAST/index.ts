import * as ts from "npm:typescript@5.7.2"

/**
 * Detects if a function is curried by analyzing its AST
 * @param node - The function AST node to analyze
 * @returns Object with isCurried flag and number of levels
 */
export default function detectCurryingFromAST(
	node: ts.Node,
): { isCurried: boolean; levels: number } {
	function countNestedFunctions(currentNode: ts.Node, currentLevel: number): number {
		// Base case: if it's a function that returns another function
		if (
			ts.isFunctionDeclaration(currentNode) ||
			ts.isFunctionExpression(currentNode) ||
			ts.isArrowFunction(currentNode) ||
			ts.isMethodDeclaration(currentNode)
		) {
			const nextLevel = currentLevel + 1

			// Check the body/return value
			if (ts.isArrowFunction(currentNode) && currentNode.body) {
				// Arrow function with expression body
				if (!ts.isBlock(currentNode.body)) {
					// Direct return expression
					if (
						ts.isArrowFunction(currentNode.body) ||
						ts.isFunctionExpression(currentNode.body)
					) {
						return countNestedFunctions(currentNode.body, nextLevel)
					}
				} else {
					// Arrow function with block body - check for return statements
					return checkBlockForReturnedFunctions(currentNode.body, nextLevel)
				}
			} else if (
				(ts.isFunctionDeclaration(currentNode) ||
					ts.isFunctionExpression(currentNode) ||
					ts.isMethodDeclaration(currentNode)) && currentNode.body
			) {
				// Regular function with body - check for return statements
				return checkBlockForReturnedFunctions(currentNode.body, nextLevel)
			}

			return nextLevel
		}

		return currentLevel
	}

	function checkBlockForReturnedFunctions(block: ts.Block, currentLevel: number): number {
		// Find first return statement that returns a function
		const returnStatements: Array<ts.ReturnStatement> = []
		
		function collectReturns(node: ts.Node): void {
			if (ts.isReturnStatement(node) && node.expression) {
				returnStatements.push(node)
			}
			// Don't traverse into nested functions
			if (
				!ts.isFunctionExpression(node) &&
				!ts.isArrowFunction(node) &&
				!ts.isFunctionDeclaration(node) &&
				!ts.isMethodDeclaration(node)
			) {
				ts.forEachChild(node, collectReturns)
			}
		}
		
		collectReturns(block)

		// Check if any return statement returns a function
		const functionReturns = returnStatements.filter((stmt) =>
			stmt.expression &&
			(ts.isFunctionExpression(stmt.expression) ||
			ts.isArrowFunction(stmt.expression))
		)

		if (functionReturns.length > 0 && functionReturns[0].expression) {
			// Found a function being returned, count its levels
			return countNestedFunctions(functionReturns[0].expression, currentLevel)
		}

		return currentLevel
	}

	const totalLevels = countNestedFunctions(node, 0)

	return {
		isCurried: totalLevels > 1,
		levels: totalLevels === 0 ? 1 : totalLevels, // At least 1 level for the function itself
	}
}