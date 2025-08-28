/**
 * Calculates the difference in hours between two times or datetimes
 *
 * Computes the number of hours from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * null for invalid inputs.
 *
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of hours difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const time1 = Temporal.PlainTime.from("09:00:00")
 * const time2 = Temporal.PlainTime.from("17:30:00")
 * diffHours(time1)(time2)                 // 8.5
 * diffHours(time2)(time1)                 // -8.5
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T17:30:00")
 * diffHours(dt1)(dt2)                     // 8.5
 *
 * // Crossing day boundary
 * const night = Temporal.PlainDateTime.from("2024-03-15T22:00:00")
 * const morning = Temporal.PlainDateTime.from("2024-03-16T06:00:00")
 * diffHours(night)(morning)               // 8
 *
 * // With ZonedDateTime
 * const zoned1 = Temporal.ZonedDateTime.from(
 *   "2024-03-10T00:00:00-04:00[America/New_York]"
 * )
 * const zoned2 = Temporal.ZonedDateTime.from(
 *   "2024-03-10T06:00:00-04:00[America/New_York]"
 * )
 * diffHours(zoned1)(zoned2)               // Accounts for DST
 *
 * // Partial application
 * const shiftStart = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const hoursWorked = diffHours(shiftStart)
 * hoursWorked(Temporal.PlainDateTime.from("2024-03-15T17:30:00"))  // 8.5
 *
 * // Null handling
 * diffHours(null)(time2)                  // null
 * diffHours(time1)(null)                  // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
const diffHours = (
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
			// This will give negative values if 'to' appears earlier (assuming next day)
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
				from.second * 1e9 +
				from.millisecond * 1e6 + from.microsecond * 1e3 + from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
				to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 3600e9 // Convert nanoseconds to hours
		}

		if (
			from instanceof Temporal.PlainDateTime &&
			to instanceof Temporal.PlainDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours + duration.minutes / 60 + duration.seconds / 3600 +
				duration.milliseconds / 3600000 + duration.microseconds / 3600000000 +
				duration.nanoseconds / 3600000000000
		}

		if (
			from instanceof Temporal.ZonedDateTime &&
			to instanceof Temporal.ZonedDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours + duration.minutes / 60 + duration.seconds / 3600 +
				duration.milliseconds / 3600000 + duration.microseconds / 3600000000 +
				duration.nanoseconds / 3600000000000
		}

		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffHours
