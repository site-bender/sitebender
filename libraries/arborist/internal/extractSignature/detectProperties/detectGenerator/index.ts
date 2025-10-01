//++ Detects if a function is a generator
import * as typescript from "npm:typescript@5.7.2"

export default function detectGenerator(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
): boolean {
	// Arrow functions cannot be generators
	if (typescript.isArrowFunction(node)) {
		return false
	}

	// Check asterisk token for function declarations and expressions
	if (
		typescript.isFunctionDeclaration(node) ||
		typescript.isFunctionExpression(node) ||
		typescript.isMethodDeclaration(node)
	) {
		return node.asteriskToken !== undefined
	}

	return false
}
