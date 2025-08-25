import type { Triple } from "../../../types/tuple/index.ts"

/**
 * Creates a three-element tuple (Triple) from three values
 *
 * A triple tuple provides a type-safe way to group exactly three values
 * together. This is useful for:
 * - 3D coordinates (x, y, z)
 * - RGB/HSL color values
 * - Database rows with three fields
 * - Date components (year, month, day)
 * - Any ternary relationship between values
 *
 * The function is curried to allow partial application and composition,
 * enabling creation of specialized triple constructors.
 *
 * @curried third => second => first => triple
 * @param third - The third element of the triple
 * @param second - The second element of the triple
 * @param first - The first element of the triple
 * @returns A tuple containing exactly three elements
 * @example
 * ```typescript
 * // Basic usage
 * triple(30)(20)(10)
 * // [10, 20, 30]
 *
 * triple("z")("y")("x")
 * // ["x", "y", "z"]
 *
 * triple(false)(0)(true)
 * // [true, 0, false]
 *
 * // Different types
 * triple({ role: "admin" })(30)("Alice")
 * // ["Alice", 30, { role: "admin" }]
 *
 * // Type safety - result is Triple<T, U, V>, not (T | U | V)[]
 * const coord: Triple<number, number, number> = triple(5)(3)(1)
 * // coord is typed as [number, number, number]
 *
 * // 3D coordinates
 * const point3D = (z: number) => (y: number) => (x: number) =>
 *   triple(z)(y)(x)
 *
 * const origin = point3D(0)(0)(0)     // [0, 0, 0]
 * const p1 = point3D(10)(5)(3)        // [3, 5, 10]
 *
 * // RGB colors
 * type RGB = Triple<number, number, number>
 * const rgb = (b: number) => (g: number) => (r: number): RGB =>
 *   triple(b)(g)(r)
 *
 * const red = rgb(0)(0)(255)          // [255, 0, 0]
 * const green = rgb(0)(255)(0)        // [0, 255, 0]
 * const blue = rgb(255)(0)(0)         // [0, 0, 255]
 *
 * // Date components
 * const date = (day: number) => (month: number) => (year: number) =>
 *   triple(day)(month)(year)
 *
 * date(15)(3)(2024)                   // [2024, 3, 15]
 *
 * // Partial application for layers
 * const atZ = (z: number) => (y: number) => (x: number) =>
 *   triple(z)(y)(x)
 *
 * const ground = atZ(0)
 * ground(10)(5)                       // [5, 10, 0]
 * ground(20)(15)                      // [15, 20, 0]
 *
 * const sky = atZ(100)
 * sky(10)(5)                          // [5, 10, 100]
 *
 * // Building collections of triples
 * const vertices = [
 *   triple(0)(0)(0),
 *   triple(0)(0)(1),
 *   triple(0)(1)(0),
 *   triple(0)(1)(1)
 * ]
 * // [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]]
 *
 * // Result with metadata
 * type ResultWithMeta<T, E, M> = Triple<T | null, E | null, M>
 * const withMeta = <M>(meta: M) => <E>(error: E | null) =>
 *   <T>(value: T | null): ResultWithMeta<T, E, M> =>
 *     triple(meta)(error)(value)
 *
 * withMeta({ timestamp: Date.now() })(null)(42)
 * // [42, null, { timestamp: ... }]
 *
 * // Null and undefined handling
 * triple(null)(undefined)(null)       // [null, undefined, null]
 *
 * // Nested triples
 * triple(
 *   triple(9)(8)(7)
 * )(
 *   triple(6)(5)(4)
 * )(
 *   triple(3)(2)(1)
 * )
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * // With destructuring
 * const [x, y, z] = triple(30)(20)(10)
 * // x is 10, y is 20, z is 30
 *
 * // Creating specialized constructors
 * const vector3 = triple
 * const v1 = vector3(1)(1)(1)         // [1, 1, 1]
 *
 * // Time components
 * const time = (seconds: number) => (minutes: number) => (hours: number) =>
 *   triple(seconds)(minutes)(hours)
 *
 * time(30)(45)(14)                    // [14, 45, 30]
 *
 * // HSL color space
 * const hsl = (lightness: number) => (saturation: number) => (hue: number) =>
 *   triple(lightness)(saturation)(hue)
 *
 * hsl(50)(100)(180)                   // [180, 100, 50] - cyan
 *
 * // Database row representation
 * type UserRow = Triple<number, string, string>  // [id, name, email]
 * const userRow = (email: string) => (name: string) => (id: number): UserRow =>
 *   triple(email)(name)(id)
 *
 * userRow("alice@example.com")("Alice")(1)
 * // [1, "Alice", "alice@example.com"]
 *
 * // Compose with map for transformations
 * import { map } from "../../array/map"
 *
 * const tripleWithSquares = map((x: number) =>
 *   triple(x ** 3)(x ** 2)(x)
 * )
 * tripleWithSquares([1, 2, 3])
 * // [[1, 1, 1], [2, 4, 8], [3, 9, 27]]
 *
 * // Version numbers
 * type Version = Triple<number, number, number>  // [major, minor, patch]
 * const version = (patch: number) => (minor: number) => (major: number): Version =>
 *   triple(patch)(minor)(major)
 *
 * version(5)(2)(1)                    // [1, 2, 5]
 *
 * // Geolocation with altitude
 * const geoPoint = (altitude: number) => (longitude: number) => (latitude: number) =>
 *   triple(altitude)(longitude)(latitude)
 *
 * geoPoint(100)(-74.0060)(40.7128)   // [40.7128, -74.0060, 100] - NYC at 100m
 * ```
 * @property Pure - No side effects
 * @property Total - Defined for all inputs
 * @property Curried - Returns partially applicable functions
 * @property Type-safe - Returns Triple<T, U, V> type
 */
const triple =
	<V>(third: V) => <U>(second: U) => <T>(first: T): Triple<T, U, V> => {
		return [first, second, third]
	}

export default triple
