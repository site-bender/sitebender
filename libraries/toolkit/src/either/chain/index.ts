import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

/**
 * Chains Either-returning functions, flattening the result
 *
 * Also known as flatMap or bind, chain allows sequencing of operations
 * that might fail. It applies a function that returns an Either to the
 * Right value of an Either, flattening the result to avoid nested Either
 * values. This is essential for composing fallible operations where each
 * step depends on the success of the previous one.
 *
 * @param fn - Function that takes the Right value and returns an Either
 * @param either - The Either to chain from
 * @returns The Either returned by fn, or the original Left
 * @example
 * ```typescript
 * // Basic chaining of fallible operations
 * const divide = (x: number) => (y: number): Either<string, number> =>
 *   y === 0 ? left("Division by zero") : right(x / y)
 *
 * const sqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot sqrt negative") : right(Math.sqrt(n))
 *
 * import { pipe } from "../../simple/combinator/pipe"
 * pipe(
 *   right(16),
 *   chain(sqrt),       // Right(4)
 *   chain(divide(12))  // Right(3)
 * )
 *
 * // Short-circuits on first error
 * pipe(
 *   right(-16),
 *   chain(sqrt),       // Left("Cannot sqrt negative")
 *   chain(divide(12))  // Not executed
 * )
 *
 * // Validation pipeline
 * const validateAge = (user: User): Either<string, User> =>
 *   user.age >= 18 && user.age <= 120
 *     ? right(user)
 *     : left("Age must be between 18 and 120")
 *
 * const validateEmail = (user: User): Either<string, User> =>
 *   user.email.includes("@")
 *     ? right(user)
 *     : left("Invalid email format")
 *
 * pipe(
 *   right(user),
 *   chain(validateAge),
 *   chain(validateEmail)
 * )  // Right(user) if valid, Left(error) if not
 * ```
 *
 * @pure
 * @curried
 */
const chain = <E, A, B>(
	fn: (a: A) => Either<E, B>,
) =>
(
	either: Either<E, A>,
): Either<E, B> => {
	if (isLeft(either)) {
		return either
	}

	return fn(either.right)
}

export default chain
