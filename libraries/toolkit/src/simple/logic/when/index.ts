/**
 * Conditionally applies a function when a predicate is truthy
 *
 * Applies a transformation function to a value only when a predicate
 * returns truthy; otherwise returns the value unchanged. This is useful
 * for conditional transformations in pipelines where you want to
 * optionally modify data based on certain conditions.
 *
 * @param predicate - Function that tests whether to apply transformation
 * @param fn - Function to apply when predicate is truthy
 * @param value - The value to conditionally transform
 * @returns Transformed value if predicate is truthy, original value otherwise
 * @example
 * ```typescript
 * // Basic conditional transformation
 * const doubleIfPositive = when(
 *   (n: number) => n > 0,
 *   (n: number) => n * 2
 * )
 *
 * doubleIfPositive(5)                  // 10 (positive, doubled)
 * doubleIfPositive(-3)                 // -3 (negative, unchanged)
 * doubleIfPositive(0)                  // 0 (zero, unchanged)
 *
 * // String formatting
 * const capitalizeIfShort = when(
 *   (s: string) => s.length <= 5,
 *   (s: string) => s.toUpperCase()
 * )
 *
 * capitalizeIfShort("hi")              // "HI"
 * capitalizeIfShort("greeting")        // "greeting" (too long, unchanged)
 *
 * // Object modification
 * const addPremiumBadge = when(
 *   (u: User) => u.premium === true,
 *   (u: User) => ({ ...u, name: `⭐ ${u.name}` })
 * )
 *
 * // Validation and normalization
 * const normalizeEmail = when(
 *   (email: string) => email.includes("@"),
 *   (email: string) => email.toLowerCase().trim()
 * )
 *
 * normalizeEmail("  JOHN@EXAMPLE.COM  ")  // "john@example.com"
 * normalizeEmail("not-an-email")          // "not-an-email" (unchanged)
 *
 * // Pipeline integration
 * const pipeline = [
 *   (x: number) => x + 10,
 *   when(
 *     (x: number) => x > 15,
 *     (x: number) => x * 2
 *   ),
 *   (x: number) => Math.round(x)
 * ]
 * ```
 * @pure Returns same result for same input
 * @curried Allows partial application for reusable conditions
 */
const when = <T>(
	predicate: (value: T) => unknown,
) =>
(
	fn: (value: T) => T,
) =>
(
	value: T,
): T => predicate(value) ? fn(value) : value

export default when
