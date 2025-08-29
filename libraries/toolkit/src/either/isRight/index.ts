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
 *   left("error 2")
 * ]
 *
 * results.filter(isRight)  // [Right(10), Right(20)]
 *
 * // Extracting successful values safely
 * const extractSuccesses = <E, A>(
 *   eithers: Array<Either<E, A>>
 * ): Array<A> =>
 *   eithers
 *     .filter(isRight)
 *     .map(r => r.right) // Safe because we filtered
 *
 * extractSuccesses([right(1), left("err"), right(2)])  // [1, 2]
 *
 * // Validation checks
 * const allValid = <E, A>(validations: Array<Either<E, A>>) =>
 *   validations.every(isRight)
 *
 * allValid([right(1), right(2), right(3)])     // true
 * allValid([right(1), left("err"), right(3)])  // false
 * ```
 *
 * @pure
 * @predicate
 */
const isRight = <E, A>(either: Either<E, A>): either is Right<A> =>
	either._tag === "Right"

export default isRight
