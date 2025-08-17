import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import evolveUnsafe from "../../../unsafe/object/evolve/index.ts"

export interface EvolveError extends Error {
	name: "EvolveError"
	transformations: Record<string | symbol, Value | ((value: Value) => Value)>
	object: Record<string, Value> | null | undefined
}

/**
 * Safely evolves an object by applying transformation functions to specific paths
 * 
 * Safe version that returns Either<EvolveError, Result>.
 * Creates a new object by recursively applying a structure of transformation
 * functions to a matching structure in the target object.
 * 
 * @curried (transformations) => (obj) => Either<EvolveError, result>
 * @param transformations - Object matching target structure with functions as values
 * @param obj - Object to evolve
 * @returns Either with evolved object or error
 * @example
 * ```typescript
 * // Success case
 * const result = evolve({
 *   count: (x: number) => x + 1,
 *   name: (s: string) => s.toUpperCase()
 * })({
 *   count: 10,
 *   name: "alice",
 *   unchanged: true
 * })
 * // Right({ count: 11, name: "ALICE", unchanged: true })
 * 
 * // Handles transformation errors
 * const result = evolve({
 *   value: (x: number) => {
 *     if (x < 0) throw new Error("Negative not allowed")
 *     return x * 2
 *   }
 * })({ value: -5 })
 * // Left(EvolveError: "Negative not allowed")
 * 
 * // Handles null/undefined gracefully
 * const result = evolve({ a: (x: number) => x + 1 })(null)
 * // Right({})
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const upgradeConfig = pipeEither(
 *   getConfigSafe,
 *   evolve({
 *     version: { patch: (p: number) => p + 1 },
 *     settings: { timeout: (t: number) => t * 1000 }
 *   }),
 *   saveConfigSafe
 * )
 * ```
 */
const evolve = <T extends Record<string, Value>>(
	transformations: Record<string | symbol, Value | ((value: Value) => Value)>
) => (obj: T | null | undefined): Either<EvolveError, T> => {
	try {
		// Validate transformations
		if (transformations == null || typeof transformations !== "object") {
			const error: EvolveError = {
				name: "EvolveError",
				message: `Transformations must be an object, got ${typeof transformations}`,
				transformations,
				object: obj
			} as EvolveError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = evolveUnsafe(transformations)(obj)
		return right(result)
	} catch (err) {
		const error: EvolveError = {
			name: "EvolveError",
			message: err instanceof Error ? err.message : String(err),
			transformations,
			object: obj
		} as EvolveError
		return left(error)
	}
}

export default evolve