/**
 * Converts a function to a thunk (zero-argument function)
 * Delays execution by wrapping in a parameterless function
 *
 * @pure Creates a new function without side effects
 * @curried Function is curried with bound arguments
 * @param fn - Function to thunkify
 * @param args - Arguments to bind to the function
 * @returns Thunk that executes the function with bound arguments
 * @example
 * ```typescript
 * // Delay execution of expensive operations
 * const expensiveCalc = (a: number, b: number) => {
 *   console.log("Calculating...")
 *   return a * b * Math.random()
 * }
 *
 * const delayedCalc = thunkify(expensiveCalc, 10, 20)
 * // Nothing logged yet
 *
 * const result = delayedCalc() // Now logs "Calculating..."
 *
 * // Create multiple thunks for later execution
 * const tasks = [
 *   thunkify(console.log, "First"),
 *   thunkify(console.log, "Second"),
 *   thunkify(console.log, "Third")
 * ]
 *
 * // Works with async functions
 * const fetchUser = async (id: number) => {
 *   const response = await fetch(`/api/users/${id}`)
 *   return response.json()
 * }
 *
 * const getUserLater = thunkify(fetchUser, 123)
 * const user = await getUserLater()
 * ```
 *
 * Note: Thunks are useful for lazy evaluation, delayed execution,
 * and controlling when side effects occur.
 */
const thunkify = <T extends ReadonlyArray<unknown>, R>(
	fn: (...args: T) => R,
	...args: T
): () => R =>
() => fn(...args)

export default thunkify
