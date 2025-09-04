import type { Maybe } from "../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

/**
 * Flat maps a function over the value inside a Just (monadic bind)
 *
 * Applies a function that returns a Maybe to the value inside a Just,
 * flattening the result to avoid nested Maybe values. This is the monadic
 * bind operation (also known as flatMap) that enables sequential composition
 * of operations that might fail. Essential for chaining computations where
 * each step might produce Nothing.
 *
 * @param fn - Function that takes a value and returns a Maybe
 * @param maybe - The Maybe to chain over
 * @returns The flattened result of applying fn, or Nothing
 * @pure
 * @curried
 * @example
 * ```typescript
 * import just from "../just/index.ts"
 * import nothing from "../nothing/index.ts"
 * import pipe from "../../simple/combinator/pipe/index.ts"
 *
 * // Basic chaining with potential failure
 * const safeDivide = (x: number) => (y: number): Maybe<number> =>
 *   y === 0 ? nothing() : just(x / y)
 *
 * chain(safeDivide(10))(just(2))   // Just(5)
 * chain(safeDivide(10))(just(0))   // Nothing
 * chain(safeDivide(10))(nothing()) // Nothing
 *
 * // Sequential validations
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * const validatePositive = (n: number): Maybe<number> =>
 *   n > 0 ? just(n) : nothing()
 *
 * pipe(
 *   just("24"),
 *   chain(parseInteger),      // Just(24)
 *   chain(validatePositive)   // Just(24)
 * )
 *
 * // Avoiding nested Maybe values
 * const findUser = (id: number): Maybe<User> =>
 *   id === 1 ? just({ id: 1, name: "Alice", age: 30 }) : nothing()
 *
 * const getUserAge = (user: User): Maybe<number> =>
 *   user.age !== undefined ? just(user.age) : nothing()
 *
 * chain(getUserAge)(findUser(1))  // Just(30) - flattened!
 * chain(getUserAge)(findUser(2))  // Nothing
 *
 * // Computation with multiple steps
 * const sqrt = (n: number): Maybe<number> =>
 *   n >= 0 ? just(Math.sqrt(n)) : nothing()
 *
 * const reciprocal = (n: number): Maybe<number> =>
 *   n !== 0 ? just(1 / n) : nothing()
 *
 * const compute = (x: number): Maybe<number> =>
 *   pipe(
 *     just(x),
 *     chain(n => just(n - 4)),     // Subtract 4
 *     chain(sqrt),                  // Take square root
 *     chain(reciprocal)             // Take reciprocal
 *   )
 *
 * compute(8)   // Just(0.5)
 * compute(4)   // Nothing
 * compute(2)   // Nothing
 * ```
 */
const chain = <A, B>(fn: (a: A) => Maybe<B>) => (maybe: Maybe<A>): Maybe<B> => {
	if (isNothing(maybe)) {
		return maybe
	}

	return fn(maybe.value)
}

export default chain
