/**
 * Calculates force using Newton's second law (F = ma)
 *
 * Computes the force required to accelerate a mass at a given rate.
 * Force is measured in Newtons (N) when mass is in kilograms (kg)
 * and acceleration is in meters per second squared (m/s²).
 * Returns NaN for invalid inputs.
 *
 * @param mass - Mass of the object (typically in kg)
 * @param acceleration - Acceleration (typically in m/s²)
 * @returns Force (typically in Newtons), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * force(10)(5)    // 50 (10 kg at 5 m/s² = 50 N)
 * force(2)(9.8)   // 19.6 (2 kg under Earth gravity)
 *
 * // Edge cases
 * force(100)(0)   // 0 (no acceleration, no force)
 * force(0)(10)    // 0 (no mass, no force)
 * force(1000)(-5) // -5000 (braking force)
 *
 * // Partial application
 * const carForce = force(1200)  // 1200 kg car
 * carForce(2)    // 2400 N (gentle acceleration)
 * carForce(5)    // 6000 N (moderate acceleration)
 * carForce(-8)   // -9600 N (hard braking)
 *
 * // Weight calculations
 * force(75)(9.8)  // 735 (75 kg person's weight on Earth)
 * force(75)(1.62) // 121.5 (same person's weight on Moon)
 *
 * // Invalid inputs
 * force(null)(10) // NaN
 * force(NaN)(5)   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const force = (
	mass: number | null | undefined,
) =>
(
	acceleration: number | null | undefined,
): number => {
	if (mass == null || typeof mass !== "number") {
		return NaN
	}

	if (acceleration == null || typeof acceleration !== "number") {
		return NaN
	}

	// F = ma
	return mass * acceleration
}

export default force
