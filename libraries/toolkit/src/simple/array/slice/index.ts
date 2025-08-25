/**
 * Returns a shallow copy of a portion of an array
 *
 * Extracts elements from start index up to (but not including) end index.
 * Negative indices count from the end. If end is omitted, extracts through
 * the end of the array.
 *
 * @curried (start) => (end) => (array) => result
 * @param start - Index to start extraction from (inclusive)
 * @param end - Index to end extraction (exclusive), optional
 * @param array - The array to extract from
 * @returns New array containing the extracted elements
 * @example
 * ```typescript
 * slice(1)(3)([1, 2, 3, 4, 5]) // [2, 3]
 * slice(2)()([1, 2, 3, 4, 5]) // [3, 4, 5]
 * slice(-2)()([1, 2, 3, 4, 5]) // [4, 5]
 * slice(1)(-1)([1, 2, 3, 4, 5]) // [2, 3, 4]
 *
 * // Extract middle section
 * const getMiddle = slice(1)(4)
 * getMiddle([10, 20, 30, 40, 50]) // [20, 30, 40]
 * ```
 */
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: Array<T>,
): Array<T> => array.slice(start, end)

export default slice
