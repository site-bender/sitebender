import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import groupByUnsafe from "../../../unsafe/array/groupBy/index.ts"

export interface GroupByError extends Error {
	name: "GroupByError"
	array: ReadonlyArray<unknown> | null | undefined
	keyFn: <T>(element: T) => string | number
}

/**
 * Safely groups array elements by the result of a key function
 * 
 * Safe version that returns Either<GroupByError, Result>.
 * Creates an object where keys are the results of the key function and
 * values are arrays of elements that produced that key.
 * 
 * @curried (keyFn) => (array) => Either<GroupByError, result>
 * @param keyFn - Function that returns a grouping key for each element
 * @param array - Array to group
 * @returns Either with grouped object or error
 * @example
 * ```typescript
 * // Success case
 * const result = groupBy((person: { age: number }) => person.age)([
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 30 }
 * ])
 * // Right({
 * //   25: [{ name: "Bob", age: 25 }],
 * //   30: [{ name: "Alice", age: 30 }, { name: "Charlie", age: 30 }]
 * // })
 * 
 * // Handles errors in key function
 * const result = groupBy((x: any) => {
 *   if (x.value == null) throw new Error("Missing value")
 *   return x.value
 * })([{ value: 1 }, { value: null }])
 * // Left(GroupByError: "Missing value")
 * 
 * // Handles null/undefined gracefully
 * const result = groupBy((x: number) => x)(null)
 * // Right({})
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const processData = pipeEither(
 *   fetchUsersSafe,
 *   groupBy((user: User) => user.department),
 *   mapValues(users => users.length)
 * )
 * ```
 */
const groupBy = <T, K extends string | number>(
	keyFn: (element: T) => K
) => (
	array: ReadonlyArray<T> | null | undefined
): Either<GroupByError, Record<string, Array<T>>> => {
	try {
		// Validate keyFn
		if (typeof keyFn !== "function") {
			const error: GroupByError = {
				name: "GroupByError",
				message: `Key function must be a function, got ${typeof keyFn}`,
				array,
				keyFn
			} as GroupByError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = groupByUnsafe(keyFn)(array)
		return right(result)
	} catch (err) {
		const error: GroupByError = {
			name: "GroupByError",
			message: err instanceof Error ? err.message : String(err),
			array,
			keyFn
		} as GroupByError
		return left(error)
	}
}

export default groupBy