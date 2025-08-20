/**
 * Returns a new date with the day set to the specified value
 * 
 * Creates a new Temporal date or datetime with the day of month changed to
 * the specified value. The day must be valid for the given month (1-31
 * depending on month). Handles overflow according to Temporal's 'constrain'
 * mode by default, clamping to the last valid day of the month if needed.
 * This is a curried function for easy composition. Returns null for invalid
 * inputs to support safe error handling.
 * 
 * @curried (day) => (date) => new date
 * @param day - The day of month to set (1-31)
 * @param date - The Temporal date to modify
 * @returns New date with updated day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setDay(1)(date)                         // PlainDate 2024-03-01
 * setDay(20)(date)                        // PlainDate 2024-03-20
 * setDay(31)(date)                        // PlainDate 2024-03-31
 * 
 * // Overflow handling (February)
 * const february = Temporal.PlainDate.from("2024-02-15")
 * setDay(29)(february)                    // PlainDate 2024-02-29 (leap year)
 * setDay(30)(february)                    // PlainDate 2024-02-29 (constrained)
 * setDay(31)(february)                    // PlainDate 2024-02-29 (constrained)
 * 
 * const nonLeapFeb = Temporal.PlainDate.from("2023-02-15")
 * setDay(29)(nonLeapFeb)                  // PlainDate 2023-02-28 (constrained)
 * 
 * // April (30 days)
 * const april = Temporal.PlainDate.from("2024-04-15")
 * setDay(30)(april)                       // PlainDate 2024-04-30
 * setDay(31)(april)                       // PlainDate 2024-04-30 (constrained)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setDay(1)(datetime)                     // PlainDateTime 2024-03-01T10:30:45
 * setDay(25)(datetime)                    // PlainDateTime 2024-03-25T10:30:45
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setDay(1)(zonedDateTime)                // ZonedDateTime 2024-03-01T10:30:00-05:00[America/New_York]
 * // Note: offset may change due to DST transitions
 * 
 * // First and last day of month helpers
 * const setToFirstDay = setDay(1)
 * const setToLastDay = (date: Temporal.PlainDate) => {
 *   const daysInMonth = date.daysInMonth
 *   return setDay(daysInMonth)(date)
 * }
 * 
 * const midMonth = Temporal.PlainDate.from("2024-03-15")
 * setToFirstDay(midMonth)                 // PlainDate 2024-03-01
 * setToLastDay(midMonth)                  // PlainDate 2024-03-31
 * 
 * // Invalid day handling
 * setDay(0)(date)                         // null (day must be >= 1)
 * setDay(32)(date)                        // PlainDate 2024-03-31 (constrained)
 * setDay(-1)(date)                        // null (negative day)
 * 
 * // Null handling
 * setDay(15)(null)                        // null
 * setDay(15)(undefined)                   // null
 * setDay(15)("2024-03-15" as any)        // null (string, not Temporal)
 * 
 * // Monthly billing date setter
 * function setBillingDate(
 *   date: Temporal.PlainDate,
 *   billingDay: number
 * ): Temporal.PlainDate | null {
 *   // Set to billing day, constrained to valid days
 *   return setDay(billingDay)(date)
 * }
 * 
 * setBillingDate(Temporal.PlainDate.from("2024-02-05"), 31)
 * // PlainDate 2024-02-29 (constrained to last day of February)
 * 
 * setBillingDate(Temporal.PlainDate.from("2024-03-05"), 31)
 * // PlainDate 2024-03-31
 * 
 * // Payday calculator
 * function getPayday(
 *   month: Temporal.PlainYearMonth,
 *   payday: number = 15
 * ): Temporal.PlainDate | null {
 *   const firstOfMonth = month.toPlainDate({ day: 1 })
 *   return setDay(payday)(firstOfMonth)
 * }
 * 
 * const march2024 = Temporal.PlainYearMonth.from("2024-03")
 * getPayday(march2024, 15)                // PlainDate 2024-03-15
 * getPayday(march2024, 31)                // PlainDate 2024-03-31
 * 
 * // Due date setter with weekend adjustment
 * function setDueDate(
 *   date: Temporal.PlainDate,
 *   dueDay: number
 * ): Temporal.PlainDate | null {
 *   const newDate = setDay(dueDay)(date)
 *   if (newDate === null) return null
 *   
 *   const dayOfWeek = newDate.dayOfWeek
 *   
 *   // If Saturday (6), move to Friday
 *   if (dayOfWeek === 6) {
 *     return newDate.subtract({ days: 1 })
 *   }
 *   
 *   // If Sunday (7), move to Monday
 *   if (dayOfWeek === 7) {
 *     return newDate.add({ days: 1 })
 *   }
 *   
 *   return newDate
 * }
 * 
 * // Batch date processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-10"),
 *   Temporal.PlainDate.from("2024-02-10"),
 *   Temporal.PlainDate.from("2024-03-10")
 * ]
 * 
 * const setTo15th = setDay(15)
 * dates.map(setTo15th)
 * // [2024-01-15, 2024-02-15, 2024-03-15]
 * 
 * // Anniversary date adjuster
 * function adjustAnniversaryDate(
 *   originalDate: Temporal.PlainDate,
 *   currentYear: number
 * ): Temporal.PlainDate | null {
 *   const anniversaryMonth = originalDate.month
 *   const anniversaryDay = originalDate.day
 *   
 *   const thisYear = Temporal.PlainDate.from({
 *     year: currentYear,
 *     month: anniversaryMonth,
 *     day: 1
 *   })
 *   
 *   // Handle February 29 birthdays in non-leap years
 *   return setDay(anniversaryDay)(thisYear)
 * }
 * 
 * const leapBirthday = Temporal.PlainDate.from("2000-02-29")
 * adjustAnniversaryDate(leapBirthday, 2024)  // 2024-02-29 (leap year)
 * adjustAnniversaryDate(leapBirthday, 2023)  // 2023-02-28 (constrained)
 * 
 * // Monthly report date generator
 * function generateMonthlyReportDates(
 *   year: number,
 *   reportDay: number
 * ): Array<Temporal.PlainDate | null> {
 *   const dates: Array<Temporal.PlainDate | null> = []
 *   
 *   for (let month = 1; month <= 12; month++) {
 *     const date = Temporal.PlainDate.from({ year, month, day: 1 })
 *     dates.push(setDay(reportDay)(date))
 *   }
 *   
 *   return dates
 * }
 * 
 * generateMonthlyReportDates(2024, 15)
 * // [Jan 15, Feb 15, Mar 15, ..., Dec 15] all in 2024
 * 
 * generateMonthlyReportDates(2024, 31)
 * // [Jan 31, Feb 29, Mar 31, Apr 30, May 31, ...] (constrained for shorter months)
 * 
 * // Contract renewal date calculator
 * function getContractRenewalDate(
 *   startDate: Temporal.PlainDate,
 *   monthsLater: number
 * ): Temporal.PlainDate | null {
 *   const renewalMonth = startDate.add({ months: monthsLater })
 *   
 *   // Try to maintain the same day of month
 *   return setDay(startDate.day)(renewalMonth)
 * }
 * 
 * const contractStart = Temporal.PlainDate.from("2024-01-31")
 * getContractRenewalDate(contractStart, 1)   // 2024-02-29 (constrained)
 * getContractRenewalDate(contractStart, 2)   // 2024-03-31
 * getContractRenewalDate(contractStart, 3)   // 2024-04-30 (constrained)
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Constrained - Automatically constrains to valid days in month
 */
const setDay = (day: number) => (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
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
	
	// Validate day is positive
	if (day < 1 || !Number.isInteger(day)) {
		return null
	}
	
	try {
		// Use 'constrain' overflow mode to handle invalid days gracefully
		return date.with({ day }, { overflow: 'constrain' })
	} catch {
		return null
	}
}

export default setDay