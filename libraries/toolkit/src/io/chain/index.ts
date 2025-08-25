import type { IO } from "../../types/fp/io/index.ts"

/**
 * Flat maps a function that returns an IO (Monad bind)
 *
 * Allows sequencing of IO computations where the second computation depends
 * on the result of the first. This is the monadic bind operation that enables
 * composing dependent effectful computations while keeping them deferred.
 * The function prevents nested IO<IO<A>> structures by flattening them.
 *
 * @curried (f) => (io) => chainedIO
 * @param f - Function that takes a value and returns an IO
 * @param io - IO to chain from
 * @returns New IO representing the sequenced computation
 * @example
 * ```typescript
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 *
 * // Basic chaining
 * const getUserIdIO = io(() => "user-123")
 * const fetchUserIO = (id: string) => io(() => `User data for ${id}`)
 * const userDataIO = chain(fetchUserIO)(getUserIdIO)
 * runIO(userDataIO)                        // "User data for user-123"
 *
 * // Sequential file operations
 * const readConfigIO = io(() => '{"apiUrl": "https://api.example.com"}')
 * const parseAndFetchIO = (configJson: string) => {
 *   const config = JSON.parse(configJson)
 *   return io(() => fetch(config.apiUrl))
 * }
 * const apiResponseIO = chain(parseAndFetchIO)(readConfigIO)
 * runIO(apiResponseIO)                     // Makes API call based on config
 *
 * // Random number sequences
 * const randomIO = io(() => Math.random())
 * const conditionalIO = (x: number) =>
 *   x > 0.5
 *     ? io(() => "High value")
 *     : io(() => "Low value")
 * const resultIO = chain(conditionalIO)(randomIO)
 * runIO(resultIO)                          // "High value" or "Low value"
 *
 * // Database-like operations
 * const findUserIO = io(() => ({ id: 1, name: "Alice", roleId: 2 }))
 * const findRoleIO = (user: { roleId: number }) =>
 *   io(() => user.roleId === 2 ? "Admin" : "User")
 * const userWithRoleIO = chain(findRoleIO)(findUserIO)
 * runIO(userWithRoleIO)                    // "Admin"
 *
 * // Error handling chains
 * const riskyOperationIO = io(() => {
 *   if (Math.random() > 0.5) return "success"
 *   throw new Error("Random failure")
 * })
 * const handleResultIO = (result: string) =>
 *   io(() => `Handled: ${result}`)
 * const safeChainIO = chain(handleResultIO)(riskyOperationIO)
 * // Note: This will throw if riskyOperationIO fails
 *
 * // Multi-step authentication
 * const getTokenIO = io(() => localStorage.getItem("token"))
 * const validateTokenIO = (token: string | null) =>
 *   token
 *     ? io(() => ({ valid: true, userId: "123" }))
 *     : io(() => ({ valid: false, userId: null }))
 * const authStatusIO = chain(validateTokenIO)(getTokenIO)
 * runIO(authStatusIO)                      // Auth status object
 *
 * // Complex data processing pipeline
 * const loadDataIO = io(() => [1, 2, 3, 4, 5])
 * const processDataIO = (data: Array<number>) =>
 *   io(() => {
 *     const processed = data.map(x => x * 2).filter(x => x > 4)
 *     console.log("Processing data...")
 *     return processed
 *   })
 * const saveDataIO = (processed: Array<number>) =>
 *   io(() => {
 *     localStorage.setItem("processed", JSON.stringify(processed))
 *     return `Saved ${processed.length} items`
 *   })
 *
 * const pipelineIO = chain((data: Array<number>) =>
 *   chain(saveDataIO)(processDataIO(data))
 * )(loadDataIO)
 * runIO(pipelineIO)                        // "Saved 3 items"
 *
 * // Dynamic computation based on environment
 * const getEnvIO = io(() => "development")
 * const configureLoggingIO = (env: string) =>
 *   env === "development"
 *     ? io(() => { console.log("Debug logging enabled"); return "debug" })
 *     : io(() => { console.log("Production logging"); return "info" })
 * const loggingConfigIO = chain(configureLoggingIO)(getEnvIO)
 * runIO(loggingConfigIO)                   // "debug" + console output
 *
 * // Timestamp-based operations
 * const getCurrentTimeIO = io(() => Date.now())
 * const scheduleTaskIO = (timestamp: number) =>
 *   io(() => {
 *     const delay = timestamp % 1000
 *     return `Task scheduled for ${delay}ms delay`
 *   })
 * const scheduledIO = chain(scheduleTaskIO)(getCurrentTimeIO)
 * runIO(scheduledIO)                       // Scheduled task message
 *
 * // Chaining multiple dependent operations
 * const step1IO = io(() => "initial")
 * const step2IO = (s: string) => io(() => s + "-step2")
 * const step3IO = (s: string) => io(() => s + "-step3")
 * const step4IO = (s: string) => io(() => s + "-final")
 *
 * const fullProcessIO = chain((s1: string) =>
 *   chain((s2: string) =>
 *     chain(step4IO)(step3IO(s2))
 *   )(step2IO(s1))
 * )(step1IO)
 * runIO(fullProcessIO)                     // "initial-step2-step3-final"
 *
 * // Conditional branching with side effects
 * const checkPermissionIO = io(() => Math.random() > 0.5)
 * const authorizedActionIO = io(() => {
 *   console.log("Performing authorized action")
 *   return "Action completed"
 * })
 * const deniedActionIO = io(() => {
 *   console.log("Access denied")
 *   return "Access denied"
 * })
 *
 * const secureActionIO = chain((hasPermission: boolean) =>
 *   hasPermission ? authorizedActionIO : deniedActionIO
 * )(checkPermissionIO)
 * runIO(secureActionIO)                    // Either success or denial message
 * ```
 * @property Monad - Enables sequencing of dependent computations
 * @property Flattening - Prevents nested IO<IO<A>> structures
 * @property Lazy - All computations deferred until runIO
 * @property Composable - Chains can be further chained or mapped
 */
const chain = <A, B>(f: (a: A) => IO<B>) => (io: IO<A>): IO<B> => () =>
	f(io())()

export default chain
