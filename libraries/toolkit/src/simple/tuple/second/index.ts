/**
 * Extracts the second element from a tuple or array
 *
 * Type-safe function that extracts the second element from Pair, Triple,
 * or longer tuples/arrays. For tuples, the return type is precisely inferred.
 * Returns null for arrays with fewer than 2 elements or invalid inputs.
 *
 * This function provides stronger type inference than generic array access
 * when used with tuples, as it preserves the exact type of the second element.
 *
 * @param tuple - A tuple or array with at least 2 elements
 * @returns The second element, or undefined if the input has fewer than 2 elements
 * @example
 * ```typescript
 * // Basic usage
 * second(["key", "value"])  // "value"
 * second([10, 20, 30])       // 20
 * second(["a", "b", "c"])    // "b"
 *
 * // Type inference with tuples
 * import type { Pair, Triple } from "../../../types/tuple"
 * const p: Pair<string, number> = ["hello", 42]
 * second(p)  // 42 (inferred as number)
 *
 * // Edge cases
 * second([1])       // undefined
 * second([])        // undefined
 * second(null)      // undefined
 * second(undefined) // undefined
 *
 * // With map for extracting seconds
 * import { map } from "../../array/map"
 * const pairs = [[1, 2], [3, 4], [5, 6]]
 * map(second)(pairs)  // [2, 4, 6]
 *
 * // Practical: extracting values from key-value pairs
 * const entries: Array<Pair<string, number>> = [
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 1]
 * ]
 * entries.filter(p => second(p) === 1)  // [["a", 1], ["c", 1]]
 * ```
 * @pure
 * @safe
 */
const second = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (tuple == null || !Array.isArray(tuple) || tuple.length < 2) {
		return undefined
	}

	return tuple[1]
}

export default second
