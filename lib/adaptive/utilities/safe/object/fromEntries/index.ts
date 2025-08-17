import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import fromEntriesUnsafe from "../../../unsafe/object/fromEntries/index.ts"

/**
 * Error returned when fromEntries operation fails
 */
export interface FromEntriesError extends Error {
	name: "FromEntriesError"
	entries: Iterable<readonly [string | number | symbol, Value]> | null | undefined
}

/**
 * Safely creates an object from an array of [key, value] pairs
 * 
 * Safe version that returns Either<FromEntriesError, Record<K, V>>.
 * Transforms an iterable of [key, value] entries into an object.
 * Later entries with the same key will override earlier ones.
 * 
 * @curried Single parameter - already curried
 * @param entries - Array of [key, value] tuples
 * @returns Either with created object or error
 * @example
 * ```typescript
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * // Basic usage
 * fromEntriesSafe([["a", 1], ["b", 2], ["c", 3]])
 * // Right({ a: 1, b: 2, c: 3 })
 * 
 * // Pipeline usage for transformation
 * const transformObject = pipeEither(
 *   entriesSafe,
 *   map(entries => entries.map(([k, v]) => [k.toUpperCase(), v * 2])),
 *   chain(fromEntriesSafe)
 * )
 * 
 * transformObject({ a: 1, b: 2, c: 3 })
 * // Right({ A: 2, B: 4, C: 6 })
 * 
 * // Build object from filtered data
 * const buildConfig = pipeEither(
 *   (data: Array<[string, Value]>) => 
 *     right(data.filter(([k, v]) => v != null)),
 *   chain(fromEntriesSafe)
 * )
 * 
 * buildConfig([["a", 1], ["b", null], ["c", 3]])
 * // Right({ a: 1, c: 3 })
 * 
 * // Handles null/undefined safely
 * fromEntriesSafe(null)
 * // Right({})
 * 
 * fromEntriesSafe(undefined)
 * // Right({})
 * 
 * // From Map
 * const map = new Map([["x", 10], ["y", 20]])
 * fromEntriesSafe(map)
 * // Right({ x: 10, y: 20 })
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const fromEntriesSafe = <K extends string | number | symbol, V extends Value>(
	entries: Iterable<readonly [K, V]> | null | undefined
): Either<FromEntriesError, Record<K, V>> => {
	try {
		const result = fromEntriesUnsafe(entries)
		return right(result)
	} catch (err) {
		const error: FromEntriesError = {
			name: "FromEntriesError",
			message: err instanceof Error ? err.message : String(err),
			entries,
		} as FromEntriesError
		return left(error)
	}
}

export default fromEntriesSafe