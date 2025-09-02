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
 * @curried
 * @param onNothing - Function to call when Maybe is Nothing
 * @param onJust - Function to transform the Just value
 * @param maybe - The Maybe to extract from
 * @returns The result of the appropriate handler
 * @example
 * ```typescript
 * // Basic extraction with default value
 * const getDefault = () => 0
 * const getValue = (x: number) => x
 * maybe(getDefault)(getValue)(just(42))   // 42
 * maybe(getDefault)(getValue)(nothing())  // 0
 *
 * // Different transformations for each case
 * maybe(
 *   () => "No value"
 * )(
 *   (n: number) => `Value is ${n}`
 * )(just(10))   // "Value is 10"
 *
 * // Partial application for reusable extractors
 * const withDefault = <T>(defaultValue: T) =>
 *   maybe(() => defaultValue)((x: T) => x)
 *
 * const getOrZero = withDefault(0)
 * getOrZero(just(5))    // 5
 * getOrZero(nothing())  // 0
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
 * // Calculations with fallback logic
 * const calculatePrice = (
 *   basePrice: number,
 *   discount: Maybe<number>
 * ): number =>
 *   maybe(
 *     () => basePrice
 *   )(
 *     d => basePrice * (1 - d / 100)
 *   )(discount)
 *
 * calculatePrice(100, just(20))   // 80
 * calculatePrice(100, nothing())  // 100
 *
 * // Type conversions
 * const maybeToArray = <T>(m: Maybe<T>): Array<T> =>
 *   maybe<Array<T>>(() => [])(value => [value])(m)
 *
 * maybeToArray(just(42))   // [42]
 * maybeToArray(nothing())  // []
 * ```
 *
 * @pure
 * @curried
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
