/**
 * Calculates the cross product of two 3D vectors
 * 
 * Computes the vector cross product a × b, which produces a vector
 * perpendicular to both input vectors. The magnitude equals the area
 * of the parallelogram formed by the vectors. Follows the right-hand
 * rule for direction. Both vectors must be 3-dimensional. Returns
 * array of NaN values for invalid inputs.
 * 
 * @curried (a) => (b) => number[]
 * @param a - First 3D vector [x, y, z]
 * @param b - Second 3D vector [x, y, z]
 * @returns Cross product vector [x, y, z], or [NaN, NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Unit vectors
 * crossProduct([1, 0, 0])([0, 1, 0])
 * // [0, 0, 1] (x × y = z)
 * 
 * crossProduct([0, 1, 0])([0, 0, 1])
 * // [1, 0, 0] (y × z = x)
 * 
 * crossProduct([0, 0, 1])([1, 0, 0])
 * // [0, 1, 0] (z × x = y)
 * 
 * // Reverse order negates result
 * crossProduct([0, 1, 0])([1, 0, 0])
 * // [0, 0, -1] (y × x = -z)
 * 
 * // Parallel vectors give zero
 * crossProduct([1, 2, 3])([2, 4, 6])
 * // [0, 0, 0] (parallel vectors)
 * 
 * crossProduct([1, 0, 0])([3, 0, 0])
 * // [0, 0, 0] (same direction)
 * 
 * // General vectors
 * crossProduct([2, 3, 4])([5, 6, 7])
 * // [-3, 6, -3]
 * 
 * crossProduct([1, 2, 3])([4, 5, 6])
 * // [-3, 6, -3]
 * 
 * // Orthogonal vectors
 * crossProduct([3, 0, 0])([0, 4, 0])
 * // [0, 0, 12] (magnitude = 3 * 4)
 * 
 * // Self cross product is zero
 * crossProduct([1, 2, 3])([1, 2, 3])
 * // [0, 0, 0]
 * 
 * // Negative components
 * crossProduct([1, -1, 0])([0, 1, 1])
 * // [-1, -1, 1]
 * 
 * // Non-3D vectors return NaN
 * crossProduct([1, 2])([3, 4])
 * // [NaN, NaN, NaN]
 * 
 * crossProduct([1, 2, 3, 4])([5, 6, 7, 8])
 * // [NaN, NaN, NaN]
 * 
 * // Invalid inputs
 * crossProduct(null)([1, 2, 3])
 * // [NaN, NaN, NaN]
 * 
 * crossProduct([1, "2", 3])([4, 5, 6])
 * // [NaN, NaN, NaN]
 * 
 * // Practical examples
 * 
 * // Surface normal from two edges
 * const surfaceNormal = (edge1: number[], edge2: number[]) =>
 *   crossProduct(edge1)(edge2)
 * surfaceNormal([1, 0, 0], [0, 1, 0])
 * // [0, 0, 1] (pointing up)
 * 
 * // Triangle area
 * const triangleArea = (v1: number[], v2: number[]) => {
 *   const cross = crossProduct(v1)(v2)
 *   const magnitude = Math.sqrt(
 *     cross[0] ** 2 + cross[1] ** 2 + cross[2] ** 2
 *   )
 *   return magnitude / 2
 * }
 * triangleArea([3, 0, 0], [0, 4, 0])  // 6 square units
 * 
 * // Torque calculation
 * const torque = (position: number[], force: number[]) =>
 *   crossProduct(position)(force)
 * torque([1, 0, 0], [0, 10, 0])
 * // [0, 0, 10] (torque around z-axis)
 * 
 * // Angular momentum
 * const angularMomentum = (position: number[], momentum: number[]) =>
 *   crossProduct(position)(momentum)
 * angularMomentum([2, 0, 0], [0, 5, 0])
 * // [0, 0, 10]
 * 
 * // Check if vectors are coplanar
 * const areCoplanar = (v1: number[], v2: number[], v3: number[]) => {
 *   const cross = crossProduct(v1)(v2)
 *   const dotProduct = cross[0] * v3[0] + 
 *                      cross[1] * v3[1] + 
 *                      cross[2] * v3[2]
 *   return Math.abs(dotProduct) < 0.0001
 * }
 * areCoplanar([1, 0, 0], [0, 1, 0], [1, 1, 0])  // true
 * areCoplanar([1, 0, 0], [0, 1, 0], [0, 0, 1])  // false
 * 
 * // Right-hand rule verification
 * const rightHand = crossProduct([1, 0, 0])  // thumb
 * rightHand([0, 1, 0])  // [0, 0, 1] fingers point up
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns [NaN, NaN, NaN] for invalid inputs
 * @property Antisymmetric - a × b = -(b × a)
 * @property Orthogonal - Result perpendicular to both inputs
 */
const crossProduct = (
	a: number[] | null | undefined
) => (
	b: number[] | null | undefined
): number[] => {
	if (a == null || !Array.isArray(a)) {
		return [NaN, NaN, NaN]
	}
	
	if (b == null || !Array.isArray(b)) {
		return [NaN, NaN, NaN]
	}
	
	// Must be 3D vectors
	if (a.length !== 3 || b.length !== 3) {
		return [NaN, NaN, NaN]
	}
	
	// Check for non-numeric values
	for (let i = 0; i < 3; i++) {
		if (a[i] == null || typeof a[i] !== 'number') {
			return [NaN, NaN, NaN]
		}
		if (b[i] == null || typeof b[i] !== 'number') {
			return [NaN, NaN, NaN]
		}
	}
	
	// Calculate cross product: a × b
	// [a₁, a₂, a₃] × [b₁, b₂, b₃] = 
	// [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁]
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	]
}

export default crossProduct