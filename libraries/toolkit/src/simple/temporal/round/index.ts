import isNullish from "../../validation/isNullish/index.ts"

/**
 * Rounds a datetime to the nearest unit (hour, minute, second, etc.)
 *
 * Rounds a Temporal time or datetime to the nearest specified unit. Supports
 * rounding to various units like hour, minute, second, millisecond, etc.
 * Uses banker's rounding (round half to even) by default. This is a curried
 * function for easy composition. Returns null for invalid inputs to support
 * safe error handling.
 *
 * @curried
 * @param unit - The unit to round to ('hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'day')
 * @param datetime - The Temporal object to round
 * @returns Rounded datetime of same type, or null if invalid
 * @example
 * ```typescript
 * // Round to nearest hour
 * const time = Temporal.PlainTime.from("10:37:45.123")
 * round('hour')(time)                     // PlainTime 11:00:00
 *
 * const earlyTime = Temporal.PlainTime.from("10:29:59")
 * round('hour')(earlyTime)                // PlainTime 10:00:00
 *
 * const halfHour = Temporal.PlainTime.from("10:30:00")
 * round('hour')(halfHour)                 // PlainTime 10:00:00 (banker's rounding to even)
 *
 * // Round to nearest minute
 * const seconds = Temporal.PlainTime.from("10:30:29")
 * round('minute')(seconds)                // PlainTime 10:30:00
 *
 * const halfMinute = Temporal.PlainTime.from("10:30:30")
 * round('minute')(halfMinute)             // PlainTime 10:31:00
 *
 * // Round to nearest second
 * const millis = Temporal.PlainTime.from("10:30:45.678")
 * round('second')(millis)                 // PlainTime 10:30:46
 *
 * const halfSecond = Temporal.PlainTime.from("10:30:45.500")
 * round('second')(halfSecond)             // PlainTime 10:30:46 (rounds up at exactly .5)
 *
 * // Round to nearest millisecond
 * const micros = Temporal.PlainTime.from("10:30:45.123456")
 * round('millisecond')(micros)            // PlainTime 10:30:45.123
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:37:45.123")
 * round('hour')(datetime)                 // PlainDateTime 2024-03-15T11:00:00
 * round('minute')(datetime)               // PlainDateTime 2024-03-15T10:38:00
 * round('second')(datetime)               // PlainDateTime 2024-03-15T10:37:45
 *
 * // Round to nearest day
 * const afternoon = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * round('day')(afternoon)                 // PlainDateTime 2024-03-16T00:00:00
 *
 * const morning = Temporal.PlainDateTime.from("2024-03-15T11:00:00")
 * round('day')(morning)                   // PlainDateTime 2024-03-15T00:00:00
 *
 * const noon = Temporal.PlainDateTime.from("2024-03-15T12:00:00")
 * round('day')(noon)                      // PlainDateTime 2024-03-16T00:00:00 (rounds up at noon)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:37:45.123-04:00[America/New_York]"
 * )
 * round('hour')(zonedDateTime)            // Rounded to 11:00:00 in same timezone
 *
 * // Round to day
 * const afternoon = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * round('day')(afternoon)                 // PlainDateTime 2024-03-16T00:00:00
 *
 * // With ZonedDateTime
 * const zoned = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:37:45.123-04:00[America/New_York]"
 * )
 * round('hour')(zoned)                    // Rounded to 11:00:00 in same timezone
 *
 * // Partial application
 * const roundToHour = round('hour')
 * const roundToMinute = round('minute')
 * 
 * const times = [
 *   Temporal.PlainTime.from("10:37:45"),
 *   Temporal.PlainTime.from("14:22:30")
 * ]
 * times.map(roundToHour)                  // [11:00:00, 14:00:00]
 *
 * // Null handling
 * round('hour')(null)                     // null
 * round('minute')(undefined)              // null
 * ```
 * @pure
 * @safe
 * @curried
 */
const round = (
	unit:
		| "hour"
		| "minute"
		| "second"
		| "millisecond"
		| "microsecond"
		| "nanosecond"
		| "day",
) =>
(
	datetime:
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
	if (isNullish(datetime)) {
		return null
	}

	if (
		!(datetime instanceof Temporal.PlainTime) &&
		!(datetime instanceof Temporal.PlainDateTime) &&
		!(datetime instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// Use Temporal's built-in round method
		// The round method supports: 'day', 'hour', 'minute', 'second',
		// 'millisecond', 'microsecond', 'nanosecond'
		return datetime.round({ smallestUnit: unit, roundingMode: "halfExpand" })
	} catch {
		return null
	}
}

export default round
