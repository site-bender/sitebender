//++ Detects various properties of a function (async, generator, curried, pure)
import * as typescript from "npm:typescript@5.7.2"

import detectAsync from "./detectAsync/index.ts"
import detectCurried from "./detectCurried/index.ts"
import detectGenerator from "./detectGenerator/index.ts"
import detectPure from "./detectPure/index.ts"

export type FunctionProperties = {
	isAsync: boolean
	isGenerator: boolean
	isCurried: boolean
	isPure: boolean
}

export default function detectProperties(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): FunctionProperties {
	return {
		isAsync: detectAsync(node),
		isGenerator: detectGenerator(node),
		isCurried: detectCurried(node, sourceFile),
		isPure: detectPure(node, sourceFile),
	}
}
