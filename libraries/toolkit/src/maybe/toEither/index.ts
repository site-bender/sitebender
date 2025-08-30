import type { Either } from "../../types/fp/either/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import isNothing from "../isNothing/index.ts"

/**
 * Converts a Maybe to an Either with a specified error value
 *
 * Transforms a Maybe into an Either by providing an error value for the
 * Nothing case. Just values become Right values (success), while Nothing
 * becomes a Left with the provided error. This enables transitioning from
 * optional value handling to explicit error handling, useful when you need
 * to provide specific error information for absent values.
 *
 * @curried
 * @param getError - Thunk that returns the error value if Nothing
 * @param maybe - The Maybe to convert
 * @returns Right if Just, Left with error if Nothing
 * @example
 * ```typescript
 * import { just, nothing } from "../index.ts"
 *
 * // Basic conversion
 * toEither(() => "No value")(just(42))    // Right(42)
 * toEither(() => "No value")(nothing())   // Left("No value")
 *
 * // With specific error messages
 * const requireValue = (field: string) =>
 *   toEither(() => `${field} is required`)
 *
 * requireValue("email")(just("user@example.com"))  // Right("user@example.com")
 * requireValue("email")(nothing())                 // Left("email is required")
 *
 * // Structured error objects
 * interface ValidationError {
 *   code: string
 *   message: string
 * }
 *
 * toEither<ValidationError>(() => ({
 *   code: "REQUIRED",
 *   message: "Value is required"
 * }))(nothing())
 * // Left({ code: "REQUIRED", message: "Value is required" })
 *
 * // Chaining with Either operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { chain as chainEither } from "../../either/chain/index.ts"
 *
 * const parseNumber = (input: Maybe<string>): Either<string, number> =>
 *   pipe(
 *     input,
 *     toEither(() => "Input is missing"),
 *     chainEither(str => {
 *       const num = parseInt(str, 10)
 *       return isNaN(num) ? left("Invalid number") : right(num)
 *     })
 *   )
 *
 * parseNumber(just("42"))   // Right(42)
 * parseNumber(nothing())     // Left("Input is missing")
 *
 * // Lazy error evaluation
 * const getError = () => {
 *   console.log("Error function called")
 *   return "Error occurred"
 * }
 *
 * toEither(getError)(just(5))   // Right(5), no console log
 * toEither(getError)(nothing()) // Left("Error occurred"), logs "Error function called"
 * ```
 *
 * @pure
 * @curried
 */
const toEither =
	<E>(getError: () => E) => <A>(maybe: Maybe<A>): Either<E, A> => {
		if (isNothing(maybe)) {
			return left(getError())
		}

		return right(maybe.value)
	}

export default toEither
