/**
 * Returns a default value if the input is null or undefined
 *
 * Provides a fallback value when the input is nullish (null or undefined).
 * Unlike logical OR (||), this only falls back for null/undefined, not for
 * other falsy values like 0, false, or empty string. This is equivalent to
 * the nullish coalescing operator (??) but in functional form.
 *
 * @param defaultValue - The fallback value to use if input is nullish
 * @param value - The value to check
 * @returns The input value if not nullish, otherwise the default value
 * @example
 * ```typescript
 * // Basic usage with null/undefined
 * defaultTo("default")(null)           // "default"
 * defaultTo("default")(undefined)      // "default"
 * defaultTo("default")("value")        // "value"
 *
 * // Preserves falsy values (unlike ||)
 * defaultTo("default")(0)              // 0 (not replaced)
 * defaultTo("default")(false)          // false (not replaced)
 * defaultTo("default")("")             // "" (not replaced)
 *
 * // Partial application
 * const withDefault = defaultTo("N/A")
 * withDefault(null)                    // "N/A"
 * withDefault("John")                  // "John"
 *
 * // Configuration with defaults
 * const getPort = defaultTo(3000)
 * getPort(process.env.PORT)            // PORT value or 3000
 * getPort(8080)                        // 8080
 *
 * // Object property defaults
 * const parseConfig = (config: Config) => ({
 *   timeout: defaultTo(5000)(config.timeout),
 *   retries: defaultTo(3)(config.retries),
 *   debug: defaultTo(false)(config.debug)
 * })
 *
 * // Comparison with OR operator
 * const value = 0
 * const orResult = value || 10         // 10 (replaces falsy 0)
 * const defaultResult = defaultTo(10)(value) // 0 (preserves 0)
 * ```
 * @pure
 * @curried
 */
const defaultTo = <T>(defaultValue: T) =>
(
	value: T | null | undefined,
): T => value ?? defaultValue

export default defaultTo
