import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import takeWhileUnsafe from "../../../unsafe/array/takeWhile/index.ts"

export interface TakeWhileError extends Error {
	name: "TakeWhileError"
	predicate: <T>(element: T, index: number, array: ReadonlyArray<T>) => boolean
	array: ReadonlyArray<unknown> | null | undefined
}

/**
 * Safely takes elements from the beginning of an array while predicate returns true
 * 
 * Safe version that returns Either<TakeWhileError, Array<T>>.
 * Returns a new array containing elements from the start of the input array,
 * stopping at the first element for which the predicate returns false.
 * 
 * @curried (predicate) => (array) => Either<TakeWhileError, result>
 * @param predicate - Function that returns true to continue taking elements
 * @param array - Array to take elements from
 * @returns Either with taken elements or error
 * @example
 * ```typescript
 * // Success case
 * const result = takeWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1])
 * // Right([1, 3])  (stops at 5, doesn't check further)
 * 
 * // Handles predicate errors
 * const result = takeWhile((x: { val?: number }) => {
 *   if (x.val == null) throw new Error("Missing value")
 *   return x.val < 10
 * })([{ val: 5 }, { val: null }])
 * // Left(TakeWhileError: "Missing value")
 * 
 * // Handles null/undefined gracefully
 * const result = takeWhile((x: number) => x > 0)(null)
 * // Right([])
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const processData = pipeEither(
 *   fetchDataSafe,
 *   takeWhile((x: Data) => x.valid),
 *   map(validData => processValidData(validData))
 * )
 * ```
 */
const takeWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Either<TakeWhileError, Array<T>> => {
	try {
		// Validate predicate
		if (typeof predicate !== "function") {
			const error: TakeWhileError = {
				name: "TakeWhileError",
				message: `Predicate must be a function, got ${typeof predicate}`,
				predicate: predicate as typeof error.predicate,
				array
			} as TakeWhileError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = takeWhileUnsafe(predicate)(array)
		return right(result)
	} catch (err) {
		const error: TakeWhileError = {
			name: "TakeWhileError",
			message: err instanceof Error ? err.message : String(err),
			predicate,
			array
		} as TakeWhileError
		return left(error)
	}
}

export default takeWhile