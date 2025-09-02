/**
 * Type guard that checks if a value is an Error object
 *
 * Determines whether a value is an instance of Error or its subclasses. This includes
 * built-in error types (TypeError, RangeError, etc.) and custom error classes that
 * extend Error. Useful for error handling, logging, and type narrowing in catch blocks.
 * Note that this uses instanceof, so it may fail for errors from different realms.
 *
 * Error detection:
 * - Error instances: created with new Error() or thrown
 * - Built-in errors: TypeError, RangeError, SyntaxError, etc.
 * - Custom errors: classes extending Error
 * - DOMException: browser-specific errors
 * - AggregateError: multiple errors (ES2021)
 * - Not included: error-like objects without Error prototype
 *
 * @param value - The value to check
 * @returns True if the value is an Error instance, false otherwise
 * @example
 * ```typescript
 * // Basic Error instances
 * isError(new Error("oops"))              // true
 * isError(new TypeError("type error"))    // true
 * isError(new RangeError("out of range")) // true
 *
 * // Not errors
 * isError("error message")                // false
 * isError({ message: "error" })           // false
 * isError(null)                           // false
 *
 * // Type narrowing in TypeScript
 * function logError(value: unknown): void {
 *   if (isError(value)) {
 *     // TypeScript knows value is Error here
 *     console.error(value.message)
 *     console.error(value.stack)
 *   }
 * }
 *
 * // Try-catch error handling
 * try {
 *   JSON.parse("invalid json")
 * } catch (e) {
 *   if (isError(e)) {
 *     console.log("Error:", e.message)
 *   }
 * }
 *
 * // Error filtering
 * const results = [
 *   { success: true, data: "OK" },
 *   new Error("Failed"),
 *   new TypeError("Wrong type"),
 * ]
 * const errors = results.filter(isError)  // [Error("Failed"), TypeError("Wrong type")]
 * ```
 * @pure
 * @predicate
 */
const isError = (value: unknown): value is Error => value instanceof Error

export default isError
