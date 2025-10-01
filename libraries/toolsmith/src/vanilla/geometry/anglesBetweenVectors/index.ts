import radiansToDegrees from "../../trigonometry/radiansToDegrees/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import dotProduct from "../dotProduct/index.ts"
import magnitude from "../magnitude/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
