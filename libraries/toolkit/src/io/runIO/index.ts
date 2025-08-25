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
 * @example
 * ```typescript
 * import { io } from "../io/index.ts"
 *
 * // Create deferred computations
 * const randomIO = io(() => Math.random())
 * const timeIO = io(() => Date.now())
 * const idIO = io(() => crypto.randomUUID())
 *
 * // Execute them (side effects happen here)
 * const randomValue = runIO(randomIO)      // 0.123456...
 * const currentTime = runIO(timeIO)        // 1692547200000
 * const uniqueId = runIO(idIO)             // "550e8400-e29b-41d4-a716-446655440000"
 *
 * // Multiple executions create new effects
 * const first = runIO(randomIO)            // 0.789012...
 * const second = runIO(randomIO)           // 0.345678... (different)
 *
 * // Console output
 * const logIO = io(() => console.log("Hello!"))
 * runIO(logIO)                             // Prints "Hello!" to console
 *
 * // File operations (browser)
 * const saveConfigIO = io(() => {
 *   const config = { theme: "dark", lang: "en" }
 *   localStorage.setItem("config", JSON.stringify(config))
 *   return config
 * })
 * const savedConfig = runIO(saveConfigIO)  // Saves to localStorage
 *
 * // Network requests
 * const fetchUserIO = io(() => fetch("/api/user/42"))
 * const response = runIO(fetchUserIO)      // Makes HTTP request
 *
 * // DOM manipulation
 * const updateTitleIO = io(() => {
 *   document.title = "New Title"
 *   return document.title
 * })
 * const newTitle = runIO(updateTitleIO)    // "New Title"
 *
 * // Error-prone operations
 * const parseIO = io(() => JSON.parse('{"valid": true}'))
 * const parsed = runIO(parseIO)            // { valid: true }
 *
 * // Complex operations
 * const auditIO = io(() => {
 *   const user = "alice"
 *   const action = "login"
 *   const timestamp = Date.now()
 *   console.log(`${user} performed ${action} at ${timestamp}`)
 *   localStorage.setItem("last_action", JSON.stringify({ user, action, timestamp }))
 *   return { user, action, timestamp }
 * })
 * const auditResult = runIO(auditIO)       // Logs and saves audit info
 *
 * // Temporal operations
 * const nowIO = io(() => Temporal.Now.plainDateTimeISO())
 * const currentDateTime = runIO(nowIO)     // Current PlainDateTime
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
 * // Event handlers
 * button.addEventListener("click", () => {
 *   const clickIO = io(() => handleButtonClick())
 *   runIO(clickIO)                         // Handle click with side effects
 * })
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
 * @property Terminal - Ends the pure functional chain
 * @property Side-effecting - Actually performs the deferred computation
 * @property Unsafe - May throw exceptions or produce different results
 */
const runIO = <A>(io: IO<A>): A => io()

export default runIO
