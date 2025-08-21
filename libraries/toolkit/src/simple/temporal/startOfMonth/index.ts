/**
 * Returns the first day of the month for a date
 * 
 * Creates a new Temporal date/datetime set to the first day of the month at
 * midnight (00:00:00.000000000). Preserves the year, month, and timezone
 * information while resetting the day to 1 and all time components to zero.
 * This is useful for monthly comparisons, billing cycles, and monthly aggregations.
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @param date - The Temporal date to get start of month for
 * @returns Date/datetime at start of month, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * startOfMonth(date)                      // PlainDateTime 2024-03-01T00:00:00
 * 
 * const endOfMonth = Temporal.PlainDate.from("2024-03-31")
 * startOfMonth(endOfMonth)                // PlainDateTime 2024-03-01T00:00:00
 * 
 * const firstDay = Temporal.PlainDate.from("2024-03-01")
 * startOfMonth(firstDay)                  // PlainDateTime 2024-03-01T00:00:00
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * startOfMonth(datetime)                  // PlainDateTime 2024-03-01T00:00:00
 * 
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfMonth(zonedDateTime)             // ZonedDateTime 2024-03-01T00:00:00-05:00[America/New_York]
 * // Note: March 1st is before DST, so offset is -05:00
 * 
 * // Different months
 * const february = Temporal.PlainDate.from("2024-02-15")
 * startOfMonth(february)                  // PlainDateTime 2024-02-01T00:00:00
 * 
 * const december = Temporal.PlainDate.from("2024-12-25")
 * startOfMonth(december)                  // PlainDateTime 2024-12-01T00:00:00
 * 
 * // Leap year February
 * const leapFeb = Temporal.PlainDate.from("2024-02-29")
 * startOfMonth(leapFeb)                   // PlainDateTime 2024-02-01T00:00:00
 * 
 * // Monthly billing calculator
 * function getBillingPeriod(
 *   billingDate: Temporal.PlainDate
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const start = startOfMonth(billingDate)
 *   const nextMonth = billingDate.add({ months: 1 })
 *   const end = startOfMonth(nextMonth)?.subtract({ nanoseconds: 1 })
 *   
 *   return { start, end }
 * }
 * 
 * const billing = Temporal.PlainDate.from("2024-03-15")
 * getBillingPeriod(billing)
 * // { start: 2024-03-01T00:00:00, end: 2024-03-31T23:59:59.999999999 }
 * 
 * // Same month comparison
 * function isSameMonth(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   const month1 = startOfMonth(date1)
 *   const month2 = startOfMonth(date2)
 *   
 *   if (!month1 || !month2) return false
 *   return month1.equals(month2)
 * }
 * 
 * const early = Temporal.PlainDate.from("2024-03-05")
 * const late = Temporal.PlainDate.from("2024-03-25")
 * const next = Temporal.PlainDate.from("2024-04-05")
 * 
 * isSameMonth(early, late)                // true
 * isSameMonth(early, next)                // false
 * 
 * // Monthly aggregation
 * function aggregateByMonth(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<string, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<string, Array<Temporal.PlainDate>>()
 *   
 *   for (const date of dates) {
 *     const monthStart = startOfMonth(date)
 *     if (!monthStart) continue
 *     
 *     const key = `${monthStart.year}-${String(monthStart.month).padStart(2, '0')}`
 *     const group = grouped.get(key) ?? []
 *     group.push(date)
 *     grouped.set(key, group)
 *   }
 *   
 *   return grouped
 * }
 * 
 * const transactions = [
 *   Temporal.PlainDate.from("2024-03-05"),
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-04-02")
 * ]
 * aggregateByMonth(transactions)
 * // Map { "2024-03" => [Mar 5, Mar 15], "2024-04" => [Apr 2] }
 * 
 * // Monthly report boundaries
 * function getMonthlyReportRange(
 *   year: number,
 *   month: number
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const date = Temporal.PlainDate.from({ year, month, day: 1 })
 *   const start = startOfMonth(date)
 *   const nextMonth = date.add({ months: 1 })
 *   const end = startOfMonth(nextMonth)?.subtract({ nanoseconds: 1 })
 *   
 *   return { start, end }
 * }
 * 
 * getMonthlyReportRange(2024, 3)
 * // { start: 2024-03-01T00:00:00, end: 2024-03-31T23:59:59.999999999 }
 * 
 * // Subscription renewal date
 * function getNextRenewalDate(
 *   subscriptionDate: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   const today = Temporal.Now.plainDateISO()
 *   
 *   if (subscriptionDate.day === 1) {
 *     // Already on first of month
 *     const nextMonth = today.add({ months: 1 })
 *     return startOfMonth(nextMonth)
 *   }
 *   
 *   // Renew on first of next month
 *   const currentMonthStart = startOfMonth(today)
 *   if (!currentMonthStart) return null
 *   
 *   if (today.day >= subscriptionDate.day) {
 *     // Already passed renewal day this month
 *     return startOfMonth(today.add({ months: 1 }))
 *   }
 *   
 *   return currentMonthStart
 * }
 * 
 * // Monthly archive organizer
 * function getArchivePath(
 *   date: Temporal.PlainDate
 * ): string {
 *   const monthStart = startOfMonth(date)
 *   if (!monthStart) return "invalid"
 *   
 *   return `${monthStart.year}/${String(monthStart.month).padStart(2, '0')}`
 * }
 * 
 * const archiveDate = Temporal.PlainDate.from("2024-03-15")
 * getArchivePath(archiveDate)             // "2024/03"
 * 
 * // Null handling
 * startOfMonth(null)                      // null
 * startOfMonth(undefined)                 // null
 * startOfMonth("2024-03-15")             // null (string, not Temporal)
 * 
 * // Financial quarter start
 * function getQuarterStart(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   const month = date.month
 *   const quarterStartMonth = Math.floor((month - 1) / 3) * 3 + 1
 *   const quarterStart = date.with({ month: quarterStartMonth, day: 1 })
 *   
 *   return startOfMonth(quarterStart)
 * }
 * 
 * const q2Date = Temporal.PlainDate.from("2024-05-15")
 * getQuarterStart(q2Date)                 // 2024-04-01T00:00:00
 * 
 * // Payroll period calculator
 * function getPayrollPeriod(
 *   payDate: Temporal.PlainDate,
 *   isMonthly: boolean = true
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   if (isMonthly) {
 *     const start = startOfMonth(payDate)
 *     const end = start?.add({ months: 1, nanoseconds: -1 })
 *     return { start, end }
 *   }
 *   
 *   // Bi-weekly (every 2 weeks from month start)
 *   const monthStart = startOfMonth(payDate)
 *   if (!monthStart) return { start: null, end: null }
 *   
 *   const daysSinceMonthStart = payDate.day - 1
 *   const periodNumber = Math.floor(daysSinceMonthStart / 14)
 *   const start = monthStart.add({ days: periodNumber * 14 })
 *   const end = start.add({ days: 13, hours: 23, minutes: 59, seconds: 59 })
 *   
 *   return { start, end }
 * }
 * 
 * // Monthly statistics reset
 * function shouldResetMonthlyStats(
 *   lastReset: Temporal.PlainDateTime,
 *   currentTime: Temporal.PlainDateTime
 * ): boolean {
 *   const lastMonth = startOfMonth(lastReset)
 *   const currentMonth = startOfMonth(currentTime)
 *   
 *   if (!lastMonth || !currentMonth) return false
 *   return !lastMonth.equals(currentMonth)
 * }
 * 
 * const lastReset = Temporal.PlainDateTime.from("2024-02-28T23:59:00")
 * const current = Temporal.PlainDateTime.from("2024-03-01T00:01:00")
 * shouldResetMonthlyStats(lastReset, current) // true
 * 
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-29"),
 *   Temporal.PlainDate.from("2024-03-31")
 * ]
 * 
 * dates.map(startOfMonth)
 * // [2024-01-01T00:00:00, 2024-02-01T00:00:00, 2024-03-01T00:00:00]
 * 
 * // Monthly calendar generator
 * function getMonthCalendarBounds(
 *   year: number,
 *   month: number
 * ): { 
 *   firstDay: Temporal.PlainDateTime | null;
 *   lastDay: Temporal.PlainDateTime | null;
 *   daysInMonth: number 
 * } {
 *   const date = Temporal.PlainDate.from({ year, month, day: 1 })
 *   const firstDay = startOfMonth(date)
 *   const nextMonth = date.add({ months: 1 })
 *   const lastDay = startOfMonth(nextMonth)?.subtract({ days: 1 })
 *   
 *   return {
 *     firstDay,
 *     lastDay,
 *     daysInMonth: date.daysInMonth
 *   }
 * }
 * 
 * getMonthCalendarBounds(2024, 2)
 * // { firstDay: 2024-02-01T00:00:00, lastDay: 2024-02-29T00:00:00, daysInMonth: 29 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Preserves - Maintains year, month, and timezone information
 * @property Resets - Sets day to 1 and all time components to zero
 */
const startOfMonth = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
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
			const firstOfMonth = date.with({ day: 1 })
			return firstOfMonth.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}
		
		// For PlainDateTime and ZonedDateTime, set to first day at midnight
		return date.with({
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0
		})
	} catch {
		return null
	}
}

export default startOfMonth