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
 * import { just } from "../just/index.ts"
 * import { nothing } from "../nothing/index.ts"
 *
 * // Basic conversion
 * toEither(() => "No value")(just(42))    // Right(42)
 * toEither(() => "No value")(nothing())   // Left("No value")
 *
 * // With specific error messages
 * const requireValue = (field: string) =>
 *   toEither(() => `${field} is required`)
 *
 * requireValue("email")(just("user@example.com"))
 * // Right("user@example.com")
 *
 * requireValue("email")(nothing())
 * // Left("email is required")
 *
 * // Structured error objects
 * interface ValidationError {
 *   code: string
 *   message: string
 *   field?: string
 * }
 *
 * const toValidationEither = (field: string) =>
 *   toEither<ValidationError>(() => ({
 *     code: "REQUIRED_FIELD",
 *     message: `The field '${field}' is required`,
 *     field
 *   }))
 *
 * toValidationEither("username")(just("alice"))
 * // Right("alice")
 *
 * toValidationEither("username")(nothing())
 * // Left({ code: "REQUIRED_FIELD", message: "The field 'username' is required", field: "username" })
 *
 * // Chaining with Either operations
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map as mapEither } from "../../either/map/index.ts"
 * import { chain as chainEither } from "../../either/chain/index.ts"
 *
 * const parseAndValidate = (input: Maybe<string>): Either<string, number> =>
 *   pipe(
 *     input,
 *     toEither(() => "Input is missing"),
 *     chainEither(str => {
 *       const num = parseInt(str, 10)
 *       return isNaN(num)
 *         ? left("Invalid number format")
 *         : right(num)
 *     }),
 *     chainEither(num =>
 *       num > 0
 *         ? right(num)
 *         : left("Number must be positive")
 *     )
 *   )
 *
 * parseAndValidate(just("42"))    // Right(42)
 * parseAndValidate(just("-5"))    // Left("Number must be positive")
 * parseAndValidate(just("abc"))   // Left("Invalid number format")
 * parseAndValidate(nothing())     // Left("Input is missing")
 *
 * // Form validation pipeline
 * interface FormData {
 *   username?: string
 *   email?: string
 *   age?: string
 * }
 *
 * const validateForm = (data: FormData): Either<string, ValidatedForm> =>
 *   pipe(
 *     fromNullable(data.username),
 *     toEither(() => "Username is required"),
 *     chainEither(username =>
 *       pipe(
 *         fromNullable(data.email),
 *         toEither(() => "Email is required"),
 *         mapEither(email => ({ username, email }))
 *       )
 *     ),
 *     chainEither(partial =>
 *       pipe(
 *         fromNullable(data.age),
 *         toEither(() => "Age is required"),
 *         chainEither(ageStr => {
 *           const age = parseInt(ageStr, 10)
 *           return isNaN(age)
 *             ? left("Age must be a number")
 *             : right({ ...partial, age })
 *         })
 *       )
 *     )
 *   )
 *
 * // Partial application for common error types
 * const missingField = (name: string) =>
 *   toEither(() => new Error(`Missing field: ${name}`))
 *
 * const unauthorized = toEither(() => ({
 *   status: 401,
 *   message: "Unauthorized access"
 * }))
 *
 * const notFound = toEither(() => ({
 *   status: 404,
 *   message: "Resource not found"
 * }))
 *
 * // Database operation results
 * const findUser = (id: number): Maybe<User> =>
 *   id === 1 ? just({ id: 1, name: "Alice" }) : nothing()
 *
 * const getUserOrError = (id: number): Either<Error, User> =>
 *   pipe(
 *     findUser(id),
 *     toEither(() => new Error(`User with id ${id} not found`))
 *   )
 *
 * getUserOrError(1)  // Right({ id: 1, name: "Alice" })
 * getUserOrError(2)  // Left(Error: User with id 2 not found)
 *
 * // API response handling
 * interface ApiError {
 *   statusCode: number
 *   message: string
 *   timestamp: Date
 * }
 *
 * const handleApiResponse = <T>(
 *   response: Maybe<T>,
 *   endpoint: string
 * ): Either<ApiError, T> =>
 *   toEither<ApiError>(() => ({
 *     statusCode: 404,
 *     message: `No data received from ${endpoint}`,
 *     timestamp: new Date()
 *   }))(response)
 *
 * // Lazy error evaluation
 * let errorCount = 0
 *
 * const trackingError = () => {
 *   errorCount++
 *   return `Error #${errorCount}`
 * }
 *
 * toEither(trackingError)(just(5))   // Right(5), errorCount stays 0
 * toEither(trackingError)(nothing()) // Left("Error #1"), errorCount is 1
 * toEither(trackingError)(nothing()) // Left("Error #2"), errorCount is 2
 *
 * // Converting Maybe chains to Either chains
 * import { map as mapMaybe } from "../map/index.ts"
 * import { chain as chainMaybe } from "../chain/index.ts"
 *
 * const maybeComputation = pipe(
 *   just(10),
 *   mapMaybe(x => x * 2),
 *   chainMaybe(x => x > 30 ? nothing() : just(x))
 * )
 *
 * const eitherComputation = toEither(
 *   () => "Computation failed: value exceeded limit"
 * )(maybeComputation)
 * // Right(20)
 *
 * // Environment configuration
 * const getConfig = (): Either<string, Config> => {
 *   const apiUrl = fromNullable(process.env.API_URL)
 *   const apiKey = fromNullable(process.env.API_KEY)
 *
 *   return pipe(
 *     apiUrl,
 *     toEither(() => "API_URL environment variable not set"),
 *     chainEither(url =>
 *       pipe(
 *         apiKey,
 *         toEither(() => "API_KEY environment variable not set"),
 *         mapEither(key => ({ apiUrl: url, apiKey: key }))
 *       )
 *     )
 *   )
 * }
 *
 * // Type-safe error handling
 * type Result<E, A> = Either<E, A>
 *
 * const requireAuth = (
 *   maybeToken: Maybe<string>
 * ): Result<"UNAUTHENTICATED", string> =>
 *   toEither(() => "UNAUTHENTICATED" as const)(maybeToken)
 *
 * const requirePermission = (
 *   maybePermission: Maybe<Permission>
 * ): Result<"UNAUTHORIZED", Permission> =>
 *   toEither(() => "UNAUTHORIZED" as const)(maybePermission)
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
