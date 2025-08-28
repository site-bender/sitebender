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
 * const noMillis = Temporal.PlainTime.from("09:15:30")
 * getMillisecond(noMillis)                // 0 (no milliseconds specified)
 *
 * const halfSecond = Temporal.PlainTime.from("12:00:00.500")
 * getMillisecond(halfSecond)              // 500
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45.789")
 * getMillisecond(datetime)                // 789
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
 * // Timer precision check
 * const hasMillisecondPrecision = (time: Temporal.PlainTime): boolean => {
 *   const ms = getMillisecond(time)
 *   return ms !== null && ms > 0
 * }
 *
 * hasMillisecondPrecision(Temporal.PlainTime.from("10:30:45.123"))  // true
 * hasMillisecondPrecision(Temporal.PlainTime.from("10:30:45"))      // false
 *
 * // Millisecond bucketing (functional)
 * const bucketByMilliseconds = (
 *   times: Array<Temporal.PlainTime>,
 *   bucketSize: number = 100
 * ): Map<number, Array<Temporal.PlainTime>> =>
 *   times.reduce((buckets, time) => {
 *     const ms = getMillisecond(time)
 *     if (ms !== null) {
 *       const bucket = Math.floor(ms / bucketSize) * bucketSize
 *       const group = buckets.get(bucket) ?? []
 *       buckets.set(bucket, [...group, time])
 *     }
 *     return buckets
 *   }, new Map<number, Array<Temporal.PlainTime>>())
 *
 * // Null handling
 * getMillisecond(null)                    // null
 * getMillisecond(undefined)               // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @precision Returns milliseconds (0-999), truncating higher precision
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
