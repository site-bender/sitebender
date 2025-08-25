/**
 * Gets the nanosecond component from a Temporal time or datetime
 *
 * Extracts the nanosecond component (0-999,999,999) from a Temporal PlainTime,
 * PlainDateTime, or ZonedDateTime. Nanoseconds represent the finest time precision
 * available in Temporal, where 1 second = 1,000,000,000 nanoseconds. This includes
 * the full sub-second precision: milliseconds, microseconds, and nanoseconds.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param time - The Temporal object to get nanosecond from
 * @returns The nanosecond (0-999,999,999), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45.123456789")
 * getNanosecond(time)                     // 123456789
 *
 * const milliPrecision = Temporal.PlainTime.from("10:30:45.123")
 * getNanosecond(milliPrecision)           // 123000000 (123 ms in nanoseconds)
 *
 * const microPrecision = Temporal.PlainTime.from("10:30:45.123456")
 * getNanosecond(microPrecision)           // 123456000 (123.456 ms in nanoseconds)
 *
 * const noPrecision = Temporal.PlainTime.from("10:30:45")
 * getNanosecond(noPrecision)              // 0 (no sub-second precision)
 *
 * const maxNano = Temporal.PlainTime.from("10:30:45.999999999")
 * getNanosecond(maxNano)                  // 999999999 (just under 1 second)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45.987654321")
 * getNanosecond(datetime)                 // 987654321
 *
 * const scientific = Temporal.PlainDateTime.from("2024-03-15T12:00:00.000000001")
 * getNanosecond(scientific)               // 1 (1 nanosecond)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:30:45.500250125-05:00[America/New_York]"
 * )
 * getNanosecond(zonedDateTime)            // 500250125
 *
 * // Precision levels breakdown
 * function getPrecisionBreakdown(time: Temporal.PlainTime): {
 *   milliseconds: number,
 *   microseconds: number,
 *   nanoseconds: number
 * } | null {
 *   const totalNanos = getNanosecond(time)
 *   if (totalNanos === null) return null
 *
 *   const milliseconds = Math.floor(totalNanos / 1000000)
 *   const microseconds = Math.floor((totalNanos % 1000000) / 1000)
 *   const nanoseconds = totalNanos % 1000
 *
 *   return { milliseconds, microseconds, nanoseconds }
 * }
 *
 * getPrecisionBreakdown(Temporal.PlainTime.from("10:30:45.123456789"))
 * // { milliseconds: 123, microseconds: 456, nanoseconds: 789 }
 *
 * // High-precision timing
 * function getHighPrecisionDuration(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): number {
 *   const startNanos = start.hour * 3600000000000 +
 *                     start.minute * 60000000000 +
 *                     start.second * 1000000000 +
 *                     (getNanosecond(start) ?? 0)
 *
 *   const endNanos = end.hour * 3600000000000 +
 *                   end.minute * 60000000000 +
 *                   end.second * 1000000000 +
 *                   (getNanosecond(end) ?? 0)
 *
 *   return endNanos - startNanos
 * }
 *
 * const startTime = Temporal.PlainTime.from("10:30:45.123456789")
 * const endTime = Temporal.PlainTime.from("10:30:45.123456999")
 * getHighPrecisionDuration(startTime, endTime)  // 210 nanoseconds
 *
 * // Precision detection
 * function detectPrecisionLevel(time: Temporal.PlainTime): string {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return "Invalid"
 *   if (nanos === 0) return "Second"
 *   if (nanos % 1000000 === 0) return "Millisecond"
 *   if (nanos % 1000 === 0) return "Microsecond"
 *   return "Nanosecond"
 * }
 *
 * detectPrecisionLevel(Temporal.PlainTime.from("10:30:45"))         // "Second"
 * detectPrecisionLevel(Temporal.PlainTime.from("10:30:45.123"))     // "Millisecond"
 * detectPrecisionLevel(Temporal.PlainTime.from("10:30:45.123456"))  // "Microsecond"
 * detectPrecisionLevel(Temporal.PlainTime.from("10:30:45.123456789")) // "Nanosecond"
 *
 * // Scientific measurement helper
 * function formatScientificTime(time: Temporal.PlainTime): string {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return "Invalid"
 *
 *   const seconds = time.second + nanos / 1e9
 *   return `${time.hour}h ${time.minute}m ${seconds.toFixed(9)}s`
 * }
 *
 * formatScientificTime(Temporal.PlainTime.from("10:30:45.123456789"))
 * // "10h 30m 45.123456789s"
 *
 * // Null handling
 * getNanosecond(null)                     // null
 * getNanosecond(undefined)                // null
 * getNanosecond("10:30:45.123")          // null (string, not Temporal object)
 * getNanosecond(new Date())               // null (Date, not Temporal)
 *
 * // Quantum computing simulation helper
 * function getQuantumGateTime(time: Temporal.PlainTime): number {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return 0
 *
 *   // Typical quantum gate operation: 10-100 nanoseconds
 *   const gateTimeNs = 50
 *   return Math.floor(nanos / gateTimeNs)
 * }
 *
 * getQuantumGateTime(Temporal.PlainTime.from("10:30:45.000005000"))
 * // 100 gate operations possible in 5000 nanoseconds
 *
 * // CPU cycle estimation (3 GHz processor)
 * function getCPUCycles(time: Temporal.PlainTime, ghz: number = 3): number {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return 0
 *
 *   // Cycles = nanoseconds * GHz
 *   return Math.floor(nanos * ghz / 1000000000)
 * }
 *
 * getCPUCycles(Temporal.PlainTime.from("10:30:45.000000333"), 3)
 * // 0 cycles (999 nanoseconds at 3 GHz = ~1 cycle)
 *
 * // Network latency precision
 * function getNetworkLatencyMicros(time: Temporal.PlainTime): number {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return 0
 *
 *   return Math.floor(nanos / 1000)  // Convert to microseconds
 * }
 *
 * getNetworkLatencyMicros(Temporal.PlainTime.from("10:30:45.001500000"))
 * // 1500 microseconds (1.5 milliseconds)
 *
 * // Synchronization precision check
 * function isSynchronizedToNanosecond(
 *   time1: Temporal.PlainTime,
 *   time2: Temporal.PlainTime,
 *   toleranceNs: number = 100
 * ): boolean {
 *   const ns1 = getNanosecond(time1)
 *   const ns2 = getNanosecond(time2)
 *
 *   if (ns1 === null || ns2 === null) return false
 *
 *   // Check if times are in same second first
 *   if (time1.hour !== time2.hour ||
 *       time1.minute !== time2.minute ||
 *       time1.second !== time2.second) {
 *     return false
 *   }
 *
 *   return Math.abs(ns1 - ns2) <= toleranceNs
 * }
 *
 * const t1 = Temporal.PlainTime.from("10:30:45.123456789")
 * const t2 = Temporal.PlainTime.from("10:30:45.123456889")
 * isSynchronizedToNanosecond(t1, t2, 100)  // true (100ns difference)
 * isSynchronizedToNanosecond(t1, t2, 50)   // false (exceeds 50ns tolerance)
 *
 * // Audio sample timing (48 kHz = ~20833 nanoseconds per sample)
 * function getAudioSampleNumber(time: Temporal.PlainTime, sampleRate: number = 48000): number {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return 0
 *
 *   const nanosPerSample = 1000000000 / sampleRate
 *   return Math.floor(nanos / nanosPerSample)
 * }
 *
 * getAudioSampleNumber(Temporal.PlainTime.from("10:30:45.001"))  // 48 samples in 1ms
 *
 * // Video frame timing (60 fps = ~16666667 nanoseconds per frame)
 * function getVideoFrameNumber(time: Temporal.PlainTime, fps: number = 60): number {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return 0
 *
 *   const nanosPerFrame = 1000000000 / fps
 *   return Math.floor(nanos / nanosPerFrame)
 * }
 *
 * getVideoFrameNumber(Temporal.PlainTime.from("10:30:45.500"))  // Frame 30 of 60
 *
 * // GPS timing precision (GPS atomic clocks: ~10 nanosecond accuracy)
 * function getGPSTimingError(
 *   measured: Temporal.PlainTime,
 *   actual: Temporal.PlainTime
 * ): number | null {
 *   const measuredNs = getNanosecond(measured)
 *   const actualNs = getNanosecond(actual)
 *
 *   if (measuredNs === null || actualNs === null) return null
 *
 *   // Assuming same second
 *   return Math.abs(measuredNs - actualNs)
 * }
 *
 * // Particle physics event timing
 * function getParticleDecayWindow(time: Temporal.PlainTime): string {
 *   const nanos = getNanosecond(time)
 *   if (nanos === null) return "Invalid"
 *
 *   // Common particle lifetimes
 *   if (nanos < 1) return "Sub-nanosecond (many particles)"
 *   if (nanos < 10) return "Short-lived hadrons"
 *   if (nanos < 100) return "Muon decay range"
 *   if (nanos < 1000) return "Neutral kaon range"
 *   return "Long-lived particles"
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Precision - Provides nanosecond precision (billionths of a second)
 * @property Range - Returns 0-999,999,999 nanoseconds within a second
 */
const getNanosecond = (
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (time == null) {
		return null
	}

	if (
		!(time instanceof Temporal.PlainTime) &&
		!(time instanceof Temporal.PlainDateTime) &&
		!(time instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return time.nanosecond
	} catch {
		return null
	}
}

export default getNanosecond
