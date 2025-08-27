/**
 * Type guard that checks if a value is a boolean primitive
 *
 * Determines whether a value is exactly true or false using the typeof operator.
 * This check is for boolean primitives only and does not include Boolean objects
 * created with new Boolean(). In TypeScript, this narrows the type to boolean,
 * enabling safe boolean operations without type assertions.
 *
 * Boolean detection:
 * - Primitives: true and false literals
 * - Not included: Boolean objects (new Boolean())
 * - Not included: truthy/falsy values (1, 0, "", null, etc.)
 * - Type narrowing: provides TypeScript type guard
 * - No coercion: doesn't convert values, only checks type
 *
 * @pure
 * @predicate
 * @param value - The value to check
 * @returns True if the value is a boolean primitive, false otherwise
 * @example
 * ```typescript
 * // Boolean primitives
 * isBoolean(true)                  // true
 * isBoolean(false)                 // true
 * isBoolean(1 === 1)               // true
 * isBoolean(Boolean(1))            // true (returns primitive)
 *
 * // Not booleans
 * isBoolean(1)                     // false
 * isBoolean(0)                     // false
 * isBoolean("")                    // false
 * isBoolean("true")                // false
 * isBoolean(null)                  // false
 * isBoolean(new Boolean(true))     // false (object)
 *
 * // Type narrowing
 * function toggle(value: unknown): boolean {
 *   if (isBoolean(value)) {
 *     return !value  // TypeScript knows it's boolean
 *   }
 *   return false
 * }
 *
 * // Filtering
 * const mixed = [true, 1, false, 0, "true", null]
 * mixed.filter(isBoolean)          // [true, false]
 * ```
 */
const isBoolean = (value: unknown): value is boolean =>
	typeof value === "boolean"

export default isBoolean
