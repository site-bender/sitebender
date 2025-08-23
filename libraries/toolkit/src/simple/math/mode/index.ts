/**
 * Finds the most frequent value(s) in an array of numbers
 * 
 * Returns an array containing the value(s) that appear most frequently
 * in the input array. If multiple values share the highest frequency,
 * all are returned in ascending order. Returns an empty array for
 * empty input or arrays containing non-numeric values.
 * 
 * @curried (numbers) => modes
 * @param numbers - Array of numbers to find the mode(s) of
 * @returns Array of most frequent value(s), or empty array if invalid
 * @example
 * ```typescript
 * // Single mode
 * mode([1, 2, 2, 3, 4])
 * // [2]
 * 
 * mode([5, 5, 5, 1, 2, 3])
 * // [5]
 * 
 * mode([7, 7, 7, 7, 7])
 * // [7]
 * 
 * // Multiple modes (bimodal/multimodal)
 * mode([1, 1, 2, 2, 3])
 * // [1, 2]
 * 
 * mode([4, 4, 4, 6, 6, 6, 2])
 * // [4, 6]
 * 
 * mode([1, 2, 3, 1, 2, 3])
 * // [1, 2, 3]
 * 
 * // No repeating values (all are modes)
 * mode([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * mode([10])
 * // [10]
 * 
 * // Negative numbers
 * mode([-1, -1, -2, -2, -3])
 * // [-2, -1]
 * 
 * mode([-5, -5, -5, 0, 1])
 * // [-5]
 * 
 * // Mixed positive and negative
 * mode([-2, -1, 0, 0, 1, 2])
 * // [0]
 * 
 * mode([-3, -3, 3, 3])
 * // [-3, 3]
 * 
 * // Decimal numbers
 * mode([1.5, 2.5, 1.5, 3.5])
 * // [1.5]
 * 
 * mode([0.1, 0.2, 0.1, 0.2])
 * // [0.1, 0.2]
 * 
 * mode([3.14, 3.14, 2.71, 2.71])
 * // [2.71, 3.14]
 * 
 * // Large frequency differences
 * mode([1, 1, 1, 1, 1, 2, 3])
 * // [1]
 * 
 * mode([9, 9, 9, 9, 8, 8, 7])
 * // [9]
 * 
 * // Sorted vs unsorted input
 * mode([3, 1, 2, 1, 3, 2, 1])
 * // [1]
 * 
 * mode([1, 1, 1, 2, 2, 3, 3])
 * // [1]
 * 
 * // Zero handling
 * mode([0, 0, 0, 1, 2])
 * // [0]
 * 
 * mode([0, 1, 0, 1, 0])
 * // [0]
 * 
 * // Large numbers
 * mode([1000000, 1000000, 2000000])
 * // [1000000]
 * 
 * mode([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0])
 * // [Number.MAX_SAFE_INTEGER]
 * 
 * // Special numeric values
 * mode([Infinity, Infinity, 1, 2])
 * // [Infinity]
 * 
 * mode([-Infinity, -Infinity, 0])
 * // [-Infinity]
 * 
 * mode([1, 2, NaN, 3])
 * // [] (contains NaN, returns empty)
 * 
 * // Empty array
 * mode([])
 * // []
 * 
 * // Invalid inputs
 * mode(null)
 * // []
 * 
 * mode(undefined)
 * // []
 * 
 * mode("not an array")
 * // []
 * 
 * mode([1, "2", 3])
 * // [] (contains non-numeric)
 * 
 * mode([1, null, 3])
 * // []
 * 
 * mode([1, undefined, 3])
 * // []
 * 
 * // Statistical examples
 * const testScores = [85, 90, 85, 92, 85, 88, 90]
 * mode(testScores)
 * // [85]
 * 
 * const dicRolls = [1, 3, 6, 3, 4, 2, 6, 3, 6, 5]
 * mode(dicRolls)
 * // [3, 6]
 * 
 * const shoeSizes = [9, 10, 9, 10.5, 9, 11, 9, 10]
 * mode(shoeSizes)
 * // [9]
 * 
 * // Survey responses (1-5 scale)
 * const ratings = [4, 5, 3, 5, 4, 5, 2, 5, 4, 3]
 * mode(ratings)
 * // [5]
 * 
 * // Temperature readings
 * const temps = [72, 73, 72, 71, 72, 74, 72]
 * mode(temps)
 * // [72]
 * 
 * // Class attendance (number of students)
 * const attendance = [28, 30, 29, 30, 28, 30, 29]
 * mode(attendance)
 * // [30]
 * 
 * // Product defects per batch
 * const defects = [0, 1, 0, 2, 0, 1, 0, 3]
 * mode(defects)
 * // [0]
 * 
 * // Network latency (ms)
 * const latencies = [45, 52, 45, 48, 45, 52, 50]
 * mode(latencies)
 * // [45]
 * 
 * // Categorical data encoded as numbers
 * const categories = [1, 2, 1, 3, 1, 2, 1, 4]
 * mode(categories)
 * // [1] (most common category)
 * 
 * // Lottery numbers
 * const lotteryDraws = [7, 13, 7, 22, 7, 13, 35]
 * mode(lotteryDraws)
 * // [7]
 * 
 * // Finding consensus
 * const votes = [1, 2, 1, 1, 3, 2, 1]
 * mode(votes)
 * // [1] (winning option)
 * 
 * // Bimodal distribution
 * const bimodal = [20, 21, 20, 21, 20, 21, 25]
 * mode(bimodal)
 * // [20, 21]
 * 
 * // Uniform distribution
 * const uniform = [1, 2, 3, 4, 5, 6]
 * mode(uniform)
 * // [1, 2, 3, 4, 5, 6] (all equally frequent)
 * 
 * // Peak detection in histogram
 * const histogram = [5, 5, 10, 10, 10, 8, 8, 3]
 * mode(histogram)
 * // [10]
 * 
 * // Customer purchase quantities
 * const quantities = [1, 2, 1, 3, 1, 2, 1, 4, 1]
 * mode(quantities)
 * // [1] (most common quantity)
 * 
 * // Error codes
 * const errorCodes = [404, 500, 404, 403, 404, 500]
 * mode(errorCodes)
 * // [404]
 * 
 * // Pipeline with filtering
 * const getMostCommon = (data: Array<number>, threshold: number): Array<number> => {
 *   const filtered = data.filter(x => x >= threshold)
 *   return mode(filtered)
 * }
 * getMostCommon([1, 2, 2, 3, 3, 3], 2)
 * // [3]
 * 
 * // Analyzing patterns
 * const pattern = [1, 2, 1, 2, 1, 2, 3]
 * const mostFrequent = mode(pattern)
 * // [1, 2]
 * 
 * // Safe mode with validation
 * const safeMode = (values: unknown): Array<number> | null => {
 *   if (!Array.isArray(values)) return null
 *   const result = mode(values)
 *   return result.length > 0 ? result : null
 * }
 * safeMode([1, 1, 2, 3])
 * // [1]
 * safeMode("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns empty array for invalid inputs
 * @property Deterministic - Results are always sorted in ascending order
 * @property Complete - Returns all values with highest frequency
 */
const mode = (
	numbers: Array<number> | null | undefined
): Array<number> => {
	if (numbers == null || !Array.isArray(numbers)) {
		return []
	}
	
	if (numbers.length === 0) {
		return []
	}
	
	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		num => num == null || typeof num !== 'number' || isNaN(num)
	)
	
	if (hasInvalidValue) {
		return []
	}
	
	// Count frequencies using reduce
	const frequency = numbers.reduce((acc, num) => {
		acc.set(num, (acc.get(num) || 0) + 1)
		return acc
	}, new Map<number, number>())
	
	// Find maximum frequency using reduce
	const maxFrequency = Array.from(frequency.values()).reduce(
		(max, count) => count > max ? count : max,
		0
	)
	
	// Collect all values with maximum frequency and sort
	return Array.from(frequency.entries())
		.filter(([_, count]) => count === maxFrequency)
		.map(([value, _]) => value)
		.sort((a, b) => a - b)
}

export default mode