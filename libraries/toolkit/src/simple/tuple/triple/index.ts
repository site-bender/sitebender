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
 * triple(30)(20)(10)  // [10, 20, 30]
 * triple("z")("y")("x")  // ["x", "y", "z"]
 * triple(false)(0)(true)  // [true, 0, false]
 *
 * // Different types
 * triple({ role: "admin" })(30)("Alice")  // ["Alice", 30, { role: "admin" }]
 *
 * // 3D coordinates
 * const point3D = (z: number) => (y: number) => (x: number) =>
 *   triple(z)(y)(x)
 * const origin = point3D(0)(0)(0)  // [0, 0, 0]
 * const p1 = point3D(10)(5)(3)  // [3, 5, 10]
 *
 * // RGB colors
 * type RGB = Triple<number, number, number>
 * const rgb = (b: number) => (g: number) => (r: number): RGB =>
 *   triple(b)(g)(r)
 * const red = rgb(0)(0)(255)  // [255, 0, 0]
 *
 * // Partial application
 * const atZ = (z: number) => (y: number) => (x: number) =>
 *   triple(z)(y)(x)
 * const ground = atZ(0)
 * ground(10)(5)  // [5, 10, 0]
 *
 * // With destructuring
 * const [x, y, z] = triple(30)(20)(10)
 * // x is 10, y is 20, z is 30
 * ```
 * @pure
 * @curried
 */
const triple =
	<V>(third: V) => <U>(second: U) => <T>(first: T): Triple<T, U, V> => {
		return [first, second, third]
	}

export default triple
