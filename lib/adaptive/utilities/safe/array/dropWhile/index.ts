import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import dropWhileUnsafe from "../../../unsafe/array/dropWhile/index.ts"

export interface DropWhileError extends Error {
	name: "DropWhileError"
	predicate: <T>(element: T, index: number, array: ReadonlyArray<T>) => boolean
	array: ReadonlyArray<unknown> | null | undefined
}

/**
 * Safely drops elements from the beginning of an array while predicate returns true
 * 
 * Safe version that returns Either<DropWhileError, Array<T>>.
 * Returns a new array with elements from the beginning removed as long as
 * the predicate returns true. Once predicate returns false, all remaining
 * elements are included.
 * 
 * @curried (predicate) => (array) => Either<DropWhileError, result>
 * @param predicate - Function that returns true to continue dropping elements
 * @param array - Array to drop elements from
 * @returns Either with remaining elements or error
 * @example
 * ```typescript
 * // Success case
 * const result = dropWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1])
 * // Right([5, 7, 2, 1])  (keeps everything from 5 onward)
 * 
 * // Handles predicate errors
 * const result = dropWhile((x: { val?: number }) => {
 *   if (x.val == null) throw new Error("Missing value")
 *   return x.val < 10
 * })([{ val: 5 }, { val: null }])
 * // Left(DropWhileError: "Missing value")
 * 
 * // Handles null/undefined gracefully
 * const result = dropWhile((x: number) => x < 0)(null)
 * // Right([])
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const processData = pipeEither(
 *   fetchDataSafe,
 *   dropWhile((x: Data) => !x.ready),
 *   map(readyData => processReadyData(readyData))
 * )
 * ```
 */
const dropWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Either<DropWhileError, Array<T>> => {
	try {
		// Validate predicate
		if (typeof predicate !== "function") {
			const error: DropWhileError = {
				name: "DropWhileError",
				message: `Predicate must be a function, got ${typeof predicate}`,
				predicate: predicate as typeof error.predicate,
				array
			} as DropWhileError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = dropWhileUnsafe(predicate)(array)
		return right(result)
	} catch (err) {
		const error: DropWhileError = {
			name: "DropWhileError",
			message: err instanceof Error ? err.message : String(err),
			predicate,
			array
		} as DropWhileError
		return left(error)
	}
}

export default dropWhile