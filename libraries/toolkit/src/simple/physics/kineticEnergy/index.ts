/**
 * Calculates the kinetic energy of a moving object
 * 
 * Computes kinetic energy using the formula: KE = ½mv², where m is mass
 * in kilograms and v is velocity in meters per second. Returns energy
 * in joules. Both mass and velocity must be non-negative. Returns NaN
 * for invalid inputs.
 * 
 * @curried (mass) => (velocity) => number
 * @param mass - Mass in kilograms (must be non-negative)
 * @param velocity - Velocity in meters per second
 * @returns Kinetic energy in joules, or NaN if invalid
 * @example
 * ```typescript
 * // Basic kinetic energy calculations
 * kineticEnergy(10)(5)
 * // 125 (10 kg at 5 m/s = 125 J)
 * 
 * kineticEnergy(2)(10)
 * // 100 (2 kg at 10 m/s = 100 J)
 * 
 * kineticEnergy(1)(1)
 * // 0.5 (1 kg at 1 m/s = 0.5 J)
 * 
 * // Stationary object (zero velocity)
 * kineticEnergy(100)(0)
 * // 0 (no motion, no kinetic energy)
 * 
 * // Large masses
 * kineticEnergy(1000)(20)
 * // 200000 (1 ton at 20 m/s = 200 kJ)
 * 
 * kineticEnergy(80000)(30)
 * // 36000000 (80 ton train at 30 m/s = 36 MJ)
 * 
 * // Small masses (in kg)
 * kineticEnergy(0.001)(100)
 * // 5 (1 gram at 100 m/s = 5 J)
 * 
 * kineticEnergy(0.145)(40)
 * // 116 (baseball at 40 m/s)
 * 
 * // Negative velocity (magnitude used)
 * kineticEnergy(5)(-10)
 * // 250 (velocity squared removes sign)
 * 
 * // Fractional values
 * kineticEnergy(2.5)(3.6)
 * // 16.2 joules
 * 
 * // Invalid inputs return NaN
 * kineticEnergy(-5)(10)
 * // NaN (negative mass)
 * 
 * kineticEnergy(null)(10)
 * // NaN
 * 
 * kineticEnergy(5)("10")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Car kinetic energy
 * const carEnergy = kineticEnergy(1500)  // 1500 kg car
 * carEnergy(13.89)  // 144676 J (50 km/h)
 * carEnergy(27.78)  // 578841 J (100 km/h)
 * carEnergy(33.33)  // 833333 J (120 km/h)
 * 
 * // Bullet energy
 * const bulletKE = kineticEnergy(0.004)  // 4 gram bullet
 * bulletKE(300)   // 180 J (pistol)
 * bulletKE(800)   // 1280 J (rifle)
 * 
 * // Kinetic energy to velocity
 * const velocityFromKE = (ke: number, mass: number) =>
 *   Math.sqrt(2 * ke / mass)
 * velocityFromKE(100, 2)  // 10 m/s
 * 
 * // Comparing objects
 * const compare = kineticEnergy(1)
 * compare(10)  // 50 J (reference)
 * const heavy = kineticEnergy(10)
 * heavy(10)    // 500 J (10x mass = 10x energy)
 * const fast = kineticEnergy(1)
 * fast(20)     // 200 J (2x speed = 4x energy)
 * 
 * // Energy conversion
 * const jouleToCalories = (j: number) => j / 4.184
 * const ke = kineticEnergy(70)(8)  // 70 kg runner at 8 m/s
 * jouleToCalories(ke)  // 535.7 calories
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Quadratic - Energy scales with velocity squared
 */
const kineticEnergy = (
	mass: number | null | undefined
) => (
	velocity: number | null | undefined
): number => {
	if (mass == null || typeof mass !== 'number') {
		return NaN
	}
	
	if (mass < 0) {
		return NaN
	}
	
	if (velocity == null || typeof velocity !== 'number') {
		return NaN
	}
	
	// KE = ½mv²
	return 0.5 * mass * velocity * velocity
}

export default kineticEnergy