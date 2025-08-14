import type { Value } from "../../types/index.ts"

/**
 * Checks if a value is a valid numeric string
 * 
 * @param value - The value to check
 * @returns True if the value represents a valid number
 * @example
 * ```typescript
 * isNumber("123") // true
 * isNumber("12.34") // true
 * isNumber("abc") // false
 * ```
 */
const isNumber = (value: Value): boolean =>
	/^[+-]?([0-9]*[.])?[0-9]+$/.test(String(value))

export default isNumber
