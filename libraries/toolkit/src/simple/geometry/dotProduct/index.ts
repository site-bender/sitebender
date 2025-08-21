/**
 * Calculates the dot product (scalar product) of two vectors
 * 
 * Computes the sum of the products of corresponding components:
 * a·b = a₁b₁ + a₂b₂ + ... + aₙbₙ. The dot product measures how much
 * two vectors point in the same direction. Returns NaN for invalid
 * inputs or vectors of different dimensions.
 * 
 * @curried (vector1) => (vector2) => dot product
 * @param vector1 - First vector as array of numbers
 * @param vector2 - Second vector as array of numbers
 * @returns Dot product (scalar value), or NaN if invalid
 * @example
 * ```typescript
 * // Basic dot product
 * dotProduct([1, 2])([3, 4])
 * // 11 (1*3 + 2*4)
 * 
 * dotProduct([2, 3, 4])([5, 6, 7])
 * // 56 (2*5 + 3*6 + 4*7)
 * 
 * // Orthogonal vectors (perpendicular)
 * dotProduct([1, 0])([0, 1])
 * // 0 (90 degrees apart)
 * 
 * dotProduct([3, 4])([4, -3])
 * // 0 (perpendicular)
 * 
 * // Parallel vectors
 * dotProduct([2, 4])([1, 2])
 * // 10 (same direction)
 * 
 * dotProduct([2, 4])([-1, -2])
 * // -10 (opposite directions)
 * 
 * // Unit vectors
 * dotProduct([1, 0, 0])([1, 0, 0])
 * // 1 (same unit vector)
 * 
 * dotProduct([1, 0, 0])([0, 1, 0])
 * // 0 (orthogonal axes)
 * 
 * // With negative components
 * dotProduct([-1, 2, -3])([4, -5, 6])
 * // -32
 * 
 * // Single dimension
 * dotProduct([5])([3])
 * // 15
 * 
 * // Empty vectors
 * dotProduct([])([])
 * // 0
 * 
 * // Mismatched dimensions return NaN
 * dotProduct([1, 2])([3, 4, 5])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * dotProduct(null)([1, 2])
 * // NaN
 * 
 * dotProduct([1, "2"])([3, 4])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Angle between vectors (using dot product)
 * const v1 = [3, 4]
 * const v2 = [4, 3]
 * const dot = dotProduct(v1)(v2)
 * // 24 (use with magnitudes to find angle)
 * 
 * // Projection scalar
 * const force = [10, 5]
 * const direction = [0.8, 0.6]  // unit vector
 * const projection = dotProduct(force)(direction)
 * // 11 (force component in direction)
 * 
 * // Similarity measure
 * const userPrefs1 = [5, 3, 4, 4, 2]
 * const userPrefs2 = [4, 2, 5, 3, 3]
 * const similarity = dotProduct(userPrefs1)(userPrefs2)
 * // 66 (higher = more similar)
 * 
 * // Work calculation (physics)
 * const forceVector = [50, 30]  // Newtons
 * const displacement = [10, 5]   // meters
 * const work = dotProduct(forceVector)(displacement)
 * // 650 Joules
 * 
 * // Partial application for fixed vector
 * const dotWithBasis = dotProduct([1, 0, 0])
 * dotWithBasis([5, 3, 2])  // 5 (x-component)
 * dotWithBasis([0, 1, 0])  // 0 (orthogonal)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for fixed vectors
 * @property Safe - Returns NaN for invalid inputs or dimension mismatch
 * @property Commutative - dotProduct(a)(b) equals dotProduct(b)(a)
 */
const dotProduct = (
	vector1: Array<number> | null | undefined
) => (
	vector2: Array<number> | null | undefined
): number => {
	if (vector1 == null || !Array.isArray(vector1)) {
		return NaN
	}
	
	if (vector2 == null || !Array.isArray(vector2)) {
		return NaN
	}
	
	// Vectors must have same dimensions
	if (vector1.length !== vector2.length) {
		return NaN
	}
	
	// Empty vectors have dot product 0
	if (vector1.length === 0) {
		return 0
	}
	
	// Calculate sum of products
	let sum = 0
	for (let i = 0; i < vector1.length; i++) {
		const v1 = vector1[i]
		const v2 = vector2[i]
		
		if (typeof v1 !== 'number' || typeof v2 !== 'number') {
			return NaN
		}
		
		sum += v1 * v2
	}
	
	return sum
}

export default dotProduct