/**
 * Removes an element at a specific index from an array
 * 
 * @param count - Index of the element to remove
 * @returns Function that takes an array and returns a new array with element at index removed
 * @example
 * ```typescript
 * removeAt(1)([1, 2, 3, 4]) // [1, 3, 4]
 * removeAt(0)(["a", "b", "c"]) // ["b", "c"]
 * removeAt(10)([1, 2, 3]) // [1, 2, 3] (invalid index, returns copy)
 * ```
 */
const removeAt = <T>(count: number) => (arr: Array<T>): Array<T> =>
	count >= 0 && count < arr.length
		? arr.slice(0, count).concat(arr.slice(count + 1))
		: arr.slice(0)

export default removeAt
