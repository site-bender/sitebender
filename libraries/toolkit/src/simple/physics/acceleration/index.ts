/**
 * Calculates acceleration from force and mass (a = F/m)
 *
 * Computes acceleration using Newton's second law rearranged.
 * Acceleration is in meters per second squared (m/s²) when force
 * is in Newtons (N) and mass is in kilograms (kg).
 * Returns NaN for invalid inputs or zero mass.
 *
 * @param force - Force applied (typically in Newtons)
 * @param mass - Mass of the object (typically in kg)
 * @returns Acceleration (typically in m/s²), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * acceleration(50)(10)  // 5 (50 N on 10 kg = 5 m/s²)
 * acceleration(100)(20) // 5 (100 N on 20 kg)
 *
 * // Edge cases
 * acceleration(0)(10)   // 0 (no force, no acceleration)
 * acceleration(100)(0)  // NaN (zero mass is physically impossible)
 * acceleration(-500)(100) // -5 (deceleration/braking)
 *
 * // Partial application
 * const withForce1000N = acceleration(1000)
 * withForce1000N(100)  // 10 m/s²
 * withForce1000N(10)   // 100 m/s²
 *
 * // Real-world example: car acceleration
 * const engineForce = 5000  // N
 * const carMass = 1200       // kg
 * acceleration(engineForce)(carMass) // 4.17 m/s²
 *
 * // Invalid inputs
 * acceleration(null)(10)  // NaN
 * acceleration(NaN)(10)   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs or zero mass
 */
const acceleration = (
	force: number | null | undefined,
) =>
(
	mass: number | null | undefined,
): number => {
	if (force == null || typeof force !== "number") {
		return NaN
	}

	if (mass == null || typeof mass !== "number") {
		return NaN
	}

	// Cannot divide by zero mass
	if (mass === 0) {
		return NaN
	}

	// a = F/m
	return force / mass
}

export default acceleration
