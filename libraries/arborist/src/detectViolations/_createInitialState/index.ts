//++ Creates initial empty violation state
type ViolationState = Readonly<{
	arrowFunctions: ReadonlyArray<Position>
	classes: ReadonlyArray<Position>
	throwStatements: ReadonlyArray<Position>
	tryCatchBlocks: ReadonlyArray<Position>
	loops: ReadonlyArray<Position>
	mutations: ReadonlyArray<Position>
}>

import type { Position } from "../../types/index.ts"

export default function _createInitialState(): ViolationState {
	return {
		arrowFunctions: [],
		classes: [],
		throwStatements: [],
		tryCatchBlocks: [],
		loops: [],
		mutations: [],
	}
}
