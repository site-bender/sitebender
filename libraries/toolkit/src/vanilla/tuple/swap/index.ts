import type { Pair } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Swaps the elements of a pair
 *
 * Takes a pair [a, b] and returns a new pair [b, a] with the elements
 * in reversed order. This is useful for reordering key-value pairs,
 * coordinates, or any binary relationship where the order needs to be flipped.
 *
 * @param pair - The pair to swap
 * @returns A new pair with swapped elements
 * @example
 * ```typescript
 * // Basic swap
 * swap([1, 2])              // [2, 1]
 * swap(["hello", "world"])  // ["world", "hello"]
 * swap([42, "answer"])      // ["answer", 42]
 *
 * // Double swap is identity
 * import type { Pair } from "../../../types/tuple"
 * const original: Pair<string, number> = ["test", 123]
 * swap(swap(original))  // ["test", 123] - back to original
 *
 * // Building reverse mappings
 * const entries: Array<Pair<string, number>> = [
 *   ["one", 1],
 *   ["two", 2],
 *   ["three", 3]
 * ]
 * entries.map(swap)  // [[1, "one"], [2, "two"], [3, "three"]]
 *
 * // Invalid input handling
 * swap(null)       // [undefined, undefined]
 * swap(undefined)  // [undefined, undefined]
 *
 * // Practical: inverting key-value pairs
 * const kvPairs: Array<Pair<string, number>> = [
 *   ["a", 1],
 *   ["b", 2]
 * ]
 * Object.fromEntries(kvPairs.map(swap))  // { 1: "a", 2: "b" }
 * ```
 * @pure
 * @idempotent - When applied twice
 */
const swap = <T, U>(
	pair: Pair<T, U> | null | undefined,
): Pair<U, T> => {
	if (isNullish(pair) || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<U, T>
	}

	return [pair[1], pair[0]]
}

export default swap
