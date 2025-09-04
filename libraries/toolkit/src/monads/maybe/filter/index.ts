import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import nothing from "../nothing/index.ts"

/**
 * Converts a Just to Nothing if its value doesn't satisfy a predicate
 *
 * Filters the value inside a Maybe based on a predicate function. If the
 * Maybe is Just and the predicate returns true, the Just is preserved.
 * If the predicate returns false, the Just becomes Nothing. Nothing values
 * always remain Nothing. This enables conditional propagation of values
 * through a computation chain.
 *
 * @param predicate - Function to test the Just value
 * @param maybe - The Maybe to filter
 * @returns The original Just if predicate passes, otherwise Nothing
 * @pure
 * @curried
 * @example
 * ```typescript
 * import just from "../just/index.ts"
 * import nothing from "../nothing/index.ts"
 * import pipe from "../../simple/combinator/pipe/index.ts"
 *
 * // Basic filtering
 * const isPositive = (n: number) => n > 0
 *
 * filter(isPositive)(just(5))    // Just(5)
 * filter(isPositive)(just(-3))   // Nothing
 * filter(isPositive)(nothing())  // Nothing
 *
 * // Chaining filters for multiple conditions
 * const isEven = (n: number) => n % 2 === 0
 * const isLessThan100 = (n: number) => n < 100
 *
 * pipe(
 *   just(42),
 *   filter(isPositive),     // Just(42)
 *   filter(isEven),         // Just(42)
 *   filter(isLessThan100)   // Just(42)
 * )
 *
 * // String validation
 * const isNonEmpty = (s: string) => s.length > 0
 * const isEmail = (s: string) => s.includes("@")
 *
 * const validateEmail = (email: Maybe<string>): Maybe<string> =>
 *   pipe(
 *     email,
 *     filter(isNonEmpty),
 *     filter(isEmail)
 *   )
 *
 * validateEmail(just("user@example.com"))  // Just("user@example.com")
 * validateEmail(just("invalid"))           // Nothing
 *
 * // Partial application for reusable filters
 * const filterPositive = filter((n: number) => n > 0)
 * const filterEven = filter((n: number) => n % 2 === 0)
 *
 * filterPositive(just(5))   // Just(5)
 * filterPositive(just(-5))  // Nothing
 * filterEven(just(4))       // Just(4)
 * filterEven(just(3))       // Nothing
 *
 * // Range validation
 * const inRange = (min: number, max: number) => (n: number) =>
 *   n >= min && n <= max
 *
 * const validateAge = filter(inRange(18, 65))
 *
 * validateAge(just(25))  // Just(25)
 * validateAge(just(70))  // Nothing
 * validateAge(just(10))  // Nothing
 * ```
 */
const filter =
	<A>(predicate: (a: A) => boolean) => (maybe: Maybe<A>): Maybe<A> => {
		if (isNothing(maybe)) {
			return maybe
		}

		return predicate(maybe.value) ? maybe : nothing()
	}

export default filter
