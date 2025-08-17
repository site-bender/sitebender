import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import valuesUnsafe from "../../../unsafe/object/values/index.ts"

/**
 * Error returned when values operation fails
 */
export interface ValuesError extends Error {
	name: "ValuesError"
	obj: Record<string, Value> | null | undefined
}

/**
 * Safely returns an array of an object's own enumerable property values
 * 
 * Safe version that returns Either<ValuesError, Array<Value>>.
 * Retrieves all values from own enumerable properties of an object,
 * excluding symbol properties and prototype properties.
 * 
 * @curried Single parameter - already curried
 * @param obj - The object to extract values from
 * @returns Either with array of values or error
 * @example
 * ```typescript
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * // Basic usage
 * valuesSafe({ a: 1, b: 2, c: 3 })
 * // Right([1, 2, 3])
 * 
 * // Pipeline usage
 * const extractNumbers = pipeEither(
 *   valuesSafe,
 *   map(vals => vals.filter(v => typeof v === "number")),
 *   map(nums => nums.reduce((a, b) => a + b, 0))
 * )
 * 
 * extractNumbers({ a: 1, b: "text", c: 5, d: true })
 * // Right(6)
 * 
 * // Handles null/undefined safely
 * valuesSafe(null)
 * // Right([])
 * 
 * valuesSafe(undefined)
 * // Right([])
 * 
 * // Works with arrays
 * valuesSafe(["a", "b", "c"])
 * // Right(["a", "b", "c"])
 * 
 * // Complex pipeline
 * const processConfig = pipeEither(
 *   valuesSafe,
 *   map(vals => vals.filter(Boolean)),
 *   map(vals => vals.map(String))
 * )
 * 
 * processConfig({ enabled: true, name: "test", count: 42, empty: null })
 * // Right(["true", "test", "42"])
 * ```
 * @property Type-safe - Returns Either monad
 * @property Never throws - All errors captured
 * @property Composable - Works with pipeEither
 */
const valuesSafe = <T extends Record<string, Value>>(
	obj: T | null | undefined
): Either<ValuesError, Array<T[keyof T]>> => {
	try {
		const result = valuesUnsafe(obj)
		return right(result)
	} catch (err) {
		const error: ValuesError = {
			name: "ValuesError",
			message: err instanceof Error ? err.message : String(err),
			obj,
		} as ValuesError
		return left(error)
	}
}

export default valuesSafe