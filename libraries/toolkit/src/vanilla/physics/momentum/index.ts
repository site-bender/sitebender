import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the momentum of a moving object
 *
 * Computes linear momentum using the formula: p = mv, where m is mass
 * in kilograms and v is velocity in meters per second. Returns momentum
 * in kilogram-meters per second (kg⋅m/s). Mass must be non-negative.
 * Returns NaN for invalid inputs.
 *
 * @param mass - Mass in kilograms (must be non-negative)
 * @param velocity - Velocity in meters per second (can be negative for direction)
 * @returns Momentum in kg⋅m/s, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * momentum(10)(5)  // 50 (10 kg at 5 m/s = 50 kg⋅m/s)
 * momentum(2)(10)  // 20 (2 kg at 10 m/s)
 * momentum(1)(1)   // 1 (1 kg at 1 m/s)
 *
 * // Edge cases
 * momentum(100)(0)  // 0 (no velocity, no momentum)
 * momentum(5)(-10)  // -50 (negative direction)
 * momentum(-5)(10)  // NaN (negative mass)
 *
 * // Partial application
 * const carMomentum = momentum(1500)  // 1500 kg car
 * carMomentum(13.89)  // 20835 kg⋅m/s (50 km/h)
 * carMomentum(27.78)  // 41670 kg⋅m/s (100 km/h)
 *
 * // Conservation of momentum
 * const before1 = momentum(1000)(10)   // 10000 kg⋅m/s
 * const before2 = momentum(500)(-5)    // -2500 kg⋅m/s
 * const total = before1 + before2      // 7500 kg⋅m/s
 *
 * // Invalid inputs
 * momentum(null)(10) // NaN
 * momentum(NaN)(5)   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const momentum = (
	mass: number | null | undefined,
) =>
(
	velocity: number | null | undefined,
): number => {
	if (isNullish(mass) || typeof mass !== "number") {
		return NaN
	}

	if (mass < 0) {
		return NaN
	}

	if (isNullish(velocity) || typeof velocity !== "number") {
		return NaN
	}

	// p = mv
	return mass * velocity
}

export default momentum
