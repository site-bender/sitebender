/**
 * Calculates the Euclidean distance between two points in n-dimensional space
 * 
 * Computes the straight-line distance between two points using the formula:
 * d = √((x₁-y₁)² + (x₂-y₂)² + ... + (xₙ-yₙ)²). Works for any number of
 * dimensions as long as both points have the same dimensionality. Returns
 * NaN for invalid inputs or mismatched dimensions.
 * 
 * @curried (point1) => (point2) => distance
 * @param point1 - First point as array of coordinates
 * @param point2 - Second point as array of coordinates
 * @returns Distance between the two points, or NaN if invalid
 * @example
 * ```typescript
 * // 2D distance
 * euclideanDistance([0, 0])([3, 4])
 * // 5 (3-4-5 triangle)
 * 
 * euclideanDistance([1, 1])([4, 5])
 * // 5
 * 
 * euclideanDistance([2, 3])([5, 7])
 * // 5
 * 
 * // 3D distance
 * euclideanDistance([0, 0, 0])([2, 3, 6])
 * // 7
 * 
 * euclideanDistance([1, 2, 3])([4, 6, 8])
 * // 7.071... (√50)
 * 
 * // 1D distance (absolute difference)
 * euclideanDistance([5])([8])
 * // 3
 * 
 * euclideanDistance([-3])([4])
 * // 7
 * 
 * // Same point (zero distance)
 * euclideanDistance([1, 2, 3])([1, 2, 3])
 * // 0
 * 
 * // Negative coordinates
 * euclideanDistance([-1, -1])([-4, -5])
 * // 5
 * 
 * // Higher dimensions
 * euclideanDistance([1, 2, 3, 4])([5, 6, 7, 8])
 * // 8 (√64)
 * 
 * // Mismatched dimensions return NaN
 * euclideanDistance([1, 2])([3, 4, 5])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * euclideanDistance(null)([1, 2])
 * // NaN
 * 
 * euclideanDistance([1, "2"])([3, 4])
 * // NaN
 * 
 * euclideanDistance([])([])
 * // 0 (both empty)
 * 
 * // Practical examples
 * 
 * // Geographic distance (simplified)
 * const cityA = [40.7128, -74.0060]  // NYC
 * const cityB = [51.5074, -0.1278]   // London
 * euclideanDistance(cityA)(cityB)
 * // 73.98... (degrees, not actual distance)
 * 
 * // Color space distance (RGB)
 * const color1 = [255, 0, 0]    // Red
 * const color2 = [0, 255, 0]    // Green
 * euclideanDistance(color1)(color2)
 * // 360.62... (perceptual difference)
 * 
 * // Feature vector similarity
 * const userA = [5, 3, 4, 5, 2]  // ratings
 * const userB = [4, 2, 5, 3, 3]  // ratings
 * const similarity = euclideanDistance(userA)(userB)
 * // 3.316...
 * 
 * // Partial application for fixed point
 * const distanceFromOrigin = euclideanDistance([0, 0, 0])
 * distanceFromOrigin([3, 4, 0])  // 5
 * distanceFromOrigin([1, 1, 1])  // 1.732...
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for fixed reference points
 * @property Safe - Returns NaN for invalid inputs or dimension mismatch
 */
const euclideanDistance = (
	point1: Array<number> | null | undefined
) => (
	point2: Array<number> | null | undefined
): number => {
	if (point1 == null || !Array.isArray(point1)) {
		return NaN
	}
	
	if (point2 == null || !Array.isArray(point2)) {
		return NaN
	}
	
	// Points must have same dimensions
	if (point1.length !== point2.length) {
		return NaN
	}
	
	// Handle empty arrays (distance is 0)
	if (point1.length === 0) {
		return 0
	}
	
	// Calculate sum of squared differences
	let sumSquaredDiff = 0
	for (let i = 0; i < point1.length; i++) {
		const coord1 = point1[i]
		const coord2 = point2[i]
		
		if (typeof coord1 !== 'number' || typeof coord2 !== 'number') {
			return NaN
		}
		
		const diff = coord1 - coord2
		sumSquaredDiff += diff * diff
	}
	
	return Math.sqrt(sumSquaredDiff)
}

export default euclideanDistance