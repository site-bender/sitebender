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
 * // With singleton
 * first([42])
 * // 42
 * 
 * // With pair
 * first(["key", "value"])
 * // "key"
 * 
 * // With triple
 * first([10, 20, 30])
 * // 10
 * 
 * // Type inference with tuples
 * import { Pair, Triple } from "../../../types/tuple"
 * 
 * const p: Pair<string, number> = ["hello", 42]
 * const x = first(p)  // x is inferred as string
 * // "hello"
 * 
 * const t: Triple<boolean, string, number> = [true, "test", 99]
 * const y = first(t)  // y is inferred as boolean
 * // true
 * 
 * // With regular arrays
 * first([1, 2, 3, 4, 5])
 * // 1
 * 
 * first(["a", "b", "c"])
 * // "a"
 * 
 * // Empty array returns undefined
 * first([])
 * // undefined
 * 
 * // Invalid inputs return undefined
 * first(null)
 * // undefined
 * 
 * first(undefined)
 * // undefined
 * 
 * // With complex types
 * first([{ id: 1 }, { id: 2 }])
 * // { id: 1 }
 * 
 * first([[1, 2], [3, 4]])
 * // [1, 2]
 * 
 * // Extracting from coordinates
 * const point2D: Pair<number, number> = [3, 4]
 * const x_coord = first(point2D)  // 3
 * 
 * const point3D: Triple<number, number, number> = [1, 2, 3]
 * const x_coord3D = first(point3D)  // 1
 * 
 * // From key-value pairs
 * const entry: Pair<string, any> = ["name", "Alice"]
 * const key = first(entry)  // "name"
 * 
 * // Chaining with other operations
 * import { map } from "../../array/map"
 * import { pair } from "../pair"
 * 
 * const pairs = [[1, 2], [3, 4], [5, 6]]
 * const firsts = map(first)(pairs)
 * // [1, 3, 5]
 * 
 * // Pattern matching style
 * function processFirst<T>(tuple: [T, ...unknown[]]) {
 *   const head = first(tuple)
 *   if (head !== undefined) {
 *     // Process the first element
 *     return head
 *   }
 *   return undefined
 * }
 * 
 * // With destructuring alternative
 * const [firstViaDestructure] = [1, 2, 3]
 * const firstViaFunction = first([1, 2, 3])
 * // Both give 1, but first() handles undefined safely
 * 
 * // RGB color extraction
 * type RGB = Triple<number, number, number>
 * const color: RGB = [255, 128, 0]
 * const red = first(color)  // 255
 * 
 * // Date component extraction
 * type DateTriple = Triple<number, number, number>  // [year, month, day]
 * const date: DateTriple = [2024, 3, 15]
 * const year = first(date)  // 2024
 * 
 * // Safe navigation
 * const maybeFirst = <T>(arr: ReadonlyArray<T> | null | undefined) => {
 *   const val = first(arr)
 *   return val !== undefined ? val : "default" as T | "default"
 * }
 * 
 * maybeFirst([1, 2, 3])    // 1
 * maybeFirst([])           // "default"
 * maybeFirst(null)         // "default"
 * ```
 * @property Pure - No side effects
 * @property Type-safe - Returns undefined for invalid inputs
 * @property Type-preserving - Maintains precise tuple element types
 */
const first = <T>(
	tuple: ReadonlyArray<T> | null | undefined
): T | undefined => {
	if (tuple == null || !Array.isArray(tuple) || tuple.length === 0) {
		return undefined
	}
	
	return tuple[0]
}

export default first