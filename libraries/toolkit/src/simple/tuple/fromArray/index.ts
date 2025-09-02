import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts an array to a tuple with runtime validation
 *
 * Attempts to convert a regular array into a tuple (Singleton, Pair, or Triple)
 * based on the requested size. Returns null if the array doesn't have the
 * expected length. This provides type safety when converting from dynamic
 * arrays to fixed-size tuples.
 *
 * The function is curried to allow partial application for specific sizes.
 *
 * @param size - The expected tuple size (1, 2, or 3)
 * @param array - The array to convert
 * @returns A tuple of the specified size, or null if conversion fails
 * @example
 * ```typescript
 * // Creating tuples from arrays
 * fromArray(1)([42]) // [42] as Singleton
 * fromArray(2)(["key", "value"]) // ["key", "value"] as Pair
 * fromArray(3)([1, 2, 3]) // [1, 2, 3] as Triple
 *
 * // Wrong length returns null
 * fromArray(2)([1, 2, 3]) // null
 * fromArray(3)([1, 2]) // null
 *
 * // Partial application for specific sizes
 * const toPair = fromArray(2)
 * const toTriple = fromArray(3)
 * toPair(["a", "b"]) // ["a", "b"]
 * toTriple([1, 2, 3]) // [1, 2, 3]
 *
 * // Safe conversion with validation
 * const parseCoordinates = (input: unknown[]): Pair<number, number> | null => {
 *   if (input.every(x => typeof x === "number")) {
 *     return fromArray(2)(input as number[])
 *   }
 *   return null
 * }
 * parseCoordinates([3, 4]) // [3, 4]
 * parseCoordinates([3, "4"]) // null
 *
 * // Null/undefined handling
 * fromArray(2)(null) // null
 * fromArray(2)([]) // null
 * ```
 * @pure
 * @curried
 * @safe
 */
function fromArray(
	size: 1,
): <T>(array: ReadonlyArray<T> | null | undefined) => Singleton<T> | null
function fromArray(
	size: 2,
): <T>(array: ReadonlyArray<T> | null | undefined) => Pair<T, T> | null
function fromArray(
	size: 3,
): <T>(array: ReadonlyArray<T> | null | undefined) => Triple<T, T, T> | null

function fromArray(size: 1 | 2 | 3) {
	return <T>(array: ReadonlyArray<T> | null | undefined) => {
		if (isNullish(array) || !Array.isArray(array) || array.length !== size) {
			return null
		}

		if (size === 1) {
			return [array[0]] as Singleton<T>
		} else if (size === 2) {
			return [array[0], array[1]] as Pair<T, T>
		} else {
			return [array[0], array[1], array[2]] as Triple<T, T, T>
		}
	}
}

export default fromArray
