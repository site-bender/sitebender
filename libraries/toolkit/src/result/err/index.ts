import type { Result } from "../../types/fp/result/index.ts"
import left from "../../either/left/index.ts"

/**
 * Creates an Err result representing failure
 * 
 * Wrapper around Either's left function with Result-specific naming.
 * Err values represent failed computations that will bypass operations
 * like map and chain.
 * 
 * @param error - The error value to wrap
 * @returns A Result in the Err state
 * @example
 * ```typescript
 * err("Not found")  // Result<never, "Not found">
 * err(new Error("Failed"))  // Result<never, Error>
 * err({ code: 404, message: "Not found" })  // Result<never, ErrorObj>
 * ```
 */
const err = left

export default err