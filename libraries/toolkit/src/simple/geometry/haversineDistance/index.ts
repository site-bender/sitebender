import degreesToRadians from "../../trigonometry/degreesToRadians/index.ts"

/**
 * Calculates the great-circle distance between two geographic points
 *
 * Uses the Haversine formula to compute the shortest distance between
 * two points on a sphere (Earth). Takes latitude/longitude in degrees
 * and returns distance in kilometers by default. Earth's mean radius
 * (6371 km) is used unless specified. Returns NaN for invalid inputs.
 *
 * @param point1 - First point as [latitude, longitude] in degrees
 * @param point2 - Second point as [latitude, longitude] in degrees
 * @param radius - Sphere radius in km (default: 6371 for Earth)
 * @returns Distance in kilometers, or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // Distance between cities
 * const newYork = [40.7128, -74.0060]
 * const london = [51.5074, -0.1278]
 * haversineDistance(newYork)(london)()
 * // 5570.2... km
 *
 * // Los Angeles to Tokyo
 * const losAngeles = [34.0522, -118.2437]
 * const tokyo = [35.6762, 139.6503]
 * haversineDistance(losAngeles)(tokyo)()
 * // 8815.7... km
 *
 * // Sydney to London
 * const sydney = [-33.8688, 151.2093]
 * haversineDistance(sydney)(london)()
 * // 17015.8... km
 *
 * // Short distances
 * const point1 = [52.5200, 13.4050]  // Berlin
 * const point2 = [52.5170, 13.4000]  // Nearby point
 * haversineDistance(point1)(point2)()
 * // 0.522... km
 *
 * // Same location
 * haversineDistance([40, -74])([40, -74])()
 * // 0
 *
 * // Antipodal points (opposite sides of Earth)
 * const northPole = [90, 0]
 * const southPole = [-90, 0]
 * haversineDistance(northPole)(southPole)()
 * // 20015.0... km (half Earth's circumference)
 *
 * // Equator to pole
 * const equator = [0, 0]
 * haversineDistance(equator)(northPole)()
 * // 10007.5... km (quarter circumference)
 *
 * // Custom radius (Mars: 3389.5 km)
 * const marsRadius = 3389.5
 * const marsPoint1 = [0, 0]
 * const marsPoint2 = [45, 90]
 * haversineDistance(marsPoint1)(marsPoint2)(marsRadius)
 * // 5321.8... km on Mars
 *
 * // Distance in miles (Earth radius: 3958.8 miles)
 * const milesRadius = 3958.8
 * haversineDistance(newYork)(london)(milesRadius)
 * // 3461.0... miles
 *
 * // Invalid inputs
 * haversineDistance(null)([0, 0])()
 * // NaN
 *
 * haversineDistance([0])([0, 0])()
 * // NaN (need lat and lon)
 *
 * haversineDistance([91, 0])([0, 0])()
 * // NaN (latitude out of range)
 *
 * // Practical examples
 *
 * // Flight distance calculator
 * function flightDistance(
 *   departure: [number, number],
 *   arrival: [number, number]
 * ): number {
 *   return haversineDistance(departure)(arrival)()
 * }
 *
 * // Delivery radius check
 * function withinDeliveryRadius(
 *   store: [number, number],
 *   customer: [number, number],
 *   maxRadius: number
 * ): boolean {
 *   return haversineDistance(store)(customer)() <= maxRadius
 * }
 *
 * // Find nearest location  
 * function findNearest(
 *   current: [number, number],
 *   locations: Array<[number, number]>
 * ): [number, number] | null {
 *   const fromCurrent = haversineDistance(current)
 *   return locations.reduce((acc, loc) => {
 *     const distance = fromCurrent(loc)()
 *     return distance < acc.minDistance 
 *       ? { nearest: loc, minDistance: distance }
 *       : acc
 *   }, { nearest: null as [number, number] | null, minDistance: Infinity }).nearest
 * }
 *
 * // Partial application for fixed origin
 * const fromParis = haversineDistance([48.8566, 2.3522])
 * fromParis([52.5200, 13.4050])()  // Paris to Berlin: 877.4 km
 * fromParis([41.9028, 12.4964])()  // Paris to Rome: 1105.7 km
 * fromParis([40.4168, -3.7038])()  // Paris to Madrid: 1053.6 km
 * ```
 */
const haversineDistance = (
	point1: [number, number] | null | undefined,
) =>
(
	point2: [number, number] | null | undefined,
) =>
(
	radius: number = 6371, // Earth's mean radius in km
): number => {
	if (point1 == null || !Array.isArray(point1) || point1.length !== 2) {
		return NaN
	}

	if (point2 == null || !Array.isArray(point2) || point2.length !== 2) {
		return NaN
	}

	const [lat1, lon1] = point1
	const [lat2, lon2] = point2

	// Validate coordinates
	if (
		lat1 == null || typeof lat1 !== "number" ||
		lon1 == null || typeof lon1 !== "number" ||
		lat2 == null || typeof lat2 !== "number" ||
		lon2 == null || typeof lon2 !== "number"
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
	if (radius == null || typeof radius !== "number" || radius <= 0) {
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
