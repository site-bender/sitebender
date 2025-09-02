import type { IOMaybe } from "../../types/fp/io/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Lifts a pure function returning Maybe into IOMaybe
 *
 * Takes a pure function that returns a Maybe value and lifts it into the
 * IOMaybe context, allowing it to be composed with other IO operations.
 * This is useful when you have a pure computation that may not return a
 * value (Maybe) and want to integrate it into an IO-based pipeline.
 *
 * @param f - Pure function that returns a Maybe
 * @returns IOMaybe that wraps the function execution
 * @pure
 * @curried
 * @example
 * ```typescript
 * import runIO from "../runIO/index.ts"
 * import just from "../../maybe/just/index.ts"
 * import nothing from "../../maybe/nothing/index.ts"
 *
 * // Basic usage
 * const findUser = (id: string): Maybe<string> =>
 *   id === "42" ? just("Douglas Adams") : nothing()
 *
 * const findUserIO = (id: string): IOMaybe<string> =>
 *   liftMaybe(() => findUser(id))
 *
 * runIO(findUserIO("42"))  // Just("Douglas Adams")
 * runIO(findUserIO("7"))   // Nothing
 *
 * // Safe parsing
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * const parseIntegerIO = (s: string): IOMaybe<number> =>
 *   liftMaybe(() => parseInteger(s))
 *
 * runIO(parseIntegerIO("42"))    // Just(42)
 * runIO(parseIntegerIO("abc"))   // Nothing
 *
 * // Array operations
 * const firstElement = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[0]) : nothing()
 *
 * const firstElementIO = <T>(arr: Array<T>): IOMaybe<T> =>
 *   liftMaybe(() => firstElement(arr))
 *
 * runIO(firstElementIO([1, 2, 3]))  // Just(1)
 * runIO(firstElementIO([]))         // Nothing
 * ```
 */
const liftMaybe = <A>(f: () => Maybe<A>): IOMaybe<A> => () => f()

export default liftMaybe
