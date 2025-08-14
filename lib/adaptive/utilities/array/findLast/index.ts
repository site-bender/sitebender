/**
 * Finds the last element in an array that matches a predicate function
 * 
 * @param predicate - Function to test each element (value, index, array) => boolean
 * @returns Function that takes an array and returns the last matching element or undefined
 * @example
 * ```typescript
 * findLast((n: number) => n > 2)([1, 3, 2, 4]) // 4
 * findLast((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // "hi"
 * findLast((n: number) => n > 10)([1, 2, 3]) // undefined
 * ```
 */
const findLast = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): T | undefined => array.findLast(predicate)

export default findLast
