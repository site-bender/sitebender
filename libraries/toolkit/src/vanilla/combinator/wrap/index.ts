/**
 * Wraps a function with a wrapper function
 * The wrapper receives the original function as its first argument
 *
 * @pure Creates a new function without side effects (wrapper behavior depends on implementation)
 * @curried Function is curried with wrapper function
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
