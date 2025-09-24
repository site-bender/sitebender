/**
 * Type guard that checks if a value is not null or undefined
 *
 * Verifies that a value is neither null nor undefined using strict equality checks.
 * This is a type guard function that narrows the type to exclude null and undefined,
 * providing TypeScript with type safety guarantees. Unlike isDefined which uses loose
 * equality, this function uses strict equality for explicit clarity.
 *
 * This predicate is essential for:
 * - Type-safe property access without optional chaining
 * - Filtering collections to remove nullish values
 * - Ensuring required values are present before processing
 * - Defensive programming against nullish values
 *
 * @param value - The value to check for non-nullish status
 * @returns True if the value is neither null nor undefined, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isNotNullish("hello")   // true
 * isNotNullish("")        // true (empty string is not nullish)
 * isNotNullish(0)         // true (zero is not nullish)
 * isNotNullish(false)     // true
 * isNotNullish(null)      // false
 * isNotNullish(undefined) // false
 *
 * // Type narrowing
 * const processUser = (user: User | null | undefined) => {
 *   if (isNotNullish(user)) {
 *     return user.name.toUpperCase() // user is User here
 *   }
 *   return "Guest"
 * }
 *
 * // Array filtering
 * const values = ["apple", null, "banana", undefined, "cherry"]
 * const fruits = values.filter(isNotNullish)
 * // ["apple", "banana", "cherry"] - type is string[]
 *
 * // Safe property access
 * const safeTrim = (value: string | null | undefined) =>
 *   isNotNullish(value) ? value.trim() : ""
 *
 * safeTrim("  hello  ")  // "hello"
 * safeTrim(null)         // ""
 * ```
 * @pure
 * @predicate
 */
const isNotNullish = <T>(
	value: T | null | undefined,
): value is T => {
	return value !== null && value !== undefined
}

export default isNotNullish
