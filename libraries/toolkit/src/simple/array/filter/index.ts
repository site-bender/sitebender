/**
 * Filters an array to keep only elements that satisfy a predicate
 *
 * Creates a new array containing only elements for which the predicate
 * returns truthy. Preserves original order of kept elements.
 *
 * @property idempotent - With deterministic predicates, filtering already filtered array gives same result
 * @curried (predicate) => (array) => result
 * @param predicate - Function that returns truthy for items to keep
 * @param array - The array to filter
 * @returns New array with only elements that satisfy the predicate
 * @example
 * ```typescript
 * filter((n: number) => n > 2)([1, 2, 3, 4]) // [3, 4]
 * filter((s: string) => s.length > 3)(["hi", "hello"]) // ["hello"]
 *
 * // Compose with other functions
 * const keepPositive = filter((n: number) => n > 0)
 * const keepEven = filter((n: number) => n % 2 === 0)
 * keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4])) // [2, 4]
 * ```
 */
const filter =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): Array<T> =>
		array.filter(predicate)

export default filter
