/**
 * Checks if a value is strictly undefined
 * 
 * Tests whether a value is exactly undefined (not null or any other value).
 * This is a precise check using strict equality that distinguishes undefined
 * from null and other falsy values. Unlike isNullish which checks for both
 * null and undefined, this predicate specifically identifies only undefined values.
 * 
 * This predicate is useful for:
 * - Detecting uninitialized variables
 * - Checking for missing function arguments
 * - Identifying absent object properties
 * - Distinguishing undefined from null in APIs
 * 
 * @param value - The value to check for undefined
 * @returns True if the value is strictly undefined, false otherwise
 * @example
 * ```typescript
 * // Undefined values
 * isUndefined(undefined)           // true
 * isUndefined(void 0)             // true
 * 
 * let uninitialized: string
 * isUndefined(uninitialized)      // true
 * 
 * // Not undefined (including null)
 * isUndefined(null)               // false
 * isUndefined("")                 // false
 * isUndefined(0)                  // false
 * isUndefined(false)              // false
 * isUndefined(NaN)                // false
 * isUndefined([])                 // false
 * isUndefined({})                 // false
 * 
 * // Checking function parameters
 * function greet(name?: string, title?: string) {
 *   if (isUndefined(name)) {
 *     return "Hello, stranger!"
 *   }
 *   if (isUndefined(title)) {
 *     return `Hello, ${name}!`
 *   }
 *   return `Hello, ${title} ${name}!`
 * }
 * 
 * greet()                         // "Hello, stranger!"
 * greet("Alice")                  // "Hello, Alice!"
 * greet("Alice", "Dr.")           // "Hello, Dr. Alice!"
 * greet("Alice", undefined)       // "Hello, Alice!"
 * 
 * // Object property checks
 * interface Config {
 *   host?: string
 *   port?: number
 *   secure?: boolean
 * }
 * 
 * const config: Config = { host: "localhost" }
 * 
 * isUndefined(config.host)        // false
 * isUndefined(config.port)        // true
 * isUndefined(config.secure)      // true
 * 
 * // Distinguishing undefined from null
 * type ApiResponse = {
 *   data: string | null | undefined
 *   error: string | null | undefined
 * }
 * 
 * const handleResponse = (response: ApiResponse) => {
 *   if (isUndefined(response.data)) {
 *     return "No data received yet" // Not loaded
 *   }
 *   if (response.data === null) {
 *     return "Data explicitly empty" // Loaded but empty
 *   }
 *   return response.data // Has data
 * }
 * 
 * handleResponse({ data: undefined, error: null })  // "No data received yet"
 * handleResponse({ data: null, error: null })       // "Data explicitly empty"
 * handleResponse({ data: "result", error: null })   // "result"
 * 
 * // Array filtering
 * const values = [1, undefined, 2, null, 3, undefined]
 * const withoutUndefined = values.filter(v => !isUndefined(v))
 * // [1, 2, null, 3]
 * 
 * // Default parameter pattern
 * const configure = (options?: Partial<Config>) => {
 *   const defaults: Config = {
 *     host: "localhost",
 *     port: 3000,
 *     secure: false
 *   }
 *   
 *   if (isUndefined(options)) {
 *     return defaults
 *   }
 *   
 *   return {
 *     host: isUndefined(options.host) ? defaults.host : options.host,
 *     port: isUndefined(options.port) ? defaults.port : options.port,
 *     secure: isUndefined(options.secure) ? defaults.secure : options.secure
 *   }
 * }
 * 
 * configure()                      // { host: "localhost", port: 3000, secure: false }
 * configure({ port: 8080 })        // { host: "localhost", port: 8080, secure: false }
 * configure({ host: undefined })   // { host: "localhost", port: 3000, secure: false }
 * 
 * // Map/Set operations
 * const map = new Map<string, string | undefined>()
 * map.set("key1", "value1")
 * map.set("key2", undefined)
 * 
 * isUndefined(map.get("key1"))    // false
 * isUndefined(map.get("key2"))    // true (explicitly set to undefined)
 * isUndefined(map.get("key3"))    // true (not in map)
 * 
 * // Type narrowing
 * const process = (value: string | undefined) => {
 *   if (isUndefined(value)) {
 *     // TypeScript knows value is undefined here
 *     return "No value"
 *   }
 *   // TypeScript knows value is string here
 *   return value.toUpperCase()
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Strict - Uses === to check only for undefined, not null
 * @property TypeGuard - Can be used for TypeScript type narrowing
 * @property Total - Handles all possible input values
 */
const isUndefined = (value: unknown): value is undefined => 
	value === undefined

export default isUndefined