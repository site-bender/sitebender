//++ Extracts all function nodes from a source file regardless of export status
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function extractAll(
	sourceFile: typescript.SourceFile,
): Array<FunctionNode> {
	const functions: Array<FunctionNode> = []

	function visit(node: typescript.Node): void {
		// Check for function declarations
		if (typescript.isFunctionDeclaration(node)) {
			const name = node.name?.getText(sourceFile) || "anonymous"
			functions.push({
				name,
				node,
				isDefault: false,
				isExported: false,
				startPos: node.getStart(sourceFile),
				endPos: node.getEnd(),
			})
		} // Check for function expressions (const foo = function() {})
		else if (typescript.isVariableStatement(node)) {
			const declaration = node.declarationList.declarations[0]
			if (declaration && declaration.initializer) {
				if (typescript.isFunctionExpression(declaration.initializer)) {
					const name = declaration.name.getText(sourceFile)
					functions.push({
						name,
						node: declaration.initializer,
						isDefault: false,
						isExported: false,
						startPos: node.getStart(sourceFile),
						endPos: node.getEnd(),
					})
				} // Also check for arrow functions
				else if (typescript.isArrowFunction(declaration.initializer)) {
					const name = declaration.name.getText(sourceFile)
					functions.push({
						name,
						node: declaration.initializer,
						isDefault: false,
						isExported: false,
						startPos: node.getStart(sourceFile),
						endPos: node.getEnd(),
					})
				}
			}
		}

		// Continue traversal
		typescript.forEachChild(node, visit)
	}

	visit(sourceFile)
	return functions
}

//?? extractAll(sourceFile) // Returns all functions in the file
