/**
 * Calculates acceleration from force and mass (a = F/m)
 *
 * Computes acceleration using Newton's second law rearranged.
 * Acceleration is in meters per second squared (m/s²) when force
 * is in Newtons (N) and mass is in kilograms (kg).
 * Returns NaN for invalid inputs or zero mass.
 *
 * @curried (force) => (mass) => acceleration
 * @param force - Force applied (typically in Newtons)
 * @param mass - Mass of the object (typically in kg)
 * @returns Acceleration (typically in m/s²), or NaN if invalid
 * @example
 * ```typescript
 * // Basic acceleration calculations
 * acceleration(50)(10)
 * // 5 (50 N on 10 kg = 5 m/s²)
 *
 * acceleration(100)(20)
 * // 5 (100 N on 20 kg)
 *
 * acceleration(0)(10)
 * // 0 (no force, no acceleration)
 *
 * acceleration(1000)(1000)
 * // 1 (1000 N on 1000 kg)
 *
 * // Small masses, large accelerations
 * acceleration(10)(0.1)
 * // 100 (10 N on 100 grams)
 *
 * acceleration(1)(0.001)
 * // 1000 (1 N on 1 gram)
 *
 * // Negative force (opposite direction)
 * acceleration(-500)(100)
 * // -5 (deceleration/braking)
 *
 * // Zero mass returns NaN (physically impossible)
 * acceleration(100)(0)
 * // NaN
 *
 * // Gravitational acceleration
 * const weight = 735  // N (75 kg person)
 * const mass = 75     // kg
 * acceleration(weight)(mass)
 * // 9.8 (Earth's gravity)
 *
 * // Invalid inputs
 * acceleration(null)(10)
 * // NaN
 *
 * acceleration(100)("10")
 * // NaN
 *
 * // Practical examples
 *
 * // Car performance
 * const engineForce = 5000  // N
 * const carMass = 1200      // kg
 * const carAccel = acceleration(engineForce)(carMass)
 * // 4.166... m/s² (0 to 60 mph in ~6.5 seconds)
 *
 * // Rocket launch
 * const thrust = 35000000   // N (Saturn V first stage)
 * const rocketMass = 2970000 // kg (fully fueled)
 * const upwardAccel = acceleration(thrust)(rocketMass) - 9.8
 * // 2.0 m/s² (net upward acceleration)
 *
 * // Elevator motion
 * function elevatorAcceleration(
 *   cableTension: number,
 *   elevatorMass: number
 * ): number {
 *   const weight = elevatorMass * 9.8
 *   const netForce = cableTension - weight
 *   return acceleration(netForce)(elevatorMass)
 * }
 * elevatorAcceleration(8800, 800)
 * // 1.2 m/s² upward
 *
 * // Friction deceleration
 * const frictionForce = -2000  // N (opposing motion)
 * const vehicleMass = 1500     // kg
 * const deceleration = acceleration(frictionForce)(vehicleMass)
 * // -1.333... m/s²
 *
 * // Centripetal acceleration from force
 * const centripetalForce = 5000  // N
 * const objectMass = 100         // kg
 * const centripetalAccel = acceleration(centripetalForce)(objectMass)
 * // 50 m/s² (toward center)
 *
 * // Partial application for analysis
 * const withForce1000N = acceleration(1000)
 * withForce1000N(100)   // 10 m/s² (heavy object)
 * withForce1000N(10)    // 100 m/s² (light object)
 * withForce1000N(1)     // 1000 m/s² (very light)
 *
 * // Spring oscillation
 * function springAcceleration(k: number, x: number, mass: number): number {
 *   const springForce = -k * x  // Hooke's law
 *   return acceleration(springForce)(mass)
 * }
 *
 * // Net force from multiple sources
 * const forces = [1000, -300, 500, -200]  // Various forces
 * const netForce = forces.reduce((sum, f) => sum + f, 0)
 * const totalMass = 250
 * const netAcceleration = acceleration(netForce)(totalMass)
 * // 4 m/s²
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs or zero mass
 * @property Physical - Implements a = F/m from Newton's second law
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
