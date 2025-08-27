/**
 * Checks if a value is a finite number
 *
 * Determines whether a value is a number that is neither Infinity, -Infinity, nor NaN.
 * This is a type-safe wrapper around Number.isFinite() that first checks if the value
 * is a number type. Finite numbers are actual numeric values that can be used in
 * mathematical calculations without special handling. This is stricter than the global
 * isFinite() which coerces values.
 *
 * Finite number criteria:
 * - Must be of type "number"
 * - Must not be NaN (Not a Number)
 * - Must not be Infinity or -Infinity
 * - Includes all regular numbers, integers, and decimals
 * - Does not coerce strings or other types
 *
 * @param value - The value to check for finiteness
 * @returns True if the value is a finite number, false otherwise
 * @example
 * ```typescript
 * // Finite numbers
 * isFinite(0)                          // true
 * isFinite(1)                          // true
 * isFinite(-1)                         // true
 * isFinite(3.14159)                    // true
 * isFinite(-273.15)                    // true
 * isFinite(Number.MAX_VALUE)           // true
 * isFinite(Number.MIN_VALUE)           // true
 * isFinite(Number.MAX_SAFE_INTEGER)    // true
 * isFinite(Number.MIN_SAFE_INTEGER)    // true
 * isFinite(1e308)                      // true (large but finite)
 *
 * // Not finite: Infinity
 * isFinite(Infinity)                   // false
 * isFinite(-Infinity)                  // false
 * isFinite(Number.POSITIVE_INFINITY)   // false
 * isFinite(Number.NEGATIVE_INFINITY)   // false
 * isFinite(1 / 0)                      // false (Infinity)
 * isFinite(-1 / 0)                     // false (-Infinity)
 *
 * // Not finite: NaN
 * isFinite(NaN)                        // false
 * isFinite(Number.NaN)                 // false
 * isFinite(0 / 0)                      // false (NaN)
 * isFinite(Math.sqrt(-1))              // false (NaN)
 * isFinite(parseInt("abc"))            // false (NaN)
 *
 * // Not numbers (no coercion)
 * isFinite("123")                      // false (string)
 * isFinite("3.14")                     // false (string)
 * isFinite("")                         // false
 * isFinite(null)                       // false
 * isFinite(undefined)                  // false
 * isFinite(true)                       // false
 * isFinite(false)                      // false
 * isFinite([1])                        // false
 * isFinite({})                         // false
 *
 * // Comparison with global isFinite()
 * // Our isFinite doesn't coerce:
 * isFinite("123")                      // false
 * globalThis.isFinite("123")           // true (coerces to 123)
 *
 * isFinite(null)                       // false
 * globalThis.isFinite(null)            // true (coerces to 0)
 *
 * // Mathematical operations safety
 * function safeDivide(a: unknown, b: unknown): number | null {
 *   if (isFinite(a) && isFinite(b) && b !== 0) {
 *     return (a as number) / (b as number)
 *   }
 *   return null
 * }
 *
 * safeDivide(10, 2)                    // 5
 * safeDivide(10, 0)                    // null (would be Infinity)
 * safeDivide(10, NaN)                  // null
 * safeDivide("10", 2)                  // null (string not accepted)
 *
 * // Filtering valid numbers
 * const values = [1, Infinity, NaN, 2.5, -Infinity, 0, "3", null]
 * const finiteNumbers = values.filter(isFinite)
 * // [1, 2.5, 0]
 *
 * // Statistics calculations
 * function calculateMean(values: Array<unknown>): number | null {
 *   const numbers = values.filter(isFinite) as Array<number>
 *   if (numbers.length === 0) return null
 *
 *   const sum = numbers.reduce((a, b) => a + b, 0)
 *   return sum / numbers.length
 * }
 *
 * calculateMean([1, 2, 3, NaN, Infinity, 4])  // 2.5
 * calculateMean([NaN, Infinity])              // null
 * calculateMean([])                           // null
 *
 * // Range validation
 * function isInRange(
 *   value: unknown,
 *   min: number,
 *   max: number
 * ): boolean {
 *   return isFinite(value) &&
 *          value >= min &&
 *          value <= max
 * }
 *
 * isInRange(5, 0, 10)                  // true
 * isInRange(15, 0, 10)                 // false
 * isInRange(Infinity, 0, 10)           // false
 * isInRange(NaN, 0, 10)                // false
 * isInRange("5", 0, 10)                // false
 *
 * // JSON serialization safety
 * function safeJsonNumber(value: unknown): number | null {
 *   if (isFinite(value)) {
 *     return value as number
 *   }
 *   return null // JSON doesn't support Infinity or NaN
 * }
 *
 * const data = {
 *   temperature: 23.5,
 *   pressure: Infinity,
 *   humidity: NaN,
 *   elevation: 1000
 * }
 *
 * const jsonSafe = Object.fromEntries(
 *   Object.entries(data).map(([k, v]) => [k, safeJsonNumber(v)])
 * )
 * // { temperature: 23.5, pressure: null, humidity: null, elevation: 1000 }
 *
 * // Animation frame calculations
 * function calculateProgress(
 *   current: unknown,
 *   total: unknown
 * ): number {
 *   if (!isFinite(current) || !isFinite(total)) {
 *     return 0
 *   }
 *
 *   const curr = current as number
 *   const tot = total as number
 *
 *   if (tot === 0) return 0
 *   return Math.max(0, Math.min(1, curr / tot))
 * }
 *
 * calculateProgress(50, 100)           // 0.5
 * calculateProgress(150, 100)          // 1 (clamped)
 * calculateProgress(50, 0)             // 0 (avoid division by zero)
 * calculateProgress(NaN, 100)          // 0
 * calculateProgress(50, Infinity)      // 0
 *
 * // Scientific calculations
 * function normalizeVector(x: unknown, y: unknown): [number, number] | null {
 *   if (!isFinite(x) || !isFinite(y)) {
 *     return null
 *   }
 *
 *   const magnitude = Math.sqrt(x * x + y * y)
 *   if (magnitude === 0) return [0, 0]
 *
 *   return [x / magnitude, y / magnitude]
 * }
 *
 * normalizeVector(3, 4)                // [0.6, 0.8]
 * normalizeVector(0, 0)                // [0, 0]
 * normalizeVector(Infinity, 4)         // null
 * normalizeVector(3, NaN)              // null
 *
 * // Coordinate validation
 * interface Point {
 *   x: unknown
 *   y: unknown
 * }
 *
 * function isValidPoint(point: Point): boolean {
 *   return isFinite(point.x) && isFinite(point.y)
 * }
 *
 * isValidPoint({ x: 10, y: 20 })       // true
 * isValidPoint({ x: Infinity, y: 20 }) // false
 * isValidPoint({ x: 10, y: NaN })      // false
 * isValidPoint({ x: "10", y: "20" })   // false
 *
 * // Percentage calculations
 * function toPercentage(value: unknown, decimals = 2): string {
 *   if (!isFinite(value)) {
 *     return "N/A"
 *   }
 *   return `${(value * 100).toFixed(decimals)}%`
 * }
 *
 * toPercentage(0.156)                  // "15.60%"
 * toPercentage(1.5)                    // "150.00%"
 * toPercentage(NaN)                    // "N/A"
 * toPercentage(Infinity)               // "N/A"
 * toPercentage("0.156")                // "N/A"
 *
 * // Overflow detection
 * function multiplyWithOverflowCheck(a: unknown, b: unknown): number | null {
 *   if (!isFinite(a) || !isFinite(b)) {
 *     return null
 *   }
 *
 *   const result = (a as number) * (b as number)
 *   return isFinite(result) ? result : null
 * }
 *
 * multiplyWithOverflowCheck(1e308, 2)  // null (overflow to Infinity)
 * multiplyWithOverflowCheck(1e100, 2)  // 2e100
 * multiplyWithOverflowCheck(10, NaN)   // null
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isFinite = (value: unknown): value is number => Number.isFinite(value)

export default isFinite
