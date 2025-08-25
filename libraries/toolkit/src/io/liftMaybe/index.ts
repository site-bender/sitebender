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
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 *
 * // Pure function that may not return a value
 * const findUser = (id: string): Maybe<string> =>
 *   id === "42" ? just("Douglas Adams") : nothing()
 *
 * // Lift into IOMaybe context
 * const findUserIO = (id: string): IOMaybe<string> =>
 *   liftMaybe(() => findUser(id))
 *
 * runIO(findUserIO("42"))  // Just("Douglas Adams")
 * runIO(findUserIO("7"))   // Nothing
 *
 * // Safe parsing example
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
 * // Database lookup simulation
 * const users = new Map([
 *   ["alice", { name: "Alice", age: 30 }],
 *   ["bob", { name: "Bob", age: 25 }]
 * ])
 *
 * const lookupUser = (username: string): Maybe<{ name: string; age: number }> => {
 *   const user = users.get(username)
 *   return user ? just(user) : nothing()
 * }
 *
 * const lookupUserIO = (username: string): IOMaybe<{ name: string; age: number }> =>
 *   liftMaybe(() => lookupUser(username))
 *
 * runIO(lookupUserIO("alice"))   // Just({ name: "Alice", age: 30 })
 * runIO(lookupUserIO("charlie")) // Nothing
 *
 * // Configuration validation
 * interface Config {
 *   apiUrl?: string
 *   timeout?: number
 * }
 *
 * const validateConfig = (config: Config): Maybe<Config> =>
 *   config.apiUrl && config.timeout
 *     ? just(config)
 *     : nothing()
 *
 * const validateConfigIO = (config: Config): IOMaybe<Config> =>
 *   liftMaybe(() => validateConfig(config))
 *
 * const goodConfig = { apiUrl: "https://api.example.com", timeout: 5000 }
 * const badConfig = { timeout: 5000 }
 *
 * runIO(validateConfigIO(goodConfig))  // Just({ apiUrl: "...", timeout: 5000 })
 * runIO(validateConfigIO(badConfig))   // Nothing
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
 *
 * // String operations
 * const extractEmail = (text: string): Maybe<string> => {
 *   const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
 *   const match = text.match(emailPattern)
 *   return match ? just(match[1]) : nothing()
 * }
 *
 * const extractEmailIO = (text: string): IOMaybe<string> =>
 *   liftMaybe(() => extractEmail(text))
 *
 * runIO(extractEmailIO("Contact: alice@example.com"))  // Just("alice@example.com")
 * runIO(extractEmailIO("No email here"))               // Nothing
 *
 * // Chaining with other IOMaybe operations
 * import { chainIOMaybe } from "../chainIOMaybe/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 *
 * const pipeline = (input: string): IOMaybe<number> =>
 *   pipe(
 *     liftMaybe(() => parseInteger(input)),
 *     chainIOMaybe((n: number) =>
 *       liftMaybe(() => n > 0 ? just(n) : nothing())
 *     ),
 *     mapIOMaybe((n: number) => n * 2)
 *   )
 *
 * runIO(pipeline("42"))   // Just(84)
 * runIO(pipeline("-5"))   // Nothing
 * runIO(pipeline("abc"))  // Nothing
 *
 * // Working with optional properties
 * interface User {
 *   name: string
 *   email?: string
 *   phone?: string
 * }
 *
 * const getContactInfo = (user: User): Maybe<string> =>
 *   user.email ? just(user.email) :
 *   user.phone ? just(user.phone) :
 *   nothing()
 *
 * const getContactInfoIO = (user: User): IOMaybe<string> =>
 *   liftMaybe(() => getContactInfo(user))
 *
 * const user1: User = { name: "Alice", email: "alice@example.com" }
 * const user2: User = { name: "Bob", phone: "555-1234" }
 * const user3: User = { name: "Charlie" }
 *
 * runIO(getContactInfoIO(user1))  // Just("alice@example.com")
 * runIO(getContactInfoIO(user2))  // Just("555-1234")
 * runIO(getContactInfoIO(user3))  // Nothing
 * ```
 * @property Pure-to-Effectful - Lifts pure Maybe computations into IO context
 * @property Composable - Integrates with other IOMaybe operations
 * @property Type-safe - Preserves Maybe semantics within IO
 */
const liftMaybe = <A>(f: () => Maybe<A>): IOMaybe<A> => () => f()

export default liftMaybe
