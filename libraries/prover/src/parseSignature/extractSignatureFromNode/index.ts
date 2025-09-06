import * as ts from "npm:typescript@5.7.2"
import type { FunctionSignature } from "../../types/index.ts"
import extractFunctionName from "./extractFunctionName/index.ts"
import extractParameters from "./extractParameters/index.ts"
import extractReturnType from "./extractReturnType/index.ts"
import extractGenerics from "./extractGenerics/index.ts"
import detectCurrying from "./detectCurrying/index.ts"

/**
 * Extracts function signature information from a TypeScript AST node
 * @param node Function declaration, expression, or arrow function
 * @param filePath Path to the source file
 * @param checker TypeScript type checker
 * @returns Complete function signature information
 */
export default function extractSignatureFromNode(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
	filePath: string,
	checker: ts.TypeChecker,
): FunctionSignature {
	const name = extractFunctionName(node, filePath)
	const parameters = extractParameters(node, checker)
	const returnType = extractReturnType(node, checker)
	const generics = extractGenerics(node)
	const isCurried = detectCurrying(node)
	const isAsync = node.modifiers?.some(
		(mod) => mod.kind === ts.SyntaxKind.AsyncKeyword,
	) ?? false
	const isGenerator = !!node.asteriskToken

	return {
		name,
		path: filePath,
		parameters,
		returnType,
		generics: generics.length > 0 ? generics : undefined,
		isCurried,
		isAsync,
		isGenerator,
	}
}
