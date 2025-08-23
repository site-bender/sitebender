/**
 * Extracts the third element from a tuple or array
 * 
 * Type-safe function that extracts the third element from Triple or longer
 * tuples/arrays. For tuples, the return type is precisely inferred.
 * Returns null for arrays with fewer than 3 elements or invalid inputs.
 * 
 * This function provides stronger type inference than generic array access
 * when used with tuples, as it preserves the exact type of the third element.
 * 
 * @param tuple - A tuple or array with at least 3 elements
 * @returns The third element, or undefined if the input has fewer than 3 elements
 * @example
 * ```typescript
 * // With triple
 * third([10, 20, 30])
 * // 30
 * 
 * // Type inference with tuples
 * import { Triple } from "../../../types/tuple"
 * 
 * const t: Triple<boolean, string, number> = [true, "test", 99]
 * const z = third(t)  // z is inferred as number
 * // 99
 * 
 * // With regular arrays
 * third([1, 2, 3, 4, 5])
 * // 3
 * 
 * third(["a", "b", "c", "d"])
 * // "c"
 * 
 * // Arrays with fewer than 3 elements return undefined
 * third([1, 2])
 * // undefined
 * 
 * third([1])
 * // undefined
 * 
 * third([])
 * // undefined
 * 
 * // Invalid inputs return undefined
 * third(null)
 * // undefined
 * 
 * third(undefined)
 * // undefined
 * 
 * // With complex types
 * third([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
 * // { id: 3 }
 * 
 * third([[1, 2], [3, 4], [5, 6], [7, 8]])
 * // [5, 6]
 * 
 * // 3D coordinate extraction
 * type Point3D = Triple<number, number, number>
 * const point: Point3D = [10, 20, 30]
 * const z_coord = third(point)  // 30
 * 
 * // RGB color extraction
 * type RGB = Triple<number, number, number>
 * const color: RGB = [255, 128, 64]
 * const blue = third(color)  // 64
 * 
 * // Date component extraction
 * type DateTriple = Triple<number, number, number>  // [year, month, day]
 * const date: DateTriple = [2024, 3, 15]
 * const day = third(date)  // 15
 * 
 * // Time extraction
 * type Time = Triple<number, number, number>  // [hours, minutes, seconds]
 * const time: Time = [14, 30, 45]
 * const seconds = third(time)  // 45
 * 
 * // HSL color extraction
 * type HSL = Triple<number, number, number>  // [hue, saturation, lightness]
 * const hsl: HSL = [180, 100, 50]
 * const lightness = third(hsl)  // 50
 * 
 * // Version numbers
 * type Version = Triple<number, number, number>  // [major, minor, patch]
 * const version: Version = [1, 2, 5]
 * const patch = third(version)  // 5
 * 
 * // Database row
 * type UserRow = Triple<number, string, string>  // [id, name, email]
 * const user: UserRow = [1, "Alice", "alice@example.com"]
 * const email = third(user)  // "alice@example.com"
 * 
 * // Geolocation with altitude
 * type GeoPoint = Triple<number, number, number>  // [lat, lng, alt]
 * const location: GeoPoint = [40.7128, -74.0060, 100]
 * const altitude = third(location)  // 100
 * 
 * // Chaining with other operations
 * import { map } from "../../array/map"
 * 
 * const triples = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * const thirds = map(third)(triples)
 * // [3, 6, 9]
 * 
 * // Safe navigation with default
 * const getThirdOrDefault = <T>(
 *   tuple: ReadonlyArray<T> | null | undefined,
 *   defaultValue: T
 * ): T => {
 *   const val = third(tuple)
 *   return val !== undefined ? val : defaultValue
 * }
 * 
 * getThirdOrDefault([1, 2, 3], 0)     // 3
 * getThirdOrDefault([1, 2], 0)        // 0
 * getThirdOrDefault(null, 0)          // 0
 * 
 * // Result with metadata
 * type ResultWithMeta<T, E, M> = Triple<T | null, E | null, M>
 * const result: ResultWithMeta<number, string, object> = [
 *   42,
 *   null,
 *   { timestamp: Date.now() }
 * ]
 * const metadata = third(result)  // { timestamp: ... }
 * 
 * // With destructuring alternative
 * const [, , thirdViaDestructure] = [1, 2, 3]
 * const thirdViaFunction = third([1, 2, 3])
 * // Both give 3, but third() handles undefined safely
 * 
 * // Extracting all components
 * import { first } from "../first"
 * import { second } from "../second"
 * 
 * const extractAll = <T, U, V>(t: Triple<T, U, V>) => ({
 *   x: first(t),
 *   y: second(t),
 *   z: third(t)
 * })
 * 
 * extractAll([10, 20, 30])
 * // { x: 10, y: 20, z: 30 }
 * 
 * // Filtering triples by third element
 * const data: Array<Triple<string, number, boolean>> = [
 *   ["a", 1, true],
 *   ["b", 2, false],
 *   ["c", 3, true]
 * ]
 * const withTrueThird = data.filter(t => third(t) === true)
 * // [["a", 1, true], ["c", 3, true]]
 * 
 * // Matrix row access
 * type Matrix3x3 = Triple<Triple<number, number, number>, Triple<number, number, number>, Triple<number, number, number>>
 * const matrix: Matrix3x3 = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 * const thirdRow = third(matrix)  // [7, 8, 9]
 * const bottomRight = third(thirdRow)  // 9
 * ```
 * @property Pure - No side effects
 * @property Type-safe - Returns undefined for invalid inputs or insufficient elements
 * @property Type-preserving - Maintains precise tuple element types
 */
const third = <T>(
	tuple: ReadonlyArray<T> | null | undefined
): T | undefined => {
	if (tuple == null || !Array.isArray(tuple) || tuple.length < 3) {
		return undefined
	}
	
	return tuple[2]
}

export default third