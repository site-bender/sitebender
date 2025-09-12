/**
 * The opposite of when - applies function when predicate is false
 * If predicate returns false, applies the function; otherwise returns the value unchanged
 *
 * @pure Creates a new function without side effects
 * @curried Function is curried with predicate and transformer
 * @param predicate - Condition to check
 * @param fn - Function to apply when predicate is false
 * @returns Function that conditionally transforms its input
 * @example
 * ```typescript
 * const doubleIfNotPositive = unless(
 *   (x: number) => x > 0,
 *   (x: number) => x * 2
 * )
 *
 * doubleIfNotPositive(5) // 5 (unchanged, since positive)
 * doubleIfNotPositive(-3) // -6 (doubled, since not positive)
 * doubleIfNotPositive(0) // 0 (doubled to 0, since not positive)
 *
 * // Provide defaults for missing values
 * const ensureNotNull = unless(
 *   (x: string | null) => x !== null,
 *   () => "default"
 * )
 *
 * ensureNotNull("value") // "value"
 * ensureNotNull(null) // "default"
 * ```
 *
 * Note: This is exactly equivalent to when with a negated predicate,
 * but often reads more naturally for certain conditions.
 */
const unless = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? value : fn(value)

export default unless
