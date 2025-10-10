//++ Detects constitutional rule violations in AST
//++ Returns Validation with ViolationInfo containing all detected violations
//++ Detects: arrow functions, classes, throw statements, try/catch, loops, mutations
type ViolationState = Readonly<{
	arrowFunctions: ReadonlyArray<Position>
	classes: ReadonlyArray<Position>
	throwStatements: ReadonlyArray<Position>
	tryCatchBlocks: ReadonlyArray<Position>
	loops: ReadonlyArray<Position>
	mutations: ReadonlyArray<Position>
}>

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { ModuleItem } from "npm:@swc/wasm-web@1.13.20"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ParsedAst, Position, ViolationInfo } from "../../types/index.ts"
import type { ViolationDetectionError } from "../../types/errors/index.ts"

import _createInitialState from "../_createInitialState/index.ts"
import _checkNodeForViolations from "../_checkNodeForViolations/index.ts"
import _collectAllNodes from "../_collectAllNodes/index.ts"

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
