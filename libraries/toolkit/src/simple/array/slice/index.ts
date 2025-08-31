/**
 * Returns a shallow copy of a portion of an array
 *
 * Extracts elements from start index up to (but not including) end index.
 * Negative indices count from the end. If end is omitted, extracts through
 * the end of the array.
 *
 * @param start - Index to start extraction from (inclusive)
 * @param end - Index to end extraction (exclusive), optional
 * @param array - The array to extract from
 * @returns New array containing the extracted elements
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * slice(1)(3)([1, 2, 3, 4, 5]) // [2, 3]
 * slice(2)(undefined)([1, 2, 3, 4, 5]) // [3, 4, 5]
 *
 * // Negative indices
 * slice(-2)(undefined)([1, 2, 3, 4, 5]) // [4, 5]
 * slice(1)(-1)([1, 2, 3, 4, 5]) // [2, 3, 4]
 *
 * // Edge cases
 * slice(0)(2)([]) // []
 * slice(10)(20)([1, 2, 3]) // []
 * ```
 */
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: Array<T>,
): Array<T> => array.slice(start, end)

export default slice
