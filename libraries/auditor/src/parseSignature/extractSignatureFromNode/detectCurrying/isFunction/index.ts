import * as ts from "npm:typescript@5.7.2"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isFunction(node: ts.Expression): boolean {
	return ts.isFunctionExpression(node) || ts.isArrowFunction(node)
}
