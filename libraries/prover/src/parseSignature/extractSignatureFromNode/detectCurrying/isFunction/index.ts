import * as ts from "npm:typescript@5.7.2"

/**
 * Checks if an expression node represents a function
 * @param node Expression node to check
 * @returns True if the node is a function expression or arrow function
 */
export default function isFunction(node: ts.Expression): boolean {
	return ts.isFunctionExpression(node) || ts.isArrowFunction(node)
}
