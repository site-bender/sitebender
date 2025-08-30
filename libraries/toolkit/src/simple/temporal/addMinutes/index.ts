/**
 * Adds minutes to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 *
 * Immutably adds the specified number of minutes to a time or datetime.
 * Returns a new Temporal object with the minutes added. Negative values
 * subtract minutes. Handles hour and day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (minutes) => (time) => result
 * @param minutes - Number of minutes to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add minutes to
 * @returns New time/datetime with minutes added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:00")
 * addMinutes(15)(time)          // PlainTime 10:45:00
 * addMinutes(30)(time)          // PlainTime 11:00:00
 * addMinutes(-15)(time)         // PlainTime 10:15:00
 *
 * // Hour boundary crossing
 * const nearHour = Temporal.PlainTime.from("10:55:00")
 * addMinutes(10)(nearHour)      // PlainTime 11:05:00
 *
 * // Day boundary with PlainTime (wraps)
 * const nearMidnight = Temporal.PlainTime.from("23:45:00")
 * addMinutes(30)(nearMidnight)  // PlainTime 00:15:00
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T23:45:00")
 * addMinutes(15)(datetime)      // PlainDateTime 2024-03-16T00:00:00
 *
 * // Partial application
 * const addHalfHour = addMinutes(30)
 * const meeting = Temporal.PlainTime.from("14:00:00")
 * addHalfHour(meeting)          // PlainTime 14:30:00
 *
 * // Meeting scheduling
 * const scheduleMeeting = (start: Temporal.PlainDateTime, duration: number) =>
 *   addMinutes(duration)(start)
 *
 * // Null handling
 * addMinutes(15)(null)          // null
 * addMinutes(15)(undefined)     // null
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

const addMinutes = (minutes: number) =>
(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
):
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| null => {
	if (isNullish(time)) {
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
		return time.add({ minutes })
	} catch {
		return null
	}
}

export default addMinutes
