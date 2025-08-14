/**
 * Checks if an array includes a specific item
 * 
 * @param item - The item to search for
 * @param array - The array to search in
 * @returns True if the item is found, false otherwise
 * @example
 * ```typescript
 * includes(3)([1, 2, 3, 4]) // true
 * includes("hello")(["hi", "bye"]) // false
 * ```
 */
export default function includes<T>(item: T) {
	return (array: Array<T>): boolean => array.includes(item)
}
