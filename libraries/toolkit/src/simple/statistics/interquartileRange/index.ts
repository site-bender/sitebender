import percentile from "../percentile/index.ts"

/**
 * Calculates the interquartile range (IQR) of a dataset
 * 
 * Computes the difference between the third quartile (Q3, 75th percentile)
 * and the first quartile (Q1, 25th percentile). The IQR represents the
 * middle 50% of the data and is a robust measure of spread that is not
 * affected by outliers. Returns NaN for invalid inputs or empty arrays.
 * 
 * @param data - Array of numeric values
 * @returns Interquartile range (Q3 - Q1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic IQR calculation
 * interquartileRange([1, 2, 3, 4, 5])
 * // 3 (Q3=4.5, Q1=1.5, IQR=3)
 * 
 * interquartileRange([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // 5 (Q3=7.5, Q1=2.5, IQR=5)
 * 
 * // Dataset with outliers
 * interquartileRange([1, 2, 3, 4, 5, 100])
 * // 2.5 (outlier doesn't affect IQR much)
 * 
 * // Symmetric distribution
 * interquartileRange([10, 20, 30, 40, 50])
 * // 30 (Q3=45, Q1=15, IQR=30)
 * 
 * // Repeated values
 * interquartileRange([1, 1, 2, 3, 4, 4, 4, 5])
 * // 3 (Q3=4, Q1=1, IQR=3)
 * 
 * // Small dataset
 * interquartileRange([1, 2, 3])
 * // 2 (Q3=3, Q1=1, IQR=2)
 * 
 * // Single value
 * interquartileRange([42])
 * // 0 (Q3=Q1=42)
 * 
 * // Two values
 * interquartileRange([10, 20])
 * // 10 (Q3=20, Q1=10)
 * 
 * // Invalid inputs
 * interquartileRange([])
 * // NaN (empty array)
 * 
 * interquartileRange(null)
 * // NaN
 * 
 * interquartileRange([1, "2", 3])
 * // NaN (non-numeric value)
 * 
 * // Practical examples
 * 
 * // Salary distribution analysis
 * const salaries = [35000, 42000, 48000, 52000, 58000, 65000, 72000, 85000, 120000]
 * const iqr = interquartileRange(salaries)
 * // 30000 (middle 50% spans 30k)
 * 
 * // Outlier detection using 1.5 × IQR rule
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25]
 * const q1 = percentile(25)(data)
 * const q3 = percentile(75)(data)
 * const iqr = interquartileRange(data)
 * const lowerFence = q1 - 1.5 * iqr
 * const upperFence = q3 + 1.5 * iqr
 * const outliers = data.filter(x => x < lowerFence || x > upperFence)
 * // outliers: [25]
 * 
 * // Response time analysis
 * const responseTimes = [100, 110, 120, 130, 140, 150, 200, 250, 500]
 * const timeIQR = interquartileRange(responseTimes)
 * // 100ms (Q3=225, Q1=125)
 * 
 * // Grade distribution
 * const grades = [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]
 * const gradeIQR = interquartileRange(grades)
 * // 15 (Q3=89, Q1=74)
 * 
 * // Box plot statistics
 * function boxPlotStats(data: number[]) {
 *   const q1 = percentile(25)(data)
 *   const q2 = percentile(50)(data)
 *   const q3 = percentile(75)(data)
 *   const iqr = interquartileRange(data)
 *   return {
 *     min: Math.min(...data),
 *     q1,
 *     median: q2,
 *     q3,
 *     max: Math.max(...data),
 *     iqr,
 *     lowerWhisker: Math.max(Math.min(...data), q1 - 1.5 * iqr),
 *     upperWhisker: Math.min(Math.max(...data), q3 + 1.5 * iqr)
 *   }
 * }
 * 
 * // Robust spread comparison
 * const dataset1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const dataset2 = [1, 1, 2, 4, 6, 8, 9, 9, 9]
 * interquartileRange(dataset1) // 5
 * interquartileRange(dataset2) // 7 (more spread in middle)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Robust - Not affected by outliers
 * @property Statistical - Measures middle 50% spread
 */
const interquartileRange = (
	data: number[] | null | undefined
): number => {
	if (data == null || !Array.isArray(data)) {
		return NaN
	}
	
	if (data.length === 0) {
		return NaN
	}
	
	// Calculate Q1 (25th percentile) and Q3 (75th percentile)
	const q1 = percentile(25)(data)
	const q3 = percentile(75)(data)
	
	// If either percentile is NaN, return NaN
	if (isNaN(q1) || isNaN(q3)) {
		return NaN
	}
	
	// IQR is the difference between Q3 and Q1
	return q3 - q1
}

export default interquartileRange