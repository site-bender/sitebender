import type { Result } from "../../types/fp/result/index.ts"
import showEither from "../../either/show/index.ts"

/**
 * Converts a Result to its string representation
 * 
 * Wrapper around Either's show with Result-specific naming.
 * Creates a readable string representation of the Result.
 * 
 * @param result - The Result to convert
 * @returns String representation of the Result
 * @example
 * ```typescript
 * show(ok(42))  // "Right(42)"
 * show(err("failed"))  // "Left(failed)"
 * ```
 */
const show = showEither as <T, E>(result: Result<T, E>) => string

export default show