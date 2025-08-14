/**
 * Tests whether all elements in an array pass a test function
 * 
 * @param f - Function to test each element (item, index, array) => boolean
 * @returns Function that takes an array and returns true if all elements pass the test
 * @example
 * ```typescript
 * all((n: number) => n > 0)([1, 2, 3]) // true
 * all((n: number) => n > 2)([1, 2, 3]) // false
 * ```
 */
const all =
	<T>(f: (item: T, index: number, array: Array<T>) => boolean) =>
	(arr: Array<T>): boolean => arr.every(f)

export default all
