import type { Maybe } from "../../../types/fp/maybe/index.ts"
import isNothing from "../isNothing/index.ts"

/**
 * Extracts the value from a Just or returns a default for Nothing
 * 
 * Safely unwraps a Maybe value by providing a fallback for the Nothing case.
 * The default value is provided as a thunk (zero-argument function) to ensure
 * lazy evaluation - it's only computed if needed. This is the primary way to
 * exit the Maybe context when you need a concrete value.
 * 
 * @curried (getDefault) => (maybe) => value
 * @param getDefault - Thunk that returns the default value if Nothing
 * @param maybe - The Maybe to extract from
 * @returns The Just value or the result of getDefault()
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 * 
 * // Basic extraction with default
 * getOrElse(() => 0)(just(42))    // 42
 * getOrElse(() => 0)(nothing())   // 0
 * 
 * // Lazy evaluation - default only computed if needed
 * let sideEffect = 0
 * const expensiveDefault = () => {
 *   sideEffect += 1
 *   return 999
 * }
 * 
 * getOrElse(expensiveDefault)(just(5))   // 5 (sideEffect still 0)
 * getOrElse(expensiveDefault)(nothing()) // 999 (sideEffect now 1)
 * 
 * // Different types of defaults
 * const getName = (maybeUser: Maybe<User>): string =>
 *   pipe(
 *     maybeUser,
 *     map(u => u.name),
 *     getOrElse(() => "Anonymous")
 *   )
 * 
 * getName(just({ id: 1, name: "Alice" }))  // "Alice"
 * getName(nothing())                        // "Anonymous"
 * 
 * // Partial application for common defaults
 * const getOrZero = getOrElse(() => 0)
 * const getOrEmptyString = getOrElse(() => "")
 * const getOrEmptyArray = <T>() => getOrElse<Array<T>>(() => [])
 * 
 * getOrZero(just(5))              // 5
 * getOrZero(nothing())            // 0
 * getOrEmptyString(just("hello")) // "hello"
 * getOrEmptyString(nothing())     // ""
 * getOrEmptyArray<number>()(just([1, 2, 3])) // [1, 2, 3]
 * getOrEmptyArray<number>()(nothing())       // []
 * 
 * // Configuration with defaults
 * interface Config {
 *   timeout?: number
 *   retries?: number
 *   baseUrl?: string
 * }
 * 
 * const getTimeout = (config: Config): number =>
 *   pipe(
 *     config.timeout ? just(config.timeout) : nothing(),
 *     getOrElse(() => 5000)  // Default 5 seconds
 *   )
 * 
 * const getRetries = (config: Config): number =>
 *   pipe(
 *     config.retries !== undefined ? just(config.retries) : nothing(),
 *     getOrElse(() => 3)  // Default 3 retries
 *   )
 * 
 * getTimeout({ timeout: 10000 })  // 10000
 * getTimeout({})                  // 5000
 * getRetries({ retries: 0 })      // 0 (explicit zero is kept)
 * getRetries({})                  // 3
 * 
 * // Error messages as defaults
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { chain } from "../chain/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * const divide = (a: number) => (b: number): Maybe<number> =>
 *   b === 0 ? nothing() : just(a / b)
 * 
 * const calculate = (x: number, y: number): string =>
 *   pipe(
 *     divide(x)(y),
 *     map(result => `Result: ${result}`),
 *     getOrElse(() => "Error: Division by zero")
 *   )
 * 
 * calculate(10, 2)  // "Result: 5"
 * calculate(10, 0)  // "Error: Division by zero"
 * 
 * // Chaining with fallback values
 * const users = new Map([
 *   [1, { id: 1, name: "Alice", email: "alice@example.com" }],
 *   [2, { id: 2, name: "Bob" }]  // No email
 * ])
 * 
 * const getUserEmail = (id: number): string =>
 *   pipe(
 *     users.get(id) ? just(users.get(id)!) : nothing(),
 *     chain(user => user.email ? just(user.email) : nothing()),
 *     getOrElse(() => "no-email@example.com")
 *   )
 * 
 * getUserEmail(1)  // "alice@example.com"
 * getUserEmail(2)  // "no-email@example.com"
 * getUserEmail(3)  // "no-email@example.com"
 * 
 * // Complex default computation
 * const getValueOrCompute = (
 *   maybeValue: Maybe<number>,
 *   computeDefault: () => number
 * ): number =>
 *   getOrElse(computeDefault)(maybeValue)
 * 
 * const complexDefault = () => {
 *   // Expensive computation
 *   const values = [1, 2, 3, 4, 5]
 *   return values.reduce((a, b) => a + b, 0) * 10
 * }
 * 
 * getValueOrCompute(just(42), complexDefault)    // 42 (no computation)
 * getValueOrCompute(nothing(), complexDefault)   // 150 (computed)
 * 
 * // Environment variables with defaults
 * const getEnvVar = (name: string): Maybe<string> => {
 *   const value = process.env[name]
 *   return value ? just(value) : nothing()
 * }
 * 
 * const getPort = (): number =>
 *   pipe(
 *     getEnvVar("PORT"),
 *     chain(s => {
 *       const n = parseInt(s, 10)
 *       return isNaN(n) ? nothing() : just(n)
 *     }),
 *     getOrElse(() => 3000)
 *   )
 * 
 * // Rendering with fallbacks
 * const renderPrice = (maybePrice: Maybe<number>): string =>
 *   pipe(
 *     maybePrice,
 *     map(price => `$${price.toFixed(2)}`),
 *     getOrElse(() => "Price not available")
 *   )
 * 
 * renderPrice(just(19.99))   // "$19.99"
 * renderPrice(nothing())     // "Price not available"
 * 
 * // Async operations with defaults
 * const fetchUserWithDefault = async (
 *   id: number
 * ): Promise<User> => {
 *   const maybeUser = await fetchUser(id)  // Returns Maybe<User>
 *   
 *   return getOrElse(() => ({
 *     id: 0,
 *     name: "Guest",
 *     isGuest: true
 *   }))(maybeUser)
 * }
 * 
 * // Nested Maybe extraction
 * const data: Maybe<Maybe<number>> = just(just(42))
 * 
 * const extracted = pipe(
 *   data,
 *   getOrElse(() => nothing()),  // Maybe<number>
 *   getOrElse(() => 0)           // number
 * )
 * // 42
 * 
 * // Using with reduce for aggregation
 * const sumValidNumbers = (
 *   maybes: Array<Maybe<number>>
 * ): number =>
 *   maybes.reduce(
 *     (sum, maybe) => sum + getOrElse(() => 0)(maybe),
 *     0
 *   )
 * 
 * sumValidNumbers([just(1), nothing(), just(2), just(3)])  // 6
 * ```
 * 
 * @property Lazy-evaluation - Default is only computed if needed
 * @property Type-safe - Ensures a value is always returned
 * @property Composable - Works well in pipelines and chains
 */
const getOrElse = <A>(getDefault: () => A) => 
	(maybe: Maybe<A>): A => {
		if (isNothing(maybe)) {
			return getDefault()
		}
		
		return maybe.value
	}

export default getOrElse