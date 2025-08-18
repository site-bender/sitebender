/**
 * The opposite of when - applies function when predicate is false
 * If predicate returns false, applies the function; otherwise returns the value unchanged
 *
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
 *
 * // Validation with fallback
 * interface Config {
 *   timeout?: number
 *   retries?: number
 * }
 *
 * const ensureTimeout = unless(
 *   (cfg: Config) => cfg.timeout !== undefined,
 *   (cfg: Config) => ({ ...cfg, timeout: 5000 })
 * )
 *
 * ensureTimeout({ retries: 3 }) // { retries: 3, timeout: 5000 }
 * ensureTimeout({ timeout: 1000, retries: 3 }) // { timeout: 1000, retries: 3 }
 *
 * // Chain with when for complete conditionals
 * const normalizeStatus = pipe([
 *   when((s: string) => s === "active", () => "ACTIVE"),
 *   unless((s: string) => s === "ACTIVE", () => "INACTIVE")
 * ])
 *
 * normalizeStatus("active") // "ACTIVE"
 * normalizeStatus("pending") // "INACTIVE"
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
