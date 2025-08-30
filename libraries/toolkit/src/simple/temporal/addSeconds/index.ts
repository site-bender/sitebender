/**
 * Adds seconds to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 *
 * Immutably adds the specified number of seconds to a time or datetime.
 * Returns a new Temporal object with the seconds added. Negative values
 * subtract seconds. Handles minute, hour, and day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (seconds) => (time) => result
 * @param seconds - Number of seconds to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add seconds to
 * @returns New time/datetime with seconds added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * addSeconds(15)(time)          // PlainTime 10:31:00
 * addSeconds(-20)(time)         // PlainTime 10:30:25
 *
 * // Boundary crossing
 * const nearMinute = Temporal.PlainTime.from("10:30:55")
 * addSeconds(10)(nearMinute)    // PlainTime 10:31:05
 *
 * const nearMidnight = Temporal.PlainTime.from("23:59:50")
 * addSeconds(15)(nearMidnight)  // PlainTime 00:00:05 (wraps)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T23:59:50")
 * addSeconds(10)(datetime)      // PlainDateTime 2024-03-16T00:00:00
 *
 * // Partial application
 * const addMinute = addSeconds(60)
 * const timer = Temporal.PlainTime.from("00:00:00")
 * addMinute(timer)              // PlainTime 00:01:00
 *
 * // Null handling
 * addSeconds(30)(null)          // null
 * addSeconds(30)(undefined)     // null
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
const addSeconds = (seconds: number) =>
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
		return time.add({ seconds })
	} catch {
		return null
	}
}

export default addSeconds
