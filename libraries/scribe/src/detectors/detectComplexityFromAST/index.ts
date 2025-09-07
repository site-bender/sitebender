import * as ts from "npm:typescript@5.7.2"
import type { ComplexityClass } from "../../types/index.ts"

/**
 * Analyzes function complexity by examining its AST and returns Big-O notation
 * @param node - The function AST node to analyze
 * @param sourceFile - The source file containing the node
 * @returns The complexity class in Big-O notation
 */
export default function detectComplexityFromAST(
	node: ts.Node,
	sourceFile: ts.SourceFile,
): ComplexityClass {
	let maxLoopDepth = 0
	let currentLoopDepth = 0
	let hasRecursion = false
	let hasSorting = false
	let hasBinaryOperation = false
	let functionName = ""

	// Extract function name for recursion detection
	if (ts.isFunctionDeclaration(node) && node.name) {
		functionName = node.name.getText(sourceFile)
	} else if (
		ts.isVariableDeclaration(node.parent) &&
		ts.isIdentifier(node.parent.name)
	) {
		functionName = node.parent.name.getText(sourceFile)
	}

	function visit(currentNode: ts.Node): void {
		// Track loop nesting depth
		if (
			ts.isForStatement(currentNode) ||
			ts.isForInStatement(currentNode) ||
			ts.isForOfStatement(currentNode) ||
			ts.isWhileStatement(currentNode) ||
			ts.isDoStatement(currentNode)
		) {
			currentLoopDepth++
			maxLoopDepth = Math.max(maxLoopDepth, currentLoopDepth)
			ts.forEachChild(currentNode, visit)
			currentLoopDepth--
			return
		}

		// Check for array iteration methods (count as loops)
		if (
			ts.isCallExpression(currentNode) &&
			ts.isPropertyAccessExpression(currentNode.expression)
		) {
			const methodName = currentNode.expression.name.getText(sourceFile)
			if (
				[
					"map",
					"filter",
					"reduce",
					"forEach",
					"some",
					"every",
					"find",
					"findIndex",
				].includes(methodName)
			) {
				currentLoopDepth++
				maxLoopDepth = Math.max(maxLoopDepth, currentLoopDepth)
				ts.forEachChild(currentNode, visit)
				currentLoopDepth--
				return
			}

			// Check for sort (O(n log n))
			if (methodName === "sort") {
				hasSorting = true
			}
		}

		// Check for recursion
		if (functionName && ts.isCallExpression(currentNode)) {
			if (
				ts.isIdentifier(currentNode.expression) &&
				currentNode.expression.getText(sourceFile) === functionName
			) {
				hasRecursion = true
			}
		}

		// Check for binary operations (division by 2, bit shifts)
		if (ts.isBinaryExpression(currentNode)) {
			const operator = currentNode.operatorToken.kind
			const right = currentNode.right.getText(sourceFile)

			// Division by 2 or bit shift (typical in O(log n) algorithms)
			if (
				(operator === ts.SyntaxKind.SlashToken && right === "2") ||
				operator === ts.SyntaxKind.GreaterThanGreaterThanToken ||
				operator ===
					ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken
			) {
				hasBinaryOperation = true
			}
		}

		// Check for common binary search patterns
		const nodeText = currentNode.getText(sourceFile)
		if (
			nodeText.includes("mid") || nodeText.includes("middle") ||
			(nodeText.includes("low") && nodeText.includes("high")) ||
			(nodeText.includes("left") && nodeText.includes("right"))
		) {
			// Additional check for binary search pattern
			if (hasBinaryOperation || nodeText.includes("/ 2")) {
				hasBinaryOperation = true
			}
		}

		// Continue traversing
		ts.forEachChild(currentNode, visit)
	}

	// Start analysis
	visit(node)

	// Determine complexity based on findings

	// Binary search pattern detected
	if (
		hasBinaryOperation && (hasRecursion || maxLoopDepth === 1) &&
		(node.getText(sourceFile).includes("mid") ||
			node.getText(sourceFile).includes("low") &&
				node.getText(sourceFile).includes("high"))
	) {
		return "O(log n)"
	}

	// Nested loops
	if (maxLoopDepth >= 3) {
		return "O(n³)"
	}

	if (maxLoopDepth === 2) {
		return "O(n²)"
	}

	// Sorting operation
	if (hasSorting) {
		return "O(n log n)"
	}

	// Recursion with binary operations (like divide and conquer)
	if (hasRecursion && hasBinaryOperation) {
		return "O(log n)"
	}

	// Single loop or simple recursion
	if (maxLoopDepth === 1 || hasRecursion) {
		return "O(n)"
	}

	// No loops or recursion - constant time
	return "O(1)"
}
