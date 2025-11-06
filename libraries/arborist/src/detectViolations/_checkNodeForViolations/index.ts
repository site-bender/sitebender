//++ Checks if node matches a violation type and returns updated state
type ViolationState = Readonly<{
	arrowFunctions: ReadonlyArray<Position>
	classes: ReadonlyArray<Position>
	throwStatements: ReadonlyArray<Position>
	tryCatchBlocks: ReadonlyArray<Position>
	loops: ReadonlyArray<Position>
	mutations: ReadonlyArray<Position>
}>

import type { Position } from "../../types/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

export default function _checkNodeForViolations(state: ViolationState) {
	return function _checkNodeForViolationsWithState(
		node: unknown,
	): ViolationState {
		if (!node || typeof node !== "object") {
			return state
		}

		const n = node as Record<string, unknown>
		const nodeType = n.type as string | undefined

		if (!nodeType) {
			return state
		}

		const span = (n as { span?: { start: number } }).span
		if (!span) {
			return state
		}

		const position: Position = {
			line: span.start,
			column: 0,
		}

		// Check for arrow functions
		if (isEqual(nodeType)("ArrowFunctionExpression")) {
			return {
				...state,
				arrowFunctions: [...state.arrowFunctions, position],
			}
		}

		// Check for classes
		if (isEqual(nodeType)("ClassDeclaration")) {
			return {
				...state,
				classes: [...state.classes, position],
			}
		}

		// Check for throw statements
		if (isEqual(nodeType)("ThrowStatement")) {
			return {
				...state,
				throwStatements: [...state.throwStatements, position],
			}
		}

		// Check for try/catch blocks
		if (isEqual(nodeType)("TryStatement")) {
			return {
				...state,
				tryCatchBlocks: [...state.tryCatchBlocks, position],
			}
		}

		// Check for loops
		if (
			isEqual(nodeType)("ForStatement") ||
			isEqual(nodeType)("ForInStatement") ||
			isEqual(nodeType)("ForOfStatement") ||
			isEqual(nodeType)("WhileStatement") ||
			isEqual(nodeType)("DoWhileStatement")
		) {
			return {
				...state,
				loops: [...state.loops, position],
			}
		}

		// Check for mutations (update expressions: ++, --, +=, etc.)
		if (isEqual(nodeType)("UpdateExpression")) {
			return {
				...state,
				mutations: [...state.mutations, position],
			}
		}

		// Check for assignment mutations
		if (isEqual(nodeType)("AssignmentExpression")) {
			return {
				...state,
				mutations: [...state.mutations, position],
			}
		}

		return state
	}
}
