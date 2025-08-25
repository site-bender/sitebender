/**
 * Gets the quarter (1-4) from a Temporal date or datetime
 *
 * Determines which quarter of the year a date falls into. Returns 1 for Q1
 * (January-March), 2 for Q2 (April-June), 3 for Q3 (July-September), and 4
 * for Q4 (October-December). This is based on the calendar month, so the
 * exact quarter boundaries depend on the calendar system. Returns null for
 * invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get quarter from
 * @returns The quarter number (1-4), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const q1Date = Temporal.PlainDate.from("2024-02-15")
 * getQuarter(q1Date)                      // 1 (February is in Q1)
 *
 * const q2Date = Temporal.PlainDate.from("2024-05-20")
 * getQuarter(q2Date)                      // 2 (May is in Q2)
 *
 * const q3Date = Temporal.PlainDate.from("2024-08-10")
 * getQuarter(q3Date)                      // 3 (August is in Q3)
 *
 * const q4Date = Temporal.PlainDate.from("2024-11-30")
 * getQuarter(q4Date)                      // 4 (November is in Q4)
 *
 * // Quarter boundaries
 * const q1Start = Temporal.PlainDate.from("2024-01-01")
 * getQuarter(q1Start)                     // 1 (January 1)
 *
 * const q1End = Temporal.PlainDate.from("2024-03-31")
 * getQuarter(q1End)                       // 1 (March 31)
 *
 * const q2Start = Temporal.PlainDate.from("2024-04-01")
 * getQuarter(q2Start)                     // 2 (April 1)
 *
 * const q4End = Temporal.PlainDate.from("2024-12-31")
 * getQuarter(q4End)                       // 4 (December 31)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-15T10:30:00")
 * getQuarter(datetime)                    // 3 (July is in Q3)
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-10")
 * getQuarter(yearMonth)                   // 4 (October is in Q4)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-04-15T10:30:00-05:00[America/New_York]"
 * )
 * getQuarter(zonedDateTime)               // 2 (April is in Q2)
 *
 * // Quarter name helper
 * function getQuarterName(date: Temporal.PlainDate): string {
 *   const quarter = getQuarter(date)
 *   if (quarter === null) return "Unknown"
 *
 *   return `Q${quarter}`
 * }
 *
 * getQuarterName(Temporal.PlainDate.from("2024-03-15"))  // "Q1"
 * getQuarterName(Temporal.PlainDate.from("2024-09-30"))  // "Q3"
 *
 * // Full quarter description
 * function getQuarterDescription(date: Temporal.PlainDate): string {
 *   const quarter = getQuarter(date)
 *   if (quarter === null) return "Unknown"
 *
 *   const descriptions = [
 *     "First Quarter (Jan-Mar)",
 *     "Second Quarter (Apr-Jun)",
 *     "Third Quarter (Jul-Sep)",
 *     "Fourth Quarter (Oct-Dec)"
 *   ]
 *
 *   return descriptions[quarter - 1]
 * }
 *
 * getQuarterDescription(Temporal.PlainDate.from("2024-02-15"))
 * // "First Quarter (Jan-Mar)"
 *
 * // Quarter progress calculation
 * function getQuarterProgress(date: Temporal.PlainDate): number {
 *   const quarter = getQuarter(date)
 *   if (quarter === null) return 0
 *
 *   const month = date.month
 *   const quarterStartMonth = (quarter - 1) * 3 + 1
 *   const monthInQuarter = month - quarterStartMonth
 *   const dayProgress = date.day / date.daysInMonth
 *
 *   // Progress through the quarter (0-100%)
 *   return ((monthInQuarter + dayProgress) / 3) * 100
 * }
 *
 * getQuarterProgress(Temporal.PlainDate.from("2024-01-01"))  // ~0% (start of Q1)
 * getQuarterProgress(Temporal.PlainDate.from("2024-02-15"))  // ~50% (middle of Q1)
 * getQuarterProgress(Temporal.PlainDate.from("2024-03-31"))  // ~100% (end of Q1)
 *
 * // Days remaining in quarter
 * function daysRemainingInQuarter(date: Temporal.PlainDate): number {
 *   const quarter = getQuarter(date)
 *   if (quarter === null) return 0
 *
 *   const quarterEndMonth = quarter * 3
 *   const quarterEnd = date.with({
 *     month: quarterEndMonth,
 *     day: date.with({ month: quarterEndMonth }).daysInMonth
 *   })
 *
 *   return date.until(quarterEnd).days
 * }
 *
 * daysRemainingInQuarter(Temporal.PlainDate.from("2024-03-15"))  // 16 days
 * daysRemainingInQuarter(Temporal.PlainDate.from("2024-06-01"))  // 29 days
 *
 * // Fiscal quarter calculation (custom fiscal year start)
 * function getFiscalQuarter(
 *   date: Temporal.PlainDate,
 *   fiscalYearStartMonth: number = 4  // April by default
 * ): number {
 *   const month = date.month
 *
 *   // Adjust month relative to fiscal year start
 *   const fiscalMonth = month >= fiscalYearStartMonth ?
 *     month - fiscalYearStartMonth + 1 :
 *     month + 13 - fiscalYearStartMonth
 *
 *   return Math.ceil(fiscalMonth / 3)
 * }
 *
 * // Standard calendar quarter
 * getFiscalQuarter(Temporal.PlainDate.from("2024-05-15"), 1)  // 2 (Q2 in calendar year)
 *
 * // Fiscal year starting April
 * getFiscalQuarter(Temporal.PlainDate.from("2024-05-15"), 4)  // 1 (Q1 in fiscal year)
 * getFiscalQuarter(Temporal.PlainDate.from("2024-01-15"), 4)  // 4 (Q4 in fiscal year)
 *
 * // Null handling
 * getQuarter(null)                        // null
 * getQuarter(undefined)                   // null
 * getQuarter("2024-03-15")               // null (string, not Temporal object)
 * getQuarter(new Date())                  // null (Date, not Temporal)
 *
 * // Quarter comparison
 * function isSameQuarter(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   return getQuarter(date1) === getQuarter(date2) &&
 *          date1.year === date2.year
 * }
 *
 * const d1 = Temporal.PlainDate.from("2024-01-15")
 * const d2 = Temporal.PlainDate.from("2024-03-20")
 * const d3 = Temporal.PlainDate.from("2024-04-01")
 * isSameQuarter(d1, d2)                   // true (both Q1 2024)
 * isSameQuarter(d1, d3)                   // false (Q1 vs Q2)
 *
 * // Quarter-over-quarter growth calculation
 * function getQuarterOverQuarterGrowth(
 *   currentValue: number,
 *   previousQuarterValue: number
 * ): number {
 *   if (previousQuarterValue === 0) return 0
 *   return ((currentValue - previousQuarterValue) / previousQuarterValue) * 100
 * }
 *
 * // Year-over-year quarter comparison
 * function getYearOverYearQuarterDates(
 *   date: Temporal.PlainDate
 * ): { current: Temporal.PlainDate, lastYear: Temporal.PlainDate } {
 *   const lastYear = date.subtract({ years: 1 })
 *   return { current: date, lastYear }
 * }
 *
 * // Quarterly reporting deadlines
 * function getQuarterlyDeadline(
 *   quarter: number,
 *   year: number,
 *   daysAfterQuarterEnd: number = 45
 * ): Temporal.PlainDate | null {
 *   if (quarter < 1 || quarter > 4) return null
 *
 *   const quarterEndMonth = quarter * 3
 *   const quarterEnd = Temporal.PlainDate.from({
 *     year,
 *     month: quarterEndMonth,
 *     day: 1
 *   }).with({
 *     day: Temporal.PlainDate.from({
 *       year,
 *       month: quarterEndMonth,
 *       day: 1
 *     }).daysInMonth
 *   })
 *
 *   return quarterEnd.add({ days: daysAfterQuarterEnd })
 * }
 *
 * getQuarterlyDeadline(1, 2024, 45)       // May 15, 2024 (45 days after Q1)
 *
 * // Quarterly metrics aggregation
 * function aggregateByQuarter(
 *   data: Array<{ date: Temporal.PlainDate, value: number }>
 * ): Map<string, number> {
 *   const quarterly = new Map<string, number>()
 *
 *   for (const item of data) {
 *     const quarter = getQuarter(item.date)
 *     if (quarter !== null) {
 *       const key = `${item.date.year}-Q${quarter}`
 *       quarterly.set(key, (quarterly.get(key) ?? 0) + item.value)
 *     }
 *   }
 *
 *   return quarterly
 * }
 *
 * // Academic quarters (some schools use quarters instead of semesters)
 * function getAcademicQuarter(
 *   date: Temporal.PlainDate,
 *   academicYearStart: number = 9  // September
 * ): string {
 *   const month = date.month
 *   const quarter = getQuarter(date)
 *   if (quarter === null) return "Unknown"
 *
 *   // Adjust for academic year
 *   if (month >= academicYearStart) {
 *     return `Fall ${date.year}`
 *   } else if (month >= 6) {
 *     return `Summer ${date.year}`
 *   } else if (month >= 3) {
 *     return `Spring ${date.year}`
 *   } else {
 *     return `Winter ${date.year}`
 *   }
 * }
 *
 * getAcademicQuarter(Temporal.PlainDate.from("2024-09-15"))  // "Fall 2024"
 * getAcademicQuarter(Temporal.PlainDate.from("2024-01-15"))  // "Winter 2024"
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input
 * @property Standard - Uses calendar quarters (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec)
 */
const getQuarter = (
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
		const month = date.month
		return Math.ceil(month / 3)
	} catch {
		return null
	}
}

export default getQuarter
