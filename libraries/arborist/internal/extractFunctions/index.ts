//++ Extracts all function nodes from a TypeScript source file
import * as typescript from "npm:typescript@5.7.2"

import visitNodes from "./visitNodes/index.ts"

export type FunctionNode = {
	readonly name: string
	readonly node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration
	readonly isDefault: boolean
	readonly isExported: boolean
	readonly startPos: number
	readonly endPos: number
	readonly hasBody: boolean
}

export type TraversalMetadata = {
	readonly hasThrowStatements: boolean
	readonly hasAwaitExpressions: boolean
	readonly hasGlobalAccess: boolean
	readonly cyclomaticComplexity: number
	readonly hasReturnStatements: boolean
}

export type ExtractFunctionsResult = {
	readonly functions: ReadonlyArray<FunctionNode>
	readonly metadata: TraversalMetadata
}

export default function extractFunctions(
	sourceFile: typescript.SourceFile,
): ExtractFunctionsResult {
	return visitNodes(sourceFile)
}
