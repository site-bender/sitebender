/**
 * Creates a curried less-than comparison predicate
 * 
 * Returns a function that checks if a value is less than the provided threshold.
 * Uses JavaScript's less-than operator with its standard coercion rules for
 * non-numeric values. For strict numeric comparison, ensure both values are
 * numbers. Useful for filtering, validation, and conditional logic.
 * 
 * Comparison rules:
 * - Numeric: standard less-than comparison
 * - Strings: lexicographic comparison
 * - Mixed types: JavaScript coercion applies
 * - NaN: always returns false (NaN < anything is false)
 * - null/undefined: coerced to numbers (null = 0, undefined = NaN)
 * 
 * @param threshold - The value to compare against
 * @returns A predicate function that returns true if input < threshold
 * @example
 * ```typescript
 * // Numeric comparisons
 * const lessThan10 = lt(10)
 * lessThan10(5)                        // true
 * lessThan10(10)                       // false
 * lessThan10(15)                       // false
 * lessThan10(-5)                       // true
 * 
 * const lessThanZero = lt(0)
 * lessThanZero(-1)                     // true
 * lessThanZero(0)                      // false
 * lessThanZero(1)                      // false
 * 
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20]
 * const small = numbers.filter(lt(10))
 * // [1, 5]
 * 
 * const negative = [-5, -2, 0, 3, 6].filter(lt(0))
 * // [-5, -2]
 * 
 * // String comparisons (lexicographic)
 * const beforeM = lt("m")
 * beforeM("apple")                     // true
 * beforeM("zebra")                     // false
 * beforeM("m")                         // false
 * beforeM("Matrix")                    // true (uppercase < lowercase)
 * 
 * const beforeDate = lt("2024-06-01")
 * beforeDate("2024-01-01")             // true
 * beforeDate("2024-12-31")             // false
 * beforeDate("2024-06-01")             // false
 * 
 * // Decimal comparisons
 * const lessThanPi = lt(Math.PI)
 * lessThanPi(3)                        // true
 * lessThanPi(3.14)                     // true
 * lessThanPi(3.15)                     // false
 * lessThanPi(Math.PI)                  // false
 * 
 * // Validation use cases
 * function validateAge(age: number): string | null {
 *   if (lt(0)(age)) return "Age cannot be negative"
 *   if (lt(18)(age)) return "Must be 18 or older"
 *   if (!lt(120)(age)) return "Invalid age"
 *   return null
 * }
 * 
 * validateAge(-5)                      // "Age cannot be negative"
 * validateAge(16)                      // "Must be 18 or older"
 * validateAge(25)                      // null (valid)
 * validateAge(150)                     // "Invalid age"
 * 
 * // Score thresholds
 * const failing = lt(60)
 * const needsImprovement = lt(70)
 * const good = lt(85)
 * 
 * function gradeScore(score: number): string {
 *   if (failing(score)) return "F"
 *   if (needsImprovement(score)) return "D"
 *   if (good(score)) return "C"
 *   if (lt(95)(score)) return "B"
 *   return "A"
 * }
 * 
 * gradeScore(55)                       // "F"
 * gradeScore(65)                       // "D"
 * gradeScore(75)                       // "C"
 * gradeScore(90)                       // "B"
 * gradeScore(98)                       // "A"
 * 
 * // Date comparisons
 * const beforeToday = lt(new Date())
 * const yesterday = new Date(Date.now() - 86400000)
 * const tomorrow = new Date(Date.now() + 86400000)
 * 
 * beforeToday(yesterday)               // true
 * beforeToday(tomorrow)                // false
 * 
 * // Infinity handling
 * const lessThanInfinity = lt(Infinity)
 * lessThanInfinity(Number.MAX_VALUE)   // true
 * lessThanInfinity(Infinity)           // false
 * lessThanInfinity(-Infinity)          // true
 * 
 * const lessThanNegInfinity = lt(-Infinity)
 * lessThanNegInfinity(-Infinity)       // false
 * lessThanNegInfinity(anything)        // false (nothing < -Infinity)
 * 
 * // NaN handling
 * const lessThanNaN = lt(NaN)
 * lessThanNaN(5)                       // false (NaN comparisons always false)
 * lessThanNaN(NaN)                     // false
 * lessThanNaN(-Infinity)               // false
 * 
 * const lessThan5 = lt(5)
 * lessThan5(NaN)                       // false
 * 
 * // Price filtering
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
 * const under20 = products.filter(p => lt(20)(p.price))
 * // [{ name: "Book", price: 15 }, { name: "Pen", price: 3 }]
 * 
 * // Chaining comparisons
 * function isInRange(min: number, max: number) {
 *   return (value: number) => !lt(min)(value) && lt(max)(value)
 * }
 * 
 * const inRange10to20 = isInRange(10, 20)
 * inRange10to20(5)                     // false
 * inRange10to20(15)                    // true
 * inRange10to20(20)                    // false
 * inRange10to20(25)                    // false
 * 
 * // Array index bounds
 * function isValidIndex(array: unknown[]): (index: number) => boolean {
 *   return (index: number) => !lt(0)(index) && lt(array.length)(index)
 * }
 * 
 * const arr = ["a", "b", "c"]
 * const validIndex = isValidIndex(arr)
 * validIndex(-1)                       // false
 * validIndex(0)                        // true
 * validIndex(2)                        // true
 * validIndex(3)                        // false
 * 
 * // Performance metrics
 * const tooSlow = lt(100)  // Response time over 100ms
 * const acceptable = lt(500)
 * 
 * function categorizeLatency(ms: number): string {
 *   if (!tooSlow(ms)) return "excellent"
 *   if (acceptable(ms)) return "good"
 *   if (lt(1000)(ms)) return "acceptable"
 *   return "poor"
 * }
 * 
 * categorizeLatency(50)                // "excellent"
 * categorizeLatency(250)               // "good"
 * categorizeLatency(750)               // "acceptable"
 * categorizeLatency(1500)              // "poor"
 * 
 * // Sorting helper
 * const ascending = (a: number, b: number) => 
 *   lt(b)(a) ? -1 : lt(a)(b) ? 1 : 0
 * 
 * [3, 1, 4, 1, 5].sort(ascending)      // [1, 1, 3, 4, 5]
 * 
 * // React conditional rendering
 * function ProgressBar({ value }: { value: number }) {
 *   const isLow = lt(33)(value)
 *   const isMedium = lt(66)(value)
 *   
 *   const color = isLow ? "red" : isMedium ? "yellow" : "green"
 *   return <div style={{ width: `${value}%`, backgroundColor: color }} />
 * }
 * 
 * // Pagination
 * function hasPreviousPage(currentPage: number): boolean {
 *   return !lt(1)(currentPage)
 * }
 * 
 * function hasNextPage(currentPage: number, totalPages: number): boolean {
 *   return lt(totalPages)(currentPage)
 * }
 * 
 * // Binary search boundary
 * function binarySearch(arr: number[], target: number): number {
 *   let left = 0
 *   let right = arr.length - 1
 *   
 *   while (left <= right) {
 *     const mid = Math.floor((left + right) / 2)
 *     if (lt(target)(arr[mid])) {
 *       right = mid - 1
 *     } else if (lt(arr[mid])(target)) {
 *       left = mid + 1
 *     } else {
 *       return mid
 *     }
 *   }
 *   return -1
 * }
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Curried - Returns a reusable predicate function
 * @property Coercive - Uses JavaScript's < operator with standard coercion
 * @property NaN-aware - Comparisons with NaN always return false
 */
const lt = <T>(threshold: T) => 
	(value: T): boolean => value < threshold

export default lt