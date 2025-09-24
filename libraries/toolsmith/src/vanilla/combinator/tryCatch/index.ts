/**
 * Wraps a function to catch errors and call an error handler
 * Provides a functional way to handle exceptions
 *
 * @pure Creates a new function without side effects (error handling is functional)
 * @curried Function is curried with error handler
 * @param tryFn - Function that might throw
 * @param catchFn - Function to handle errors
 * @returns Wrapped function that catches errors
 * @example
 * ```typescript
 * const parseJSON = (str: string) => JSON.parse(str)
 * const safeParseJSON = tryCatch(
 *   parseJSON,
 *   (error, str) => {
 *     console.error("Failed to parse:", str)
 *     return null
 *   }
 * )
 *
 * safeParseJSON('{"valid": "json"}') // { valid: "json" }
 * safeParseJSON('invalid json') // null (logs error)
 *
 * // Can transform errors
 * const divide = (a: number, b: number) => {
 *   if (b === 0) throw new Error("Division by zero")
 *   return a / b
 * }
 *
 * const safeDivide = tryCatch(
 *   divide,
 *   (error) => Infinity // Return infinity for division by zero
 * )
 * ```
 *
 * Note: The catch function receives both the error and the original arguments.
 * This allows for context-aware error handling.
 */
// deno-lint-ignore no-explicit-any
const tryCatch = <T extends ReadonlyArray<any>, R, E>(
	tryFn: (...args: T) => R,
	catchFn: (error: unknown, ...args: T) => E,
) =>
(...args: T): R | E => {
	try {
		return tryFn(...args)
	} catch (error) {
		return catchFn(error, ...args)
	}
}

export default tryCatch
