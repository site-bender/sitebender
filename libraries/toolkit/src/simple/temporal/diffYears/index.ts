/**
 * Calculates the difference in years between two dates
 * 
 * Computes the number of whole years from the first date to the second date.
 * Returns a positive number if the second date is later, negative if earlier.
 * Partial years are truncated. Works with PlainDate, PlainDateTime, and
 * PlainYearMonth. Accounts for leap years correctly. Returns null for invalid inputs.
 * 
 * @curried (from) => (to) => result
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of whole years difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date1 = Temporal.PlainDate.from("2020-06-15")
 * const date2 = Temporal.PlainDate.from("2024-06-15")
 * diffYears(date1)(date2)                 // 4 years
 * diffYears(date2)(date1)                 // -4 years
 * diffYears(date1)(date1)                 // 0 years
 * 
 * // Partial years (truncated)
 * const jan2020 = Temporal.PlainDate.from("2020-01-15")
 * const dec2023 = Temporal.PlainDate.from("2023-12-14")
 * diffYears(jan2020)(dec2023)             // 3 years (not quite 4)
 * 
 * const dec2024 = Temporal.PlainDate.from("2024-12-16")
 * diffYears(jan2020)(dec2024)             // 4 years (over 4 years)
 * 
 * // Birthday calculation
 * const birth = Temporal.PlainDate.from("2000-03-15")
 * const beforeBirthday = Temporal.PlainDate.from("2024-03-14")
 * const onBirthday = Temporal.PlainDate.from("2024-03-15")
 * const afterBirthday = Temporal.PlainDate.from("2024-03-16")
 * 
 * diffYears(birth)(beforeBirthday)        // 23 years (day before 24th birthday)
 * diffYears(birth)(onBirthday)            // 24 years (on 24th birthday)
 * diffYears(birth)(afterBirthday)         // 24 years (day after 24th birthday)
 * 
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2020-02-29")
 * const nonLeap1 = Temporal.PlainDate.from("2023-02-28")
 * const nonLeap2 = Temporal.PlainDate.from("2023-03-01")
 * 
 * diffYears(leapDay)(nonLeap1)            // 2 years (not quite 3)
 * diffYears(leapDay)(nonLeap2)            // 3 years (passed anniversary)
 * 
 * // With PlainDateTime (time ignored)
 * const dt1 = Temporal.PlainDateTime.from("2020-06-15T10:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-06-15T08:00:00")
 * diffYears(dt1)(dt2)                     // 4 years
 * 
 * // With PlainYearMonth
 * const ym1 = Temporal.PlainYearMonth.from("2020-06")
 * const ym2 = Temporal.PlainYearMonth.from("2024-06")
 * diffYears(ym1)(ym2)                     // 4 years
 * 
 * // Partial application for age calculation
 * const birthDate = Temporal.PlainDate.from("1990-06-15")
 * const yearsSinceBirth = diffYears(birthDate)
 * 
 * const today = Temporal.Now.plainDateISO()
 * const age = yearsSinceBirth(today)      // Current age in years
 * 
 * // Employment duration
 * function getYearsOfService(
 *   hireDate: Temporal.PlainDate,
 *   terminationDate: Temporal.PlainDate | null = null
 * ): number | null {
 *   const endDate = terminationDate || Temporal.Now.plainDateISO()
 *   return diffYears(hireDate)(endDate)
 * }
 * 
 * const hired = Temporal.PlainDate.from("2015-09-01")
 * getYearsOfService(hired)                // Years of service (to today)
 * 
 * // Anniversary calculation
 * function getAnniversaryNumber(
 *   startDate: Temporal.PlainDate,
 *   checkDate: Temporal.PlainDate = Temporal.Now.plainDateISO()
 * ): number | null {
 *   return diffYears(startDate)(checkDate)
 * }
 * 
 * const wedding = Temporal.PlainDate.from("2000-07-15")
 * getAnniversaryNumber(wedding)           // Years married
 * 
 * // Generation calculation
 * function getGenerationGap(
 *   parentBirth: Temporal.PlainDate,
 *   childBirth: Temporal.PlainDate
 * ): number | null {
 *   return diffYears(parentBirth)(childBirth)
 * }
 * 
 * const parent = Temporal.PlainDate.from("1970-05-20")
 * const child = Temporal.PlainDate.from("1995-08-15")
 * getGenerationGap(parent, child)         // 25 years
 * 
 * // Retirement eligibility
 * function getYearsUntilRetirement(
 *   birthDate: Temporal.PlainDate,
 *   retirementAge: number = 65
 * ): number {
 *   const today = Temporal.Now.plainDateISO()
 *   const currentAge = diffYears(birthDate)(today)
 *   
 *   if (currentAge === null) return 0
 *   const yearsRemaining = retirementAge - currentAge
 *   return Math.max(0, yearsRemaining)
 * }
 * 
 * const employee = Temporal.PlainDate.from("1975-03-10")
 * getYearsUntilRetirement(employee)       // Years until age 65
 * 
 * // Historical periods
 * function getCenturiesBetween(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): number {
 *   const years = diffYears(date1)(date2)
 *   return years !== null ? Math.floor(Math.abs(years) / 100) : 0
 * }
 * 
 * const ancient = Temporal.PlainDate.from("0100-01-01")
 * const modern = Temporal.PlainDate.from("2024-01-01")
 * getCenturiesBetween(ancient, modern)    // 19 centuries
 * 
 * // Null handling
 * diffYears(null)(date2)                  // null
 * diffYears(date1)(null)                  // null
 * diffYears(null)(null)                   // null
 * 
 * // Educational milestones
 * function getSchoolYear(
 *   birthDate: Temporal.PlainDate,
 *   cutoffMonth: number = 9,  // September
 *   cutoffDay: number = 1
 * ): number | null {
 *   const currentYear = Temporal.Now.plainDateISO().year
 *   const cutoff = Temporal.PlainDate.from({
 *     year: currentYear,
 *     month: cutoffMonth,
 *     day: cutoffDay
 *   })
 *   
 *   // Adjust birth year for comparison
 *   const adjustedBirth = birthDate.month >= cutoffMonth && 
 *                        birthDate.day >= cutoffDay
 *     ? birthDate.add({ years: 1 })
 *     : birthDate
 *   
 *   return diffYears(adjustedBirth)(cutoff)
 * }
 * 
 * // Investment maturity
 * function getInvestmentYears(
 *   purchaseDate: Temporal.PlainDate,
 *   maturityDate: Temporal.PlainDate
 * ): number | null {
 *   return diffYears(purchaseDate)(maturityDate)
 * }
 * 
 * const bondPurchase = Temporal.PlainDate.from("2020-01-15")
 * const bondMaturity = Temporal.PlainDate.from("2030-01-15")
 * getInvestmentYears(bondPurchase, bondMaturity)  // 10 years
 * 
 * // Company age
 * function getCompanyAge(
 *   foundedDate: Temporal.PlainDate
 * ): { years: number; milestone: string } | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const years = diffYears(foundedDate)(today)
 *   
 *   if (years === null) return null
 *   
 *   let milestone = "startup"
 *   if (years >= 100) milestone = "centennial"
 *   else if (years >= 50) milestone = "established"
 *   else if (years >= 25) milestone = "mature"
 *   else if (years >= 10) milestone = "growing"
 *   else if (years >= 5) milestone = "early-stage"
 *   
 *   return { years, milestone }
 * }
 * 
 * const founded = Temporal.PlainDate.from("1999-03-15")
 * getCompanyAge(founded)
 * // { years: 25, milestone: "mature" }
 * 
 * // Academic tenure
 * function getTenureStatus(
 *   hireDate: Temporal.PlainDate,
 *   tenureYears: number = 7
 * ): { years: number; eligible: boolean } | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const years = diffYears(hireDate)(today)
 *   
 *   if (years === null) return null
 *   
 *   return {
 *     years,
 *     eligible: years >= tenureYears
 *   }
 * }
 * 
 * // Vintage classification
 * function getVintageCategory(
 *   manufactureDate: Temporal.PlainDate
 * ): "modern" | "retro" | "vintage" | "antique" {
 *   const today = Temporal.Now.plainDateISO()
 *   const years = diffYears(manufactureDate)(today)
 *   
 *   if (years === null || years < 20) return "modern"
 *   if (years < 40) return "retro"
 *   if (years < 100) return "vintage"
 *   return "antique"
 * }
 * 
 * // Mortgage term
 * function getRemainingMortgageYears(
 *   startDate: Temporal.PlainDate,
 *   termYears: number
 * ): number {
 *   const today = Temporal.Now.plainDateISO()
 *   const elapsed = diffYears(startDate)(today)
 *   
 *   if (elapsed === null) return termYears
 *   return Math.max(0, termYears - elapsed)
 * }
 * 
 * const mortgageStart = Temporal.PlainDate.from("2020-06-01")
 * getRemainingMortgageYears(mortgageStart, 30)  // Years remaining on 30-year mortgage
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past dates, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Truncated - Returns whole years only, partial years ignored
 */
const diffYears = (
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
		
		// Calculate difference in years
		const duration = toDate.since(fromDate, { largestUnit: 'years' })
		return duration.years
	} catch {
		return null
	}
}

export default diffYears