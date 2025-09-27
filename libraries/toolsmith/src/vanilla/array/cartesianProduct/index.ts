import isNullish from "../../validation/isNullish/index.ts"

//++ Generates all possible pairs from two arrays
export default function cartesianProduct<T, U>(
	array1: ReadonlyArray<T> | null | undefined,
) {
	return function cartesianProductWithFirstArray(
		array2: ReadonlyArray<U> | null | undefined,
	): Array<[T, U]> {
		if (
			isNullish(array1) ||
			!Array.isArray(array1) ||
			array1.length === 0 ||
			isNullish(array2) ||
			!Array.isArray(array2) ||
			array2.length === 0
		) {
			return []
		}

		// Use flatMap for efficient generation
		return array1.flatMap(function mapFirstElement(element1) {
			return array2.map(function pairElements(element2) {
				return [element1, element2] as [T, U]
			})
		})
	}
}

//?? [EXAMPLE] `cartesianProduct([1, 2])([3, 4]) // [[1, 3], [1, 4], [2, 3], [2, 4]]`
//?? [EXAMPLE] `cartesianProduct(["a", "b"])(["x", "y", "z"]) // [["a", "x"], ["a", "y"], ["a", "z"], ["b", "x"], ["b", "y"], ["b", "z"]]`
//?? [EXAMPLE] `cartesianProduct([0, 1, 2])([0, 1]) // [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]]`
//?? [EXAMPLE] `cartesianProduct([])([1, 2])    // []`
//?? [EXAMPLE] `cartesianProduct([1, 2])([])    // []`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Product combinations
 | const sizes = ["S", "M", "L"]
 | const colors = ["red", "blue"]
 | cartesianProduct(sizes)(colors)
 | // [["S", "red"], ["S", "blue"], ["M", "red"], ["M", "blue"], ["L", "red"], ["L", "blue"]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const withColors = cartesianProduct(["red", "green", "blue"])
 | withColors(["circle", "square"])
 | // [["red", "circle"], ["red", "square"], ["green", "circle"], ["green", "square"], ["blue", "circle"], ["blue", "square"]]
 | ```
 */
