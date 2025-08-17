import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import hasUnsafe from "../../../unsafe/object/has/index.ts"

/**
 * Error returned when has operation fails
 */
export interface HasError extends Error {
	name: "HasError"
	pathInput: string | Array<string | number>
	obj: Value
}

/**
 * Safely checks if an object has a property at the specified path
 * 
 * Checks if a property exists in an object using either a dot-separated
 * string or an array of keys. Returns Either monad with true if the path exists,
 * even if the value is undefined. Does not check prototype properties.
 * 
 * @curried (pathInput) => (obj) => Either<HasError, boolean>
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to check
 * @returns Either with true if path exists, false otherwise
 * @example
 * ```typescript
 * import { pipeEither } from "../types/either/pipeline/index.ts"
 * 
 * // Basic usage
 * hasSafe("name")({ name: "John" })
 * // Right(true)
 * 
 * hasSafe("email")({ name: "John" })
 * // Right(false)
 * 
 * // Nested paths
 * hasSafe("user.name")({ user: { name: "Alice" } })
 * // Right(true)
 * 
 * // Pipeline usage
 * const validateUser = pipeEither(
 *   hasSafe("id"),
 *   chain(hasId => hasId 
 *     ? hasSafe("profile.email")
 *     : left({ name: "HasError", message: "No user ID" })
 *   )
 * )
 * 
 * validateUser({ id: 1, profile: { email: "test@example.com" } })
 * // Right(true)
 * 
 * // Handles all edge cases safely
 * hasSafe("prop")(null)
 * // Right(false)
 * 
 * hasSafe("")({ a: 1 })
 * // Right(true)
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const hasSafe = (pathInput: string | Array<string | number>) => (
	obj: Value
): Either<HasError, boolean> => {
	try {
		const result = hasUnsafe(pathInput)(obj)
		return right(result)
	} catch (err) {
		const error: HasError = {
			name: "HasError",
			message: err instanceof Error ? err.message : String(err),
			pathInput,
			obj,
		} as HasError
		return left(error)
	}
}

export default hasSafe