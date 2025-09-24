/**
 * Returns the last day of the month for a given date
 *
 * Creates a PlainDate representing the last day of the month for the given date.
 * Correctly handles months with different numbers of days and leap years.
 * Useful for month-end calculations, billing cycles, and reporting periods.
 * Works with PlainDate, PlainDateTime, and PlainYearMonth. Returns null for invalid inputs.
 *
 * @param date - The date to get end of month for
 * @returns PlainDate of the last day of the month, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * endOfMonth(Temporal.PlainDate.from("2024-03-15"))     // PlainDate 2024-03-31
 * endOfMonth(Temporal.PlainDate.from("2024-02-10"))     // PlainDate 2024-02-29 (leap)
 * endOfMonth(Temporal.PlainDate.from("2023-02-10"))     // PlainDate 2023-02-28
 *
 * // Different month lengths
 * endOfMonth(Temporal.PlainDate.from("2024-01-01"))     // PlainDate 2024-01-31
 * endOfMonth(Temporal.PlainDate.from("2024-04-15"))     // PlainDate 2024-04-30
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfMonth(datetime)                                   // PlainDate 2024-03-31
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * endOfMonth(yearMonth)                                  // PlainDate 2024-03-31
 *
 * // Edge cases
 * endOfMonth(null)                                       // null
 * endOfMonth(undefined)                                  // null
 *
 * // Days remaining in month
 * const getDaysRemaining = (date: Temporal.PlainDate): number => {
 *   const lastDay = endOfMonth(date)
 *   return lastDay ? date.until(lastDay).days + 1 : 0
 * }
 *
 * // Quarter end dates
 * const getQuarterEnd = (year: number, quarter: 1 | 2 | 3 | 4) => {
 *   const endMonths = { 1: 3, 2: 6, 3: 9, 4: 12 }
 *   return endOfMonth(Temporal.PlainYearMonth.from({
 *     year,
 *     month: endMonths[quarter]
 *   }))
 * }
 * ```
 * @pure
 * @immutable
 * @safe
 */
import isNullish from "../../validation/isNullish/index.ts"

const endOfMonth = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): Temporal.PlainDate | null => {
	if (isNullish(date)) {
		return null
	}

	try {
		// Get the year and month
		let year: number
		let month: number

		if (date instanceof Temporal.PlainDateTime) {
			year = date.year
			month = date.month
		} else if (date instanceof Temporal.PlainDate) {
			year = date.year
			month = date.month
		} else if (date instanceof Temporal.PlainYearMonth) {
			year = date.year
			month = date.month
		} else {
			return null
		}

		// Create a PlainDate for this year and month
		const firstOfMonth = Temporal.PlainDate.from({ year, month, day: 1 })

		// Get the last day of the month using daysInMonth
		const lastDay = firstOfMonth.daysInMonth

		// Return the last day of the month
		return Temporal.PlainDate.from({ year, month, day: lastDay })
	} catch {
		return null
	}
}

export default endOfMonth
