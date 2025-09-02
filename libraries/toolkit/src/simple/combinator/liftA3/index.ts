/**
 * Lifts a ternary function to work with applicative functors
 *
 * Takes a function of three arguments and returns a new function that works
 * with values wrapped in applicative functors (like Arrays). For Arrays, it
 * applies the function to all combinations of elements from the three arrays
 * (Cartesian product). This is a specialized version of lift for exactly
 * three arguments, providing better type safety and clarity.
 *
 * @param fn - Ternary function to lift
 * @returns Function that works with three wrapped values
 * @example
 * ```typescript
 * // Basic arithmetic with three arrays
 * const sum3 = (a: number, b: number, c: number) => a + b + c
 * const liftedSum3 = liftA3(sum3)
 *
 * liftedSum3([1, 2])([10, 20])([100])
 * // [111, 121, 112, 122]
 * // Applies: 1+10+100, 1+20+100, 2+10+100, 2+20+100
 *
 * // String formatting
 * const format = (greeting: string, name: string, punct: string) =>
 *   `${greeting}, ${name}${punct}`
 * const liftedFormat = liftA3(format)
 *
 * liftedFormat(["Hello", "Hi"])
 *             (["Alice", "Bob"])
 *             (["!", "."])
 * // ["Hello, Alice!", "Hello, Alice.", "Hello, Bob!", "Hello, Bob.",
 * //  "Hi, Alice!", "Hi, Alice.", "Hi, Bob!", "Hi, Bob."]
 *
 * // RGB color combinations
 * const rgb = (r: number, g: number, b: number) =>
 *   `rgb(${r}, ${g}, ${b})`
 * const liftedRgb = liftA3(rgb)
 *
 * liftedRgb([0, 255])([128, 255])([64, 128])
 * // All 8 RGB combinations from the given values
 *
 * // Date creation
 * const makeDate = (year: number, month: number, day: number) =>
 *   new Date(year, month - 1, day)
 * const liftedMakeDate = liftA3(makeDate)
 *
 * liftedMakeDate([2024])([1, 6])([15, 30])
 * // All date combinations for the given year, months, and days
 *
 * // Validation with multiple conditions
 * const isValid = (min: number, max: number, value: number) =>
 *   value >= min && value <= max
 * const liftedValidate = liftA3(isValid)
 *
 * liftedValidate([0])([100])([25, 75])
 * // Boolean results for all combinations
 *
 * // Object construction
 * const makeUser = (id: number, name: string, role: string) => ({
 *   id,
 *   name,
 *   role,
 *   created: new Date()
 * })
 * const liftedMakeUser = liftA3(makeUser)
 *
 * liftedMakeUser([1, 2])
 *               (["Alice"])
 *               (["admin", "user"])
 * // [
 * //   { id: 1, name: "Alice", role: "admin", ... },
 * //   { id: 1, name: "Alice", role: "user", ... },
 * //   { id: 2, name: "Alice", role: "admin", ... },
 * //   { id: 2, name: "Alice", role: "user", ... }
 * // ]
 *
 * // Mathematical operations
 * const clamp = (min: number, max: number, value: number) =>
 *   Math.max(min, Math.min(max, value))
 * const liftedClamp = liftA3(clamp)
 *
 * liftedClamp([0])([10])([3, 8, 15])
 * // All clamped values: [3, 8, 10]
 *
 * // Empty array handling
 * liftedSum3([])([1, 2])([3, 4])    // []
 * liftedSum3([1, 2])([])([3, 4])    // []
 * liftedSum3([1, 2])([3, 4])([])    // []
 *
 * // Single element arrays
 * liftedSum3([1])([2])([3])  // [6]
 * ```
 * @pure
 * @curried
 */
const liftA3 = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
): Array<R> => fa.flatMap((a) => fb.flatMap((b) => fc.map((c) => fn(a, b, c))))

export default liftA3
