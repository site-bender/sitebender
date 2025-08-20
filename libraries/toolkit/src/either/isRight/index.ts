import type { Either, Right } from "../../types/fp/either/index.ts"

/**
 * Type guard that checks if an Either is a Right value
 * 
 * Tests whether an Either contains a success (Right) value. This is useful
 * for conditional logic where different paths are needed based on success
 * or failure. As a type guard, it also narrows the TypeScript type in the
 * true branch, allowing safe access to the right property.
 * 
 * @param either - The Either value to check
 * @returns True if the Either is a Right, false if it's a Left
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * 
 * // Basic type checking
 * isRight(right(42))      // true
 * isRight(left("error"))  // false
 * 
 * // Type narrowing in conditionals
 * const result: Either<string, number> = right(42)
 * 
 * if (isRight(result)) {
 *   // TypeScript knows result is Right<number> here
 *   console.log("Success:", result.right * 2)
 * } else {
 *   // TypeScript knows result is Left<string> here
 *   console.error("Error:", result.left)
 * }
 * 
 * // Using with filter to extract successful values
 * const results: Array<Either<string, number>> = [
 *   right(10),
 *   left("error 1"),
 *   right(20),
 *   left("error 2"),
 *   right(30)
 * ]
 * 
 * const successes = results.filter(isRight)
 * // [Right(10), Right(20), Right(30)]
 * 
 * const failures = results.filter(r => !isRight(r))
 * // [Left("error 1"), Left("error 2")]
 * 
 * // Guard clause pattern
 * const processValue = (either: Either<string, number>): number => {
 *   if (!isRight(either)) {
 *     console.error(`Error occurred: ${either.left}`)
 *     return 0 // default value
 *   }
 *   
 *   // TypeScript knows either is Right<number> here
 *   return either.right * 100
 * }
 * 
 * processValue(right(5))      // 500
 * processValue(left("oops"))  // 0 (after logging error)
 * 
 * // Extracting successful values safely
 * const extractSuccesses = <E, A>(
 *   eithers: Array<Either<E, A>>
 * ): Array<A> =>
 *   eithers
 *     .filter(isRight)
 *     .map(r => r.right) // Safe because we filtered
 * 
 * extractSuccesses([
 *   right(1),
 *   left("err"),
 *   right(2),
 *   right(3)
 * ])
 * // [1, 2, 3]
 * 
 * // Validation checks
 * const allValid = <E, A>(
 *   validations: Array<Either<E, A>>
 * ): boolean =>
 *   validations.every(isRight)
 * 
 * const hasAnyValid = <E, A>(
 *   validations: Array<Either<E, A>>
 * ): boolean =>
 *   validations.some(isRight)
 * 
 * allValid([right(1), right(2), right(3)])     // true
 * allValid([right(1), left("err"), right(3)])  // false
 * hasAnyValid([left("e1"), left("e2")])        // false
 * hasAnyValid([left("e1"), right(1)])          // true
 * 
 * // Conditional execution based on success
 * const executeIfSuccessful = <A>(
 *   either: Either<string, A>,
 *   action: (value: A) => void
 * ): void => {
 *   if (isRight(either)) {
 *     action(either.right)
 *   }
 * }
 * 
 * executeIfSuccessful(right(42), x => console.log(x))  // logs: 42
 * executeIfSuccessful(left("err"), x => console.log(x)) // does nothing
 * 
 * // Success rate calculation
 * const successRate = <E, A>(
 *   results: Array<Either<E, A>>
 * ): number => {
 *   if (results.length === 0) return 0
 *   return results.filter(isRight).length / results.length
 * }
 * 
 * successRate([right(1), right(2), left("err"), right(3)])  // 0.75
 * ```
 * 
 * @property Type-guard - Narrows TypeScript types in conditional branches
 * @property Pure - No side effects, just checks the tag
 * @property Composable - Works well with array methods and other predicates
 */
const isRight = <E, A>(either: Either<E, A>): either is Right<A> =>
	either._tag === "Right"

export default isRight