import type { Either, Left } from "../../types/fp/either/index.ts"

/**
 * Creates a Left value representing the error/failure case in an Either
 *
 * The Left constructor is used to represent error cases or failure paths
 * in functional error handling. When a Left is created, subsequent map
 * and chain operations will be skipped, effectively short-circuiting
 * the computation chain. This allows for railway-oriented programming
 * where errors bypass the success track.
 *
 * @pure
 * @param value - The error value to wrap in a Left
 * @returns A Left containing the error value
 * @example
 * ```typescript
 * // Basic error creation
 * const error = left("User not found")
 * // { _tag: "Left", left: "User not found" }
 *
 * // Structured error objects
 * const validationError = left({
 *   field: "email",
 *   message: "Invalid format"
 * })
 *
 * // Type-safe error handling
 * const divide = (a: number) => (b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 * divide(10)(0)  // Left("Division by zero")
 * divide(10)(2)  // Right(5)
 *
 * // Using with pipe for validation chains
 * const validateAge = (age: number): Either<string, number> =>
 *   age < 0 ? left("Age cannot be negative") :
 *   age > 150 ? left("Age seems unrealistic") :
 *   right(age)
 *
 * const validateEven = (n: number): Either<string, number> =>
 *   n % 2 !== 0 ? left("Number must be even") : right(n)
 *
 * pipe(
 *   right(24),
 *   chain(validateAge),
 *   chain(validateEven)
 * ) // Right(24)
 *
 * // Partial application for specific error types
 * const validationFail = (field: string) => (message: string) =>
 *   left({ field, message })
 * validationFail("email")("Invalid format")
 * // Left({ field: "email", message: "Invalid format" })
 * ```
 */
const left = <E, A = never>(value: E): Either<E, A> => ({
	_tag: "Left" as const,
	left: value,
} as Left<E>)

export default left
