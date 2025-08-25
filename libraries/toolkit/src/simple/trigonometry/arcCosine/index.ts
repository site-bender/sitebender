/**
 * Calculates the inverse cosine (arccosine) of a value
 *
 * Computes the angle whose cosine is the given value. Input must be
 * between -1 and 1 (inclusive). Returns the angle in radians between
 * 0 and π. Use radiansToDegrees to convert to degrees. Returns NaN
 * for values outside [-1, 1] or invalid inputs.
 *
 * @param x - Value between -1 and 1
 * @returns Angle in radians (0 to π), or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * arcCosine(1)
 * // 0 (cos(0) = 1)
 *
 * arcCosine(0)
 * // 1.5707... (π/2, or 90 degrees)
 *
 * arcCosine(-1)
 * // 3.1415... (π, or 180 degrees)
 *
 * arcCosine(0.5)
 * // 1.047... (π/3, or 60 degrees)
 *
 * arcCosine(-0.5)
 * // 2.094... (2π/3, or 120 degrees)
 *
 * // Square root values
 * arcCosine(Math.sqrt(2) / 2)
 * // 0.7853... (π/4, or 45 degrees)
 *
 * arcCosine(Math.sqrt(3) / 2)
 * // 0.5235... (π/6, or 30 degrees)
 *
 * // Small deviations from 1
 * arcCosine(0.99)
 * // 0.1418... (about 8.1 degrees)
 *
 * arcCosine(0.9)
 * // 0.4510... (about 25.8 degrees)
 *
 * // Values near -1
 * arcCosine(-0.99)
 * // 2.999... (close to π)
 *
 * arcCosine(-0.9)
 * // 2.690... (about 154 degrees)
 *
 * // Out of range returns NaN
 * arcCosine(2)
 * // NaN (cosine can't be > 1)
 *
 * arcCosine(-1.5)
 * // NaN (cosine can't be < -1)
 *
 * // Invalid inputs return NaN
 * arcCosine(null)
 * // NaN
 *
 * arcCosine("0.5")
 * // NaN
 *
 * // Practical examples
 *
 * // Angle between vectors (dot product formula)
 * const angleBetween = (v1: number[], v2: number[]) => {
 *   const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0)
 *   const mag1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0))
 *   const mag2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0))
 *   return arcCosine(dot / (mag1 * mag2))
 * }
 * angleBetween([1, 0], [0, 1])    // 1.5707... (90°)
 * angleBetween([1, 0], [1, 1])    // 0.7853... (45°)
 *
 * // Law of cosines - find angle
 * const angleFromSides = (a: number, b: number, c: number) => {
 *   // C = arccos((a² + b² - c²) / 2ab)
 *   const cosC = (a * a + b * b - c * c) / (2 * a * b)
 *   return arcCosine(cosC)
 * }
 * angleFromSides(3, 4, 5)  // 1.5707... (right angle)
 * angleFromSides(5, 5, 5)  // 1.047... (60° in equilateral)
 *
 * // With degree conversion
 * import radiansToDegrees from "../radiansToDegrees/index.ts"
 * const arcCosineDegrees = (x: number) =>
 *   radiansToDegrees(arcCosine(x))
 * arcCosineDegrees(0.5)     // 60 degrees
 * arcCosineDegrees(0.866)   // ~30 degrees
 *
 * // Spherical distance (great circle)
 * const sphericalAngle = (lat1: number, lat2: number, deltaLon: number) => {
 *   // Simplified spherical law of cosines
 *   const cosAngle = Math.sin(lat1) * Math.sin(lat2) +
 *                    Math.cos(lat1) * Math.cos(lat2) * Math.cos(deltaLon)
 *   return arcCosine(Math.min(1, Math.max(-1, cosAngle)))
 * }
 *
 * // Phase shift detection
 * const phaseShift = (correlation: number) =>
 *   arcCosine(correlation)  // Correlation as cosine of phase
 * phaseShift(0.707)  // 0.7853... rad (45° phase shift)
 * phaseShift(0)      // 1.5707... rad (90° out of phase)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output between 0 and π
 * @property Domain - Input must be in [-1, 1]
 */
const arcCosine = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// Check domain: x must be in [-1, 1]
	if (x < -1 || x > 1) {
		return NaN
	}

	return Math.acos(x)
}

export default arcCosine
