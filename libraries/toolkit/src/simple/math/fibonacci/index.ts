/**
 * Returns the nth Fibonacci number
 *
 * Calculates the nth number in the Fibonacci sequence, where each number
 * is the sum of the two preceding ones. The sequence starts with 0 and 1.
 * Uses an iterative approach for efficiency. Returns NaN for negative
 * indices, non-integers, or invalid inputs. Limited to n ≤ 78 to avoid
 * exceeding JavaScript's MAX_SAFE_INTEGER.
 *
 * @param n - Zero-based index of the Fibonacci number to calculate
 * @returns The nth Fibonacci number, or NaN if invalid
 * @example
 * ```typescript
 * // First few Fibonacci numbers
 * fibonacci(0)
 * // 0
 *
 * fibonacci(1)
 * // 1
 *
 * fibonacci(2)
 * // 1 (0 + 1)
 *
 * fibonacci(3)
 * // 2 (1 + 1)
 *
 * fibonacci(4)
 * // 3 (1 + 2)
 *
 * fibonacci(5)
 * // 5 (2 + 3)
 *
 * fibonacci(6)
 * // 8 (3 + 5)
 *
 * fibonacci(7)
 * // 13 (5 + 8)
 *
 * fibonacci(8)
 * // 21 (8 + 13)
 *
 * fibonacci(9)
 * // 34 (13 + 21)
 *
 * fibonacci(10)
 * // 55 (21 + 34)
 *
 * // Larger Fibonacci numbers
 * fibonacci(15)
 * // 610
 *
 * fibonacci(20)
 * // 6765
 *
 * fibonacci(25)
 * // 75025
 *
 * fibonacci(30)
 * // 832040
 *
 * fibonacci(40)
 * // 102334155
 *
 * fibonacci(50)
 * // 12586269025
 *
 * // Maximum safe Fibonacci number
 * fibonacci(78)
 * // 8944394323791464 (largest that fits in MAX_SAFE_INTEGER)
 *
 * fibonacci(79)
 * // NaN (would exceed MAX_SAFE_INTEGER)
 *
 * // Edge cases
 * fibonacci(0)
 * // 0 (base case)
 *
 * fibonacci(1)
 * // 1 (base case)
 *
 * // Invalid inputs return NaN
 * fibonacci(-1)
 * // NaN (negative index)
 *
 * fibonacci(-10)
 * // NaN
 *
 * fibonacci(2.5)
 * // NaN (non-integer)
 *
 * fibonacci(3.14)
 * // NaN
 *
 * fibonacci(null)
 * // NaN
 *
 * fibonacci(undefined)
 * // NaN
 *
 * fibonacci("5")
 * // NaN
 *
 * fibonacci(NaN)
 * // NaN
 *
 * fibonacci(Infinity)
 * // NaN
 *
 * // Generate Fibonacci sequence
 * function fibonacciSequence(count: number): Array<number> {
 *   const sequence: Array<number> = []
 *   for (let i = 0; i < count; i++) {
 *     const fib = fibonacci(i)
 *     if (!isNaN(fib)) sequence.push(fib)
 *   }
 *   return sequence
 * }
 * fibonacciSequence(10)
 * // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * // Check if number is Fibonacci
 * function isFibonacci(num: number): boolean {
 *   if (num < 0) return false
 *   let i = 0
 *   let fib = fibonacci(i)
 *   while (fib < num && !isNaN(fib)) {
 *     i++
 *     fib = fibonacci(i)
 *   }
 *   return fib === num
 * }
 * isFibonacci(13)
 * // true
 * isFibonacci(14)
 * // false
 *
 * // Golden ratio approximation
 * function goldenRatioApprox(n: number): number {
 *   const fn = fibonacci(n)
 *   const fnMinus1 = fibonacci(n - 1)
 *   return fn / fnMinus1
 * }
 * goldenRatioApprox(10)
 * // 1.6181... (approaches φ ≈ 1.618034)
 * goldenRatioApprox(20)
 * // 1.6180339... (more accurate)
 *
 * // Fibonacci spiral coordinates
 * function fibonacciSpiral(n: number): Array<[number, number]> {
 *   const points: Array<[number, number]> = []
 *   for (let i = 0; i <= n; i++) {
 *     const fib = fibonacci(i)
 *     const angle = i * Math.PI / 2
 *     const x = fib * Math.cos(angle)
 *     const y = fib * Math.sin(angle)
 *     points.push([x, y])
 *   }
 *   return points
 * }
 *
 * // Lucas numbers (related sequence)
 * function lucas(n: number): number {
 *   if (n === 0) return 2
 *   if (n === 1) return 1
 *   // L(n) = F(n-1) + F(n+1)
 *   const fnMinus1 = fibonacci(n - 1)
 *   const fnPlus1 = fibonacci(n + 1)
 *   return fnMinus1 + fnPlus1
 * }
 * lucas(5)
 * // 11
 *
 * // Fibonacci matrix form
 * function fibonacciMatrix(n: number): number {
 *   // [[1,1],[1,0]]^n = [[F(n+1),F(n)],[F(n),F(n-1)]]
 *   // Simplified: just return fibonacci(n)
 *   return fibonacci(n)
 * }
 *
 * // Binet's formula comparison (closed form)
 * function fibonacciBinet(n: number): number {
 *   const phi = (1 + Math.sqrt(5)) / 2
 *   const psi = (1 - Math.sqrt(5)) / 2
 *   return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5))
 * }
 * // Note: Less accurate for large n due to floating point
 *
 * // Fibonacci modulo
 * function fibonacciMod(n: number, mod: number): number {
 *   const fib = fibonacci(n)
 *   return isNaN(fib) ? NaN : fib % mod
 * }
 * fibonacciMod(10, 10)
 * // 5 (55 % 10)
 *
 * // Pisano period (Fibonacci modulo period)
 * function pisanoPeriod(m: number): number {
 *   let prev = 0
 *   let curr = 1
 *   for (let i = 0; i < m * m; i++) {
 *     const temp = (prev + curr) % m
 *     prev = curr
 *     curr = temp
 *     if (prev === 0 && curr === 1) {
 *       return i + 1
 *     }
 *   }
 *   return -1
 * }
 * pisanoPeriod(3)
 * // 8
 *
 * // Fibonacci sum
 * function fibonacciSum(n: number): number {
 *   // Sum of first n Fibonacci numbers = F(n+2) - 1
 *   const fnPlus2 = fibonacci(n + 2)
 *   return isNaN(fnPlus2) ? NaN : fnPlus2 - 1
 * }
 * fibonacciSum(5)
 * // 12 (0+1+1+2+3+5)
 *
 * // Nature examples (simplified)
 * const rabbitPairs = fibonacci(12) // After 12 months
 * // 144 pairs
 *
 * const sunflowerSeeds = fibonacci(13) // Spiral count
 * // 233 seeds in spiral
 *
 * // Trading: Fibonacci retracement levels
 * function fibonacciRetracement(high: number, low: number): Record<string, number> {
 *   const diff = high - low
 *   return {
 *     '0%': high,
 *     '23.6%': high - diff * 0.236,
 *     '38.2%': high - diff * 0.382,
 *     '50%': high - diff * 0.5,
 *     '61.8%': high - diff * 0.618,
 *     '100%': low
 *   }
 * }
 *
 * // Algorithm complexity example
 * function naiveFibonacci(n: number): number {
 *   // O(2^n) - exponential (don't use for large n!)
 *   if (n <= 1) return n
 *   return naiveFibonacci(n - 1) + naiveFibonacci(n - 2)
 * }
 * // Our iterative version is O(n) - linear
 *
 * // Safe Fibonacci with validation
 * function safeFibonacci(value: unknown): number | null {
 *   const num = typeof value === 'number' ? fibonacci(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeFibonacci(10)
 * // 55
 * safeFibonacci(-1)
 * // null
 * safeFibonacci("10")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Only valid for non-negative integers
 * @property Limit - Returns NaN for n > 78 (MAX_SAFE_INTEGER limit)
 * @property Efficient - O(n) time complexity, O(1) space complexity
 */
const fibonacci = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for negative
	if (n < 0) {
		return NaN
	}

	// Check for values that would exceed MAX_SAFE_INTEGER
	// fibonacci(78) = 8944394323791464 < MAX_SAFE_INTEGER
	// fibonacci(79) = 14472334024676221 > MAX_SAFE_INTEGER
	if (n > 78) {
		return NaN
	}

	// Base cases
	if (n === 0) return 0
	if (n === 1) return 1

	// Iterative calculation (efficient)
	let prev = 0
	let curr = 1

	for (let i = 2; i <= n; i++) {
		const next = prev + curr
		prev = curr
		curr = next
	}

	return curr
}

export default fibonacci
