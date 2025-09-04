/**
 * Type guard that checks if a value is defined (not null or undefined)
 *
 * Determines whether a value is neither null nor undefined, making it safe to use.
 * This is a type guard function that narrows the type to exclude null and undefined,
 * enabling TypeScript to understand that the value is definitely present after the check.
 * Uses loose equality (!=) to check both null and undefined in a single comparison.
 *
 * This predicate is particularly useful for:
 * - Filtering arrays to remove null/undefined values
 * - Guarding against null/undefined before property access
 * - Validating required fields in data structures
 * - Type narrowing in conditional branches
 *
 * @param value - The value to check for definition
 * @returns True if the value is neither null nor undefined, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isDefined("hello")      // true
 * isDefined("")           // true (empty string is defined)
 * isDefined(0)            // true (zero is defined)
 * isDefined(false)        // true (false is defined)
 * isDefined([])           // true (empty array is defined)
 * isDefined({})           // true (empty object is defined)
 *
 * isDefined(null)         // false
 * isDefined(undefined)    // false
 *
 * // Type narrowing with TypeScript
 * const value: string | null | undefined = getValue()
 * if (isDefined(value)) {
 *   // TypeScript knows value is string here
 *   console.log(value.toUpperCase()) // Safe to call string methods
 * }
 *
 * // Filtering arrays
 * const items = ["a", null, "b", undefined, "c", ""]
 * const defined = items.filter(isDefined)
 * // ["a", "b", "c", ""] - type is string[]
 *
 * // Chaining with other operations
 * const data = [1, null, 2, undefined, 3, 0]
 * const sum = data
 *   .filter(isDefined)
 *   .reduce((acc, n) => acc + n, 0) // 6
 *
 * // Object property checks
 * interface User {
 *   name: string
 *   email?: string | null
 *   age?: number | null
 * }
 *
 * const user: User = { name: "Alice", email: null, age: 30 }
 * isDefined(user.name)    // true
 * isDefined(user.email)   // false
 * isDefined(user.age)     // true
 *
 * // Guard in function parameters
 * const processValue = <T>(value: T | null | undefined) => {
 *   if (!isDefined(value)) {
 *     return "No value provided"
 *   }
 *   // TypeScript knows value is T here
 *   return `Processing: ${value}`
 * }
 *
 * processValue("data")    // "Processing: data"
 * processValue(null)      // "No value provided"
 * processValue(undefined) // "No value provided"
 *
 * // Validating API responses
 * interface ApiResponse {
 *   data?: {
 *     id: number
 *     name: string
 *   } | null
 * }
 *
 * const response: ApiResponse = await fetchData()
 * if (isDefined(response.data)) {
 *   // Safe to access response.data.id and response.data.name
 *   console.log(`User: ${response.data.name}`)
 * }
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isDefined = <T>(value: T | null | undefined): value is T =>
	value !== null && value !== undefined

export default isDefined
