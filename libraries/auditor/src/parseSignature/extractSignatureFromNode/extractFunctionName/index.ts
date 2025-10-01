import * as ts from "npm:typescript@5.7.2"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractFunctionName(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
	filePath: string,
): string {
	if (ts.isFunctionDeclaration(node) && node.name) {
		return node.name.text
	}

	const pathParts = filePath.split("/")
	const parentDir = pathParts[pathParts.length - 2]
	return parentDir || "anonymous"
}
