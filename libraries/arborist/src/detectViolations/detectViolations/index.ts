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
import _hasItems from "./_hasItems/index.ts"

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
		hasArrowFunctions: _hasItems(finalState.arrowFunctions),
		arrowFunctions: finalState.arrowFunctions,
		hasClasses: _hasItems(finalState.classes),
		classes: finalState.classes,
		hasThrowStatements: _hasItems(finalState.throwStatements),
		throwStatements: finalState.throwStatements,
		hasTryCatch: _hasItems(finalState.tryCatchBlocks),
		tryCatchBlocks: finalState.tryCatchBlocks,
		hasLoops: _hasItems(finalState.loops),
		loops: finalState.loops,
		hasMutations: _hasItems(finalState.mutations),
		mutations: finalState.mutations,
	}

	return success(violationInfo)
}
