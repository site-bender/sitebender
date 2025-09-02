import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Folds a Maybe value to a single result using handlers for each case
 *
 * Reduces a Maybe to a single value by providing transformation functions
 * for both Nothing and Just cases. This is essentially an alias for the
 * maybe function but with a name that emphasizes the fold/reduce pattern
 * common in functional programming. Useful for converting Maybe values
 * to other types while handling both cases explicitly.
 *
 * @param onNothing - Function to call when Maybe is Nothing
 * @param onJust - Function to transform the Just value
 * @param maybe - The Maybe to fold
 * @returns The result of the appropriate handler
 * @pure
 * @curried
 * @example
 * ```typescript
 * import just from "../just/index.ts"
 * import nothing from "../nothing/index.ts"
 *
 * // Basic folding to a value
 * const toNumber = fold(
 *   () => 0,
 *   (x: number) => x
 * )
 *
 * toNumber(just(42))    // 42
 * toNumber(nothing())   // 0
 *
 * // Folding to different types
 * const toString = fold(
 *   () => "Nothing",
 *   (n: number) => `Just(${n})`
 * )
 *
 * toString(just(42))    // "Just(42)"
 * toString(nothing())   // "Nothing"
 *
 * // Partial application for common patterns
 * const withDefault = <T>(defaultValue: T) =>
 *   fold<T, T>(
 *     () => defaultValue,
 *     x => x
 *   )
 *
 * const getOrZero = withDefault(0)
 * const getOrEmpty = withDefault("")
 *
 * getOrZero(just(5))       // 5
 * getOrZero(nothing())     // 0
 * getOrEmpty(just("hi"))   // "hi"
 * getOrEmpty(nothing())    // ""
 *
 * // Aggregating Maybe values
 * const sumMaybes = (maybes: Array<Maybe<number>>): number =>
 *   maybes.reduce(
 *     (total, maybe) => total + fold(
 *       () => 0,
 *       n => n
 *     )(maybe),
 *     0
 *   )
 *
 * sumMaybes([just(1), nothing(), just(2), just(3)])  // 6
 *
 * // Error handling patterns
 * const handleDivision = (a: number, b: number): string => {
 *   const result = b === 0 ? nothing() : just(a / b)
 *
 *   return fold<number, string>(
 *     () => `Error: Cannot divide ${a} by zero`,
 *     value => `${a} ÷ ${b} = ${value}`
 *   )(result)
 * }
 *
 * handleDivision(10, 2)  // "10 ÷ 2 = 5"
 * handleDivision(10, 0)  // "Error: Cannot divide 10 by zero"
 * ```
 */
const fold =
	<A, B>(onNothing: () => B) =>
	(onJust: (value: A) => B) =>
	(maybe: Maybe<A>): B => {
		if (isNothing(maybe)) {
			return onNothing()
		}

		return onJust(maybe.value)
	}

export default fold
