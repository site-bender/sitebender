import type { Value } from "../../../../types/index.ts"
import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"

export class PickError extends Error {
	constructor(message: string, public readonly keys: Array<string>) {
		super(message)
		this.name = "PickError"
	}
}

/**
 * Safely creates a new object with only the specified keys
 * 
 * Returns Either<PickError, object> for explicit error handling.
 * Unlike the unsafe version, this validates inputs and provides
 * detailed error information.
 * 
 * @curried (keys) => (obj) => Either<PickError, Pick<T, K>>
 * @param keys - Array of keys to pick from the object
 * @param obj - The object to pick keys from
 * @returns Either with PickError on Left or picked object on Right
 * @example
 * ```typescript
 * // Success case
 * pickSafe(["name", "email"])({ name: "Alice", email: "alice@example.com", age: 30 })
 *   .fold(
 *     err => console.error(err),
 *     result => console.log(result)  // { name: "Alice", email: "alice@example.com" }
 *   )
 * 
 * // Error handling for null/undefined
 * pickSafe(["name"])(null)
 *   // Left<PickError: "Cannot pick from null or undefined">
 * 
 * // Works with non-existent keys (not an error, just omitted)
 * pickSafe(["name", "missing"])({ name: "Bob", age: 25 })
 *   // Right<{ name: "Bob" }>
 * 
 * // Composable with Either pipeline
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * const getPublicData = pipeEither(
 *   pickSafe(["id", "name", "email"]),
 *   map(data => ({ ...data, public: true }))
 * )
 * 
 * // Validates key types
 * pickSafe([])({ a: 1, b: 2 })          // Right<{}>
 * pickSafe(["a", "b"])({})              // Right<{}>
 * 
 * // Preserves key order from keys array
 * pickSafe(["c", "a", "b"])({ a: 1, b: 2, c: 3 })
 *   // Right<{ c: 3, a: 1, b: 2 }>
 * ```
 * @property Safe - Returns Either for explicit error handling
 * @property Validates inputs - Checks for null/undefined
 * @property Type-safe - Preserves TypeScript types
 * @property Immutable - Creates new object, doesn't modify input
 */
const pickSafe = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>
) => (obj: T | null | undefined): Either<PickError, Pick<T, K>> => {
	// Validate keys array
	if (!Array.isArray(keys)) {
		return left(new PickError(
			"Keys must be an array",
			[]
		))
	}
	
	// Handle null/undefined gracefully
	if (obj == null) {
		return left(new PickError(
			`Cannot pick from ${obj === null ? 'null' : 'undefined'}`,
			keys as Array<string>
		))
	}
	
	// Check if obj is actually an object
	if (typeof obj !== "object") {
		return left(new PickError(
			`Cannot pick from ${typeof obj} - expected object`,
			keys as Array<string>
		))
	}
	
	try {
		// Build result with only specified keys
		const result: Record<string, Value> = {}
		
		for (const key of keys) {
			if (Object.prototype.hasOwnProperty.call(obj, key as string)) {
				result[key as string] = obj[key]
			}
		}
		
		return right(result as Pick<T, K>)
	} catch (error) {
		return left(new PickError(
			error instanceof Error ? error.message : "Unknown error during pick operation",
			keys as Array<string>
		))
	}
}

export default pickSafe