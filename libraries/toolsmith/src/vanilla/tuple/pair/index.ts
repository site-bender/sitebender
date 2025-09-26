import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Creates a two-element tuple (Pair) from two values
 *
 * A pair tuple is the most common tuple type, providing a type-safe way
 * to group exactly two values together. This is useful for:
 * - Key-value pairs in mappings and dictionaries
 * - Coordinates in 2D space (x, y)
 * - Success/error result pairs
 * - Any binary relationship between two values
 *
 * The function is curried to allow partial application and composition,
 * making it easy to create specialized pair constructors.
 *
 * @param second - The second element of the pair
 * @param first - The first element of the pair
 * @returns A tuple containing exactly two elements
 * @example
 * ```typescript
 * // Basic usage
 * pair(20)(10) // [10, 20]
 * pair("value")("key") // ["key", "value"]
 * pair(true)(42) // [42, true]
 *
 * // Type safety - result is Pair<T, U>
 * const coord: Pair<number, number> = pair(5)(3) // [3, 5]
 *
 * // Partial application for coordinates
 * const withY = (y: number) => (x: number) => pair(y)(x)
 * const atY10 = withY(10)
 * atY10(5) // [5, 10]
 * atY10(15) // [15, 10]
 *
 * // Building collections of pairs
 * const keys = ["name", "age", "city"]
 * const values = ["Alice", 30, "NYC"]
 * const entries = keys.map((key, i) => pair(values[i])(key))
 * // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
 *
 * // Pairing with index
 * const withIndex = <T>(arr: T[]): Array<Pair<number, T>> =>
 *   arr.map((item, i) => pair(item)(i))
 * withIndex(["a", "b", "c"]) // [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 * @pure
 * @curried
 */
export default function pair<U>(second: U) {
	return function pairWithFirst<T>(first: T): Pair<T, U> {
		return [first, second]
	}
}
