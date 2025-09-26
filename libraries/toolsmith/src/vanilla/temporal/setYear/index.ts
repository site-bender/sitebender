/**
 * Returns a new date with the year set to the specified value
 *
 * Creates a new Temporal date or datetime with the year changed to the specified
 * value. Handles leap year transitions gracefully - if setting a non-leap year
 * on February 29, it will be constrained to February 28. This is a curried
 * function for easy composition. Returns null for invalid inputs to support safe
 * error handling.
 *
 * @curried
 * @param year - The year to set
 * @param date - The Temporal date to modify
 * @returns New date with updated year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setYear(2025)(date)                     // PlainDate 2025-03-15
 * setYear(2000)(date)                     // PlainDate 2000-03-15
 * setYear(2030)(date)                     // PlainDate 2030-03-15
 * setYear(1999)(date)                     // PlainDate 1999-03-15
 *
 * // Leap year handling (February 29)
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * setYear(2024)(leapDay)                  // PlainDate 2024-02-29 (leap year)
 * setYear(2023)(leapDay)                  // PlainDate 2023-02-28 (constrained)
 * setYear(2025)(leapDay)                  // PlainDate 2025-02-28 (constrained)
 * setYear(2028)(leapDay)                  // PlainDate 2028-02-29 (leap year)
 *
 * // Century leap year rules
 * setYear(2000)(leapDay)                  // PlainDate 2000-02-29 (divisible by 400)
 * setYear(1900)(leapDay)                  // PlainDate 1900-02-28 (not divisible by 400)
 * setYear(2100)(leapDay)                  // PlainDate 2100-02-28 (not divisible by 400)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setYear(2025)(datetime)                 // PlainDateTime 2025-03-15T10:30:45
 * setYear(2020)(datetime)                 // PlainDateTime 2020-03-15T10:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setYear(2025)(zonedDateTime)            // ZonedDateTime 2025-03-15T10:30:00-04:00[America/New_York]
 *
 * // Historical dates
 * const historicalDate = Temporal.PlainDate.from("2024-07-04")
 * setYear(1776)(historicalDate)           // PlainDate 1776-07-04
 * setYear(1492)(historicalDate)           // PlainDate 1492-07-04
 *
 * // Future dates
 * const futureDate = Temporal.PlainDate.from("2024-01-01")
 * setYear(2100)(futureDate)               // PlainDate 2100-01-01
 * setYear(3000)(futureDate)               // PlainDate 3000-01-01
 *
 * // Invalid year handling
 * setYear(-1)(date)                       // PlainDate -0001-03-15 (1 BCE)
 * setYear(0)(date)                        // PlainDate 0000-03-15 (valid in Temporal)
 * setYear(275760)(date)                   // null (exceeds Temporal max year)
 * setYear(-271821)(date)                  // null (exceeds Temporal min year)
 * setYear(2024.5)(date)                   // null (must be integer)
 *
 * // Null handling
 * setYear(2025)(null)                     // null
 * setYear(2025)(undefined)                // null
 * setYear(2025)("2024-03-15" as any)     // null (string, not Temporal)
 *
 * // Batch year processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-06-30"),
 *   Temporal.PlainDate.from("2024-12-25")
 * ]
 * const setTo2025 = setYear(2025)
 * dates.map(setTo2025)
 * // [2025-01-15, 2025-06-30, 2025-12-25]
 *
 * // Partial application examples
 * const setTo2025 = setYear(2025)
 * const setTo2000 = setYear(2000)
 * const setTo1776 = setYear(1776)
 *
 * const someDate = Temporal.PlainDate.from("2024-07-04")
 * setTo2025(someDate)                     // PlainDate 2025-07-04
 * setTo2000(someDate)                     // PlainDate 2000-07-04
 * setTo1776(someDate)                     // PlainDate 1776-07-04
 *
 * // Leap day handling
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * setYear(2023)(leapDay)                  // PlainDate 2023-02-28 (constrained)
 * setYear(2028)(leapDay)                  // PlainDate 2028-02-29 (leap year)
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function setYear(year: number) {
	return function setYearOnDate(
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

		// Validate year is an integer
		if (!Number.isInteger(year)) {
			return null
		}

		// Temporal year limits
		const MIN_YEAR = -271821
		const MAX_YEAR = 275760

		if (year < MIN_YEAR || year > MAX_YEAR) {
			return null
		}

		try {
			// Use 'constrain' overflow mode to handle Feb 29 in non-leap years
			return date.with({ year }, { overflow: "constrain" })
		} catch {
			return null
		}
	}
}
