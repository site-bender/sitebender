import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

/**
 * Maps functions over both Left and Right values of an Either
 *
 * Applies one function to transform Left values and another to transform
 * Right values. This is the bifunctor map operation for Either, allowing
 * transformation of both the error and success types in a single operation.
 * It combines the functionality of map and mapLeft into one function.
 *
 * @param leftFn - Function to transform Left values
 * @param rightFn - Function to transform Right values
 * @param either - The Either to transform
 * @returns A new Either with both sides potentially transformed
 * @example
 * ```typescript
 * // Basic transformation of both sides
 * const transform = bimap(
 *   (err: string) => err.toUpperCase()
 * )(
 *   (val: number) => val * 2
 * )
 *
 * transform(right(5))        // Right(10)
 * transform(left("error"))   // Left("ERROR")
 *
 * // Type conversion on both sides
 * const convert = bimap(
 *   (err: Error) => err.message
 * )(
 *   (val: string) => parseInt(val, 10)
 * )
 *
 * convert(right("42"))                 // Right(42)
 * convert(left(new Error("Failed")))   // Left("Failed")
 *
 * // Currency conversion
 * const convertCurrency = (rate: number) => bimap(
 *   (err: string) => `Currency error: ${err}`
 * )(
 *   (amount: number) => amount * rate
 * )
 *
 * const toEuros = convertCurrency(0.85)
 * toEuros(right(100))               // Right(85)
 * toEuros(left("Invalid amount"))   // Left("Currency error: Invalid amount")
 *
 * // Chaining bimap operations
 * import pipe from "../../simple/combinator/pipe"
 * pipe(
 *   someEither,
 *   bimap(e => e.toLowerCase())(v => v * 2),
 *   bimap(e => `error: ${e}`)(v => v + 10)
 * )
 * ```
 *
 * @pure
 * @curried
 */
const bimap = <E, F, A, B>(
	leftFn: (e: E) => F,
) =>
(
	rightFn: (a: A) => B,
) =>
(
	either: Either<E, A>,
): Either<F, B> => {
	if (isLeft(either)) {
		return left(leftFn(either.left))
	}

	return right(rightFn(either.right))
}

export default bimap
