/**
 * Calculates the gravitational potential energy of an object
 *
 * Computes potential energy using the formula: PE = mgh, where m is mass
 * in kilograms, g is gravitational acceleration (default 9.81 m/s² for Earth),
 * and h is height in meters above reference point. Mass and height must be
 * non-negative. Returns energy in joules. Returns NaN for invalid inputs.
 *
 * @param mass - Mass in kilograms (must be non-negative)
 * @param height - Height in meters above reference (can be negative)
 * @param gravity - Gravitational acceleration in m/s² (default: 9.81)
 * @returns Potential energy in joules, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage (Earth gravity)
 * potentialEnergy(10)(5)()  // 490.5 (10 kg at 5 m)
 * potentialEnergy(1)(10)()  // 98.1 (1 kg at 10 m)
 *
 * // Custom gravity
 * potentialEnergy(10)(5)(9.81)  // 490.5 (Earth)
 * potentialEnergy(10)(5)(1.62)  // 81 (Moon)
 * potentialEnergy(10)(5)(3.71)  // 185.5 (Mars)
 *
 * // Edge cases
 * potentialEnergy(100)(0)()   // 0 (at reference level)
 * potentialEnergy(10)(-5)()   // -490.5 (below reference)
 * potentialEnergy(-5)(10)()   // NaN (negative mass)
 *
 * // Partial application
 * const damEnergy = potentialEnergy(1000000)  // 1 million kg
 * damEnergy(50)()   // 490500000 J (490.5 MJ)
 * damEnergy(100)()  // 981000000 J (981 MJ)
 *
 * // Invalid inputs
 * potentialEnergy(null)(10)() // NaN
 * potentialEnergy(NaN)(5)()   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const potentialEnergy = (
	mass: number | null | undefined,
) =>
(
	height: number | null | undefined,
) =>
(
	gravity: number = 9.81,
): number => {
	if (mass == null || typeof mass !== "number") {
		return NaN
	}

	if (mass < 0) {
		return NaN
	}

	if (height == null || typeof height !== "number") {
		return NaN
	}

	if (gravity == null || typeof gravity !== "number") {
		return NaN
	}

	if (gravity < 0) {
		return NaN
	}

	// PE = mgh
	return mass * gravity * height
}

export default potentialEnergy
