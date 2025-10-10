//++ Accumulates AST nodes from array items
import _collectAstNodes from "../index.ts"

export default function _reduceArrayValuesWithAccumulator(innerAccumulator: ReadonlyArray<unknown>) {
	return function (item: unknown): ReadonlyArray<unknown> {
		return [...innerAccumulator, ..._collectAstNodes(item)]
	}
}
