import type { GlobalAttributes, Value } from "../../types/index.ts"

import { MATCHERS } from "../../guards/constants/index.ts"

/**
 * Checks if a value is a valid number string
 *
 * @param value - The value to check
 * @returns True if the value is a valid number string
 *
 * @example
 * ```typescript
 * isNumber("123") // true
 * isNumber("123.45") // true
 * isNumber("-123") // true
 * isNumber("+123.45") // true
 * isNumber("abc") // false
 * isNumber("") // false
 * ```
 */
export default function isNumber(value: Value): value is number {
	return MATCHERS.number.test(String(value))
}
