/**
 * Checks if a value is a positive number
 *
 * Determines whether a value is a finite number greater than zero. This includes
 * positive integers and positive decimals, but excludes 0, +0 (which are neither
 * positive nor negative), Infinity, NaN, and non-numeric types. Useful for validation,
 * mathematical operations, and domain checking where positive values are required.
 *
 * Positive number criteria:
 * - Must be of type "number"
 * - Must be finite (not Infinity or NaN)
 * - Must be greater than zero
 * - Excludes zero (0 and +0)
 * - No type coercion
 *
 * @param value - The value to check for positivity
 * @returns True if the value is a positive finite number, false otherwise
 * @example
 * ```typescript
 * // Positive numbers
 * isPositive(1)                        // true
 * isPositive(42)                       // true
 * isPositive(0.5)                      // true
 * isPositive(999999)                   // true
 * isPositive(Math.PI)                  // true
 * isPositive(Number.MIN_VALUE)         // true (smallest positive)
 * isPositive(Number.MAX_VALUE)         // true (largest finite)
 *
 * // Not positive: zero and negative
 * isPositive(0)                        // false (zero not positive)
 * isPositive(+0)                       // false
 * isPositive(-0)                       // false
 * isPositive(-1)                       // false
 * isPositive(-42)                      // false
 * isPositive(-0.5)                     // false
 *
 * // Special numeric values
 * isPositive(Infinity)                 // false (not finite)
 * isPositive(-Infinity)                // false
 * isPositive(NaN)                      // false
 *
 * // Non-numeric types (no coercion)
 * isPositive("5")                      // false (string)
 * isPositive("42.5")                   // false (string)
 * isPositive(null)                     // false
 * isPositive(undefined)                // false
 * isPositive(true)                     // false
 * isPositive([5])                      // false (array)
 * isPositive({})                       // false
 *
 * // Filtering positive numbers
 * const numbers = [5, -3, 0, 7, -2, 0.1, NaN, Infinity, -0.5]
 * const positives = numbers.filter(isPositive)
 * // [5, 7, 0.1]
 *
 * // Financial calculations
 * interface Transaction {
 *   amount: number
 *   description: string
 * }
 *
 * function getCredits(transactions: Array<Transaction>): Array<Transaction> {
 *   return transactions.filter(t => isPositive(t.amount))
 * }
 *
 * const transactions = [
 *   { amount: 100, description: "Deposit" },
 *   { amount: -50, description: "Withdrawal" },
 *   { amount: 0, description: "Balance check" },
 *   { amount: 25.50, description: "Interest" }
 * ]
 * getCredits(transactions)
 * // [{ amount: 100, ... }, { amount: 25.50, ... }]
 *
 * // Temperature validation (Kelvin scale)
 * function isValidKelvin(temp: unknown): boolean {
 *   return typeof temp === "number" && isPositive(temp)
 * }
 *
 * isValidKelvin(273.15)               // true (0°C in Kelvin)
 * isValidKelvin(0)                    // false (absolute zero)
 * isValidKelvin(-100)                 // false (impossible)
 * isValidKelvin("273")                // false (string)
 *
 * // Age validation
 * function isValidAge(age: unknown): boolean {
 *   return isPositive(age) &&
 *          Number.isInteger(age as number) &&
 *          (age as number) <= 150
 * }
 *
 * isValidAge(25)                      // true
 * isValidAge(0)                       // false (not positive)
 * isValidAge(-5)                      // false
 * isValidAge(25.5)                    // false (not integer)
 * isValidAge(200)                     // false (too high)
 *
 * // Dimension validation
 * interface Dimensions {
 *   width: number
 *   height: number
 *   depth?: number
 * }
 *
 * function validateDimensions(dims: Dimensions): boolean {
 *   if (!isPositive(dims.width) || !isPositive(dims.height)) {
 *     return false
 *   }
 *   if (dims.depth !== undefined && !isPositive(dims.depth)) {
 *     return false
 *   }
 *   return true
 * }
 *
 * validateDimensions({ width: 10, height: 20 })        // true
 * validateDimensions({ width: 10, height: 0 })         // false
 * validateDimensions({ width: 10, height: 20, depth: -5 }) // false
 *
 * // Price validation
 * function isValidPrice(price: unknown): boolean {
 *   return isPositive(price) &&
 *          Number.isFinite(price as number) &&
 *          (price as number) < 1000000
 * }
 *
 * isValidPrice(9.99)                  // true
 * isValidPrice(0)                     // false (free items need special handling)
 * isValidPrice(-10)                   // false (no negative prices)
 * isValidPrice(Infinity)              // false
 * isValidPrice("9.99")                // false (string)
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
 *   if (isPositive(x) && isPositive(y)) return 1
 *   if (!isPositive(x) && x < 0 && isPositive(y)) return 2
 *   if (!isPositive(x) && x < 0 && !isPositive(y) && y < 0) return 3
 *   if (isPositive(x) && !isPositive(y) && y < 0) return 4
 *   return null
 * }
 *
 * getQuadrant({ x: 5, y: 5 })         // 1
 * getQuadrant({ x: -5, y: 5 })        // 2
 * getQuadrant({ x: -5, y: -5 })       // 3
 * getQuadrant({ x: 5, y: -5 })        // 4
 * getQuadrant({ x: 0, y: 5 })         // null (on y-axis)
 *
 * // Speed/velocity validation
 * function isMovingForward(velocity: unknown): boolean {
 *   return isPositive(velocity)
 * }
 *
 * isMovingForward(10)                 // true
 * isMovingForward(0)                  // false (stationary)
 * isMovingForward(-10)                // false (backward)
 *
 * // Growth rate calculation
 * function calculateGrowth(oldValue: number, newValue: number): string {
 *   const difference = newValue - oldValue
 *   const rate = oldValue === 0 ? 0 : (difference / oldValue) * 100
 *
 *   if (isPositive(rate)) {
 *     return `${rate.toFixed(2)}% increase`
 *   } else if (rate < 0) {
 *     return `${Math.abs(rate).toFixed(2)}% decrease`
 *   }
 *   return "No change"
 * }
 *
 * calculateGrowth(100, 150)           // "50.00% increase"
 * calculateGrowth(100, 100)           // "No change"
 * calculateGrowth(100, 75)            // "25.00% decrease"
 *
 * // Array index from end
 * function getFromEnd<T>(array: Array<T>, distance: unknown): T | undefined {
 *   if (!isPositive(distance)) return undefined
 *
 *   const index = array.length - (distance as number)
 *   if (index < 0 || index >= array.length) return undefined
 *
 *   return array[Math.floor(index)]
 * }
 *
 * const arr = ["a", "b", "c", "d"]
 * getFromEnd(arr, 1)                  // "d" (last)
 * getFromEnd(arr, 2)                  // "c" (second from last)
 * getFromEnd(arr, 0)                  // undefined (not positive)
 * getFromEnd(arr, 10)                 // undefined (out of bounds)
 *
 * // Mathematical domain checking
 * function canTakeLogarithm(value: unknown): boolean {
 *   return isPositive(value)  // log requires positive numbers
 * }
 *
 * function safeLn(value: unknown): number | null {
 *   if (!canTakeLogarithm(value)) return null
 *   return Math.log(value as number)
 * }
 *
 * safeLn(Math.E)                      // 1
 * safeLn(1)                           // 0
 * safeLn(0)                           // null
 * safeLn(-1)                          // null
 *
 * // Time duration validation
 * function isValidDuration(milliseconds: unknown): boolean {
 *   return isPositive(milliseconds) &&
 *          Number.isInteger(milliseconds as number)
 * }
 *
 * function delay(ms: unknown): Promise<void> {
 *   if (!isValidDuration(ms)) {
 *     return Promise.reject(new Error("Invalid duration"))
 *   }
 *   return new Promise(resolve => setTimeout(resolve, ms as number))
 * }
 *
 * // React component validation
 * interface SizeProps {
 *   width?: number
 *   height?: number
 *   scale?: number
 * }
 *
 * function Size({ width, height, scale = 1 }: SizeProps) {
 *   if (width !== undefined && !isPositive(width)) {
 *     throw new Error("Width must be positive")
 *   }
 *   if (height !== undefined && !isPositive(height)) {
 *     throw new Error("Height must be positive")
 *   }
 *   if (!isPositive(scale)) {
 *     throw new Error("Scale must be positive")
 *   }
 *   // ... render component
 * }
 *
 * // Statistical validation
 * function calculateMean(values: Array<unknown>): number | null {
 *   const numbers = values.filter(v =>
 *     typeof v === "number" && Number.isFinite(v)
 *   ) as Array<number>
 *
 *   const positives = numbers.filter(isPositive)
 *   if (positives.length === 0) return null
 *
 *   return positives.reduce((sum, n) => sum + n, 0) / positives.length
 * }
 *
 * calculateMean([1, 2, -3, 0, 4, NaN])  // 2.33... (mean of 1, 2, 4)
 * calculateMean([-1, -2, 0])            // null (no positives)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-safe - Only accepts number type, no coercion
 * @property Finite - Excludes Infinity
 * @property Zero-exclusive - Returns false for 0, +0, and -0
 */
const isPositive = (value: unknown): boolean => {
	return typeof value === "number" &&
		Number.isFinite(value) &&
		value > 0
}

export default isPositive
