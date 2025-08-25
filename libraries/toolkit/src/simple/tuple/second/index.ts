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
 * // With pair
 * second(["key", "value"])
 * // "value"
 *
 * // With triple
 * second([10, 20, 30])
 * // 20
 *
 * // Type inference with tuples
 * import { Pair, Triple } from "../../../types/tuple"
 *
 * const p: Pair<string, number> = ["hello", 42]
 * const x = second(p)  // x is inferred as number
 * // 42
 *
 * const t: Triple<boolean, string, number> = [true, "test", 99]
 * const y = second(t)  // y is inferred as string
 * // "test"
 *
 * // With regular arrays
 * second([1, 2, 3, 4, 5])
 * // 2
 *
 * second(["a", "b", "c"])
 * // "b"
 *
 * // Arrays with fewer than 2 elements return undefined
 * second([1])
 * // undefined
 *
 * second([])
 * // undefined
 *
 * // Invalid inputs return undefined
 * second(null)
 * // undefined
 *
 * second(undefined)
 * // undefined
 *
 * // With complex types
 * second([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // { id: 2 }
 *
 * second([[1, 2], [3, 4], [5, 6]])
 * // [3, 4]
 *
 * // Extracting from coordinates
 * const point2D: Pair<number, number> = [3, 4]
 * const y_coord = second(point2D)  // 4
 *
 * const point3D: Triple<number, number, number> = [1, 2, 3]
 * const y_coord3D = second(point3D)  // 2
 *
 * // From key-value pairs
 * const entry: Pair<string, any> = ["name", "Alice"]
 * const value = second(entry)  // "Alice"
 *
 * // RGB color extraction
 * type RGB = Triple<number, number, number>
 * const color: RGB = [255, 128, 0]
 * const green = second(color)  // 128
 *
 * // Date component extraction
 * type DateTriple = Triple<number, number, number>  // [year, month, day]
 * const date: DateTriple = [2024, 3, 15]
 * const month = second(date)  // 3
 *
 * // Time extraction
 * type Time = Triple<number, number, number>  // [hours, minutes, seconds]
 * const time: Time = [14, 30, 45]
 * const minutes = second(time)  // 30
 *
 * // Chaining with other operations
 * import { map } from "../../array/map"
 *
 * const pairs = [[1, 2], [3, 4], [5, 6]]
 * const seconds = map(second)(pairs)
 * // [2, 4, 6]
 *
 * // Safe navigation with default
 * const getSecondOrDefault = <T>(
 *   tuple: ReadonlyArray<T> | null | undefined,
 *   defaultValue: T
 * ): T => {
 *   const val = second(tuple)
 *   return val !== undefined ? val : defaultValue
 * }
 *
 * getSecondOrDefault([1, 2, 3], 0)    // 2
 * getSecondOrDefault([1], 0)          // 0
 * getSecondOrDefault(null, 0)         // 0
 *
 * // Range extraction
 * type Range = Pair<number, number>  // [start, end]
 * const range: Range = [10, 20]
 * const end = second(range)  // 20
 *
 * // Error handling patterns
 * type Result<T, E> = Pair<T | null, E | null>
 * const success: Result<number, string> = [42, null]
 * const error: Result<number, string> = [null, "Error occurred"]
 *
 * const getError = second
 * getError(success)  // null
 * getError(error)    // "Error occurred"
 *
 * // With destructuring alternative
 * const [, secondViaDestructure] = [1, 2, 3]
 * const secondViaFunction = second([1, 2, 3])
 * // Both give 2, but second() handles undefined safely
 *
 * // Swap using first and second
 * import { pair } from "../pair"
 * import { first } from "../first"
 *
 * const swap = <T, U>(p: Pair<T, U>): Pair<U, T> =>
 *   pair(first(p)!)(second(p)!)
 *
 * swap(["a", 1])  // [1, "a"]
 *
 * // Filtering pairs by second element
 * const pairs: Array<Pair<string, number>> = [
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 1]
 * ]
 * const withSecondOne = pairs.filter(p => second(p) === 1)
 * // [["a", 1], ["c", 1]]
 * ```
 * @property Pure - No side effects
 * @property Type-safe - Returns undefined for invalid inputs or insufficient elements
 * @property Type-preserving - Maintains precise tuple element types
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
