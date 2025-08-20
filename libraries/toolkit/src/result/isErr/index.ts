import type { Err, Result } from "../../../types/fp/result/index.ts"
import isLeft from "../../either/isLeft/index.ts"

/**
 * Type guard that checks if a Result is Err
 * 
 * Wrapper around Either's isLeft with Result-specific naming.
 * Returns true if the Result is Err, false if Ok.
 * 
 * @param result - The Result to check
 * @returns True if Err, false if Ok
 * @example
 * ```typescript
 * isErr(err("failed"))  // true
 * isErr(ok(42))  // false
 * ```
 */
const isErr = isLeft as <T, E>(result: Result<T, E>) => result is Err<E>

export default isErr