/**
 * Checks if a value is an even number
 * 
 * Determines whether a value is an even integer using the modulo operator.
 * Returns true for even integers (including 0), false for odd integers,
 * non-integers, and non-numeric values. Uses strict integer checking to
 * ensure the value is a whole number before testing evenness. This is
 * useful for mathematical operations, filtering, and validation.
 * 
 * Even number rules:
 * - Must be a valid number (not NaN or Infinity)
 * - Must be an integer (no decimal part)
 * - Must be divisible by 2 with no remainder
 * - Zero is considered even
 * - Negative even numbers return true
 * - Non-numbers return false
 * 
 * @param value - The value to check for evenness
 * @returns True if the value is an even integer, false otherwise
 * @example
 * ```typescript
 * // Even integers
 * isEven(0)                            // true (zero is even)
 * isEven(2)                            // true
 * isEven(4)                            // true
 * isEven(100)                          // true
 * isEven(-2)                           // true
 * isEven(-100)                         // true
 * 
 * // Odd integers
 * isEven(1)                            // false
 * isEven(3)                            // false
 * isEven(99)                           // false
 * isEven(-1)                           // false
 * isEven(-99)                          // false
 * 
 * // Non-integers
 * isEven(2.5)                          // false
 * isEven(4.1)                          // false
 * isEven(2.0)                          // true (integer value)
 * isEven(Math.PI)                      // false
 * 
 * // Special numeric values
 * isEven(NaN)                          // false
 * isEven(Infinity)                     // false
 * isEven(-Infinity)                    // false
 * isEven(-0)                           // true (negative zero is even)
 * 
 * // Non-numeric values
 * isEven("2")                          // false (string)
 * isEven("even")                       // false
 * isEven(null)                         // false
 * isEven(undefined)                    // false
 * isEven([2])                          // false
 * isEven({})                           // false
 * isEven(true)                         // false
 * 
 * // Large numbers
 * isEven(Number.MAX_SAFE_INTEGER)      // false (9007199254740991 is odd)
 * isEven(Number.MAX_SAFE_INTEGER - 1)  // true (9007199254740990 is even)
 * isEven(1e10)                         // true (10000000000)
 * isEven(1e10 + 1)                     // false (10000000001)
 * 
 * // Array filtering
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const evens = numbers.filter(isEven)
 * // [2, 4, 6, 8, 10]
 * 
 * const mixed = [0, 1.5, 2, "3", 4, null, 5, NaN, 6]
 * const evenNumbers = mixed.filter(isEven)
 * // [0, 2, 4, 6]
 * 
 * // Pagination helper
 * function getPageItems<T>(
 *   items: Array<T>,
 *   pageSize: number,
 *   pageNumber: number
 * ): Array<T> {
 *   if (!isEven(pageSize) && pageSize > 1) {
 *     console.warn("Page size is odd, layout might be unbalanced")
 *   }
 *   const start = pageNumber * pageSize
 *   return items.slice(start, start + pageSize)
 * }
 * 
 * // Grid layout validation
 * interface GridConfig {
 *   columns: number
 *   rows: number
 * }
 * 
 * function validateGrid(config: GridConfig): boolean {
 *   // Ensure even columns for symmetric layout
 *   return isEven(config.columns) && config.rows > 0
 * }
 * 
 * validateGrid({ columns: 4, rows: 3 })   // true
 * validateGrid({ columns: 3, rows: 3 })   // false
 * 
 * // Binary operations
 * function isEvenBitwise(n: number): boolean {
 *   // Alternative implementation using bitwise AND
 *   return Number.isInteger(n) && (n & 1) === 0
 * }
 * 
 * // Team pairing
 * function canPairEvenly(teamSize: unknown): boolean {
 *   return typeof teamSize === "number" && isEven(teamSize)
 * }
 * 
 * canPairEvenly(10)                    // true
 * canPairEvenly(11)                    // false
 * canPairEvenly("10")                  // false
 * 
 * // Statistical grouping
 * function splitIntoEvenGroups<T>(
 *   items: Array<T>
 * ): [Array<T>, Array<T>] | null {
 *   if (!isEven(items.length)) {
 *     return null // Can't split odd count evenly
 *   }
 *   const mid = items.length / 2
 *   return [items.slice(0, mid), items.slice(mid)]
 * }
 * 
 * splitIntoEvenGroups([1, 2, 3, 4])    // [[1, 2], [3, 4]]
 * splitIntoEvenGroups([1, 2, 3])       // null
 * 
 * // CSS class generation
 * function getRowClass(index: number): string {
 *   if (!Number.isInteger(index)) return "invalid"
 *   return isEven(index) ? "even-row" : "odd-row"
 * }
 * 
 * [0, 1, 2, 3].map(getRowClass)
 * // ["even-row", "odd-row", "even-row", "odd-row"]
 * 
 * // Alternating pattern generator
 * function createAlternatingPattern<T>(
 *   evenValue: T,
 *   oddValue: T,
 *   length: number
 * ): Array<T> {
 *   return Array.from({ length }, (_, i) => 
 *     isEven(i) ? evenValue : oddValue
 *   )
 * }
 * 
 * createAlternatingPattern("●", "○", 5)
 * // ["●", "○", "●", "○", "●"]
 * 
 * // Range validation
 * function isInEvenRange(value: number, min: number, max: number): boolean {
 *   return isEven(value) && value >= min && value <= max
 * }
 * 
 * isInEvenRange(4, 0, 10)              // true
 * isInEvenRange(3, 0, 10)              // false (odd)
 * isInEvenRange(12, 0, 10)             // false (out of range)
 * 
 * // Mathematical sequences
 * function getEvenFibonacci(limit: number): Array<number> {
 *   const fib: Array<number> = []
 *   let a = 0, b = 1
 *   
 *   while (a <= limit) {
 *     if (isEven(a)) {
 *       fib.push(a)
 *     }
 *     [a, b] = [b, a + b]
 *   }
 *   
 *   return fib
 * }
 * 
 * getEvenFibonacci(100)
 * // [0, 2, 8, 34]
 * 
 * // Time calculations
 * function isEvenHour(date: Date): boolean {
 *   return isEven(date.getHours())
 * }
 * 
 * function isEvenMinute(date: Date): boolean {
 *   return isEven(date.getMinutes())
 * }
 * 
 * // React component prop
 * interface ListItemProps {
 *   index: number
 *   data: unknown
 * }
 * 
 * function ListItem({ index, data }: ListItemProps) {
 *   const className = isEven(index) 
 *     ? "bg-gray-100" 
 *     : "bg-white"
 *   
 *   return <div className={className}>{data}</div>
 * }
 * 
 * // Performance: check multiple values
 * const nums = Array.from({ length: 1000000 }, (_, i) => i)
 * const evenCount = nums.filter(isEven).length
 * // 500000 (half are even)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Integer-only - Returns false for non-integer numbers
 * @property Zero-even - Considers zero as even (mathematically correct)
 * @property Type-safe - Returns false for non-numeric types
 */
const isEven = (value: unknown): boolean => {
	// Check if it's a number and an integer
	if (typeof value !== "number" || !Number.isInteger(value)) {
		return false
	}
	
	// Check if it's finite (not NaN or Infinity)
	if (!Number.isFinite(value)) {
		return false
	}
	
	// Check if divisible by 2
	return value % 2 === 0
}

export default isEven