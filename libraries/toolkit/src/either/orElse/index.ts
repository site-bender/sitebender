import type { Either } from "../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

/**
 * Provides an alternative Either if the original is Left
 *
 * Returns the original Either if it's a Right, otherwise returns the
 * alternative Either. This is useful for providing fallback computations
 * or default values wrapped in Either. Unlike chainLeft, the alternative
 * can be a simple value that doesn't depend on the error.
 *
 * @pure
 * @curried
 * @param alternative - Either to use if the original is Left
 * @param either - The original Either
 * @returns The original if Right, otherwise the alternative
 * @example
 * ```typescript
 * // Basic fallback
 * const withFallback = orElse(right(0))
 * withFallback(right(42))      // Right(42)
 * withFallback(left("error"))  // Right(0)
 *
 * // Chaining alternatives
 * const primary = left("Primary failed")
 * const secondary = left("Secondary failed")
 * const tertiary = right(100)
 * pipe(
 *   primary,
 *   orElse(secondary),
 *   orElse(tertiary)
 * ) // Right(100)
 *
 * // Lazy alternative computation
 * const lazyFallback = () => right(expensiveComputation())
 * const withLazyFallback = orElse(lazyFallback)
 * withLazyFallback(right(5))   // Right(5)
 * withLazyFallback(left("err")) // Computes fallback
 *
 * // Configuration with multiple sources
 * const config = pipe(
 *   getFromEnv(),
 *   orElse(getFromFile()),
 *   orElse(defaultConfig)
 * )
 *
 * // First successful result wins
 * const tryMultipleSources = <T>(
 *   sources: Array<() => Either<string, T>>
 * ): Either<string, T> =>
 *   sources.reduce(
 *     (result, source) => orElse(source())(result),
 *     left("No sources provided")
 *   )
 *
 * // Different error types in alternatives
 * const parseAsNumber = (str: string): Either<string, number> => {
 *   const num = parseFloat(str)
 *   return isNaN(num) ? left("Not a number") : right(num)
 * }
 * const parseValue = (str: string) =>
 *   pipe(
 *     parseAsNumber(str),
 *     orElse(parseAsBoolean(str)),
 *     orElse(right(0))
 *   )
 * ```
 *
 */
const orElse = <E, F, A>(
	alternative: Either<F, A> | (() => Either<F, A>),
) =>
(
	either: Either<E, A>,
): Either<F, A> => {
	if (isRight(either)) {
		return either
	}

	return typeof alternative === "function" ? alternative() : alternative
}

export default orElse
