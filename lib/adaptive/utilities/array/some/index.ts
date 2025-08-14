/**
 * Tests whether at least one element in an array passes a test function
 * 
 * @param predicate - Function to test each element (value, index, array) => boolean
 * @returns Function that takes an array and returns true if any element passes the test
 * @example
 * ```typescript
 * some((n: number) => n > 2)([1, 2, 3]) // true
 * some((n: number) => n < 0)([1, 2, 3]) // false
 * ```
 */
const some = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): boolean => array.some(predicate)

export default some
