//++ Extracts named export functions from a source file
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function extractNamed(
	sourceFile: typescript.SourceFile,
): Array<FunctionNode> {
	const namedFunctions: Array<FunctionNode> = []

	function visit(node: typescript.Node): void {
		// Check for export function declarations
		if (typescript.isFunctionDeclaration(node)) {
			const hasExportModifier = node.modifiers?.some(
				(modifier) => modifier.kind === typescript.SyntaxKind.ExportKeyword,
			)
			const hasDefaultModifier = node.modifiers?.some(
				(modifier) => modifier.kind === typescript.SyntaxKind.DefaultKeyword,
			)

			// Named export (not default)
			if (hasExportModifier && !hasDefaultModifier && node.name) {
				const name = node.name.getText(sourceFile)
				namedFunctions.push({
					name,
					node,
					isDefault: false,
					isExported: true,
					startPos: node.getStart(sourceFile),
					endPos: node.getEnd(),
				})
			}
		} // Check for export const foo = function() {}
		else if (typescript.isVariableStatement(node)) {
			const hasExportModifier = node.modifiers?.some(
				(modifier) => modifier.kind === typescript.SyntaxKind.ExportKeyword,
			)

			if (hasExportModifier) {
				const declaration = node.declarationList.declarations[0]
				if (declaration && declaration.initializer) {
					// Function expression
					if (typescript.isFunctionExpression(declaration.initializer)) {
						const name = declaration.name.getText(sourceFile)
						namedFunctions.push({
							name,
							node: declaration.initializer,
							isDefault: false,
							isExported: true,
							startPos: node.getStart(sourceFile),
							endPos: node.getEnd(),
						})
					} // Arrow function
					else if (typescript.isArrowFunction(declaration.initializer)) {
						const name = declaration.name.getText(sourceFile)
						namedFunctions.push({
							name,
							node: declaration.initializer,
							isDefault: false,
							isExported: true,
							startPos: node.getStart(sourceFile),
							endPos: node.getEnd(),
						})
					}
				}
			}
		} // Check for export list: export { foo, bar }
		else if (typescript.isExportDeclaration(node) && node.exportClause) {
			if (typescript.isNamedExports(node.exportClause)) {
				// Note: These are re-exports, we'd need to find the actual function declarations
				// This is a simplified implementation for now
				for (const element of node.exportClause.elements) {
					const _name = element.name.getText(sourceFile)
					// We'd need to find the actual function with this name
					// For now, just marking that it exists
				}
			}
		}

		// Continue traversal
		typescript.forEachChild(node, visit)
	}

	visit(sourceFile)
	return namedFunctions
}

//?? extractNamed(sourceFile) // Returns all named export functions
