// @sitebender/arborist/src/detectViolations
// Detects constitutional rule violations in TypeScript/JSX AST

import type { Validation } from "~libraries/toolsmith/src/types/validation/index.ts"
import type { ModuleItem } from "npm:@swc/wasm-web@1.13.20"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ParsedAst, Position, ViolationInfo } from "../types/index.ts"
import type { ViolationDetectionError } from "../types/errors/index.ts"

type ViolationState = Readonly<{
	arrowFunctions: ReadonlyArray<Position>
	classes: ReadonlyArray<Position>
	throwStatements: ReadonlyArray<Position>
	tryCatchBlocks: ReadonlyArray<Position>
	loops: ReadonlyArray<Position>
	mutations: ReadonlyArray<Position>
}>

//++ Creates initial empty violation state
function _createInitialState(): ViolationState {
	return {
		arrowFunctions: [],
		classes: [],
		throwStatements: [],
		tryCatchBlocks: [],
		loops: [],
		mutations: [],
	}
}

//++ Checks if node matches a violation type and returns updated state
function _checkNodeForViolations(state: ViolationState) {
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
		if (nodeType === "ArrowFunctionExpression") {
			return {
				...state,
				arrowFunctions: [...state.arrowFunctions, position],
			}
		}

		// Check for classes
		if (nodeType === "ClassDeclaration") {
			return {
				...state,
				classes: [...state.classes, position],
			}
		}

		// Check for throw statements
		if (nodeType === "ThrowStatement") {
			return {
				...state,
				throwStatements: [...state.throwStatements, position],
			}
		}

		// Check for try/catch blocks
		if (nodeType === "TryStatement") {
			return {
				...state,
				tryCatchBlocks: [...state.tryCatchBlocks, position],
			}
		}

		// Check for loops
		if (
			nodeType === "ForStatement" ||
			nodeType === "ForInStatement" ||
			nodeType === "ForOfStatement" ||
			nodeType === "WhileStatement" ||
			nodeType === "DoWhileStatement"
		) {
			return {
				...state,
				loops: [...state.loops, position],
			}
		}

		// Check for mutations (update expressions: ++, --, +=, etc.)
		if (nodeType === "UpdateExpression") {
			return {
				...state,
				mutations: [...state.mutations, position],
			}
		}

		// Check for assignment mutations
		if (nodeType === "AssignmentExpression") {
			return {
				...state,
				mutations: [...state.mutations, position],
			}
		}

		return state
	}
}

//++ Recursively walks AST node and collects all child nodes
function _collectAllNodes(node: unknown): ReadonlyArray<unknown> {
	if (!node || typeof node !== "object") {
		return []
	}

	const n = node as Record<string, unknown>
	const currentNode = [node]

	// Collect all property values
	const propertyValues = Object.values(n)

	// Process each property value
	const childNodesResult = reduce(
		function reducePropertyValues(accumulator: ReadonlyArray<unknown>) {
			return function reducePropertyValuesWithAccumulator(
				value: unknown,
			): ReadonlyArray<unknown> {
				if (Array.isArray(value)) {
					// Process array items
					const arrayResult = reduce(
						function reduceArrayItems(
							innerAccumulator: ReadonlyArray<unknown>,
						) {
							return function reduceArrayItemsWithAccumulator(
								item: unknown,
							): ReadonlyArray<unknown> {
								return [...innerAccumulator, ..._collectAllNodes(item)]
							}
						},
					)(accumulator)(value)
					return getOrElse(accumulator)(arrayResult)
				} else if (value && typeof value === "object") {
					return [...accumulator, ..._collectAllNodes(value)]
				}
				return accumulator
			}
		},
	)([] as ReadonlyArray<unknown>)(propertyValues)

	const childNodes = getOrElse([] as ReadonlyArray<unknown>)(childNodesResult)

	return [...currentNode, ...childNodes]
}

//++ Detects constitutional rule violations in AST
//++ Returns Validation with ViolationInfo containing all detected violations
//++ Detects: arrow functions, classes, throw statements, try/catch, loops, mutations
export default function detectViolations(
	ast: ParsedAst,
): Validation<ViolationDetectionError, ViolationInfo> {
	// Collect all nodes from the AST
	const allNodesResult = reduce(
		function reduceModuleItems(accumulator: ReadonlyArray<unknown>) {
			return function reduceModuleItemsWithAccumulator(
				item: ModuleItem,
			): ReadonlyArray<unknown> {
				return [...accumulator, ..._collectAllNodes(item)]
			}
		},
	)([] as ReadonlyArray<unknown>)(ast.module.body)

	const allNodes = getOrElse([] as ReadonlyArray<unknown>)(allNodesResult)

	// Check each node for violations
	const finalStateResult = reduce(
		function reduceNodes(state: ViolationState) {
			return function reduceNodesWithState(node: unknown): ViolationState {
				return _checkNodeForViolations(state)(node)
			}
		},
	)(_createInitialState())(allNodes)

	const finalState = getOrElse(_createInitialState())(finalStateResult)

	const violationInfo: ViolationInfo = {
		hasArrowFunctions: finalState.arrowFunctions.length > 0,
		arrowFunctions: finalState.arrowFunctions,
		hasClasses: finalState.classes.length > 0,
		classes: finalState.classes,
		hasThrowStatements: finalState.throwStatements.length > 0,
		throwStatements: finalState.throwStatements,
		hasTryCatch: finalState.tryCatchBlocks.length > 0,
		tryCatchBlocks: finalState.tryCatchBlocks,
		hasLoops: finalState.loops.length > 0,
		loops: finalState.loops,
		hasMutations: finalState.mutations.length > 0,
		mutations: finalState.mutations,
	}

	return success(violationInfo)
}
