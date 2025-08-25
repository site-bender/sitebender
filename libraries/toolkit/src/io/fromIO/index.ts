import type { IO, IOMaybe } from "../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

/**
 * Converts IO<A> to IOMaybe<A> by wrapping result in Just
 *
 * Lifts a regular IO computation into the IOMaybe context by wrapping
 * its result in a Just value. This is useful when you have an IO that
 * always succeeds but you want to compose it with operations that may
 * fail or return Nothing. The resulting IOMaybe will always contain
 * Just(value) when executed.
 *
 * @param io - IO to convert to IOMaybe
 * @returns IOMaybe that wraps the IO's result in Just
 * @example
 * ```typescript
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 * import { chainIOMaybe } from "../chainIOMaybe/index.ts"
 *
 * // Basic conversion
 * const numberIO = io(() => 42)
 * const numberMaybeIO = fromIO(numberIO)
 * runIO(numberMaybeIO)                     // Just(42)
 *
 * // String conversion
 * const greetingIO = io(() => "Hello, World!")
 * const greetingMaybeIO = fromIO(greetingIO)
 * runIO(greetingMaybeIO)                   // Just("Hello, World!")
 *
 * // Object conversion
 * const userIO = io(() => ({ name: "Alice", age: 30 }))
 * const userMaybeIO = fromIO(userIO)
 * runIO(userMaybeIO)                       // Just({ name: "Alice", age: 30 })
 *
 * // Timestamp conversion
 * const timestampIO = io(() => Date.now())
 * const timestampMaybeIO = fromIO(timestampIO)
 * runIO(timestampMaybeIO)                  // Just(1692547200000)
 *
 * // Random value conversion
 * const randomIO = io(() => Math.random())
 * const randomMaybeIO = fromIO(randomIO)
 * runIO(randomMaybeIO)                     // Just(0.123456...)
 *
 * // Configuration loading
 * const configIO = io(() => ({
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000,
 *   retries: 3
 * }))
 * const configMaybeIO = fromIO(configIO)
 * runIO(configMaybeIO)                     // Just(config object)
 *
 * // Chaining with Maybe operations
 * const idIO = io(() => "user-123")
 * const idMaybeIO = fromIO(idIO)
 * const processedIO = mapIOMaybe((id: string) => id.toUpperCase())(idMaybeIO)
 * runIO(processedIO)                       // Just("USER-123")
 *
 * // Composing with fallible operations
 * const baseUrlIO = io(() => "https://api.example.com")
 * const baseUrlMaybeIO = fromIO(baseUrlIO)
 * const fetchUserIO = chainIOMaybe((url: string) =>
 *   io(() => url.includes("api") ? just(`${url}/users`) : nothing())
 * )(baseUrlMaybeIO)
 * runIO(fetchUserIO)                       // Just("https://api.example.com/users")
 *
 * // Array processing
 * const numbersIO = io(() => [1, 2, 3, 4, 5])
 * const numbersMaybeIO = fromIO(numbersIO)
 * const evenNumbersIO = mapIOMaybe((arr: Array<number>) =>
 *   arr.filter(x => x % 2 === 0)
 * )(numbersMaybeIO)
 * runIO(evenNumbersIO)                     // Just([2, 4])
 *
 * // File path operations
 * const filePathIO = io(() => "/users/alice/documents/readme.txt")
 * const filePathMaybeIO = fromIO(filePathIO)
 * const filenameIO = mapIOMaybe((path: string) =>
 *   path.split("/").pop() || "unknown"
 * )(filePathMaybeIO)
 * runIO(filenameIO)                        // Just("readme.txt")
 *
 * // JSON data conversion
 * const jsonDataIO = io(() => '{"name": "Alice", "active": true}')
 * const jsonMaybeIO = fromIO(jsonDataIO)
 * const parsedIO = mapIOMaybe((json: string) => {
 *   try {
 *     return JSON.parse(json)
 *   } catch {
 *     return null
 *   }
 * })(jsonMaybeIO)
 * runIO(parsedIO)                          // Just({ name: "Alice", active: true })
 *
 * // Environment variable simulation
 * const envVarIO = io(() => "production")
 * const envMaybeIO = fromIO(envVarIO)
 * const configuredIO = mapIOMaybe((env: string) => ({
 *   debug: env === "development",
 *   apiUrl: env === "production" ? "https://api.prod.com" : "https://api.dev.com"
 * }))(envMaybeIO)
 * runIO(configuredIO)                      // Just(environment config)
 *
 * // UUID generation
 * const uuidIO = io(() => crypto.randomUUID())
 * const uuidMaybeIO = fromIO(uuidIO)
 * const shortIdIO = mapIOMaybe((uuid: string) =>
 *   uuid.replace(/-/g, "").substring(0, 8).toUpperCase()
 * )(uuidMaybeIO)
 * runIO(shortIdIO)                         // Just("ABC12345")
 *
 * // Mathematical calculations
 * const piIO = io(() => Math.PI)
 * const piMaybeIO = fromIO(piIO)
 * const roundedIO = mapIOMaybe((pi: number) =>
 *   Math.round(pi * 1000) / 1000
 * )(piMaybeIO)
 * runIO(roundedIO)                         // Just(3.142)
 *
 * // Validation preparation
 * const inputIO = io(() => "alice@example.com")
 * const inputMaybeIO = fromIO(inputIO)
 * const validatedIO = chainIOMaybe((email: string) =>
 *   io(() => email.includes("@") ? just(email) : nothing())
 * )(inputMaybeIO)
 * runIO(validatedIO)                       // Just("alice@example.com")
 *
 * // Error-prone to safe conversion
 * const riskyIO = io(() => {
 *   // This always succeeds, but we want Maybe context for composition
 *   return "safe result"
 * })
 * const safeMaybeIO = fromIO(riskyIO)
 * const processedSafeIO = mapIOMaybe((result: string) =>
 *   result.length > 0 ? result : null
 * )(safeMaybeIO)
 * runIO(processedSafeIO)                   // Just("safe result")
 *
 * // Default value preparation
 * const defaultIO = io(() => ({ theme: "light", language: "en" }))
 * const defaultMaybeIO = fromIO(defaultIO)
 * const mergedIO = chainIOMaybe((defaults: Record<string, string>) =>
 *   io(() => {
 *     const userPrefs = { theme: "dark" }
 *     return just({ ...defaults, ...userPrefs })
 *   })
 * )(defaultMaybeIO)
 * runIO(mergedIO)                          // Just({ theme: "dark", language: "en" })
 *
 * // Complex object transformation
 * const serverDataIO = io(() => ({
 *   users: ["alice", "bob", "charlie"],
 *   timestamp: Date.now(),
 *   version: "1.2.3"
 * }))
 * const serverMaybeIO = fromIO(serverDataIO)
 * const summaryIO = mapIOMaybe((data: any) => ({
 *   userCount: data.users.length,
 *   lastUpdate: new Date(data.timestamp).toISOString(),
 *   majorVersion: data.version.split(".")[0]
 * }))(serverMaybeIO)
 * runIO(summaryIO)                         // Just(summary object)
 *
 * // Preparation for optional chaining
 * const urlIO = io(() => "https://example.com/api/v1")
 * const urlMaybeIO = fromIO(urlIO)
 * const endpointIO = chainIOMaybe((url: string) =>
 *   io(() => url.endsWith("/v1") ? just(`${url}/users`) : nothing())
 * )(urlMaybeIO)
 * runIO(endpointIO)                        // Just("https://example.com/api/v1/users")
 * ```
 * @property Lifting - Lifts IO into IOMaybe context
 * @property Always-success - Result is always Just(value)
 * @property Composable - Enables chaining with Maybe-aware operations
 * @property Type-safe - Maintains type information through conversion
 */
const fromIO = <A>(io: IO<A>): IOMaybe<A> => () => just(io())

export default fromIO
