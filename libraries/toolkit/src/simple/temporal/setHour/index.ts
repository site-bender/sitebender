/**
 * Returns a new time or datetime with the hour set to the specified value
 *
 * Creates a new Temporal time or datetime with the hour changed to the specified
 * value (0-23). The hour must be in 24-hour format where 0 represents midnight
 * and 23 represents 11 PM. Other time components (minutes, seconds, etc.) are
 * preserved. This is a curried function for easy composition. Returns null for
 * invalid inputs to support safe error handling.
 *
 * @curried
 * @param hour - The hour to set (0-23)
 * @param time - The Temporal time to modify
 * @returns New time with updated hour, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setHour(0)(time)                        // PlainTime 00:30:45 (midnight)
 * setHour(9)(time)                        // PlainTime 09:30:45
 * setHour(14)(time)                       // PlainTime 14:30:45 (2:30 PM)
 * setHour(23)(time)                       // PlainTime 23:30:45 (11:30 PM)
 *
 * // Preserves minutes and seconds
 * const preciseTime = Temporal.PlainTime.from("10:45:30.123456789")
 * setHour(15)(preciseTime)                // PlainTime 15:45:30.123456789
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setHour(0)(datetime)                    // PlainDateTime 2024-03-15T00:30:45
 * setHour(12)(datetime)                   // PlainDateTime 2024-03-15T12:30:45
 * setHour(20)(datetime)                   // PlainDateTime 2024-03-15T20:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setHour(16)(zonedDateTime)              // ZonedDateTime 2024-03-15T16:30:00-04:00[America/New_York]
 *
 * // DST transitions (Spring forward example)
 * const dstTransition = Temporal.ZonedDateTime.from(
 *   "2024-03-10T01:30:00-05:00[America/New_York]"
 * )
 * setHour(2)(dstTransition)               // 2024-03-10T03:30:00-04:00 (2 AM doesn't exist, jumps to 3 AM)
 * setHour(3)(dstTransition)               // 2024-03-10T03:30:00-04:00
 *
 * // Invalid hour handling
 * setHour(-1)(time)                       // null (negative hour)
 * setHour(24)(time)                       // null (hour must be < 24)
 * setHour(25)(time)                       // null (invalid hour)
 * setHour(1.5)(time)                      // null (must be integer)
 *
 * // Null handling
 * setHour(10)(null)                       // null
 * setHour(10)(undefined)                  // null
 * setHour(10)("10:30:45" as any)         // null (string, not Temporal)
 *
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:15:00"),
 *   Temporal.PlainTime.from("14:30:00"),
 *   Temporal.PlainTime.from("18:45:00")
 * ]
 * const setToNoon = setHour(12)
 * times.map(setToNoon)
 * // [12:15:00, 12:30:00, 12:45:00]
 *
 * // Partial application example
 * const setToMidnight = setHour(0)
 * const setToNoon = setHour(12)
 * const setToEvening = setHour(18)
 * 
 * const someTime = Temporal.PlainTime.from("14:30:00")
 * setToMidnight(someTime)                 // PlainTime 00:30:00
 * setToNoon(someTime)                     // PlainTime 12:30:00 
 * setToEvening(someTime)                  // PlainTime 18:30:00
 *
 * // DST transitions example
 * const dstTransition = Temporal.ZonedDateTime.from(
 *   "2024-03-10T01:30:00-05:00[America/New_York]"
 * )
 * setHour(2)(dstTransition)               // Jumps to 3 AM (2 AM doesn't exist)
 * setHour(3)(dstTransition)               // 2024-03-10T03:30:00-04:00
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import { isNullish } from "../../../validation/isNullish"

const setHour = (hour: number) =>
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

	// Validate hour is in valid range
	if (hour < 0 || hour > 23 || !Number.isInteger(hour)) {
		return null
	}

	try {
		return time.with({ hour })
	} catch {
		return null
	}
}

export default setHour
