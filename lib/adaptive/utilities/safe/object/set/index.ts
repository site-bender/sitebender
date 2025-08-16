import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import setUnsafe from "../../../unsafe/object/set/index.ts"

export interface SetError extends Error {
	name: "SetError"
	path: string | Array<string | number>
	value: Value
	object: Record<string, Value> | null | undefined
}

/**
 * Safely sets a value at a nested path in an object
 * 
 * Safe version that returns Either<SetError, Result>.
 * Creates a new object with the value at the specified path updated.
 * Intermediate objects are created as needed. The original object is not modified.
 * 
 * @curried (pathInput) => (value) => (obj) => Either<SetError, result>
 * @param pathInput - Dot-separated string or array of keys where to set the value
 * @param value - The value to set at the path
 * @param obj - The object to update
 * @returns Either with updated object or error
 * @example
 * ```typescript
 * // Success case
 * const result = set("user.email")("new@example.com")({
 *   user: { name: "Alice", email: "old@example.com" }
 * })
 * // Right({ user: { name: "Alice", email: "new@example.com" } })
 * 
 * // Creates intermediate objects
 * const result = set("a.b.c")(42)({})
 * // Right({ a: { b: { c: 42 } } })
 * 
 * // Validates path
 * const result = set("")("value")({ a: 1 })
 * // Right("value") - empty path replaces entire object
 * 
 * // Handles arrays
 * const result = set("items.1")("updated")({ items: ["a", "b", "c"] })
 * // Right({ items: ["a", "updated", "c"] })
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const updateUser = pipeEither(
 *   getUserSafe(id),
 *   set("profile.verified")(true),
 *   set("profile.updatedAt")(new Date()),
 *   saveUserSafe
 * )
 * ```
 */
const set = (pathInput: string | Array<string | number>) => 
<V extends Value>(value: V) => 
<T extends Record<string, Value>>(obj: T | null | undefined): Either<SetError, T> => {
	try {
		// Validate path
		if (pathInput == null) {
			const error: SetError = {
				name: "SetError",
				message: "Path cannot be null or undefined",
				path: pathInput,
				value,
				object: obj
			} as SetError
			return left(error)
		}
		
		// Validate path is string or array
		if (typeof pathInput !== "string" && !Array.isArray(pathInput)) {
			const error: SetError = {
				name: "SetError",
				message: `Path must be a string or array, got ${typeof pathInput}`,
				path: pathInput,
				value,
				object: obj
			} as SetError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = setUnsafe(pathInput)(value)(obj)
		return right(result)
	} catch (err) {
		const error: SetError = {
			name: "SetError",
			message: err instanceof Error ? err.message : String(err),
			path: pathInput,
			value,
			object: obj
		} as SetError
		return left(error)
	}
}

export default set