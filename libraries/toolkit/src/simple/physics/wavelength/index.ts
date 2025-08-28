/**
 * Calculates wavelength from frequency and wave speed
 *
 * Computes wavelength using the formula λ = v/f where λ is wavelength,
 * v is wave speed, and f is frequency. Wavelength is the distance between
 * successive crests of a wave. Returns NaN for invalid inputs or when
 * frequency is zero or negative.
 *
 * @param speed - Speed of the wave (any positive value)
 * @param frequency - Frequency of the wave (must be positive)
 * @returns Wavelength (distance units), or NaN if invalid
 * @example
 * ```typescript
 * // Sound waves (343 m/s at 20°C)
 * wavelength(343)(440)    // 0.78 meters (A4 note)
 * wavelength(343)(261.63) // 1.31 meters (Middle C)
 * wavelength(343)(20000)  // 0.01715 meters (ultrasonic)
 *
 * // Light waves (3e8 m/s)
 * wavelength(3e8)(5e14)   // 6e-7 meters (600 nm, orange)
 * wavelength(3e8)(100e6)  // 3 meters (100 MHz FM radio)
 *
 * // Edge cases
 * wavelength(0)(100)     // 0 (no propagation)
 * wavelength(343)(0)     // NaN (zero frequency)
 * wavelength(-343)(100)  // NaN (negative speed)
 *
 * // Partial application
 * const soundWavelength = wavelength(343)  // in air
 * soundWavelength(100)   // 3.43 meters
 * soundWavelength(1000)  // 0.343 meters
 *
 * // Invalid inputs
 * wavelength(null)(100)  // NaN
 * wavelength(NaN)(5)     // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const wavelength = (
	speed: number | null | undefined,
) =>
(
	frequency: number | null | undefined,
): number => {
	if (speed == null || typeof speed !== "number") {
		return NaN
	}

	if (frequency == null || typeof frequency !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(speed) || !isFinite(frequency)) {
		return NaN
	}

	// Speed must be non-negative
	if (speed < 0) {
		return NaN
	}

	// Frequency must be positive (cannot be zero or negative)
	if (frequency <= 0) {
		return NaN
	}

	// Calculate wavelength
	return speed / frequency
}

export default wavelength
