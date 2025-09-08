import * as ts from "npm:typescript@5.7.2"

import type {
	FunctionSignature,
	ParseError,
	Result,
} from "../../types/index.ts"

import parseFunctionFromAST from "../parseFunctionFromAST/index.ts"
import parseWithCompiler from "../parseWithCompiler/index.ts"

export type ParsedFile = {
	sourceFile: ts.SourceFile
	functions: Array<{
		node: ts.Node
		signature: FunctionSignature
	}>
}

/**
 * Parses a TypeScript file and extracts all function declarations using the TypeScript compiler API
 * @param content - The TypeScript source code
 * @param fileName - Optional file name for error reporting
 * @returns Result containing parsed file with AST and function signatures
 */
export default function parseFileWithCompiler(
	content: string,
	fileName: string = "source.ts",
): Result<ParsedFile, ParseError> {
	// Parse the source code into AST
	const parseResult = parseWithCompiler(content)

	if (!parseResult.ok) {
		return {
			ok: false,
			error: {
				...parseResult.error,
				file: fileName,
			},
		}
	}

	const sourceFile = parseResult.value
	const functions: Array<{ node: ts.Node; signature: FunctionSignature }> = []

	// Walk the AST to find all function-like nodes
	function visit(node: ts.Node): void {
		// Check if it's a function-like node
		if (
			ts.isFunctionDeclaration(node) ||
			ts.isFunctionExpression(node) ||
			ts.isArrowFunction(node) ||
			ts.isMethodDeclaration(node)
		) {
			const signatureResult = parseFunctionFromAST(node, sourceFile)
			if (signatureResult.ok) {
				functions.push({
					node,
					signature: signatureResult.value,
				})
			}
		}

		// Continue traversing the tree
		ts.forEachChild(node, visit)
	}

	// Start the traversal
	visit(sourceFile)

	return {
		ok: true,
		value: {
			sourceFile,
			functions,
		},
	}
}
