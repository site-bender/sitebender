/**
 * Calculates the sine of an angle in radians
 *
 * Computes the trigonometric sine function, which represents the
 * y-coordinate of a point on the unit circle. Input must be in
 * radians; use degreesToRadians for degree inputs. Returns NaN
 * for invalid inputs.
 *
 * @param radians - Angle in radians
 * @returns Sine of the angle (-1 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Common angles
 * sine(0) // 0
 * sine(Math.PI / 2) // 1 (90 degrees)
 * sine(Math.PI) // ~0 (180 degrees)
 * sine(3 * Math.PI / 2) // -1 (270 degrees)
 *
 * // Special angles
 * sine(Math.PI / 6) // 0.5 (30 degrees)
 * sine(Math.PI / 4) // 0.7071... (√2/2)
 * sine(-Math.PI / 2) // -1
 *
 * // Invalid inputs
 * sine(null) // NaN
 *
 * // Wave generation
 * const waveHeight = (time: number, frequency: number) =>
 *   sine(2 * Math.PI * frequency * time)
 * waveHeight(0.25, 1) // 1 (peak at quarter period)
 * ```
 * @pure
 * @safe
 */
const sine = (
	radians: number | null | undefined,
): number => {
	if (radians == null || typeof radians !== "number") {
		return NaN
	}

	return Math.sin(radians)
}

export default sine
