import isArray from "../../validation/isArray/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import gte from "../../validation/gte/index.ts"
import lte from "../../validation/lte/index.ts"
import length from "../length/index.ts"
import _buildCombinations from "./_buildCombinations/index.ts"

//++ Generates all k-element combinations
export default function combinations<T>(k: number) {
	return function combinationsWithK(
		array: ReadonlyArray<T> | null | undefined,
	): Array<Array<T>> {
		if (isEqual(k)(0)) {
			return [[]]
		}

		if (isArray(array) && isInteger(k) && gte(0)(k) && lte(k)(length(array))) {
			if (isEqual(k)(length(array))) {
				return [[...array]]
			}

			return _buildCombinations(array, k, 0) as Array<Array<T>>
		}

		return []
	}
}

//?? [GOTCHA] Combinations grow exponentially! C(30,15) = 155,117,520 results will exhaust memory
//?? [GOTCHA] Safe: C(100,1) = 100, C(100,99) = 100. Dangerous: C(30,15), C(50,25)
//?? [EXAMPLE] `combinations(2)([1, 2, 3, 4]) // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]`
//?? [EXAMPLE] `combinations(3)(["a", "b", "c", "d"]) // [["a", "b", "c"], ["a", "b", "d"], ["a", "c", "d"], ["b", "c", "d"]]`
//?? [EXAMPLE] `combinations(1)([1, 2, 3])  // [[1], [2], [3]]`
//?? [EXAMPLE] `combinations(3)([1, 2, 3])  // [[1, 2, 3]]`
//?? [EXAMPLE] `combinations(0)([1, 2, 3])  // [[]]`
//?? [EXAMPLE] `combinations(5)([1, 2, 3])  // []`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Team selection
 | const players = ["Alice", "Bob", "Charlie", "Dave"]
 | combinations(2)(players)
 | // [["Alice", "Bob"], ["Alice", "Charlie"], ["Alice", "Dave"], ["Bob", "Charlie"], ["Bob", "Dave"], ["Charlie", "Dave"]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const pickTwo = combinations(2)
 | pickTwo([1, 2, 3])        // [[1, 2], [1, 3], [2, 3]]
 | pickTwo(["x", "y", "z"])   // [["x", "y"], ["x", "z"], ["y", "z"]]
 | ```
 */
