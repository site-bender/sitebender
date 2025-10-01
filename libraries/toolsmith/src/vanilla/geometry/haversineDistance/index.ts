import degreesToRadians from "../../trigonometry/degreesToRadians/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const haversineDistance = (
	point1: [number, number] | null | undefined,
) =>
(
	point2: [number, number] | null | undefined,
) =>
(
	radius: number = 6371, // Earth's mean radius in km
): number => {
	if (isNullish(point1) || !Array.isArray(point1) || point1.length !== 2) {
		return NaN
	}

	if (isNullish(point2) || !Array.isArray(point2) || point2.length !== 2) {
		return NaN
	}

	const [lat1, lon1] = point1
	const [lat2, lon2] = point2

	// Validate coordinates
	if (
		isNullish(lat1) || typeof lat1 !== "number" ||
		isNullish(lon1) || typeof lon1 !== "number" ||
		isNullish(lat2) || typeof lat2 !== "number" ||
		isNullish(lon2) || typeof lon2 !== "number"
	) {
		return NaN
	}

	// Validate latitude range (-90 to 90)
	if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
		return NaN
	}

	// Validate longitude range (-180 to 180)
	if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
		return NaN
	}

	// Validate radius
	if (isNullish(radius) || typeof radius !== "number" || radius <= 0) {
		return NaN
	}

	// Convert to radians
	const lat1Rad = degreesToRadians(lat1)
	const lat2Rad = degreesToRadians(lat2)
	const deltaLatRad = degreesToRadians(lat2 - lat1)
	const deltaLonRad = degreesToRadians(lon2 - lon1)

	// Haversine formula
	const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) *
			Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	return radius * c
}

export default haversineDistance
