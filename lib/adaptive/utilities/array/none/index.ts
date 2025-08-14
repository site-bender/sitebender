/**
 * Tests whether no elements in an array pass a test function
 * 
 * @param predicate - Function to test each element
 * @returns Function that takes an array and returns true if no elements pass the test
 * @example
 * ```typescript
 * none((n: number) => n < 0)([1, 2, 3]) // true
 * none((n: number) => n > 2)([1, 2, 3]) // false
 * ```
 */
const none = <T>(predicate: (item: T) => boolean) => (arr: Array<T>): boolean =>
	!arr.some(predicate)

export default none
