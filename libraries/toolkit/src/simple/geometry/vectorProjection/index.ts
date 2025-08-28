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
 * @param vectorA - Vector to be projected
 * @param vectorB - Vector to project onto (non-zero)
 * @returns Projection of vectorA onto vectorB, or NaN array if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // Project onto axes
 * vectorProjection([3, 4])([1, 0])  // [3, 0] (x-component)
 * vectorProjection([3, 4])([0, 1])  // [0, 4] (y-component)
 * vectorProjection([4, 2])([1, 1])  // [3, 3] (diagonal)
 *
 * // 3D projection
 * vectorProjection([1, 2, 3])([1, 0, 0])  // [1, 0, 0]
 * vectorProjection([2, 3, 4])([1, 1, 1])  // [3, 3, 3]
 *
 * // Orthogonal vectors project to zero
 * vectorProjection([1, 0])([0, 1])  // [0, 0]
 * vectorProjection([3, 4])([-4, 3])  // [0, 0]
 *
 * // Invalid: cannot project onto zero vector
 * vectorProjection([1, 2])([0, 0])  // [NaN, NaN]
 * vectorProjection(null)([1, 2])  // [NaN, NaN]
 * ```
 */
const vectorProjection = (
	vectorA: Array<number> | null | undefined,
) =>
(
	vectorB: Array<number> | null | undefined,
): Array<number> => {
	if (vectorA == null || !Array.isArray(vectorA)) {
		return vectorB == null || !Array.isArray(vectorB)
			? []
			: new Array(vectorB.length).fill(NaN)
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
	if (!vectorA.every((x) => typeof x === "number" && isFinite(x))) {
		return new Array(vectorA.length).fill(NaN)
	}

	if (!vectorB.every((x) => typeof x === "number" && isFinite(x))) {
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
	return vectorB.map((component) => scalar * component)
}

export default vectorProjection
