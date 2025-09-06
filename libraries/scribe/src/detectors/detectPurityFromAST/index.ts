import * as ts from "npm:typescript@5.7.2"
import { SIDE_EFFECT_INDICATORS } from "../../constants/index.ts"

/**
 * Detects if a function is pure by analyzing its AST
 * @param node - The function AST node to analyze
 * @returns true if the function is pure, false otherwise
 */
export default function detectPurityFromAST(node: ts.Node): boolean {
	let isPure = true

	function visit(currentNode: ts.Node): void {
		if (!isPure) return // Early exit if already impure

		// Check for console, document, window, localStorage, etc.
		if (ts.isPropertyAccessExpression(currentNode)) {
			const expression = currentNode.expression.getText()
			const property = currentNode.name.getText()
			const fullAccess = `${expression}.${property}`

			// Check for side effect indicators
			for (const indicator of SIDE_EFFECT_INDICATORS) {
				if (expression === indicator || fullAccess.includes(indicator)) {
					isPure = false
					return
				}
			}

			// Check for array mutations - but allow array access (arr[i])
			const mutatingMethods = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill", "copyWithin"]
			if (mutatingMethods.includes(property)) {
				// This is a mutating array method
				isPure = false
				return
			}
		}

		// Check for global object access
		if (ts.isIdentifier(currentNode)) {
			const name = currentNode.getText()
			if (["console", "document", "window", "localStorage", "sessionStorage", "process", "crypto"].includes(name)) {
				isPure = false
				return
			}
		}

		// Check for assignments (mutations) - but not in declarations or to local variables
		if (ts.isBinaryExpression(currentNode) && currentNode.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
			// Check if this is inside a variable declaration (which is okay)
			let parent = currentNode.parent
			let isDeclaration = false
			
			while (parent && !isDeclaration) {
				if (ts.isVariableDeclaration(parent) || ts.isParameter(parent)) {
					isDeclaration = true
				}
				parent = parent.parent
				if (!parent || ts.isFunctionLike(parent)) break
			}

			// Check what we're assigning to
			const left = currentNode.left
			
			// Check if we're assigning to an array element (mutation)
			if (ts.isElementAccessExpression(left)) {
				// This is array[index] = value, which is a mutation
				isPure = false
				return
			}
			
			// Check if we're assigning to a property (object.prop = value)
			if (ts.isPropertyAccessExpression(left)) {
				// This is object mutation
				isPure = false
				return
			}
			
			// If it's just an identifier (local variable), that's okay as long as
			// it's not a parameter or external variable
			if (ts.isIdentifier(left)) {
				// Assignment to local variables is okay in pure functions
				// We would need more sophisticated analysis to check if it's truly local
				// For now, allow assignments to simple identifiers
				return
			}

			if (!isDeclaration) {
				// Other types of assignments might be impure
				isPure = false
				return
			}
		}

		// Check for compound assignments (+=, -=, etc.)
		if (ts.isBinaryExpression(currentNode)) {
			const operator = currentNode.operatorToken.kind
			if (operator === ts.SyntaxKind.PlusEqualsToken ||
				operator === ts.SyntaxKind.MinusEqualsToken ||
				operator === ts.SyntaxKind.AsteriskEqualsToken ||
				operator === ts.SyntaxKind.SlashEqualsToken ||
				operator === ts.SyntaxKind.PercentEqualsToken) {
				isPure = false
				return
			}
		}

		// Check for increment/decrement
		if (ts.isPrefixUnaryExpression(currentNode) || ts.isPostfixUnaryExpression(currentNode)) {
			const operator = currentNode.operator
			if (operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken) {
				isPure = false
				return
			}
		}

		// Check for throw statements
		if (ts.isThrowStatement(currentNode)) {
			isPure = false
			return
		}

		// Check for try/catch
		if (ts.isTryStatement(currentNode)) {
			isPure = false
			return
		}

		// Check for await
		if (ts.isAwaitExpression(currentNode)) {
			isPure = false
			return
		}

		// Check for new Date() or Date.now()
		if (ts.isNewExpression(currentNode) && currentNode.expression.getText() === "Date") {
			isPure = false
			return
		}

		if (ts.isCallExpression(currentNode)) {
			const expression = currentNode.expression.getText()
			if (expression === "Date.now" || expression === "Math.random") {
				isPure = false
				return
			}
		}

		// Check for fetch, XMLHttpRequest
		if (ts.isNewExpression(currentNode) && currentNode.expression.getText() === "XMLHttpRequest") {
			isPure = false
			return
		}

		if (ts.isCallExpression(currentNode) && currentNode.expression.getText() === "fetch") {
			isPure = false
			return
		}

		// Continue traversing
		ts.forEachChild(currentNode, visit)
	}

	// Start traversal
	visit(node)

	return isPure
}