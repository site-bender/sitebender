import isNullish from "../../validation/isNullish/index.ts"

/*++
Returns the Cartesian product of two arrays (all possible pairs)

Creates an array containing all possible ordered pairs [a, b] where 'a'
is from the first array and 'b' is from the second array. The result
has length array1.length × array2.length. Order is preserved: all pairs
with the first element from array1[0] come before pairs with array1[1].
Useful for generating combinations, test cases, or coordinate grids.
*/
const cartesianProduct = <T, U>(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
): Array<[T, U]> => {
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
	return array1.flatMap((element1) =>
		array2.map((element2) => [element1, element2] as [T, U])
	)
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

export default cartesianProduct
