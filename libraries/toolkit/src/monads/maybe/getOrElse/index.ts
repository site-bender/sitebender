import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Extracts the value from a Just or returns a default for Nothing
 *
 * Safely unwraps a Maybe value by providing a fallback for the Nothing case.
 * The default value is provided as a thunk (zero-argument function) to ensure
 * lazy evaluation - it's only computed if needed. This is the primary way to
 * exit the Maybe context when you need a concrete value.
 *
 * @curried
 * @param getDefault - Thunk that returns the default value if Nothing
 * @param maybe - The Maybe to extract from
 * @returns The Just value or the result of getDefault()
 * @example
 * ```typescript
 * // Basic extraction with default
 * getOrElse(() => 0)(just(42))    // 42
 * getOrElse(() => 0)(nothing())   // 0
 *
 * // Lazy evaluation - default only computed if needed
 * const expensiveDefault = () => 999
 * getOrElse(expensiveDefault)(just(5))   // 5 (not computed)
 * getOrElse(expensiveDefault)(nothing()) // 999 (computed)
 *
 * // Partial application for common defaults
 * const getOrZero = getOrElse(() => 0)
 * getOrZero(just(5))    // 5
 * getOrZero(nothing())  // 0
 *
 * // Configuration with defaults
 * const getTimeout = (config: { timeout?: number }): number =>
 *   pipe(
 *     config.timeout ? just(config.timeout) : nothing(),
 *     getOrElse(() => 5000)
 *   )
 *
 * // Error messages as defaults
 * const divide = (a: number) => (b: number): Maybe<number> =>
 *   b === 0 ? nothing() : just(a / b)
 *
 * pipe(
 *   divide(10)(0),
 *   getOrElse(() => Infinity)
 * )  // Infinity
 *
 * // Nested Maybe extraction
 * pipe(
 *   just(just(42)),
 *   getOrElse(() => nothing()),
 *   getOrElse(() => 0)
 * )  // 42
 * ```
 *
 * @pure
 * @curried
 * @safe
 */
const getOrElse = <A>(getDefault: () => A) => (maybe: Maybe<A>): A => {
	if (isNothing(maybe)) {
		return getDefault()
	}

	return maybe.value
}

export default getOrElse
