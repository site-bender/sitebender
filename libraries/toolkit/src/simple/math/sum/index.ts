/**
 * Sums all numbers in an array
 * 
 * Calculates the total sum of all numbers in the array by adding
 * them together sequentially. Returns 0 for an empty array (additive
 * identity). Returns NaN if any element is not a valid number.
 * 
 * @param numbers - Array of numbers to sum
 * @returns The sum of all numbers, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic addition
 * sum([1, 2, 3, 4, 5])
 * // 15
 * 
 * sum([10, 20, 30])
 * // 60
 * 
 * sum([100, 200, 300, 400])
 * // 1000
 * 
 * // Single element
 * sum([42])
 * // 42
 * 
 * sum([0])
 * // 0
 * 
 * sum([-5])
 * // -5
 * 
 * // Empty array (additive identity)
 * sum([])
 * // 0
 * 
 * // Negative numbers
 * sum([-1, -2, -3])
 * // -6
 * 
 * sum([-10, -20, -30])
 * // -60
 * 
 * // Mixed positive and negative
 * sum([10, -5, 3, -2])
 * // 6
 * 
 * sum([100, -50, 25, -75])
 * // 0
 * 
 * sum([-10, 20, -30, 40])
 * // 20
 * 
 * // Decimal numbers
 * sum([1.5, 2.5, 3.5])
 * // 7.5
 * 
 * sum([0.1, 0.2, 0.3])
 * // 0.6000000000000001 (floating point precision)
 * 
 * sum([99.99, 0.01])
 * // 100
 * 
 * // Zero values
 * sum([0, 0, 0, 0])
 * // 0
 * 
 * sum([5, 0, 3, 0, 2])
 * // 10
 * 
 * // Large numbers
 * sum([1000000, 2000000, 3000000])
 * // 6000000
 * 
 * sum([Number.MAX_SAFE_INTEGER, 0])
 * // 9007199254740991
 * 
 * // Small numbers
 * sum([0.001, 0.002, 0.003])
 * // 0.006
 * 
 * sum([1e-10, 2e-10, 3e-10])
 * // 6e-10
 * 
 * // Special values
 * sum([Infinity, 1])
 * // Infinity
 * 
 * sum([-Infinity, 100])
 * // -Infinity
 * 
 * sum([Infinity, -Infinity])
 * // NaN
 * 
 * sum([1, 2, NaN])
 * // NaN
 * 
 * // Invalid inputs
 * sum(null)
 * // NaN
 * 
 * sum(undefined)
 * // NaN
 * 
 * sum("not an array")
 * // NaN
 * 
 * sum([1, "2", 3])
 * // NaN
 * 
 * sum([1, null, 3])
 * // NaN
 * 
 * sum([1, undefined, 3])
 * // NaN
 * 
 * sum([1, {}, 3])
 * // NaN
 * 
 * // Financial calculations
 * const expenses = [120.50, 45.75, 89.99, 234.00]
 * const totalExpenses = sum(expenses)
 * // 490.24
 * 
 * const revenues = [1000, 1500, 1200, 1800]
 * const totalRevenue = sum(revenues)
 * // 5500
 * 
 * // Statistics
 * const scores = [85, 92, 78, 95, 88]
 * const totalScore = sum(scores)
 * // 438
 * const average = totalScore / scores.length
 * // 87.6
 * 
 * // Shopping cart
 * const prices = [19.99, 34.50, 12.75, 8.99]
 * const subtotal = sum(prices)
 * // 76.23
 * 
 * // Time tracking
 * const hoursWorked = [8, 7.5, 8, 8, 6.5]
 * const totalHours = sum(hoursWorked)
 * // 38
 * 
 * // Distance calculation
 * const segments = [5.2, 3.8, 7.1, 2.9]
 * const totalDistance = sum(segments)
 * // 19
 * 
 * // Energy consumption
 * const dailyUsage = [24.5, 26.3, 25.1, 27.8, 23.9, 24.6, 25.2]
 * const weeklyTotal = sum(dailyUsage)
 * // 177.4
 * 
 * // Vote counting
 * const candidateVotes = [15234, 18956, 12789, 9876]
 * const totalVotes = sum(candidateVotes)
 * // 56855
 * 
 * // Array method chaining
 * const data = [1, 2, 3, 4, 5]
 * const doubledSum = sum(data.map(x => x * 2))
 * // 30
 * 
 * // Filtering before sum
 * const allNumbers = [10, -5, 20, -15, 30]
 * const positiveSum = sum(allNumbers.filter(n => n > 0))
 * // 60
 * 
 * // Range sum
 * const range = Array.from({ length: 100 }, (_, i) => i + 1)
 * sum(range)
 * // 5050 (sum of 1 to 100)
 * 
 * // Geometric series
 * const powers = [1, 2, 4, 8, 16, 32]
 * sum(powers)
 * // 63
 * 
 * // Running total helper
 * const runningTotal = (values: Array<number>) => {
 *   const totals: Array<number> = []
 *   values.forEach((_, i) => {
 *     totals.push(sum(values.slice(0, i + 1)))
 *   })
 *   return totals
 * }
 * runningTotal([1, 2, 3, 4, 5])
 * // [1, 3, 6, 10, 15]
 * 
 * // Matrix row sums
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 * const rowSums = matrix.map(sum)
 * // [6, 15, 24]
 * 
 * // Weighted sum helper
 * const weightedSum = (values: Array<number>, weights: Array<number>) => {
 *   const products = values.map((v, i) => v * (weights[i] || 0))
 *   return sum(products)
 * }
 * weightedSum([80, 90, 85], [0.3, 0.4, 0.3])
 * // 85.5
 * 
 * // Checksum calculation
 * const digits = [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]
 * const checksum = sum(digits) % 10
 * // 5
 * 
 * // Probability (must sum to 1)
 * const probabilities = [0.2, 0.3, 0.15, 0.35]
 * sum(probabilities)
 * // 1
 * 
 * // Partition sum
 * const partition1 = [10, 20, 30]
 * const partition2 = [15, 25, 35]
 * const combinedSum = sum([...partition1, ...partition2])
 * // 135
 * 
 * // Safe sum with validation
 * const safeSum = (values: unknown): number | null => {
 *   if (!Array.isArray(values)) return null
 *   const result = sum(values)
 *   return isNaN(result) ? null : result
 * }
 * safeSum([1, 2, 3, 4, 5])
 * // 15
 * safeSum("invalid")
 * // null
 * safeSum([1, "2", 3])
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Identity - Returns 0 for empty array
 * @property Commutative - Order of elements doesn't affect result
 * @property Associative - Grouping of additions doesn't affect result
 */
const sum = (
	numbers: Array<number> | null | undefined
): number => {
	if (numbers == null || !Array.isArray(numbers)) {
		return NaN
	}
	
	if (numbers.length === 0) {
		return 0 // additive identity
	}
	
	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		num => num == null || typeof num !== 'number' || isNaN(num)
	)
	
	if (hasInvalidValue) {
		return NaN
	}
	
	// Calculate sum using reduce
	return numbers.reduce((acc, num) => acc + num, 0)
}

export default sum