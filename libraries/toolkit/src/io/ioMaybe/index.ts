import type { IOMaybe } from "../../types/fp/io/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Creates an IOMaybe from a thunk returning Maybe
 * 
 * Constructs an IOMaybe computation from a function that returns a Maybe value.
 * This is the primary constructor for IOMaybe when you have effectful computations
 * that may not produce a value. The computation is deferred until runIO is called,
 * maintaining referential transparency while handling potential absence of values.
 * 
 * @param thunk - Function returning Maybe that will be executed when runIO is called
 * @returns IOMaybe wrapping the deferred Maybe computation
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 * import { chainIOMaybe } from "../chainIOMaybe/index.ts"
 * 
 * // Basic Maybe computation
 * const maybeNumberIO = ioMaybe(() => just(42))
 * runIO(maybeNumberIO)                     // Just(42)
 * 
 * const nothingIO = ioMaybe(() => nothing())
 * runIO(nothingIO)                         // Nothing
 * 
 * // Conditional value creation
 * const conditionalIO = ioMaybe(() => 
 *   Math.random() > 0.5 ? just("success") : nothing()
 * )
 * runIO(conditionalIO)                     // Just("success") or Nothing
 * 
 * // Safe parsing operations
 * const parseIntIO = ioMaybe(() => {
 *   const input = "42"
 *   const parsed = parseInt(input, 10)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * })
 * runIO(parseIntIO)                        // Just(42)
 * 
 * const parseInvalidIO = ioMaybe(() => {
 *   const input = "not-a-number"
 *   const parsed = parseInt(input, 10)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * })
 * runIO(parseInvalidIO)                    // Nothing
 * 
 * // Safe JSON parsing
 * const parseJsonIO = ioMaybe(() => {
 *   const jsonString = '{"name": "Alice", "age": 30}'
 *   try {
 *     const parsed = JSON.parse(jsonString)
 *     return just(parsed)
 *   } catch {
 *     return nothing()
 *   }
 * })
 * runIO(parseJsonIO)                       // Just({ name: "Alice", age: 30 })
 * 
 * const parseInvalidJsonIO = ioMaybe(() => {
 *   const jsonString = '{invalid json}'
 *   try {
 *     const parsed = JSON.parse(jsonString)
 *     return just(parsed)
 *   } catch {
 *     return nothing()
 *   }
 * })
 * runIO(parseInvalidJsonIO)                // Nothing
 * 
 * // Safe array access
 * const safeArrayAccessIO = ioMaybe(() => {
 *   const array = ["first", "second", "third"]
 *   const index = 1
 *   return index < array.length ? just(array[index]) : nothing()
 * })
 * runIO(safeArrayAccessIO)                 // Just("second")
 * 
 * const outOfBoundsIO = ioMaybe(() => {
 *   const array = ["first", "second", "third"]
 *   const index = 10
 *   return index < array.length ? just(array[index]) : nothing()
 * })
 * runIO(outOfBoundsIO)                     // Nothing
 * 
 * // Safe object property access
 * const safePropertyIO = ioMaybe(() => {
 *   const obj = { name: "Alice", age: 30 }
 *   const prop = "name"
 *   return prop in obj ? just(obj[prop as keyof typeof obj]) : nothing()
 * })
 * runIO(safePropertyIO)                    // Just("Alice")
 * 
 * // Environment variable simulation
 * const getEnvVarIO = ioMaybe(() => {
 *   const envVars = { NODE_ENV: "development", PORT: "3000" }
 *   const key = "NODE_ENV"
 *   return key in envVars ? just(envVars[key as keyof typeof envVars]) : nothing()
 * })
 * runIO(getEnvVarIO)                       // Just("development")
 * 
 * // Safe localStorage access (browser)
 * const getStorageIO = ioMaybe(() => {
 *   const stored = localStorage.getItem("user-preferences")
 *   return stored ? just(stored) : nothing()
 * })
 * // runIO(getStorageIO) - Just(value) or Nothing
 * 
 * // Safe URL parsing
 * const parseUrlIO = ioMaybe(() => {
 *   const urlString = "https://example.com/path?param=value"
 *   try {
 *     const url = new URL(urlString)
 *     return just(url)
 *   } catch {
 *     return nothing()
 *   }
 * })
 * runIO(parseUrlIO)                        // Just(URL object)
 * 
 * // Safe regular expression matching
 * const extractEmailIO = ioMaybe(() => {
 *   const text = "Contact us at alice@example.com for support"
 *   const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
 *   const match = text.match(emailRegex)
 *   return match ? just(match[1]) : nothing()
 * })
 * runIO(extractEmailIO)                    // Just("alice@example.com")
 * 
 * // Safe division
 * const safeDivideIO = ioMaybe(() => {
 *   const numerator = 100
 *   const denominator = 5
 *   return denominator !== 0 ? just(numerator / denominator) : nothing()
 * })
 * runIO(safeDivideIO)                      // Just(20)
 * 
 * const divideByZeroIO = ioMaybe(() => {
 *   const numerator = 100
 *   const denominator = 0
 *   return denominator !== 0 ? just(numerator / denominator) : nothing()
 * })
 * runIO(divideByZeroIO)                    // Nothing
 * 
 * // Safe string operations
 * const safeSubstringIO = ioMaybe(() => {
 *   const text = "Hello, World!"
 *   const start = 7
 *   const end = 12
 *   return start < text.length && end <= text.length && start < end
 *     ? just(text.substring(start, end))
 *     : nothing()
 * })
 * runIO(safeSubstringIO)                   // Just("World")
 * 
 * // Chain with validation
 * const validateEmailIO = ioMaybe(() => {
 *   const email = "alice@example.com"
 *   const isValid = email.includes("@") && email.includes(".")
 *   return isValid ? just(email) : nothing()
 * })
 * 
 * const processValidEmailIO = chainIOMaybe((email: string) =>
 *   ioMaybe(() => just(email.toLowerCase()))
 * )(validateEmailIO)
 * runIO(processValidEmailIO)               // Just("alice@example.com")
 * 
 * // Random success/failure
 * const randomSuccessIO = ioMaybe(() => {
 *   const success = Math.random() > 0.3
 *   return success ? just("Operation successful") : nothing()
 * })
 * runIO(randomSuccessIO)                   // Just("Operation successful") or Nothing
 * 
 * // Safe date parsing
 * const parseDateIO = ioMaybe(() => {
 *   const dateString = "2023-08-20"
 *   const date = new Date(dateString)
 *   return !isNaN(date.getTime()) ? just(date) : nothing()
 * })
 * runIO(parseDateIO)                       // Just(Date object)
 * 
 * // Safe array find
 * const findUserIO = ioMaybe(() => {
 *   const users = [
 *     { id: 1, name: "Alice" },
 *     { id: 2, name: "Bob" },
 *     { id: 3, name: "Charlie" }
 *   ]
 *   const user = users.find(u => u.id === 2)
 *   return user ? just(user) : nothing()
 * })
 * runIO(findUserIO)                        // Just({ id: 2, name: "Bob" })
 * 
 * // Safe map access
 * const getFromMapIO = ioMaybe(() => {
 *   const cache = new Map([
 *     ["user:1", { name: "Alice" }],
 *     ["user:2", { name: "Bob" }]
 *   ])
 *   const key = "user:1"
 *   const value = cache.get(key)
 *   return value ? just(value) : nothing()
 * })
 * runIO(getFromMapIO)                      // Just({ name: "Alice" })
 * 
 * // Transform with map
 * const upperCaseIO = mapIOMaybe((s: string) => s.toUpperCase())(validateEmailIO)
 * runIO(upperCaseIO)                       // Just("ALICE@EXAMPLE.COM")
 * ```
 * @property Lazy - Computation deferred until runIO is called
 * @property Safe - Handles potential absence of values explicitly
 * @property Composable - Can be chained with other IOMaybe operations
 * @property Effectful - May perform side effects when executed
 */
const ioMaybe = <A>(thunk: () => Maybe<A>): IOMaybe<A> => thunk

export default ioMaybe