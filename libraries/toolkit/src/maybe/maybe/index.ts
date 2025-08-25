import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Extracts a value from a Maybe using handlers for each case
 *
 * Pattern matching function that safely extracts values from Maybe by providing
 * handlers for both Nothing and Just cases. This is the primary way to consume
 * Maybe values, converting them back to regular values while handling the absence
 * case explicitly. Similar to fold or either in other monadic contexts.
 *
 * @curried (onNothing) => (onJust) => (maybe) => result
 * @param onNothing - Function to call when Maybe is Nothing
 * @param onJust - Function to transform the Just value
 * @param maybe - The Maybe to extract from
 * @returns The result of the appropriate handler
 * @example
 * ```typescript
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic extraction with default value
 * const getDefault = () => 0
 * const getValue = (x: number) => x
 *
 * maybe(getDefault)(getValue)(just(42))   // 42
 * maybe(getDefault)(getValue)(nothing())  // 0
 *
 * // Different transformations for each case
 * const onNothing = () => "No value"
 * const onJust = (n: number) => `Value is ${n}`
 *
 * maybe(onNothing)(onJust)(just(10))   // "Value is 10"
 * maybe(onNothing)(onJust)(nothing())  // "No value"
 *
 * // Partial application for reusable extractors
 * const withDefault = <T>(defaultValue: T) =>
 *   maybe(() => defaultValue)((x: T) => x)
 *
 * const getOrZero = withDefault(0)
 * getOrZero(just(5))    // 5
 * getOrZero(nothing())  // 0
 *
 * const getOrEmpty = withDefault("")
 * getOrEmpty(just("hello"))  // "hello"
 * getOrEmpty(nothing())      // ""
 *
 * // Converting Maybe to different types
 * interface Result<T> {
 *   success: boolean
 *   value?: T
 *   error?: string
 * }
 *
 * const toResult = <T>(maybeValue: Maybe<T>): Result<T> =>
 *   maybe<Result<T>>(
 *     () => ({ success: false, error: "No value present" })
 *   )(
 *     value => ({ success: true, value })
 *   )(maybeValue)
 *
 * toResult(just(42))
 * // { success: true, value: 42 }
 *
 * toResult(nothing())
 * // { success: false, error: "No value present" }
 *
 * // Rendering UI based on Maybe values
 * const renderUser = (maybeUser: Maybe<User>): string =>
 *   maybe(
 *     () => "<div>No user found</div>"
 *   )(
 *     user => `<div>Welcome, ${user.name}!</div>`
 *   )(maybeUser)
 *
 * renderUser(just({ id: 1, name: "Alice" }))
 * // "<div>Welcome, Alice!</div>"
 *
 * renderUser(nothing())
 * // "<div>No user found</div>"
 *
 * // Calculations with fallback logic
 * const calculatePrice = (
 *   basePrice: number,
 *   discount: Maybe<number>
 * ): number =>
 *   maybe(
 *     () => basePrice  // No discount
 *   )(
 *     d => basePrice * (1 - d / 100)  // Apply discount
 *   )(discount)
 *
 * calculatePrice(100, just(20))   // 80 (20% off)
 * calculatePrice(100, nothing())  // 100 (no discount)
 *
 * // Logging with different messages
 * const logMaybe = <T>(context: string) => (value: Maybe<T>): void =>
 *   maybe(
 *     () => console.log(`${context}: No value`)
 *   )(
 *     v => console.log(`${context}: ${v}`)
 *   )(value)
 *
 * const logUser = logMaybe("User")
 * logUser(just("Alice"))  // logs: "User: Alice"
 * logUser(nothing())      // logs: "User: No value"
 *
 * // Complex transformations
 * interface Config {
 *   apiUrl?: string
 *   timeout?: number
 *   retries?: number
 * }
 *
 * const getApiUrl = (config: Config): Maybe<string> =>
 *   config.apiUrl ? just(config.apiUrl) : nothing()
 *
 * const buildRequest = (config: Config): Request | null =>
 *   maybe<Request | null>(
 *     () => null
 *   )(
 *     url => new Request(url, {
 *       timeout: config.timeout || 5000
 *     })
 *   )(getApiUrl(config))
 *
 * // Chaining Maybe extractions
 * const processChain = (
 *   first: Maybe<number>,
 *   second: Maybe<number>
 * ): string =>
 *   maybe(
 *     () => "First value missing"
 *   )(
 *     a => maybe(
 *       () => `Second value missing, first was ${a}`
 *     )(
 *       b => `Sum: ${a + b}`
 *     )(second)
 *   )(first)
 *
 * processChain(just(10), just(20))   // "Sum: 30"
 * processChain(just(10), nothing())  // "Second value missing, first was 10"
 * processChain(nothing(), just(20))  // "First value missing"
 *
 * // Type conversions
 * const maybeToArray = <T>(m: Maybe<T>): Array<T> =>
 *   maybe<Array<T>>(
 *     () => []
 *   )(
 *     value => [value]
 *   )(m)
 *
 * maybeToArray(just(42))   // [42]
 * maybeToArray(nothing())  // []
 *
 * // Async operations
 * const fetchData = async (
 *   id: Maybe<number>
 * ): Promise<Data | null> =>
 *   maybe<Promise<Data | null>>(
 *     () => Promise.resolve(null)
 *   )(
 *     async (validId) => {
 *       const response = await fetch(`/api/data/${validId}`)
 *       return response.json()
 *     }
 *   )(id)
 *
 * // Error handling patterns
 * const safeDivision = (a: number, b: number): Maybe<number> =>
 *   b === 0 ? nothing() : just(a / b)
 *
 * const divisionResult = (a: number, b: number): string =>
 *   maybe(
 *     () => "Error: Division by zero"
 *   )(
 *     result => `Result: ${result}`
 *   )(safeDivision(a, b))
 *
 * divisionResult(10, 2)  // "Result: 5"
 * divisionResult(10, 0)  // "Error: Division by zero"
 * ```
 *
 * @property Pattern-matching - Handles both Nothing and Just cases
 * @property Type-safe - Ensures all cases are handled
 * @property Composable - Can be partially applied and chained
 */
const maybe =
	<B>(onNothing: () => B) =>
	<A>(onJust: (value: A) => B) =>
	(maybe: Maybe<A>): B => {
		if (isNothing(maybe)) {
			return onNothing()
		}

		return onJust(maybe.value)
	}

export default maybe
