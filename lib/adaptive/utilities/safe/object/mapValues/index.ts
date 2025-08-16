import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import mapValuesUnsafe from "../../../unsafe/object/mapValues/index.ts"

export interface MapValuesError extends Error {
	name: "MapValuesError"
	fn: <T, R>(value: T) => R
	object: Record<string | symbol, Value> | null | undefined
}

/**
 * Safely maps a function over all values in an object, preserving keys
 * 
 * Safe version that returns Either<MapValuesError, Result>.
 * Transforms each value in an object by applying a function, while keeping
 * the same keys. Creates a new object with the same keys but transformed values.
 * 
 * @curried (fn) => (obj) => Either<MapValuesError, result>
 * @param fn - Function to apply to each value
 * @param obj - Object whose values will be transformed
 * @returns Either with transformed object or error
 * @example
 * ```typescript
 * // Success case
 * const result = mapValues((x: number) => x * 2)({ a: 1, b: 2, c: 3 })
 * // Right({ a: 2, b: 4, c: 6 })
 * 
 * // Handles function errors
 * const result = mapValues((x: any) => {
 *   if (x < 0) throw new Error("Negative not allowed")
 *   return x * 2
 * })({ a: 1, b: -1 })
 * // Left(MapValuesError: "Negative not allowed")
 * 
 * // Handles null/undefined gracefully
 * const result = mapValues((x: number) => x + 1)(null)
 * // Right({})
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const processScores = pipeEither(
 *   getScoresSafe,
 *   mapValues((score: number) => score * 1.1),  // 10% bonus
 *   mapValues(Math.round)
 * )
 * ```
 */
const mapValues = <T extends Value, R extends Value>(
	fn: (value: T) => R
) => <K extends string | symbol>(
	obj: Record<K, T> | null | undefined
): Either<MapValuesError, Record<K, R>> => {
	try {
		// Validate fn
		if (typeof fn !== "function") {
			const error: MapValuesError = {
				name: "MapValuesError",
				message: `Mapper must be a function, got ${typeof fn}`,
				fn,
				object: obj
			} as MapValuesError
			return left(error)
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = mapValuesUnsafe(fn)(obj)
		return right(result)
	} catch (err) {
		const error: MapValuesError = {
			name: "MapValuesError",
			message: err instanceof Error ? err.message : String(err),
			fn,
			object: obj
		} as MapValuesError
		return left(error)
	}
}

export default mapValues