/**
 * Conditionally applies a function based on a predicate
 * If predicate returns true, applies the function; otherwise returns the value unchanged
 *
 * @pure Creates a new function without side effects
 * @curried Function is curried with predicate and transformer
 * @param predicate - Condition to check
 * @param fn - Function to apply when predicate is true
 * @returns Function that conditionally transforms its input
 * @example
 * ```typescript
 * const doubleIfPositive = when(
 *   (x: number) => x > 0,
 *   (x: number) => x * 2
 * )
 *
 * doubleIfPositive(5) // 10
 * doubleIfPositive(-3) // -3 (unchanged)
 * doubleIfPositive(0) // 0 (unchanged)
 *
 * // Use with objects
 * const promoteIfSenior = when(
 *   (emp: { years: number }) => emp.years > 5,
 *   (emp: { years: number; title: string }) => ({
 *     ...emp,
 *     title: "Senior " + emp.title
 *   })
 * )
 *
 * promoteIfSenior({ years: 7, title: "Developer" })
 * // { years: 7, title: "Senior Developer" }
 * ```
 *
 * Note: The identity function is applied when predicate returns false,
 * making this safe to use in pipelines.
 */
const when = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? fn(value) : value

export default when
