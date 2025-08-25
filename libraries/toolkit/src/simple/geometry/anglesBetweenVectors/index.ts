import radiansToDegrees from "../../trigonometry/radiansToDegrees/index.ts"
import dotProduct from "../dotProduct/index.ts"
import magnitude from "../magnitude/index.ts"

/**
 * Calculates the angle between two vectors
 *
 * Computes the angle using the dot product formula: cos(θ) = (a·b)/(|a||b|).
 * Returns the angle in degrees by default, or radians if specified.
 * The angle is always between 0 and 180 degrees (0 to π radians).
 * Returns NaN for invalid inputs, zero vectors, or dimension mismatch.
 *
 * @curried (vector1) => (vector2) => (inDegrees?) => angle
 * @param vector1 - First vector as array of numbers
 * @param vector2 - Second vector as array of numbers
 * @param inDegrees - If true, returns degrees; otherwise radians (default: true)
 * @returns Angle between vectors, or NaN if invalid
 * @example
 * ```typescript
 * // 2D vectors - perpendicular
 * anglesBetweenVectors([1, 0])([0, 1])()
 * // 90 (degrees)
 *
 * anglesBetweenVectors([3, 0])([0, 4])()
 * // 90 (perpendicular vectors)
 *
 * // 2D vectors - 45 degrees
 * anglesBetweenVectors([1, 0])([1, 1])()
 * // 45
 *
 * // 2D vectors - 60 degrees
 * anglesBetweenVectors([1, 0])([0.5, 0.866])()
 * // 60 (approximately)
 *
 * // Parallel vectors (same direction)
 * anglesBetweenVectors([2, 3])([4, 6])()
 * // 0 (parallel, same direction)
 *
 * // Opposite vectors
 * anglesBetweenVectors([1, 0])([-1, 0])()
 * // 180 (opposite directions)
 *
 * anglesBetweenVectors([2, 3])([-2, -3])()
 * // 180
 *
 * // 3D vectors
 * anglesBetweenVectors([1, 0, 0])([0, 1, 0])()
 * // 90 (orthogonal axes)
 *
 * anglesBetweenVectors([1, 1, 0])([1, 0, 1])()
 * // 60
 *
 * anglesBetweenVectors([1, 1, 1])([1, 1, 1])()
 * // 0 (same vector)
 *
 * // Get angle in radians
 * anglesBetweenVectors([1, 0])([0, 1])(false)
 * // 1.5707... (π/2 radians)
 *
 * anglesBetweenVectors([1, 0])([-1, 0])(false)
 * // 3.1415... (π radians)
 *
 * // Acute angle
 * anglesBetweenVectors([3, 4])([4, 3])()
 * // 32.47... degrees
 *
 * // Obtuse angle
 * anglesBetweenVectors([1, 2])([-1, 1])()
 * // 108.43... degrees
 *
 * // Zero vector returns NaN
 * anglesBetweenVectors([0, 0])([1, 1])()
 * // NaN
 *
 * anglesBetweenVectors([1, 1])([0, 0, 0])()
 * // NaN
 *
 * // Mismatched dimensions
 * anglesBetweenVectors([1, 2])([1, 2, 3])()
 * // NaN
 *
 * // Invalid inputs
 * anglesBetweenVectors(null)([1, 2])()
 * // NaN
 *
 * anglesBetweenVectors([1, "2"])([3, 4])()
 * // NaN
 *
 * // Practical examples
 *
 * // Direction vectors in game
 * const playerDirection = [0.8, 0.6]
 * const enemyDirection = [0.6, -0.8]
 * const angle = anglesBetweenVectors(playerDirection)(enemyDirection)()
 * // 90 degrees (perpendicular)
 *
 * // Robot arm angles
 * const arm1 = [5, 0, 3]
 * const arm2 = [3, 4, 0]
 * const jointAngle = anglesBetweenVectors(arm1)(arm2)()
 * // 63.43... degrees
 *
 * // Light reflection
 * const incident = [-1, -1]
 * const normal = [0, 1]
 * const incidentAngle = anglesBetweenVectors(incident)(normal)()
 * // 135 degrees
 *
 * // Check if vectors are orthogonal
 * function areOrthogonal(v1: number[], v2: number[]): boolean {
 *   const angle = anglesBetweenVectors(v1)(v2)()
 *   return Math.abs(angle - 90) < 0.001
 * }
 *
 * // Check if vectors are parallel
 * function areParallel(v1: number[], v2: number[]): boolean {
 *   const angle = anglesBetweenVectors(v1)(v2)()
 *   return angle < 0.001 || Math.abs(angle - 180) < 0.001
 * }
 *
 * // Partial application for fixed reference
 * const angleFromXAxis = anglesBetweenVectors([1, 0, 0])
 * angleFromXAxis([1, 1, 0])()  // 45 degrees
 * angleFromXAxis([0, 1, 0])()  // 90 degrees
 * angleFromXAxis([1, 0, 1])()  // 45 degrees
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Range - Result is [0, 180] degrees or [0, π] radians
 */
const anglesBetweenVectors = (
	vector1: number[] | null | undefined,
) =>
(
	vector2: number[] | null | undefined,
) =>
(
	inDegrees: boolean = true,
): number => {
	if (vector1 == null || !Array.isArray(vector1)) {
		return NaN
	}

	if (vector2 == null || !Array.isArray(vector2)) {
		return NaN
	}

	// Check dimension match
	if (vector1.length !== vector2.length) {
		return NaN
	}

	// Calculate magnitudes
	const mag1 = magnitude(vector1)
	const mag2 = magnitude(vector2)

	// Check for zero vectors
	if (isNaN(mag1) || isNaN(mag2) || mag1 === 0 || mag2 === 0) {
		return NaN
	}

	// Calculate dot product
	const dot = dotProduct(vector1)(vector2)
	if (isNaN(dot)) {
		return NaN
	}

	// Calculate cosine of angle
	let cosAngle = dot / (mag1 * mag2)

	// Clamp to [-1, 1] to handle floating point errors
	cosAngle = Math.max(-1, Math.min(1, cosAngle))

	// Calculate angle in radians
	const angleRadians = Math.acos(cosAngle)

	// Return in degrees or radians as requested
	return inDegrees ? radiansToDegrees(angleRadians) : angleRadians
}

export default anglesBetweenVectors
