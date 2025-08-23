/**
 * Calculates force using Newton's second law (F = ma)
 * 
 * Computes the force required to accelerate a mass at a given rate.
 * Force is measured in Newtons (N) when mass is in kilograms (kg)
 * and acceleration is in meters per second squared (m/s²).
 * Returns NaN for invalid inputs.
 * 
 * @curried (mass) => (acceleration) => force
 * @param mass - Mass of the object (typically in kg)
 * @param acceleration - Acceleration (typically in m/s²)
 * @returns Force (typically in Newtons), or NaN if invalid
 * @example
 * ```typescript
 * // Basic force calculations
 * force(10)(5)
 * // 50 (10 kg at 5 m/s² = 50 N)
 * 
 * force(2)(9.8)
 * // 19.6 (2 kg under Earth gravity)
 * 
 * force(100)(0)
 * // 0 (no acceleration, no force)
 * 
 * force(0)(10)
 * // 0 (no mass, no force)
 * 
 * // Car acceleration
 * force(1500)(3)
 * // 4500 (1500 kg car at 3 m/s² = 4500 N)
 * 
 * // Rocket thrust
 * force(50000)(20)
 * // 1000000 (50 ton rocket at 20 m/s²)
 * 
 * // Small forces
 * force(0.001)(0.5)
 * // 0.0005 (1 gram at 0.5 m/s²)
 * 
 * // Negative acceleration (deceleration)
 * force(1000)(-5)
 * // -5000 (braking force)
 * 
 * // Weight force (gravity)
 * force(75)(9.8)
 * // 735 (75 kg person's weight on Earth)
 * 
 * force(75)(1.62)
 * // 121.5 (same person's weight on Moon)
 * 
 * // Invalid inputs
 * force(null)(10)
 * // NaN
 * 
 * force(100)("5")
 * // NaN
 * 
 * force(-10)(5)
 * // -50 (negative mass is physically invalid but mathematically computed)
 * 
 * // Practical examples
 * 
 * // Elevator cable tension
 * const elevatorMass = 800  // kg
 * const upwardAccel = 2     // m/s²
 * const gravity = 9.8        // m/s²
 * const totalAccel = upwardAccel + gravity
 * const cableTension = force(elevatorMass)(totalAccel)
 * // 9440 N
 * 
 * // Centripetal force
 * function centripetalForce(mass: number, velocity: number, radius: number): number {
 *   const centripetalAccel = (velocity * velocity) / radius
 *   return force(mass)(centripetalAccel)
 * }
 * centripetalForce(1000, 20, 50)  // Car on curve
 * // 8000 N
 * 
 * // Impact force estimation
 * function impactForce(mass: number, velocity: number, time: number): number {
 *   const deceleration = velocity / time
 *   return Math.abs(force(mass)(deceleration))
 * }
 * impactForce(70, 10, 0.1)  // Person hitting ground
 * // 7000 N
 * 
 * // Spring force (Hooke's law simulation)
 * function springForce(mass: number, k: number, x: number): number {
 *   const springAccel = (k * x) / mass
 *   return force(mass)(springAccel)
 * }
 * 
 * // Partial application for fixed mass
 * const carForce = force(1200)  // 1200 kg car
 * carForce(2)    // 2400 N (gentle acceleration)
 * carForce(5)    // 6000 N (moderate acceleration)
 * carForce(-8)   // -9600 N (hard braking)
 * 
 * // Force balance check
 * function isInEquilibrium(forces: number[]): boolean {
 *   const netForce = forces.reduce((sum, f) => sum + f, 0)
 *   return Math.abs(netForce) < 0.001
 * }
 * 
 * // Multiple forces on object
 * const thrust = force(5000)(10)     // 50000 N up
 * const weight = force(5000)(-9.8)   // -49000 N down
 * const netForce = thrust + weight   // 1000 N up
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Physical - Implements Newton's second law
 */
const force = (
	mass: number | null | undefined
) => (
	acceleration: number | null | undefined
): number => {
	if (mass == null || typeof mass !== 'number') {
		return NaN
	}
	
	if (acceleration == null || typeof acceleration !== 'number') {
		return NaN
	}
	
	// F = ma
	return mass * acceleration
}

export default force