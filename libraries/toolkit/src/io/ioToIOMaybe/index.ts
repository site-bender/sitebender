import type { IO, IOMaybe } from "../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

/**
 * Converts IO<A> to IOMaybe<A> by wrapping the value in Just
 * 
 * Takes an IO computation that always succeeds and lifts it into IOMaybe
 * context by wrapping the result in Just. This is useful when you have an
 * effectful computation that will always produce a value and want to integrate
 * it with other IOMaybe operations that may not produce values.
 * 
 * @param io - IO computation to convert to IOMaybe
 * @returns IOMaybe that wraps the IO result in Just
 * @example
 * ```typescript
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { chainIOMaybe } from "../chainIOMaybe/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 * import { ioMaybe } from "../ioMaybe/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 * 
 * // Basic conversion
 * const generateIdIO: IO<string> = io(() => crypto.randomUUID())
 * const idIOMaybe: IOMaybe<string> = ioToIOMaybe(generateIdIO)
 * 
 * runIO(idIOMaybe)  // Just("550e8400-e29b-41d4-a716-446655440000")
 * 
 * // Random number generation
 * const randomIO: IO<number> = io(() => Math.random())
 * const randomIOMaybe: IOMaybe<number> = ioToIOMaybe(randomIO)
 * 
 * runIO(randomIOMaybe)  // Just(0.123456...)
 * 
 * // Current time
 * const nowIO: IO<number> = io(() => Date.now())
 * const nowIOMaybe: IOMaybe<number> = ioToIOMaybe(nowIO)
 * 
 * runIO(nowIOMaybe)  // Just(1692547200000)
 * 
 * // Chaining with validation
 * const generateNumberIO: IO<number> = io(() => Math.random() * 100)
 * 
 * const validatePositiveIO = (n: number): IOMaybe<number> =>
 *   ioMaybe(() => n > 50 ? just(n) : nothing())
 * 
 * const processedIO = pipe(
 *   ioToIOMaybe(generateNumberIO),
 *   chainIOMaybe(validatePositiveIO)
 * )
 * 
 * runIO(processedIO)  // Just(75.123...) or Nothing (if < 50)
 * 
 * // Configuration loading
 * const loadConfigIO: IO<object> = io(() => ({
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000
 * }))
 * 
 * const configIOMaybe = ioToIOMaybe(loadConfigIO)
 * 
 * const apiUrlIO = mapIOMaybe((config: any) => config.apiUrl)(configIOMaybe)
 * runIO(apiUrlIO)  // Just("https://api.example.com")
 * 
 * // User input processing
 * const getUserInputIO: IO<string> = io(() => "user@example.com")
 * 
 * const validateEmailIO = (input: string): IOMaybe<string> =>
 *   ioMaybe(() => 
 *     input.includes("@") ? just(input) : nothing()
 *   )
 * 
 * const emailIO = pipe(
 *   ioToIOMaybe(getUserInputIO),
 *   chainIOMaybe(validateEmailIO)
 * )
 * 
 * runIO(emailIO)  // Just("user@example.com")
 * 
 * // Complex pipeline with IO and IOMaybe
 * const fetchDataIO: IO<string> = io(() => '{"users": ["Alice", "Bob"]}')
 * 
 * const parseJsonIO = (json: string): IOMaybe<unknown> =>
 *   ioMaybe(() => {
 *     try {
 *       return just(JSON.parse(json))
 *     } catch {
 *       return nothing()
 *     }
 *   })
 * 
 * const extractUsersIO = (data: any): IOMaybe<Array<string>> =>
 *   ioMaybe(() => 
 *     data && data.users && Array.isArray(data.users)
 *       ? just(data.users)
 *       : nothing()
 *   )
 * 
 * const pipelineIO = pipe(
 *   ioToIOMaybe(fetchDataIO),
 *   chainIOMaybe(parseJsonIO),
 *   chainIOMaybe(extractUsersIO)
 * )
 * 
 * runIO(pipelineIO)  // Just(["Alice", "Bob"])
 * 
 * // Mathematical operations
 * const computeIO: IO<number> = io(() => {
 *   const a = 10
 *   const b = 20
 *   return a + b
 * })
 * 
 * const computeIOMaybe = ioToIOMaybe(computeIO)
 * 
 * const doubledIO = mapIOMaybe((n: number) => n * 2)(computeIOMaybe)
 * runIO(doubledIO)  // Just(60)
 * 
 * // DOM operations (browser example)
 * const getTitleIO: IO<string> = io(() => document.title)
 * const titleIOMaybe = ioToIOMaybe(getTitleIO)
 * 
 * const uppercaseTitleIO = mapIOMaybe((title: string) => 
 *   title.toUpperCase()
 * )(titleIOMaybe)
 * 
 * runIO(uppercaseTitleIO)  // Just("MY PAGE TITLE")
 * 
 * // LocalStorage operations (browser)
 * const saveDataIO: IO<void> = io(() => {
 *   localStorage.setItem("key", "value")
 * })
 * 
 * const saveIOMaybe = ioToIOMaybe(saveDataIO)
 * runIO(saveIOMaybe)  // Just(undefined)
 * 
 * // Array generation
 * const generateArrayIO: IO<Array<number>> = io(() => 
 *   Array.from({ length: 5 }, (_, i) => i + 1)
 * )
 * 
 * const arrayIOMaybe = ioToIOMaybe(generateArrayIO)
 * 
 * const firstElementIO = chainIOMaybe((arr: Array<number>) =>
 *   ioMaybe(() => arr.length > 0 ? just(arr[0]) : nothing())
 * )(arrayIOMaybe)
 * 
 * runIO(firstElementIO)  // Just(1)
 * 
 * // Timestamp operations
 * const getTimestampIO: IO<Date> = io(() => new Date())
 * 
 * const timestampIOMaybe = ioToIOMaybe(getTimestampIO)
 * 
 * const yearIO = mapIOMaybe((date: Date) => 
 *   date.getFullYear()
 * )(timestampIOMaybe)
 * 
 * runIO(yearIO)  // Just(2023)
 * 
 * // Combining multiple IO sources
 * const io1: IO<string> = io(() => "Hello")
 * const io2: IO<string> = io(() => "World")
 * 
 * const combinedIO = pipe(
 *   ioToIOMaybe(io1),
 *   chainIOMaybe((greeting: string) =>
 *     pipe(
 *       ioToIOMaybe(io2),
 *       mapIOMaybe((name: string) => `${greeting}, ${name}!`)
 *     )
 *   )
 * )
 * 
 * runIO(combinedIO)  // Just("Hello, World!")
 * 
 * // Error-safe conversion
 * const riskyIO: IO<number> = io(() => {
 *   // This might throw in real scenarios
 *   return 42
 * })
 * 
 * const safeIO = ioToIOMaybe(riskyIO)
 * runIO(safeIO)  // Just(42)
 * 
 * // Filtering after conversion
 * const valueIO: IO<number> = io(() => 10)
 * 
 * const filteredIO = pipe(
 *   ioToIOMaybe(valueIO),
 *   chainIOMaybe((n: number) =>
 *     ioMaybe(() => n > 5 ? just(n) : nothing())
 *   )
 * )
 * 
 * runIO(filteredIO)  // Just(10)
 * 
 * // Complex object transformation
 * interface User {
 *   id: number
 *   name: string
 *   email?: string
 * }
 * 
 * const createUserIO: IO<User> = io(() => ({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * }))
 * 
 * const userIOMaybe = ioToIOMaybe(createUserIO)
 * 
 * const emailIO2 = chainIOMaybe((user: User) =>
 *   ioMaybe(() => user.email ? just(user.email) : nothing())
 * )(userIOMaybe)
 * 
 * runIO(emailIO2)  // Just("alice@example.com")
 * 
 * // Sequential IO operations
 * const step1IO: IO<number> = io(() => 1)
 * const step2IO: IO<number> = io(() => 2)
 * const step3IO: IO<number> = io(() => 3)
 * 
 * const sequenceIO = pipe(
 *   ioToIOMaybe(step1IO),
 *   chainIOMaybe((a: number) =>
 *     pipe(
 *       ioToIOMaybe(step2IO),
 *       chainIOMaybe((b: number) =>
 *         pipe(
 *           ioToIOMaybe(step3IO),
 *           mapIOMaybe((c: number) => a + b + c)
 *         )
 *       )
 *     )
 *   )
 * )
 * 
 * runIO(sequenceIO)  // Just(6)
 * ```
 * @property Lifting - Lifts IO into IOMaybe context with Just wrapper
 * @property Infallible - Always produces Just, never Nothing
 * @property Composable - Enables integration with IOMaybe operations
 * @property Type-safe - Preserves type information through conversion
 */
const ioToIOMaybe = <A>(io: IO<A>): IOMaybe<A> => () => just(io())

export default ioToIOMaybe