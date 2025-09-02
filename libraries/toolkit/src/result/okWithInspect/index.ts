import rightWithInspect from "../../either/rightWithInspect/index.ts"

/**
 * Creates an Ok result with enhanced debugging output
 *
 * Wrapper around Either's rightWithInspect with Result-specific naming.
 * Creates an Ok value with custom inspect method for better console output.
 *
 * @param value - The success value to wrap
 * @returns A Result in the Ok state with inspect method
 * @example
 * ```typescript
 * const result = okWithInspect({ id: 1, name: "Alice" })
 * console.log(result)  // Shows formatted output in console
 * ```
 */
const okWithInspect = rightWithInspect

export default okWithInspect
