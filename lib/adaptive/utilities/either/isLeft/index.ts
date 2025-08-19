import type { Either, Left } from "../../../types/fp/either/index.ts"

/**
 * Type guard that checks if an Either is a Left value
 * 
 * Tests whether an Either contains an error (Left) value. This is useful
 * for conditional logic where different paths are needed based on success
 * or failure. As a type guard, it also narrows the TypeScript type in the
 * true branch, allowing safe access to the left property.
 * 
 * @param either - The Either value to check
 * @returns True if the Either is a Left, false if it's a Right
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * 
 * // Basic type checking
 * isLeft(left("error"))   // true
 * isLeft(right(42))       // false
 * 
 * // Type narrowing in conditionals
 * const result: Either<string, number> = left("Something went wrong")
 * 
 * if (isLeft(result)) {
 *   // TypeScript knows result is Left<string> here
 *   console.error("Error:", result.left)
 * } else {
 *   // TypeScript knows result is Right<number> here
 *   console.log("Success:", result.right)
 * }
 * 
 * // Using with filter to separate errors from successes
 * const results: Array<Either<string, number>> = [
 *   right(10),
 *   left("error 1"),
 *   right(20),
 *   left("error 2"),
 *   right(30)
 * ]
 * 
 * const errors = results.filter(isLeft)
 * // [Left("error 1"), Left("error 2")]
 * 
 * const successes = results.filter(r => !isLeft(r))
 * // [Right(10), Right(20), Right(30)]
 * 
 * // Early return pattern
 * const processValue = (either: Either<string, number>): string => {
 *   if (isLeft(either)) {
 *     return `Failed: ${either.left}`
 *   }
 *   
 *   // TypeScript knows either is Right<number> here
 *   return `Success: ${either.right * 2}`
 * }
 * 
 * processValue(left("oops"))  // "Failed: oops"
 * processValue(right(5))      // "Success: 10"
 * 
 * // Counting errors in a batch operation
 * const batchResults: Array<Either<Error, string>> = [
 *   right("success1"),
 *   left(new Error("failed1")),
 *   right("success2"),
 *   left(new Error("failed2"))
 * ]
 * 
 * const errorCount = batchResults.filter(isLeft).length
 * // 2
 * 
 * // Validation pipeline with early exit
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * const validatePipeline = <T>(value: Either<string, T>): string => {
 *   if (isLeft(value)) {
 *     return `Validation failed at step 1: ${value.left}`
 *   }
 *   
 *   // Continue with more validations...
 *   return "All validations passed"
 * }
 * 
 * // Combining with other predicates
 * const hasError = (results: Array<Either<string, unknown>>): boolean =>
 *   results.some(isLeft)
 * 
 * const allSuccessful = (results: Array<Either<string, unknown>>): boolean =>
 *   !results.some(isLeft)
 * 
 * hasError([right(1), right(2)])          // false
 * hasError([right(1), left("err")])       // true
 * allSuccessful([right(1), right(2)])     // true
 * allSuccessful([right(1), left("err")])  // false
 * ```
 * 
 * @property Type-guard - Narrows TypeScript types in conditional branches
 * @property Pure - No side effects, just checks the tag
 * @property Composable - Works well with array methods and other predicates
 */
const isLeft = <E, A>(either: Either<E, A>): either is Left<E> =>
	either._tag === "Left"

export default isLeft