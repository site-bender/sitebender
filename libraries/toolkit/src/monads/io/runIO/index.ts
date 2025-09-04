import type { IO } from "../../types/fp/io/index.ts"

/**
 * Executes an IO computation and returns the result
 *
 * This is the function that actually performs the side effects contained
 * in an IO. Until runIO is called, the IO remains a pure value representing
 * a deferred computation. This function breaks the referential transparency
 * barrier and should be called at the edges of your program (main function,
 * event handlers, etc.) rather than within pure functional logic.
 *
 * @param io - The IO computation to execute
 * @returns The result of executing the IO
 * @impure
 * @example
 * ```typescript
 * import io from "../io/index.ts"
 *
 * // Create deferred computations
 * const randomIO = io(() => Math.random())
 * const timeIO = io(() => Date.now())
 *
 * // Execute them (side effects happen here)
 * const randomValue = runIO(randomIO)      // 0.123456...
 * const currentTime = runIO(timeIO)        // 1692547200000
 *
 * // Multiple executions create new effects
 * const first = runIO(randomIO)            // 0.789012...
 * const second = runIO(randomIO)           // 0.345678... (different)
 *
 * // Console output
 * const logIO = io(() => console.log("Hello!"))
 * runIO(logIO)                             // Prints "Hello!" to console
 *
 * // Error-prone operations
 * const parseIO = io(() => JSON.parse('{"valid": true}'))
 * const parsed = runIO(parseIO)            // { valid: true }
 *
 * // At program boundaries
 * const main = () => {
 *   const configIO = io(() => loadConfig())
 *   const config = runIO(configIO)         // Load config at startup
 *
 *   const setupIO = io(() => initializeApp(config))
 *   runIO(setupIO)                         // Initialize with config
 * }
 *
 * // Error handling with try/catch
 * const riskyIO = io(() => {
 *   throw new Error("Something went wrong")
 * })
 *
 * try {
 *   const result = runIO(riskyIO)
 * } catch (error) {
 *   console.error("IO failed:", error)     // Catch exceptions from IO
 * }
 * ```
 */
const runIO = <A>(io: IO<A>): A => io()

export default runIO
