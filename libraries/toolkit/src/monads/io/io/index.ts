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
 * // Pure value
 * const pureIO = io(() => 42)
 * runIO(pureIO)                            // 42
 *
 * // Random value generation
 * const randomIO = io(() => Math.random())
 * runIO(randomIO)                          // 0.123456...
 *
 * // Current timestamp
 * const nowIO = io(() => Date.now())
 * runIO(nowIO)                             // 1692547200000
 *
 * // Multiple operations
 * const complexIO = io(() => {
 *   const id = crypto.randomUUID()
 *   const timestamp = Date.now()
 *   return `${id}-${timestamp}`
 * })
 * runIO(complexIO)                         // "abc-123-1692547200000"
 * ```
 * @impure
 */
const io = <A>(thunk: () => A): IO<A> => thunk

export default io
