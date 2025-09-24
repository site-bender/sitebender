import * as ts from "npm:typescript@5.7.2"

export type ImportInfo = {
	name: string
	path: string
	isType: boolean
	isDefault: boolean
}

/**
 * Extracts import statements from a TypeScript source file
 * This is crucial for detecting custom types like Result<T, E> that need to be imported in tests
 *
 * @example
 * ```typescript
 * // Given source with: import type { Result } from "../../types/index.ts"
 * const imports = extractImports(sourceFile)
 * // Returns: [{ name: "Result", path: "../../types/index.ts", isType: true, isDefault: false }]
 * ```
 */
export default function extractImports(
	sourceFile: ts.SourceFile,
): Array<ImportInfo> {
	const imports: Array<ImportInfo> = []

	function visit(node: ts.Node) {
		if (ts.isImportDeclaration(node)) {
			const moduleSpecifier = node.moduleSpecifier
			if (ts.isStringLiteral(moduleSpecifier)) {
				const importPath = moduleSpecifier.text
				const importClause = node.importClause

				if (importClause) {
					// Handle default imports
					if (importClause.name) {
						imports.push({
							name: importClause.name.text,
							path: importPath,
							isType: importClause.isTypeOnly || false,
							isDefault: true,
						})
					}

					// Handle named imports
					if (importClause.namedBindings) {
						if (ts.isNamedImports(importClause.namedBindings)) {
							importClause.namedBindings.elements.forEach(
								(element) => {
									imports.push({
										name: element.name.text,
										path: importPath,
										isType: importClause.isTypeOnly ||
											element.isTypeOnly || false,
										isDefault: false,
									})
								},
							)
						} // Handle namespace imports (import * as X)
						else if (
							ts.isNamespaceImport(importClause.namedBindings)
						) {
							imports.push({
								name: importClause.namedBindings.name.text,
								path: importPath,
								isType: importClause.isTypeOnly || false,
								isDefault: false,
							})
						}
					}
				}
			}
		}

		ts.forEachChild(node, visit)
	}

	visit(sourceFile)
	return imports
}
