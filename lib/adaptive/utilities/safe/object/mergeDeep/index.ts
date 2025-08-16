import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import mergeDeepUnsafe from "../../../unsafe/object/mergeDeep/index.ts"

export interface MergeDeepError extends Error {
	name: "MergeDeepError"
	sources: Array<Record<string | symbol, Value> | null | undefined>
	target: Record<string | symbol, Value> | null | undefined
}

/**
 * Safely deeply merges objects recursively with target properties taking precedence
 * 
 * Safe version that returns Either<MergeDeepError, Result>.
 * Performs a deep recursive merge where nested objects are merged rather than
 * replaced. Arrays are replaced (not concatenated). Handles circular references safely.
 * 
 * @curried (...sources) => (target) => Either<MergeDeepError, result>
 * @param sources - Default objects to be recursively merged and overridden by target
 * @param target - The object whose properties take precedence at all levels
 * @returns Either with merged object or error
 * @example
 * ```typescript
 * // Success case - deep merging
 * const result = mergeDeep({
 *   user: { name: "default", role: "user" },
 *   settings: { theme: "light", notifications: true }
 * })({
 *   user: { name: "Alice" },
 *   settings: { theme: "dark" }
 * })
 * // Right({
 * //   user: { name: "Alice", role: "user" },
 * //   settings: { theme: "dark", notifications: true }
 * // })
 * 
 * // Handles invalid inputs safely
 * const result = mergeDeep(null)(undefined)
 * // Right({})  - gracefully handles null/undefined
 * 
 * // Type checking
 * const result = mergeDeep("not an object")({ a: 1 })
 * // Left(MergeDeepError)
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const process = pipeEither(
 *   getUserDefaults,
 *   mergeDeep(systemDefaults),
 *   validateConfig
 * )
 * ```
 */
const mergeDeep = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) => (target: T | null | undefined): Either<MergeDeepError, T & Record<string | symbol, Value>> => {
	try {
		// Validate sources
		for (let i = 0; i < sources.length; i++) {
			const source = sources[i]
			if (source != null && typeof source !== "object") {
				const error: MergeDeepError = {
					name: "MergeDeepError",
					message: `Source at index ${i} must be an object, got ${typeof source}`,
					sources,
					target
				} as MergeDeepError
				return left(error)
			}
		}
		
		// Validate target
		if (target != null && typeof target !== "object") {
			const error: MergeDeepError = {
				name: "MergeDeepError",
				message: `Target must be an object, got ${typeof target}`,
				sources,
				target
			} as MergeDeepError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = mergeDeepUnsafe(...sources)(target)
		return right(result)
	} catch (err) {
		const error: MergeDeepError = {
			name: "MergeDeepError",
			message: err instanceof Error ? err.message : String(err),
			sources,
			target
		} as MergeDeepError
		return left(error)
	}
}

export default mergeDeep