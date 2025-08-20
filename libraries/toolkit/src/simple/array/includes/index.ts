/**
 * Checks if an array contains a specific value
 * 
 * Uses strict equality (===) for comparison. For objects, checks
 * reference equality, not deep equality.
 * 
 * @curried (item) => (array) => boolean
 * @param item - The value to search for
 * @param array - The array to search in
 * @returns true if array contains the item, false otherwise
 * @example
 * ```typescript
 * includes(3)([1, 2, 3, 4]) // true
 * includes("hello")(["hi", "bye"]) // false
 * includes(0)([0, false, null]) // true
 * 
 * // Useful for filtering
 * const hasThree = includes(3)
 * hasThree([1, 2, 3]) // true
 * hasThree([4, 5, 6]) // false
 * ```
 */
const includes = <T>(item: T) => 
	(array: Array<T>): boolean => array.includes(item)

export default includes
