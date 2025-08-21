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
 * const century = Temporal.PlainDate.from("1900-01-01")
 * getDaysInYear(century)                  // 365 (divisible by 100 but not 400)
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
 * const regularYearMonth = Temporal.PlainYearMonth.from("2025-06")
 * getDaysInYear(regularYearMonth)         // 365
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDaysInYear(zonedDateTime)            // 366
 * 
 * // Leap year detection
 * function isLeapYear(year: number): boolean {
 *   const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   return getDaysInYear(date) === 366
 * }
 * 
 * isLeapYear(2024)                        // true
 * isLeapYear(2023)                        // false
 * isLeapYear(2000)                        // true (divisible by 400)
 * isLeapYear(1900)                        // false (divisible by 100 but not 400)
 * isLeapYear(2100)                        // false
 * 
 * // Leap year pattern analysis
 * function getLeapYears(startYear: number, endYear: number): Array<number> {
 *   const leapYears: Array<number> = []
 *   
 *   for (let year = startYear; year <= endYear; year++) {
 *     const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *     if (getDaysInYear(date) === 366) {
 *       leapYears.push(year)
 *     }
 *   }
 *   
 *   return leapYears
 * }
 * 
 * getLeapYears(2020, 2030)
 * // [2020, 2024, 2028]
 * 
 * // Year progress calculator
 * function yearProgressPercentage(date: Temporal.PlainDate): number {
 *   const daysInYear = getDaysInYear(date)
 *   if (daysInYear === null) return 0
 *   
 *   const dayOfYear = date.dayOfYear
 *   return (dayOfYear / daysInYear) * 100
 * }
 * 
 * const midYear = Temporal.PlainDate.from("2024-07-02")
 * yearProgressPercentage(midYear)         // ~50.27% (184/366)
 * 
 * // Days remaining in year
 * function daysRemainingInYear(date: Temporal.PlainDate): number {
 *   const daysInYear = getDaysInYear(date)
 *   if (daysInYear === null) return 0
 *   
 *   return daysInYear - date.dayOfYear
 * }
 * 
 * const today = Temporal.PlainDate.from("2024-03-15")
 * daysRemainingInYear(today)              // 291 days remaining (366 - 75)
 * 
 * // Annual planning helper
 * function getQuarterlyDays(year: number): Array<number> {
 *   const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   const daysInYear = getDaysInYear(date)
 *   if (daysInYear === null) return []
 *   
 *   // Calculate days in each quarter
 *   const q1 = 31 + (daysInYear === 366 ? 29 : 28) + 31  // Jan-Mar
 *   const q2 = 30 + 31 + 30                               // Apr-Jun
 *   const q3 = 31 + 31 + 30                               // Jul-Sep
 *   const q4 = 31 + 30 + 31                               // Oct-Dec
 *   
 *   return [q1, q2, q3, q4]
 * }
 * 
 * getQuarterlyDays(2024)                  // [91, 91, 92, 92] (leap year)
 * getQuarterlyDays(2023)                  // [90, 91, 92, 92] (regular year)
 * 
 * // Null handling
 * getDaysInYear(null)                     // null
 * getDaysInYear(undefined)                // null
 * getDaysInYear("2024-03-15")            // null (string, not Temporal object)
 * getDaysInYear(new Date())               // null (Date, not Temporal)
 * 
 * // Business days calculator
 * function getBusinessDaysInYear(year: number): number {
 *   const startDate = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   const daysInYear = getDaysInYear(startDate)
 *   if (daysInYear === null) return 0
 *   
 *   let businessDays = 0
 *   let current = startDate
 *   
 *   for (let i = 0; i < daysInYear; i++) {
 *     if (current.dayOfWeek >= 1 && current.dayOfWeek <= 5) {
 *       businessDays++
 *     }
 *     current = current.add({ days: 1 })
 *   }
 *   
 *   return businessDays
 * }
 * 
 * getBusinessDaysInYear(2024)             // ~261 business days
 * 
 * // Fiscal year calculations
 * function getFiscalYearDays(
 *   startMonth: number,
 *   startDay: number,
 *   year: number
 * ): number {
 *   const fiscalStart = Temporal.PlainDate.from({
 *     year,
 *     month: startMonth,
 *     day: startDay
 *   })
 *   
 *   const fiscalEnd = Temporal.PlainDate.from({
 *     year: year + 1,
 *     month: startMonth,
 *     day: startDay - 1
 *   })
 *   
 *   return fiscalStart.until(fiscalEnd).days + 1
 * }
 * 
 * getFiscalYearDays(4, 1, 2024)           // Fiscal year from Apr 1, 2024
 * 
 * // Academic year helper
 * function getAcademicYearDays(year: number): number {
 *   // Assuming academic year: Sep 1 to Aug 31
 *   const start = Temporal.PlainDate.from({ year, month: 9, day: 1 })
 *   const end = Temporal.PlainDate.from({ year: year + 1, month: 8, day: 31 })
 *   
 *   return start.until(end).days + 1
 * }
 * 
 * // Century leap year statistics
 * function getCenturyLeapYearStats(century: number): {
 *   leapYears: number,
 *   regularYears: number,
 *   totalDays: number
 * } {
 *   const startYear = (century - 1) * 100 + 1
 *   const endYear = century * 100
 *   let leapYears = 0
 *   let totalDays = 0
 *   
 *   for (let year = startYear; year <= endYear; year++) {
 *     const date = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *     const days = getDaysInYear(date) ?? 365
 *     totalDays += days
 *     if (days === 366) leapYears++
 *   }
 *   
 *   return {
 *     leapYears,
 *     regularYears: 100 - leapYears,
 *     totalDays
 *   }
 * }
 * 
 * getCenturyLeapYearStats(21)  // 21st century (2001-2100)
 * // { leapYears: 24, regularYears: 76, totalDays: 36524 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input
 * @property Leap-aware - Correctly identifies leap years based on calendar rules
 */
const getDaysInYear = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.PlainYearMonth | Temporal.ZonedDateTime | 
	      null | undefined
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