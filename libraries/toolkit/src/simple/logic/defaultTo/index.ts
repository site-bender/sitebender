/**
 * Returns a default value if the input is null or undefined
 *
 * Provides a fallback value when the input is nullish (null or undefined).
 * Unlike logical OR (||), this only falls back for null/undefined, not for
 * other falsy values like 0, false, or empty string. This is equivalent to
 * the nullish coalescing operator (??) but in functional form.
 *
 * @curried (defaultValue) => (value) => result
 * @param defaultValue - The fallback value to use if input is nullish
 * @param value - The value to check
 * @returns The input value if not nullish, otherwise the default value
 * @example
 * ```typescript
 * // Basic usage with null/undefined
 * defaultTo("default")(null)           // "default"
 * defaultTo("default")(undefined)      // "default"
 * defaultTo("default")("value")        // "value"
 * defaultTo(0)(null)                   // 0
 * defaultTo([])(undefined)             // []
 *
 * // Preserves falsy values (unlike ||)
 * defaultTo("default")(0)              // 0 (not replaced)
 * defaultTo("default")(false)          // false (not replaced)
 * defaultTo("default")("")             // "" (not replaced)
 * defaultTo("default")(NaN)            // NaN (not replaced)
 * defaultTo("default")([])             // [] (not replaced)
 *
 * // Partial application
 * const withDefault = defaultTo("N/A")
 * withDefault(null)                    // "N/A"
 * withDefault("John")                  // "John"
 * withDefault("")                      // "" (empty string preserved)
 *
 * const withZero = defaultTo(0)
 * withZero(undefined)                  // 0
 * withZero(42)                         // 42
 * withZero(-5)                         // -5
 *
 * // Configuration with defaults
 * const getPort = defaultTo(3000)
 * getPort(process.env.PORT)            // PORT value or 3000
 * getPort(undefined)                   // 3000
 * getPort(8080)                        // 8080
 * getPort(0)                           // 0 (explicit zero preserved)
 *
 * // Object property defaults
 * interface Config {
 *   timeout?: number
 *   retries?: number
 *   debug?: boolean
 * }
 *
 * function parseConfig(config: Config) {
 *   return {
 *     timeout: defaultTo(5000)(config.timeout),
 *     retries: defaultTo(3)(config.retries),
 *     debug: defaultTo(false)(config.debug)
 *   }
 * }
 *
 * parseConfig({})
 * // { timeout: 5000, retries: 3, debug: false }
 *
 * parseConfig({ timeout: 0, debug: true })
 * // { timeout: 0, retries: 3, debug: true }
 *
 * // Array element defaults
 * const firstOrDefault = <T>(arr: T[], fallback: T): T =>
 *   defaultTo(fallback)(arr[0])
 *
 * firstOrDefault([1, 2, 3], 0)         // 1
 * firstOrDefault([], 0)                // 0
 * firstOrDefault([null, 2, 3], 0)      // 0
 * firstOrDefault([false, 2, 3], true)  // false (preserves falsy)
 *
 * // Form field processing
 * const processField = (value: string | null | undefined) =>
 *   defaultTo("")(value).trim()
 *
 * processField("  hello  ")            // "hello"
 * processField(null)                   // ""
 * processField(undefined)              // ""
 * processField("")                     // ""
 *
 * // API response handling
 * interface ApiResponse {
 *   data?: string
 *   count?: number
 *   success?: boolean
 * }
 *
 * const handleResponse = (response: ApiResponse) => ({
 *   data: defaultTo("No data")(response.data),
 *   count: defaultTo(0)(response.count),
 *   success: defaultTo(false)(response.success)
 * })
 *
 * handleResponse({ data: "result" })
 * // { data: "result", count: 0, success: false }
 *
 * handleResponse({ count: 0, success: true })
 * // { data: "No data", count: 0, success: true }
 *
 * // Chaining defaults
 * const primary = null
 * const secondary = undefined
 * const tertiary = "fallback"
 *
 * const result = defaultTo(
 *   defaultTo(tertiary)(secondary)
 * )(primary)                           // "fallback"
 *
 * // Database query defaults
 * const getUser = (id: number | null) => {
 *   const userId = defaultTo(0)(id)
 *   return database.findUser(userId)
 * }
 *
 * getUser(123)                         // Searches for user 123
 * getUser(null)                        // Searches for user 0 (guest)
 *
 * // Nullable chain handling
 * const getUserName = (user: User | null) =>
 *   defaultTo("Guest")(user?.name)
 *
 * getUserName({ name: "Alice" })       // "Alice"
 * getUserName({ name: null })          // "Guest"
 * getUserName(null)                    // "Guest"
 *
 * // Comparison with OR operator
 * const value = 0
 * const orResult = value || 10         // 10 (replaces falsy 0)
 * const defaultResult = defaultTo(10)(value) // 0 (preserves 0)
 *
 * // Type-safe defaults
 * function getLength<T extends { length: number }>(
 *   value: T | null | undefined,
 *   fallback: T
 * ): number {
 *   return defaultTo(fallback)(value).length
 * }
 *
 * getLength("hello", "")               // 5
 * getLength(null, "default")           // 7
 * getLength([1, 2, 3], [])             // 3
 * getLength(undefined, [0])            // 1
 *
 * // Settings with boolean defaults
 * const settings = {
 *   darkMode: undefined,
 *   autoSave: false,
 *   notifications: true
 * }
 *
 * const getDarkMode = defaultTo(true)
 * const getAutoSave = defaultTo(true)
 * const getNotifications = defaultTo(false)
 *
 * getDarkMode(settings.darkMode)       // true (undefined → default)
 * getAutoSave(settings.autoSave)       // false (explicit false preserved)
 * getNotifications(settings.notifications) // true
 *
 * // Pipeline with defaults
 * const pipeline = [
 *   (x: number | null) => defaultTo(0)(x),
 *   (x: number) => x * 2,
 *   (x: number) => x + 10
 * ]
 *
 * const process = (value: number | null) =>
 *   pipeline.reduce((acc, fn) => fn(acc), value)
 *
 * process(5)                           // 20 (5 * 2 + 10)
 * process(null)                        // 10 (0 * 2 + 10)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable defaults
 * @property Nullish-only - Only replaces null/undefined, not other falsy values
 */
const defaultTo = <T>(defaultValue: T) =>
(
	value: T | null | undefined,
): T => value ?? defaultValue

export default defaultTo
