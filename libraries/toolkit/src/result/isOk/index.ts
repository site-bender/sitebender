import type { Ok, Result } from "../../types/fp/result/index.ts"

import isRight from "../../either/isRight/index.ts"

/**
 * Type guard that checks if a Result is Ok
 *
 * Wrapper around Either's isRight with Result-specific naming.
 * Returns true if the Result is Ok, false if Err.
 *
 * @param result - The Result to check
 * @returns True if Ok, false if Err
 * @example
 * ```typescript
 * isOk(ok(42))  // true
 * isOk(err("failed"))  // false
 * ```
 */
const isOk = isRight as <T, E>(result: Result<T, E>) => result is Ok<T>

export default isOk
