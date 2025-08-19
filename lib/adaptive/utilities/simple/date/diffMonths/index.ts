/**
 * Calculates the difference in months between two dates
 * 
 * Computes the number of whole months from the first date to the second date.
 * Returns a positive number if the second date is later, negative if earlier.
 * Partial months are truncated. Works with PlainDate, PlainDateTime, and
 * PlainYearMonth. Returns null for invalid inputs.
 * 
 * @curried (from) => (to) => result
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of whole months difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * diffMonths(date1)(date2)                // 2 months
 * diffMonths(date2)(date1)                // -2 months
 * diffMonths(date1)(date1)                // 0 months
 * 
 * // Partial months (truncated)
 * const jan15 = Temporal.PlainDate.from("2024-01-15")
 * const feb10 = Temporal.PlainDate.from("2024-02-10")
 * diffMonths(jan15)(feb10)                // 0 months (less than full month)
 * 
 * const feb20 = Temporal.PlainDate.from("2024-02-20")
 * diffMonths(jan15)(feb20)                // 1 month
 * 
 * // Year boundary crossing
 * const nov2023 = Temporal.PlainDate.from("2023-11-15")
 * const feb2024 = Temporal.PlainDate.from("2024-02-15")
 * diffMonths(nov2023)(feb2024)            // 3 months
 * 
 * // With PlainDateTime (time ignored)
 * const dt1 = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-06-15T14:00:00")
 * diffMonths(dt1)(dt2)                    // 5 months
 * 
 * // With PlainYearMonth
 * const ym1 = Temporal.PlainYearMonth.from("2024-01")
 * const ym2 = Temporal.PlainYearMonth.from("2024-06")
 * diffMonths(ym1)(ym2)                    // 5 months
 * 
 * // End of month handling
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * const feb29 = Temporal.PlainDate.from("2024-02-29")
 * diffMonths(jan31)(feb29)                // 0 months (not full month)
 * 
 * const mar31 = Temporal.PlainDate.from("2024-03-31")
 * diffMonths(jan31)(mar31)                // 2 months
 * 
 * // Partial application for age calculation
 * const birthDate = Temporal.PlainDate.from("2000-06-15")
 * const monthsSinceBirth = diffMonths(birthDate)
 * 
 * const today = Temporal.Now.plainDateISO()
 * const ageInMonths = monthsSinceBirth(today)  // Months since birth
 * 
 * // Subscription duration
 * function getSubscriptionMonths(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number | null {
 *   return diffMonths(startDate)(endDate)
 * }
 * 
 * const subStart = Temporal.PlainDate.from("2023-01-15")
 * const subEnd = Temporal.PlainDate.from("2024-01-14")
 * getSubscriptionMonths(subStart, subEnd) // 11 months
 * 
 * // Employment duration
 * function getEmploymentMonths(
 *   hireDate: Temporal.PlainDate,
 *   terminationDate: Temporal.PlainDate | null = null
 * ): number | null {
 *   const endDate = terminationDate || Temporal.Now.plainDateISO()
 *   return diffMonths(hireDate)(endDate)
 * }
 * 
 * const hired = Temporal.PlainDate.from("2022-03-01")
 * getEmploymentMonths(hired)              // Months employed (to today)
 * 
 * // Loan term calculation
 * function getLoanTermMonths(
 *   firstPayment: Temporal.PlainDate,
 *   lastPayment: Temporal.PlainDate
 * ): number {
 *   const months = diffMonths(firstPayment)(lastPayment)
 *   // Add 1 to include both first and last payment months
 *   return months !== null ? months + 1 : 0
 * }
 * 
 * const loanStart = Temporal.PlainDate.from("2024-01-01")
 * const loanEnd = Temporal.PlainDate.from("2028-12-01")
 * getLoanTermMonths(loanStart, loanEnd)   // 60 months (5-year loan)
 * 
 * // Pregnancy tracking
 * function getGestationalAge(
 *   lastPeriod: Temporal.PlainDate
 * ): { months: number; weeks: number } | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const months = diffMonths(lastPeriod)(today)
 *   const totalDays = today.since(lastPeriod).days
 *   const weeks = Math.floor(totalDays / 7)
 *   
 *   return months !== null ? { months, weeks } : null
 * }
 * 
 * // Project phase duration
 * function getPhaseMonths(
 *   phases: Array<{ start: Temporal.PlainDate; end: Temporal.PlainDate }>
 * ): Array<{ phase: number; months: number | null }> {
 *   return phases.map((phase, index) => ({
 *     phase: index + 1,
 *     months: diffMonths(phase.start)(phase.end)
 *   }))
 * }
 * 
 * const projectPhases = [
 *   { start: Temporal.PlainDate.from("2024-01-01"), end: Temporal.PlainDate.from("2024-03-31") },
 *   { start: Temporal.PlainDate.from("2024-04-01"), end: Temporal.PlainDate.from("2024-08-31") },
 *   { start: Temporal.PlainDate.from("2024-09-01"), end: Temporal.PlainDate.from("2024-12-31") }
 * ]
 * getPhaseMonths(projectPhases)
 * // [{ phase: 1, months: 2 }, { phase: 2, months: 4 }, { phase: 3, months: 3 }]
 * 
 * // Null handling
 * diffMonths(null)(date2)                 // null
 * diffMonths(date1)(null)                 // null
 * diffMonths(null)(null)                  // null
 * 
 * // Rental period
 * function getRentalMonths(
 *   moveIn: Temporal.PlainDate,
 *   moveOut: Temporal.PlainDate
 * ): { fullMonths: number; prorated: boolean } | null {
 *   const months = diffMonths(moveIn)(moveOut)
 *   if (months === null) return null
 *   
 *   // Check if partial month needs proration
 *   const daysDiff = moveOut.day - moveIn.day
 *   const prorated = daysDiff !== 0
 *   
 *   return { fullMonths: months, prorated }
 * }
 * 
 * const moveIn = Temporal.PlainDate.from("2024-03-15")
 * const moveOut = Temporal.PlainDate.from("2024-08-20")
 * getRentalMonths(moveIn, moveOut)        // { fullMonths: 5, prorated: true }
 * 
 * // Age milestones
 * function getAgeInMonths(
 *   birthDate: Temporal.PlainDate
 * ): number | null {
 *   const today = Temporal.Now.plainDateISO()
 *   return diffMonths(birthDate)(today)
 * }
 * 
 * function checkInfantMilestone(
 *   birthDate: Temporal.PlainDate,
 *   milestoneMonths: number
 * ): boolean {
 *   const ageMonths = getAgeInMonths(birthDate)
 *   return ageMonths !== null && ageMonths >= milestoneMonths
 * }
 * 
 * const babyBirth = Temporal.PlainDate.from("2023-09-15")
 * checkInfantMilestone(babyBirth, 6)      // Check if 6+ months old
 * 
 * // Billing cycles
 * function getBillingCycles(
 *   serviceStart: Temporal.PlainDate,
 *   serviceEnd: Temporal.PlainDate,
 *   cycleMonths: number = 1
 * ): number {
 *   const totalMonths = diffMonths(serviceStart)(serviceEnd)
 *   if (totalMonths === null) return 0
 *   
 *   return Math.ceil(totalMonths / cycleMonths)
 * }
 * 
 * const serviceStart = Temporal.PlainDate.from("2024-01-15")
 * const serviceEnd = Temporal.PlainDate.from("2024-12-14")
 * getBillingCycles(serviceStart, serviceEnd, 3)  // 4 quarterly cycles
 * 
 * // Experience level
 * function getExperienceLevel(
 *   startDate: Temporal.PlainDate
 * ): "junior" | "mid" | "senior" | "expert" {
 *   const months = diffMonths(startDate)(Temporal.Now.plainDateISO())
 *   if (months === null) return "junior"
 *   
 *   if (months < 12) return "junior"        // < 1 year
 *   if (months < 36) return "mid"           // 1-3 years
 *   if (months < 84) return "senior"        // 3-7 years
 *   return "expert"                         // 7+ years
 * }
 * 
 * // Seasonal comparison
 * function getSeasonalDiff(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): { months: number | null; quarters: number } {
 *   const months = diffMonths(date1)(date2)
 *   const quarters = months !== null ? Math.floor(months / 3) : 0
 *   
 *   return { months, quarters }
 * }
 * 
 * const q1Start = Temporal.PlainDate.from("2024-01-01")
 * const q3Start = Temporal.PlainDate.from("2024-07-01")
 * getSeasonalDiff(q1Start, q3Start)       // { months: 6, quarters: 2 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past dates, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Truncated - Returns whole months only, partial months ignored
 */
const diffMonths = (
	from: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
) => (
	to: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): number | null => {
	if (from == null || to == null) {
		return null
	}
	
	try {
		// Convert to appropriate types for comparison
		let fromDate: Temporal.PlainDate | Temporal.PlainYearMonth
		let toDate: Temporal.PlainDate | Temporal.PlainYearMonth
		
		if (from instanceof Temporal.PlainDateTime) {
			fromDate = from.toPlainDate()
		} else if (from instanceof Temporal.PlainDate || from instanceof Temporal.PlainYearMonth) {
			fromDate = from
		} else {
			return null
		}
		
		if (to instanceof Temporal.PlainDateTime) {
			toDate = to.toPlainDate()
		} else if (to instanceof Temporal.PlainDate || to instanceof Temporal.PlainYearMonth) {
			toDate = to
		} else {
			return null
		}
		
		// Calculate difference in months
		const duration = toDate.since(fromDate, { largestUnit: 'months' })
		return duration.months
	} catch {
		return null
	}
}

export default diffMonths