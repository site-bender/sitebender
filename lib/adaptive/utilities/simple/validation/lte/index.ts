/**
 * Creates a curried less-than-or-equal comparison predicate
 * 
 * Returns a function that checks if a value is less than or equal to the
 * provided threshold. Uses JavaScript's less-than-or-equal operator with its
 * standard coercion rules for non-numeric values. For strict numeric comparison,
 * ensure both values are numbers. Useful for filtering, validation, and boundary
 * checking.
 * 
 * Comparison rules:
 * - Numeric: standard <= comparison
 * - Strings: lexicographic comparison
 * - Mixed types: JavaScript coercion applies
 * - NaN: always returns false (NaN <= anything is false)
 * - null/undefined: coerced to numbers (null = 0, undefined = NaN)
 * 
 * @param threshold - The value to compare against
 * @returns A predicate function that returns true if input <= threshold
 * @example
 * ```typescript
 * // Numeric comparisons
 * const atMost10 = lte(10)
 * atMost10(5)                          // true
 * atMost10(10)                         // true
 * atMost10(15)                         // false
 * atMost10(-5)                         // true
 * 
 * const nonPositive = lte(0)
 * nonPositive(-1)                      // true
 * nonPositive(0)                       // true
 * nonPositive(1)                       // false
 * 
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20]
 * const atMostTen = numbers.filter(lte(10))
 * // [1, 5, 10]
 * 
 * const nonPositives = [-5, -2, 0, 3, 6].filter(lte(0))
 * // [-5, -2, 0]
 * 
 * // String comparisons (lexicographic)
 * const upToM = lte("m")
 * upToM("apple")                       // true
 * upToM("m")                           // true
 * upToM("zebra")                       // false
 * upToM("Matrix")                      // true (uppercase < lowercase)
 * 
 * const upToDate = lte("2024-06-01")
 * upToDate("2024-01-01")               // true
 * upToDate("2024-06-01")               // true
 * upToDate("2024-12-31")               // false
 * 
 * // Maximum value validation
 * function validateQuantity(qty: number): string | null {
 *   if (!lte(0)(0 - qty)) return "Quantity cannot be negative"
 *   if (!lte(qty)(100)) return "Maximum quantity is 100"
 *   return null
 * }
 * 
 * validateQuantity(-5)                 // "Quantity cannot be negative"
 * validateQuantity(50)                 // null (valid)
 * validateQuantity(100)                // null (valid)
 * validateQuantity(101)                // "Maximum quantity is 100"
 * 
 * // Score categories with boundaries
 * const failingOrBelow = lte(59)
 * const passingOrBelow = lte(69)
 * const goodOrBelow = lte(84)
 * const excellentOrBelow = lte(94)
 * 
 * function categorizeScore(score: number): string {
 *   if (failingOrBelow(score)) return "Failing"
 *   if (passingOrBelow(score)) return "Passing"
 *   if (goodOrBelow(score)) return "Good"
 *   if (excellentOrBelow(score)) return "Excellent"
 *   return "Outstanding"
 * }
 * 
 * categorizeScore(59)                  // "Failing"
 * categorizeScore(60)                  // "Passing"
 * categorizeScore(85)                  // "Excellent"
 * categorizeScore(95)                  // "Outstanding"
 * 
 * // Date deadlines
 * const deadline = new Date("2024-12-31")
 * const byDeadline = lte(deadline)
 * 
 * byDeadline(new Date("2024-06-01"))   // true (before deadline)
 * byDeadline(new Date("2024-12-31"))   // true (on deadline)
 * byDeadline(new Date("2025-01-01"))   // false (after deadline)
 * 
 * // Array bounds checking
 * function isWithinBounds<T>(array: T[]): (index: number) => boolean {
 *   return (index: number) => lte(0)(0 - index) && lte(index)(array.length - 1)
 * }
 * 
 * const arr = ["a", "b", "c"]
 * const inBounds = isWithinBounds(arr)
 * inBounds(-1)                         // false
 * inBounds(0)                          // true
 * inBounds(2)                          // true
 * inBounds(3)                          // false
 * 
 * // Price limits
 * interface Product {
 *   name: string
 *   price: number
 * }
 * 
 * const products: Product[] = [
 *   { name: "Book", price: 15 },
 *   { name: "Pen", price: 3 },
 *   { name: "Laptop", price: 999 },
 *   { name: "Mouse", price: 25 }
 * ]
 * 
 * const affordable = products.filter(p => lte(p.price)(25))
 * // [Book, Pen, Mouse]
 * 
 * // Range checking (inclusive)
 * function isInRangeInclusive(min: number, max: number) {
 *   return (value: number) => lte(min)(value) && lte(value)(max)
 * }
 * 
 * const inTens = isInRangeInclusive(10, 19)
 * inTens(9)                            // false
 * inTens(10)                           // true
 * inTens(15)                           // true
 * inTens(19)                           // true
 * inTens(20)                           // false
 * 
 * // Percentage validation
 * const isValidPercentage = (value: number) => 
 *   lte(0)(value) && lte(value)(100)
 * 
 * isValidPercentage(-10)               // false
 * isValidPercentage(0)                 // true
 * isValidPercentage(50)                // true
 * isValidPercentage(100)               // true
 * isValidPercentage(101)               // false
 * 
 * // Infinity handling
 * const atMostInfinity = lte(Infinity)
 * atMostInfinity(Number.MAX_VALUE)     // true
 * atMostInfinity(Infinity)             // true
 * atMostInfinity(-Infinity)            // true
 * 
 * const atMostNegInfinity = lte(-Infinity)
 * atMostNegInfinity(-Infinity)         // true
 * atMostNegInfinity(anything)          // false (except -Infinity)
 * 
 * // NaN handling
 * const atMostNaN = lte(NaN)
 * atMostNaN(5)                         // false (NaN comparisons always false)
 * atMostNaN(NaN)                       // false
 * 
 * const atMost5 = lte(5)
 * atMost5(NaN)                         // false
 * 
 * // Temperature ranges
 * const freezingOrBelow = lte(0)
 * const roomTempOrBelow = lte(25)
 * const bodyTempOrBelow = lte(37)
 * 
 * function describeCelsius(temp: number): string {
 *   if (freezingOrBelow(temp)) return "freezing or below"
 *   if (roomTempOrBelow(temp)) return "cool to comfortable"
 *   if (bodyTempOrBelow(temp)) return "warm"
 *   return "hot"
 * }
 * 
 * describeCelsius(-5)                  // "freezing or below"
 * describeCelsius(0)                   // "freezing or below"
 * describeCelsius(20)                  // "cool to comfortable"
 * describeCelsius(30)                  // "warm"
 * describeCelsius(40)                  // "hot"
 * 
 * // Version checking
 * const supportsFeature = lte("2.0.0")
 * supportsFeature("1.9.9")             // true
 * supportsFeature("2.0.0")             // true
 * supportsFeature("2.0.1")             // false
 * 
 * // Performance thresholds
 * const acceptable = lte(100)  // ms
 * const good = lte(50)
 * const excellent = lte(20)
 * 
 * function ratePerformance(ms: number): string {
 *   if (excellent(ms)) return "excellent"
 *   if (good(ms)) return "good"
 *   if (acceptable(ms)) return "acceptable"
 *   return "needs improvement"
 * }
 * 
 * // Sorting with stability
 * const descendingOrEqual = (a: number, b: number) => 
 *   lte(a)(b) ? 1 : lte(b)(a) ? -1 : 0
 * 
 * [3, 1, 4, 1, 5].sort(descendingOrEqual)  // [5, 4, 3, 1, 1]
 * 
 * // React component prop validation
 * interface SliderProps {
 *   value: number
 *   min: number
 *   max: number
 * }
 * 
 * function Slider({ value, min, max }: SliderProps) {
 *   const isValid = lte(min)(value) && lte(value)(max)
 *   
 *   if (!isValid) {
 *     console.warn(`Value ${value} out of range [${min}, ${max}]`)
 *   }
 *   
 *   return <input type="range" min={min} max={max} value={value} />
 * }
 * 
 * // Capacity checking
 * class Container {
 *   private capacity: number
 *   private items: unknown[] = []
 *   
 *   constructor(capacity: number) {
 *     this.capacity = capacity
 *   }
 *   
 *   canAdd(count: number = 1): boolean {
 *     return lte(this.items.length + count)(this.capacity)
 *   }
 *   
 *   isFull(): boolean {
 *     return lte(this.capacity)(this.items.length)
 *   }
 * }
 * 
 * // Binary search upper bound
 * function upperBound(arr: number[], target: number): number {
 *   let left = 0
 *   let right = arr.length
 *   
 *   while (left < right) {
 *     const mid = Math.floor((left + right) / 2)
 *     if (lte(arr[mid])(target)) {
 *       left = mid + 1
 *     } else {
 *       right = mid
 *     }
 *   }
 *   return left
 * }
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Curried - Returns a reusable predicate function
 * @property Inclusive - Includes equality (<=, not just <)
 * @property Coercive - Uses JavaScript's <= operator with standard coercion
 */
const lte = <T>(threshold: T) => 
	(value: T): boolean => value <= threshold

export default lte