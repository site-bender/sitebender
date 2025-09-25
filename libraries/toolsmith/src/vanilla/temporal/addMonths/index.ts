import isNullish from "../../validation/isNullish/index.ts"

/**
 * Adds months to a Temporal PlainDate, PlainDateTime, or PlainYearMonth
 *
 * Immutably adds the specified number of months to a date or datetime.
 * Returns a new Temporal object with the months added. Negative values
 * subtract months. Handles year boundaries and day overflow automatically.
 * When adding months would create an invalid date (e.g., Jan 31 + 1 month),
 * it adjusts to the last valid day of the target month (Feb 28/29).
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (months) => (date) => result
 * @param months - Number of months to add (negative to subtract)
 * @param date - The PlainDate, PlainDateTime, or PlainYearMonth to add months to
 * @returns New date/datetime with months added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * addMonths(1)(date)          // PlainDate 2024-04-15
 * addMonths(-2)(date)         // PlainDate 2024-01-15
 * addMonths(12)(date)         // PlainDate 2025-03-15
 *
 * // Day overflow handling (end of month)
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * addMonths(1)(jan31)         // PlainDate 2024-02-29 (leap year)
 * addMonths(3)(jan31)         // PlainDate 2024-04-30 (April has 30 days)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addMonths(6)(datetime)      // PlainDateTime 2024-09-15T10:30:00
 *
 * // Partial application
 * const addQuarter = addMonths(3)
 * const addYear = addMonths(12)
 * const today = Temporal.Now.plainDateISO()
 * addQuarter(today)           // 3 months from now
 *
 * // Billing cycle calculation
 * const getNextBilling = (date: Temporal.PlainDate) =>
 *   addMonths(1)(date)
 *
 * // Null handling
 * addMonths(3)(null)          // null
 * addMonths(3)(undefined)     // null
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
export default function addMonths(months: number) {
	return function addMonthsToDate(
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
			return date.add({ months })
		} catch {
			return null
		}
	}
}
