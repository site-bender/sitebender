/**
 * Adds months to a Temporal PlainDate, PlainDateTime, or PlainYearMonth
 * 
 * Immutably adds the specified number of months to a date or datetime.
 * Returns a new Temporal object with the months added. Negative values
 * subtract months. Handles year boundaries and day overflow automatically.
 * When adding months would create an invalid date (e.g., Jan 31 + 1 month),
 * it adjusts to the last valid day of the target month (Feb 28/29).
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @curried (months) => (date) => result
 * @param months - Number of months to add (negative to subtract)
 * @param date - The PlainDate, PlainDateTime, or PlainYearMonth to add months to
 * @returns New date/datetime with months added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * addMonths(1)(date)                      // PlainDate 2024-04-15
 * addMonths(3)(date)                      // PlainDate 2024-06-15
 * addMonths(-2)(date)                     // PlainDate 2024-01-15
 * addMonths(12)(date)                     // PlainDate 2025-03-15
 * 
 * // Year boundary crossing
 * const endOfYear = Temporal.PlainDate.from("2024-11-15")
 * addMonths(2)(endOfYear)                 // PlainDate 2025-01-15
 * addMonths(14)(endOfYear)                // PlainDate 2026-01-15
 * 
 * const startOfYear = Temporal.PlainDate.from("2024-01-15")
 * addMonths(-2)(startOfYear)              // PlainDate 2023-11-15
 * 
 * // Day overflow handling (end of month)
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * addMonths(1)(jan31)                     // PlainDate 2024-02-29 (leap year)
 * addMonths(2)(jan31)                     // PlainDate 2024-03-31
 * addMonths(3)(jan31)                     // PlainDate 2024-04-30 (April has 30 days)
 * 
 * const jan31NonLeap = Temporal.PlainDate.from("2023-01-31")
 * addMonths(1)(jan31NonLeap)              // PlainDate 2023-02-28 (non-leap)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addMonths(6)(datetime)                  // PlainDateTime 2024-09-15T10:30:00
 * addMonths(-3)(datetime)                 // PlainDateTime 2023-12-15T10:30:00
 * 
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * addMonths(2)(yearMonth)                 // PlainYearMonth 2024-05
 * addMonths(-5)(yearMonth)                // PlainYearMonth 2023-10
 * addMonths(12)(yearMonth)                // PlainYearMonth 2025-03
 * 
 * // Partial application for common periods
 * const addQuarter = addMonths(3)
 * const addHalfYear = addMonths(6)
 * const addYear = addMonths(12)
 * const subtractMonth = addMonths(-1)
 * 
 * const today = Temporal.Now.plainDateISO()
 * addQuarter(today)                       // 3 months from now
 * addHalfYear(today)                      // 6 months from now
 * addYear(today)                          // 1 year from now
 * 
 * // Billing cycle calculations
 * function getNextBillingDate(
 *   lastBilling: Temporal.PlainDate,
 *   cycleMonths: number = 1
 * ): Temporal.PlainDate | null {
 *   return addMonths(cycleMonths)(lastBilling)
 * }
 * 
 * const billDate = Temporal.PlainDate.from("2024-01-15")
 * getNextBillingDate(billDate)            // PlainDate 2024-02-15
 * getNextBillingDate(billDate, 3)         // PlainDate 2024-04-15 (quarterly)
 * getNextBillingDate(billDate, 12)        // PlainDate 2025-01-15 (annual)
 * 
 * // Subscription renewals with day adjustment
 * const subscription = Temporal.PlainDate.from("2024-01-31")
 * const renewalDates = [1, 2, 3, 4, 5, 6].map(m => 
 *   addMonths(m)(subscription)
 * )
 * // Handles Feb 29, Apr 30, etc. appropriately
 * 
 * // Age calculation in months
 * function getAgeInMonths(
 *   birthDate: Temporal.PlainDate,
 *   currentDate: Temporal.PlainDate = Temporal.Now.plainDateISO()
 * ): number {
 *   return currentDate.since(birthDate, { largestUnit: "months" }).months
 * }
 * 
 * // Loan amortization schedule
 * function generatePaymentSchedule(
 *   startDate: Temporal.PlainDate,
 *   termMonths: number
 * ): Array<Temporal.PlainDate | null> {
 *   const schedule: Array<Temporal.PlainDate | null> = []
 *   
 *   for (let i = 1; i <= termMonths; i++) {
 *     schedule.push(addMonths(i)(startDate))
 *   }
 *   
 *   return schedule
 * }
 * 
 * const loanStart = Temporal.PlainDate.from("2024-03-01")
 * const payments = generatePaymentSchedule(loanStart, 12)
 * // Monthly payment dates for a 1-year loan
 * 
 * // Contract expiration
 * function getContractExpiry(
 *   startDate: Temporal.PlainDate,
 *   durationMonths: number
 * ): Temporal.PlainDate | null {
 *   const expiry = addMonths(durationMonths)(startDate)
 *   // Subtract one day for inclusive contract period
 *   return expiry ? expiry.subtract({ days: 1 }) : null
 * }
 * 
 * const contractStart = Temporal.PlainDate.from("2024-01-01")
 * getContractExpiry(contractStart, 6)     // PlainDate 2024-06-30
 * getContractExpiry(contractStart, 12)    // PlainDate 2024-12-31
 * 
 * // Pregnancy due date calculation (280 days ≈ 9 months)
 * function calculateDueDate(
 *   lastPeriod: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Naegele's rule: add 9 months and 7 days
 *   const nineMonthsLater = addMonths(9)(lastPeriod)
 *   return nineMonthsLater ? nineMonthsLater.add({ days: 7 }) : null
 * }
 * 
 * // Fiscal quarter calculations
 * function getFiscalQuarter(
 *   date: Temporal.PlainDate,
 *   fiscalYearStart: number = 1 // January by default
 * ): number {
 *   const adjustedMonth = (date.month - fiscalYearStart + 12) % 12
 *   return Math.floor(adjustedMonth / 3) + 1
 * }
 * 
 * // Project milestone scheduling
 * const projectStart = Temporal.PlainDate.from("2024-03-01")
 * const milestones = [
 *   { name: "Phase 1", months: 2 },
 *   { name: "Phase 2", months: 4 },
 *   { name: "Phase 3", months: 6 },
 *   { name: "Completion", months: 9 }
 * ].map(m => ({
 *   name: m.name,
 *   date: addMonths(m.months)(projectStart)
 * }))
 * 
 * // Null handling
 * addMonths(3)(null)                      // null
 * addMonths(3)(undefined)                 // null
 * addMonths(3)("invalid")                 // null
 * 
 * // Retirement planning
 * function getRetirementDate(
 *   birthDate: Temporal.PlainDate,
 *   retirementAge: number = 65
 * ): Temporal.PlainDate | null {
 *   const retirementYear = birthDate.year + retirementAge
 *   return birthDate.withYear(retirementYear)
 * }
 * 
 * // Season calculation
 * function getSeasonEnd(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   const month = date.month
 *   const seasonEndMonth = Math.ceil(month / 3) * 3
 *   const monthsToAdd = seasonEndMonth - month
 *   
 *   const endOfSeason = addMonths(monthsToAdd)(date)
 *   // Go to last day of that month
 *   return endOfSeason ? 
 *     endOfSeason.with({ day: endOfSeason.daysInMonth }) : null
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new date without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Overflow - Handles day overflow by adjusting to valid dates
 */
const addMonths = (months: number) => (
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null => {
	if (date == null) {
		return null
	}
	
	if (!(date instanceof Temporal.PlainDate) && 
	    !(date instanceof Temporal.PlainDateTime) &&
	    !(date instanceof Temporal.PlainYearMonth)) {
		return null
	}
	
	try {
		return date.add({ months })
	} catch {
		return null
	}
}

export default addMonths