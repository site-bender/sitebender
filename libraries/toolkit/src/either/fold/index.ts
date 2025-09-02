import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

/**
 * Extracts a value from an Either by providing handlers for both cases
 *
 * Fold is the fundamental pattern matching operation for Either values.
 * It takes two functions - one to handle the Left case (error) and one
 * to handle the Right case (success) - and applies the appropriate function
 * based on the Either's value. This is the primary way to extract values
 * from the Either context and handle both success and failure cases.
 *
 * @param onLeft - Function to handle Left values
 * @param onRight - Function to handle Right values
 * @param either - The Either to extract from
 * @returns The result of applying the appropriate handler
 * @example
 * ```typescript
 * // Basic extraction
 * const errorHandler = (err: string) => `Error: ${err}`
 * const successHandler = (val: number) => `Success: ${val}`
 *
 * fold(errorHandler)(successHandler)(right(42))     // "Success: 42"
 * fold(errorHandler)(successHandler)(left("oops"))  // "Error: oops"
 *
 * // Converting to a default value
 * const getOrDefault = fold(
 *   () => 0
 * )(
 *   (x: number) => x
 * )
 *
 * getOrDefault(right(42))    // 42
 * getOrDefault(left("err"))  // 0
 *
 * // Converting Either to boolean
 * const isValid = fold(() => false)(() => true)
 * isValid(right("anything"))  // true
 * isValid(left("error"))      // false
 *
 * // HTTP response handling
 * const toHttpResponse = <E, A>(either: Either<E, A>) =>
 *   fold(
 *     (error: E) => ({ status: 400, body: { error: String(error) } })
 *   )(
 *     (data: A) => ({ status: 200, body: data })
 *   )(either)
 *
 * toHttpResponse(right({ id: 1 }))  // { status: 200, body: { id: 1 } }
 * toHttpResponse(left("Invalid"))   // { status: 400, body: { error: "Invalid" } }
 * ```
 *
 * @pure
 * @curried
 */
const fold = <E, A, B>(
	onLeft: (e: E) => B,
) =>
(
	onRight: (a: A) => B,
) =>
(
	either: Either<E, A>,
): B => {
	if (isLeft(either)) {
		return onLeft(either.left)
	}

	return onRight(either.right)
}

export default fold
