import * as ts from "npm:typescript@5.7.2"
import { SIDE_EFFECT_INDICATORS } from "../../constants/index.ts"

/**
 * Detects if a function is pure by analyzing its AST
 * @param node - The function AST node to analyze
 * @returns true if the function is pure, false otherwise
 */
export default function detectPurityFromAST(node: ts.Node): boolean {
	/**
	 * Checks if a parent chain contains a declaration
	 */
	function isInsideDeclaration(node: ts.Node): boolean {
		const checkParent = (current: ts.Node | undefined): boolean => {
			if (!current) return false
			if (ts.isVariableDeclaration(current) || ts.isParameter(current)) {
				return true
			}
			if (ts.isFunctionLike(current)) {
				return false // Stop at function boundaries
			}
			return checkParent(current.parent)
		}
		return checkParent(node.parent)
	}

	/**
	 * Checks if a node represents an impure operation
	 */
	function checkNodeImpurity(currentNode: ts.Node): boolean {
		// Check for console, document, window, localStorage, etc.
		if (ts.isPropertyAccessExpression(currentNode)) {
			const expression = currentNode.expression.getText()
			const property = currentNode.name.getText()
			const fullAccess = `${expression}.${property}`

			// Check for side effect indicators
			const hasSideEffect = SIDE_EFFECT_INDICATORS.some(
				(indicator) =>
					expression === indicator || fullAccess.includes(indicator)
			)
			if (hasSideEffect) return true

			// Check for array mutations
			const mutatingMethods = [
				"push",
				"pop",
				"shift",
				"unshift",
				"splice",
				"sort",
				"reverse",
				"fill",
				"copyWithin",
			]
			if (mutatingMethods.includes(property)) {
				return true
			}
		}

		// Check for global object access
		if (ts.isIdentifier(currentNode)) {
			const name = currentNode.getText()
			const globalObjects = [
				"console",
				"document",
				"window",
				"localStorage",
				"sessionStorage",
				"process",
				"crypto",
			]
			if (globalObjects.includes(name)) {
				return true
			}
		}

		// Check for assignments (mutations)
		if (
			ts.isBinaryExpression(currentNode) &&
			currentNode.operatorToken.kind === ts.SyntaxKind.EqualsToken
		) {
			const isDeclaration = isInsideDeclaration(currentNode)
			const left = currentNode.left

			// Check if we're assigning to an array element (mutation)
			if (ts.isElementAccessExpression(left)) {
				return true
			}

			// Check if we're assigning to a property (object.prop = value)
			if (ts.isPropertyAccessExpression(left)) {
				return true
			}

			// If it's just an identifier (local variable), allow it if in declaration
			if (ts.isIdentifier(left)) {
				return false // Allow local variable assignments
			}

			// Other assignments outside declarations are impure
			return !isDeclaration
		}

		// Check for compound assignments (+=, -=, etc.)
		if (ts.isBinaryExpression(currentNode)) {
			const operator = currentNode.operatorToken.kind
			const compoundOperators = [
				ts.SyntaxKind.PlusEqualsToken,
				ts.SyntaxKind.MinusEqualsToken,
				ts.SyntaxKind.AsteriskEqualsToken,
				ts.SyntaxKind.SlashEqualsToken,
				ts.SyntaxKind.PercentEqualsToken,
			]
			if (compoundOperators.includes(operator)) {
				return true
			}
		}

		// Check for increment/decrement
		if (
			ts.isPrefixUnaryExpression(currentNode) ||
			ts.isPostfixUnaryExpression(currentNode)
		) {
			const operator = currentNode.operator
			if (
				operator === ts.SyntaxKind.PlusPlusToken ||
				operator === ts.SyntaxKind.MinusMinusToken
			) {
				return true
			}
		}

		// Check for throw statements
		if (ts.isThrowStatement(currentNode)) {
			return true
		}

		// Check for try/catch
		if (ts.isTryStatement(currentNode)) {
			return true
		}

		// Check for await
		if (ts.isAwaitExpression(currentNode)) {
			return true
		}

		// Check for new Date() or Date.now()
		if (
			ts.isNewExpression(currentNode) &&
			currentNode.expression.getText() === "Date"
		) {
			return true
		}

		if (ts.isCallExpression(currentNode)) {
			const expression = currentNode.expression.getText()
			if (expression === "Date.now" || expression === "Math.random") {
				return true
			}
			if (expression === "fetch") {
				return true
			}
		}

		// Check for XMLHttpRequest
		if (
			ts.isNewExpression(currentNode) &&
			currentNode.expression.getText() === "XMLHttpRequest"
		) {
			return true
		}

		return false
	}

	/**
	 * Recursively checks all nodes for impurity
	 */
	function checkTreeImpurity(currentNode: ts.Node): boolean {
		// Check current node
		if (checkNodeImpurity(currentNode)) {
			return true
		}

		// Check children
		const children: Array<ts.Node> = []
		ts.forEachChild(currentNode, (child) => {
			children.push(child)
		})

		return children.some((child) => checkTreeImpurity(child))
	}

	// Return true if pure (no impurity found)
	return !checkTreeImpurity(node)
}