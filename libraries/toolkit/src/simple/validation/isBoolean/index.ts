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
 * @param value - The value to check
 * @returns True if the value is a boolean primitive, false otherwise
 * @example
 * ```typescript
 * // Boolean primitives
 * isBoolean(true)                  // true
 * isBoolean(false)                 // true
 *
 * // Boolean expressions
 * isBoolean(1 === 1)               // true
 * isBoolean(5 > 10)                // true (result is false)
 * isBoolean(!!"hello")             // true (double negation)
 * isBoolean(Boolean(1))            // true (Boolean() returns primitive)
 *
 * // Not booleans (truthy/falsy values)
 * isBoolean(1)                     // false
 * isBoolean(0)                     // false
 * isBoolean("")                    // false
 * isBoolean("true")                // false
 * isBoolean("false")               // false
 * isBoolean(null)                  // false
 * isBoolean(undefined)             // false
 * isBoolean(NaN)                   // false
 *
 * // Boolean objects (not primitives)
 * isBoolean(new Boolean(true))     // false (object, not primitive)
 * isBoolean(new Boolean(false))    // false (object, not primitive)
 *
 * // Other types
 * isBoolean([])                    // false
 * isBoolean({})                    // false
 * isBoolean(() => true)            // false (function)
 * isBoolean(Symbol("bool"))        // false
 *
 * // Type narrowing in TypeScript
 * function toggle(value: unknown): boolean {
 *   if (isBoolean(value)) {
 *     // TypeScript knows value is boolean here
 *     return !value
 *   }
 *   return false
 * }
 *
 * toggle(true)                     // false
 * toggle(false)                    // true
 * toggle("true")                   // false (not a boolean)
 *
 * // Filtering boolean values
 * const mixed = [true, 1, false, 0, "true", null, Boolean(1)]
 * const booleans = mixed.filter(isBoolean)
 * // [true, false, true] (Boolean(1) returns primitive true)
 *
 * // Configuration validation
 * interface Config {
 *   enabled?: unknown
 *   debug?: unknown
 *   verbose?: unknown
 * }
 *
 * function validateConfig(config: Config): boolean {
 *   const flags = [config.enabled, config.debug, config.verbose]
 *   return flags.every(flag =>
 *     flag === undefined || isBoolean(flag)
 *   )
 * }
 *
 * validateConfig({ enabled: true, debug: false })  // true
 * validateConfig({ enabled: "yes", debug: false })  // false
 * validateConfig({ verbose: 1 })                    // false
 *
 * // Boolean flag parsing
 * function parseFlag(value: unknown): boolean | null {
 *   if (isBoolean(value)) {
 *     return value
 *   }
 *   if (value === "true") return true
 *   if (value === "false") return false
 *   return null
 * }
 *
 * parseFlag(true)                  // true
 * parseFlag(false)                 // false
 * parseFlag("true")                // true (parsed)
 * parseFlag("false")               // false (parsed)
 * parseFlag("yes")                 // null (invalid)
 * parseFlag(1)                     // null (invalid)
 *
 * // React prop validation
 * interface Props {
 *   visible: boolean
 *   disabled: boolean
 *   checked?: boolean
 * }
 *
 * function validateProps(props: unknown): props is Props {
 *   if (!props || typeof props !== "object") return false
 *   const p = props as Record<string, unknown>
 *
 *   return isBoolean(p.visible) &&
 *          isBoolean(p.disabled) &&
 *          (p.checked === undefined || isBoolean(p.checked))
 * }
 *
 * // API response validation
 * interface ApiResponse {
 *   success: unknown
 *   data: unknown
 * }
 *
 * function isValidResponse(response: ApiResponse): boolean {
 *   return isBoolean(response.success) && response.success === true
 * }
 *
 * isValidResponse({ success: true, data: {} })      // true
 * isValidResponse({ success: "true", data: {} })    // false
 * isValidResponse({ success: 1, data: {} })         // false
 *
 * // State machine transitions
 * type State = {
 *   isLoading: boolean
 *   hasError: boolean
 *   isComplete: boolean
 * }
 *
 * function validateState(state: unknown): state is State {
 *   if (!state || typeof state !== "object") return false
 *   const s = state as Record<string, unknown>
 *
 *   return isBoolean(s.isLoading) &&
 *          isBoolean(s.hasError) &&
 *          isBoolean(s.isComplete)
 * }
 *
 * // Exclusive boolean check (XOR)
 * function xorFlags(...values: Array<unknown>): boolean {
 *   const booleans = values.filter(isBoolean) as Array<boolean>
 *   if (booleans.length !== values.length) {
 *     throw new Error("All values must be booleans")
 *   }
 *   return booleans.filter(b => b).length === 1
 * }
 *
 * xorFlags(true, false, false)     // true (exactly one true)
 * xorFlags(true, true, false)      // false (two true)
 * xorFlags(false, false, false)    // false (none true)
 *
 * // Feature flag system
 * const features = new Map<string, unknown>([
 *   ["darkMode", true],
 *   ["betaFeatures", false],
 *   ["analytics", "enabled"],  // wrong type
 *   ["newUI", true]
 * ])
 *
 * function getFeatureFlags(): Map<string, boolean> {
 *   const valid = new Map<string, boolean>()
 *   features.forEach((value, key) => {
 *     if (isBoolean(value)) {
 *       valid.set(key, value)
 *     }
 *   })
 *   return valid
 * }
 * // Returns Map with only darkMode, betaFeatures, and newUI
 *
 * // Truthiness vs boolean check
 * function checkTruthy(value: unknown): string {
 *   if (isBoolean(value)) {
 *     return `Boolean: ${value}`
 *   }
 *   return value ? "Truthy non-boolean" : "Falsy non-boolean"
 * }
 *
 * checkTruthy(true)                // "Boolean: true"
 * checkTruthy(false)               // "Boolean: false"
 * checkTruthy(1)                   // "Truthy non-boolean"
 * checkTruthy(0)                   // "Falsy non-boolean"
 * checkTruthy("")                  // "Falsy non-boolean"
 * checkTruthy("text")              // "Truthy non-boolean"
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to boolean
 * @property Primitive - Only checks for boolean primitives, not objects
 * @property Exact - No type coercion or truthiness evaluation
 */
const isBoolean = (value: unknown): value is boolean =>
	typeof value === "boolean"

export default isBoolean
