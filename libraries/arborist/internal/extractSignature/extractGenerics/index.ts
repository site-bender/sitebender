import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
//++ Extracts generic type parameters from a function node
import * as typescript from "npm:typescript@5.7.2"

import type { Generic } from "../../types/index.ts"

import transformGeneric from "./transformGeneric/index.ts"

export default function extractGenerics(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): Array<Generic> {
	// Check if node has type parameters
	if (!node.typeParameters || node.typeParameters.length === 0) {
		return []
	}

	// Transform each type parameter to Generic object
	return map(transformGeneric(sourceFile))(
		Array.from(node.typeParameters),
	)
}

//?? [EXAMPLE] const generics = extractGenerics(functionNode, sourceFile)
//?? [EXAMPLE] generics // ["T", "K extends keyof T"]
//?? [EXAMPLE] generics // []
