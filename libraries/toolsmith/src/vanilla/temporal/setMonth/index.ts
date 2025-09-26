/**
 * Returns a new date with the month set to the specified value
 *
 * Creates a new Temporal date or datetime with the month changed to the specified
 * value (1-12, where 1 is January and 12 is December). If the day doesn't exist
 * in the target month (e.g., January 31 → February 31), it will be constrained
 * to the last valid day of that month (February 28/29). This is a curried function
 * for easy composition. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @curried
 * @param month - The month to set (1-12)
 * @param date - The Temporal date to modify
 * @returns New date with updated month, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setMonth(1)(date)                       // PlainDate 2024-01-15 (January)
 * setMonth(6)(date)                       // PlainDate 2024-06-15 (June)
 * setMonth(12)(date)                      // PlainDate 2024-12-15 (December)
 *
 * // Day overflow handling (31st to shorter months)
 * const endOfMonth = Temporal.PlainDate.from("2024-01-31")
 * setMonth(2)(endOfMonth)                 // PlainDate 2024-02-29 (leap year, constrained)
 * setMonth(4)(endOfMonth)                 // PlainDate 2024-04-30 (April has 30 days)
 * setMonth(6)(endOfMonth)                 // PlainDate 2024-06-30 (June has 30 days)
 * setMonth(9)(endOfMonth)                 // PlainDate 2024-09-30 (September has 30 days)
 * setMonth(11)(endOfMonth)                // PlainDate 2024-11-30 (November has 30 days)
 *
 * // Non-leap year February
 * const nonLeapDate = Temporal.PlainDate.from("2023-01-31")
 * setMonth(2)(nonLeapDate)                // PlainDate 2023-02-28 (constrained)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setMonth(1)(datetime)                   // PlainDateTime 2024-01-15T10:30:45
 * setMonth(7)(datetime)                   // PlainDateTime 2024-07-15T10:30:45
 * setMonth(12)(datetime)                  // PlainDateTime 2024-12-15T10:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setMonth(1)(zonedDateTime)              // ZonedDateTime 2024-01-15T10:30:00-05:00[America/New_York]
 * // Note: offset may change due to DST
 *
 * // Invalid month handling
 * setMonth(0)(date)                       // null (month must be >= 1)
 * setMonth(13)(date)                      // null (month must be <= 12)
 * setMonth(-1)(date)                      // null (negative month)
 * setMonth(6.5)(date)                     // null (must be integer)
 *
 * // Null handling
 * setMonth(6)(null)                       // null
 * setMonth(6)(undefined)                  // null
 * setMonth(6)("2024-03-15" as any)       // null (string, not Temporal)
 *
 * // Batch date processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-15"),
 *   Temporal.PlainDate.from("2024-03-15")
 * ]
 * const setToJune = setMonth(6)
 * dates.map(setToJune)
 * // [2024-06-15, 2024-06-15, 2024-06-15]
 *
 * // Partial application examples
 * const setToJanuary = setMonth(1)
 * const setToJune = setMonth(6)
 * const setToDecember = setMonth(12)
 *
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * setToJanuary(someDate)                  // 2024-01-15
 * setToJune(someDate)                     // 2024-06-15
 * setToDecember(someDate)                 // 2024-12-15
 *
 * // Day overflow examples
 * const lastDayJan = Temporal.PlainDate.from("2024-01-31")
 * setMonth(2)(lastDayJan)                 // 2024-02-29 (constrained to Feb max)
 * setMonth(4)(lastDayJan)                 // 2024-04-30 (constrained to Apr max)
 * setMonth(11)(lastDayJan)                // 2024-11-30 (constrained to Nov max)
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function setMonth(month: number) {
	return function setMonthOnDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime) &&
			!(date instanceof Temporal.ZonedDateTime)
		) {
			return null
		}

		// Validate month is in valid range
		if (month < 1 || month > 12 || !Number.isInteger(month)) {
			return null
		}

		try {
			// Use 'constrain' overflow mode to handle day overflow gracefully
			return date.with({ month }, { overflow: "constrain" })
		} catch {
			return null
		}
	}
}
