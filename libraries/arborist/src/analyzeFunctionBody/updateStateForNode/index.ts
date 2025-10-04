// @sitebender/arborist/src/analyzeFunctionBody/updateStateForNode
// Updates analysis state based on AST node type

import type { FunctionBody } from "../../types/index.ts"

//++ Updates analysis state based on node type (pure function)
//++ Returns new state with updated flags and complexity
export default function updateStateForNode(
	state: FunctionBody,
) {
	return function updateStateForNodeWithState(node: unknown): FunctionBody {
		const nodeObj = node as Record<string, unknown>
		const nodeType = nodeObj.type as string

		// Detect return statements
		if (nodeType === "ReturnStatement") {
			return { ...state, hasReturn: true }
		}

		// Detect throw statements
		if (nodeType === "ThrowStatement") {
			return { ...state, hasThrow: true }
		}

		// Detect await expressions
		if (nodeType === "AwaitExpression") {
			return { ...state, hasAwait: true }
		}

		// Detect try-catch blocks
		if (nodeType === "TryStatement") {
			return { ...state, hasTryCatch: true }
		}

		// Detect loops
		if (
			nodeType === "ForStatement" ||
			nodeType === "ForInStatement" ||
			nodeType === "ForOfStatement" ||
			nodeType === "WhileStatement" ||
			nodeType === "DoWhileStatement"
		) {
			return {
				...state,
				hasLoops: true,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect conditional statements (increase complexity)
		if (nodeType === "IfStatement") {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect conditional expressions (ternary)
		if (nodeType === "ConditionalExpression") {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		// Detect logical operators (&&, ||)
		if (nodeType === "LogicalExpression") {
			const operator = nodeObj.operator as string
			if (operator === "&&" || operator === "||") {
				return {
					...state,
					cyclomaticComplexity: state.cyclomaticComplexity + 1,
				}
			}
		}

		// Detect switch cases
		if (nodeType === "SwitchCase") {
			return {
				...state,
				cyclomaticComplexity: state.cyclomaticComplexity + 1,
			}
		}

		return state
	}
}
