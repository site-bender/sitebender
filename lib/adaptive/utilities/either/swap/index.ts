import type { Either } from "../../../types/fp/either/index.ts"
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
 * @param either - The Either to swap
 * @returns A new Either with Left and Right swapped
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic swapping
 * swap(right(42))      // Left(42)
 * swap(left("error"))  // Right("error")
 * 
 * // Double swap returns to original
 * pipe(
 *   right(100),
 *   swap,      // Left(100)
 *   swap       // Right(100)
 * )
 * 
 * // Converting error-first to value-first convention
 * type ErrorFirst<E, A> = Either<E, A>
 * type ValueFirst<A, E> = Either<A, E>
 * 
 * const errorFirst: ErrorFirst<string, number> = right(42)
 * const valueFirst: ValueFirst<number, string> = swap(errorFirst)
 * // Left(42) - but semantically this is the "success" case
 * 
 * // Treating errors as valid results
 * const divideWithRemainder = (a: number, b: number): Either<number, number> =>
 *   b === 0 
 *     ? left(a)  // Return dividend as "error"
 *     : right(Math.floor(a / b))
 * 
 * const getRemainder = (a: number, b: number) =>
 *   pipe(
 *     divideWithRemainder(a, b),
 *     swap  // Now remainder is in Right position
 *   )
 * 
 * getRemainder(10, 3)  // Right(10) - the remainder
 * getRemainder(10, 0)  // Left(3) - the quotient
 * 
 * // Adapting between different error handling styles
 * interface Success<T> {
 *   type: "success"
 *   data: T
 * }
 * 
 * interface Failure<E> {
 *   type: "failure"
 *   error: E
 * }
 * 
 * const toResult = <E, A>(either: Either<E, A>): Success<A> | Failure<E> =>
 *   pipe(
 *     either,
 *     swap,
 *     fold(
 *       (data: A) => ({ type: "success", data }),
 *       (error: E) => ({ type: "failure", error })
 *     )
 *   )
 * 
 * // Filtering with inverted logic
 * const rejectValid = <E, A>(
 *   validate: (a: A) => Either<E, A>
 * ) => (value: A): Either<A, E> =>
 *   pipe(
 *     validate(value),
 *     swap  // Invalid values become Right
 *   )
 * 
 * // Working with APIs that use opposite conventions
 * const apiCall = (): Either<Data, Error> => {
 *   // Some API returns success in Left position
 *   return left({ id: 1, name: "Item" })
 * }
 * 
 * const normalizedCall = (): Either<Error, Data> =>
 *   swap(apiCall())
 * // Now success is in the Right position as expected
 * 
 * // Collecting errors instead of successes
 * const results: Array<Either<string, number>> = [
 *   right(1),
 *   left("error1"),
 *   right(2),
 *   left("error2"),
 *   right(3)
 * ]
 * 
 * const errors = results
 *   .map(swap)
 *   .filter(isRight)
 *   .map(e => e.right)
 * // ["error1", "error2"]
 * 
 * // Conditional swapping based on logic
 * const maybeSwap = (condition: boolean) => <E, A>(
 *   either: Either<E, A>
 * ): Either<E, A> | Either<A, E> =>
 *   condition ? swap(either) : either
 * 
 * // Transform for specific operations then swap back
 * const processInverted = <E, A, B>(
 *   fn: (e: E) => B
 * ) => (either: Either<E, A>): Either<B, A> =>
 *   pipe(
 *     either,
 *     swap,           // Either<A, E>
 *     map(fn),        // Either<A, B>
 *     swap            // Either<B, A>
 *   )
 * 
 * // This is equivalent to mapLeft!
 * processInverted((err: string) => err.length)(left("hello"))
 * // Left(5)
 * 
 * // Partition results by swapping and filtering
 * const partition = <E, A>(
 *   eithers: Array<Either<E, A>>
 * ): [Array<E>, Array<A>] => {
 *   const lefts = eithers
 *     .filter(isLeft)
 *     .map(e => e.left)
 *   
 *   const rights = eithers
 *     .map(swap)
 *     .filter(isLeft)
 *     .map(e => e.left)
 *   
 *   return [lefts, rights]
 * }
 * ```
 * 
 * @property Involution - swap(swap(x)) === x
 * @property Type-swap - Either<E, A> becomes Either<A, E>
 * @property Pure - No side effects, creates new Either
 */
const swap = <E, A>(either: Either<E, A>): Either<A, E> => {
	if (isLeft(either)) {
		return right(either.left)
	}
	
	return left(either.right)
}

export default swap