import type { Either, Left } from "../../types/fp/either/index.ts"

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
 *   left("error 2")
 * ]
 *
 * results.filter(isLeft)  // [Left("error 1"), Left("error 2")]
 *
 * // Combining with other predicates
 * const hasError = (results: Array<Either<string, unknown>>): boolean =>
 *   results.some(isLeft)
 *
 * hasError([right(1), right(2)])     // false
 * hasError([right(1), left("err")])  // true
 * ```
 *
 * @pure
 * @predicate
 */
const isLeft = <E, A>(either: Either<E, A>): either is Left<E> =>
	either._tag === "Left"

export default isLeft
