/**
 * Returns the element at a specific index in an array
 * 
 * @param index - Index to get element from (must be valid)
 * @returns Function that takes an array and returns element at index or undefined
 * @example
 * ```typescript
 * nth(1)([1, 2, 3]) // 2
 * nth(0)(["a", "b", "c"]) // "a"
 * nth(10)([1, 2, 3]) // undefined
 * ```
 */
const nth = (index: number) => <T>(array: Array<T>): T | undefined =>
	index >= 0 && index < array.length ? array.at(index) : undefined

export default nth
