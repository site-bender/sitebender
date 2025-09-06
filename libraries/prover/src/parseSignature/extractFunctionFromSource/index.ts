import * as ts from "npm:typescript@5.7.2"

/**
 * Extracts the main exported function from a source file
 * @param sourceFile TypeScript source file
 * @param checker TypeScript type checker
 * @returns Function node or null if not found
 */
export default function extractFunctionFromSource(
	sourceFile: ts.SourceFile,
	checker: ts.TypeChecker,
): ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | null {
	const processNode = (
		node: ts.Node,
	):
		| ts.FunctionDeclaration
		| ts.FunctionExpression
		| ts.ArrowFunction
		| null => {
		if (ts.isExportAssignment(node) && node.isExportEquals === false) {
			const expression = node.expression

			if (
				ts.isFunctionExpression(expression) ||
				ts.isArrowFunction(expression)
			) {
				return expression
			} else if (ts.isIdentifier(expression)) {
				const symbol = checker.getSymbolAtLocation(expression)
				if (symbol) {
					const valueDeclaration = symbol.valueDeclaration
					if (
						valueDeclaration &&
						ts.isVariableDeclaration(valueDeclaration)
					) {
						const initializer = valueDeclaration.initializer
						if (
							initializer &&
							(ts.isFunctionExpression(initializer) ||
								ts.isArrowFunction(initializer))
						) {
							return initializer
						}
					}
				}
			}
		} else if (
			ts.isFunctionDeclaration(node) && node.modifiers?.some(
				(mod) => mod.kind === ts.SyntaxKind.ExportKeyword,
			) && node.modifiers?.some(
				(mod) => mod.kind === ts.SyntaxKind.DefaultKeyword,
			)
		) {
			return node
		} else if (ts.isVariableStatement(node)) {
			const declaration = node.declarationList.declarations[0]
			if (declaration && ts.isVariableDeclaration(declaration)) {
				const initializer = declaration.initializer
				if (
					initializer &&
					(ts.isFunctionExpression(initializer) ||
						ts.isArrowFunction(initializer))
				) {
					const functionName = declaration.name.getText()
					const isExported = findExportForName(
						sourceFile,
						functionName,
					)
					if (isExported) {
						return initializer
					}
				}
			}
		}
		return null
	}

	// Process all children and return first found function
	const children: Array<ts.Node> = []
	ts.forEachChild(sourceFile, (child) => {
		children.push(child)
	})

	return children.reduce<
		ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | null
	>(
		(acc, child) => acc || processNode(child),
		null,
	)
}

/**
 * Check if a name is exported from the source file
 * @param sourceFile TypeScript source file
 * @param name Name to check for export
 * @returns Whether the name is exported
 */
function findExportForName(sourceFile: ts.SourceFile, name: string): boolean {
	const children: Array<ts.Node> = []
	ts.forEachChild(sourceFile, (child) => {
		children.push(child)
	})

	return children.some((child) =>
		ts.isExportAssignment(child) && child.expression.getText() === name
	)
}
