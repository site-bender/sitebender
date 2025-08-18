/**
 * Checks if a value is truthy in JavaScript
 * 
 * Determines whether a value evaluates to true in a boolean context.
 * Any value that is not falsy is truthy. JavaScript has exactly six falsy
 * values (false, 0, -0, "", null, undefined, NaN), and everything else is
 * truthy. This includes empty arrays, empty objects, and all other values.
 * This predicate is useful for filtering, conditional logic, and understanding
 * JavaScript's type coercion behavior.
 * 
 * Truthy values include:
 * - All objects: {}, [], new Date(), etc.
 * - Non-zero numbers: 1, -1, 3.14, Infinity
 * - Non-empty strings: "0", "false", " "
 * - true boolean
 * - Symbols
 * - BigInts (except 0n)
 * 
 * @param value - The value to check for truthiness
 * @returns True if the value is truthy, false if falsy
 * @example
 * ```typescript
 * // Truthy values
 * isTruthy(true)                       // true
 * isTruthy(1)                          // true
 * isTruthy(-1)                         // true
 * isTruthy("hello")                    // true
 * isTruthy("0")                        // true (string "0")
 * isTruthy("false")                    // true (non-empty string)
 * isTruthy(" ")                        // true (whitespace)
 * isTruthy([])                         // true (empty array)
 * isTruthy({})                         // true (empty object)
 * isTruthy(() => {})                   // true (function)
 * isTruthy(new Date())                 // true
 * isTruthy(Infinity)                   // true
 * isTruthy(-Infinity)                  // true
 * isTruthy(Symbol())                   // true
 * isTruthy(3n)                         // true (BigInt)
 * 
 * // Falsy values (return false)
 * isTruthy(false)                      // false
 * isTruthy(0)                          // false
 * isTruthy(-0)                         // false
 * isTruthy("")                         // false (empty string)
 * isTruthy(null)                       // false
 * isTruthy(undefined)                  // false
 * isTruthy(NaN)                        // false
 * isTruthy(0n)                         // false (BigInt zero)
 * 
 * // Surprising truthy values
 * isTruthy(new Boolean(false))         // true (Boolean object)
 * isTruthy(new Number(0))              // true (Number object)
 * isTruthy(new String(""))             // true (String object)
 * isTruthy([0])                        // true (array with falsy value)
 * isTruthy([false])                    // true
 * isTruthy({ a: false })               // true
 * isTruthy("null")                     // true (string "null")
 * isTruthy("undefined")                // true (string "undefined")
 * isTruthy("NaN")                      // true (string "NaN")
 * 
 * // Filtering truthy values
 * const mixed = [0, 1, "", "hello", null, undefined, false, true, NaN, [], {}]
 * const truthy = mixed.filter(isTruthy)
 * // [1, "hello", true, [], {}]
 * 
 * const falsy = mixed.filter(val => !isTruthy(val))
 * // [0, "", null, undefined, false, NaN]
 * 
 * // Compact array (remove falsy values)
 * function compact<T>(array: Array<T>): Array<T> {
 *   return array.filter(isTruthy)
 * }
 * 
 * compact([0, 1, false, 2, "", 3, null, 4])  // [1, 2, 3, 4]
 * compact(["a", "", "b", undefined, "c"])    // ["a", "b", "c"]
 * 
 * // Default value with truthy check
 * function getValueOrDefault<T>(value: T, defaultValue: T): T {
 *   return isTruthy(value) ? value : defaultValue
 * }
 * 
 * getValueOrDefault("", "default")     // "default"
 * getValueOrDefault(0, 100)           // 100
 * getValueOrDefault(false, true)      // true
 * getValueOrDefault([], ["default"])  // [] (empty array is truthy)
 * 
 * // Conditional rendering
 * function render(value: unknown): string {
 *   if (isTruthy(value)) {
 *     return `<div>${String(value)}</div>`
 *   }
 *   return "<div>No content</div>"
 * }
 * 
 * render("Hello")                     // "<div>Hello</div>"
 * render(123)                         // "<div>123</div>"
 * render("")                          // "<div>No content</div>"
 * render(null)                        // "<div>No content</div>"
 * render([1, 2, 3])                   // "<div>1,2,3</div>"
 * 
 * // React conditional rendering
 * function Component({ show, content }: { show: unknown, content: string }) {
 *   return (
 *     <>
 *       {isTruthy(show) && <div>{content}</div>}
 *     </>
 *   )
 * }
 * 
 * // Logical AND with truthy
 * function and(...values: Array<unknown>): unknown {
 *   for (const value of values) {
 *     if (!isTruthy(value)) {
 *       return value  // Return first falsy
 *     }
 *   }
 *   return values[values.length - 1]  // Return last truthy
 * }
 * 
 * and(1, 2, 3)                        // 3
 * and(1, 0, 3)                        // 0
 * and(true, "hello", [])              // []
 * 
 * // Logical OR with truthy
 * function or(...values: Array<unknown>): unknown {
 *   for (const value of values) {
 *     if (isTruthy(value)) {
 *       return value  // Return first truthy
 *     }
 *   }
 *   return values[values.length - 1]  // Return last falsy
 * }
 * 
 * or(0, false, "hello")               // "hello"
 * or(null, undefined, 0)              // 0
 * or(false, 1, 2)                     // 1
 * 
 * // Validation messages
 * function getValidationMessage(value: unknown): string {
 *   if (isTruthy(value)) {
 *     return "Field has value"
 *   }
 *   return "Field is required"
 * }
 * 
 * getValidationMessage("")             // "Field is required"
 * getValidationMessage("text")         // "Field has value"
 * getValidationMessage(0)              // "Field is required"
 * getValidationMessage([])             // "Field has value" (array is truthy!)
 * 
 * // Counter with truthy increment
 * class Counter {
 *   private count = 0
 *   
 *   increment(amount: unknown): void {
 *     if (isTruthy(amount) && typeof amount === "number") {
 *       this.count += amount
 *     } else if (isTruthy(amount)) {
 *       this.count += 1  // Truthy but not number
 *     }
 *   }
 *   
 *   getCount(): number {
 *     return this.count
 *   }
 * }
 * 
 * // Query parameter filtering
 * function buildQuery(params: Record<string, unknown>): string {
 *   const filtered = Object.entries(params)
 *     .filter(([_, value]) => isTruthy(value))
 *     .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
 *   
 *   return filtered.length > 0 ? `?${filtered.join("&")}` : ""
 * }
 * 
 * buildQuery({ 
 *   name: "John",
 *   age: 0,           // Filtered out
 *   city: "",         // Filtered out
 *   active: true 
 * })
 * // "?name=John&active=true"
 * 
 * // Environment check
 * function isProduction(): boolean {
 *   return isTruthy(process.env.NODE_ENV) && 
 *          process.env.NODE_ENV === "production"
 * }
 * 
 * // Feature flag system
 * const features = {
 *   darkMode: true,
 *   beta: false,
 *   experimental: undefined,
 *   legacy: null,
 *   newUI: 1
 * }
 * 
 * function isFeatureEnabled(name: string): boolean {
 *   return isTruthy(features[name as keyof typeof features])
 * }
 * 
 * isFeatureEnabled("darkMode")        // true
 * isFeatureEnabled("beta")            // false
 * isFeatureEnabled("experimental")    // false
 * isFeatureEnabled("newUI")           // true (1 is truthy)
 * 
 * // Type coercion demonstration
 * function coercionDemo(value: unknown): string {
 *   const truthyCheck = isTruthy(value)
 *   const booleanValue = !!value
 *   
 *   return `isTruthy: ${truthyCheck}, !!value: ${booleanValue}, ` +
 *          `if(value): ${value ? "enters" : "skips"}`
 * }
 * 
 * coercionDemo(0)     // "isTruthy: false, !!value: false, if(value): skips"
 * coercionDemo([])    // "isTruthy: true, !!value: true, if(value): enters"
 * coercionDemo("")    // "isTruthy: false, !!value: false, if(value): skips"
 * 
 * // Async value resolution
 * async function resolveIfTruthy(value: unknown): Promise<unknown> {
 *   if (isTruthy(value)) {
 *     if (value instanceof Promise) {
 *       return await value
 *     }
 *     return value
 *   }
 *   return null
 * }
 * 
 * // Memoization with truthy keys
 * const cache = new Map()
 * 
 * function memoize(key: unknown, compute: () => unknown): unknown {
 *   if (isTruthy(key)) {
 *     if (!cache.has(key)) {
 *       cache.set(key, compute())
 *     }
 *     return cache.get(key)
 *   }
 *   return compute()  // Don't cache falsy keys
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Comprehensive - Handles all JavaScript types correctly
 * @property Predictable - Follows JavaScript's boolean coercion rules
 * @property Type-agnostic - Works with any value type
 */
const isTruthy = (value: unknown): boolean => !!value

export default isTruthy