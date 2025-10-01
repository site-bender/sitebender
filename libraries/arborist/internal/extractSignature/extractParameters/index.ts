import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import * as typescript from "npm:typescript@5.7.2"

import type { Parameter } from "../../types/index.ts"

import transformParameter from "./transformParameter/index.ts"

//++ Converts function parameters to Parameter array
export default function extractParameters(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): ReadonlyArray<Parameter> {
	if (!node.parameters) {
		return []
	}

	const parametersArray = Array.from(node.parameters)

	return map(transformParameter(sourceFile))(parametersArray)
}
