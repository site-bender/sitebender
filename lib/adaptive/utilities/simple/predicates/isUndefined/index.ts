import type { Value } from "../../../../types/index.ts"

/**
 * Type guard that checks if a value is undefined or null
 *
 * @param value - The value to check
 * @returns True if the value is null or undefined
 * @example
 * ```typescript
 * isUndefined(null) // true
 * isUndefined(undefined) // true
 * isUndefined("") // false
 * isUndefined(0) // false
 * ```
 */
const isUndefined = (value: Value): value is null | undefined => value == null

export default isUndefined
