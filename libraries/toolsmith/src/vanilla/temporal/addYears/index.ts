/**
 * Adds years to a Temporal PlainDate, PlainDateTime, or PlainYearMonth
 *
 * Immutably adds the specified number of years to a date or datetime.
 * Returns a new Temporal object with the years added. Negative values
 * subtract years. Handles leap year adjustments automatically - if the
 * target date doesn't exist (e.g., Feb 29 in non-leap year), adjusts
 * to the last valid day of the month. Returns null for invalid inputs.
 *
 * @param years - Number of years to add (negative to subtract)
 * @param date - The PlainDate, PlainDateTime, or PlainYearMonth to add years to
 * @returns New date/datetime with years added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const date = Temporal.PlainDate.from("2024-03-15")
 * addYears(1)(date)                       // PlainDate 2025-03-15
 * addYears(-2)(date)                      // PlainDate 2022-03-15
 *
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * addYears(1)(leapDay)                    // PlainDate 2025-02-28 (adjusts)
 * addYears(4)(leapDay)                    // PlainDate 2028-02-29 (leap year)
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addYears(2)(datetime)                   // PlainDateTime 2026-03-15T10:30:00
 *
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * addYears(1)(yearMonth)                  // PlainYearMonth 2025-03
 *
 * // Partial application
 * const nextYear = addYears(1)
 * const addDecade = addYears(10)
 * nextYear(date)                          // Same date next year
 *
 * // Null handling
 * addYears(5)(null)                       // null
 * addYears(5)(undefined)                  // null
 * ```
 * @pure
 * @immutable
 * @safe - Returns null for invalid inputs
 * @curried
 */
import isNullish from "../../validation/isNullish/index.ts"

export default function addYears(years: number) {
	return function addYearsToDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainYearMonth
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime) &&
			!(date instanceof Temporal.PlainYearMonth)
		) {
			return null
		}

		try {
			return date.add({ years })
		} catch {
			return null
		}
	}
}
