/**
 * Returns the last day of the year for a given date
 *
 * Creates a PlainDate representing December 31st of the year for the given date.
 * Useful for annual reports, fiscal year calculations, and year-end processing.
 * Works with PlainDate, PlainDateTime, and PlainYearMonth. Returns null for invalid inputs.
 *
 * @param date - The date to get end of year for
 * @returns PlainDate of December 31st of that year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * endOfYear(Temporal.PlainDate.from("2024-03-15"))      // PlainDate 2024-12-31
 * endOfYear(Temporal.PlainDate.from("2024-01-01"))      // PlainDate 2024-12-31
 * endOfYear(Temporal.PlainDate.from("2024-12-15"))      // PlainDate 2024-12-31
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-06-15T10:30:00")
 * endOfYear(datetime)                                    // PlainDate 2024-12-31
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-06")
 * endOfYear(yearMonth)                                   // PlainDate 2024-12-31
 *
 * // Edge cases
 * endOfYear(null)                                        // null
 * endOfYear(undefined)                                   // null
 *
 * // Days remaining in year
 * const getDaysRemaining = (date: Temporal.PlainDate): number => {
 *   const lastDay = endOfYear(date)
 *   return lastDay ? date.until(lastDay).days + 1 : 0
 * }
 *
 * // Fiscal year end
 * const getFiscalYearEnd = (
 *   date: Temporal.PlainDate,
 *   fiscalEndMonth: number = 12
 * ): Temporal.PlainDate | null => {
 *   if (fiscalEndMonth === 12) return endOfYear(date)
 *   const year = date.month <= fiscalEndMonth ? date.year : date.year + 1
 *   const yearMonth = Temporal.PlainYearMonth.from({ year, month: fiscalEndMonth })
 *   return yearMonth.toPlainDate({ day: yearMonth.daysInMonth })
 * }
 *
 * // Quarter ends
 * const getQuartersInYear = (year: number) => [
 *   { quarter: 1, end: Temporal.PlainDate.from({ year, month: 3, day: 31 }) },
 *   { quarter: 2, end: Temporal.PlainDate.from({ year, month: 6, day: 30 }) },
 *   { quarter: 3, end: Temporal.PlainDate.from({ year, month: 9, day: 30 }) },
 *   { quarter: 4, end: Temporal.PlainDate.from({ year, month: 12, day: 31 }) }
 * ]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const endOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): Temporal.PlainDate | null => {
	if (date == null) {
		return null
	}

	try {
		// Get the year
		let year: number

		if (date instanceof Temporal.PlainDateTime) {
			year = date.year
		} else if (date instanceof Temporal.PlainDate) {
			year = date.year
		} else if (date instanceof Temporal.PlainYearMonth) {
			year = date.year
		} else {
			return null
		}

		// Return December 31st of that year
		return Temporal.PlainDate.from({ year, month: 12, day: 31 })
	} catch {
		return null
	}
}

export default endOfYear
