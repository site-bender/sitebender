/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper: generates cartesian product of two arrays using functional composition.
 */

import flatMap from "../../../array/flatMap/index.ts"
import map from "../../../array/map/index.ts"

export default function _cartesianProductArray<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _cartesianProductArrayWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]> {
		// Use flatMap to generate all pairs functionally
		// For each element in array1, map each element in array2 to a tuple
		return flatMap(function generatePairsForElement(item1: T) {
			return map(function createPair(item2: U): [T, U] {
				return [item1, item2]
			})(array2)
		})(array1)
	}
}
