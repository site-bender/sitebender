import type { IO } from "../../types/fp/io/index.ts"

/**
 * Creates an IO from a thunk (deferred computation)
 *
 * The IO constructor wraps a computation in a thunk, deferring its execution
 * until runIO is called. This allows for composable, referentially transparent
 * handling of side effects in functional programs. The thunk can contain any
 * computation including impure operations like random number generation,
 * current time, file I/O, or network requests.
 *
 * @param thunk - Function to defer that will be executed when runIO is called
 * @returns IO wrapping the deferred computation
 * @example
 * ```typescript
 * // Pure value (though io is overkill here)
 * const pureIO = io(() => 42)
 * // runIO(pureIO) === 42
 *
 * // Random value generation
 * const randomIO = io(() => Math.random())
 * // runIO(randomIO) - executes Math.random()
 *
 * // Current timestamp
 * const nowIO = io(() => Date.now())
 * // runIO(nowIO) - executes Date.now()
 *
 * // String generation with crypto
 * const idIO = io(() => "_" + crypto.randomUUID())
 * // runIO(idIO) - generates new ID each time
 *
 * // File reading (browser example)
 * const readFileIO = io(() => localStorage.getItem("config"))
 * // runIO(readFileIO) - reads from localStorage
 *
 * // Multiple operations
 * const complexIO = io(() => {
 *   const id = crypto.randomUUID()
 *   const timestamp = Date.now()
 *   return `${id}-${timestamp}`
 * })
 * // runIO(complexIO) - executes entire computation
 *
 * // Network request
 * const fetchUserIO = io(() => fetch("/api/user/42"))
 * // runIO(fetchUserIO) - makes HTTP request
 *
 * // Console logging
 * const logIO = io(() => console.log("Hello, World!"))
 * // runIO(logIO) - prints to console
 *
 * // DOM manipulation
 * const updateTitleIO = io(() => {
 *   document.title = "New Title"
 *   return document.title
 * })
 * // runIO(updateTitleIO) - modifies DOM
 *
 * // Error-prone operation
 * const parseJsonIO = io(() => JSON.parse('{"valid": true}'))
 * // runIO(parseJsonIO) - may throw, use tryCatch for safety
 *
 * // Temporal operations
 * const currentTimeIO = io(() => Temporal.Now.plainTimeISO())
 * // runIO(currentTimeIO) - gets current time
 *
 * // Multiple side effects
 * const auditIO = io(() => {
 *   const action = "user_login"
 *   const timestamp = Date.now()
 *   console.log(`Audit: ${action} at ${timestamp}`)
 *   localStorage.setItem("last_action", action)
 *   return { action, timestamp }
 * })
 * // runIO(auditIO) - performs logging and storage
 *
 * // Composed operations
 * const setupIO = io(() => {
 *   const config = JSON.parse(localStorage.getItem("config") || "{}")
 *   document.title = config.title || "Default Title"
 *   return config
 * })
 * // runIO(setupIO) - reads config and updates title
 *
 * // Deferred expensive computation
 * const heavyComputationIO = io(() => {
 *   let result = 0
 *   for (let i = 0; i < 1000000; i++) {
 *     result += Math.sqrt(i)
 *   }
 *   return result
 * })
 * // runIO(heavyComputationIO) - computation only runs when called
 *
 * // API call with headers
 * const authenticatedRequestIO = io(() =>
 *   fetch("/api/protected", {
 *     headers: {
 *       "Authorization": `Bearer ${localStorage.getItem("token")}`
 *     }
 *   })
 * )
 * // runIO(authenticatedRequestIO) - makes authenticated request
 * ```
 * @property Lazy - Computation is deferred until runIO is called
 * @property Referentially-transparent - Same IO produces same effect pattern
 * @property Composable - Can be combined with map, chain, and other operations
 * @property Side-effect-containing - Safely encapsulates impure operations
 */
const io = <A>(thunk: () => A): IO<A> => thunk

export default io
