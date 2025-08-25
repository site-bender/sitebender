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
 * // Basic checks - truthy values
 * isNotNullish("hello")    // true
 * isNotNullish("")         // true (empty string is not nullish)
 * isNotNullish(0)          // true (zero is not nullish)
 * isNotNullish(false)      // true (false is not nullish)
 * isNotNullish([])         // true (empty array is not nullish)
 * isNotNullish({})         // true (empty object is not nullish)
 * isNotNullish(NaN)        // true (NaN is not nullish)
 *
 * // Nullish values
 * isNotNullish(null)       // false
 * isNotNullish(undefined)  // false
 *
 * // Type narrowing in TypeScript
 * const processUser = (user: User | null | undefined) => {
 *   if (isNotNullish(user)) {
 *     // TypeScript knows user is User here
 *     return user.name.toUpperCase()
 *   }
 *   return "Guest"
 * }
 *
 * // Array filtering with type safety
 * const values: Array<string | null | undefined> = [
 *   "apple",
 *   null,
 *   "banana",
 *   undefined,
 *   "cherry"
 * ]
 * const fruits = values.filter(isNotNullish)
 * // Type is string[], all nullish values removed
 * // ["apple", "banana", "cherry"]
 *
 * // Optional property handling
 * interface Config {
 *   apiKey?: string | null
 *   timeout?: number | null
 *   retries?: number | null
 * }
 *
 * const config: Config = {
 *   apiKey: "secret123",
 *   timeout: null,
 *   retries: 3
 * }
 *
 * if (isNotNullish(config.apiKey)) {
 *   // Safe to use config.apiKey as string
 *   authenticate(config.apiKey)
 * }
 *
 * // Chaining with map operations
 * const numbers = [1, null, 2, undefined, 3, 0, null]
 * const doubled = numbers
 *   .filter(isNotNullish)
 *   .map(n => n * 2)
 * // [2, 4, 6, 0]
 *
 * // Validation in data pipelines
 * interface ApiResponse {
 *   users?: Array<{
 *     id: number
 *     name?: string | null
 *     email?: string | null
 *   }> | null
 * }
 *
 * const response: ApiResponse = await fetchUsers()
 * const validUsers = response.users
 *   ?.filter(isNotNullish)
 *   .filter(user => isNotNullish(user.email))
 *   ?? []
 *
 * // Function composition
 * const safeTrim = (value: string | null | undefined) =>
 *   isNotNullish(value) ? value.trim() : ""
 *
 * safeTrim("  hello  ")   // "hello"
 * safeTrim(null)          // ""
 * safeTrim(undefined)     // ""
 *
 * // React component props
 * interface Props {
 *   title?: string | null
 *   count?: number | null
 * }
 *
 * const Component = ({ title, count }: Props) => {
 *   if (isNotNullish(title)) {
 *     // TypeScript knows title is string
 *     document.title = title
 *   }
 *
 *   const displayCount = isNotNullish(count) ? count : 0
 *   return <div>Count: {displayCount}</div>
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types by excluding null and undefined
 * @property Explicit - Uses strict equality for clear intent
 * @property Total - Handles all possible input values
 */
const isNotNullish = <T>(
	value: T | null | undefined,
): value is T => {
	return value !== null && value !== undefined
}

export default isNotNullish
