/**
 * Returns a new date with the day set to the specified value
 *
 * Creates a new Temporal date or datetime with the day of month changed to
 * the specified value. The day must be valid for the given month (1-31
 * depending on month). Handles overflow according to Temporal's 'constrain'
 * mode by default, clamping to the last valid day of the month if needed.
 * This is a curried function for easy composition. Returns null for invalid
 * inputs to support safe error handling.
 *
 * @curried
 * @param day - The day of month to set (1-31)
 * @param date - The Temporal date to modify
 * @returns New date with updated day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setDay(1)(date)                         // PlainDate 2024-03-01
 * setDay(20)(date)                        // PlainDate 2024-03-20
 * setDay(31)(date)                        // PlainDate 2024-03-31
 *
 * // Overflow handling (February)
 * const february = Temporal.PlainDate.from("2024-02-15")
 * setDay(29)(february)                    // PlainDate 2024-02-29 (leap year)
 * setDay(30)(february)                    // PlainDate 2024-02-29 (constrained)
 * setDay(31)(february)                    // PlainDate 2024-02-29 (constrained)
 *
 * const nonLeapFeb = Temporal.PlainDate.from("2023-02-15")
 * setDay(29)(nonLeapFeb)                  // PlainDate 2023-02-28 (constrained)
 *
 * // April (30 days)
 * const april = Temporal.PlainDate.from("2024-04-15")
 * setDay(30)(april)                       // PlainDate 2024-04-30
 * setDay(31)(april)                       // PlainDate 2024-04-30 (constrained)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setDay(1)(datetime)                     // PlainDateTime 2024-03-01T10:30:45
 * setDay(25)(datetime)                    // PlainDateTime 2024-03-25T10:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setDay(1)(zonedDateTime)                // ZonedDateTime 2024-03-01T10:30:00-05:00[America/New_York]
 * // Note: offset may change due to DST transitions
 *
 * // First and last day of month helpers
 * const setToFirstDay = setDay(1)
 * const setToLastDay = (date: Temporal.PlainDate) => {
 *   const daysInMonth = date.daysInMonth
 *   return setDay(daysInMonth)(date)
 * }
 *
 * const midMonth = Temporal.PlainDate.from("2024-03-15")
 * setToFirstDay(midMonth)                 // PlainDate 2024-03-01
 * setToLastDay(midMonth)                  // PlainDate 2024-03-31
 *
 * // Invalid day handling
 * setDay(0)(date)                         // null (day must be >= 1)
 * setDay(32)(date)                        // PlainDate 2024-03-31 (constrained)
 * setDay(-1)(date)                        // null (negative day)
 *
 * // Null handling
 * setDay(15)(null)                        // null
 * setDay(15)(undefined)                   // null
 * setDay(15)("2024-03-15" as any)        // null (string, not Temporal)
 *
 * // Batch date processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-10"),
 *   Temporal.PlainDate.from("2024-02-10"),
 *   Temporal.PlainDate.from("2024-03-10")
 * ]
 * const setTo15th = setDay(15)
 * dates.map(setTo15th)
 * // [2024-01-15, 2024-02-15, 2024-03-15]
 *
 * // Partial application helpers
 * const setToFirstDay = setDay(1)
 * const midMonth = Temporal.PlainDate.from("2024-03-15")
 * setToFirstDay(midMonth)                 // PlainDate 2024-03-01
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import isNullish from "../../../validation/isNullish"

const setDay = (day: number) =>
(
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
	| null => {
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

	// Validate day is positive
	if (day < 1 || !Number.isInteger(day)) {
		return null
	}

	try {
		// Use 'constrain' overflow mode to handle invalid days gracefully
		return date.with({ day }, { overflow: "constrain" })
	} catch {
		return null
	}
}

export default setDay
