import type { Either } from "../../types/fp/either/index.ts"

import fold from "../fold/index.ts"

/**
 * Pattern matches on an Either value with named handlers
 *
 * Provides a semantic alias for fold with clearer parameter names.
 * This function extracts a value from an Either by providing separate
 * handlers for Left and Right cases. It's particularly useful when you
 * want to emphasize the pattern matching aspect of the operation rather
 * than the folding/reduction aspect.
 *
 * @pure
 * @curried
 * @param leftHandler - Function to handle Left (error) values
 * @param rightHandler - Function to handle Right (success) values
 * @param either - The Either to pattern match on
 * @returns The result of applying the appropriate handler
 * @example
 * ```typescript
 * // Basic pattern matching
 * const result = either(
 *   (err: string) => `Failed: ${err}`,
 *   (val: number) => `Succeeded: ${val}`
 * )
 * result(right(42))     // "Succeeded: 42"
 * result(left("oops"))  // "Failed: oops"
 *
 * // Converting to a common type
 * const toNumber = either(
 *   (err: string) => err.length,
 *   (val: number) => val
 * )
 * toNumber(right(42))      // 42
 * toNumber(left("error"))  // 5
 *
 * // Result type transformation
 * const toResult = either(
 *   (err: string) => ({ type: "error", message: err }),
 *   (val: number) => ({ type: "success", value: val })
 * )
 * toResult(right(100))     // { type: "success", value: 100 }
 * toResult(left("Not found"))  // { type: "error", message: "Not found" }
 *
 * // Promise creation from Either
 * const toPromise = <E, A>(e: Either<E, A>): Promise<A> =>
 *   either(
 *     (err: E) => Promise.reject(err),
 *     (val: A) => Promise.resolve(val)
 *   )(e)
 *
 * // Converting to nullable
 * const toNullable = <E, A>(e: Either<E, A>): A | null =>
 *   either(
 *     () => null,
 *     (a: A) => a
 *   )(e)
 * toNullable(right(42))     // 42
 * toNullable(left("error")) // null
 * ```
 */
const either = <E, A, B>(
	leftHandler: (e: E) => B,
) =>
(
	rightHandler: (a: A) => B,
) =>
(
	either: Either<E, A>,
): B => fold<E, A, B>(leftHandler)(rightHandler)(either)

export default either
