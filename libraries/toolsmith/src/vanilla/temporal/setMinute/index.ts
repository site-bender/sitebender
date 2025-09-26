/**
 * Returns a new time or datetime with the minute set to the specified value
 *
 * Creates a new Temporal time or datetime with the minute changed to the specified
 * value (0-59). Other time components (hours, seconds, etc.) are preserved. This
 * is a curried function for easy composition. Returns null for invalid inputs to
 * support safe error handling.
 *
 * @curried
 * @param minute - The minute to set (0-59)
 * @param time - The Temporal time to modify
 * @returns New time with updated minute, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setMinute(0)(time)                      // PlainTime 10:00:45
 * setMinute(15)(time)                     // PlainTime 10:15:45
 * setMinute(45)(time)                     // PlainTime 10:45:45
 * setMinute(59)(time)                     // PlainTime 10:59:45
 *
 * // Preserves hours and seconds
 * const preciseTime = Temporal.PlainTime.from("14:30:45.123456789")
 * setMinute(15)(preciseTime)              // PlainTime 14:15:45.123456789
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setMinute(0)(datetime)                  // PlainDateTime 2024-03-15T10:00:45
 * setMinute(20)(datetime)                 // PlainDateTime 2024-03-15T10:20:45
 * setMinute(59)(datetime)                 // PlainDateTime 2024-03-15T10:59:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setMinute(45)(zonedDateTime)            // ZonedDateTime 2024-03-15T10:45:00-04:00[America/New_York]
 *
 * // Invalid minute handling
 * setMinute(-1)(time)                     // null (negative minute)
 * setMinute(60)(time)                     // null (minute must be < 60)
 * setMinute(61)(time)                     // null (invalid minute)
 * setMinute(30.5)(time)                   // null (must be integer)
 *
 * // Null handling
 * setMinute(30)(null)                     // null
 * setMinute(30)(undefined)                // null
 * setMinute(30)("10:30:45" as any)       // null (string, not Temporal)
 *
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:22:00"),
 *   Temporal.PlainTime.from("14:37:00"),
 *   Temporal.PlainTime.from("18:51:00")
 * ]
 * const setToHalfPast = setMinute(30)
 * times.map(setToHalfPast)
 * // [09:30:00, 14:30:00, 18:30:00]
 *
 * // Partial application examples
 * const setToTopOfHour = setMinute(0)
 * const setToQuarterPast = setMinute(15)
 * const setToHalfPast = setMinute(30)
 * const setToQuarterTo = setMinute(45)
 *
 * const someTime = Temporal.PlainTime.from("10:22:00")
 * setToTopOfHour(someTime)                // PlainTime 10:00:00
 * setToQuarterPast(someTime)              // PlainTime 10:15:00
 * setToHalfPast(someTime)                 // PlainTime 10:30:00
 * setToQuarterTo(someTime)                // PlainTime 10:45:00
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function setMinute(minute: number) {
	return function setMinuteOnTime(
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
		| null {
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

		// Validate minute is in valid range
		if (minute < 0 || minute > 59 || !Number.isInteger(minute)) {
			return null
		}

		try {
			return time.with({ minute })
		} catch {
			return null
		}
	}
}
