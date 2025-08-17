import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import partitionUnsafe from "../../../unsafe/array/partition/index.ts"

export interface PartitionError<T> extends Error {
	name: "PartitionError"
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
	array: ReadonlyArray<T> | null | undefined
}

/**
 * Safely splits an array into two arrays based on a predicate function
 * 
 * Safe version that returns Either<PartitionError, [pass, fail]>.
 * Partitions elements into two groups: those that satisfy the predicate
 * (first array) and those that don't (second array).
 * 
 * @curried (predicate) => (array) => Either<PartitionError, [pass, fail]>
 * @param predicate - Function that returns true for elements in first partition
 * @param array - Array to partition
 * @returns Either with tuple of [passing elements, failing elements] or error
 * @example
 * ```typescript
 * // Success case
 * const result = partition((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])
 * // Right([[2, 4, 6], [1, 3, 5]])
 * 
 * // Handles predicate errors
 * const result = partition((x: any) => {
 *   if (x.value == null) throw new Error("Missing value")
 *   return x.value > 0
 * })([{ value: 1 }, { value: null }])
 * // Left(PartitionError: "Missing value")
 * 
 * // Handles null/undefined gracefully
 * const result = partition((x: number) => x > 0)(null)
 * // Right([[], []])
 * 
 * // Use with destructuring
 * import { fold } from "../../../types/either/index.ts"
 * 
 * const result = partition((age: number) => age >= 18)([15, 22, 17, 30, 16])
 * fold(
 *   (err) => console.error(err),
 *   ([adults, minors]) => {
 *     console.log("Adults:", adults)   // [22, 30]
 *     console.log("Minors:", minors)   // [15, 17, 16]
 *   }
 * )(result)
 * ```
 */
const partition = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Either<PartitionError<T>, [Array<T>, Array<T>]> => {
	try {
		// Validate predicate
		if (typeof predicate !== "function") {
			const error: PartitionError<T> = {
				name: "PartitionError",
				message: `Predicate must be a function, got ${typeof predicate}`,
				predicate,
				array
			} as PartitionError<T>
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = partitionUnsafe(predicate)(array)
		return right(result)
	} catch (err) {
		const error: PartitionError<T> = {
			name: "PartitionError",
			message: err instanceof Error ? err.message : String(err),
			predicate,
			array
		} as PartitionError<T>
		return left(error)
	}
}

export default partition