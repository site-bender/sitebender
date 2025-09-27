import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Alternates elements from multiple arrays
const interleave = <T>(
	...arrays: Array<Array<T> | null | undefined>
): Array<T> => {
	if (arrays.length === 0) return []

	// Filter out null/undefined arrays and use only valid arrays
	const validArrays = arrays.filter((arr) => not(isNullish(arr))) as Array<
		Array<T>
	>

	if (validArrays.length === 0) return []

	const maxLength = Math.max(...validArrays.map((arr) => arr.length))

	return Array.from({ length: maxLength }, (_, i) =>
		validArrays
			.filter((arr) => i < arr.length)
			.map((arr) => arr[i])).flat()
}

export default interleave

/*??
 | [EXAMPLE]
 | ```typescript
 | interleave([1, 2, 3], ["a", "b", "c"])
 | // [1, "a", 2, "b", 3, "c"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | interleave([1, 2, 3, 4], ["a", "b"])
 | // [1, "a", 2, "b", 3, 4]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | interleave([1, 2], ["a", "b"], [true, false])
 | // [1, "a", true, 2, "b", false]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | const odds = [1, 3, 5, 7]
 | const evens = [2, 4, 6, 8]
 | interleave(odds, evens)
 | // [1, 2, 3, 4, 5, 6, 7, 8]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | interleave([1, 2, 3])         // [1, 2, 3] (single array)
 | interleave()                  // [] (no arrays)
 | interleave([], [1], [])       // [1] (empty arrays)
 | interleave([1, 2], null, [3]) // [1, 3, 2] (null treated as empty)
 | ```
 */
