import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

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
 * @curried size => array => tuple | null
 * @param size - The expected tuple size (1, 2, or 3)
 * @param array - The array to convert
 * @returns A tuple of the specified size, or null if conversion fails
 * @example
 * ```typescript
 * // Creating singleton from array
 * fromArray(1)([42])
 * // [42] (as Singleton<number>)
 *
 * fromArray(1)([1, 2, 3])  // null (wrong length)
 * fromArray(1)([])         // null (empty)
 *
 * // Creating pair from array
 * fromArray(2)(["key", "value"])
 * // ["key", "value"] (as Pair<string, string>)
 *
 * fromArray(2)([1, 2, 3])  // null (wrong length)
 * fromArray(2)([1])        // null (too short)
 *
 * // Creating triple from array
 * fromArray(3)([1, 2, 3])
 * // [1, 2, 3] (as Triple<number, number, number>)
 *
 * fromArray(3)([1, 2])     // null (too short)
 * fromArray(3)([1, 2, 3, 4])  // null (too long)
 *
 * // Type inference with mixed arrays
 * const mixed = [42, "hello"]
 * const pair = fromArray(2)(mixed)
 * // pair is Pair<string | number, string | number> | null
 *
 * // Safe conversion with validation
 * const parseCoordinates = (input: unknown[]): Pair<number, number> | null => {
 *   if (input.every(x => typeof x === "number")) {
 *     return fromArray(2)(input as number[])
 *   }
 *   return null
 * }
 *
 * parseCoordinates([3, 4])      // [3, 4]
 * parseCoordinates([3])         // null
 * parseCoordinates([3, "4"])    // null
 *
 * // Partial application for specific sizes
 * const toSingleton = fromArray(1)
 * const toPair = fromArray(2)
 * const toTriple = fromArray(3)
 *
 * toSingleton([99])           // [99]
 * toPair(["a", "b"])          // ["a", "b"]
 * toTriple([1, 2, 3])         // [1, 2, 3]
 *
 * // Working with user input
 * const userInput = "1,2,3".split(",").map(Number)
 * const coords3D = toTriple(userInput)
 * if (coords3D) {
 *   console.log("Valid 3D coordinates:", coords3D)
 * }
 *
 * // Batch conversion
 * const arrays = [[1], [2, 3], [4, 5, 6]]
 * const singletons = arrays.map(toSingleton).filter(Boolean)
 * // [[1]] (only the first one succeeded)
 *
 * const pairs = arrays.map(toPair).filter(Boolean)
 * // [[2, 3]] (only the second one succeeded)
 *
 * // JSON parsing with validation
 * const parseRgbJson = (json: string): Triple<number, number, number> | null => {
 *   try {
 *     const parsed = JSON.parse(json)
 *     if (Array.isArray(parsed)) {
 *       return toTriple(parsed.map(Number))
 *     }
 *   } catch {
 *     return null
 *   }
 *   return null
 * }
 *
 * parseRgbJson("[255, 128, 0]")     // [255, 128, 0]
 * parseRgbJson("[255, 128]")        // null (too short)
 * parseRgbJson("invalid")           // null (not JSON)
 *
 * // Database row conversion
 * type UserRow = Triple<number, string, string>  // [id, name, email]
 *
 * const convertRow = (row: unknown[]): UserRow | null => {
 *   if (row.length === 3 &&
 *       typeof row[0] === "number" &&
 *       typeof row[1] === "string" &&
 *       typeof row[2] === "string") {
 *     return toTriple(row as [number, string, string])
 *   }
 *   return null
 * }
 *
 * convertRow([1, "Alice", "alice@example.com"])  // [1, "Alice", "alice@example.com"]
 * convertRow([1, "Alice"])                       // null
 *
 * // Configuration parsing
 * const parseConfig = (values: string[]): Pair<string, number> | null => {
 *   if (values.length === 2) {
 *     const [key, value] = values
 *     const numValue = Number(value)
 *     if (!isNaN(numValue)) {
 *       return toPair([key, numValue])
 *     }
 *   }
 *   return null
 * }
 *
 * parseConfig(["timeout", "5000"])  // ["timeout", 5000]
 * parseConfig(["timeout"])          // null
 *
 * // CSV row processing
 * const csvRows = [
 *   "Alice,30,Engineer",
 *   "Bob,25",           // Invalid - too short
 *   "Charlie,35,Designer,Extra"  // Invalid - too long
 * ]
 *
 * const validRows = csvRows
 *   .map(row => row.split(","))
 *   .map(toTriple)
 *   .filter(Boolean)
 * // [["Alice", "30", "Engineer"]] (only first row is valid)
 *
 * // Null/undefined handling
 * fromArray(2)(null)      // null
 * fromArray(2)(undefined) // null
 *
 * // Empty array
 * fromArray(1)([])        // null
 * fromArray(2)([])        // null
 * fromArray(3)([])        // null
 *
 * // Non-array input
 * fromArray(2)("not an array" as unknown as unknown[])  // null
 *
 * // Complex nested structures
 * const nested = [
 *   { x: 1, y: 2 },
 *   { x: 3, y: 4 }
 * ]
 * const nestedPair = toPair(nested)
 * // [{ x: 1, y: 2 }, { x: 3, y: 4 }]
 *
 * // Function composition
 * import { compose } from "../../combinator/compose"
 *
 * const processStringArray = compose(
 *   (p: Pair<string, string> | null) => p ? p.join("-") : "invalid",
 *   fromArray(2)
 * )
 *
 * processStringArray(["hello", "world"])  // "hello-world"
 * processStringArray(["hello"])           // "invalid"
 *
 * // With default values
 * const withDefaults = <T>(
 *   size: 1 | 2 | 3,
 *   defaultValue: T
 * ) => (
 *   array: T[] | null | undefined
 * ) => {
 *   const result = fromArray(size)(array)
 *   if (result) return result
 *
 *   // Create default tuple of requested size
 *   if (size === 1) return [defaultValue] as Singleton<T>
 *   if (size === 2) return [defaultValue, defaultValue] as Pair<T, T>
 *   return [defaultValue, defaultValue, defaultValue] as Triple<T, T, T>
 * }
 *
 * const safeTriple = withDefaults(3, 0)
 * safeTriple([1, 2, 3])    // [1, 2, 3]
 * safeTriple([1])          // [0, 0, 0]
 * safeTriple(null)         // [0, 0, 0]
 * ```
 * @property Pure - No side effects
 * @property Type-safe - Returns properly typed tuples or null
 * @property Curried - Allows partial application for specific sizes
 * @property Validating - Only succeeds with correct array lengths
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
		if (array == null || !Array.isArray(array) || array.length !== size) {
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
