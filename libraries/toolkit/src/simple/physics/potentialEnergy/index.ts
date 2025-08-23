/**
 * Calculates the gravitational potential energy of an object
 * 
 * Computes potential energy using the formula: PE = mgh, where m is mass
 * in kilograms, g is gravitational acceleration (default 9.81 m/s² for Earth),
 * and h is height in meters above reference point. Mass and height must be
 * non-negative. Returns energy in joules. Returns NaN for invalid inputs.
 * 
 * @curried (mass) => (height) => (gravity?) => number
 * @param mass - Mass in kilograms (must be non-negative)
 * @param height - Height in meters above reference (can be negative)
 * @param gravity - Gravitational acceleration in m/s² (default: 9.81)
 * @returns Potential energy in joules, or NaN if invalid
 * @example
 * ```typescript
 * // Basic potential energy (Earth gravity)
 * potentialEnergy(10)(5)()
 * // 490.5 (10 kg at 5 m = 490.5 J)
 * 
 * potentialEnergy(1)(10)()
 * // 98.1 (1 kg at 10 m)
 * 
 * potentialEnergy(50)(2)()
 * // 981 (50 kg at 2 m)
 * 
 * // Custom gravity
 * potentialEnergy(10)(5)(9.81)
 * // 490.5 (Earth, explicit)
 * 
 * potentialEnergy(10)(5)(1.62)
 * // 81 (Moon gravity)
 * 
 * potentialEnergy(10)(5)(3.71)
 * // 185.5 (Mars gravity)
 * 
 * // Zero height (reference level)
 * potentialEnergy(100)(0)()
 * // 0 (no potential energy at reference)
 * 
 * // Negative height (below reference)
 * potentialEnergy(10)(-5)()
 * // -490.5 (negative potential energy)
 * 
 * potentialEnergy(5)(-2)()
 * // -98.1
 * 
 * // Large masses and heights
 * potentialEnergy(1000)(100)()
 * // 981000 (1 ton at 100 m = 981 kJ)
 * 
 * potentialEnergy(70)(8848)()
 * // 6064248 (person on Everest = 6.06 MJ)
 * 
 * // Small values
 * potentialEnergy(0.001)(1)()
 * // 0.00981 (1 gram at 1 m)
 * 
 * // Invalid inputs return NaN
 * potentialEnergy(-5)(10)()
 * // NaN (negative mass)
 * 
 * potentialEnergy(null)(10)()
 * // NaN
 * 
 * potentialEnergy(10)("5")()
 * // NaN
 * 
 * // Practical examples
 * 
 * // Hydroelectric dam
 * const damEnergy = potentialEnergy(1000000)  // 1 million kg water
 * damEnergy(50)()    // 490500000 J (490.5 MJ)
 * damEnergy(100)()   // 981000000 J (981 MJ)
 * 
 * // Roller coaster
 * const coasterPE = potentialEnergy(500)  // 500 kg car
 * coasterPE(30)()   // 147150 J (at peak)
 * coasterPE(0)()    // 0 J (at bottom)
 * coasterPE(-5)()   // -24525 J (in valley)
 * 
 * // Different planets
 * const mass = 10
 * const height = 5
 * const earthPE = potentialEnergy(mass)(height)(9.81)    // 490.5 J
 * const moonPE = potentialEnergy(mass)(height)(1.62)     // 81 J
 * const jupiterPE = potentialEnergy(mass)(height)(24.79) // 1239.5 J
 * 
 * // Building floors (3m per floor)
 * const elevatorEnergy = (mass: number, floors: number) =>
 *   potentialEnergy(mass)(floors * 3)()
 * elevatorEnergy(1000, 10)  // 294300 J (10th floor)
 * elevatorEnergy(1000, 50)  // 1471500 J (50th floor)
 * 
 * // Projectile maximum height from PE
 * const maxHeight = (mass: number, energy: number, g = 9.81) =>
 *   energy / (mass * g)
 * maxHeight(1, 100)  // 10.19 m
 * 
 * // Partial application for analysis
 * const objectPE = potentialEnergy(75)  // 75 kg person
 * const onEarth = (h: number) => objectPE(h)(9.81)
 * const onMoon = (h: number) => objectPE(h)(1.62)
 * 
 * onEarth(10)   // 7357.5 J
 * onMoon(10)    // 1215 J (same height, less energy)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Linear - Energy scales linearly with mass and height
 * @property Signed - Can be negative for positions below reference
 */
const potentialEnergy = (
	mass: number | null | undefined
) => (
	height: number | null | undefined
) => (
	gravity: number = 9.81
): number => {
	if (mass == null || typeof mass !== 'number') {
		return NaN
	}
	
	if (mass < 0) {
		return NaN
	}
	
	if (height == null || typeof height !== 'number') {
		return NaN
	}
	
	if (gravity == null || typeof gravity !== 'number') {
		return NaN
	}
	
	if (gravity < 0) {
		return NaN
	}
	
	// PE = mgh
	return mass * gravity * height
}

export default potentialEnergy