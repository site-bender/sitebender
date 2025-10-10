// @sitebender/arborist/src/analyzeFunctionBody/updateStateForNode
// Updates analysis state based on AST node type

import type { FunctionBody } from "../../types/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Updates analysis state based on node type (pure function)
//++ Returns new state with updated flags and complexity
export default function updateStateForNode(
	state: FunctionBody,
) {
	return function updateStateForNodeWithState(node: unknown): FunctionBody {
		const nodeObj = node as Record<string, unknown>
		const nodeType = nodeObj.type as string

		// Detect return statements
		if (isEqual(nodeType)("ReturnStatement")) {
			return { ...state, hasReturn: true }
		}

		// Detect throw statements
		if (isEqual(nodeType)("ThrowStatement")) {
			return { ...state, hasThrow: true }
		}

		// Detect await expressions
		if (isEqual(nodeType)("AwaitExpression")) {
			return { ...state, hasAwait: true }
		}

		// Detect try-catch blocks
		if (isEqual(nodeType)("TryStatement")) {
			return { ...state, hasTryCatch: true }
		}

		// Detect loops
		if (
			isEqual(nodeType)("ForStatement") ||
			isEqual(nodeType)("ForInStatement") ||
			isEqual(nodeType)("ForOfStatement") ||
			isEqual(nodeType)("WhileStatement") ||
			isEqual(nodeType)("DoWhileStatement")
		) {
			return {
				...state,
				hasLoops: true,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect conditional statements (increase complexity)
		if (isEqual(nodeType)("IfStatement")) {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect conditional expressions (ternary)
		if (isEqual(nodeType)("ConditionalExpression")) {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect logical operators (&&, ||)
		if (isEqual(nodeType)("LogicalExpression")) {
			const operator = nodeObj.operator as string
			if (isEqual(operator)("&&") || isEqual(operator)("||")) {
				return {
					...state,
					cyclomaticComplexity: state.cyclomaticComplexity + 1,
				}
			}
		}

		// Detect switch cases
		if (isEqual(nodeType)("SwitchCase")) {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		return state
	}
}
