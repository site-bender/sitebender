import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import mergeUnsafe from "../../../unsafe/object/merge/index.ts"

/**
 * Error returned when merge operation fails
 */
export interface MergeError extends Error {
	name: "MergeError"
	sources: Array<Record<string | symbol, Value> | null | undefined>
	target: Record<string | symbol, Value> | null | undefined
}

/**
 * Safely merges objects together with target properties taking precedence
 * 
 * Safe version that returns Either<MergeError, Result>.
 * Performs a shallow merge where the target object's properties override
 * the source defaults. Returns Either monad for composability.
 * 
 * @curried (...sources) => (target) => Either<MergeError, result>
 * @param sources - Default objects to be overridden by target
 * @param target - The object whose properties take precedence
 * @returns Either with merged object or error
 * @example
 * ```typescript
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * // Basic usage
 * mergeSafe({ b: 2, c: 3 })({ a: 1, b: 10 })
 * // Right({ a: 1, b: 10, c: 3 })
 * 
 * // Pipeline usage with other safe functions
 * const applyDefaults = pipeEither(
 *   mergeSafe({ role: "user", active: true }),
 *   chain(user => setSafe("createdAt")(Date.now())(user)),
 *   chain(validateUserSafe)
 * )
 * 
 * applyDefaults({ name: "Alice" })
 * // Right({ name: "Alice", role: "user", active: true, createdAt: ... })
 * 
 * // Multiple sources
 * const mergeMany = mergeSafe(
 *   { port: 3000 },
 *   { host: "localhost" },
 *   { debug: false }
 * )
 * 
 * mergeMany({ port: 8080 })
 * // Right({ port: 8080, host: "localhost", debug: false })
 * 
 * // Handles null/undefined gracefully
 * mergeSafe({ a: 1 })(null)
 * // Right({ a: 1 })
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const mergeSafe = <T extends Record<string | symbol, Value>>(
	...sources: Array<Record<string | symbol, Value> | null | undefined>
) => (
	target: T | null | undefined
): Either<MergeError, T & Record<string | symbol, Value>> => {
	try {
		const result = mergeUnsafe(...sources)(target) as T & Record<string | symbol, Value>
		return right(result)
	} catch (err) {
		const error: MergeError = {
			name: "MergeError",
			message: err instanceof Error ? err.message : String(err),
			sources,
			target,
		} as MergeError
		return left(error)
	}
}

export default mergeSafe