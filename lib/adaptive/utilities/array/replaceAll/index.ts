/**
 * Replaces all occurrences of a target item with the result of a replacer function
 * 
 * @param target - The item to replace
 * @returns Function that takes a replacer function and returns a function that replaces all occurrences
 * @example
 * ```typescript
 * replaceAll(2)((n) => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 20, 4]
 * replaceAll("old")(() => "new")(["old", "test", "old"]) // ["new", "test", "new"]
 * ```
 */
const replaceAll = <T>(target: T) =>
(replacer: (item: T) => T) =>
(
	array: Array<T>,
): Array<T> => array.map((item) => (item === target ? replacer(item) : item))

export default replaceAll
