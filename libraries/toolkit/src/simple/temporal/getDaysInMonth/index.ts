import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the number of days in a specific month
 *
 * Returns the total number of days in the month of a Temporal PlainDate,
 * PlainDateTime, PlainYearMonth, or ZonedDateTime. Handles leap years
 * automatically and respects the calendar system of the date. Returns
 * null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get days in month from
 * @returns The number of days in the month (28-31), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const january = Temporal.PlainDate.from("2024-01-15")
 * getDaysInMonth(january)                 // 31 (January has 31 days)
 *
 * const february = Temporal.PlainDate.from("2024-02-10")
 * getDaysInMonth(february)                // 29 (leap year February)
 *
 * const februaryNonLeap = Temporal.PlainDate.from("2023-02-10")
 * getDaysInMonth(februaryNonLeap)         // 28 (non-leap year February)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-02-15T10:30:00")
 * getDaysInMonth(datetime)                // 29 (leap year February)
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-02")
 * getDaysInMonth(yearMonth)               // 29 (leap year February)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDaysInMonth(zonedDateTime)           // 31 (March)
 *
 * // Leap year detection through February
 * const isLeapYear = (year: number): boolean => {
 *   const feb = Temporal.PlainYearMonth.from({ year, month: 2 })
 *   return getDaysInMonth(feb) === 29
 * }
 *
 * isLeapYear(2024)                        // true
 * isLeapYear(2023)                        // false
 *
 * // Monthly statistics helper (functional)
 * const getMonthStats = (year: number): Record<number, number> =>
 *   Array.from({ length: 12 }, (_, i) => i + 1).reduce(
 *     (stats, month) => {
 *       const yearMonth = Temporal.PlainYearMonth.from({ year, month })
 *       const days = getDaysInMonth(yearMonth)
 *       return days !== null ? { ...stats, [month]: days } : stats
 *     },
 *     {} as Record<number, number>
 *   )
 *
 * getMonthStats(2024)
 * // { 1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }
 *
 * // Null handling
 * getDaysInMonth(null)                    // null
 * getDaysInMonth(undefined)               // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @calendarAware Respects the calendar system of the input
 * @leapAware Automatically handles leap years
 */
const getDaysInMonth = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.daysInMonth
	} catch {
		return null
	}
}

export default getDaysInMonth
