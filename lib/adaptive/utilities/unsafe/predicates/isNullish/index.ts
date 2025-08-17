import type { Value } from "../../../types/index.ts"

/**
 * Type guard that checks if a value is null or undefined
 * 
 * @param item - The value to check
 * @returns True if the value is null or undefined
 * @example
 * ```typescript
 * isNullish(null) // true
 * isNullish(undefined) // true
 * isNullish(0) // false
 * isNullish("") // false
 * ```
 */
const isNullish = (item: Value): item is null | undefined => item == null

export default isNullish
