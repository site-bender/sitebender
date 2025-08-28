/**
 * Gets the number of days in a specific year
 *
 * Returns the total number of days in the year of a Temporal PlainDate,
 * PlainDateTime, PlainYearMonth, or ZonedDateTime. Returns 365 for regular
 * years and 366 for leap years. The result depends on the calendar system
 * of the date. Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get days in year from
 * @returns The number of days in the year (365 or 366), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const regularYear = Temporal.PlainDate.from("2023-06-15")
 * getDaysInYear(regularYear)              // 365 (regular year)
 *
 * const leapYear = Temporal.PlainDate.from("2024-06-15")
 * getDaysInYear(leapYear)                 // 366 (leap year)
 *
 * const millennium = Temporal.PlainDate.from("2000-01-01")
 * getDaysInYear(millennium)               // 366 (divisible by 400)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getDaysInYear(datetime)                 // 366 (leap year)
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-02")
 * getDaysInYear(yearMonth)                // 366 (leap year)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDaysInYear(zonedDateTime)            // 366
 *
 * // Leap year detection
 * const isLeapYear = (year: number): boolean => {
 *   const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   return getDaysInYear(date) === 366
 * }
 *
 * isLeapYear(2024)                        // true
 * isLeapYear(2023)                        // false
 *
 * // Leap year pattern analysis (functional)
 * const getLeapYears = (startYear: number, endYear: number): Array<number> =>
 *   Array.from(
 *     { length: endYear - startYear + 1 },
 *     (_, i) => startYear + i
 *   ).filter(year => {
 *     const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *     return getDaysInYear(date) === 366
 *   })
 *
 * getLeapYears(2020, 2030)                // [2020, 2024, 2028]
 *
 * // Null handling
 * getDaysInYear(null)                     // null
 * getDaysInYear(undefined)                // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @calendarAware Respects the calendar system of the input
 * @leapAware Correctly identifies leap years based on calendar rules
 */
const getDaysInYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (date == null) {
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
		return date.daysInYear
	} catch {
		return null
	}
}

export default getDaysInYear
