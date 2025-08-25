/**
 * Calculates velocity from distance and time
 *
 * Computes velocity using the formula v = d/t where v is velocity,
 * d is distance, and t is time. Returns the rate of change of position.
 * Returns NaN for invalid inputs or when time is zero or negative.
 *
 * @curried (distance) => (time) => number
 * @param distance - Distance traveled (any unit)
 * @param time - Time taken (must be positive)
 * @returns Velocity (distance per unit time), or NaN if invalid
 * @example
 * ```typescript
 * // Basic velocity calculations
 * velocity(100)(10)
 * // 10 (100 units in 10 seconds = 10 units/second)
 *
 * velocity(500)(25)
 * // 20 (500 meters in 25 seconds = 20 m/s)
 *
 * velocity(60)(2)
 * // 30 (60 miles in 2 hours = 30 mph)
 *
 * // Small values
 * velocity(0.5)(0.1)
 * // 5
 *
 * velocity(3.6)(1.2)
 * // 3
 *
 * // Large values
 * velocity(300000)(1)
 * // 300000 (speed of light: 300,000 km/s)
 *
 * velocity(384400)(1.28)
 * // 300312.5 (Earth-Moon distance / light travel time)
 *
 * // Zero distance
 * velocity(0)(10)
 * // 0 (no movement = zero velocity)
 *
 * // Negative distance (reverse direction)
 * velocity(-50)(10)
 * // -5 (moving backward)
 *
 * // Invalid: zero time
 * velocity(100)(0)
 * // NaN (instantaneous travel impossible)
 *
 * // Invalid: negative time
 * velocity(100)(-5)
 * // NaN (time cannot be negative)
 *
 * // Invalid inputs
 * velocity(null)(10)
 * // NaN
 *
 * velocity(100)(null)
 * // NaN
 *
 * velocity("100")(10)
 * // NaN
 *
 * // Practical examples
 *
 * // Car speed
 * const carSpeed = velocity(120)(2) // 120 km in 2 hours
 * // 60 km/h
 *
 * // Running pace
 * const runningSpeed = velocity(5)(0.5) // 5 km in 30 minutes
 * // 10 km/h
 *
 * // Sound speed calculation
 * const soundSpeed = velocity(343)(1) // 343 meters per second
 * // 343 m/s (at 20°C)
 *
 * // Average speed for a trip
 * const avgSpeed = (totalDistance: number, totalTime: number) =>
 *   velocity(totalDistance)(totalTime)
 * avgSpeed(450, 5) // 90 km/h average
 *
 * // Partial application for fixed distance
 * const marathonSpeed = velocity(42.195) // marathon distance in km
 * marathonSpeed(2.5) // 16.878 km/h (2.5 hour marathon)
 * marathonSpeed(3) // 14.065 km/h (3 hour marathon)
 * marathonSpeed(4) // 10.549 km/h (4 hour marathon)
 *
 * // Convert units
 * const msToKmh = (metersPerSec: number) =>
 *   velocity(metersPerSec * 3.6)(1) // convert m/s to km/h
 * msToKmh(10) // 36 km/h
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Time must be positive
 */
const velocity = (
	distance: number | null | undefined,
) =>
(
	time: number | null | undefined,
): number => {
	if (distance == null || typeof distance !== "number") {
		return NaN
	}

	if (time == null || typeof time !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(distance) || !isFinite(time)) {
		return NaN
	}

	// Time must be positive (cannot be zero or negative)
	if (time <= 0) {
		return NaN
	}

	// Calculate velocity
	return distance / time
}

export default velocity
