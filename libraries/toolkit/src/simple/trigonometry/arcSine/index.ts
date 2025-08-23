/**
 * Calculates the inverse sine (arcsine) of a value
 * 
 * Computes the angle whose sine is the given value. Input must be
 * between -1 and 1 (inclusive). Returns the angle in radians between
 * -π/2 and π/2. Use radiansToDegrees to convert to degrees. Returns
 * NaN for values outside [-1, 1] or invalid inputs.
 * 
 * @param x - Value between -1 and 1
 * @returns Angle in radians (-π/2 to π/2), or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * arcSine(0)
 * // 0 (sin(0) = 0)
 * 
 * arcSine(1)
 * // 1.5707... (π/2, or 90 degrees)
 * 
 * arcSine(-1)
 * // -1.5707... (-π/2, or -90 degrees)
 * 
 * arcSine(0.5)
 * // 0.5235... (π/6, or 30 degrees)
 * 
 * arcSine(-0.5)
 * // -0.5235... (-π/6, or -30 degrees)
 * 
 * // Square root values
 * arcSine(Math.sqrt(2) / 2)
 * // 0.7853... (π/4, or 45 degrees)
 * 
 * arcSine(Math.sqrt(3) / 2)
 * // 1.047... (π/3, or 60 degrees)
 * 
 * // Small values (approximately linear near 0)
 * arcSine(0.1)
 * // 0.1001...
 * 
 * arcSine(0.01)
 * // 0.01000...
 * 
 * // Values near boundaries
 * arcSine(0.99)
 * // 1.429... (close to π/2)
 * 
 * arcSine(-0.99)
 * // -1.429... (close to -π/2)
 * 
 * // Out of range returns NaN
 * arcSine(2)
 * // NaN (sine can't be > 1)
 * 
 * arcSine(-1.5)
 * // NaN (sine can't be < -1)
 * 
 * // Invalid inputs return NaN
 * arcSine(null)
 * // NaN
 * 
 * arcSine("0.5")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Finding angle from height
 * const angleFromHeight = (height: number, hypotenuse: number) => {
 *   const sinValue = height / hypotenuse
 *   return arcSine(sinValue)
 * }
 * angleFromHeight(5, 10)  // 0.5235... (30 degrees)
 * angleFromHeight(7, 10)  // 0.7753... (44.4 degrees)
 * 
 * // Projectile launch angle
 * const launchAngle = (maxHeight: number, range: number) => {
 *   // Simplified: sin(θ) ≈ 2h/r for optimal angle
 *   const sinTheta = Math.min(1, 2 * maxHeight / range)
 *   return arcSine(sinTheta)
 * }
 * launchAngle(10, 40)  // 0.5235... radians
 * 
 * // With degree conversion
 * import radiansToDegrees from "../radiansToDegrees/index.ts"
 * const arcSineDegrees = (x: number) =>
 *   radiansToDegrees(arcSine(x))
 * arcSineDegrees(0.5)     // 30 degrees
 * arcSineDegrees(0.866)   // ~60 degrees
 * 
 * // Pendulum angle
 * const pendulumAngle = (displacement: number, length: number) => {
 *   const ratio = displacement / length
 *   if (Math.abs(ratio) > 1) return NaN
 *   return arcSine(ratio)
 * }
 * pendulumAngle(0.5, 1)  // 0.5235... rad (30°)
 * 
 * // Circle intersection
 * const intersectionAngle = (chordLength: number, radius: number) => {
 *   const halfChord = chordLength / 2
 *   return 2 * arcSine(halfChord / radius)
 * }
 * intersectionAngle(1, 1)  // 1.047... (60° arc)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output between -π/2 and π/2
 * @property Domain - Input must be in [-1, 1]
 */
const arcSine = (
	x: number | null | undefined
): number => {
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	// Check domain: x must be in [-1, 1]
	if (x < -1 || x > 1) {
		return NaN
	}
	
	return Math.asin(x)
}

export default arcSine