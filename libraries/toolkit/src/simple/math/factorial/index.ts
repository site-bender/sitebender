/**
 * Calculates the factorial of a non-negative integer
 * 
 * Computes n! (n factorial), which is the product of all positive integers
 * less than or equal to n. By definition, 0! = 1. Only works with
 * non-negative integers up to 170 (beyond which JavaScript returns Infinity).
 * Returns NaN for negative numbers, non-integers, or invalid inputs.
 * 
 * @param n - Non-negative integer to calculate factorial of
 * @returns Factorial of n (n!), or NaN if invalid
 * @example
 * ```typescript
 * // Small factorials
 * factorial(0)
 * // 1 (by definition)
 * 
 * factorial(1)
 * // 1
 * 
 * factorial(2)
 * // 2 (2 × 1)
 * 
 * factorial(3)
 * // 6 (3 × 2 × 1)
 * 
 * factorial(4)
 * // 24 (4 × 3 × 2 × 1)
 * 
 * factorial(5)
 * // 120 (5 × 4 × 3 × 2 × 1)
 * 
 * // Larger factorials
 * factorial(6)
 * // 720
 * 
 * factorial(7)
 * // 5040
 * 
 * factorial(8)
 * // 40320
 * 
 * factorial(9)
 * // 362880
 * 
 * factorial(10)
 * // 3628800
 * 
 * // Even larger
 * factorial(12)
 * // 479001600
 * 
 * factorial(15)
 * // 1307674368000
 * 
 * factorial(20)
 * // 2432902008176640000
 * 
 * // Maximum safe factorial
 * factorial(21)
 * // 51090942171709440000 (last exact in JS float)
 * 
 * factorial(22)
 * // 1.1240007277776077e+21 (starts using scientific notation)
 * 
 * // Large values
 * factorial(50)
 * // 3.0414093201713376e+64
 * 
 * factorial(100)
 * // 9.332621544394418e+157
 * 
 * factorial(170)
 * // 7.257415615307994e+306 (largest before Infinity)
 * 
 * factorial(171)
 * // Infinity (exceeds Number.MAX_VALUE)
 * 
 * // Invalid inputs return NaN
 * factorial(-1)
 * // NaN (negative numbers)
 * 
 * factorial(-5)
 * // NaN
 * 
 * factorial(3.5)
 * // NaN (non-integer)
 * 
 * factorial(2.1)
 * // NaN
 * 
 * factorial(0.5)
 * // NaN
 * 
 * factorial(null)
 * // NaN
 * 
 * factorial(undefined)
 * // NaN
 * 
 * factorial("5")
 * // NaN
 * 
 * factorial(NaN)
 * // NaN
 * 
 * factorial(Infinity)
 * // NaN
 * 
 * factorial(-Infinity)
 * // NaN
 * 
 * // Combinatorics - permutations
 * function permutations(n: number, r: number): number {
 *   if (r > n) return NaN
 *   return factorial(n) / factorial(n - r)
 * }
 * permutations(5, 3)
 * // 60 (5P3 = 5!/(5-3)!)
 * 
 * // Combinatorics - combinations
 * function combinations(n: number, r: number): number {
 *   if (r > n) return NaN
 *   return factorial(n) / (factorial(r) * factorial(n - r))
 * }
 * combinations(5, 3)
 * // 10 (5C3 = 5!/(3!×2!))
 * 
 * // Binomial coefficient
 * function binomial(n: number, k: number): number {
 *   return combinations(n, k)
 * }
 * binomial(10, 3)
 * // 120
 * 
 * // Stirling's approximation comparison
 * function stirlingApprox(n: number): number {
 *   if (n === 0) return 1
 *   // √(2πn) × (n/e)^n
 *   return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n)
 * }
 * const n = 10
 * const exact = factorial(n)
 * const approx = stirlingApprox(n)
 * const error = Math.abs(exact - approx) / exact
 * // error ≈ 0.0083 (0.83% error for n=10)
 * 
 * // Probability calculations
 * function probabilityOfOrder(items: number): number {
 *   // Probability that n items are in a specific order
 *   return 1 / factorial(items)
 * }
 * probabilityOfOrder(5)
 * // 0.008333... (1/120)
 * 
 * // Card arrangements
 * const deckSize = 52
 * const arrangements = factorial(deckSize)
 * // 8.065817517094388e+67 (number of ways to arrange a deck)
 * 
 * // Taylor series coefficients
 * function expTaylorTerm(x: number, n: number): number {
 *   return Math.pow(x, n) / factorial(n)
 * }
 * // e^x ≈ Σ(x^n/n!) for n=0 to infinity
 * 
 * // Rising factorial (Pochhammer symbol)
 * function risingFactorial(x: number, n: number): number {
 *   if (n === 0) return 1
 *   let product = 1
 *   for (let i = 0; i < n; i++) {
 *     product *= (x + i)
 *   }
 *   return product
 * }
 * 
 * // Falling factorial
 * function fallingFactorial(x: number, n: number): number {
 *   if (n === 0) return 1
 *   let product = 1
 *   for (let i = 0; i < n; i++) {
 *     product *= (x - i)
 *   }
 *   return product
 * }
 * 
 * // Double factorial (odd only shown)
 * function doubleFactorial(n: number): number {
 *   if (n <= 0) return 1
 *   if (n === 1 || n === 2) return n
 *   let product = n
 *   let current = n - 2
 *   while (current > 0) {
 *     product *= current
 *     current -= 2
 *   }
 *   return product
 * }
 * doubleFactorial(7)
 * // 105 (7 × 5 × 3 × 1)
 * 
 * // Subfactorial (derangements)
 * function subfactorial(n: number): number {
 *   if (n === 0) return 1
 *   if (n === 1) return 0
 *   // !n = n! × Σ((-1)^k/k!) for k=0 to n
 *   let sum = 0
 *   for (let k = 0; k <= n; k++) {
 *     sum += Math.pow(-1, k) / factorial(k)
 *   }
 *   return Math.round(factorial(n) * sum)
 * }
 * subfactorial(4)
 * // 9 (number of derangements of 4 items)
 * 
 * // Factorial sequence
 * const factorials = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const sequence = factorials.map(factorial)
 * // [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
 * 
 * // Memoized factorial for performance
 * const factorialMemo = (() => {
 *   const cache = new Map<number, number>()
 *   return (n: number): number => {
 *     if (cache.has(n)) return cache.get(n)!
 *     const result = factorial(n)
 *     cache.set(n, result)
 *     return result
 *   }
 * })()
 * 
 * // Safe factorial with validation
 * function safeFactorial(value: unknown): number | null {
 *   const num = typeof value === 'number' ? factorial(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeFactorial(5)
 * // 120
 * safeFactorial(-1)
 * // null
 * safeFactorial("5")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Only valid for non-negative integers
 * @property Overflow - Returns Infinity for n > 170
 */
const factorial = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
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
	
	// Check for values that would overflow
	if (n > 170) {
		return Infinity
	}
	
	// Base cases
	if (n === 0 || n === 1) {
		return 1
	}
	
	// Calculate factorial iteratively (more efficient than recursion)
	let result = 1
	for (let i = 2; i <= n; i++) {
		result *= i
	}
	
	return result
}

export default factorial