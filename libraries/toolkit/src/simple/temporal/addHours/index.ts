/**
 * Adds hours to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 *
 * Immutably adds the specified number of hours to a time or datetime.
 * Returns a new Temporal object with the hours added. Negative values
 * subtract hours. For PlainTime, wraps around 24-hour boundaries.
 * For datetime types, handles day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (hours) => (time) => result
 * @param hours - Number of hours to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add hours to
 * @returns New time/datetime with hours added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:00")
 * addHours(2)(time)        // PlainTime 12:30:00
 * addHours(-3)(time)       // PlainTime 07:30:00
 *
 * // 24-hour wrapping with PlainTime
 * const evening = Temporal.PlainTime.from("22:00:00")
 * addHours(3)(evening)     // PlainTime 01:00:00 (wraps)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addHours(14)(datetime)   // PlainDateTime 2024-03-16T00:30:00
 *
 * // Partial application
 * const addHalfDay = addHours(12)
 * const addFullDay = addHours(24)
 * const now = Temporal.PlainTime.from("09:00:00")
 * addHalfDay(now)          // PlainTime 21:00:00
 *
 * // Shift scheduling
 * const getShiftEnd = (start: Temporal.PlainTime, duration: number) =>
 *   addHours(duration)(start)
 *
 * const morningShift = Temporal.PlainTime.from("06:00:00")
 * getShiftEnd(morningShift, 8)  // PlainTime 14:00:00
 *
 * // Null handling
 * addHours(2)(null)        // null
 * addHours(2)(undefined)   // null
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

const addHours = (hours: number) =>
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
		return time.add({ hours })
	} catch {
		return null
	}
}

export default addHours
