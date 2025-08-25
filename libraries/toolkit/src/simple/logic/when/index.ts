/**
 * Conditionally applies a function when a predicate is truthy
 *
 * Applies a transformation function to a value only when a predicate
 * returns truthy; otherwise returns the value unchanged. This is useful
 * for conditional transformations in pipelines where you want to
 * optionally modify data based on certain conditions.
 *
 * @curried (predicate) => (fn) => (value) => result
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
 * capitalizeIfShort("hello")           // "HELLO"
 * capitalizeIfShort("greeting")        // "greeting" (too long, unchanged)
 *
 * // Partial application
 * const whenPositive = when((n: number) => n > 0)
 *
 * const increment = whenPositive((n: number) => n + 1)
 * increment(5)                         // 6
 * increment(-5)                        // -5 (unchanged)
 *
 * const square = whenPositive((n: number) => n * n)
 * square(4)                            // 16
 * square(-4)                           // -4 (unchanged)
 *
 * // Object modification
 * interface User {
 *   name: string
 *   age: number
 *   premium?: boolean
 * }
 *
 * const addPremiumBadge = when(
 *   (u: User) => u.premium === true,
 *   (u: User) => ({ ...u, name: `⭐ ${u.name}` })
 * )
 *
 * addPremiumBadge({ name: "Alice", age: 30, premium: true })
 * // { name: "⭐ Alice", age: 30, premium: true }
 *
 * addPremiumBadge({ name: "Bob", age: 25 })
 * // { name: "Bob", age: 25 } (unchanged)
 *
 * // Array processing
 * const sortIfLarge = when(
 *   (arr: number[]) => arr.length > 10,
 *   (arr: number[]) => [...arr].sort((a, b) => a - b)
 * )
 *
 * sortIfLarge([3, 1, 2])               // [3, 1, 2] (too small, unchanged)
 * sortIfLarge([...Array(15).keys()].reverse())
 * // [0, 1, 2, ..., 14] (large array, sorted)
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
 *
 * const process = (value: number) =>
 *   pipeline.reduce((acc, fn) => fn(acc), value)
 *
 * process(2)                           // 12 (2+10=12, 12<=15, unchanged)
 * process(10)                          // 40 (10+10=20, 20>15, 20*2=40)
 *
 * // Caching logic
 * const cache = new Map<string, unknown>()
 *
 * const cacheIfExpensive = when(
 *   (key: string) => key.startsWith("expensive_"),
 *   (key: string) => {
 *     const value = computeExpensiveValue(key)
 *     cache.set(key, value)
 *     return value
 *   }
 * )
 *
 * function computeExpensiveValue(key: string) {
 *   return `computed_${key}`
 * }
 *
 * // Logging conditionally
 * const logIfError = when(
 *   (result: { status: string }) => result.status === "error",
 *   (result: { status: string; message?: string }) => {
 *     console.error(result.message)
 *     return result
 *   }
 * )
 *
 * logIfError({ status: "success" })    // No logging, returns unchanged
 * logIfError({ status: "error", message: "Failed" })  // Logs error, returns result
 *
 * // Rate limiting
 * let requestCount = 0
 * const rateLimitReset = Date.now() + 60000
 *
 * const throttleIfNeeded = when(
 *   () => requestCount > 100 && Date.now() < rateLimitReset,
 *   <T>(data: T) => {
 *     throw new Error("Rate limit exceeded")
 *   }
 * )
 *
 * // Data sanitization
 * const sanitizeIfUntrusted = when(
 *   (data: { source: string }) => data.source === "user-input",
 *   (data: { source: string; content: string }) => ({
 *     ...data,
 *     content: data.content.replace(/<script>/gi, "")
 *   })
 * )
 *
 * sanitizeIfUntrusted({ source: "user-input", content: "<script>alert()</script>" })
 * // { source: "user-input", content: "alert()" }
 *
 * sanitizeIfUntrusted({ source: "trusted", content: "<script>code</script>" })
 * // { source: "trusted", content: "<script>code</script>" } (unchanged)
 *
 * // Chaining when conditions
 * const processUser = (user: User) => {
 *   const withAge = when(
 *     (u: User) => u.age >= 18,
 *     (u: User) => ({ ...u, isAdult: true })
 *   )
 *
 *   const withDiscount = when(
 *     (u: User & { isAdult?: boolean }) => u.isAdult && u.age >= 65,
 *     (u: User) => ({ ...u, seniorDiscount: true })
 *   )
 *
 *   return withDiscount(withAge(user))
 * }
 *
 * processUser({ name: "Alice", age: 70 })
 * // { name: "Alice", age: 70, isAdult: true, seniorDiscount: true }
 *
 * processUser({ name: "Bob", age: 30 })
 * // { name: "Bob", age: 30, isAdult: true }
 *
 * processUser({ name: "Charlie", age: 16 })
 * // { name: "Charlie", age: 16 }
 *
 * // Performance optimization
 * const memoizeIfPure = when(
 *   (fn: Function) => fn.pure === true,
 *   (fn: Function) => {
 *     const cache = new Map()
 *     return (arg: unknown) => {
 *       if (cache.has(arg)) return cache.get(arg)
 *       const result = fn(arg)
 *       cache.set(arg, result)
 *       return result
 *     }
 *   }
 * )
 *
 * // Type guards
 * const processIfString = when(
 *   (v: unknown): v is string => typeof v === "string",
 *   (v: string) => v.trim().toLowerCase()
 * )
 *
 * processIfString("  HELLO  ")         // "hello"
 * processIfString(123)                 // 123 (unchanged)
 * processIfString(null)                // null (unchanged)
 *
 * // Feature flags
 * const enableFeature = when(
 *   () => process.env.FEATURE_FLAG === "enabled",
 *   (data: unknown) => enhanceWithFeature(data)
 * )
 *
 * function enhanceWithFeature(data: unknown) {
 *   return { ...data, enhanced: true }
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Curried - Allows partial application for reusable conditions
 * @property Non-destructive - Returns original value when condition not met
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
