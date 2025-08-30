import isNullish from "../../validation/isNullish/index.ts"

/**
 * Extracts the first element from a tuple or array
 *
 * Type-safe function that extracts the first element from any tuple type
 * (Singleton, Pair, Triple) or array. For tuples, the return type is
 * precisely inferred. Returns undefined for empty arrays or invalid inputs.
 *
 * This function provides stronger type inference than the generic array
 * `head` or `first` functions when used with tuples, as it preserves
 * the exact type of the first element.
 *
 * @param tuple - A tuple or array to extract the first element from
 * @returns The first element, or undefined if the input is empty or invalid
 * @example
 * ```typescript
 * // With different tuple types
 * first([42]) // 42
 * first(["key", "value"]) // "key"
 * first([10, 20, 30]) // 10
 *
 * // Type inference with tuples
 * import { Pair, Triple } from "../../../types/tuple"
 * const p: Pair<string, number> = ["hello", 42]
 * first(p) // "hello" (inferred as string)
 *
 * // With regular arrays
 * first([1, 2, 3, 4, 5]) // 1
 * first([]) // undefined
 * first(null) // undefined
 *
 * // Extracting from coordinates
 * const point2D: Pair<number, number> = [3, 4]
 * const x = first(point2D) // 3
 *
 * // Mapping over arrays of tuples
 * import { map } from "../../array/map"
 * const pairs = [[1, 2], [3, 4], [5, 6]]
 * map(first)(pairs) // [1, 3, 5]
 * ```
 * @pure
 * @safe
 */
const first = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(tuple) || !Array.isArray(tuple) || tuple.length === 0) {
		return undefined
	}

	return tuple[0]
}

export default first
