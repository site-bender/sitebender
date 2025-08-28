/**
 * Calculates the cross product of two 3D vectors
 *
 * Computes the vector cross product a × b, which produces a vector
 * perpendicular to both input vectors. The magnitude equals the area
 * of the parallelogram formed by the vectors. Follows the right-hand
 * rule for direction. Both vectors must be 3-dimensional. Returns
 * array of NaN values for invalid inputs.
 *
 * @param a - First 3D vector [x, y, z]
 * @param b - Second 3D vector [x, y, z]
 * @returns Cross product vector [x, y, z], or [NaN, NaN, NaN] if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // Unit vectors follow right-hand rule
 * crossProduct([1, 0, 0])([0, 1, 0])  // [0, 0, 1] (x × y = z)
 * crossProduct([0, 1, 0])([0, 0, 1])  // [1, 0, 0] (y × z = x)
 * crossProduct([0, 0, 1])([1, 0, 0])  // [0, 1, 0] (z × x = y)
 *
 * // Parallel vectors give zero
 * crossProduct([1, 2, 3])([2, 4, 6])  // [0, 0, 0]
 *
 * // General vectors
 * crossProduct([2, 3, 4])([5, 6, 7])  // [-3, 6, -3]
 *
 * // Non-3D vectors return NaN array
 * crossProduct([1, 2])([3, 4])  // [NaN, NaN, NaN]
 * crossProduct(null)([1, 2, 3])  // [NaN, NaN, NaN]
 *
 * // Surface normal calculation
 * const surfaceNormal = crossProduct([1, 0, 0])
 * surfaceNormal([0, 1, 0])  // [0, 0, 1] (pointing up)
 * ```
 */
const crossProduct = (
	a: number[] | null | undefined,
) =>
(
	b: number[] | null | undefined,
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
	const isValidVector = (v: number[]) => 
		v.every(comp => comp != null && typeof comp === "number")
	
	if (!isValidVector(a) || !isValidVector(b)) {
		return [NaN, NaN, NaN]
	}

	// Calculate cross product: a × b
	// [a₁, a₂, a₃] × [b₁, b₂, b₃] =
	// [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁]
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0],
	]
}

export default crossProduct
