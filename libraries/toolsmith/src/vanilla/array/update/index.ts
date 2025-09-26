import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns a new array with the element at index replaced by the result of a function
 |
 | Applies a transformation function to the element at the specified index,
 | returning a new array with the transformed element. If the index is out
 | of bounds, returns a copy of the original array unchanged. Negative
 | indices count from the end. Useful for immutable updates, state
 | transformations, or conditional modifications.
 */
const update = <T>(
	index: number,
) =>
(
	fn: (value: T) => T,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Handle negative index
	const actualIndex = index < 0 ? array.length + index : index

	// Check bounds
	if (actualIndex < 0 || actualIndex >= array.length) {
		return [...array]
	}

	// Create new array with updated element
	const result = [...array]
	result[actualIndex] = fn(array[actualIndex])

	return result
}

export default update

//?? [EXAMPLE] `update(1)((x: number) => x * 2)([1, 2, 3, 4]) // [1, 4, 3, 4]`
//?? [EXAMPLE] `update(0)((s: string) => s.toUpperCase())(["hello", "world"]) // ["HELLO", "world"]`
//?? [EXAMPLE] `update(-1)((x: number) => x * 10)([1, 2, 3, 4]) // [1, 2, 3, 40]`
//?? [EXAMPLE] `update(10)((x: number) => x * 2)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `update(1)((u: {active: boolean}) => ({ ...u, active: false }))([{ id: 1, name: "Alice", active: true }, { id: 2, name: "Bob", active: true }]) // [{ id: 1, name: "Alice", active: true }, { id: 2, name: "Bob", active: false }]`
//?? [EXAMPLE] `update(0)((x: number) => x + 1)(null) // []`
