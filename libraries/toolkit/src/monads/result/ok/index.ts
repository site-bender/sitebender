import type { Result } from "../../types/fp/result/index.ts"

import right from "../../either/right/index.ts"

/**
 * Creates an Ok result representing success
 *
 * Wrapper around Either's right function with Result-specific naming.
 * Ok values represent successful computations that will have operations
 * like map and chain applied to them.
 *
 * @param value - The success value to wrap
 * @returns A Result in the Ok state
 * @example
 * ```typescript
 * ok(42)  // Result<42, never>
 * ok("success")  // Result<"success", never>
 * ok({ id: 1, name: "Alice" })  // Result<User, never>
 * ```
 */
const ok = right

export default ok
