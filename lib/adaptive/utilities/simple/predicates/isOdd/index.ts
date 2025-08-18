/**
 * Checks if a value is an odd number
 * 
 * Determines whether a value is an odd integer using the modulo operator.
 * Returns true for odd integers, false for even integers, non-integers,
 * and non-numeric values. Uses strict integer checking to ensure the value
 * is a whole number before testing oddness. This is useful for mathematical
 * operations, alternating patterns, and parity-based logic.
 * 
 * Odd number rules:
 * - Must be a valid number (not NaN or Infinity)
 * - Must be an integer (no decimal part)
 * - Must not be divisible by 2 (remainder of 1 or -1)
 * - Includes positive and negative odd numbers
 * - Zero is not odd (it's even)
 * - Non-numbers return false
 * 
 * @param value - The value to check for oddness
 * @returns True if the value is an odd integer, false otherwise
 * @example
 * ```typescript
 * // Odd integers
 * isOdd(1)                             // true
 * isOdd(3)                             // true
 * isOdd(5)                             // true
 * isOdd(99)                            // true
 * isOdd(-1)                            // true
 * isOdd(-99)                           // true
 * 
 * // Even integers (not odd)
 * isOdd(0)                             // false (zero is even)
 * isOdd(2)                             // false
 * isOdd(4)                             // false
 * isOdd(100)                           // false
 * isOdd(-2)                            // false
 * isOdd(-100)                          // false
 * 
 * // Non-integers
 * isOdd(1.5)                           // false
 * isOdd(3.1)                           // false
 * isOdd(1.0)                           // true (integer value)
 * isOdd(Math.PI)                       // false
 * 
 * // Special numeric values
 * isOdd(NaN)                           // false
 * isOdd(Infinity)                      // false
 * isOdd(-Infinity)                     // false
 * 
 * // Non-numeric values
 * isOdd("3")                           // false (string)
 * isOdd("odd")                         // false
 * isOdd(null)                          // false
 * isOdd(undefined)                     // false
 * isOdd([3])                           // false
 * isOdd({})                            // false
 * isOdd(true)                          // false
 * 
 * // Large numbers
 * isOdd(Number.MAX_SAFE_INTEGER)       // true (9007199254740991 is odd)
 * isOdd(Number.MAX_SAFE_INTEGER - 1)   // false (9007199254740990 is even)
 * isOdd(1e9)                           // true (1000000001)
 * isOdd(1e10)                          // false (10000000000)
 * 
 * // Array filtering
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const odds = numbers.filter(isOdd)
 * // [1, 3, 5, 7, 9]
 * 
 * const mixed = [0, 1.5, 3, "5", 7, null, 9, NaN, 11]
 * const oddNumbers = mixed.filter(isOdd)
 * // [3, 7, 9, 11]
 * 
 * // Alternating layout generation
 * function getAlternatingClass(index: number): string {
 *   if (!Number.isInteger(index)) return "invalid"
 *   return isOdd(index) ? "odd-item" : "even-item"
 * }
 * 
 * [0, 1, 2, 3].map(getAlternatingClass)
 * // ["even-item", "odd-item", "even-item", "odd-item"]
 * 
 * // Page number validation
 * function isOddPage(pageNumber: unknown): boolean {
 *   return typeof pageNumber === "number" && isOdd(pageNumber)
 * }
 * 
 * isOddPage(1)                         // true (first page)
 * isOddPage(2)                         // false
 * isOddPage("1")                       // false (string)
 * isOddPage(1.5)                       // false (not integer)
 * 
 * // Binary representation check
 * function isOddBitwise(n: number): boolean {
 *   // Alternative implementation using bitwise AND
 *   return Number.isInteger(n) && (n & 1) === 1
 * }
 * 
 * // Tournament bracket pairing
 * function needsBye(participantCount: unknown): boolean {
 *   return typeof participantCount === "number" && 
 *          isOdd(participantCount) && 
 *          participantCount > 0
 * }
 * 
 * needsBye(7)                          // true (need bye for odd count)
 * needsBye(8)                          // false (even pairing)
 * needsBye(1)                          // true
 * needsBye(0)                          // false
 * 
 * // Grid positioning
 * interface GridPosition {
 *   row: number
 *   col: number
 * }
 * 
 * function isCheckerboardBlack(pos: GridPosition): boolean {
 *   // Black squares are where row + col is odd
 *   const sum = pos.row + pos.col
 *   return isOdd(sum)
 * }
 * 
 * isCheckerboardBlack({ row: 0, col: 0 })  // false (white)
 * isCheckerboardBlack({ row: 0, col: 1 })  // true (black)
 * isCheckerboardBlack({ row: 1, col: 0 })  // true (black)
 * isCheckerboardBlack({ row: 1, col: 1 })  // false (white)
 * 
 * // Middle element detection
 * function hasMiddleElement<T>(array: Array<T>): boolean {
 *   return isOdd(array.length)
 * }
 * 
 * function getMiddleElement<T>(array: Array<T>): T | null {
 *   if (!hasMiddleElement(array)) return null
 *   return array[Math.floor(array.length / 2)]
 * }
 * 
 * getMiddleElement([1, 2, 3])         // 2
 * getMiddleElement([1, 2, 3, 4])      // null (no middle)
 * getMiddleElement([1])               // 1
 * 
 * // CSS zigzag pattern
 * function getZigzagDirection(index: number): "left" | "right" | null {
 *   if (!Number.isInteger(index) || index < 0) return null
 *   return isOdd(index) ? "right" : "left"
 * }
 * 
 * [0, 1, 2, 3].map(getZigzagDirection)
 * // ["left", "right", "left", "right"]
 * 
 * // Mathematical sequences
 * function getOddNumbers(limit: number): Array<number> {
 *   const odds: Array<number> = []
 *   for (let i = 1; i <= limit; i += 2) {
 *     if (isOdd(i)) {
 *       odds.push(i)
 *     }
 *   }
 *   return odds
 * }
 * 
 * getOddNumbers(10)                   // [1, 3, 5, 7, 9]
 * 
 * // Odd sum calculation
 * function sumOfOdds(numbers: Array<unknown>): number {
 *   return numbers
 *     .filter(isOdd)
 *     .reduce((sum, n) => sum + (n as number), 0)
 * }
 * 
 * sumOfOdds([1, 2, 3, 4, 5])          // 9 (1 + 3 + 5)
 * sumOfOdds([2, 4, 6])                // 0 (no odds)
 * sumOfOdds([1, "3", 5, null])        // 6 (1 + 5)
 * 
 * // Time-based alternation
 * function isOddMinute(date: Date): boolean {
 *   return isOdd(date.getMinutes())
 * }
 * 
 * function isOddSecond(date: Date): boolean {
 *   return isOdd(date.getSeconds())
 * }
 * 
 * // React component alternating styles
 * interface ListItemProps {
 *   index: number
 *   content: string
 * }
 * 
 * function ListItem({ index, content }: ListItemProps) {
 *   const className = isOdd(index) 
 *     ? "bg-gray-50 hover:bg-gray-100" 
 *     : "bg-white hover:bg-gray-50"
 *   
 *   return <li className={className}>{content}</li>
 * }
 * 
 * // Odd factorial (double factorial)
 * function oddFactorial(n: unknown): number | null {
 *   if (!isOdd(n) || n < 0) return null
 *   
 *   let result = 1
 *   for (let i = n as number; i > 0; i -= 2) {
 *     result *= i
 *   }
 *   return result
 * }
 * 
 * oddFactorial(5)                      // 15 (5 * 3 * 1)
 * oddFactorial(7)                      // 105 (7 * 5 * 3 * 1)
 * oddFactorial(6)                      // null (not odd)
 * 
 * // Partition into odd/even
 * function partitionByParity<T>(
 *   items: Array<T>,
 *   getIndex: (item: T) => number
 * ): { odd: Array<T>, even: Array<T> } {
 *   const odd: Array<T> = []
 *   const even: Array<T> = []
 *   
 *   for (const item of items) {
 *     const index = getIndex(item)
 *     if (isOdd(index)) {
 *       odd.push(item)
 *     } else if (Number.isInteger(index)) {
 *       even.push(item)
 *     }
 *   }
 *   
 *   return { odd, even }
 * }
 * 
 * const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
 * partitionByParity(items, item => item.id)
 * // { odd: [{ id: 1 }, { id: 3 }], even: [{ id: 2 }, { id: 4 }] }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Integer-only - Returns false for non-integer numbers
 * @property Zero-even - Considers zero as even (not odd)
 * @property Type-safe - Returns false for non-numeric types
 */
const isOdd = (value: unknown): boolean => {
	// Check if it's a number and an integer
	if (typeof value !== "number" || !Number.isInteger(value)) {
		return false
	}
	
	// Check if it's finite (not NaN or Infinity)
	if (!Number.isFinite(value)) {
		return false
	}
	
	// Check if not divisible by 2 (remainder is 1 or -1)
	return value % 2 !== 0
}

export default isOdd