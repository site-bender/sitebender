import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import entriesUnsafe from "../../../unsafe/object/entries/index.ts"

/**
 * Error returned when entries operation fails
 */
export interface EntriesError extends Error {
	name: "EntriesError"
	obj: Record<string, Value> | null | undefined
}

/**
 * Safely returns an array of an object's own enumerable [key, value] pairs
 * 
 * Safe version that returns Either<EntriesError, Array<[string, Value]>>.
 * Creates an array of [key, value] tuples from an object's own enumerable
 * properties. Excludes symbol properties and prototype properties.
 * 
 * @curried Single parameter - already curried
 * @param obj - The object to extract entries from
 * @returns Either with array of entries or error
 * @example
 * ```typescript
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * // Basic usage
 * entriesSafe({ a: 1, b: 2, c: 3 })
 * // Right([["a", 1], ["b", 2], ["c", 3]])
 * 
 * // Pipeline usage
 * const transformEntries = pipeEither(
 *   entriesSafe,
 *   map(entries => entries.filter(([k, v]) => v != null)),
 *   map(entries => Object.fromEntries(entries))
 * )
 * 
 * transformEntries({ a: 1, b: null, c: 3, d: undefined })
 * // Right({ a: 1, c: 3 })
 * 
 * // Process key-value pairs
 * const prefixKeys = pipeEither(
 *   entriesSafe,
 *   map(entries => entries.map(([k, v]) => [`prefix_${k}`, v])),
 *   map(entries => Object.fromEntries(entries))
 * )
 * 
 * prefixKeys({ id: 1, name: "test" })
 * // Right({ prefix_id: 1, prefix_name: "test" })
 * 
 * // Handles null/undefined safely
 * entriesSafe(null)
 * // Right([])
 * 
 * entriesSafe(undefined)
 * // Right([])
 * 
 * // Works with arrays
 * entriesSafe(["a", "b", "c"])
 * // Right([["0", "a"], ["1", "b"], ["2", "c"]])
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const entriesSafe = <T extends Record<string, Value>>(
	obj: T | null | undefined
): Either<EntriesError, Array<[keyof T & string, T[keyof T]]>> => {
	try {
		const result = entriesUnsafe(obj)
		return right(result)
	} catch (err) {
		const error: EntriesError = {
			name: "EntriesError",
			message: err instanceof Error ? err.message : String(err),
			obj,
		} as EntriesError
		return left(error)
	}
}

export default entriesSafe