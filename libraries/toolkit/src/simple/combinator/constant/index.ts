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
 * @example
 * ```typescript
 * // Basic constant function
 * const constantTrue = constant(true)
 * constantTrue()           // true
 * constantTrue(false)      // true
 * constantTrue(1, 2, 3)    // true
 *
 * // Constant null for optional handlers
 * const noOp = constant(null)
 * noOp("ignored")          // null
 * noOp(123, "abc")         // null
 *
 * // Use with array methods
 * const zeros = [1, 2, 3, 4, 5].map(constant(0))
 * // [0, 0, 0, 0, 0]
 *
 * const allTrue = [1, 2, 3].map(constant(true))
 * // [true, true, true]
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
 * // Event handlers that do nothing
 * const preventClick = constant(undefined)
 * button.addEventListener("click", preventClick)
 *
 * // Reduce to constant value
 * const sum = [1, 2, 3].reduce(
 *   (acc, val) => acc + val,
 *   constant(100)()  // Start with 100
 * )
 * // 106
 *
 * // Replace complex logic with constant for debugging
 * const calculate = process.env.DEBUG
 *   ? constant(999)  // Debug: always return 999
 *   : (x: number) => complexCalculation(x)
 *
 * // Promise resolution
 * const resolveWith = <T>(value: T) =>
 *   Promise.resolve().then(constant(value))
 *
 * await resolveWith("done")  // "done"
 *
 * // Option/Maybe pattern
 * const None = constant(null)
 * const Some = <T>(value: T) => constant(value)
 *
 * const result = hasValue ? Some(data) : None
 * result()  // data or null
 *
 * // Composition with other combinators
 * import { compose } from "../compose"
 * const alwaysTen = compose(
 *   constant(10),
 *   (x: number) => x * 2  // This is ignored
 * )
 * alwaysTen(5)  // 10
 *
 * // Factory functions
 * const createDefaultSettings = constant({
 *   theme: "light",
 *   language: "en",
 *   notifications: true
 * })
 *
 * const settings1 = createDefaultSettings()
 * const settings2 = createDefaultSettings()
 * // Note: Returns same object reference
 *
 * // State machine transitions
 * const transitions = {
 *   idle: {
 *     START: constant("running"),
 *     STOP: constant("idle")
 *   },
 *   running: {
 *     PAUSE: constant("paused"),
 *     STOP: constant("idle")
 *   }
 * }
 *
 * // Validation that always passes/fails
 * const alwaysValid = constant(true)
 * const alwaysInvalid = constant(false)
 *
 * const validators = [
 *   checkLength,
 *   checkFormat,
 *   process.env.SKIP_VALIDATION ? alwaysValid : checkContent
 * ]
 * ```
 * @property K-combinator - implements the K combinator from combinatory logic
 * @property Referential-transparency - always returns the same value
 * @property Argument-ignoring - accepts but ignores all arguments
 */
const constant = <T>(value: T) => (..._args: ReadonlyArray<unknown>): T => value

export default constant
