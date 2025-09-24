import isNullish from "../../validation/isNullish/index.ts"
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
 * @pure
 * @safe
 * @immutable
 * @idempotent
 * @example
 * ```typescript
 * // 2D vectors
 * normalize([3, 4])  // [0.6, 0.8] (3/5, 4/5)
 * normalize([1, 1])  // [0.707..., 0.707...] (1/√2)
 * normalize([5, 0])  // [1, 0] (unit vector along x-axis)
 *
 * // 3D vectors
 * normalize([2, 3, 6])  // [0.285..., 0.428..., 0.857...]
 * normalize([1, 1, 1])  // [0.577..., 0.577..., 0.577...]
 *
 * // Zero vector returns NaN array
 * normalize([0, 0, 0])  // [NaN, NaN, NaN]
 *
 * // Empty array returns empty
 * normalize([])  // []
 *
 * // Invalid inputs
 * normalize(null)  // []
 * normalize([1, "2", 3])  // [NaN, NaN, NaN]
 * ```
 */
const normalize = (
	vector: number[] | null | undefined,
): number[] => {
	if (isNullish(vector) || !Array.isArray(vector)) {
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
