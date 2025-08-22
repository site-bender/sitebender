import dotProduct from "../dotProduct/index.ts"

/**
 * Projects one vector onto another vector
 * 
 * Calculates the vector projection of vector a onto vector b, which is the
 * orthogonal projection of a onto the line spanned by b. The result is a
 * vector in the direction of b with magnitude equal to the component of a
 * in that direction. Formula: proj_b(a) = ((a·b) / (b·b)) × b. Returns
 * array of NaN values for invalid inputs.
 * 
 * @curried (vectorA) => (vectorB) => projected vector
 * @param vectorA - Vector to be projected
 * @param vectorB - Vector to project onto (non-zero)
 * @returns Projection of vectorA onto vectorB, or NaN array if invalid
 * @example
 * ```typescript
 * // Project onto x-axis
 * vectorProjection([3, 4])([1, 0])
 * // [3, 0] (only x-component remains)
 * 
 * // Project onto y-axis
 * vectorProjection([3, 4])([0, 1])
 * // [0, 4] (only y-component remains)
 * 
 * // Project onto diagonal
 * vectorProjection([4, 2])([1, 1])
 * // [3, 3] (projection onto 45° line)
 * 
 * // 3D projection
 * vectorProjection([1, 2, 3])([1, 0, 0])
 * // [1, 0, 0] (projection onto x-axis)
 * 
 * vectorProjection([2, 3, 4])([1, 1, 1])
 * // [3, 3, 3] (projection onto [1,1,1] direction)
 * 
 * // Orthogonal vectors
 * vectorProjection([1, 0])([0, 1])
 * // [0, 0] (perpendicular vectors have zero projection)
 * 
 * vectorProjection([3, 4])([-4, 3])
 * // [0, 0] (perpendicular)
 * 
 * // Parallel vectors
 * vectorProjection([2, 4])([1, 2])
 * // [2, 4] (same direction, full projection)
 * 
 * vectorProjection([3, 6])([-1, -2])
 * // [3, 6] (opposite direction, still projects)
 * 
 * // Different magnitudes
 * vectorProjection([6, 8])([3, 4])
 * // [6, 8] (parallel vectors)
 * 
 * // Zero vector projection
 * vectorProjection([0, 0])([1, 1])
 * // [0, 0] (zero vector projects to zero)
 * 
 * // Invalid: projecting onto zero vector
 * vectorProjection([1, 2])([0, 0])
 * // [NaN, NaN] (cannot project onto zero vector)
 * 
 * // Invalid inputs
 * vectorProjection([1, 2])([1])
 * // [NaN] (different dimensions)
 * 
 * vectorProjection(null)([1, 2])
 * // [NaN, NaN]
 * 
 * // Practical examples
 * 
 * // Shadow calculation (2D)
 * const shadowOnGround = (objectVector: Array<number>) => {
 *   const ground = [1, 0] // horizontal ground
 *   return vectorProjection(objectVector)(ground)
 * }
 * shadowOnGround([3, 4]) // [3, 0]
 * 
 * // Force component along a ramp
 * const forceAlongRamp = (force: Array<number>, rampDirection: Array<number>) => {
 *   return vectorProjection(force)(rampDirection)
 * }
 * 
 * // Decompose velocity into components
 * const velocity = [5, 3]
 * const direction1 = [1, 0] // x-direction
 * const direction2 = [0, 1] // y-direction
 * const vx = vectorProjection(velocity)(direction1) // [5, 0]
 * const vy = vectorProjection(velocity)(direction2) // [0, 3]
 * 
 * // Work calculation (force · displacement direction)
 * const workComponent = (force: Array<number>, displacement: Array<number>) => {
 *   const projection = vectorProjection(force)(displacement)
 *   // Magnitude of projection gives effective force
 *   return projection
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN array for invalid inputs
 * @property Domain - Cannot project onto zero vector
 */
const vectorProjection = (
	vectorA: Array<number> | null | undefined
) => (
	vectorB: Array<number> | null | undefined
): Array<number> => {
	if (vectorA == null || !Array.isArray(vectorA)) {
		return vectorB == null || !Array.isArray(vectorB) ? [] : 
			new Array(vectorB.length).fill(NaN)
	}
	
	if (vectorB == null || !Array.isArray(vectorB)) {
		return new Array(vectorA.length).fill(NaN)
	}
	
	// Check for dimension mismatch
	if (vectorA.length !== vectorB.length) {
		return new Array(Math.max(vectorA.length, vectorB.length)).fill(NaN)
	}
	
	// Check for empty vectors
	if (vectorA.length === 0) {
		return []
	}
	
	// Validate all elements are numbers
	if (!vectorA.every(x => typeof x === 'number' && isFinite(x))) {
		return new Array(vectorA.length).fill(NaN)
	}
	
	if (!vectorB.every(x => typeof x === 'number' && isFinite(x))) {
		return new Array(vectorB.length).fill(NaN)
	}
	
	// Calculate dot products
	const aDotB = dotProduct(vectorA)(vectorB)
	const bDotB = dotProduct(vectorB)(vectorB)
	
	// Cannot project onto zero vector
	if (bDotB === 0) {
		return new Array(vectorB.length).fill(NaN)
	}
	
	// Calculate scalar projection coefficient
	const scalar = aDotB / bDotB
	
	// Multiply vectorB by scalar to get projection
	return vectorB.map(component => scalar * component)
}

export default vectorProjection