/**
 * Calculates the magnitude (length) of a vector
 * 
 * Computes the Euclidean norm (L2 norm) of a vector, which represents
 * its length in n-dimensional space. This is the square root of the sum
 * of squared components. Returns NaN for invalid inputs or empty arrays.
 * 
 * @param vector - Array of vector components
 * @returns Magnitude of the vector (always non-negative), or NaN if invalid
 * @example
 * ```typescript
 * // 2D vectors
 * magnitude([3, 4])
 * // 5 (Pythagorean theorem: √(3² + 4²))
 * 
 * magnitude([1, 1])
 * // 1.414... (√2)
 * 
 * magnitude([5, 0])
 * // 5 (magnitude along x-axis)
 * 
 * magnitude([0, 7])
 * // 7 (magnitude along y-axis)
 * 
 * // 3D vectors
 * magnitude([2, 3, 6])
 * // 7 (√(4 + 9 + 36))
 * 
 * magnitude([1, 1, 1])
 * // 1.732... (√3)
 * 
 * // Higher dimensions
 * magnitude([1, 2, 2, 4])
 * // 5 (√(1 + 4 + 4 + 16))
 * 
 * // Single dimension
 * magnitude([5])
 * // 5 (absolute value)
 * 
 * magnitude([-5])
 * // 5 (always positive)
 * 
 * // Zero vector
 * magnitude([0, 0, 0])
 * // 0
 * 
 * // Empty array returns NaN
 * magnitude([])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * magnitude(null)
 * // NaN
 * 
 * magnitude([1, "2", 3])
 * // NaN
 * 
 * magnitude([1, null, 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Velocity magnitude
 * const speed = (velocityVector: number[]) =>
 *   magnitude(velocityVector)
 * speed([3, 4])     // 5 units/sec
 * speed([6, 8, 0])  // 10 units/sec
 * 
 * // Distance from origin
 * const distanceFromOrigin = (point: number[]) =>
 *   magnitude(point)
 * distanceFromOrigin([3, 4])      // 5
 * distanceFromOrigin([1, 1, 1])   // 1.732...
 * 
 * // Force calculation
 * const forceStrength = (forceComponents: number[]) =>
 *   magnitude(forceComponents)
 * forceStrength([30, 40])  // 50 Newtons
 * 
 * // Check if unit vector
 * const isUnitVector = (vec: number[]) =>
 *   Math.abs(magnitude(vec) - 1) < 0.0001
 * isUnitVector([0.6, 0.8])        // true
 * isUnitVector([1, 1])             // false
 * isUnitVector([0.577, 0.577, 0.577]) // true (approximately)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Non-negative - Result is always >= 0 for valid inputs
 * @property Norm - Implements L2 (Euclidean) norm
 */
const magnitude = (
	vector: number[] | null | undefined
): number => {
	if (vector == null || !Array.isArray(vector)) {
		return NaN
	}
	
	if (vector.length === 0) {
		return NaN
	}
	
	let sumOfSquares = 0
	
	for (const component of vector) {
		if (component == null || typeof component !== 'number') {
			return NaN
		}
		sumOfSquares += component * component
	}
	
	return Math.sqrt(sumOfSquares)
}

export default magnitude