import isString from "../isString/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"

//++ Type guard that checks if a value is a non-empty string primitive
/**
 * Type guard that checks if a value is a non-empty string
 *
 * Combines string type checking with emptiness validation.
 * More efficient than separate checks and provides better
 * ergonomics for the common "valid string input" pattern.
 * Uses positive logic: checks what we want, not what we don't.
 *
 * @param value - The value to check
 * @returns Type predicate indicating if the value is a non-empty string
 * @pure
 * @safe
 * @example
 * ```typescript
 * isNonEmptyString("hello")    // true
 * isNonEmptyString("")         // false
 * isNonEmptyString("   ")      // true (whitespace is not empty)
 * isNonEmptyString(123)        // false
 * isNonEmptyString(null)       // false
 *
 * // Perfect for input validation
 * if (isNonEmptyString(userInput)) {
 *   // TypeScript knows userInput is string here
 *   processValidInput(userInput)
 * }
 * ```
 */
export default function isNonEmptyString(value: unknown): value is string {
	return isString(value) && isNotEmpty(value)
}
