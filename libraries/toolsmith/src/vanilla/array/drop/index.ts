import lte from "../../validation/lte/index.ts"
import slice from "../slice/index.ts"

//++ Drops the first n elements
export default function drop<T>(n: number) {
	return function dropWithN(array: Array<T>): Array<T> {
		if (lte(n)(0)) {
			return array
		}

		return slice(n)(undefined)(array)
	}
}

//?? [EXAMPLE] `drop(2)([1, 2, 3, 4, 5]) // [3, 4, 5]`
//?? [EXAMPLE] `drop(0)([1, 2, 3])       // [1, 2, 3]`
//?? [EXAMPLE] `drop(10)([1, 2, 3])      // []`
//?? [EXAMPLE] `drop(-2)([1, 2, 3])      // [1, 2, 3] (negative n treated as 0)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Skip header row
 | const skipHeader = drop(1)
 | skipHeader(["header", "data1", "data2"]) // ["data1", "data2"]
 | ```
 */
