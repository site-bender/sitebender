/**
 * Returns a shallow copy of a portion of an array
 * 
 * @param start - Index to start extraction from
 * @returns Function that takes an optional end index and returns a function that slices the array
 * @example
 * ```typescript
 * slice(1)(3)([1, 2, 3, 4, 5]) // [2, 3]
 * slice(2)()([1, 2, 3, 4, 5]) // [3, 4, 5]
 * ```
 */
const slice = (start: number) =>
(end?: number) =>
<T>(
	array: Array<T>,
): Array<T> => array.slice(start, end)

export default slice
