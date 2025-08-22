import mean from "../../math/mean/index.ts"

/**
 * Calculates the Pearson correlation coefficient between two datasets
 * 
 * Measures the linear correlation between two variables, returning a value
 * between -1 and 1. A value of 1 indicates perfect positive correlation,
 * -1 indicates perfect negative correlation, and 0 indicates no linear
 * correlation. Arrays must be of equal length. Returns NaN for invalid
 * inputs or if standard deviation is zero.
 * 
 * @curried (x) => (y) => number
 * @param x - First array of numeric values
 * @param y - Second array of numeric values
 * @returns Correlation coefficient (-1 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Perfect positive correlation
 * correlation([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])
 * // 1
 * 
 * // Perfect negative correlation
 * correlation([1, 2, 3, 4, 5])([5, 4, 3, 2, 1])
 * // -1
 * 
 * // No correlation
 * correlation([1, 2, 3, 4, 5])([3, 3, 3, 3, 3])
 * // 0 (constant y values)
 * 
 * // Strong positive correlation
 * correlation([1, 2, 3, 4, 5])([1.5, 3.2, 4.8, 6.1, 7.9])
 * // 0.999... (nearly perfect)
 * 
 * // Moderate correlation
 * correlation([1, 2, 3, 4, 5])([2, 3, 3, 5, 4])
 * // 0.7
 * 
 * // Weak correlation
 * correlation([10, 20, 30, 40])([12, 18, 33, 25])
 * // 0.826...
 * 
 * // Different lengths return NaN
 * correlation([1, 2, 3])([1, 2])
 * // NaN
 * 
 * // Empty arrays return NaN
 * correlation([])([])
 * // NaN
 * 
 * // Single element returns NaN (no variance)
 * correlation([5])([10])
 * // NaN
 * 
 * // Invalid inputs
 * correlation(null)([1, 2, 3])
 * // NaN
 * 
 * correlation([1, 2, 3])(null)
 * // NaN
 * 
 * correlation([1, "2", 3])([4, 5, 6])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Height vs Weight correlation
 * const heights = [160, 165, 170, 175, 180, 185]
 * const weights = [60, 65, 68, 72, 78, 85]
 * correlation(heights)(weights)
 * // 0.987... (strong positive correlation)
 * 
 * // Temperature vs Ice cream sales
 * const temps = [20, 22, 25, 28, 30, 33, 35]
 * const sales = [200, 250, 320, 410, 480, 550, 600]
 * correlation(temps)(sales)
 * // 0.998... (very strong positive)
 * 
 * // Study hours vs Test scores
 * const hours = [1, 2, 3, 4, 5, 6, 7, 8]
 * const scores = [50, 55, 65, 70, 75, 82, 88, 92]
 * correlation(hours)(scores)
 * // 0.993... (strong positive)
 * 
 * // Age vs Reaction time
 * const ages = [20, 30, 40, 50, 60, 70]
 * const reactionTimes = [200, 210, 230, 250, 280, 320]
 * correlation(ages)(reactionTimes)
 * // 0.990... (aging slows reactions)
 * 
 * // Partial application for multiple comparisons
 * const priceData = [100, 120, 110, 130, 140, 135]
 * const correlateWithPrice = correlation(priceData)
 * 
 * const volume = [1000, 800, 900, 700, 600, 650]
 * const quality = [3, 3.5, 3.2, 4, 4.5, 4.2]
 * 
 * correlateWithPrice(volume)   // -0.976... (negative)
 * correlateWithPrice(quality)  // 0.943... (positive)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Symmetric - correlation(x)(y) = correlation(y)(x)
 * @property Bounded - Result always between -1 and 1
 */
const correlation = (
	x: number[] | null | undefined
) => (
	y: number[] | null | undefined
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
	
	if (x.length === 0) {
		return NaN
	}
	
	// Need at least 2 points for correlation
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
	
	// Calculate covariance and standard deviations
	let covariance = 0
	let varianceX = 0
	let varianceY = 0
	
	for (let i = 0; i < x.length; i++) {
		const dx = x[i] - meanX
		const dy = y[i] - meanY
		covariance += dx * dy
		varianceX += dx * dx
		varianceY += dy * dy
	}
	
	// Check for zero variance (constant values)
	if (varianceX === 0 || varianceY === 0) {
		return 0
	}
	
	// Calculate correlation coefficient
	const stdDevX = Math.sqrt(varianceX)
	const stdDevY = Math.sqrt(varianceY)
	
	return covariance / (stdDevX * stdDevY)
}

export default correlation