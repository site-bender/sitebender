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
 * const lastDay = Temporal.PlainDate.from("2024-12-31")
 * startOfYear(lastDay)                    // PlainDateTime 2024-01-01T00:00:00
 *
 * const firstDay = Temporal.PlainDate.from("2024-01-01")
 * startOfYear(firstDay)                   // PlainDateTime 2024-01-01T00:00:00
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-15T14:30:45.123")
 * startOfYear(datetime)                   // PlainDateTime 2024-01-01T00:00:00
 *
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-07-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfYear(zonedDateTime)              // ZonedDateTime 2024-01-01T00:00:00-05:00[America/New_York]
 * // Note: January 1st has different offset due to no DST
 *
 * // Leap year
 * const leapYear = Temporal.PlainDate.from("2024-02-29")
 * startOfYear(leapYear)                   // PlainDateTime 2024-01-01T00:00:00
 *
 * // Non-leap year
 * const regularYear = Temporal.PlainDate.from("2023-06-15")
 * startOfYear(regularYear)                // PlainDateTime 2023-01-01T00:00:00
 *
 * // Different years
 * const pastDate = Temporal.PlainDate.from("2020-06-15")
 * startOfYear(pastDate)                   // PlainDateTime 2020-01-01T00:00:00
 *
 * const futureDate = Temporal.PlainDate.from("2030-06-15")
 * startOfYear(futureDate)                 // PlainDateTime 2030-01-01T00:00:00
 *
 * // Annual report boundaries
 * function getAnnualReportPeriod(
 *   year: number
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   const start = startOfYear(date)
 *   const nextYear = date.add({ years: 1 })
 *   const end = startOfYear(nextYear)?.subtract({ nanoseconds: 1 })
 *
 *   return { start, end }
 * }
 *
 * getAnnualReportPeriod(2024)
 * // { start: 2024-01-01T00:00:00, end: 2024-12-31T23:59:59.999999999 }
 *
 * // Same year comparison
 * function isSameYear(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   const year1 = startOfYear(date1)
 *   const year2 = startOfYear(date2)
 *
 *   if (!year1 || !year2) return false
 *   return year1.equals(year2)
 * }
 *
 * const spring = Temporal.PlainDate.from("2024-03-15")
 * const fall = Temporal.PlainDate.from("2024-10-15")
 * const nextYear = Temporal.PlainDate.from("2025-03-15")
 *
 * isSameYear(spring, fall)                // true
 * isSameYear(spring, nextYear)            // false
 *
 * // Yearly aggregation
 * function aggregateByYear(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<number, Array<Temporal.PlainDate>>()
 *
 *   for (const date of dates) {
 *     const yearStart = startOfYear(date)
 *     if (!yearStart) continue
 *
 *     const year = yearStart.year
 *     const group = grouped.get(year) ?? []
 *     group.push(date)
 *     grouped.set(year, group)
 *   }
 *
 *   return grouped
 * }
 *
 * const transactions = [
 *   Temporal.PlainDate.from("2023-12-15"),
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-07-15")
 * ]
 * aggregateByYear(transactions)
 * // Map { 2023 => [Dec 15], 2024 => [Mar 15, Jul 15] }
 *
 * // Days since year start
 * function getDayOfYear(
 *   date: Temporal.PlainDate
 * ): number {
 *   const yearStart = startOfYear(date)
 *   if (!yearStart) return 0
 *
 *   const duration = yearStart.until(date)
 *   return Math.floor(duration.total({ unit: 'days' })) + 1
 * }
 *
 * getDayOfYear(Temporal.PlainDate.from("2024-01-01"))  // 1
 * getDayOfYear(Temporal.PlainDate.from("2024-02-29"))  // 60 (leap year)
 * getDayOfYear(Temporal.PlainDate.from("2024-12-31"))  // 366
 *
 * // Fiscal year calculator (April 1st start)
 * function getFiscalYearStart(
 *   date: Temporal.PlainDate,
 *   fiscalYearStartMonth: number = 4  // April
 * ): Temporal.PlainDateTime | null {
 *   const year = date.month >= fiscalYearStartMonth
 *     ? date.year
 *     : date.year - 1
 *
 *   const fiscalStart = Temporal.PlainDate.from({
 *     year,
 *     month: fiscalYearStartMonth,
 *     day: 1
 *   })
 *
 *   return fiscalStart.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 * }
 *
 * const beforeFiscal = Temporal.PlainDate.from("2024-02-15")
 * getFiscalYearStart(beforeFiscal, 4)     // 2023-04-01T00:00:00
 *
 * const afterFiscal = Temporal.PlainDate.from("2024-06-15")
 * getFiscalYearStart(afterFiscal, 4)      // 2024-04-01T00:00:00
 *
 * // Tax year boundaries
 * function getTaxYearBoundaries(
 *   year: number,
 *   country: "US" | "UK" | "AU"
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const taxYearStarts = {
 *     US: { month: 1, day: 1 },   // Calendar year
 *     UK: { month: 4, day: 6 },   // April 6th
 *     AU: { month: 7, day: 1 }    // July 1st
 *   }
 *
 *   const config = taxYearStarts[country]
 *   const start = Temporal.PlainDate.from({ year, ...config })
 *     .toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *
 *   const end = Temporal.PlainDate.from({ year: year + 1, ...config })
 *     .subtract({ days: 1 })
 *     .toPlainDateTime(Temporal.PlainTime.from("23:59:59.999999999"))
 *
 *   return { start, end }
 * }
 *
 * getTaxYearBoundaries(2024, "US")
 * // { start: 2024-01-01T00:00:00, end: 2024-12-31T23:59:59.999999999 }
 *
 * getTaxYearBoundaries(2024, "UK")
 * // { start: 2024-04-06T00:00:00, end: 2025-04-05T23:59:59.999999999 }
 *
 * // Null handling
 * startOfYear(null)                       // null
 * startOfYear(undefined)                  // null
 * startOfYear("2024-07-15")              // null (string, not Temporal)
 *
 * // Year progress calculator
 * function getYearProgress(
 *   date: Temporal.PlainDate = Temporal.Now.plainDateISO()
 * ): { days: number; percentage: number; remaining: number } {
 *   const yearStart = startOfYear(date)
 *   const nextYearStart = startOfYear(date.add({ years: 1 }))
 *
 *   if (!yearStart || !nextYearStart) {
 *     return { days: 0, percentage: 0, remaining: 0 }
 *   }
 *
 *   const totalDays = yearStart.until(nextYearStart).total({ unit: 'days' })
 *   const elapsedDays = yearStart.until(date).total({ unit: 'days' })
 *   const percentage = (elapsedDays / totalDays) * 100
 *   const remaining = totalDays - elapsedDays
 *
 *   return {
 *     days: Math.floor(elapsedDays),
 *     percentage: Math.round(percentage * 10) / 10,
 *     remaining: Math.ceil(remaining)
 *   }
 * }
 *
 * const midYear = Temporal.PlainDate.from("2024-07-01")
 * getYearProgress(midYear)
 * // { days: 182, percentage: 49.7, remaining: 184 }
 *
 * // Annual subscription renewal
 * function getNextRenewalDate(
 *   subscriptionDate: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const thisYearRenewal = subscriptionDate.with({ year: today.year })
 *
 *   if (thisYearRenewal.compare(today) > 0) {
 *     // Renewal date hasn't passed this year
 *     return startOfYear(thisYearRenewal)
 *   } else {
 *     // Renewal date has passed, next year
 *     return startOfYear(thisYearRenewal.add({ years: 1 }))
 *   }
 * }
 *
 * // Archive path generator
 * function getYearlyArchivePath(
 *   date: Temporal.PlainDate
 * ): string {
 *   const yearStart = startOfYear(date)
 *   if (!yearStart) return "invalid"
 *
 *   return `archives/${yearStart.year}`
 * }
 *
 * const archiveDate = Temporal.PlainDate.from("2024-07-15")
 * getYearlyArchivePath(archiveDate)       // "archives/2024"
 *
 * // Annual statistics reset
 * function shouldResetAnnualStats(
 *   lastReset: Temporal.PlainDateTime,
 *   currentTime: Temporal.PlainDateTime
 * ): boolean {
 *   const lastYear = startOfYear(lastReset)
 *   const currentYear = startOfYear(currentTime)
 *
 *   if (!lastYear || !currentYear) return false
 *   return !lastYear.equals(currentYear)
 * }
 *
 * const lastReset = Temporal.PlainDateTime.from("2023-12-31T23:59:00")
 * const current = Temporal.PlainDateTime.from("2024-01-01T00:01:00")
 * shouldResetAnnualStats(lastReset, current) // true
 *
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDate.from("2023-06-15"),
 *   Temporal.PlainDate.from("2024-03-20"),
 *   Temporal.PlainDate.from("2024-12-31")
 * ]
 *
 * dates.map(startOfYear)
 * // [2023-01-01T00:00:00, 2024-01-01T00:00:00, 2024-01-01T00:00:00]
 *
 * // Academic year start (September)
 * function getAcademicYearStart(
 *   date: Temporal.PlainDate,
 *   academicStartMonth: number = 9  // September
 * ): Temporal.PlainDateTime | null {
 *   const year = date.month >= academicStartMonth
 *     ? date.year
 *     : date.year - 1
 *
 *   const academicStart = Temporal.PlainDate.from({
 *     year,
 *     month: academicStartMonth,
 *     day: 1
 *   })
 *
 *   return academicStart.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 * }
 *
 * const fallSemester = Temporal.PlainDate.from("2024-10-15")
 * getAcademicYearStart(fallSemester, 9)   // 2024-09-01T00:00:00
 *
 * const springSemester = Temporal.PlainDate.from("2024-02-15")
 * getAcademicYearStart(springSemester, 9) // 2023-09-01T00:00:00
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Preserves - Maintains year and timezone information
 * @property Resets - Sets month to 1, day to 1, and all time components to zero
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
