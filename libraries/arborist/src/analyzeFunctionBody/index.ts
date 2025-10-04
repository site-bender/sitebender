// @sitebender/arborist/src/analyzeFunctionBody
// Analyzes function body to detect patterns and calculate complexity

import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type { FunctionBody } from "../types/index.ts"
import collectASTNodes from "../_helpers/collectASTNodes/index.ts"
import createInitialState from "./createInitialState/index.ts"
import updateStateForNode from "./updateStateForNode/index.ts"

//++ Analyzes a function body AST node and returns analysis results
//++ Detects: return, throw, await, try-catch, loops
//++ Calculates cyclomatic complexity
//++ Pure function - no mutations
export default function analyzeFunctionBody(body: unknown): FunctionBody {
	// Collect all nodes from the AST
	const allNodes = collectASTNodes(body)

	// Use Toolsmith reduce instead of OOP method
	return reduce(
		function reduceNodes(state: FunctionBody, node: unknown): FunctionBody {
			return updateStateForNode(state)(node)
		},
	)(createInitialState())(allNodes)
}
