/**
 * Calculates wavelength from frequency and wave speed
 * 
 * Computes wavelength using the formula λ = v/f where λ is wavelength,
 * v is wave speed, and f is frequency. Wavelength is the distance between
 * successive crests of a wave. Returns NaN for invalid inputs or when
 * frequency is zero or negative.
 * 
 * @curried (speed) => (frequency) => number
 * @param speed - Speed of the wave (any positive value)
 * @param frequency - Frequency of the wave (must be positive)
 * @returns Wavelength (distance units), or NaN if invalid
 * @example
 * ```typescript
 * // Sound waves (speed = 343 m/s at 20°C)
 * wavelength(343)(440)
 * // 0.78 meters (A4 note wavelength)
 * 
 * wavelength(343)(261.63)
 * // 1.31 meters (Middle C wavelength)
 * 
 * wavelength(343)(20)
 * // 17.15 meters (low frequency sound)
 * 
 * wavelength(343)(20000)
 * // 0.01715 meters (high frequency sound)
 * 
 * // Light waves (speed = 3e8 m/s)
 * wavelength(3e8)(5e14)
 * // 6e-7 meters (600 nm, orange light)
 * 
 * wavelength(3e8)(4.3e14)
 * // 6.98e-7 meters (698 nm, red light)
 * 
 * wavelength(3e8)(7.5e14)
 * // 4e-7 meters (400 nm, violet light)
 * 
 * // Radio waves
 * wavelength(3e8)(100e6)
 * // 3 meters (100 MHz FM radio)
 * 
 * wavelength(3e8)(1e9)
 * // 0.3 meters (1 GHz, microwave)
 * 
 * // Water waves
 * wavelength(1.5)(0.5)
 * // 3 meters (ocean wave)
 * 
 * wavelength(10)(0.1)
 * // 100 meters (tsunami wavelength)
 * 
 * // Zero speed
 * wavelength(0)(100)
 * // 0 (no propagation = zero wavelength)
 * 
 * // Invalid: zero frequency
 * wavelength(343)(0)
 * // NaN (DC has no wavelength)
 * 
 * // Invalid: negative frequency
 * wavelength(343)(-100)
 * // NaN (frequency cannot be negative)
 * 
 * // Invalid: negative speed
 * wavelength(-343)(100)
 * // NaN (speed cannot be negative in this context)
 * 
 * // Invalid inputs
 * wavelength(null)(100)
 * // NaN
 * 
 * wavelength(343)(null)
 * // NaN
 * 
 * // Practical examples
 * 
 * // WiFi wavelength (2.4 GHz)
 * wavelength(3e8)(2.4e9)
 * // 0.125 meters (12.5 cm)
 * 
 * // 5G wavelength (28 GHz)
 * wavelength(3e8)(28e9)
 * // 0.0107 meters (10.7 mm)
 * 
 * // Musical instrument design
 * const organPipeLength = (noteFreq: number) => {
 *   const soundSpeed = 343 // m/s at 20°C
 *   return wavelength(soundSpeed)(noteFreq) / 2 // half wavelength for open pipe
 * }
 * organPipeLength(440) // 0.39 meters for A4
 * 
 * // Antenna design (quarter-wave antenna)
 * const antennaLength = (freq: number) => {
 *   const c = 3e8 // speed of light
 *   return wavelength(c)(freq) / 4
 * }
 * antennaLength(100e6) // 0.75 meters for 100 MHz
 * 
 * // Partial application for fixed medium
 * const soundWavelength = wavelength(343) // in air at 20°C
 * soundWavelength(100) // 3.43 meters
 * soundWavelength(1000) // 0.343 meters
 * soundWavelength(10000) // 0.0343 meters
 * 
 * const lightWavelength = wavelength(3e8) // in vacuum
 * lightWavelength(1e15) // 3e-7 meters (UV)
 * lightWavelength(1e12) // 3e-4 meters (infrared)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Frequency must be positive, speed must be non-negative
 */
const wavelength = (
	speed: number | null | undefined
) => (
	frequency: number | null | undefined
): number => {
	if (speed == null || typeof speed !== 'number') {
		return NaN
	}
	
	if (frequency == null || typeof frequency !== 'number') {
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