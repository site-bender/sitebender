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
 * isError(new Error())                    // true
 * isError(Error("without new"))           // true
 *
 * // Built-in error types
 * isError(new TypeError("type error"))    // true
 * isError(new RangeError("out of range")) // true
 * isError(new SyntaxError("syntax"))      // true
 * isError(new ReferenceError("undefined"))// true
 * isError(new EvalError("eval"))          // true
 * isError(new URIError("URI"))            // true
 *
 * // Modern error types
 * isError(new AggregateError([            // true
 *   new Error("first"),
 *   new Error("second")
 * ]))
 *
 * // Custom error classes
 * class ValidationError extends Error {
 *   constructor(message: string) {
 *     super(message)
 *     this.name = "ValidationError"
 *   }
 * }
 *
 * isError(new ValidationError("invalid")) // true
 *
 * // Not errors
 * isError("error message")                // false
 * isError({ message: "error" })           // false
 * isError({ name: "Error", message: "oops" }) // false
 * isError(null)                           // false
 * isError(undefined)                      // false
 * isError(404)                            // false
 *
 * // Type narrowing in TypeScript
 * function logError(value: unknown): void {
 *   if (isError(value)) {
 *     // TypeScript knows value is Error here
 *     console.error(value.message)
 *     console.error(value.stack)
 *   } else {
 *     console.error("Unknown error:", value)
 *   }
 * }
 *
 * // Try-catch error handling
 * try {
 *   JSON.parse("invalid json")
 * } catch (e) {
 *   if (isError(e)) {
 *     console.log("Error:", e.message)
 *   } else {
 *     console.log("Unknown error:", e)
 *   }
 * }
 *
 * // Promise rejection handling
 * async function fetchData() {
 *   try {
 *     const response = await fetch("/api/data")
 *     return response.json()
 *   } catch (error) {
 *     if (isError(error)) {
 *       throw new Error(`Fetch failed: ${error.message}`)
 *     }
 *     throw error
 *   }
 * }
 *
 * // Error filtering
 * const results = [
 *   { success: true, data: "OK" },
 *   new Error("Failed"),
 *   { success: false, error: "Not found" },
 *   new TypeError("Wrong type"),
 *   null
 * ]
 *
 * const errors = results.filter(isError)
 * // [Error("Failed"), TypeError("Wrong type")]
 *
 * // Error wrapping
 * function wrapError(value: unknown): Error {
 *   if (isError(value)) {
 *     return value
 *   }
 *   if (typeof value === "string") {
 *     return new Error(value)
 *   }
 *   return new Error(String(value))
 * }
 *
 * wrapError(new Error("existing"))        // Error("existing")
 * wrapError("string error")               // Error("string error")
 * wrapError({ code: 500 })                // Error("[object Object]")
 *
 * // Error cause chain (ES2022)
 * const cause = new Error("Database connection failed")
 * const wrapped = new Error("Failed to fetch user", { cause })
 *
 * isError(wrapped)                        // true
 * isError(wrapped.cause)                  // true
 *
 * // Validation with errors
 * interface ValidationResult {
 *   valid: boolean
 *   error?: unknown
 * }
 *
 * function validate(value: unknown): ValidationResult {
 *   try {
 *     // Some validation logic
 *     if (typeof value !== "string") {
 *       throw new TypeError("Must be a string")
 *     }
 *     return { valid: true }
 *   } catch (e) {
 *     return { valid: false, error: e }
 *   }
 * }
 *
 * const result = validate(123)
 * if (!result.valid && isError(result.error)) {
 *   console.log("Validation error:", result.error.message)
 * }
 *
 * // Error serialization
 * function serializeError(error: unknown): object {
 *   if (!isError(error)) {
 *     return { message: String(error) }
 *   }
 *
 *   return {
 *     name: error.name,
 *     message: error.message,
 *     stack: error.stack,
 *     ...(error.cause && { cause: serializeError(error.cause) })
 *   }
 * }
 *
 * // Event emitter error handling
 * class EventEmitter {
 *   emit(event: string, data: unknown) {
 *     if (event === "error" && !isError(data)) {
 *       throw new TypeError("Error event must emit Error object")
 *     }
 *     // ... emit logic
 *   }
 * }
 *
 * // Multiple error types check
 * function isNetworkError(value: unknown): boolean {
 *   if (!isError(value)) return false
 *
 *   return value.name === "NetworkError" ||
 *          value.message.includes("fetch") ||
 *          value.message.includes("network")
 * }
 *
 * // React error boundary
 * class ErrorBoundary extends React.Component {
 *   componentDidCatch(error: unknown, errorInfo: unknown) {
 *     if (isError(error)) {
 *       logToService({
 *         message: error.message,
 *         stack: error.stack,
 *         componentStack: errorInfo?.componentStack
 *       })
 *     }
 *   }
 * }
 *
 * // Async error collection
 * async function runTasks(tasks: Array<() => Promise<unknown>>) {
 *   const results = await Promise.allSettled(tasks.map(t => t()))
 *   const errors = results
 *     .filter(r => r.status === "rejected")
 *     .map(r => r.reason)
 *     .filter(isError)
 *
 *   if (errors.length > 0) {
 *     throw new AggregateError(errors, "Multiple tasks failed")
 *   }
 * }
 *
 * // DOMException handling (browser)
 * try {
 *   localStorage.setItem("key", "value") // May throw QuotaExceededError
 * } catch (e) {
 *   if (isError(e) && e.name === "QuotaExceededError") {
 *     console.log("Storage quota exceeded")
 *   }
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to Error
 * @property Instanceof - Uses instanceof Error internally
 * @property Inheritance - Returns true for Error subclasses
 */
const isError = (value: unknown): value is Error => value instanceof Error

export default isError
