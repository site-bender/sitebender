import type { Either } from "../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

/**
 * Converts a throwing function into an Either-returning function
 *
 * Safely executes a function that might throw an exception, converting
 * any thrown errors into Left values and successful results into Right
 * values. This bridges the gap between exception-based error handling
 * and functional error handling with Either.
 *
 * @pure
 * @curried
 * @safe
 * @param fn - Function that might throw an exception
 * @param onError - Function to transform caught errors into Left values
 * @returns Either containing the result or transformed error
 * @example
 * ```typescript
 * // Basic exception handling
 * const safeParse = tryCatch(
 *   () => JSON.parse('{"valid": "json"}'),
 *   (err: unknown) => String(err)
 * ) // Right({ valid: "json" })
 *
 * const safeParseInvalid = tryCatch(
 *   () => JSON.parse("invalid json"),
 *   (err: unknown) => String(err)
 * ) // Left("SyntaxError: ...")
 *
 * // With error transformation
 * const parseWithContext = (json: string) => tryCatch(
 *   () => JSON.parse(json),
 *   (err: unknown) => ({
 *     error: err instanceof Error ? err.message : String(err),
 *     input: json,
 *     timestamp: Date.now()
 *   })
 * )
 *
 * // Array access safety
 * const safeGet = <T>(arr: Array<T>, index: number) => tryCatch(
 *   () => {
 *     if (index < 0 || index >= arr.length) {
 *       throw new Error(`Index ${index} out of bounds`)
 *     }
 *     return arr[index]
 *   },
 *   (err: unknown) => String(err)
 * )
 * safeGet([1, 2, 3], 1)   // Right(2)
 * safeGet([1, 2, 3], 10)  // Left("Error: Index 10 out of bounds")
 *
 * // Type assertions with safety
 * const assertUser = (data: unknown) => tryCatch(
 *   (): User => {
 *     const obj = data as any
 *     if (typeof obj.id !== "number" || typeof obj.name !== "string") {
 *       throw new Error("Invalid user shape")
 *     }
 *     return obj as User
 *   },
 *   (err: unknown) => `Validation failed: ${err}`
 * )
 *
 * // Regular expression matching
 * const safeMatch = (pattern: string, text: string) => tryCatch(
 *   () => new RegExp(pattern).exec(text),
 *   (err: unknown) => `Invalid regex: ${err}`
 * )
 * safeMatch("\\d+", "abc123def")  // Right(["123"])
 * safeMatch("[", "text")          // Left("Invalid regex: ...")
 * ```
 */
const tryCatch = <A>(
	fn: () => A,
) =>
<E>(
	onError: (error: unknown) => E,
): Either<E, A> => {
	try {
		return right(fn())
	} catch (error) {
		return left(onError(error))
	}
}

export default tryCatch
