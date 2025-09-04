import ts from "npm:typescript"

import type { ImportInfo } from "../../index.ts"

import categorizeImport from "./categorizeImport/index.ts"
import removeDuplicateImports from "./removeDuplicateImports/index.ts"

export default function extractImports(sourceCode: string): {
	imports: ImportInfo[]
	restOfFile: string
} {
	const sourceFile = ts.createSourceFile(
		"temp.ts",
		sourceCode,
		ts.ScriptTarget.Latest,
		true,
	)
	const imports: ImportInfo[] = []
	let lastImportEnd = 0

	function visit(node: ts.Node) {
		if (ts.isImportDeclaration(node)) {
			const source = (node.moduleSpecifier as ts.StringLiteral).text
			const isTypeOnly = node.importClause?.isTypeOnly || false

			// Use sourceFile parameter for getFullStart and getEnd
			const start = node.getFullStart()
			const end = node.getEnd()
			const text = sourceCode.substring(start, end).trim()

			imports.push({
				type: isTypeOnly ? "type" : "value",
				source,
				text,
				line: node.getStart(sourceFile), // Pass sourceFile here
				category: categorizeImport(source),
			})

			lastImportEnd = node.getEnd()
		}

		// Pass the visit function to forEachChild
		ts.forEachChild(node, visit)
	}

	// Start visiting from the source file
	visit(sourceFile)

	// Remove duplicates from the extracted imports
	const deduplicatedImports = removeDuplicateImports(imports)

	// Find where imports end and rest of file begins
	const lines = sourceCode.split("\n")
	let restStartLine = 0

	if (imports.length > 0) {
		const lastImportPosition = sourceFile.getLineAndCharacterOfPosition(
			lastImportEnd,
		)
		restStartLine = lastImportPosition.line + 1

		// Skip empty lines after imports
		while (restStartLine < lines.length && lines[restStartLine].trim() === "") {
			restStartLine++
		}
	}

	const restOfFile = lines.slice(restStartLine).join("\n")

	return { imports: deduplicatedImports, restOfFile }
}
