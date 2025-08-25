/**
 * Calculates the inverse tangent (arctangent) of a value
 *
 * Computes the angle whose tangent is the given value. Unlike arcSine
 * and arcCosine, input can be any real number. Returns the angle in
 * radians between -π/2 and π/2. Use radiansToDegrees to convert to
 * degrees. Returns NaN for invalid inputs.
 *
 * @param x - Any real number
 * @returns Angle in radians (-π/2 to π/2), or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * arcTangent(0)
 * // 0 (tan(0) = 0)
 *
 * arcTangent(1)
 * // 0.7853... (π/4, or 45 degrees)
 *
 * arcTangent(-1)
 * // -0.7853... (-π/4, or -45 degrees)
 *
 * arcTangent(Math.sqrt(3))
 * // 1.047... (π/3, or 60 degrees)
 *
 * arcTangent(1 / Math.sqrt(3))
 * // 0.5235... (π/6, or 30 degrees)
 *
 * // Large values approach ±π/2
 * arcTangent(10)
 * // 1.4711... (close to π/2)
 *
 * arcTangent(100)
 * // 1.5607... (very close to π/2)
 *
 * arcTangent(-10)
 * // -1.4711... (close to -π/2)
 *
 * // Small values (approximately linear near 0)
 * arcTangent(0.1)
 * // 0.0996...
 *
 * arcTangent(0.01)
 * // 0.00999...
 *
 * // Infinity approaches limits
 * arcTangent(Infinity)
 * // 1.5707... (π/2)
 *
 * arcTangent(-Infinity)
 * // -1.5707... (-π/2)
 *
 * // Common angles
 * arcTangent(0.5773...)  // tan(30°)
 * // 0.5235... (π/6)
 *
 * arcTangent(1.732...)   // tan(60°)
 * // 1.047... (π/3)
 *
 * // Invalid inputs return NaN
 * arcTangent(null)
 * // NaN
 *
 * arcTangent("1")
 * // NaN
 *
 * // Practical examples
 *
 * // Slope to angle
 * const slopeAngle = (rise: number, run: number) =>
 *   arcTangent(rise / run)
 * slopeAngle(1, 1)    // 0.7853... (45° slope)
 * slopeAngle(3, 4)    // 0.6435... (36.9° slope)
 * slopeAngle(1, 0)    // 1.5707... (vertical, 90°)
 *
 * // Direction from velocity components
 * const direction = (vx: number, vy: number) => {
 *   // Note: for full quadrant, use arcTangent2
 *   return arcTangent(vy / vx)
 * }
 * direction(3, 4)     // 0.9272... (53.1°)
 * direction(5, 5)     // 0.7853... (45°)
 *
 * // With degree conversion
 * import radiansToDegrees from "../radiansToDegrees/index.ts"
 * const arcTangentDegrees = (x: number) =>
 *   radiansToDegrees(arcTangent(x))
 * arcTangentDegrees(1)        // 45 degrees
 * arcTangentDegrees(1.732)    // ~60 degrees
 *
 * // Field of view calculation
 * const fovAngle = (sensorSize: number, focalLength: number) =>
 *   2 * arcTangent(sensorSize / (2 * focalLength))
 * fovAngle(36, 50)   // 0.6947... rad (39.8° horizontal FOV)
 * fovAngle(24, 50)   // 0.4734... rad (27.1° vertical FOV)
 *
 * // Banking angle for turn
 * const bankAngle = (velocity: number, radius: number, g = 9.81) => {
 *   const tanTheta = (velocity * velocity) / (radius * g)
 *   return arcTangent(tanTheta)
 * }
 * bankAngle(30, 100)  // 0.7581... rad (43.4° bank)
 *
 * // Perspective correction
 * const perspectiveAngle = (objectHeight: number, distance: number) =>
 *   arcTangent(objectHeight / distance)
 * perspectiveAngle(2, 10)   // 0.1973... rad (11.3°)
 * perspectiveAngle(10, 10)  // 0.7853... rad (45°)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output between -π/2 and π/2
 * @property Unbounded-domain - Input can be any real number
 */
const arcTangent = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	return Math.atan(x)
}

export default arcTangent
