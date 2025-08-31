import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the last element of an array
 *
 * Safe accessor that returns undefined for empty arrays rather than
 * throwing or returning undefined behavior. Also handles null/undefined
 * arrays gracefully.
 *
 * @param array - The array to get the last element from
 * @returns The last element or undefined if array is empty/null
 *
 * @pure
 * @safe
 *
 * @example
 * ```typescript
 * // Basic usage
 * last([1, 2, 3]) // 3
 * last(["a", "b", "c"]) // "c"
 * last([42]) // 42
 *
 * // Objects
 * last([{ id: 1 }, { id: 2 }]) // { id: 2 }
 *
 * // Edge cases
 * last([]) // undefined
 * last(null) // undefined
 * last(undefined) // undefined
 * last([undefined, null, 5]) // 5
 * ```
 */
const last = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined =>
	isNullish(array) || !Array.isArray(array) ? undefined : array.at(-1)

export default last
