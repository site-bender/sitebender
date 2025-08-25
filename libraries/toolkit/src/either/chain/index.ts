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
 * @curried (fn) => (either) => result
 * @param fn - Function that takes the Right value and returns an Either
 * @param either - The Either to chain from
 * @returns The Either returned by fn, or the original Left
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * // Basic chaining of fallible operations
 * const divide = (x: number) => (y: number): Either<string, number> =>
 *   y === 0 ? left("Division by zero") : right(x / y)
 *
 * const sqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot sqrt negative") : right(Math.sqrt(n))
 *
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
 * interface User {
 *   name: string
 *   age: number
 *   email: string
 * }
 *
 * const validateName = (user: User): Either<string, User> =>
 *   user.name.length > 0
 *     ? right(user)
 *     : left("Name cannot be empty")
 *
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
 * const validateUser = (user: User) =>
 *   pipe(
 *     right(user),
 *     chain(validateName),
 *     chain(validateAge),
 *     chain(validateEmail)
 *   )
 *
 * validateUser({ name: "Alice", age: 25, email: "alice@example.com" })
 * // Right({ name: "Alice", age: 25, email: "alice@example.com" })
 *
 * validateUser({ name: "", age: 25, email: "alice@example.com" })
 * // Left("Name cannot be empty")
 *
 * // Parsing and transformation pipeline
 * const parseJson = (str: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(str))
 *   } catch (e) {
 *     return left(`Invalid JSON: ${e}`)
 *   }
 * }
 *
 * const getProperty = (key: string) => (obj: any): Either<string, any> =>
 *   key in obj
 *     ? right(obj[key])
 *     : left(`Property '${key}' not found`)
 *
 * const parseNumber = (val: any): Either<string, number> => {
 *   const num = Number(val)
 *   return isNaN(num)
 *     ? left(`'${val}' is not a number`)
 *     : right(num)
 * }
 *
 * pipe(
 *   right('{"count": "42"}'),
 *   chain(parseJson),
 *   chain(getProperty("count")),
 *   chain(parseNumber)
 * )
 * // Right(42)
 *
 * // Database operations
 * const findUser = (id: number): Either<string, User> =>
 *   id === 1
 *     ? right({ name: "Alice", age: 30, email: "alice@example.com" })
 *     : left("User not found")
 *
 * const checkPermission = (user: User): Either<string, User> =>
 *   user.age >= 21
 *     ? right(user)
 *     : left("Insufficient permissions")
 *
 * const loadUserProfile = (userId: number) =>
 *   pipe(
 *     right(userId),
 *     chain(findUser),
 *     chain(checkPermission)
 *   )
 *
 * // Async operations (with promises)
 * const fetchData = async (url: string): Promise<Either<string, Response>> => {
 *   try {
 *     const response = await fetch(url)
 *     return response.ok
 *       ? right(response)
 *       : left(`HTTP ${response.status}`)
 *   } catch (e) {
 *     return left(`Network error: ${e}`)
 *   }
 * }
 *
 * const parseResponse = async (response: Response): Promise<Either<string, any>> => {
 *   try {
 *     const data = await response.json()
 *     return right(data)
 *   } catch (e) {
 *     return left(`Parse error: ${e}`)
 *   }
 * }
 *
 * // Note: For async, you'd need a chainAsync variant
 * const processUrl = async (url: string) => {
 *   const response = await fetchData(url)
 *   if (isLeft(response)) return response
 *   return parseResponse(response.right)
 * }
 *
 * // Conditional chaining
 * const processIfPositive = (n: number): Either<string, number> =>
 *   n > 0
 *     ? pipe(
 *         right(n),
 *         chain(sqrt),
 *         chain(x => right(Math.round(x)))
 *       )
 *     : left("Number must be positive")
 * ```
 *
 * @property Monad-law - Satisfies left identity, right identity, and associativity
 * @property Short-circuits - Stops at first Left encountered
 * @property Flattens - Prevents Either<E, Either<E, A>> nesting
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
