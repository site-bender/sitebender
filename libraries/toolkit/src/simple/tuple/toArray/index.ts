import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts a tuple to a regular array
 *
 * Transforms a tuple (Singleton, Pair, Triple) into a regular array,
 * losing the fixed-length type information but allowing use with
 * standard array operations. This is useful when you need to interface
 * with APIs that expect arrays rather than tuples.
 *
 * @param tuple - The tuple to convert to an array
 * @returns A new array containing the tuple elements
 * @example
 * ```typescript
 * // Basic usage
 * toArray([42])                  // [42]
 * toArray(["hello", "world"])    // ["hello", "world"]
 * toArray([1, 2, 3])             // [1, 2, 3]
 *
 * // Type information is lost (becomes T[])
 * import type { Pair, Triple } from "../../../types/tuple"
 * const p: Pair<string, number> = ["key", 42]
 * toArray(p)  // ["key", 42] as (string | number)[]
 *
 * // Using with array methods
 * const point: Triple<number, number, number> = [1, 2, 3]
 * const arr = toArray(point)
 * Math.max(...arr)              // 3
 * arr.map(x => x * 2)          // [2, 4, 6]
 *
 * // Null/undefined handling
 * toArray(null)       // []
 * toArray(undefined)  // []
 * toArray([])         // []
 *
 * // Building larger arrays from tuples
 * const start: Pair<number, number> = [1, 2]
 * const end: Pair<number, number> = [9, 10]
 * [...toArray(start), 3, 4, 5, ...toArray(end)]  // [1, 2, 3, 4, 5, 9, 10]
 * ```
 * @pure
 * @safe
 */
const toArray = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(tuple) || !Array.isArray(tuple)) {
		return []
	}

	return [...tuple]
}

export default toArray
