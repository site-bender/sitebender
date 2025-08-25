/**
 * Type guard that checks if a value is null or undefined (nullish)
 *
 * Determines whether a value is either null or undefined, the two nullish values
 * in JavaScript. This is a type guard function that narrows the type to null | undefined,
 * helping TypeScript understand when a value is absent. Uses loose equality (==) with null
 * to check both null and undefined in a single, idiomatic comparison.
 *
 * This predicate is valuable for:
 * - Checking if optional values are absent
 * - Implementing default value logic
 * - Validating missing data in objects
 * - Short-circuit evaluation in data pipelines
 *
 * @param value - The value to check for nullish status
 * @returns True if the value is null or undefined, false otherwise
 * @example
 * ```typescript
 * // Nullish values
 * isNullish(null)          // true
 * isNullish(undefined)     // true
 *
 * // Non-nullish values (including falsy ones)
 * isNullish(0)             // false
 * isNullish("")            // false (empty string is not nullish)
 * isNullish(false)         // false
 * isNullish(NaN)           // false
 * isNullish([])            // false
 * isNullish({})            // false
 *
 * // Type narrowing
 * const getValue = (): string | null | undefined => {
 *   // Some operation that might return nullish
 * }
 *
 * const value = getValue()
 * if (isNullish(value)) {
 *   // TypeScript knows value is null | undefined here
 *   console.log("No value provided")
 * } else {
 *   // TypeScript knows value is string here
 *   console.log(value.toUpperCase())
 * }
 *
 * // Default value pattern
 * const getConfig = <T>(value: T | null | undefined, defaultValue: T): T => {
 *   return isNullish(value) ? defaultValue : value
 * }
 *
 * getConfig(null, "default")      // "default"
 * getConfig(undefined, 42)        // 42
 * getConfig("custom", "default")  // "custom"
 * getConfig(0, 10)               // 0 (zero is not nullish)
 *
 * // Optional chaining alternative
 * interface User {
 *   name: string
 *   profile?: {
 *     bio?: string | null
 *     avatar?: string | null
 *   } | null
 * }
 *
 * const user: User = {
 *   name: "Alice",
 *   profile: { bio: null, avatar: "pic.jpg" }
 * }
 *
 * if (isNullish(user.profile?.bio)) {
 *   console.log("No bio provided")
 * }
 *
 * // Filtering nullish values
 * const mixed = [1, null, 2, undefined, 3, 0, false, ""]
 * const nonNullish = mixed.filter(x => !isNullish(x))
 * // [1, 2, 3, 0, false, ""]
 *
 * // Validation in forms
 * interface FormData {
 *   username: string | null
 *   email?: string | null
 *   age?: number | null
 * }
 *
 * const validateForm = (data: FormData): string[] => {
 *   const errors: string[] = []
 *
 *   if (isNullish(data.username)) {
 *     errors.push("Username is required")
 *   }
 *   if (isNullish(data.email)) {
 *     errors.push("Email is required")
 *   }
 *   // Note: age can be optional
 *
 *   return errors
 * }
 *
 * // Early return pattern
 * const processData = (data: Data | null | undefined) => {
 *   if (isNullish(data)) {
 *     return { error: "No data provided" }
 *   }
 *
 *   // Process the data knowing it's defined
 *   return { result: transform(data) }
 * }
 *
 * // Combining with other predicates
 * const isEmptyOrNullish = (value: unknown): boolean => {
 *   return isNullish(value) ||
 *          (typeof value === "string" && value === "") ||
 *          (Array.isArray(value) && value.length === 0)
 * }
 *
 * isEmptyOrNullish(null)      // true
 * isEmptyOrNullish("")         // true
 * isEmptyOrNullish([])         // true
 * isEmptyOrNullish("hello")    // false
 * isEmptyOrNullish([1, 2])     // false
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to null | undefined
 * @property Idiomatic - Uses JavaScript's == null pattern for nullish checking
 * @property Total - Handles all possible input values
 */
const isNullish = <T>(value: T | null | undefined): value is null | undefined =>
	value === null || value === undefined

export default isNullish
