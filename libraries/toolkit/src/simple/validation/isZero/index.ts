/**
 * Checks if a value is zero
 * 
 * Determines whether a value is exactly zero (0), including positive zero (+0)
 * and negative zero (-0). Uses strict equality checking without type coercion.
 * Returns false for non-numeric values, even those that might coerce to zero
 * like false, "", or null. This is useful for mathematical operations, boundary
 * conditions, and division safety checks.
 * 
 * Zero detection:
 * - Positive zero: 0 or +0
 * - Negative zero: -0 (treated as equal to 0)
 * - Not zero: false, null, "", "0", [], etc.
 * - Type-safe: only returns true for number type
 * - No coercion: strict type and value checking
 * 
 * @param value - The value to check for zero
 * @returns True if the value is exactly 0, false otherwise
 * @example
 * ```typescript
 * // Zero values
 * isZero(0)                            // true
 * isZero(+0)                           // true
 * isZero(-0)                           // true
 * isZero(0.0)                          // true
 * isZero(0e10)                         // true
 * isZero(0x0)                          // true
 * 
 * // Not zero: other numbers
 * isZero(1)                            // false
 * isZero(-1)                           // false
 * isZero(0.1)                          // false
 * isZero(0.0001)                       // false
 * isZero(Infinity)                     // false
 * isZero(-Infinity)                    // false
 * isZero(NaN)                          // false
 * 
 * // Not zero: non-numbers (no coercion)
 * isZero("0")                          // false (string)
 * isZero("")                           // false (empty string)
 * isZero(false)                        // false (boolean)
 * isZero(null)                         // false
 * isZero(undefined)                    // false
 * isZero([])                           // false (empty array)
 * isZero([0])                          // false (array with zero)
 * isZero({})                           // false
 * 
 * // Division safety check
 * function safeDivide(a: number, b: unknown): number | null {
 *   if (isZero(b)) {
 *     return null  // Avoid division by zero
 *   }
 *   if (typeof b === "number") {
 *     return a / b
 *   }
 *   return null
 * }
 * 
 * safeDivide(10, 2)                    // 5
 * safeDivide(10, 0)                    // null
 * safeDivide(10, -0)                   // null
 * safeDivide(10, "2")                  // null (not a number)
 * 
 * // Array filtering
 * const numbers = [0, 1, -0, 2, 0.0, 3, NaN, 0]
 * const zeros = numbers.filter(isZero)
 * // [0, -0, 0.0, 0]
 * 
 * const nonZeros = numbers.filter(n => 
 *   typeof n === "number" && !isZero(n) && !isNaN(n)
 * )
 * // [1, 2, 3]
 * 
 * // Counter reset detection
 * class Counter {
 *   private value: number = 0
 *   
 *   increment(): void {
 *     this.value++
 *   }
 *   
 *   decrement(): void {
 *     this.value--
 *   }
 *   
 *   reset(): void {
 *     this.value = 0
 *   }
 *   
 *   isReset(): boolean {
 *     return isZero(this.value)
 *   }
 * }
 * 
 * // Mathematical operations
 * function isOrigin(x: unknown, y: unknown): boolean {
 *   return isZero(x) && isZero(y)
 * }
 * 
 * isOrigin(0, 0)                       // true
 * isOrigin(0, -0)                      // true
 * isOrigin(1, 0)                       // false
 * isOrigin("0", "0")                   // false
 * 
 * // Sign determination
 * function getSign(value: unknown): string {
 *   if (typeof value !== "number") return "not a number"
 *   if (isNaN(value)) return "NaN"
 *   if (isZero(value)) return "zero"
 *   return value > 0 ? "positive" : "negative"
 * }
 * 
 * getSign(5)                           // "positive"
 * getSign(-3)                          // "negative"
 * getSign(0)                           // "zero"
 * getSign(-0)                          // "zero"
 * getSign(NaN)                         // "NaN"
 * getSign("0")                         // "not a number"
 * 
 * // Balance checking
 * interface Account {
 *   balance: number
 *   overdraft: number
 * }
 * 
 * function isEmpty(account: Account): boolean {
 *   return isZero(account.balance) && isZero(account.overdraft)
 * }
 * 
 * isEmpty({ balance: 0, overdraft: 0 })    // true
 * isEmpty({ balance: 100, overdraft: 0 })  // false
 * isEmpty({ balance: 0, overdraft: -50 })  // false
 * 
 * // Progress tracking
 * function calculateProgress(current: number, total: number): string {
 *   if (isZero(total)) {
 *     return "Cannot calculate (total is zero)"
 *   }
 *   if (isZero(current)) {
 *     return "Not started (0%)"
 *   }
 *   const percent = (current / total) * 100
 *   return `${percent.toFixed(1)}% complete`
 * }
 * 
 * calculateProgress(0, 100)            // "Not started (0%)"
 * calculateProgress(50, 100)           // "50.0% complete"
 * calculateProgress(10, 0)             // "Cannot calculate (total is zero)"
 * 
 * // Matrix operations
 * function isZeroMatrix(matrix: unknown[][]): boolean {
 *   return matrix.every(row => 
 *     row.every(isZero)
 *   )
 * }
 * 
 * isZeroMatrix([[0, 0], [0, 0]])       // true
 * isZeroMatrix([[0, 0], [0, 1]])       // false
 * isZeroMatrix([[0, -0], [+0, 0.0]])   // true
 * 
 * // Epsilon comparison
 * function isEffectivelyZero(value: unknown, epsilon = 1e-10): boolean {
 *   if (typeof value !== "number") return false
 *   return Math.abs(value) < epsilon
 * }
 * 
 * isEffectivelyZero(0)                 // true
 * isEffectivelyZero(0.0000000001)      // true (within epsilon)
 * isEffectivelyZero(0.001)             // false
 * 
 * // React component prop
 * interface CounterProps {
 *   count: unknown
 * }
 * 
 * function CounterDisplay({ count }: CounterProps) {
 *   if (isZero(count)) {
 *     return <div>Counter is at zero</div>
 *   }
 *   if (typeof count === "number") {
 *     return <div>Count: {count}</div>
 *   }
 *   return <div>Invalid count</div>
 * }
 * 
 * // Statistical analysis
 * function hasNoVariance(values: number[]): boolean {
 *   if (values.length === 0) return true
 *   const mean = values.reduce((a, b) => a + b, 0) / values.length
 *   const variance = values.reduce((sum, val) => 
 *     sum + Math.pow(val - mean, 2), 0
 *   ) / values.length
 *   return isZero(variance)
 * }
 * 
 * hasNoVariance([5, 5, 5, 5])          // true
 * hasNoVariance([1, 2, 3, 4])          // false
 * hasNoVariance([0, 0, 0])             // true
 * 
 * // Vector magnitude
 * function isZeroVector(...components: unknown[]): boolean {
 *   return components.every(isZero)
 * }
 * 
 * isZeroVector(0, 0, 0)                // true
 * isZeroVector(0, 0, 1)                // false
 * isZeroVector(0, -0, +0)              // true
 * 
 * // Null vs zero distinction
 * function getValue(value: unknown): string {
 *   if (value === null) return "null"
 *   if (value === undefined) return "undefined"
 *   if (isZero(value)) return "zero"
 *   return String(value)
 * }
 * 
 * getValue(0)                          // "zero"
 * getValue(null)                       // "null"
 * getValue(false)                      // "false"
 * getValue("")                         // ""
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-safe - Only returns true for number type zero
 * @property Exact - No type coercion, strict equality check
 * @property Zero-forms - Handles +0, -0, and 0 as equal
 */
const isZero = (value: unknown): boolean => 
	value === 0

export default isZero