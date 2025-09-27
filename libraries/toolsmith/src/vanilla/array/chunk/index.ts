import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import chunkRecursive from "./chunkRecursive/index.ts"

//++ Splits an array into fixed-size chunks
export default function chunk<T>(size: number) {
	return function chunkWithSize(
		array: ReadonlyArray<T> | null | undefined,
	): Array<Array<T>> {
		if (isNullish(array) || array.length === 0) {
			return []
		}

		if (size <= 0 || not(Number.isInteger(size))) {
			return []
		}

		return chunkRecursive(size, array)
	}
}

//?? [EXAMPLE] `chunk(2)([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]`
//?? [EXAMPLE] `chunk(3)([1, 2, 3, 4, 5, 6, 7, 8]) // [[1, 2, 3], [4, 5, 6], [7, 8]]`
//?? [EXAMPLE] `chunk(10)([1, 2, 3])  // [[1, 2, 3]]`
//?? [EXAMPLE] `chunk(1)([1, 2, 3])   // [[1], [2], [3]]`
//?? [EXAMPLE] `chunk(0)([1, 2, 3])   // []`
//?? [EXAMPLE] `chunk(3)([])          // []`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Batch processing
 | const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 | chunk(3)(ids)
 | // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const pairwise = chunk(2)
 | pairwise([1, 2, 3, 4])     // [[1, 2], [3, 4]]
 | pairwise(["a", "b", "c"])   // [["a", "b"], ["c"]]
 | ```
 */
