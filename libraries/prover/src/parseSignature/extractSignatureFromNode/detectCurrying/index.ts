import * as ts from "npm:typescript@5.7.2"
import isFunction from "./isFunction/index.ts"

/**
 * Detects if a function uses currying pattern (returns another function)
 * @param node Function declaration, expression, or arrow function
 * @returns True if the function returns another function
 */
export default function detectCurrying(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction
): boolean {
	if (!node.body) {
		return false
	}
	
	if (ts.isBlock(node.body)) {
		const returnStatement = node.body.statements.find(ts.isReturnStatement)
		
		if (returnStatement?.expression) {
			return isFunction(returnStatement.expression)
		}
	} else {
		return isFunction(node.body)
	}
	
	return false
}