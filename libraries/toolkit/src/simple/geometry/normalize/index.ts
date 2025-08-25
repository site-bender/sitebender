import magnitude from "../magnitude/index.ts"

/**
 * Normalizes a vector to unit length
 *
 * Scales a vector so its magnitude becomes 1, preserving its direction.
 * This creates a unit vector pointing in the same direction as the original.
 * Returns array of NaN values for zero vectors or invalid inputs.
 *
 * @param vector - Array of vector components to normalize
 * @returns Unit vector in same direction, or array of NaN if invalid
 * @example
 * ```typescript
 * // 2D vectors
 * normalize([3, 4])
 * // [0.6, 0.8] (3/5, 4/5)
 *
 * normalize([1, 1])
 * // [0.707..., 0.707...] (1/√2 for each)
 *
 * normalize([5, 0])
 * // [1, 0] (unit vector along x-axis)
 *
 * normalize([0, 7])
 * // [0, 1] (unit vector along y-axis)
 *
 * // 3D vectors
 * normalize([2, 3, 6])
 * // [0.285..., 0.428..., 0.857...] (2/7, 3/7, 6/7)
 *
 * normalize([1, 1, 1])
 * // [0.577..., 0.577..., 0.577...] (1/√3 for each)
 *
 * // Higher dimensions
 * normalize([1, 2, 2, 4])
 * // [0.2, 0.4, 0.4, 0.8] (each divided by 5)
 *
 * // Already normalized
 * normalize([0.6, 0.8])
 * // [0.6, 0.8] (unchanged)
 *
 * // Negative components preserved
 * normalize([-3, 4])
 * // [-0.6, 0.8]
 *
 * normalize([1, -1])
 * // [0.707..., -0.707...]
 *
 * // Zero vector returns NaN array
 * normalize([0, 0, 0])
 * // [NaN, NaN, NaN]
 *
 * // Empty array returns empty
 * normalize([])
 * // []
 *
 * // Invalid inputs
 * normalize(null)
 * // []
 *
 * normalize([1, "2", 3])
 * // [NaN, NaN, NaN]
 *
 * // Practical examples
 *
 * // Direction vector
 * const getDirection = (from: number[], to: number[]) => {
 *   const diff = to.map((t, i) => t - from[i])
 *   return normalize(diff)
 * }
 * getDirection([0, 0], [3, 4])
 * // [0.6, 0.8]
 *
 * // Velocity direction
 * const velocityDirection = (velocity: number[]) =>
 *   normalize(velocity)
 * velocityDirection([10, 10, 0])
 * // [0.707..., 0.707..., 0]
 *
 * // Surface normal
 * const surfaceNormal = (tangent: number[]) => {
 *   // For 2D, perpendicular is [-y, x]
 *   const perp = [-tangent[1], tangent[0]]
 *   return normalize(perp)
 * }
 * surfaceNormal([1, 0])  // [0, 1]
 * surfaceNormal([3, 4])  // [-0.8, 0.6]
 *
 * // Basis vectors
 * const createBasis = (primary: number[]) => {
 *   const normalized = normalize(primary)
 *   return normalized
 * }
 * createBasis([2, 0, 0])  // [1, 0, 0] (x-axis)
 * createBasis([1, 1, 0])  // [0.707..., 0.707..., 0]
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN array for zero vectors
 * @property Idempotent - Normalizing a unit vector returns itself
 * @property Direction-preserving - Maintains vector direction
 */
const normalize = (
	vector: number[] | null | undefined,
): number[] => {
	if (vector == null || !Array.isArray(vector)) {
		return []
	}

	if (vector.length === 0) {
		return []
	}

	const mag = magnitude(vector)

	// Can't normalize zero vector or invalid vector
	if (mag === 0 || isNaN(mag)) {
		return vector.map(() => NaN)
	}

	return vector.map((component) => component / mag)
}

export default normalize
