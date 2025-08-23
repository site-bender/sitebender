/**
 * Checks if an array is empty
 * 
 * Returns true if the array has no elements (length is 0),
 * false otherwise. Returns false for non-array values to maintain
 * type safety and predictable behavior.
 * 
 * @param array - The array to check
 * @returns True if array is empty, false otherwise (including non-arrays)
 * @example
 * ```typescript
 * isEmpty([]) // true
 * isEmpty([1, 2, 3]) // false
 * isEmpty([undefined]) // false (has one element)
 * isEmpty([null]) // false (has one element)
 * 
 * // Non-arrays return false
 * isEmpty(null as any) // false
 * isEmpty(undefined as any) // false
 * isEmpty("" as any) // false
 * isEmpty({} as any) // false
 * 
 * // Use in conditionals
 * if (isEmpty(results)) {
 *   console.log("No results found")
 * }
 * 
 * // Filter out empty arrays
 * const arrays = [[], [1], [], [2, 3]]
 * arrays.filter(arr => !isEmpty(arr)) // [[1], [2, 3]]
 * ```
 */
const isEmpty = <T>(array: Array<T>): boolean => 
	Array.isArray(array) && array.length === 0

export default isEmpty