/**
 * Calculates the momentum of a moving object
 *
 * Computes linear momentum using the formula: p = mv, where m is mass
 * in kilograms and v is velocity in meters per second. Returns momentum
 * in kilogram-meters per second (kg⋅m/s). Mass must be non-negative.
 * Returns NaN for invalid inputs.
 *
 * @curried (mass) => (velocity) => number
 * @param mass - Mass in kilograms (must be non-negative)
 * @param velocity - Velocity in meters per second (can be negative for direction)
 * @returns Momentum in kg⋅m/s, or NaN if invalid
 * @example
 * ```typescript
 * // Basic momentum calculations
 * momentum(10)(5)
 * // 50 (10 kg at 5 m/s = 50 kg⋅m/s)
 *
 * momentum(2)(10)
 * // 20 (2 kg at 10 m/s = 20 kg⋅m/s)
 *
 * momentum(1)(1)
 * // 1 (1 kg at 1 m/s = 1 kg⋅m/s)
 *
 * // Stationary object
 * momentum(100)(0)
 * // 0 (no velocity, no momentum)
 *
 * // Negative velocity (opposite direction)
 * momentum(5)(-10)
 * // -50 (moving in negative direction)
 *
 * momentum(3)(-7)
 * // -21 (backward momentum)
 *
 * // Large objects
 * momentum(1000)(20)
 * // 20000 (1 ton at 20 m/s)
 *
 * momentum(80000)(30)
 * // 2400000 (80 ton train at 30 m/s)
 *
 * // Small objects
 * momentum(0.001)(100)
 * // 0.1 (1 gram at 100 m/s)
 *
 * momentum(0.145)(40)
 * // 5.8 (baseball at 40 m/s)
 *
 * // Fractional values
 * momentum(2.5)(3.6)
 * // 9 kg⋅m/s
 *
 * momentum(0.5)(8.4)
 * // 4.2 kg⋅m/s
 *
 * // Invalid inputs return NaN
 * momentum(-5)(10)
 * // NaN (negative mass)
 *
 * momentum(null)(10)
 * // NaN
 *
 * momentum(5)("10")
 * // NaN
 *
 * // Practical examples
 *
 * // Vehicle momentum
 * const carMomentum = momentum(1500)  // 1500 kg car
 * carMomentum(13.89)   // 20835 kg⋅m/s (50 km/h)
 * carMomentum(27.78)   // 41670 kg⋅m/s (100 km/h)
 * carMomentum(-13.89)  // -20835 kg⋅m/s (reverse)
 *
 * // Collision analysis
 * const before1 = momentum(1000)(10)   // 10000 kg⋅m/s
 * const before2 = momentum(500)(-5)    // -2500 kg⋅m/s
 * const totalMomentum = before1 + before2  // 7500 kg⋅m/s (conserved)
 *
 * // Bullet momentum
 * const bulletP = momentum(0.004)  // 4 gram bullet
 * bulletP(300)   // 1.2 kg⋅m/s (pistol)
 * bulletP(800)   // 3.2 kg⋅m/s (rifle)
 *
 * // Momentum to velocity
 * const velocityFromMomentum = (p: number, mass: number) =>
 *   p / mass
 * velocityFromMomentum(50, 10)  // 5 m/s
 *
 * // Rocket equation component
 * const exhaustMomentum = momentum(0.01)  // 10g of exhaust
 * const exhaustVelocity = 3000  // 3000 m/s exhaust velocity
 * exhaustMomentum(exhaustVelocity)  // 30 kg⋅m/s per 10g expelled
 *
 * // Sports physics
 * const soccerBall = momentum(0.43)  // FIFA regulation ball
 * soccerBall(30)   // 12.9 kg⋅m/s (penalty kick)
 *
 * const bowlingBall = momentum(7.26)  // 16 lb ball
 * bowlingBall(8)   // 58.08 kg⋅m/s
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Linear - Momentum scales linearly with both mass and velocity
 * @property Vectorial - Sign indicates direction
 */
const momentum = (
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

	// p = mv
	return mass * velocity
}

export default momentum
