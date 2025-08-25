/**
 * Gets the millisecond component from a Temporal time or datetime
 *
 * Extracts the millisecond component (0-999) from a Temporal PlainTime, PlainDateTime,
 * or ZonedDateTime. Milliseconds represent the fractional second portion from 0 to 999.
 * Note that Temporal also supports microseconds and nanoseconds for higher precision.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param time - The Temporal object to get millisecond from
 * @returns The millisecond (0-999), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45.123")
 * getMillisecond(time)                    // 123
 *
 * const precise = Temporal.PlainTime.from("14:23:17.456")
 * getMillisecond(precise)                 // 456
 *
 * const noMillis = Temporal.PlainTime.from("09:15:30")
 * getMillisecond(noMillis)                // 0 (no milliseconds specified)
 *
 * const halfSecond = Temporal.PlainTime.from("12:00:00.500")
 * getMillisecond(halfSecond)              // 500
 *
 * const almostSecond = Temporal.PlainTime.from("18:45:30.999")
 * getMillisecond(almostSecond)            // 999
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45.789")
 * getMillisecond(datetime)                // 789
 *
 * const startOfSecond = Temporal.PlainDateTime.from("2024-03-15T12:00:00.000")
 * getMillisecond(startOfSecond)           // 0
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:30:45.234-05:00[America/New_York]"
 * )
 * getMillisecond(zonedDateTime)           // 234
 *
 * // High precision with microseconds/nanoseconds
 * const microTime = Temporal.PlainTime.from("10:30:45.123456789")
 * getMillisecond(microTime)               // 123 (ignores microseconds/nanoseconds)
 *
 * // Different levels of precision
 * const times = [
 *   Temporal.PlainTime.from("10:30:45"),        // 0 ms
 *   Temporal.PlainTime.from("10:30:45.1"),      // 100 ms
 *   Temporal.PlainTime.from("10:30:45.12"),     // 120 ms
 *   Temporal.PlainTime.from("10:30:45.123"),    // 123 ms
 *   Temporal.PlainTime.from("10:30:45.1234"),   // 123 ms (truncates microseconds)
 * ].map(getMillisecond)
 * // [0, 100, 120, 123, 123]
 *
 * // Timer precision check
 * function hasMillisecondPrecision(time: Temporal.PlainTime): boolean {
 *   const ms = getMillisecond(time)
 *   return ms !== null && ms > 0
 * }
 *
 * hasMillisecondPrecision(Temporal.PlainTime.from("10:30:45.123"))  // true
 * hasMillisecondPrecision(Temporal.PlainTime.from("10:30:45"))      // false
 *
 * // Millisecond rounding
 * function roundToNearestMillisecond(time: Temporal.PlainTime): Temporal.PlainTime | null {
 *   const ms = getMillisecond(time)
 *   if (ms === null) return null
 *
 *   // If we have sub-millisecond precision, round based on microseconds
 *   const microseconds = time.microsecond % 1000
 *   const roundedMs = microseconds >= 500 ? ms + 1 : ms
 *
 *   return time.with({
 *     millisecond: roundedMs % 1000,
 *     microsecond: 0,
 *     nanosecond: 0
 *   })
 * }
 *
 * // Animation frame timing
 * function getFrameMilliseconds(
 *   time: Temporal.PlainTime,
 *   fps: number = 60
 * ): number {
 *   const ms = getMillisecond(time)
 *   if (ms === null) return 0
 *
 *   const frameMs = 1000 / fps
 *   return Math.floor(ms / frameMs) * frameMs
 * }
 *
 * getFrameMilliseconds(Temporal.PlainTime.from("10:30:45.123"), 60)  // 116 (frame 7)
 * getFrameMilliseconds(Temporal.PlainTime.from("10:30:45.500"), 30)  // 500 (frame 15)
 *
 * // Null handling
 * getMillisecond(null)                    // null
 * getMillisecond(undefined)               // null
 * getMillisecond("10:30:45.123")         // null (string, not Temporal object)
 * getMillisecond(new Date())              // null (Date, not Temporal)
 *
 * // Performance timing
 * function getExecutionTime(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime
 * ): number {
 *   const startMs = start.hour * 3600000 +
 *                  start.minute * 60000 +
 *                  start.second * 1000 +
 *                  (getMillisecond(start) ?? 0)
 *
 *   const endMs = end.hour * 3600000 +
 *                end.minute * 60000 +
 *                end.second * 1000 +
 *                (getMillisecond(end) ?? 0)
 *
 *   return endMs - startMs
 * }
 *
 * const startTime = Temporal.PlainTime.from("10:30:45.123")
 * const endTime = Temporal.PlainTime.from("10:30:47.456")
 * getExecutionTime(startTime, endTime)    // 2333 ms
 *
 * // Millisecond bucketing for analytics
 * function bucketByMilliseconds(
 *   times: Array<Temporal.PlainTime>,
 *   bucketSize: number = 100
 * ): Map<number, Array<Temporal.PlainTime>> {
 *   const buckets = new Map<number, Array<Temporal.PlainTime>>()
 *
 *   for (const time of times) {
 *     const ms = getMillisecond(time)
 *     if (ms !== null) {
 *       const bucket = Math.floor(ms / bucketSize) * bucketSize
 *       const group = buckets.get(bucket) ?? []
 *       group.push(time)
 *       buckets.set(bucket, group)
 *     }
 *   }
 *
 *   return buckets
 * }
 *
 * // Synchronization check
 * function areTimesynchronized(
 *   time1: Temporal.PlainTime,
 *   time2: Temporal.PlainTime,
 *   toleranceMs: number = 10
 * ): boolean {
 *   const ms1 = getMillisecond(time1)
 *   const ms2 = getMillisecond(time2)
 *
 *   if (ms1 === null || ms2 === null) return false
 *
 *   return Math.abs(ms1 - ms2) <= toleranceMs
 * }
 *
 * const t1 = Temporal.PlainTime.from("10:30:45.123")
 * const t2 = Temporal.PlainTime.from("10:30:45.125")
 * areTimesynchronized(t1, t2, 5)          // true (within 5ms tolerance)
 * areTimesynchronized(t1, t2, 1)          // false (exceeds 1ms tolerance)
 *
 * // Subsecond pattern detection
 * function hasRepeatingMillisecondPattern(
 *   times: Array<Temporal.PlainTime>
 * ): boolean {
 *   if (times.length < 2) return false
 *
 *   const firstMs = getMillisecond(times[0])
 *   if (firstMs === null) return false
 *
 *   const secondMs = getMillisecond(times[1])
 *   if (secondMs === null) return false
 *
 *   const interval = secondMs - firstMs
 *
 *   for (let i = 2; i < times.length; i++) {
 *     const currentMs = getMillisecond(times[i])
 *     const previousMs = getMillisecond(times[i - 1])
 *
 *     if (currentMs === null || previousMs === null) return false
 *     if (currentMs - previousMs !== interval) return false
 *   }
 *
 *   return true
 * }
 *
 * // Statistical analysis
 * function getMillisecondStats(
 *   times: Array<Temporal.PlainTime>
 * ): { min: number, max: number, avg: number } | null {
 *   const milliseconds = times
 *     .map(getMillisecond)
 *     .filter((ms): ms is number => ms !== null)
 *
 *   if (milliseconds.length === 0) return null
 *
 *   const min = Math.min(...milliseconds)
 *   const max = Math.max(...milliseconds)
 *   const avg = milliseconds.reduce((a, b) => a + b, 0) / milliseconds.length
 *
 *   return { min, max, avg }
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Precision - Returns milliseconds (0-999), truncating higher precision
 */
const getMillisecond = (
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
		return time.millisecond
	} catch {
		return null
	}
}

export default getMillisecond
