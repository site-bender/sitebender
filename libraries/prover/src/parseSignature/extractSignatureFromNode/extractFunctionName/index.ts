import * as ts from "npm:typescript@5.7.2"

/**
 * Extracts the function name from an AST node or derives it from the file path
 * @param node Function declaration, expression, or arrow function
 * @param filePath Path to the source file
 * @returns Function name or derived name from path
 */
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
