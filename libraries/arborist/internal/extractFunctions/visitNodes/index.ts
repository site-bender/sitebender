//++ Recursively visits all nodes in AST to find functions
import * as typescript from "npm:typescript@5.7.2"

import type {
	ExtractFunctionsResult,
	FunctionNode,
	TraversalMetadata,
} from "../index.ts"

import visit from "./visit/index.ts"

export default function visitNodes(
	sourceFile: typescript.SourceFile,
): ExtractFunctionsResult {
	const accumulator: Array<FunctionNode> = []
	const metadata: TraversalMetadata = {
		hasThrowStatements: false,
		hasAwaitExpressions: false,
		hasGlobalAccess: false,
		cyclomaticComplexity: 1, // Start at 1 for the main path
		hasReturnStatements: false,
	}

	typescript.forEachChild(sourceFile, visit(accumulator, metadata))

	return {
		functions: accumulator,
		metadata,
	}
}
