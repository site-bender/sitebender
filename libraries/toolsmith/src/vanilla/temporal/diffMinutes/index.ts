import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the difference in minutes between two times or datetimes
 *
 * Computes the number of minutes from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * null for invalid inputs.
 *
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of minutes difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const time1 = Temporal.PlainTime.from("10:00:00")
 * const time2 = Temporal.PlainTime.from("10:30:00")
 * diffMinutes(time1)(time2)               // 30
 * diffMinutes(time2)(time1)               // -30
 *
 * // With seconds
 * const start = Temporal.PlainTime.from("10:15:30")
 * const end = Temporal.PlainTime.from("10:45:45")
 * diffMinutes(start)(end)                 // 30.25
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T09:45:00")
 * diffMinutes(dt1)(dt2)                   // 45
 *
 * // Crossing day boundary
 * const night = Temporal.PlainDateTime.from("2024-03-15T23:45:00")
 * const morning = Temporal.PlainDateTime.from("2024-03-16T00:15:00")
 * diffMinutes(night)(morning)             // 30
 *
 * // Partial application
 * const taskStart = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * const minutesElapsed = diffMinutes(taskStart)
 * minutesElapsed(Temporal.PlainDateTime.from("2024-03-15T14:45:00"))  // 45
 *
 * // Exercise duration with reduce
 * const workout = [
 *   { start: Temporal.PlainTime.from("06:00:00"), end: Temporal.PlainTime.from("06:20:00") },
 *   { start: Temporal.PlainTime.from("06:25:00"), end: Temporal.PlainTime.from("06:45:00") }
 * ]
 * const total = workout.reduce((sum, exercise) => {
 *   const minutes = diffMinutes(exercise.start)(exercise.end)
 *   return sum + (minutes || 0)
 * }, 0)  // 40 minutes total
 *
 * // Null handling
 * diffMinutes(null)(time2)                // null
 * diffMinutes(time1)(null)                // null
 * ```
 * @pure
 * @safe - Returns null for invalid inputs
 * @curried
 */
export default function diffMinutes(
	from:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
) {
	return function calculateMinutesDifference(
		to:
			| Temporal.PlainTime
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	): number | null {
		if (isNullish(from) || isNullish(to)) {
			return null
		}

		try {
			// Handle different Temporal types
			if (
				from instanceof Temporal.PlainTime &&
				to instanceof Temporal.PlainTime
			) {
				// For PlainTime, calculate assuming same day
				const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
					from.second * 1e9 +
					from.millisecond * 1e6 + from.microsecond * 1e3 +
					from.nanosecond
				const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
					to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
				const diffNs = toNs - fromNs
				return diffNs / 60e9 // Convert nanoseconds to minutes
			}

			if (
				from instanceof Temporal.PlainDateTime &&
				to instanceof Temporal.PlainDateTime
			) {
				const duration = to.since(from, { largestUnit: "hours" })
				return duration.hours * 60 + duration.minutes +
					duration.seconds / 60 +
					duration.milliseconds / 60000 +
					duration.microseconds / 60000000 +
					duration.nanoseconds / 60000000000
			}

			if (
				from instanceof Temporal.ZonedDateTime &&
				to instanceof Temporal.ZonedDateTime
			) {
				const duration = to.since(from, { largestUnit: "hours" })
				return duration.hours * 60 + duration.minutes +
					duration.seconds / 60 +
					duration.milliseconds / 60000 +
					duration.microseconds / 60000000 +
					duration.nanoseconds / 60000000000
			}

			// Type mismatch or unsupported types
			return null
		} catch {
			return null
		}
	}
}
