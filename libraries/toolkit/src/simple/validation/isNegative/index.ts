/**
 * Checks if a value is a negative number
 *
 * Determines whether a value is a finite number less than zero. This includes
 * negative integers and negative decimals, but excludes -0 (which is considered
 * neither positive nor negative in JavaScript), -Infinity, NaN, and non-numeric types.
 * Useful for validation, mathematical operations, and domain checking.
 *
 * Negative number criteria:
 * - Must be of type "number"
 * - Must be finite (not -Infinity or NaN)
 * - Must be less than zero
 * - Excludes -0 (negative zero)
 * - No type coercion
 *
 * @param value - The value to check for negativity
 * @returns True if the value is a negative finite number, false otherwise
 * @example
 * ```typescript
 * // Negative numbers
 * isNegative(-1)                       // true
 * isNegative(-42)                      // true
 * isNegative(-0.5)                     // true
 * isNegative(-999999)                  // true
 * isNegative(-Math.PI)                 // true
 * isNegative(-Number.MIN_VALUE)        // true (smallest negative)
 *
 * // Not negative: positive and zero
 * isNegative(0)                        // false
 * isNegative(-0)                       // false (negative zero)
 * isNegative(1)                        // false
 * isNegative(42)                       // false
 * isNegative(0.5)                      // false
 *
 * // Special numeric values
 * isNegative(-Infinity)                // false (not finite)
 * isNegative(Infinity)                 // false
 * isNegative(NaN)                      // false
 *
 * // Non-numeric types (no coercion)
 * isNegative("-5")                     // false (string)
 * isNegative("-42.5")                  // false (string)
 * isNegative(null)                     // false
 * isNegative(undefined)                // false
 * isNegative(false)                    // false
 * isNegative([-5])                     // false (array)
 * isNegative({})                       // false
 *
 * // Edge cases with -0
 * isNegative(-0)                       // false
 * isNegative(0)                        // false
 * Object.is(-0, 0)                     // false (they're different)
 * -0 < 0                               // false (but we exclude -0)
 *
 * // Filtering negative numbers
 * const numbers = [5, -3, 0, -7, 2, -0, NaN, -Infinity, -1.5]
 * const negatives = numbers.filter(isNegative)
 * // [-3, -7, -1.5]
 *
 * // Financial calculations
 * interface Transaction {
 *   amount: number
 *   description: string
 * }
 *
 * function getDebits(transactions: Array<Transaction>): Array<Transaction> {
 *   return transactions.filter(t => isNegative(t.amount))
 * }
 *
 * const transactions = [
 *   { amount: 100, description: "Deposit" },
 *   { amount: -50, description: "Withdrawal" },
 *   { amount: -25.99, description: "Purchase" }
 * ]
 * getDebits(transactions)
 * // [{ amount: -50, ... }, { amount: -25.99, ... }]
 *
 * // Temperature validation
 * function isBelowFreezing(celsius: unknown): boolean {
 *   return typeof celsius === "number" && isNegative(celsius)
 * }
 *
 * isBelowFreezing(-5)                  // true
 * isBelowFreezing(0)                   // false (freezing point)
 * isBelowFreezing(5)                   // false
 * isBelowFreezing("-5")                // false (string)
 *
 * // Coordinate quadrant detection
 * interface Point {
 *   x: number
 *   y: number
 * }
 *
 * function getQuadrant(point: Point): number | null {
 *   const { x, y } = point
 *   if (x === 0 || y === 0) return null  // On axis
 *
 *   if (!isNegative(x) && !isNegative(y)) return 1
 *   if (isNegative(x) && !isNegative(y)) return 2
 *   if (isNegative(x) && isNegative(y)) return 3
 *   if (!isNegative(x) && isNegative(y)) return 4
 *   return null
 * }
 *
 * getQuadrant({ x: 5, y: 5 })          // 1
 * getQuadrant({ x: -5, y: 5 })         // 2
 * getQuadrant({ x: -5, y: -5 })        // 3
 * getQuadrant({ x: 5, y: -5 })         // 4
 *
 * // Profit/loss calculation
 * function calculateNetResult(values: Array<unknown>): number {
 *   const numbers = values.filter(v =>
 *     typeof v === "number" && Number.isFinite(v)
 *   ) as Array<number>
 *
 *   const losses = numbers.filter(isNegative)
 *   const gains = numbers.filter(n => n > 0)
 *
 *   const totalLoss = losses.reduce((sum, n) => sum + n, 0)
 *   const totalGain = gains.reduce((sum, n) => sum + n, 0)
 *
 *   return totalGain + totalLoss
 * }
 *
 * calculateNetResult([100, -30, 50, -20, NaN, "10"])
 * // 100 (100 + 50 - 30 - 20)
 *
 * // Array index validation
 * function isValidNegativeIndex<T>(
 *   array: Array<T>,
 *   index: unknown
 * ): boolean {
 *   if (typeof index !== "number") return false
 *   return isNegative(index) && index >= -array.length
 * }
 *
 * const arr = ["a", "b", "c"]
 * isValidNegativeIndex(arr, -1)        // true (last element)
 * isValidNegativeIndex(arr, -3)        // true (first element)
 * isValidNegativeIndex(arr, -4)        // false (out of bounds)
 * isValidNegativeIndex(arr, 1)         // false (positive)
 *
 * // Physics calculations
 * function isOppositeDirection(velocity1: number, velocity2: number): boolean {
 *   if (!Number.isFinite(velocity1) || !Number.isFinite(velocity2)) {
 *     return false
 *   }
 *   return isNegative(velocity1) !== isNegative(velocity2)
 * }
 *
 * isOppositeDirection(5, -3)           // true
 * isOppositeDirection(-2, -4)          // false
 * isOppositeDirection(3, 7)            // false
 * isOppositeDirection(0, -5)           // true
 *
 * // Depth/elevation handling
 * function getDepthCategory(meters: unknown): string {
 *   if (!isNegative(meters)) {
 *     return "above sea level"
 *   }
 *
 *   const depth = meters as number
 *   if (depth > -200) return "shallow"
 *   if (depth > -1000) return "moderate"
 *   if (depth > -4000) return "deep"
 *   return "abyssal"
 * }
 *
 * getDepthCategory(100)                // "above sea level"
 * getDepthCategory(-50)                // "shallow"
 * getDepthCategory(-500)               // "moderate"
 * getDepthCategory(-5000)              // "abyssal"
 *
 * // Time zone offset validation
 * function isWesternHemisphere(offsetHours: unknown): boolean {
 *   return typeof offsetHours === "number" &&
 *          isNegative(offsetHours) &&
 *          offsetHours >= -12
 * }
 *
 * isWesternHemisphere(-5)              // true (EST)
 * isWesternHemisphere(-8)              // true (PST)
 * isWesternHemisphere(0)               // false (GMT)
 * isWesternHemisphere(5.5)             // false (IST)
 *
 * // Mathematical domain restrictions
 * function canTakeSquareRoot(value: unknown): boolean {
 *   if (typeof value !== "number") return false
 *   return !isNegative(value)  // sqrt of negative would be NaN
 * }
 *
 * canTakeSquareRoot(9)                 // true
 * canTakeSquareRoot(0)                 // true
 * canTakeSquareRoot(-9)                // false
 * canTakeSquareRoot(NaN)               // false
 *
 * // Sorting with negative numbers first
 * function sortNegativesFirst(numbers: Array<number>): Array<number> {
 *   return numbers.sort((a, b) => {
 *     if (isNegative(a) && !isNegative(b)) return -1
 *     if (!isNegative(a) && isNegative(b)) return 1
 *     return a - b
 *   })
 * }
 *
 * sortNegativesFirst([3, -1, 0, -5, 2, -3])
 * // [-5, -3, -1, 0, 2, 3]
 *
 * // React component prop validation
 * interface SliderProps {
 *   min: number
 *   max: number
 *   value: number
 * }
 *
 * function Slider({ min, max, value }: SliderProps) {
 *   if (isNegative(max - min)) {
 *     throw new Error("Max must be greater than min")
 *   }
 *   // ... render slider
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-safe - Only accepts number type, no coercion
 * @property Finite - Excludes -Infinity
 * @property Zero-aware - Returns false for both 0 and -0
 */
const isNegative = (value: unknown): boolean => {
	return typeof value === "number" &&
		Number.isFinite(value) &&
		value < 0 &&
		!Object.is(value, -0)
}

export default isNegative
