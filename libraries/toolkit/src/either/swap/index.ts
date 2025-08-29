import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

/**
 * Swaps the Left and Right values of an Either
 *
 * Exchanges the error and success positions, turning Left into Right
 * and Right into Left. This is useful when you need to flip the semantics
 * of an Either, treat errors as successes, or adapt between APIs with
 * different conventions for error handling.
 *
 * @pure
 * @idempotent
 * @param either - The Either to swap
 * @returns A new Either with Left and Right swapped
 * @example
 * ```typescript
 * // Basic swapping
 * swap(right(42))      // Left(42)
 * swap(left("error"))  // Right("error")
 *
 * // Double swap returns to original (idempotent)
 * pipe(
 *   right(100),
 *   swap,  // Left(100)
 *   swap   // Right(100)
 * )
 *
 * // Converting error-first to value-first convention
 * const errorFirst: Either<string, number> = right(42)
 * const valueFirst: Either<number, string> = swap(errorFirst)
 * // Left(42) - semantically the "success" case
 *
 * // Adapting between different error handling styles
 * const toResult = <E, A>(either: Either<E, A>) =>
 *   pipe(
 *     either,
 *     swap,
 *     fold(
 *       (data: A) => ({ type: "success", data }),
 *       (error: E) => ({ type: "failure", error })
 *     )
 *   )
 *
 * // Collecting errors instead of successes
 * const results = [right(1), left("error1"), right(2), left("error2")]
 * const errors = results
 *   .map(swap)
 *   .filter(isRight)
 *   .map(e => e.right)
 * // ["error1", "error2"]
 *
 * // Transform errors then swap back (equivalent to mapLeft)
 * const processInverted = <E, A, B>(
 *   fn: (e: E) => B
 * ) => (either: Either<E, A>): Either<B, A> =>
 *   pipe(either, swap, map(fn), swap)
 * processInverted((err: string) => err.length)(left("hello"))  // Left(5)
 * ```
 *
 */
const swap = <E, A>(either: Either<E, A>): Either<A, E> => {
	if (isLeft(either)) {
		return right(either.left)
	}

	return left(either.right)
}

export default swap
