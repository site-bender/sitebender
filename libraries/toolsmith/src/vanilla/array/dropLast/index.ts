import lte from "../../validation/lte/index.ts"
import max from "../../math/max/index.ts"
import slice from "../slice/index.ts"
import length from "../length/index.ts"

//++ Drops the last n elements
export default function dropLast<T>(n: number) {
	return function dropLastWithN(array: Array<T>): Array<T> {
		if (lte(n)(0)) {
			return array
		}

		return slice(0)(max(0)(length(array) - n))(array)
	}
}

//?? [EXAMPLE] `dropLast(2)([1, 2, 3, 4, 5]) // [1, 2, 3]`
//?? [EXAMPLE] `dropLast(0)([1, 2, 3])       // [1, 2, 3]`
//?? [EXAMPLE] `dropLast(10)([1, 2, 3])      // []`
//?? [EXAMPLE] `dropLast(-1)([1, 2, 3])      // [1, 2, 3] (negative treated as 0)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Remove trailing items
 | const removeFooter = dropLast(1)
 | removeFooter(["data1", "data2", "footer"]) // ["data1", "data2"]
 | ```
 */
