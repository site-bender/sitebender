import type { Either } from "../../../types/fp/either/index.ts"
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
 * @curried (leftFn) => (rightFn) => (either) => result
 * @param leftFn - Function to transform Left values
 * @param rightFn - Function to transform Right values
 * @param either - The Either to transform
 * @returns A new Either with both sides potentially transformed
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic transformation of both sides
 * const transform = bimap(
 *   (err: string) => err.toUpperCase(),
 *   (val: number) => val * 2
 * )
 * 
 * transform(right(5))        // Right(10)
 * transform(left("error"))   // Left("ERROR")
 * 
 * // Type conversion on both sides
 * const convert = bimap(
 *   (err: Error) => err.message,
 *   (val: string) => parseInt(val, 10)
 * )
 * 
 * convert(right("42"))                    // Right(42)
 * convert(left(new Error("Failed")))      // Left("Failed")
 * 
 * // Normalization pipeline
 * interface RawData {
 *   value: string
 *   timestamp: string
 * }
 * 
 * interface ProcessedData {
 *   value: number
 *   date: Date
 * }
 * 
 * const normalizeResult = bimap(
 *   (err: string) => ({ 
 *     error: err, 
 *     code: "PROCESSING_ERROR" 
 *   }),
 *   (data: RawData): ProcessedData => ({
 *     value: parseFloat(data.value),
 *     date: new Date(data.timestamp)
 *   })
 * )
 * 
 * normalizeResult(right({ 
 *   value: "123.45", 
 *   timestamp: "2023-01-01" 
 * }))
 * // Right({ value: 123.45, date: Date(...) })
 * 
 * // Serialization/deserialization
 * const serialize = bimap(
 *   (err: Error) => JSON.stringify({ error: err.message }),
 *   (data: object) => JSON.stringify(data)
 * )
 * 
 * const deserialize = bimap(
 *   (err: string) => JSON.parse(err),
 *   (data: string) => JSON.parse(data)
 * )
 * 
 * // HTTP response transformation
 * interface ApiError {
 *   code: string
 *   message: string
 * }
 * 
 * interface ApiResponse<T> {
 *   data: T
 *   meta: { timestamp: number }
 * }
 * 
 * const formatResponse = <T>(either: Either<string, T>) =>
 *   bimap(
 *     (err: string): ApiError => ({
 *       code: "API_ERROR",
 *       message: err
 *     }),
 *     (data: T): ApiResponse<T> => ({
 *       data,
 *       meta: { timestamp: Date.now() }
 *     })
 *   )(either)
 * 
 * formatResponse(right({ id: 1, name: "Item" }))
 * // Right({ data: { id: 1, name: "Item" }, meta: { timestamp: ... } })
 * 
 * formatResponse(left("Not found"))
 * // Left({ code: "API_ERROR", message: "Not found" })
 * 
 * // Logging with transformation
 * const logAndTransform = bimap(
 *   (err: string) => {
 *     console.error("Error:", err)
 *     return `[ERROR] ${err}`
 *   },
 *   (val: number) => {
 *     console.log("Success:", val)
 *     return val * 100
 *   }
 * )
 * 
 * // Currency conversion
 * const convertCurrency = (rate: number) => bimap(
 *   (err: string) => `Currency error: ${err}`,
 *   (amount: number) => amount * rate
 * )
 * 
 * const toEuros = convertCurrency(0.85)
 * toEuros(right(100))  // Right(85) - $100 to €85
 * toEuros(left("Invalid amount"))  // Left("Currency error: Invalid amount")
 * 
 * // Validation with error accumulation
 * type ValidationErrors = Array<string>
 * 
 * const addValidationContext = bimap(
 *   (errors: ValidationErrors) => ({
 *     errors,
 *     timestamp: new Date(),
 *     severity: "validation_failed"
 *   }),
 *   (data: unknown) => ({
 *     validated: true,
 *     data
 *   })
 * )
 * 
 * // Chaining bimap operations
 * const pipeline = pipe(
 *   someEither,
 *   bimap(
 *     e => e.toLowerCase(),
 *     v => v * 2
 *   ),
 *   bimap(
 *     e => `error: ${e}`,
 *     v => v + 10
 *   ),
 *   bimap(
 *     e => ({ message: e }),
 *     v => ({ result: v })
 *   )
 * )
 * 
 * // Partial application for reusable transformers
 * const errorToMessage = bimap(
 *   (err: Error) => err.message,
 *   (val: unknown) => val  // identity for Right
 * )
 * 
 * const doubleSuccess = bimap(
 *   (err: unknown) => err,  // identity for Left
 *   (val: number) => val * 2
 * )
 * ```
 * 
 * @property Bifunctor-law - Satisfies identity and composition laws
 * @property Simultaneous - Transforms both sides in one operation
 * @property Type-flexible - Can change both error and success types
 */
const bimap = <E, F, A, B>(
	leftFn: (e: E) => F
) => (
	rightFn: (a: A) => B
) => (
	either: Either<E, A>
): Either<F, B> => {
	if (isLeft(either)) {
		return left(leftFn(either.left))
	}
	
	return right(rightFn(either.right))
}

export default bimap