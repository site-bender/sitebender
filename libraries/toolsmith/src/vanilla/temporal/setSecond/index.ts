/**
 * Returns a new time or datetime with the second set to the specified value
 *
 * Creates a new Temporal time or datetime with the second changed to the specified
 * value (0-59). Other time components (hours, minutes, milliseconds, etc.) are
 * preserved. This is a curried function for easy composition. Returns null for
 * invalid inputs to support safe error handling.
 *
 * @curried
 * @param second - The second to set (0-59)
 * @param time - The Temporal time to modify
 * @returns New time with updated second, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setSecond(0)(time)                      // PlainTime 10:30:00
 * setSecond(15)(time)                     // PlainTime 10:30:15
 * setSecond(30)(time)                     // PlainTime 10:30:30
 * setSecond(59)(time)                     // PlainTime 10:30:59
 *
 * // Preserves hours, minutes, and sub-second precision
 * const preciseTime = Temporal.PlainTime.from("14:30:45.123456789")
 * setSecond(15)(preciseTime)              // PlainTime 14:30:15.123456789
 * setSecond(0)(preciseTime)               // PlainTime 14:30:00.123456789
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setSecond(0)(datetime)                  // PlainDateTime 2024-03-15T10:30:00
 * setSecond(20)(datetime)                 // PlainDateTime 2024-03-15T10:30:20
 * setSecond(59)(datetime)                 // PlainDateTime 2024-03-15T10:30:59
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:45-04:00[America/New_York]"
 * )
 * setSecond(30)(zonedDateTime)            // ZonedDateTime 2024-03-15T10:30:30-04:00[America/New_York]
 *
 * // Invalid second handling
 * setSecond(-1)(time)                     // null (negative second)
 * setSecond(60)(time)                     // null (second must be < 60)
 * setSecond(61)(time)                     // null (invalid second)
 * setSecond(30.5)(time)                   // null (must be integer)
 *
 * // Null handling
 * setSecond(30)(null)                     // null
 * setSecond(30)(undefined)                // null
 * setSecond(30)("10:30:45" as any)       // null (string, not Temporal)
 *
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:15:22"),
 *   Temporal.PlainTime.from("14:30:37"),
 *   Temporal.PlainTime.from("18:45:51")
 * ]
 * const resetToZero = setSecond(0)
 * times.map(resetToZero)
 * // [09:15:00, 14:30:00, 18:45:00]
 *
 * // Partial application examples
 * const resetToZero = setSecond(0)
 * const setToHalfMinute = setSecond(30)
 * const setToLastSecond = setSecond(59)
 *
 * const someTime = Temporal.PlainTime.from("10:30:45")
 * resetToZero(someTime)                   // PlainTime 10:30:00
 * setToHalfMinute(someTime)               // PlainTime 10:30:30
 * setToLastSecond(someTime)               // PlainTime 10:30:59
 *
 * // With sub-second precision preserved
 * const preciseTime = Temporal.PlainTime.from("14:30:45.123456789")
 * setSecond(15)(preciseTime)              // PlainTime 14:30:15.123456789
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function setSecond(second: number) {
	return function setSecondOnTime(
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

		// Validate second is in valid range
		if (second < 0 || second > 59 || !Number.isInteger(second)) {
			return null
		}

		try {
			return time.with({ second })
		} catch {
			return null
		}
	}
}
