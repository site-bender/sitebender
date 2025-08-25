/**
 * Checks if a number is odd
 *
 * Determines whether an integer is not evenly divisible by 2. Returns true
 * for odd numbers, false for even numbers (including zero). Returns false
 * for non-integers, NaN, Infinity, or invalid inputs to support safe
 * error handling in functional pipelines.
 *
 * @param n - Number to check for oddness
 * @returns True if n is odd, false otherwise
 * @example
 * ```typescript
 * // Odd numbers
 * isOdd(1)
 * // true
 *
 * isOdd(3)
 * // true
 *
 * isOdd(5)
 * // true
 *
 * isOdd(99)
 * // true
 *
 * isOdd(1001)
 * // true
 *
 * // Even numbers
 * isOdd(0)
 * // false (zero is even)
 *
 * isOdd(2)
 * // false
 *
 * isOdd(4)
 * // false
 *
 * isOdd(100)
 * // false
 *
 * isOdd(1000)
 * // false
 *
 * // Negative odd numbers
 * isOdd(-1)
 * // true
 *
 * isOdd(-3)
 * // true
 *
 * isOdd(-99)
 * // true
 *
 * // Negative even numbers
 * isOdd(-2)
 * // false
 *
 * isOdd(-4)
 * // false
 *
 * isOdd(-100)
 * // false
 *
 * // Zero and negative zero
 * isOdd(0)
 * // false
 *
 * isOdd(-0)
 * // false
 *
 * // Large numbers
 * isOdd(9999999)
 * // true
 *
 * isOdd(9999998)
 * // false
 *
 * isOdd(Number.MAX_SAFE_INTEGER)
 * // true (9007199254740991 is odd)
 *
 * isOdd(Number.MAX_SAFE_INTEGER - 1)
 * // false (9007199254740990 is even)
 *
 * // Non-integers return false
 * isOdd(3.5)
 * // false
 *
 * isOdd(3.0)
 * // true (integer value)
 *
 * isOdd(2.14159)
 * // false
 *
 * isOdd(5.00001)
 * // false
 *
 * // Special values return false
 * isOdd(Infinity)
 * // false
 *
 * isOdd(-Infinity)
 * // false
 *
 * isOdd(NaN)
 * // false
 *
 * // Invalid inputs return false
 * isOdd(null)
 * // false
 *
 * isOdd(undefined)
 * // false
 *
 * isOdd("3")
 * // false
 *
 * isOdd("odd")
 * // false
 *
 * isOdd({})
 * // false
 *
 * isOdd([])
 * // false
 *
 * // Filtering arrays
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const odds = numbers.filter(isOdd)
 * // [1, 3, 5, 7, 9]
 *
 * const mixed = [-3, -2, -1, 0, 1, 2, 3]
 * const oddNumbers = mixed.filter(isOdd)
 * // [-3, -1, 1, 3]
 *
 * // Partition array into odd and even
 * function partition(arr: Array<number>): [Array<number>, Array<number>] {
 *   const odds = arr.filter(isOdd)
 *   const evens = arr.filter(n => !isOdd(n))
 *   return [odds, evens]
 * }
 * partition([1, 2, 3, 4, 5])
 * // [[1, 3, 5], [2, 4]]
 *
 * // Count odd numbers
 * function countOdds(arr: Array<number>): number {
 *   return arr.filter(isOdd).length
 * }
 * countOdds([1, 2, 3, 4, 5, 6])
 * // 3
 *
 * // Sum of odd numbers only
 * function sumOdds(arr: Array<number>): number {
 *   return arr.filter(isOdd).reduce((sum, n) => sum + n, 0)
 * }
 * sumOdds([1, 2, 3, 4, 5])
 * // 9 (1 + 3 + 5)
 *
 * // Game mechanics - odd multiplier
 * function getMultiplier(level: number): number {
 *   return isOdd(level) ? 1.5 : 1.0
 * }
 * getMultiplier(3)
 * // 1.5
 * getMultiplier(4)
 * // 1.0
 *
 * // Array indexing pattern
 * function getOddIndices<T>(arr: Array<T>): Array<T> {
 *   return arr.filter((_, index) => isOdd(index))
 * }
 * getOddIndices(['a', 'b', 'c', 'd', 'e'])
 * // ['b', 'd'] (indices 1 and 3)
 *
 * // Alternating operations
 * function processWithAlternating<T>(
 *   arr: Array<T>,
 *   oddFn: (x: T) => T,
 *   evenFn: (x: T) => T
 * ): Array<T> {
 *   return arr.map((item, index) =>
 *     isOdd(index) ? oddFn(item) : evenFn(item)
 *   )
 * }
 *
 * // Playing card color (simplified)
 * function isRedSuit(cardNumber: number): boolean {
 *   // Hearts (1) and Diamonds (3) are red
 *   return isOdd(cardNumber)
 * }
 *
 * // Row coloring (alternating)
 * function getRowClass(rowNumber: number): string {
 *   return isOdd(rowNumber) ? "odd-row" : "even-row"
 * }
 * getRowClass(1)
 * // "odd-row"
 * getRowClass(2)
 * // "even-row"
 *
 * // Tournament bracket
 * function isUpperBracket(matchNumber: number): boolean {
 *   return isOdd(matchNumber)
 * }
 * isUpperBracket(1)
 * // true
 * isUpperBracket(2)
 * // false
 *
 * // Bit manipulation check
 * function isOddBitwise(n: number): boolean {
 *   return Number.isInteger(n) && (n & 1) === 1
 * }
 *
 * // Mathematical sequences
 * function generateOddSequence(count: number): Array<number> {
 *   const result: Array<number> = []
 *   let n = 1
 *   while (result.length < count) {
 *     result.push(n)
 *     n += 2
 *   }
 *   return result
 * }
 * generateOddSequence(5)
 * // [1, 3, 5, 7, 9]
 *
 * // Check if position requires special handling
 * function needsSpecialHandling(position: number): boolean {
 *   // Odd positions get special treatment
 *   return isOdd(position)
 * }
 *
 * // Collatz sequence step
 * function collatzNext(n: number): number {
 *   if (n <= 0 || !Number.isInteger(n)) return NaN
 *   return isOdd(n) ? 3 * n + 1 : n / 2
 * }
 * collatzNext(5)
 * // 16 (3 * 5 + 1)
 * collatzNext(16)
 * // 8 (16 / 2)
 *
 * // Prime number helper (all primes except 2 are odd)
 * function couldBePrime(n: number): boolean {
 *   if (n === 2) return true
 *   if (n < 2) return false
 *   return isOdd(n)
 * }
 *
 * // Grid coordinates
 * function isOddTile(x: number, y: number): boolean {
 *   return isOdd(x + y)
 * }
 * isOddTile(1, 2)
 * // true (1 + 2 = 3)
 * isOddTile(2, 2)
 * // false (2 + 2 = 4)
 *
 * // Rhythm pattern
 * function getBeat(position: number): string {
 *   return isOdd(position) ? "off-beat" : "on-beat"
 * }
 * getBeat(1)
 * // "off-beat"
 * getBeat(2)
 * // "on-beat"
 *
 * // Statistical analysis
 * function oddEvenRatio(arr: Array<number>): number {
 *   const odds = arr.filter(isOdd).length
 *   const evens = arr.length - odds
 *   return evens === 0 ? Infinity : odds / evens
 * }
 * oddEvenRatio([1, 2, 3, 4, 5])
 * // 1.5 (3 odds / 2 evens)
 *
 * // Validation with custom message
 * function requireOdd(value: number, errorMsg: string = "Value must be odd"): number {
 *   if (!isOdd(value)) {
 *     throw new Error(errorMsg)
 *   }
 *   return value
 * }
 *
 * // Combination with other checks
 * function isOddAndPrime(n: number): boolean {
 *   if (!isOdd(n)) return n === 2 // Only even prime
 *   // Additional prime checking logic here
 *   return true // simplified
 * }
 *
 * // Safe odd check with validation
 * function safeIsOdd(value: unknown): boolean {
 *   return typeof value === 'number' && isOdd(value)
 * }
 * safeIsOdd(3)
 * // true
 * safeIsOdd("3")
 * // false
 * safeIsOdd(null)
 * // false
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns false for invalid inputs
 * @property Integer-only - Returns false for non-integers
 * @property Complementary - isOdd(n) === !isEven(n) for integers
 */
const isOdd = (
	n: number | null | undefined,
): boolean => {
	if (n == null || typeof n !== "number") {
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

	// Check if not divisible by 2
	return n % 2 !== 0
}

export default isOdd
