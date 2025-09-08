//++ Extracts all function nodes from a TypeScript source file
import * as typescript from "npm:typescript@5.7.2"
import visitNodes from "./visitNodes/index.ts"

export type FunctionNode = {
	readonly name: string
	readonly node: typescript.FunctionDeclaration | typescript.FunctionExpression | typescript.ArrowFunction | typescript.MethodDeclaration
	readonly isDefault: boolean
	readonly isExported: boolean
	readonly startPos: number
	readonly endPos: number
	readonly hasBody: boolean
}

export default function extractFunctions(
	sourceFile: typescript.SourceFile,
): ReadonlyArray<FunctionNode> {
	return visitNodes(sourceFile)
}

//?? extractFunctions(sourceFile) // Returns all functions found in the file