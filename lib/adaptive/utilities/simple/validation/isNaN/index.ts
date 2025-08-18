/**
 * Checks if a value is NaN (Not a Number)
 * 
 * Determines whether a value is the special NaN value using Number.isNaN().
 * This is the only reliable way to check for NaN since NaN !== NaN in JavaScript.
 * Unlike the global isNaN() function, Number.isNaN() doesn't coerce the value,
 * making it type-safe. NaN typically results from invalid mathematical operations
 * or failed number conversions.
 * 
 * NaN detection:
 * - Only returns true for actual NaN value
 * - No type coercion (unlike global isNaN)
 * - NaN is the only value that is not equal to itself
 * - Common sources: 0/0, Math.sqrt(-1), parseInt("abc")
 * - Type-safe: non-numbers always return false
 * 
 * @param value - The value to check for NaN
 * @returns True if the value is NaN, false otherwise
 * @example
 * ```typescript
 * // Actual NaN values
 * isNaN(NaN)                           // true
 * isNaN(Number.NaN)                    // true
 * isNaN(0 / 0)                         // true
 * isNaN(Infinity / Infinity)           // true
 * isNaN(Infinity - Infinity)           // true
 * isNaN(Math.sqrt(-1))                 // true
 * isNaN(Math.log(-1))                  // true
 * 
 * // Parsing failures
 * isNaN(parseInt("abc"))               // true
 * isNaN(parseFloat("not a number"))    // true
 * isNaN(Number("xyz"))                 // true
 * isNaN(+"invalid")                    // true
 * 
 * // Not NaN (valid numbers)
 * isNaN(0)                             // false
 * isNaN(1)                             // false
 * isNaN(-1)                            // false
 * isNaN(3.14)                          // false
 * isNaN(Infinity)                      // false
 * isNaN(-Infinity)                     // false
 * 
 * // Non-numbers (no coercion)
 * isNaN("NaN")                         // false (string)
 * isNaN("123")                         // false (string)
 * isNaN(null)                          // false
 * isNaN(undefined)                     // false
 * isNaN(true)                          // false
 * isNaN(false)                         // false
 * isNaN([])                            // false
 * isNaN({})                            // false
 * 
 * // Comparison with global isNaN()
 * isNaN("hello")                       // false (our function)
 * globalThis.isNaN("hello")            // true (coerces to NaN)
 * 
 * isNaN(undefined)                     // false (our function)
 * globalThis.isNaN(undefined)          // true (coerces to NaN)
 * 
 * // NaN's unique property
 * const value = NaN
 * isNaN(value)                         // true
 * value === value                      // false (only NaN !== NaN)
 * value !== value                      // true (self-inequality test)
 * 
 * // Filtering out NaN values
 * const numbers = [1, NaN, 2, 0/0, 3, Math.sqrt(-1), 4]
 * const validNumbers = numbers.filter(n => !isNaN(n))
 * // [1, 2, 3, 4]
 * 
 * const onlyNaN = numbers.filter(isNaN)
 * // [NaN, NaN, NaN] (all three NaN values)
 * 
 * // Safe mathematical operations
 * function safeDivide(a: number, b: number): number | null {
 *   const result = a / b
 *   return isNaN(result) ? null : result
 * }
 * 
 * safeDivide(10, 2)                    // 5
 * safeDivide(0, 0)                     // null (0/0 is NaN)
 * safeDivide(10, 0)                    // Infinity (not NaN)
 * 
 * // Input validation
 * function validateNumber(input: string): number | string {
 *   const num = parseFloat(input)
 *   if (isNaN(num)) {
 *     return "Invalid number"
 *   }
 *   return num
 * }
 * 
 * validateNumber("123.45")             // 123.45
 * validateNumber("abc")                // "Invalid number"
 * validateNumber("12.34.56")           // 12.34 (parseFloat stops at second dot)
 * validateNumber("")                   // "Invalid number"
 * 
 * // Statistics with NaN handling
 * function average(values: Array<number>): number | null {
 *   const validValues = values.filter(v => !isNaN(v))
 *   if (validValues.length === 0) return null
 *   
 *   const sum = validValues.reduce((a, b) => a + b, 0)
 *   return sum / validValues.length
 * }
 * 
 * average([1, 2, NaN, 3, 4])          // 2.5 (ignores NaN)
 * average([NaN, NaN])                  // null (no valid values)
 * average([])                          // null
 * 
 * // JSON serialization (NaN becomes null)
 * function sanitizeForJSON(value: unknown): unknown {
 *   if (isNaN(value)) {
 *     return null
 *   }
 *   return value
 * }
 * 
 * JSON.stringify({ value: NaN })       // '{"value":null}'
 * JSON.stringify({ value: sanitizeForJSON(NaN) }) // '{"value":null}'
 * 
 * // Array index safety
 * function safeArrayAccess<T>(arr: Array<T>, index: number): T | undefined {
 *   if (isNaN(index) || index < 0 || index >= arr.length) {
 *     return undefined
 *   }
 *   return arr[index]
 * }
 * 
 * const arr = ["a", "b", "c"]
 * safeArrayAccess(arr, 1)              // "b"
 * safeArrayAccess(arr, NaN)            // undefined
 * safeArrayAccess(arr, 0/0)            // undefined
 * 
 * // Coordinate validation
 * interface Point {
 *   x: number
 *   y: number
 * }
 * 
 * function isValidPoint(point: Point): boolean {
 *   return !isNaN(point.x) && !isNaN(point.y)
 * }
 * 
 * isValidPoint({ x: 10, y: 20 })       // true
 * isValidPoint({ x: NaN, y: 20 })      // false
 * isValidPoint({ x: 10, y: 0/0 })      // false
 * 
 * // Calculation chain with NaN propagation
 * function calculate(values: Array<number>): number {
 *   return values.reduce((acc, val) => {
 *     if (isNaN(acc) || isNaN(val)) {
 *       return NaN  // Propagate NaN
 *     }
 *     return acc + val
 *   }, 0)
 * }
 * 
 * calculate([1, 2, 3])                 // 6
 * calculate([1, NaN, 3])               // NaN
 * calculate([])                        // 0
 * 
 * // React component props validation
 * interface Props {
 *   width: number
 *   height: number
 * }
 * 
 * function Component({ width, height }: Props) {
 *   if (isNaN(width) || isNaN(height)) {
 *     return <div>Invalid dimensions</div>
 *   }
 *   return <div style={{ width, height }}>Content</div>
 * }
 * 
 * // Mathematical function domain checking
 * function safeSqrt(value: number): number | null {
 *   if (value < 0) return null  // Would produce NaN
 *   const result = Math.sqrt(value)
 *   return isNaN(result) ? null : result
 * }
 * 
 * safeSqrt(9)                          // 3
 * safeSqrt(-9)                         // null
 * safeSqrt(NaN)                        // null
 * 
 * // Sensor data validation
 * interface SensorReading {
 *   temperature: number
 *   humidity: number
 *   pressure: number
 * }
 * 
 * function validateReading(reading: SensorReading): boolean {
 *   return !isNaN(reading.temperature) &&
 *          !isNaN(reading.humidity) &&
 *          !isNaN(reading.pressure)
 * }
 * 
 * // Alternative NaN detection methods
 * function isNaNAlternative(value: unknown): boolean {
 *   // Using self-inequality (NaN is the only value !== itself)
 *   return value !== value
 * }
 * 
 * function isNaNStrict(value: unknown): boolean {
 *   // Combining type check with Number.isNaN
 *   return typeof value === "number" && Number.isNaN(value)
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-safe - Uses Number.isNaN, no type coercion
 * @property Specific - Only returns true for actual NaN value
 * @property Reliable - The only correct way to test for NaN
 */
const isNaN = (value: unknown): value is number => 
	Number.isNaN(value)

export default isNaN