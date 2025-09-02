/**
 * Runs a side effect function on a value and returns the value
 * Useful for debugging, logging, or performing side effects in a pipeline
 *
 * @impure
 * @param fn - Side effect function to run
 * @param value - Value to pass through
 * @returns The original value unchanged
 * @example
 * ```typescript
 * const double = (x: number) => x * 2
 * const log = (x: unknown) => console.log("Value:", x)
 *
 * // Use tap for debugging in a pipeline
 * const result = pipe([
 *   double,
 *   tap(log),  // Logs: "Value: 10"
 *   double,
 *   tap(log),  // Logs: "Value: 20"
 * ])(5) // Returns 20
 *
 * // Useful for side effects without breaking the chain
 * const saveToDatabase = (user: User) => {
 *   database.save(user) // Side effect
 * }
 *
 * const processUser = pipe([
 *   validateUser,
 *   tap(saveToDatabase), // Save but continue with original user
 *   formatUserResponse
 * ])
 *
 * // Can also be used standalone
 * const value = tap(console.log, "hello") // Logs "hello", returns "hello"
 * ```
 *
 * Note: The side effect function's return value is ignored.
 * Only the original value is returned.
 */
const tap = <T>(fn: (value: T) => unknown) => (value: T): T => {
	fn(value)
	return value
}

export default tap
