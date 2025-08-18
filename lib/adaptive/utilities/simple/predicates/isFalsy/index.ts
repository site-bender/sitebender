/**
 * Checks if a value is falsy in JavaScript
 * 
 * Determines whether a value evaluates to false in a boolean context.
 * JavaScript has exactly six falsy values: false, 0, -0, "", null, undefined,
 * and NaN. All other values are truthy. This predicate is useful for filtering,
 * conditional logic, and understanding JavaScript's type coercion behavior.
 * 
 * Falsy values in JavaScript:
 * - false: The boolean false
 * - 0: The number zero (including -0)
 * - "": Empty string
 * - null: The null value
 * - undefined: The undefined value
 * - NaN: Not a Number
 * 
 * @param value - The value to check for falsiness
 * @returns True if the value is falsy, false if truthy
 * @example
 * ```typescript
 * // The six falsy values
 * isFalsy(false)                       // true
 * isFalsy(0)                           // true
 * isFalsy(-0)                          // true
 * isFalsy("")                          // true
 * isFalsy(null)                        // true
 * isFalsy(undefined)                   // true
 * isFalsy(NaN)                         // true
 * 
 * // Everything else is truthy (returns false)
 * isFalsy(true)                        // false
 * isFalsy(1)                           // false
 * isFalsy(-1)                          // false
 * isFalsy("0")                         // false (string "0")
 * isFalsy("false")                     // false (non-empty string)
 * isFalsy(" ")                         // false (whitespace)
 * isFalsy([])                          // false (empty array)
 * isFalsy({})                          // false (empty object)
 * isFalsy(() => {})                    // false (function)
 * 
 * // Surprising truthy values
 * isFalsy(new Boolean(false))          // false (Boolean object)
 * isFalsy(new Number(0))               // false (Number object)
 * isFalsy(new String(""))              // false (String object)
 * isFalsy([0])                         // false (array with falsy value)
 * isFalsy("null")                      // false (string "null")
 * isFalsy("undefined")                 // false (string "undefined")
 * isFalsy("NaN")                       // false (string "NaN")
 * isFalsy(Infinity)                    // false
 * isFalsy(-Infinity)                   // false
 * 
 * // Filtering out falsy values
 * const mixed = [0, 1, "", "hello", null, undefined, false, true, NaN, []]
 * const truthy = mixed.filter(val => !isFalsy(val))
 * // [1, "hello", true, []]
 * 
 * const falsy = mixed.filter(isFalsy)
 * // [0, "", null, undefined, false, NaN]
 * 
 * // Default value assignment
 * function getConfig(userValue: unknown, defaultValue: string): string {
 *   return isFalsy(userValue) ? defaultValue : String(userValue)
 * }
 * 
 * getConfig(null, "default")           // "default"
 * getConfig("", "default")             // "default"
 * getConfig(0, "default")              // "default"
 * getConfig("custom", "default")       // "custom"
 * getConfig(false, "default")          // "default"
 * 
 * // Validation helper
 * function validateInput(value: unknown): string | null {
 *   if (isFalsy(value)) {
 *     return "Value is required"
 *   }
 *   return null
 * }
 * 
 * validateInput("")                    // "Value is required"
 * validateInput(null)                  // "Value is required"
 * validateInput(0)                     // "Value is required"
 * validateInput("valid")               // null
 * validateInput([])                    // null (empty array is truthy)
 * 
 * // React conditional rendering
 * function Component({ value }: { value: unknown }) {
 *   if (isFalsy(value)) {
 *     return <div>No value provided</div>
 *   }
 *   return <div>Value: {String(value)}</div>
 * }
 * 
 * // Short-circuit evaluation comparison
 * function getFallback<T>(primary: T, fallback: T): T {
 *   // Using isFalsy explicitly
 *   return isFalsy(primary) ? fallback : primary
 * }
 * 
 * getFallback("", "default")           // "default"
 * getFallback(0, 100)                  // 100
 * getFallback(false, true)             // true
 * getFallback([], ["default"])         // [] (empty array is truthy)
 * 
 * // Nullish vs falsy comparison
 * function compareChecks(value: unknown): string {
 *   const isNull = value == null
 *   const isFalsyVal = isFalsy(value)
 *   
 *   if (isNull && isFalsyVal) return "nullish and falsy"
 *   if (isFalsyVal) return "falsy but not nullish"
 *   return "truthy"
 * }
 * 
 * compareChecks(null)                  // "nullish and falsy"
 * compareChecks(undefined)             // "nullish and falsy"
 * compareChecks(0)                     // "falsy but not nullish"
 * compareChecks("")                    // "falsy but not nullish"
 * compareChecks([])                    // "truthy"
 * 
 * // Form field validation
 * interface FormData {
 *   name: unknown
 *   age: unknown
 *   email: unknown
 * }
 * 
 * function validateForm(data: FormData): Array<string> {
 *   const errors: Array<string> = []
 *   
 *   if (isFalsy(data.name)) errors.push("Name is required")
 *   if (isFalsy(data.email)) errors.push("Email is required")
 *   // Note: age of 0 would be considered falsy!
 *   if (data.age !== 0 && isFalsy(data.age)) {
 *     errors.push("Age is required")
 *   }
 *   
 *   return errors
 * }
 * 
 * // Chaining with other predicates
 * function isEmptyOrFalsy(value: unknown): boolean {
 *   if (isFalsy(value)) return true
 *   if (Array.isArray(value)) return value.length === 0
 *   if (typeof value === "object" && value !== null) {
 *     return Object.keys(value).length === 0
 *   }
 *   return false
 * }
 * 
 * isEmptyOrFalsy("")                   // true (falsy)
 * isEmptyOrFalsy([])                   // true (empty)
 * isEmptyOrFalsy({})                   // true (empty)
 * isEmptyOrFalsy(0)                    // true (falsy)
 * isEmptyOrFalsy([1])                  // false
 * 
 * // Type coercion demonstration
 * function coercionExample(value: unknown): string {
 *   return isFalsy(value) 
 *     ? `${value} is falsy (!!${value} = ${!!value})`
 *     : `${value} is truthy (!!${value} = ${!!value})`
 * }
 * 
 * coercionExample(0)                   // "0 is falsy (!!0 = false)"
 * coercionExample("0")                 // "0 is truthy (!!0 = true)"
 * coercionExample(false)               // "false is falsy (!!false = false)"
 * coercionExample("false")             // "false is truthy (!!false = true)"
 * 
 * // Async operation with falsy check
 * async function fetchData(id: unknown): Promise<unknown> {
 *   if (isFalsy(id)) {
 *     throw new Error("Valid ID required")
 *   }
 *   // ... fetch implementation
 *   return { id, data: "..." }
 * }
 * 
 * // Special numeric checks
 * const numbers = [0, -0, 1, -1, NaN, Infinity, -Infinity]
 * const falsyNumbers = numbers.filter(isFalsy)
 * // [0, -0, NaN]
 * 
 * // Document.all special case (browser only)
 * // Note: document.all is a special case that's truthy but == false
 * // isFalsy(document.all) would return false in browsers
 * 
 * // Logical operations
 * function and(a: unknown, b: unknown): unknown {
 *   return isFalsy(a) ? a : b
 * }
 * 
 * function or(a: unknown, b: unknown): unknown {
 *   return isFalsy(a) ? b : a
 * }
 * 
 * and(0, 5)                            // 0
 * and(1, 5)                            // 5
 * or(0, 5)                             // 5
 * or(1, 5)                             // 1
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Exhaustive - Checks all six JavaScript falsy values
 * @property Predictable - Follows JavaScript's boolean coercion rules
 * @property Type-agnostic - Works with any value type
 */
const isFalsy = (value: unknown): boolean => !value

export default isFalsy