import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import keysUnsafe from "../../../unsafe/object/keys/index.ts"

/**
 * Error returned when keys operation fails
 */
export interface KeysError extends Error {
	name: "KeysError"
	obj: object | null | undefined
}

/**
 * Safely returns an array of an object's own enumerable property names
 * 
 * Safe version that returns Either<KeysError, Array<string>>.
 * Retrieves all own enumerable string keys from an object, excluding
 * symbol keys and prototype properties.
 * 
 * @curried Single parameter - already curried
 * @param obj - The object to extract keys from
 * @returns Either with array of keys or error
 * @example
 * ```typescript
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * // Basic usage
 * keysSafe({ a: 1, b: 2, c: 3 })
 * // Right(["a", "b", "c"])
 * 
 * // Pipeline usage
 * const getPropertyNames = pipeEither(
 *   keysSafe,
 *   map(keys => keys.filter(k => !k.startsWith("_"))),
 *   map(keys => keys.sort())
 * )
 * 
 * getPropertyNames({ _private: 1, public: 2, another: 3 })
 * // Right(["another", "public"])
 * 
 * // Handles null/undefined safely
 * keysSafe(null)
 * // Right([])
 * 
 * keysSafe(undefined)
 * // Right([])
 * 
 * // Works with arrays
 * keysSafe(["a", "b", "c"])
 * // Right(["0", "1", "2"])
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const keysSafe = <T extends object>(
	obj: T | null | undefined
): Either<KeysError, Array<keyof T & string>> => {
	try {
		const result = keysUnsafe(obj)
		return right(result)
	} catch (err) {
		const error: KeysError = {
			name: "KeysError",
			message: err instanceof Error ? err.message : String(err),
			obj,
		} as KeysError
		return left(error)
	}
}

export default keysSafe