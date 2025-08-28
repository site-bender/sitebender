/**
 * Calculates the kinetic energy of a moving object
 *
 * Computes kinetic energy using the formula: KE = ½mv², where m is mass
 * in kilograms and v is velocity in meters per second. Returns energy
 * in joules. Both mass and velocity must be non-negative. Returns NaN
 * for invalid inputs.
 *
 * @param mass - Mass in kilograms (must be non-negative)
 * @param velocity - Velocity in meters per second
 * @returns Kinetic energy in joules, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * kineticEnergy(10)(5)  // 125 (10 kg at 5 m/s = 125 J)
 * kineticEnergy(2)(10)  // 100 (2 kg at 10 m/s)
 * kineticEnergy(1)(1)   // 0.5 (1 kg at 1 m/s)
 *
 * // Edge cases
 * kineticEnergy(100)(0)  // 0 (no motion, no KE)
 * kineticEnergy(5)(-10)  // 250 (velocity squared removes sign)
 * kineticEnergy(-5)(10)  // NaN (negative mass)
 *
 * // Partial application
 * const carEnergy = kineticEnergy(1500)  // 1500 kg car
 * carEnergy(13.89)  // 144676 J (50 km/h)
 * carEnergy(27.78)  // 578841 J (100 km/h)
 *
 * // Invalid inputs
 * kineticEnergy(null)(10) // NaN
 * kineticEnergy(NaN)(5)   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const kineticEnergy = (
	mass: number | null | undefined,
) =>
(
	velocity: number | null | undefined,
): number => {
	if (mass == null || typeof mass !== "number") {
		return NaN
	}

	if (mass < 0) {
		return NaN
	}

	if (velocity == null || typeof velocity !== "number") {
		return NaN
	}

	// KE = ½mv²
	return 0.5 * mass * velocity * velocity
}

export default kineticEnergy
