import type { Result } from "../../types/fp/result/index.ts"
import getOrElseEither from "../../either/getOrElse/index.ts"

/**
 * Extracts the Ok value or returns a default if Err
 * 
 * Wrapper around Either's getOrElse with Result-specific naming.
 * Safely unwraps a Result by providing a fallback value.
 * 
 * @curried
 * @param defaultValue - The value to return if Result is Err
 * @param result - The Result to extract from
 * @returns The Ok value or the default value
 * @example
 * ```typescript
 * const withDefault = getOrElse(0)
 * 
 * withDefault(ok(42))  // 42
 * withDefault(err("failed"))  // 0
 * ```
 */
const getOrElse = getOrElseEither as <T>(
	defaultValue: T
) => <E>(result: Result<T, E>) => T

export default getOrElse