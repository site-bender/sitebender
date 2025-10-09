// @sitebender/arborist/src/analyzeFunctionBody
// Analyzes function body to detect patterns and calculate complexity

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { FunctionBody } from "../types/index.ts"
import _collectAstNodes from "./_collectAstNodes/index.ts"
import createInitialState from "./createInitialState/index.ts"
import updateStateForNode from "./updateStateForNode/index.ts"

//++ Analyzes a function body AST node and returns analysis results
//++ Detects: return, throw, await, try-catch, loops
//++ Calculates cyclomatic complexity
//++ Pure function - no mutations
export default function analyzeFunctionBody(body: unknown): FunctionBody {
	// Collect all nodes from the AST
	const allNodes = _collectAstNodes(body)

	// Use Toolsmith reduce with proper currying
	const result = reduce(
		function reduceNodes(state: FunctionBody) {
			return function reduceNodesWithState(node: unknown): FunctionBody {
				return updateStateForNode(state)(node)
			}
		},
	)(createInitialState())(allNodes)

	return getOrElse(createInitialState())(result)
}
