/**
 * Calculates the difference in seconds between two times or datetimes
 *
 * Computes the number of seconds from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * fractional seconds for sub-second precision. Returns null for invalid inputs.
 *
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of seconds difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const time1 = Temporal.PlainTime.from("10:00:00")
 * const time2 = Temporal.PlainTime.from("10:00:30")
 * diffSeconds(time1)(time2)               // 30
 * diffSeconds(time2)(time1)               // -30
 *
 * // With milliseconds
 * const start = Temporal.PlainTime.from("10:00:00.500")
 * const end = Temporal.PlainTime.from("10:00:01.750")
 * diffSeconds(start)(end)                 // 1.25
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T10:01:30")
 * diffSeconds(dt1)(dt2)                   // 90
 *
 * // High precision
 * const precise1 = Temporal.PlainTime.from("10:00:00.123456789")
 * const precise2 = Temporal.PlainTime.from("10:00:00.987654321")
 * diffSeconds(precise1)(precise2)         // 0.864197532
 *
 * // Partial application
 * const startTime = Temporal.Now.plainTimeISO()
 * const elapsed = diffSeconds(startTime)
 * // Later...
 * elapsed(Temporal.Now.plainTimeISO())    // Seconds elapsed
 *
 * // Heartbeat intervals using reduce
 * const beats = [
 *   Temporal.PlainTime.from("10:00:00.000"),
 *   Temporal.PlainTime.from("10:00:00.833"),
 *   Temporal.PlainTime.from("10:00:01.667")
 * ]
 * const intervals = beats.slice(1).map((beat, i) => 
 *   diffSeconds(beats[i])(beat)
 * ).filter(interval => interval !== null)
 * // [0.833, 0.834]
 *
 * // Null handling
 * diffSeconds(null)(time2)                // null
 * diffSeconds(time1)(null)                // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
const diffSeconds = (
	from:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
) =>
(
	to:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (from == null || to == null) {
		return null
	}

	try {
		// Handle different Temporal types
		if (
			from instanceof Temporal.PlainTime && to instanceof Temporal.PlainTime
		) {
			// For PlainTime, calculate assuming same day
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
				from.second * 1e9 +
				from.millisecond * 1e6 + from.microsecond * 1e3 + from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
				to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 1e9 // Convert nanoseconds to seconds
		}

		if (
			from instanceof Temporal.PlainDateTime &&
			to instanceof Temporal.PlainDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours * 3600 + duration.minutes * 60 + duration.seconds +
				duration.milliseconds / 1000 + duration.microseconds / 1000000 +
				duration.nanoseconds / 1000000000
		}

		if (
			from instanceof Temporal.ZonedDateTime &&
			to instanceof Temporal.ZonedDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours * 3600 + duration.minutes * 60 + duration.seconds +
				duration.milliseconds / 1000 + duration.microseconds / 1000000 +
				duration.nanoseconds / 1000000000
		}

		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffSeconds
