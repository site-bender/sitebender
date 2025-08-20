/**
 * Conditionally applies a function when a predicate is falsy
 * 
 * Applies a transformation function to a value only when a predicate
 * returns falsy; otherwise returns the value unchanged. This is the
 * inverse of `when` - it applies the function when the condition is
 * NOT met, useful for handling negative conditions or defaults.
 * 
 * @curried (predicate) => (fn) => (value) => result
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
 * addPrefixUnlessPresent("https://api.com") // "https://api.com" (unchanged)
 * 
 * // Partial application
 * const unlessEmpty = unless((s: string) => s.length > 0)
 * 
 * const useDefault = unlessEmpty(() => "default")
 * useDefault("value")                  // "value" (not empty, unchanged)
 * useDefault("")                       // "default" (empty, transformed)
 * 
 * const throwError = unlessEmpty(() => {
 *   throw new Error("Value required")
 * })
 * // throwError("") would throw an error
 * 
 * // Object defaults
 * interface Config {
 *   timeout?: number
 *   retries?: number
 *   baseUrl?: string
 * }
 * 
 * const addDefaultsUnlessProvided = unless(
 *   (c: Config) => c.timeout && c.retries && c.baseUrl,
 *   (c: Config) => ({
 *     timeout: c.timeout ?? 5000,
 *     retries: c.retries ?? 3,
 *     baseUrl: c.baseUrl ?? "http://localhost"
 *   })
 * )
 * 
 * addDefaultsUnlessProvided({ timeout: 1000, retries: 5, baseUrl: "api.com" })
 * // { timeout: 1000, retries: 5, baseUrl: "api.com" } (all provided, unchanged)
 * 
 * addDefaultsUnlessProvided({ timeout: 1000 })
 * // { timeout: 1000, retries: 3, baseUrl: "http://localhost" } (defaults added)
 * 
 * // Array initialization
 * const initializeUnlessPopulated = unless(
 *   (arr: unknown[]) => arr.length > 0,
 *   () => [1, 2, 3]  // Default array
 * )
 * 
 * initializeUnlessPopulated([4, 5])    // [4, 5] (has items, unchanged)
 * initializeUnlessPopulated([])        // [1, 2, 3] (empty, initialized)
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
 * // Error handling
 * const wrapInErrorUnlessSuccess = unless(
 *   (result: { success: boolean }) => result.success,
 *   (result: unknown) => ({
 *     success: false,
 *     error: "Operation failed",
 *     originalResult: result
 *   })
 * )
 * 
 * wrapInErrorUnlessSuccess({ success: true, data: "ok" })
 * // { success: true, data: "ok" } (unchanged)
 * 
 * wrapInErrorUnlessSuccess({ success: false })
 * // { success: false, error: "Operation failed", originalResult: { success: false } }
 * 
 * // Pipeline integration
 * const pipeline = [
 *   (x: number) => x * 2,
 *   unless(
 *     (x: number) => x > 10,
 *     (x: number) => x + 100  // Add 100 unless greater than 10
 *   ),
 *   (x: number) => Math.round(x)
 * ]
 * 
 * const process = (value: number) =>
 *   pipeline.reduce((acc, fn) => fn(acc), value)
 * 
 * process(2)                           // 104 (2*2=4, 4<=10, 4+100=104)
 * process(10)                          // 20 (10*2=20, 20>10, unchanged)
 * 
 * // Null safety
 * const ensureNotNullUnlessValid = unless(
 *   (value: unknown) => value !== null && value !== undefined,
 *   () => ({ placeholder: true })
 * )
 * 
 * ensureNotNullUnlessValid("data")     // "data" (valid, unchanged)
 * ensureNotNullUnlessValid(0)          // 0 (valid, unchanged)
 * ensureNotNullUnlessValid(null)       // { placeholder: true }
 * ensureNotNullUnlessValid(undefined)  // { placeholder: true }
 * 
 * // Authentication fallback
 * const redirectUnlessAuthenticated = unless(
 *   (user: { isAuth?: boolean }) => user.isAuth === true,
 *   () => ({ redirect: "/login", message: "Please log in" })
 * )
 * 
 * redirectUnlessAuthenticated({ isAuth: true, name: "Alice" })
 * // { isAuth: true, name: "Alice" } (authenticated, unchanged)
 * 
 * redirectUnlessAuthenticated({ name: "Bob" })
 * // { redirect: "/login", message: "Please log in" }
 * 
 * // Cache invalidation
 * const refreshUnlessCurrent = unless(
 *   (cache: { timestamp: number }) => 
 *     Date.now() - cache.timestamp < 60000,  // Less than 1 minute old
 *   (cache: { data: unknown }) => ({
 *     ...cache,
 *     data: fetchFreshData(),
 *     timestamp: Date.now()
 *   })
 * )
 * 
 * function fetchFreshData() {
 *   return { refreshed: true }
 * }
 * 
 * // Logging
 * const logUnlessQuiet = unless(
 *   () => process.env.QUIET_MODE === "true",
 *   <T>(data: T) => {
 *     console.log("Processing:", data)
 *     return data
 *   }
 * )
 * 
 * // Form field normalization
 * const trimUnlessNumber = unless(
 *   (value: unknown) => typeof value === "number",
 *   (value: unknown) => 
 *     typeof value === "string" ? value.trim() : value
 * )
 * 
 * trimUnlessNumber("  text  ")         // "text" (string, trimmed)
 * trimUnlessNumber(42)                 // 42 (number, unchanged)
 * trimUnlessNumber(true)               // true (boolean, unchanged but not trimmed)
 * 
 * // Chaining unless conditions
 * const processData = (data: unknown) => {
 *   const addTimestamp = unless(
 *     (d: any) => d.timestamp,
 *     (d: unknown) => ({ ...d, timestamp: Date.now() })
 *   )
 *   
 *   const addId = unless(
 *     (d: any) => d.id,
 *     (d: unknown) => ({ ...d, id: Math.random().toString(36) })
 *   )
 *   
 *   return addId(addTimestamp(data))
 * }
 * 
 * processData({ value: "test" })
 * // { value: "test", timestamp: 1234567890, id: "abc123" }
 * 
 * processData({ value: "test", timestamp: 1000, id: "existing" })
 * // { value: "test", timestamp: 1000, id: "existing" } (unchanged)
 * 
 * // Type narrowing
 * const parseUnlessNumber = unless(
 *   (v: unknown): v is number => typeof v === "number",
 *   (v: unknown) => {
 *     const parsed = Number(v)
 *     return isNaN(parsed) ? 0 : parsed
 *   }
 * )
 * 
 * parseUnlessNumber(42)                // 42 (already number, unchanged)
 * parseUnlessNumber("42")              // 42 (string, parsed)
 * parseUnlessNumber("abc")             // 0 (invalid, default)
 * 
 * // Retry logic
 * let attempts = 0
 * const retryUnlessSuccessful = unless(
 *   (result: { ok: boolean }) => result.ok,
 *   (result: { ok: boolean }) => {
 *     if (attempts < 3) {
 *       attempts++
 *       return performOperation()
 *     }
 *     return { ...result, maxRetriesExceeded: true }
 *   }
 * )
 * 
 * function performOperation() {
 *   return { ok: Math.random() > 0.5 }
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Curried - Allows partial application for reusable conditions
 * @property Non-destructive - Returns original value when condition is met
 */
const unless = <T>(
	predicate: (value: T) => unknown
) => (
	fn: (value: T) => T
) => (
	value: T
): T => !predicate(value) ? fn(value) : value

export default unless