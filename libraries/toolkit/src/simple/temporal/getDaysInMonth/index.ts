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
 * const april = Temporal.PlainDate.from("2024-04-20")
 * getDaysInMonth(april)                   // 30 (April has 30 days)
 * 
 * // All months throughout the year
 * const months2024 = [
 *   Temporal.PlainDate.from("2024-01-01"), // 31
 *   Temporal.PlainDate.from("2024-02-01"), // 29 (leap year)
 *   Temporal.PlainDate.from("2024-03-01"), // 31
 *   Temporal.PlainDate.from("2024-04-01"), // 30
 *   Temporal.PlainDate.from("2024-05-01"), // 31
 *   Temporal.PlainDate.from("2024-06-01"), // 30
 *   Temporal.PlainDate.from("2024-07-01"), // 31
 *   Temporal.PlainDate.from("2024-08-01"), // 31
 *   Temporal.PlainDate.from("2024-09-01"), // 30
 *   Temporal.PlainDate.from("2024-10-01"), // 31
 *   Temporal.PlainDate.from("2024-11-01"), // 30
 *   Temporal.PlainDate.from("2024-12-01"), // 31
 * ].map(getDaysInMonth)
 * // [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-02-15T10:30:00")
 * getDaysInMonth(datetime)                // 29 (leap year February)
 * 
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-02")
 * getDaysInMonth(yearMonth)               // 29 (leap year February)
 * 
 * const september = Temporal.PlainYearMonth.from("2024-09")
 * getDaysInMonth(september)               // 30
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDaysInMonth(zonedDateTime)           // 31 (March)
 * 
 * // Leap year detection through February
 * function isLeapYear(year: number): boolean {
 *   const feb = Temporal.PlainYearMonth.from({ year, month: 2 })
 *   return getDaysInMonth(feb) === 29
 * }
 * 
 * isLeapYear(2024)                        // true
 * isLeapYear(2023)                        // false
 * isLeapYear(2000)                        // true (divisible by 400)
 * isLeapYear(1900)                        // false (divisible by 100 but not 400)
 * 
 * // Last day of month calculator
 * function getLastDayOfMonth(date: Temporal.PlainDate): Temporal.PlainDate | null {
 *   const daysInMonth = getDaysInMonth(date)
 *   if (daysInMonth === null) return null
 *   
 *   return date.with({ day: daysInMonth })
 * }
 * 
 * const midMonth = Temporal.PlainDate.from("2024-02-15")
 * getLastDayOfMonth(midMonth)             // PlainDate 2024-02-29
 * 
 * // Days remaining in month
 * function daysRemainingInMonth(date: Temporal.PlainDate): number {
 *   const daysInMonth = getDaysInMonth(date)
 *   if (daysInMonth === null) return 0
 *   
 *   return daysInMonth - date.day
 * }
 * 
 * const date = Temporal.PlainDate.from("2024-03-15")
 * daysRemainingInMonth(date)              // 16 (31 - 15)
 * 
 * // Monthly calendar grid size (for UI)
 * function getCalendarWeeks(date: Temporal.PlainDate): number {
 *   const daysInMonth = getDaysInMonth(date)
 *   if (daysInMonth === null) return 0
 *   
 *   const firstDay = date.with({ day: 1 })
 *   const startWeekday = firstDay.dayOfWeek
 *   const totalCells = startWeekday - 1 + daysInMonth
 *   
 *   return Math.ceil(totalCells / 7)
 * }
 * 
 * // Null handling
 * getDaysInMonth(null)                    // null
 * getDaysInMonth(undefined)               // null
 * getDaysInMonth("2024-03-15")           // null (string, not Temporal object)
 * getDaysInMonth(new Date())              // null (Date, not Temporal)
 * 
 * // Monthly statistics helper
 * function getMonthStats(year: number): Record<number, number> {
 *   const stats: Record<number, number> = {}
 *   
 *   for (let month = 1; month <= 12; month++) {
 *     const yearMonth = Temporal.PlainYearMonth.from({ year, month })
 *     const days = getDaysInMonth(yearMonth)
 *     if (days !== null) {
 *       stats[month] = days
 *     }
 *   }
 *   
 *   return stats
 * }
 * 
 * getMonthStats(2024)
 * // { 1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }
 * 
 * // Billing period calculator
 * function getBillingDays(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number {
 *   if (startDate.year === endDate.year && startDate.month === endDate.month) {
 *     return endDate.day - startDate.day + 1
 *   }
 *   
 *   let totalDays = 0
 *   let current = startDate
 *   
 *   while (Temporal.PlainDate.compare(current, endDate) <= 0) {
 *     if (current.year === startDate.year && current.month === startDate.month) {
 *       // First month: from start date to end of month
 *       const daysInMonth = getDaysInMonth(current)
 *       totalDays += (daysInMonth ?? 0) - current.day + 1
 *     } else if (current.year === endDate.year && current.month === endDate.month) {
 *       // Last month: from start of month to end date
 *       totalDays += endDate.day
 *       break
 *     } else {
 *       // Full month
 *       totalDays += getDaysInMonth(current) ?? 0
 *     }
 *     
 *     current = current.add({ months: 1 }).with({ day: 1 })
 *   }
 *   
 *   return totalDays
 * }
 * 
 * // Percentage of month completed
 * function monthProgress(date: Temporal.PlainDate): number {
 *   const daysInMonth = getDaysInMonth(date)
 *   if (daysInMonth === null) return 0
 *   
 *   return (date.day / daysInMonth) * 100
 * }
 * 
 * const mid = Temporal.PlainDate.from("2024-03-15")
 * monthProgress(mid)                      // ~48.39% (15/31)
 * 
 * // Non-Gregorian calendars
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getDaysInMonth(hebrewDate)              // Days in Hebrew month Adar
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input
 * @property Leap-aware - Automatically handles leap years
 */
const getDaysInMonth = (
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
		return date.daysInMonth
	} catch {
		return null
	}
}

export default getDaysInMonth