import type { IOMaybe } from "../../types/fp/io/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Lifts a Maybe<A> into IOMaybe<A> context
 * 
 * Converts a pure Maybe value into an IOMaybe by wrapping it in a thunk.
 * This is useful when you have a Maybe value that you want to compose
 * with other IOMaybe operations. The Maybe is evaluated immediately when
 * the function is called, but the result is deferred until runIO is executed.
 * 
 * @param maybe - Maybe value to lift into IOMaybe
 * @returns IOMaybe that returns the Maybe when executed
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 * import { chainIOMaybe } from "../chainIOMaybe/index.ts"
 * import { ioMaybe } from "../ioMaybe/index.ts"
 * 
 * // Basic lifting
 * const justValue = just(42)
 * const justIO = fromMaybe(justValue)
 * runIO(justIO)                            // Just(42)
 * 
 * const nothingValue = nothing()
 * const nothingIO = fromMaybe(nothingValue)
 * runIO(nothingIO)                         // Nothing
 * 
 * // String values
 * const nameValue = just("Alice")
 * const nameIO = fromMaybe(nameValue)
 * runIO(nameIO)                            // Just("Alice")
 * 
 * // Object values
 * const userValue = just({ id: 1, name: "Alice", email: "alice@example.com" })
 * const userIO = fromMaybe(userValue)
 * runIO(userIO)                            // Just({ id: 1, name: "Alice", email: "alice@example.com" })
 * 
 * // Array values
 * const numbersValue = just([1, 2, 3, 4, 5])
 * const numbersIO = fromMaybe(numbersValue)
 * runIO(numbersIO)                         // Just([1, 2, 3, 4, 5])
 * 
 * // Composing with IOMaybe operations
 * const baseValueIO = fromMaybe(just(10))
 * const doubledIO = mapIOMaybe((x: number) => x * 2)(baseValueIO)
 * runIO(doubledIO)                         // Just(20)
 * 
 * const squaredIO = mapIOMaybe((x: number) => x * x)(doubledIO)
 * runIO(squaredIO)                         // Just(400)
 * 
 * // Chaining with effectful operations
 * const seedIO = fromMaybe(just(5))
 * const randomIO = chainIOMaybe((seed: number) => 
 *   ioMaybe(() => just(Math.sin(seed) * 1000 % 100))
 * )(seedIO)
 * runIO(randomIO)                          // Just(some calculated value)
 * 
 * // Validation results
 * const validateEmail = (email: string) => 
 *   email.includes("@") ? just(email) : nothing()
 * 
 * const validEmailValue = validateEmail("alice@example.com")
 * const validEmailIO = fromMaybe(validEmailValue)
 * runIO(validEmailIO)                      // Just("alice@example.com")
 * 
 * const invalidEmailValue = validateEmail("not-an-email")
 * const invalidEmailIO = fromMaybe(invalidEmailValue)
 * runIO(invalidEmailIO)                    // Nothing
 * 
 * // Parse results
 * const parseNumber = (str: string) => {
 *   const parsed = parseInt(str, 10)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * }
 * 
 * const parsedValue = parseNumber("42")
 * const parsedIO = fromMaybe(parsedValue)
 * const formattedIO = mapIOMaybe((n: number) => `Number: ${n}`)(parsedIO)
 * runIO(formattedIO)                       // Just("Number: 42")
 * 
 * const invalidParsedValue = parseNumber("not-a-number")
 * const invalidParsedIO = fromMaybe(invalidParsedValue)
 * const invalidFormattedIO = mapIOMaybe((n: number) => `Number: ${n}`)(invalidParsedIO)
 * runIO(invalidFormattedIO)                // Nothing
 * 
 * // Array operations
 * const findFirst = <T>(predicate: (item: T) => boolean) => (array: Array<T>) => {
 *   const found = array.find(predicate)
 *   return found ? just(found) : nothing()
 * }
 * 
 * const users = [
 *   { id: 1, name: "Alice", active: true },
 *   { id: 2, name: "Bob", active: false },
 *   { id: 3, name: "Charlie", active: true }
 * ]
 * 
 * const activeUserValue = findFirst((user: any) => user.active)(users)
 * const activeUserIO = fromMaybe(activeUserValue)
 * const userNameIO = mapIOMaybe((user: any) => user.name)(activeUserIO)
 * runIO(userNameIO)                        // Just("Alice")
 * 
 * // Configuration defaults
 * const getConfigValue = (key: string) => (config: Record<string, any>) => {
 *   const value = config[key]
 *   return value !== undefined ? just(value) : nothing()
 * }
 * 
 * const config = { theme: "dark", language: "en", timeout: 5000 }
 * const themeValue = getConfigValue("theme")(config)
 * const themeIO = fromMaybe(themeValue)
 * runIO(themeIO)                           // Just("dark")
 * 
 * const missingValue = getConfigValue("missing")(config)
 * const missingIO = fromMaybe(missingValue)
 * runIO(missingIO)                         // Nothing
 * 
 * // JSON field extraction
 * const extractField = (field: string) => (obj: Record<string, any>) => {
 *   const value = obj[field]
 *   return value ? just(value) : nothing()
 * }
 * 
 * const jsonData = { users: ["Alice", "Bob"], meta: { total: 2 } }
 * const usersValue = extractField("users")(jsonData)
 * const usersIO = fromMaybe(usersValue)
 * const firstUserIO = mapIOMaybe((users: Array<string>) => users[0])(usersIO)
 * runIO(firstUserIO)                       // Just("Alice")
 * 
 * // Date validation
 * const validateDate = (dateString: string) => {
 *   const date = new Date(dateString)
 *   return !isNaN(date.getTime()) ? just(date) : nothing()
 * }
 * 
 * const validDateValue = validateDate("2023-08-20")
 * const validDateIO = fromMaybe(validDateValue)
 * const yearIO = mapIOMaybe((date: Date) => date.getFullYear())(validDateIO)
 * runIO(yearIO)                            // Just(2023)
 * 
 * const invalidDateValue = validateDate("not-a-date")
 * const invalidDateIO = fromMaybe(invalidDateValue)
 * const invalidYearIO = mapIOMaybe((date: Date) => date.getFullYear())(invalidDateIO)
 * runIO(invalidYearIO)                     // Nothing
 * 
 * // URL parsing
 * const parseUrl = (urlString: string) => {
 *   try {
 *     return just(new URL(urlString))
 *   } catch {
 *     return nothing()
 *   }
 * }
 * 
 * const urlValue = parseUrl("https://example.com/path")
 * const urlIO = fromMaybe(urlValue)
 * const hostIO = mapIOMaybe((url: URL) => url.host)(urlIO)
 * runIO(hostIO)                            // Just("example.com")
 * 
 * // Safe division
 * const safeDivide = (numerator: number) => (denominator: number) => 
 *   denominator !== 0 ? just(numerator / denominator) : nothing()
 * 
 * const divisionValue = safeDivide(100)(5)
 * const divisionIO = fromMaybe(divisionValue)
 * const roundedIO = mapIOMaybe((result: number) => Math.round(result))(divisionIO)
 * runIO(roundedIO)                         // Just(20)
 * 
 * const zeroDivisionValue = safeDivide(100)(0)
 * const zeroDivisionIO = fromMaybe(zeroDivisionValue)
 * const zeroRoundedIO = mapIOMaybe((result: number) => Math.round(result))(zeroDivisionIO)
 * runIO(zeroRoundedIO)                     // Nothing
 * 
 * // Combining with effectful operations
 * const processedValue = just("initial-data")
 * const processedIO = fromMaybe(processedValue)
 * const enhancedIO = chainIOMaybe((data: string) => 
 *   ioMaybe(() => just(`${data}-enhanced-${Date.now()}`))
 * )(processedIO)
 * runIO(enhancedIO)                        // Just("initial-data-enhanced-1692547200000")
 * 
 * // Error recovery patterns
 * const primaryResultValue = nothing() // Simulating failure
 * const primaryIO = fromMaybe(primaryResultValue)
 * 
 * const fallbackValue = just("fallback-data")
 * const fallbackIO = fromMaybe(fallbackValue)
 * 
 * // Note: For actual fallback behavior, you'd need an orElse operation
 * // This just demonstrates lifting pure Maybe values
 * 
 * // Complex data structures
 * const complexValue = just({
 *   user: { id: 1, profile: { name: "Alice", preferences: { theme: "dark" } } },
 *   metadata: { version: "1.0", lastModified: new Date() }
 * })
 * const complexIO = fromMaybe(complexValue)
 * const themePreferenceIO = mapIOMaybe((data: any) => 
 *   data.user.profile.preferences.theme
 * )(complexIO)
 * runIO(themePreferenceIO)                 // Just("dark")
 * ```
 * @property Pure-lifting - Converts pure Maybe to deferred IOMaybe
 * @property Immediate-evaluation - Maybe is evaluated when function is called
 * @property Deferred-execution - Result is returned when runIO is called
 * @property Composable - Can be used with all IOMaybe operations
 */
const fromMaybe = <A>(maybe: Maybe<A>): IOMaybe<A> => () => maybe

export default fromMaybe