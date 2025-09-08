//++ Extracts the default export function from a source file
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function extractDefault(
	sourceFile: typescript.SourceFile,
): FunctionNode | null {
	let defaultFunction: FunctionNode | null = null

	function visit(node: typescript.Node): void {
		// Check for export default function
		if (typescript.isExportAssignment(node) && !node.isExportEquals) {
			const expression = node.expression

			// Direct function export: export default function foo() {}
			if (typescript.isFunctionExpression(expression)) {
				const name = expression.name?.getText(sourceFile) || "default"
				defaultFunction = {
					name,
					node: expression,
					isDefault: true,
					isExported: true,
					startPos: node.getStart(sourceFile),
					endPos: node.getEnd(),
				}
			} // Arrow function: export default () => {}
			else if (typescript.isArrowFunction(expression)) {
				defaultFunction = {
					name: "default",
					node: expression,
					isDefault: true,
					isExported: true,
					startPos: node.getStart(sourceFile),
					endPos: node.getEnd(),
				}
			} // Identifier: export default foo (where foo is defined elsewhere)
			else if (typescript.isIdentifier(expression)) {
				// Note: This is a reference to a function, not the actual function node
				// For now, we'll skip this case as we need the actual function node
				// Future enhancement: find the actual function declaration
				defaultFunction = null
			}
		} // Check for export default in modifiers
		else if (typescript.isFunctionDeclaration(node)) {
			const hasDefaultModifier = node.modifiers?.some(
				(modifier) => modifier.kind === typescript.SyntaxKind.DefaultKeyword,
			)
			const hasExportModifier = node.modifiers?.some(
				(modifier) => modifier.kind === typescript.SyntaxKind.ExportKeyword,
			)

			if (hasDefaultModifier && hasExportModifier) {
				const name = node.name?.getText(sourceFile) || "default"
				defaultFunction = {
					name,
					node,
					isDefault: true,
					isExported: true,
					startPos: node.getStart(sourceFile),
					endPos: node.getEnd(),
				}
			}
		}

		// Continue traversal if not found
		if (!defaultFunction) {
			typescript.forEachChild(node, visit)
		}
	}

	visit(sourceFile)
	return defaultFunction
}

//?? extractDefault(sourceFile) // Returns the default export function or null
