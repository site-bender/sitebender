/**
 * Finds the value closest to a target number
 * 
 * Searches through an array of numbers to find the value that has the
 * smallest absolute difference from the target. When multiple values
 * are equally close, returns the first one encountered.
 * 
 * @curried (target) => (array) => result
 * @param target - The target number to find the closest value to
 * @param array - Array of numbers to search through
 * @returns The value from the array closest to the target, or null for empty/invalid arrays
 * @example
 * ```typescript
 * // Find closest to 5
 * closest(5)([1, 3, 6, 9])
 * // 6
 * 
 * // Find closest to 10
 * closest(10)([2, 5, 8, 14, 20])
 * // 8
 * 
 * // Negative numbers
 * closest(0)([-5, -2, 3, 7])
 * // -2
 * 
 * // Decimal numbers
 * closest(3.7)([1.2, 3.4, 4.1, 2.8])
 * // 3.4
 * 
 * // Exact match
 * closest(5)([1, 3, 5, 7])
 * // 5
 * 
 * // Equal distance - returns first
 * closest(5)([3, 7, 2, 8])
 * // 3 (both 3 and 7 are distance 2, but 3 comes first)
 * 
 * // Large numbers
 * closest(1000)([100, 500, 1500, 2000])
 * // 500
 * 
 * // Find closest temperature
 * const targetTemp = 72
 * const readings = [68, 70, 74, 76, 80]
 * closest(targetTemp)(readings)
 * // 70
 * 
 * // Find closest price point
 * const budget = 250
 * const prices = [199, 229, 279, 299, 349]
 * closest(budget)(prices)
 * // 229
 * 
 * // Partial application for reusable finders
 * const findClosestToZero = closest(0)
 * findClosestToZero([-10, -5, 3, 8])  // 3
 * findClosestToZero([1, -1, 2, -2])   // 1 (first encountered)
 * 
 * const findClosestTo100 = closest(100)
 * findClosestTo100([50, 75, 125, 150]) // 75
 * findClosestTo100([90, 95, 105, 110]) // 95
 * 
 * // Single element array
 * closest(10)([5])
 * // 5
 * 
 * // Empty array
 * closest(5)([])
 * // null
 * 
 * // Handle null/undefined gracefully
 * closest(5)(null)
 * // null
 * closest(5)(undefined)
 * // null
 * 
 * // Non-numeric values are filtered out
 * closest(5)([1, 3, NaN, 7, Infinity, 9])
 * // 3
 * 
 * // All non-numeric
 * closest(5)([NaN, Infinity, -Infinity])
 * // null
 * 
 * // Negative target
 * closest(-10)([-15, -8, -3, 0, 5])
 * // -8
 * 
 * // Find closest year
 * const targetYear = 2020
 * const years = [2015, 2018, 2022, 2025]
 * closest(targetYear)(years)
 * // 2018
 * ```
 * @property Immutable - doesn't modify input array
 * @property Deterministic - always returns same result for same input
 * @property Stable - returns first value when multiple are equally close
 */
const closest = (
	target: number
) => (
	array: ReadonlyArray<number> | null | undefined
): number | null => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return null
	}
	
	// Filter out non-finite numbers
	const validNumbers = array.filter(n => Number.isFinite(n))
	
	if (validNumbers.length === 0) {
		return null
	}
	
	// Use reduce to find the closest value
	const result = validNumbers.reduce((closestValue, currentValue) => {
		const currentDistance = Math.abs(currentValue - target)
		const closestDistance = Math.abs(closestValue - target)
		
		return currentDistance < closestDistance ? currentValue : closestValue
	})
	
	return result
}

export default closest