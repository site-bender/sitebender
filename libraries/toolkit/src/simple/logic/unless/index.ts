/**
 * Conditionally applies a function when a predicate is falsy
 *
 * Applies a transformation function to a value only when a predicate
 * returns falsy; otherwise returns the value unchanged. This is the
 * inverse of `when` - it applies the function when the condition is
 * NOT met, useful for handling negative conditions or defaults.
 *
 * @param predicate - Function that tests whether to skip transformation
 * @param fn - Function to apply when predicate is falsy
 * @param value - The value to conditionally transform
 * @returns Transformed value if predicate is falsy, original value otherwise
 * @example
 * ```typescript
 * // Basic conditional transformation
 * const makePositiveUnlessAlready = unless(
 *   (n: number) => n > 0,
 *   (n: number) => Math.abs(n)
 * )
 *
 * makePositiveUnlessAlready(5)         // 5 (already positive, unchanged)
 * makePositiveUnlessAlready(-3)        // 3 (negative, made positive)
 * makePositiveUnlessAlready(0)         // 0 (not positive, abs applied)
 *
 * // String processing
 * const addPrefixUnlessPresent = unless(
 *   (s: string) => s.startsWith("http"),
 *   (s: string) => `https://${s}`
 * )
 *
 * addPrefixUnlessPresent("example.com")     // "https://example.com"
 * addPrefixUnlessPresent("http://site.com") // "http://site.com" (unchanged)
 *
 * // Validation with defaults
 * const ensureValidEmail = unless(
 *   (email: string) => email.includes("@") && email.includes("."),
 *   () => "noreply@example.com"
 * )
 *
 * ensureValidEmail("user@domain.com")  // "user@domain.com" (valid, unchanged)
 * ensureValidEmail("invalid")          // "noreply@example.com" (invalid, default)
 *
 * // Array initialization
 * const initializeUnlessPopulated = unless(
 *   (arr: unknown[]) => arr.length > 0,
 *   () => [1, 2, 3]  // Default array
 * )
 *
 * initializeUnlessPopulated([4, 5])    // [4, 5] (has items, unchanged)
 * initializeUnlessPopulated([])        // [1, 2, 3] (empty, initialized)
 * ```
 * @pure Returns same result for same input
 * @curried Allows partial application for reusable conditions
 */
const unless = <T>(
	predicate: (value: T) => unknown,
) =>
(
	fn: (value: T) => T,
) =>
(
	value: T,
): T => !predicate(value) ? fn(value) : value

export default unless
