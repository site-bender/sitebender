/**
 * Calculates velocity from distance and time
 *
 * Computes velocity using the formula v = d/t where v is velocity,
 * d is distance, and t is time. Returns the rate of change of position.
 * Returns NaN for invalid inputs or when time is zero or negative.
 *
 * @param distance - Distance traveled (any unit)
 * @param time - Time taken (must be positive)
 * @returns Velocity (distance per unit time), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * velocity(100)(10)  // 10 (100 units in 10 seconds)
 * velocity(500)(25)  // 20 (500 meters in 25 seconds)
 * velocity(60)(2)    // 30 (60 miles in 2 hours)
 *
 * // Edge cases
 * velocity(0)(10)    // 0 (no movement)
 * velocity(-50)(10)  // -5 (moving backward)
 * velocity(100)(0)   // NaN (instantaneous travel impossible)
 * velocity(100)(-5)  // NaN (time cannot be negative)
 *
 * // Partial application
 * const marathonSpeed = velocity(42.195)  // marathon distance
 * marathonSpeed(2.5)  // 16.878 km/h (2.5 hour marathon)
 * marathonSpeed(3)    // 14.065 km/h (3 hour marathon)
 * marathonSpeed(4)    // 10.549 km/h (4 hour marathon)
 *
 * // Invalid inputs
 * velocity(null)(10)  // NaN
 * velocity(NaN)(5)    // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
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
