/**
 * Wraps a function with a wrapper function
 * The wrapper receives the original function as its first argument
 *
 * @param fn - Function to wrap
 * @param wrapper - Wrapper function that receives fn as first arg
 * @returns Wrapped function
 * @example
 * ```typescript
 * // Add logging to a function
 * const add = (a: number, b: number) => a + b
 *
 * const withLogging = wrap(add, (fn, a: number, b: number) => {
 *   console.log(`Calling add(${a}, ${b})`)
 *   const result = fn(a, b)
 *   console.log(`Result: ${result}`)
 *   return result
 * })
 *
 * withLogging(3, 5) // Logs: "Calling add(3, 5)", "Result: 8", returns 8
 *
 * // Add timing to functions
 * const slow = (n: number) => {
 *   let sum = 0
 *   for (let i = 0; i < n * 1000000; i++) sum += i
 *   return sum
 * }
 *
 * const timed = wrap(slow, (fn, ...args) => {
 *   const start = Date.now()
 *   const result = fn(...args)
 *   console.log(`Took ${Date.now() - start}ms`)
 *   return result
 * })
 *
 * timed(100) // Logs execution time
 *
 * // Add validation
 * const divide = (a: number, b: number) => a / b
 *
 * const safeDivide = wrap(divide, (fn, a: number, b: number) => {
 *   if (b === 0) {
 *     console.error("Division by zero!")
 *     return 0
 *   }
 *   return fn(a, b)
 * })
 *
 * safeDivide(10, 2) // 5
 * safeDivide(10, 0) // 0 (logs error)
 *
 * // Modify arguments before calling
 * const greet = (name: string) => `Hello, ${name}!`
 *
 * const loudGreet = wrap(greet, (fn, name: string) => {
 *   return fn(name.toUpperCase())
 * })
 *
 * loudGreet("alice") // "Hello, ALICE!"
 *
 * // Cache results
 * const expensive = (x: number) => {
 *   console.log("Computing...")
 *   return x * x * x
 * }
 *
 * const cached = wrap(expensive, (() => {
 *   const cache = new Map()
 *   return (fn: Function, x: number) => {
 *     if (!cache.has(x)) {
 *       cache.set(x, fn(x))
 *     }
 *     return cache.get(x)
 *   }
 * })())
 *
 * cached(5) // Logs "Computing...", returns 125
 * cached(5) // Returns 125 from cache
 * ```
 *
 * Note: The wrapper has full control over whether, when, and how
 * to call the original function.
 */
// deno-lint-ignore no-explicit-any
const wrap = <T extends ReadonlyArray<any>, R>(
	fn: (...args: T) => R,
	wrapper: (fn: (...args: T) => R, ...args: T) => R,
) =>
(...args: T): R => wrapper(fn, ...args)

export default wrap
