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
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * endOfMonth(date)                        // PlainDate 2024-03-31
 *
 * const february = Temporal.PlainDate.from("2024-02-10")
 * endOfMonth(february)                    // PlainDate 2024-02-29 (leap year)
 *
 * const february2023 = Temporal.PlainDate.from("2023-02-10")
 * endOfMonth(february2023)                // PlainDate 2023-02-28 (non-leap)
 *
 * // Different month lengths
 * endOfMonth(Temporal.PlainDate.from("2024-01-01"))  // PlainDate 2024-01-31
 * endOfMonth(Temporal.PlainDate.from("2024-04-15"))  // PlainDate 2024-04-30
 * endOfMonth(Temporal.PlainDate.from("2024-06-10"))  // PlainDate 2024-06-30
 * endOfMonth(Temporal.PlainDate.from("2024-07-20"))  // PlainDate 2024-07-31
 *
 * // With PlainDateTime (returns PlainDate)
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfMonth(datetime)                    // PlainDate 2024-03-31
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * endOfMonth(yearMonth)                   // PlainDate 2024-03-31
 *
 * // Current month's end
 * const today = Temporal.Now.plainDateISO()
 * const monthEnd = endOfMonth(today)      // Last day of current month
 *
 * // Monthly billing cycle
 * function getBillingPeriodEnd(
 *   billingMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(billingMonth)
 * }
 *
 * const billing = Temporal.PlainYearMonth.from("2024-03")
 * getBillingPeriodEnd(billing)            // PlainDate 2024-03-31
 *
 * // Days remaining in month
 * function getDaysRemainingInMonth(
 *   date: Temporal.PlainDate
 * ): number {
 *   const lastDay = endOfMonth(date)
 *   if (!lastDay) return 0
 *
 *   return date.until(lastDay).days + 1  // Include today
 * }
 *
 * const midMonth = Temporal.PlainDate.from("2024-03-15")
 * getDaysRemainingInMonth(midMonth)       // 17 days (including 15th)
 *
 * // Monthly report dates
 * function getMonthlyReportDates(
 *   year: number
 * ): Array<Temporal.PlainDate | null> {
 *   const months = Array.from({ length: 12 }, (_, i) => i + 1)
 *   return months.map(month => {
 *     const yearMonth = Temporal.PlainYearMonth.from({ year, month })
 *     return endOfMonth(yearMonth)
 *   })
 * }
 *
 * getMonthlyReportDates(2024)
 * // [Jan 31, Feb 29, Mar 31, Apr 30, ..., Dec 31]
 *
 * // Payroll processing
 * function getPayrollDate(
 *   month: Temporal.PlainYearMonth,
 *   daysBeforeEnd: number = 0
 * ): Temporal.PlainDate | null {
 *   const lastDay = endOfMonth(month)
 *   return lastDay ? lastDay.subtract({ days: daysBeforeEnd }) : null
 * }
 *
 * const payMonth = Temporal.PlainYearMonth.from("2024-03")
 * getPayrollDate(payMonth)                // PlainDate 2024-03-31
 * getPayrollDate(payMonth, 2)             // PlainDate 2024-03-29 (2 days before)
 *
 * // Null handling
 * endOfMonth(null)                        // null
 * endOfMonth(undefined)                   // null
 *
 * // Credit card statement
 * function getStatementClosingDate(
 *   statementMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(statementMonth)
 * }
 *
 * // Fiscal month end
 * function getFiscalMonthEnd(
 *   date: Temporal.PlainDate,
 *   fiscalYearEndMonth: number = 12
 * ): Temporal.PlainDate | null {
 *   // Adjust for fiscal year if needed
 *   const fiscalMonth = date.month
 *   const fiscalYear = date.month <= fiscalYearEndMonth
 *     ? date.year
 *     : date.year + 1
 *
 *   return endOfMonth(date)
 * }
 *
 * // Contract expiration
 * function getContractExpirationDate(
 *   startDate: Temporal.PlainDate,
 *   durationMonths: number
 * ): Temporal.PlainDate | null {
 *   const endYearMonth = startDate
 *     .toPlainYearMonth()
 *     .add({ months: durationMonths - 1 })
 *   return endOfMonth(endYearMonth)
 * }
 *
 * const contractStart = Temporal.PlainDate.from("2024-01-15")
 * getContractExpirationDate(contractStart, 6)  // PlainDate 2024-06-30
 *
 * // Monthly subscription renewal
 * function getSubscriptionRenewalDate(
 *   currentPeriod: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   const endDate = endOfMonth(currentPeriod)
 *   return endDate ? endDate.add({ days: 1 }) : null  // First of next month
 * }
 *
 * // Leap year February check
 * function getFebruaryDays(year: number): number {
 *   const february = Temporal.PlainYearMonth.from({ year, month: 2 })
 *   const lastDay = endOfMonth(february)
 *   return lastDay ? lastDay.day : 28
 * }
 *
 * getFebruaryDays(2024)                   // 29 (leap year)
 * getFebruaryDays(2023)                   // 28 (non-leap year)
 * getFebruaryDays(2000)                   // 29 (leap year)
 * getFebruaryDays(1900)                   // 28 (not a leap year)
 *
 * // Quarter end dates
 * function getQuarterEnd(
 *   year: number,
 *   quarter: 1 | 2 | 3 | 4
 * ): Temporal.PlainDate | null {
 *   const endMonths = { 1: 3, 2: 6, 3: 9, 4: 12 }
 *   const yearMonth = Temporal.PlainYearMonth.from({
 *     year,
 *     month: endMonths[quarter]
 *   })
 *   return endOfMonth(yearMonth)
 * }
 *
 * getQuarterEnd(2024, 1)                  // PlainDate 2024-03-31
 * getQuarterEnd(2024, 2)                  // PlainDate 2024-06-30
 * getQuarterEnd(2024, 3)                  // PlainDate 2024-09-30
 * getQuarterEnd(2024, 4)                  // PlainDate 2024-12-31
 *
 * // Monthly targets
 * function getMonthlyTargetDeadline(
 *   targetMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(targetMonth)
 * }
 *
 * // Interest calculation periods
 * function getInterestPeriodEnd(
 *   periodStart: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(periodStart)
 * }
 *
 * // Monthly archive cutoff
 * function getArchiveCutoffDate(
 *   archiveMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(archiveMonth)
 * }
 *
 * // Rental period
 * function getRentalPeriodEnd(
 *   moveInDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Most rentals end at month end regardless of move-in date
 *   return endOfMonth(moveInDate)
 * }
 *
 * const moveIn = Temporal.PlainDate.from("2024-03-15")
 * getRentalPeriodEnd(moveIn)              // PlainDate 2024-03-31
 *
 * // Tax period
 * function getTaxPeriodEnd(
 *   taxMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDate | null {
 *   return endOfMonth(taxMonth)
 * }
 *
 * // Monthly sales cutoff
 * function getSalesCutoff(
 *   salesMonth: Temporal.PlainYearMonth
 * ): Temporal.PlainDateTime | null {
 *   const lastDay = endOfMonth(salesMonth)
 *   // Sales cutoff at end of last day
 *   return lastDay ?
 *     lastDay.toPlainDateTime(Temporal.PlainTime.from("23:59:59")) :
 *     null
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new date without modifying input
 * @property Safe - Returns null for invalid inputs
 * @property LeapAware - Correctly handles leap years for February
 */
const endOfMonth = (
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
