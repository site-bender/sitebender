import type { Result } from "../../../types/fp/result/index.ts"
import leftWithInspect from "../../either/leftWithInspect/index.ts"

/**
 * Creates an Err result with enhanced debugging output
 * 
 * Wrapper around Either's leftWithInspect with Result-specific naming.
 * Creates an Err value with custom inspect method for better console output.
 * 
 * @param error - The error value to wrap
 * @returns A Result in the Err state with inspect method
 * @example
 * ```typescript
 * const result = errWithInspect(new Error("Something went wrong"))
 * console.log(result)  // Shows formatted error output in console
 * ```
 */
const errWithInspect = leftWithInspect

export default errWithInspect