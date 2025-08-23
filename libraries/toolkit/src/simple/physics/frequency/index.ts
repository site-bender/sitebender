/**
 * Calculates frequency from period
 * 
 * Computes frequency using the formula f = 1/T where f is frequency
 * and T is the period. Frequency is the number of cycles per unit time,
 * while period is the time for one complete cycle. Returns NaN for
 * invalid inputs or when period is zero or negative.
 * 
 * @param period - Time for one complete cycle (must be positive)
 * @returns Frequency (cycles per unit time), or NaN if invalid
 * @example
 * ```typescript
 * // Basic frequency calculations
 * frequency(1)
 * // 1 (1 second period = 1 Hz)
 * 
 * frequency(0.5)
 * // 2 (0.5 second period = 2 Hz)
 * 
 * frequency(2)
 * // 0.5 (2 second period = 0.5 Hz)
 * 
 * frequency(0.001)
 * // 1000 (1 millisecond period = 1000 Hz = 1 kHz)
 * 
 * // Musical notes (A4 = 440 Hz)
 * frequency(1 / 440)
 * // 440 (A4 note frequency)
 * 
 * frequency(1 / 261.63)
 * // 261.63 (Middle C frequency)
 * 
 * // AC power frequencies
 * frequency(1 / 60)
 * // 60 (60 Hz power in Americas)
 * 
 * frequency(1 / 50)
 * // 50 (50 Hz power in Europe)
 * 
 * // Radio waves
 * frequency(1e-6)
 * // 1000000 (1 microsecond = 1 MHz)
 * 
 * frequency(1e-9)
 * // 1000000000 (1 nanosecond = 1 GHz)
 * 
 * // Heart rate (beats per minute to Hz)
 * const bpmToHz = (bpm: number) => frequency(60 / bpm)
 * bpmToHz(60) // 1 Hz (60 bpm)
 * bpmToHz(120) // 2 Hz (120 bpm)
 * 
 * // Invalid: zero period
 * frequency(0)
 * // NaN (instantaneous cycle impossible)
 * 
 * // Invalid: negative period
 * frequency(-1)
 * // NaN (period cannot be negative)
 * 
 * // Invalid inputs
 * frequency(null)
 * // NaN
 * 
 * frequency("1")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Computer monitor refresh rate
 * frequency(1 / 144)
 * // 144 (144 Hz refresh rate)
 * 
 * // Pendulum frequency
 * const pendulumFreq = (periodSeconds: number) => frequency(periodSeconds)
 * pendulumFreq(2) // 0.5 Hz (2-second pendulum)
 * 
 * // Wave frequency from wavelength and speed
 * const waveFrequency = (wavelength: number, speed: number) => {
 *   const period = wavelength / speed
 *   return frequency(period)
 * }
 * waveFrequency(0.5, 343) // 686 Hz (sound wave)
 * 
 * // CPU clock speed
 * frequency(1e-9) // 1 GHz (1 nanosecond clock period)
 * frequency(0.5e-9) // 2 GHz
 * frequency(0.25e-9) // 4 GHz
 * 
 * // Rotation frequency
 * const rpm = 3600 // rotations per minute
 * const rotationPeriod = 60 / rpm // seconds per rotation
 * frequency(rotationPeriod) // 60 Hz
 * 
 * // Light wave frequency from period
 * frequency(2e-15) // 5e14 Hz (visible light range)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Period must be positive
 */
const frequency = (
	period: number | null | undefined
): number => {
	if (period == null || typeof period !== 'number') {
		return NaN
	}
	
	// Check for non-finite values
	if (!isFinite(period)) {
		return NaN
	}
	
	// Period must be positive (cannot be zero or negative)
	if (period <= 0) {
		return NaN
	}
	
	// Calculate frequency as reciprocal of period
	return 1 / period
}

export default frequency