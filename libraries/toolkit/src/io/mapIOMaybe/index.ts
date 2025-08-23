import type { IOMaybe } from "../../types/fp/io/index.ts"
import isJust from "../../maybe/isJust/index.ts"
import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"

/**
 * Maps a function over the Maybe value inside IOMaybe
 * 
 * Transforms the eventual Maybe result of an IOMaybe computation by applying
 * a function to Just values while leaving Nothing unchanged. This allows
 * safe transformation chains where the function is only applied if a value
 * is present, maintaining the short-circuiting behavior of Maybe.
 * 
 * @curried (f) => (ioMaybe) => mappedIOMaybe
 * @param f - Function to transform the value inside Just
 * @param ioMaybe - IOMaybe to transform
 * @returns New IOMaybe with transformed Just values
 * @example
 * ```typescript
 * import { ioMaybe } from "../ioMaybe/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 * 
 * // Basic transformation
 * const numberMaybeIO = ioMaybe(() => just(42))
 * const doubledIO = mapIOMaybe((x: number) => x * 2)(numberMaybeIO)
 * runIO(doubledIO)                         // Just(84)
 * 
 * const nothingIO = ioMaybe(() => nothing())
 * const mappedNothingIO = mapIOMaybe((x: number) => x * 2)(nothingIO)
 * runIO(mappedNothingIO)                   // Nothing
 * 
 * // String transformations
 * const greetingIO = ioMaybe(() => just("hello"))
 * const upperIO = mapIOMaybe((s: string) => s.toUpperCase())(greetingIO)
 * runIO(upperIO)                           // Just("HELLO")
 * 
 * const exclamationIO = mapIOMaybe((s: string) => s + "!")(upperIO)
 * runIO(exclamationIO)                     // Just("HELLO!")
 * 
 * // Object transformations
 * const userIO = ioMaybe(() => just({ name: "Alice", age: 30 }))
 * const nameIO = mapIOMaybe((user: { name: string; age: number }) => user.name)(userIO)
 * runIO(nameIO)                            // Just("Alice")
 * 
 * const userInfoIO = mapIOMaybe((user: { name: string; age: number }) => 
 *   `${user.name} (${user.age} years old)`
 * )(userIO)
 * runIO(userInfoIO)                        // Just("Alice (30 years old)")
 * 
 * // Safe parsing with transformation
 * const parseNumberIO = ioMaybe(() => {
 *   const input = "42.5"
 *   const parsed = parseFloat(input)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * })
 * const roundedIO = mapIOMaybe((n: number) => Math.round(n))(parseNumberIO)
 * runIO(roundedIO)                         // Just(43)
 * 
 * // Array operations
 * const numbersIO = ioMaybe(() => just([1, 2, 3, 4, 5]))
 * const evenNumbersIO = mapIOMaybe((arr: Array<number>) => 
 *   arr.filter(x => x % 2 === 0)
 * )(numbersIO)
 * runIO(evenNumbersIO)                     // Just([2, 4])
 * 
 * const sumIO = mapIOMaybe((arr: Array<number>) => 
 *   arr.reduce((sum, x) => sum + x, 0)
 * )(evenNumbersIO)
 * runIO(sumIO)                             // Just(6)
 * 
 * // Safe property access with transformation
 * const configIO = ioMaybe(() => {
 *   const config = { apiUrl: "https://api.example.com", timeout: 5000 }
 *   return config.apiUrl ? just(config) : nothing()
 * })
 * const urlIO = mapIOMaybe((config: { apiUrl: string; timeout: number }) => 
 *   config.apiUrl
 * )(configIO)
 * runIO(urlIO)                             // Just("https://api.example.com")
 * 
 * const endpointIO = mapIOMaybe((url: string) => `${url}/users`)(urlIO)
 * runIO(endpointIO)                        // Just("https://api.example.com/users")
 * 
 * // Date formatting
 * const dateIO = ioMaybe(() => {
 *   const dateString = "2023-08-20"
 *   const date = new Date(dateString)
 *   return !isNaN(date.getTime()) ? just(date) : nothing()
 * })
 * const isoStringIO = mapIOMaybe((date: Date) => date.toISOString())(dateIO)
 * runIO(isoStringIO)                       // Just("2023-08-20T00:00:00.000Z")
 * 
 * const yearIO = mapIOMaybe((date: Date) => date.getFullYear())(dateIO)
 * runIO(yearIO)                            // Just(2023)
 * 
 * // Safe division with formatting
 * const divisionIO = ioMaybe(() => {
 *   const numerator = 100
 *   const denominator = 3
 *   return denominator !== 0 ? just(numerator / denominator) : nothing()
 * })
 * const formattedIO = mapIOMaybe((result: number) => 
 *   result.toFixed(2)
 * )(divisionIO)
 * runIO(formattedIO)                       // Just("33.33")
 * 
 * // JSON parsing and transformation
 * const jsonIO = ioMaybe(() => {
 *   const jsonString = '{"users": ["Alice", "Bob"], "count": 2}'
 *   try {
 *     return just(JSON.parse(jsonString))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * const userCountIO = mapIOMaybe((data: { users: Array<string>; count: number }) => 
 *   data.count
 * )(jsonIO)
 * runIO(userCountIO)                       // Just(2)
 * 
 * const firstUserIO = mapIOMaybe((data: { users: Array<string>; count: number }) => 
 *   data.users[0]
 * )(jsonIO)
 * runIO(firstUserIO)                       // Just("Alice")
 * 
 * // Email validation and normalization
 * const emailIO = ioMaybe(() => {
 *   const input = "  ALICE@EXAMPLE.COM  "
 *   const trimmed = input.trim()
 *   return trimmed.includes("@") ? just(trimmed) : nothing()
 * })
 * const normalizedIO = mapIOMaybe((email: string) => email.toLowerCase())(emailIO)
 * runIO(normalizedIO)                      // Just("alice@example.com")
 * 
 * const domainIO = mapIOMaybe((email: string) => email.split("@")[1])(normalizedIO)
 * runIO(domainIO)                          // Just("example.com")
 * 
 * // File path operations
 * const pathIO = ioMaybe(() => {
 *   const path = "/users/alice/documents/report.pdf"
 *   return path.length > 0 ? just(path) : nothing()
 * })
 * const filenameIO = mapIOMaybe((path: string) => 
 *   path.split("/").pop() || "unknown"
 * )(pathIO)
 * runIO(filenameIO)                        // Just("report.pdf")
 * 
 * const extensionIO = mapIOMaybe((filename: string) => 
 *   filename.split(".").pop() || ""
 * )(filenameIO)
 * runIO(extensionIO)                       // Just("pdf")
 * 
 * // Safe URL parsing and transformation
 * const urlParseIO = ioMaybe(() => {
 *   const urlString = "https://example.com:8080/api/v1/users?limit=10"
 *   try {
 *     return just(new URL(urlString))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * const hostIO = mapIOMaybe((url: URL) => url.host)(urlParseIO)
 * runIO(hostIO)                            // Just("example.com:8080")
 * 
 * const pathNameIO = mapIOMaybe((url: URL) => url.pathname)(urlParseIO)
 * runIO(pathNameIO)                        // Just("/api/v1/users")
 * 
 * // Chaining transformations
 * const idIO = ioMaybe(() => just("user-123"))
 * const prefixedIO = mapIOMaybe((id: string) => `ID:${id}`)(idIO)
 * const upperCaseIO = mapIOMaybe((prefixed: string) => prefixed.toUpperCase())(prefixedIO)
 * const hashIO = mapIOMaybe((upper: string) => `#${upper}#`)(upperCaseIO)
 * runIO(hashIO)                            // Just("#ID:USER-123#")
 * 
 * // Complex object transformations
 * const apiResponseIO = ioMaybe(() => just({
 *   data: { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] },
 *   meta: { total: 2, page: 1 }
 * }))
 * 
 * const userNamesIO = mapIOMaybe((response: any) => 
 *   response.data.users.map((user: any) => user.name)
 * )(apiResponseIO)
 * runIO(userNamesIO)                       // Just(["Alice", "Bob"])
 * 
 * const summaryIO = mapIOMaybe((response: any) => ({
 *   userCount: response.meta.total,
 *   currentPage: response.meta.page,
 *   firstUser: response.data.users[0]?.name || "Unknown"
 * }))(apiResponseIO)
 * runIO(summaryIO)                         // Just(summary object)
 * 
 * // Short-circuiting behavior
 * const failingIO = ioMaybe(() => nothing())
 * const neverExecutedIO = mapIOMaybe((x: any) => {
 *   console.log("This will never execute")
 *   return x
 * })(failingIO)
 * runIO(neverExecutedIO)                   // Nothing (function never called)
 * ```
 * @property Functor - Preserves structure while transforming Just values
 * @property Short-circuiting - Skips transformation for Nothing values
 * @property Composable - Can be chained with other IOMaybe operations
 * @property Type-safe - Maintains type information through transformation
 */
const mapIOMaybe = <A, B>(f: (a: A) => B) => (ioMaybe: IOMaybe<A>): IOMaybe<B> => 
  () => {
    const maybeValue = ioMaybe()
    return isJust(maybeValue) ? just(f(maybeValue.value)) : nothing()
  }

export default mapIOMaybe