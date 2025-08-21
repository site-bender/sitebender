/**
 * Checks if a number is even
 * 
 * Determines whether an integer is evenly divisible by 2. Returns true
 * for even numbers (including zero), false for odd numbers. Returns false
 * for non-integers, NaN, Infinity, or invalid inputs to support safe
 * error handling in functional pipelines.
 * 
 * @param n - Number to check for evenness
 * @returns True if n is even, false otherwise
 * @example
 * ```typescript
 * // Even numbers
 * isEven(0)
 * // true (zero is even)
 * 
 * isEven(2)
 * // true
 * 
 * isEven(4)
 * // true
 * 
 * isEven(100)
 * // true
 * 
 * isEven(1000)
 * // true
 * 
 * // Odd numbers
 * isEven(1)
 * // false
 * 
 * isEven(3)
 * // false
 * 
 * isEven(5)
 * // false
 * 
 * isEven(99)
 * // false
 * 
 * isEven(1001)
 * // false
 * 
 * // Negative even numbers
 * isEven(-2)
 * // true
 * 
 * isEven(-4)
 * // true
 * 
 * isEven(-100)
 * // true
 * 
 * // Negative odd numbers
 * isEven(-1)
 * // false
 * 
 * isEven(-3)
 * // false
 * 
 * isEven(-99)
 * // false
 * 
 * // Zero and negative zero
 * isEven(0)
 * // true
 * 
 * isEven(-0)
 * // true
 * 
 * // Large numbers
 * isEven(9999998)
 * // true
 * 
 * isEven(9999999)
 * // false
 * 
 * isEven(Number.MAX_SAFE_INTEGER)
 * // false (9007199254740991 is odd)
 * 
 * isEven(Number.MAX_SAFE_INTEGER - 1)
 * // true (9007199254740990 is even)
 * 
 * // Non-integers return false
 * isEven(2.5)
 * // false
 * 
 * isEven(2.0)
 * // true (integer value)
 * 
 * isEven(3.14159)
 * // false
 * 
 * isEven(4.00001)
 * // false
 * 
 * // Special values return false
 * isEven(Infinity)
 * // false
 * 
 * isEven(-Infinity)
 * // false
 * 
 * isEven(NaN)
 * // false
 * 
 * // Invalid inputs return false
 * isEven(null)
 * // false
 * 
 * isEven(undefined)
 * // false
 * 
 * isEven("2")
 * // false
 * 
 * isEven("even")
 * // false
 * 
 * isEven({})
 * // false
 * 
 * isEven([])
 * // false
 * 
 * // Filtering arrays
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const evens = numbers.filter(isEven)
 * // [2, 4, 6, 8, 10]
 * 
 * const mixed = [-3, -2, -1, 0, 1, 2, 3]
 * const evenNumbers = mixed.filter(isEven)
 * // [-2, 0, 2]
 * 
 * // Partition array into even and odd
 * function partition(arr: Array<number>): [Array<number>, Array<number>] {
 *   const evens = arr.filter(isEven)
 *   const odds = arr.filter(n => !isEven(n))
 *   return [evens, odds]
 * }
 * partition([1, 2, 3, 4, 5])
 * // [[2, 4], [1, 3, 5]]
 * 
 * // Count even numbers
 * function countEvens(arr: Array<number>): number {
 *   return arr.filter(isEven).length
 * }
 * countEvens([1, 2, 3, 4, 5, 6])
 * // 3
 * 
 * // Alternating pattern check
 * function isAlternating(arr: Array<number>): boolean {
 *   for (let i = 0; i < arr.length - 1; i++) {
 *     if (isEven(arr[i]) === isEven(arr[i + 1])) {
 *       return false
 *     }
 *   }
 *   return true
 * }
 * isAlternating([1, 2, 3, 4, 5])
 * // true
 * isAlternating([2, 4, 6])
 * // false
 * 
 * // Game logic - even/odd rounds
 * function getRoundType(roundNumber: number): string {
 *   return isEven(roundNumber) ? "bonus" : "normal"
 * }
 * getRoundType(5)
 * // "normal"
 * getRoundType(6)
 * // "bonus"
 * 
 * // Grid positioning (checkerboard)
 * function isBlackSquare(row: number, col: number): boolean {
 *   return isEven(row + col)
 * }
 * isBlackSquare(0, 0)
 * // true (top-left is black)
 * isBlackSquare(0, 1)
 * // false (white)
 * 
 * // Binary operations check
 * function isPowerOfTwo(n: number): boolean {
 *   if (n <= 0) return false
 *   // Powers of 2 in binary: 1, 10, 100, 1000...
 *   // Check if only one bit is set
 *   return Number.isInteger(n) && (n & (n - 1)) === 0
 * }
 * 
 * // Team assignment
 * function assignTeam(playerId: number): string {
 *   return isEven(playerId) ? "Team A" : "Team B"
 * }
 * assignTeam(1001)
 * // "Team B"
 * assignTeam(1002)
 * // "Team A"
 * 
 * // Day/Night cycle
 * function isDaytime(hour: number): boolean {
 *   return isEven(Math.floor(hour / 12))
 * }
 * isDaytime(10)
 * // true (AM)
 * isDaytime(15)
 * // false (PM)
 * 
 * // Pagination helpers
 * function isEvenPage(pageNumber: number): boolean {
 *   return isEven(pageNumber)
 * }
 * 
 * function getPageSide(pageNumber: number): string {
 *   return isEven(pageNumber) ? "left" : "right"
 * }
 * getPageSide(10)
 * // "left"
 * getPageSide(11)
 * // "right"
 * 
 * // Statistics - even sum check
 * function hasEvenSum(arr: Array<number>): boolean {
 *   const sum = arr.reduce((acc, n) => acc + n, 0)
 *   return isEven(sum)
 * }
 * hasEvenSum([1, 2, 3])
 * // true (sum = 6)
 * hasEvenSum([1, 2, 3, 4])
 * // true (sum = 10)
 * 
 * // Bit manipulation alternative
 * function isEvenBitwise(n: number): boolean {
 *   return Number.isInteger(n) && (n & 1) === 0
 * }
 * 
 * // Performance testing pattern
 * const testCases = Array.from({ length: 1000 }, (_, i) => i)
 * const evenCount = testCases.filter(isEven).length
 * // 500 (half are even)
 * 
 * // Validation helper
 * function requireEven(value: number, errorMsg: string = "Value must be even"): number {
 *   if (!isEven(value)) {
 *     throw new Error(errorMsg)
 *   }
 *   return value
 * }
 * 
 * // Matrix operations
 * function isEvenDiagonal(matrix: Array<Array<number>>): boolean {
 *   // Check if main diagonal sum is even
 *   let sum = 0
 *   for (let i = 0; i < Math.min(matrix.length, matrix[0]?.length ?? 0); i++) {
 *     sum += matrix[i][i]
 *   }
 *   return isEven(sum)
 * }
 * 
 * // Combination with other checks
 * function isEvenAndPositive(n: number): boolean {
 *   return n > 0 && isEven(n)
 * }
 * isEvenAndPositive(4)
 * // true
 * isEvenAndPositive(-4)
 * // false
 * isEvenAndPositive(3)
 * // false
 * 
 * // Safe even check with validation
 * function safeIsEven(value: unknown): boolean {
 *   return typeof value === 'number' && isEven(value)
 * }
 * safeIsEven(4)
 * // true
 * safeIsEven("4")
 * // false
 * safeIsEven(null)
 * // false
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns false for invalid inputs
 * @property Integer-only - Returns false for non-integers
 * @property Complementary - isEven(n) === !isOdd(n) for integers
 */
const isEven = (
	n: number | null | undefined
): boolean => {
	if (n == null || typeof n !== 'number') {
		return false
	}
	
	// Check for special values
	if (!isFinite(n) || isNaN(n)) {
		return false
	}
	
	// Check for integer
	if (!Number.isInteger(n)) {
		return false
	}
	
	// Check if divisible by 2
	return n % 2 === 0
}

export default isEven