import isNullish from "../../validation/isNullish/index.ts"
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
 * @param vector1 - First vector as array of numbers
 * @param vector2 - Second vector as array of numbers
 * @param inDegrees - If true, returns degrees; otherwise radians (default: true)
 * @returns Angle between vectors, or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // 2D vectors - perpendicular
 * anglesBetweenVectors([1, 0])([0, 1])()  // 90 degrees
 * anglesBetweenVectors([1, 0])([0, 1])(false)  // π/2 radians
 *
 * // Parallel and opposite vectors
 * anglesBetweenVectors([2, 3])([4, 6])()  // 0 (same direction)
 * anglesBetweenVectors([1, 0])([-1, 0])()  // 180 (opposite)
 *
 * // 3D vectors
 * anglesBetweenVectors([1, 0, 0])([0, 1, 0])()  // 90
 * anglesBetweenVectors([1, 1, 1])([1, 1, 1])()  // 0 (same vector)
 *
 * // Invalid inputs return NaN
 * anglesBetweenVectors([0, 0])([1, 1])()  // NaN (zero vector)
 * anglesBetweenVectors([1, 2])([1, 2, 3])()  // NaN (dimension mismatch)
 *
 * // Partial application
 * const angleFromXAxis = anglesBetweenVectors([1, 0, 0])
 * angleFromXAxis([0, 1, 0])()  // 90 degrees
 * ```
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
	if (isNullish(vector1) || !Array.isArray(vector1)) {
		return NaN
	}

	if (isNullish(vector2) || !Array.isArray(vector2)) {
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
