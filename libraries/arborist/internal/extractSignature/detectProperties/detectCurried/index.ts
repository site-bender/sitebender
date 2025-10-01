//++ Detects if a function is curried (returns another function)
import * as typescript from "npm:typescript@5.7.2"

export default function detectCurried(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): boolean {
	// Check explicit return type annotation
	if (node.type) {
		const typeText = node.type.getText(sourceFile)
		// Check if return type includes function signature patterns
		return (
			typeText.includes("=>") ||
			typeText.includes("Function") ||
			/\(.*\)\s*:\s*/.test(typeText)
		)
	}

	// For arrow functions with expression body
	if (typescript.isArrowFunction(node) && !typescript.isBlock(node.body)) {
		// Check if body is another arrow function or function expression
		return (
			typescript.isArrowFunction(node.body) ||
			typescript.isFunctionExpression(node.body)
		)
	}

	// For functions with block body, check for return statements
	if (node.body && typescript.isBlock(node.body)) {
		return checkReturnsFunction(node.body)
	}

	return false
}

function checkReturnsFunction(block: typescript.Block): boolean {
	// Look for return statements that return functions
	return block.statements.some((statement) => {
		if (typescript.isReturnStatement(statement) && statement.expression) {
			return (
				typescript.isArrowFunction(statement.expression) ||
				typescript.isFunctionExpression(statement.expression)
			)
		}
		return false
	})
}
