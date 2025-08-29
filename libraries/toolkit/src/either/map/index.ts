import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import right from "../right/index.ts"

/**
 * Maps a function over the Right value of an Either
 *
 * Applies a transformation function to the success value inside a Right,
 * leaving Left values unchanged. This is the fundamental operation for
 * transforming successful computations while propagating errors. The map
 * operation short-circuits on Left values, making it safe to chain multiple
 * transformations without explicit error checking.
 *
 * @pure
 * @curried
 * @param fn - Function to transform the Right value
 * @param either - The Either to map over
 * @returns A new Either with the transformed Right value or unchanged Left
 * @example
 * ```typescript
 * // Basic transformation of Right values
 * const double = (x: number) => x * 2
 * map(double)(right(5))      // Right(10)
 * map(double)(left("error")) // Left("error")
 *
 * // Chaining transformations
 * const addOne = (x: number) => x + 1
 * const toString = (x: number) => x.toString()
 * pipe(
 *   right(5),
 *   map(double),    // Right(10)
 *   map(addOne),    // Right(11)
 *   map(toString)   // Right("11")
 * )
 *
 * // Short-circuits on Left
 * pipe(
 *   left("error"),
 *   map(double),    // Left("error")
 *   map(addOne),    // Left("error")
 *   map(toString)   // Left("error")
 * )
 *
 * // Working with objects
 * const getName = (u: User) => u.name
 * const toUpper = (s: string) => s.toUpperCase()
 * pipe(
 *   right({ id: 1, name: "Alice", age: 30 }),
 *   map(getName),  // Right("Alice")
 *   map(toUpper)   // Right("ALICE")
 * )
 *
 * // Building computation pipelines
 * const calculate = (input: Either<string, number>) =>
 *   pipe(
 *     input,
 *     map(x => x + 10),
 *     map(x => x * 2),
 *     map(x => x / 4)
 *   )
 * calculate(right(5))    // Right(7.5)
 * calculate(left("NaN")) // Left("NaN")
 * ```
 *
 */
const map = <A, B>(fn: (a: A) => B) =>
<E>(
	either: Either<E, A>,
): Either<E, B> => {
	if (isLeft(either)) {
		return either
	}

	return right(fn(either.right))
}

export default map
