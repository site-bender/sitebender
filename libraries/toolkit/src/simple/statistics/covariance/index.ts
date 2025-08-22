import mean from "../../math/mean/index.ts"

/**
 * Calculates the covariance between two datasets
 * 
 * Measures how two variables vary together. Positive covariance indicates
 * variables tend to increase together, negative indicates one increases as
 * the other decreases, and zero indicates no linear relationship. Returns
 * population covariance by default. Arrays must be of equal length. Returns
 * NaN for invalid inputs or arrays with less than 2 elements.
 * 
 * @curried (x) => (y) => (sample?) => number
 * @param x - First array of numeric values
 * @param y - Second array of numeric values
 * @param sample - If true, calculates sample covariance (divides by n-1)
 * @returns Covariance value, or NaN if invalid
 * @example
 * ```typescript
 * // Perfect positive covariance
 * covariance([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])()
 * // 4 (population covariance)
 * 
 * covariance([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])(true)
 * // 5 (sample covariance)
 * 
 * // Perfect negative covariance
 * covariance([1, 2, 3, 4, 5])([5, 4, 3, 2, 1])()
 * // -2 (population)
 * 
 * // No covariance (independent)
 * covariance([1, 2, 3, 4, 5])([3, 3, 3, 3, 3])()
 * // 0 (constant y values)
 * 
 * // Positive covariance
 * covariance([1, 2, 3, 4])([2, 3, 5, 7])()
 * // 2.25
 * 
 * // Negative covariance
 * covariance([1, 2, 3, 4])([7, 5, 3, 2])()
 * // -2.25
 * 
 * // Real-world values
 * covariance([10, 20, 30, 40, 50])([15, 25, 40, 45, 60])()
 * // 170
 * 
 * // Sample vs population
 * const data1 = [2, 4, 6, 8]
 * const data2 = [1, 3, 5, 7]
 * covariance(data1)(data2)()      // 5 (population)
 * covariance(data1)(data2)(true)  // 6.667 (sample)
 * 
 * // Different lengths return NaN
 * covariance([1, 2, 3])([1, 2])()
 * // NaN
 * 
 * // Too few elements return NaN
 * covariance([5])([10])()
 * // NaN
 * 
 * // Invalid inputs
 * covariance(null)([1, 2, 3])()
 * // NaN
 * 
 * covariance([1, "2", 3])([4, 5, 6])()
 * // NaN
 * 
 * // Practical examples
 * 
 * // Stock returns covariance
 * const stock1Returns = [0.02, 0.05, -0.01, 0.03, 0.04]
 * const stock2Returns = [0.01, 0.06, -0.02, 0.04, 0.03]
 * covariance(stock1Returns)(stock2Returns)()
 * // 0.00056 (they move together)
 * 
 * // Height and weight relationship
 * const heights = [160, 165, 170, 175, 180]  // cm
 * const weights = [60, 65, 68, 72, 78]       // kg
 * covariance(heights)(weights)()
 * // 42 (positive relationship)
 * 
 * // Temperature and ice cream sales
 * const temps = [20, 22, 25, 28, 30, 33]     // Celsius
 * const sales = [200, 250, 320, 410, 480, 550]  // units
 * covariance(temps)(sales)(true)  // Sample covariance
 * // 316.667
 * 
 * // Portfolio risk analysis
 * const asset1 = [0.1, -0.05, 0.08, 0.12, -0.02]
 * const asset2 = [0.08, -0.03, 0.06, 0.15, -0.01]
 * const cov = covariance(asset1)(asset2)()
 * // 0.00334 (assets move together, less diversification benefit)
 * 
 * // Partial application for multiple comparisons
 * const baseData = [1, 2, 3, 4, 5, 6]
 * const covWithBase = covariance(baseData)
 * 
 * const series1 = [2, 4, 6, 8, 10, 12]
 * const series2 = [6, 5, 4, 3, 2, 1]
 * 
 * covWithBase(series1)()  // 7 (strong positive)
 * covWithBase(series2)()  // -3.5 (negative)
 * 
 * // Variance as self-covariance
 * const data = [1, 2, 3, 4, 5]
 * covariance(data)(data)()  // 2 (equals variance)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Symmetric - cov(x,y) = cov(y,x)
 */
const covariance = (
	x: number[] | null | undefined
) => (
	y: number[] | null | undefined
) => (
	sample: boolean = false
): number => {
	if (x == null || !Array.isArray(x)) {
		return NaN
	}
	
	if (y == null || !Array.isArray(y)) {
		return NaN
	}
	
	if (x.length !== y.length) {
		return NaN
	}
	
	// Need at least 2 points for covariance
	if (x.length < 2) {
		return NaN
	}
	
	// Check for non-numeric values
	for (let i = 0; i < x.length; i++) {
		if (x[i] == null || typeof x[i] !== 'number') {
			return NaN
		}
		if (y[i] == null || typeof y[i] !== 'number') {
			return NaN
		}
	}
	
	// Calculate means
	const meanX = mean(x)
	const meanY = mean(y)
	
	// Calculate covariance
	let sum = 0
	for (let i = 0; i < x.length; i++) {
		sum += (x[i] - meanX) * (y[i] - meanY)
	}
	
	// Divide by n for population, n-1 for sample
	const divisor = sample ? x.length - 1 : x.length
	
	return sum / divisor
}

export default covariance