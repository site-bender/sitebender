import type { Result } from "../../types/fp/result/index.ts"
import tryCatchEither from "../../either/tryCatch/index.ts"

/**
 * Converts a try/catch operation to a Result
 * 
 * Wrapper around Either's tryCatch with Result-specific naming.
 * Executes a function and captures success as Ok or exceptions as Err.
 * 
 * @curried
 * @param fn - Function that might throw
 * @param onError - Function to transform caught errors
 * @returns A Result containing the function's return value or the error
 * @example
 * ```typescript
 * const safeParse = tryCatch(
 *   () => JSON.parse('{"valid": "json"}'),
 *   (e) => `Parse error: ${e}`
 * )
 * // ok({ valid: "json" })
 * 
 * const failParse = tryCatch(
 *   () => JSON.parse('invalid'),
 *   (e) => `Parse error: ${e}`
 * )
 * // err("Parse error: SyntaxError...")
 * ```
 */
const tryCatch = tryCatchEither as <T, E>(
	fn: () => T,
	onError: (error: unknown) => E
) => Result<T, E>

export default tryCatch