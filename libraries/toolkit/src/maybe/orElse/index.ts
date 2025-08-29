import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Returns an alternative Maybe if the current one is Nothing
 *
 * Provides a fallback Maybe value for the Nothing case. Unlike getOrElse which
 * exits the Maybe context, orElse keeps you within the Maybe monad, allowing
 * continued chaining of operations. The alternative is provided as a thunk for
 * lazy evaluation. This is useful for trying multiple sources or providing
 * computed alternatives.
 *
 * @curried
 * @param getAlternative - Thunk that returns the alternative Maybe if Nothing
 * @param maybe - The Maybe to check
 * @returns The original Maybe if Just, otherwise the alternative
 * @example
 * ```typescript
 * // Basic fallback
 * orElse(() => just(0))(just(42))    // Just(42) - original kept
 * orElse(() => just(0))(nothing())   // Just(0) - alternative used
 *
 * // Chaining fallbacks
 * pipe(
 *   nothing(),
 *   orElse(() => nothing()),
 *   orElse(() => just(42)),
 *   orElse(() => just(999))
 * )  // Just(42)
 *
 * // Lazy evaluation - alternative only computed if needed
 * const expensiveAlternative = () => just(999)
 * orElse(expensiveAlternative)(just(5))   // Just(5)
 * orElse(expensiveAlternative)(nothing()) // Just(999)
 *
 * // Multiple data sources
 * const getValue = (key: string): Maybe<string> =>
 *   pipe(
 *     getFromCache(key),
 *     orElse(() => getFromDatabase(key)),
 *     orElse(() => just("default value"))
 *   )
 *
 * // Configuration fallbacks
 * const getConfigValue = (config: { primary?: string }): Maybe<string> =>
 *   pipe(
 *     config.primary ? just(config.primary) : nothing(),
 *     orElse(() => just("fallback"))
 *   )
 *
 * // Error recovery
 * const safeParse = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * pipe(
 *   safeParse("abc"),
 *   orElse(() => just(0))
 * )  // Just(0)
 *
 * // Partial application for common patterns
 * const orDefault = <T>(value: T) => orElse(() => just(value))
 * const orZero = orDefault(0)
 * orZero(nothing())  // Just(0)
 *
 * // Alternative computation chains
 * const calculate = (x: number): Maybe<number> =>
 *   pipe(
 *     x > 0 ? just(x * 2) : nothing(),
 *     orElse(() => x < 0 ? just(x * -2) : nothing()),
 *     orElse(() => just(0))
 *   )
 *
 * calculate(5)   // Just(10)
 * calculate(-5)  // Just(10)
 * calculate(0)   // Just(0)
 * ```
 *
 * @pure
 * @curried
 */
const orElse =
	<A>(getAlternative: () => Maybe<A>) => (maybe: Maybe<A>): Maybe<A> => {
		if (isNothing(maybe)) {
			return getAlternative()
		}

		return maybe
	}

export default orElse
