/**
 * Type guard that checks if a value is defined (not null or undefined)
 * 
 * @param value - The value to check
 * @returns True if the value is not null or undefined
 * @example
 * ```typescript
 * isDefined("hello") // true
 * isDefined(0) // true
 * isDefined(null) // false
 * isDefined(undefined) // false
 * ```
 */
const isDefined = <T>(value: T | null | undefined): value is T => value != null

export default isDefined
