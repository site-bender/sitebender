//++ Reduces array values by accumulating AST nodes from array items
import _collectAstNodes from "../index.ts"
import _reduceArrayValuesWithAccumulator from "../_reduceArrayValuesWithAccumulator/index.ts"

export default function _reduceArrayValues(
	innerAccumulator: ReadonlyArray<unknown>,
) {
	return _reduceArrayValuesWithAccumulator(innerAccumulator)
}
