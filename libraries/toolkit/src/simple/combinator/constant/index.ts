/**
 * Returns a function that always returns the given value
 *
 * Creates a constant function that ignores all arguments and always returns
 * the same value. This provides a clear, descriptive name that emphasizes
 * the constant nature of the returned function. Useful in functional
 * composition, default values, and testing.
 *
 * @param value - The value to constantly return
 * @returns Function that ignores its arguments and returns value
 * @pure
 * @idempotent
 * @example
 * ```typescript
 * // Basic constant function
 * const constantTrue = constant(true)
 * constantTrue()           // true
 * constantTrue(false)      // true
 * constantTrue(1, 2, 3)    // true
 *
 * // Use with array methods
 * const zeros = [1, 2, 3, 4, 5].map(constant(0))
 * // [0, 0, 0, 0, 0]
 *
 * // Create default responses
 * const defaultUser = constant({
 *   id: 0,
 *   name: "Guest",
 *   role: "visitor"
 * })
 *
 * const getUser = (id: number) =>
 *   id > 0 ? fetchUser(id) : defaultUser()
 *
 * // Filter operations
 * const items = ["a", "b", "c", "d"]
 * items.filter(constant(true))   // ["a", "b", "c", "d"]
 * items.filter(constant(false))  // []
 *
 * // Conditional logic with constant values
 * const getValue = (useDefault: boolean) =>
 *   useDefault ? constant(42) : (x: number) => x * 2
 *
 * const fn1 = getValue(true)
 * const fn2 = getValue(false)
 * fn1(10)  // 42 (ignores input)
 * fn2(10)  // 20 (processes input)
 *
 * // Mock functions for testing
 * const mockService = {
 *   getConfig: constant({ apiUrl: "http://test.com" }),
 *   getToken: constant("mock-token-123"),
 *   isAuthenticated: constant(true)
 * }
 *
 * // Promise resolution
 * const resolveWith = <T>(value: T) =>
 *   Promise.resolve().then(constant(value))
 *
 * await resolveWith("done")  // "done"
 * ```
 */
const constant = <T>(value: T) => (..._args: ReadonlyArray<unknown>): T => value

export default constant
