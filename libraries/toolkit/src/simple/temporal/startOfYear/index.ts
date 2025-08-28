/**
 * Returns the first day of the year for a date
 *
 * Creates a new Temporal date/datetime set to January 1st at midnight
 * (00:00:00.000000000). Preserves the year and timezone information while
 * resetting the month to 1, day to 1, and all time components to zero.
 * This is useful for yearly comparisons, annual reports, and yearly aggregations.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal date to get start of year for
 * @returns Date/datetime at start of year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-07-15")
 * startOfYear(date)                       // PlainDateTime 2024-01-01T00:00:00
 *
 * // With PlainDateTime and ZonedDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-15T14:30:45.123")
 * startOfYear(datetime)                   // PlainDateTime 2024-01-01T00:00:00
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-07-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfYear(zonedDateTime)              // ZonedDateTime 2024-01-01T00:00:00-05:00[America/New_York]
 *
 * // Get annual report period
 * const getAnnualPeriod = (year: number) => {
 *   const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   const start = startOfYear(date)
 *   const end = startOfYear(date.add({ years: 1 }))?.subtract({ nanoseconds: 1 })
 *   return { start, end }
 * }
 *
 * // Aggregate dates by year using functional approach
 * const aggregateByYear = (
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> => {
 *   return dates.reduce((grouped, date) => {
 *     const yearStart = startOfYear(date)
 *     if (!yearStart) return grouped
 *     const year = yearStart.year
 *     const group = grouped.get(year) ?? []
 *     return grouped.set(year, [...group, date])
 *   }, new Map<number, Array<Temporal.PlainDate>>())
 * }
 *
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDate.from("2023-06-15"),
 *   Temporal.PlainDate.from("2024-03-20")
 * ]
 * dates.map(startOfYear)  // [2023-01-01T00:00:00, 2024-01-01T00:00:00]
 *
 * // Invalid inputs return null
 * startOfYear(null)                       // null
 * startOfYear("2024-07-15")              // null (string, not Temporal)
 * ```
 * @pure
 * @immutable
 * @safe
 */
const startOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (date == null) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// Handle PlainDate by converting to PlainDateTime
		if (date instanceof Temporal.PlainDate) {
			const firstOfYear = Temporal.PlainDate.from({
				year: date.year,
				month: 1,
				day: 1,
			})
			return firstOfYear.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// For PlainDateTime and ZonedDateTime, set to January 1st at midnight
		return date.with({
			month: 1,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0,
		})
	} catch {
		return null
	}
}

export default startOfYear
