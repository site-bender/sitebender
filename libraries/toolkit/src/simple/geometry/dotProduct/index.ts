import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the dot product (scalar product) of two vectors
 *
 * Computes the sum of the products of corresponding components:
 * a·b = a₁b₁ + a₂b₂ + ... + aₙbₙ. The dot product measures how much
 * two vectors point in the same direction. Returns NaN for invalid
 * inputs or vectors of different dimensions.
 *
 * @param vector1 - First vector as array of numbers
 * @param vector2 - Second vector as array of numbers
 * @returns Dot product (scalar value), or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @commutative
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
 * dotProduct([1, "2"])([3, 4])  // NaN
 *
 * // Partial application for fixed vector
 * const dotWithBasis = dotProduct([1, 0, 0])
 * dotWithBasis([5, 3, 2])  // 5 (x-component)
 * dotWithBasis([0, 1, 0])  // 0 (orthogonal)
 * ```
 */
const dotProduct = (
	vector1: Array<number> | null | undefined,
) =>
(
	vector2: Array<number> | null | undefined,
): number => {
	if (isNullish(vector1) || !Array.isArray(vector1)) {
		return NaN
	}

	if (isNullish(vector2) || !Array.isArray(vector2)) {
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
	return vector1.reduce((sum, v1, i) => {
		const v2 = vector2[i]
		if (typeof v1 !== "number" || typeof v2 !== "number") {
			return NaN
		}
		return sum + v1 * v2
	}, 0)
}

export default dotProduct
