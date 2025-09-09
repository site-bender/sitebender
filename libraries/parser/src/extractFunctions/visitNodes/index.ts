//++ Recursively visits all nodes in AST to find functions
import * as typescript from "npm:typescript@5.7.2"

import type { FunctionNode } from "../index.ts"

import visit from "./visit/index.ts"

export default function visitNodes(
	sourceFile: typescript.SourceFile,
): ReadonlyArray<FunctionNode> {
	const accumulator: Array<FunctionNode> = []

	typescript.forEachChild(sourceFile, visit(accumulator))
	return accumulator
}

//?? [EXAMPLE] const functions = visitNodes(sourceFile) // Returns all function nodes
//?? [EXAMPLE] visitNodes(sourceFile).length // Count of functions in file
//?? [PRO] Returns immutable ReadonlyArray for safety
