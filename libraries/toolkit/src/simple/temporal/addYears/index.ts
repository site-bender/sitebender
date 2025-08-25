/**
 * Adds years to a Temporal PlainDate, PlainDateTime, or PlainYearMonth
 *
 * Immutably adds the specified number of years to a date or datetime.
 * Returns a new Temporal object with the years added. Negative values
 * subtract years. Handles leap year adjustments automatically - if the
 * target date doesn't exist (e.g., Feb 29 in non-leap year), adjusts
 * to the last valid day of the month. Returns null for invalid inputs.
 *
 * @curried (years) => (date) => result
 * @param years - Number of years to add (negative to subtract)
 * @param date - The PlainDate, PlainDateTime, or PlainYearMonth to add years to
 * @returns New date/datetime with years added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * addYears(1)(date)                       // PlainDate 2025-03-15
 * addYears(5)(date)                       // PlainDate 2029-03-15
 * addYears(-2)(date)                      // PlainDate 2022-03-15
 * addYears(10)(date)                      // PlainDate 2034-03-15
 *
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * addYears(1)(leapDay)                    // PlainDate 2025-02-28 (not leap year)
 * addYears(4)(leapDay)                    // PlainDate 2028-02-29 (leap year)
 * addYears(-1)(leapDay)                   // PlainDate 2023-02-28 (not leap year)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addYears(2)(datetime)                   // PlainDateTime 2026-03-15T10:30:00
 * addYears(-10)(datetime)                 // PlainDateTime 2014-03-15T10:30:00
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * addYears(1)(yearMonth)                  // PlainYearMonth 2025-03
 * addYears(-5)(yearMonth)                 // PlainYearMonth 2019-03
 * addYears(100)(yearMonth)                // PlainYearMonth 2124-03
 *
 * // Partial application for common operations
 * const nextYear = addYears(1)
 * const previousYear = addYears(-1)
 * const addDecade = addYears(10)
 * const addCentury = addYears(100)
 *
 * const today = Temporal.Now.plainDateISO()
 * nextYear(today)                         // Same date next year
 * previousYear(today)                     // Same date last year
 * addDecade(today)                        // 10 years from now
 *
 * // Age calculations
 * function getFutureBirthday(
 *   birthDate: Temporal.PlainDate,
 *   yearsAhead: number
 * ): Temporal.PlainDate | null {
 *   return addYears(yearsAhead)(birthDate)
 * }
 *
 * const birth = Temporal.PlainDate.from("2000-06-15")
 * getFutureBirthday(birth, 25)            // PlainDate 2025-06-15 (25th birthday)
 * getFutureBirthday(birth, 50)            // PlainDate 2050-06-15 (50th birthday)
 *
 * // Anniversary calculations
 * function getAnniversaries(
 *   startDate: Temporal.PlainDate,
 *   years: Array<number>
 * ): Array<{ year: number; date: Temporal.PlainDate | null }> {
 *   return years.map(year => ({
 *     year,
 *     date: addYears(year)(startDate)
 *   }))
 * }
 *
 * const wedding = Temporal.PlainDate.from("2020-07-18")
 * const milestones = getAnniversaries(wedding, [1, 5, 10, 25, 50])
 * // Important anniversary dates
 *
 * // Retirement planning
 * function getRetirementDate(
 *   birthDate: Temporal.PlainDate,
 *   retirementAge: number = 65
 * ): Temporal.PlainDate | null {
 *   return addYears(retirementAge)(birthDate)
 * }
 *
 * const employee = Temporal.PlainDate.from("1985-09-20")
 * getRetirementDate(employee)             // PlainDate 2050-09-20
 * getRetirementDate(employee, 67)         // PlainDate 2052-09-20
 *
 * // Historical dates
 * function getHistoricalDate(
 *   event: Temporal.PlainDate,
 *   yearsAgo: number
 * ): Temporal.PlainDate | null {
 *   return addYears(-yearsAgo)(event)
 * }
 *
 * const currentEvent = Temporal.PlainDate.from("2024-01-01")
 * getHistoricalDate(currentEvent, 50)     // PlainDate 1974-01-01
 * getHistoricalDate(currentEvent, 100)    // PlainDate 1924-01-01
 * getHistoricalDate(currentEvent, 200)    // PlainDate 1824-01-01
 *
 * // Investment maturity
 * function getMaturityDate(
 *   purchaseDate: Temporal.PlainDate,
 *   termYears: number
 * ): Temporal.PlainDate | null {
 *   return addYears(termYears)(purchaseDate)
 * }
 *
 * const bond = Temporal.PlainDate.from("2024-03-15")
 * getMaturityDate(bond, 5)                // PlainDate 2029-03-15 (5-year bond)
 * getMaturityDate(bond, 10)               // PlainDate 2034-03-15 (10-year bond)
 * getMaturityDate(bond, 30)               // PlainDate 2054-03-15 (30-year bond)
 *
 * // Academic year planning
 * function getGraduationYear(
 *   enrollmentDate: Temporal.PlainDate,
 *   programYears: number
 * ): Temporal.PlainYearMonth | null {
 *   const enrollmentYearMonth = Temporal.PlainYearMonth.from(enrollmentDate)
 *   return addYears(programYears)(enrollmentYearMonth)
 * }
 *
 * const enrolled = Temporal.PlainDate.from("2024-09-01")
 * getGraduationYear(enrolled, 4)          // PlainYearMonth 2028-09 (4-year program)
 *
 * // Null handling
 * addYears(5)(null)                       // null
 * addYears(5)(undefined)                  // null
 * addYears(5)("invalid")                  // null
 *
 * // Climate projections
 * function getProjectionYear(
 *   baseYear: Temporal.PlainYearMonth,
 *   scenarioYears: Array<number>
 * ): Array<Temporal.PlainYearMonth | null> {
 *   return scenarioYears.map(years => addYears(years)(baseYear))
 * }
 *
 * const baseline = Temporal.PlainYearMonth.from("2020-01")
 * const projections = getProjectionYear(baseline, [10, 30, 50, 80])
 * // [2030-01, 2050-01, 2070-01, 2100-01]
 *
 * // Warranty expiration
 * function getWarrantyExpiry(
 *   purchaseDate: Temporal.PlainDate,
 *   warrantyYears: number
 * ): Temporal.PlainDate | null {
 *   const expiry = addYears(warrantyYears)(purchaseDate)
 *   // Warranty expires day before anniversary
 *   return expiry ? expiry.subtract({ days: 1 }) : null
 * }
 *
 * const purchase = Temporal.PlainDate.from("2024-03-15")
 * getWarrantyExpiry(purchase, 1)          // PlainDate 2025-03-14
 * getWarrantyExpiry(purchase, 3)          // PlainDate 2027-03-14
 *
 * // Century calculations
 * function getCentury(
 *   date: Temporal.PlainDate,
 *   centuriesAhead: number
 * ): Temporal.PlainDate | null {
 *   return addYears(centuriesAhead * 100)(date)
 * }
 *
 * const millennium = Temporal.PlainDate.from("2000-01-01")
 * getCentury(millennium, 1)               // PlainDate 2100-01-01
 * getCentury(millennium, 5)               // PlainDate 2500-01-01
 *
 * // Generational planning
 * function getGenerationalDates(
 *   ancestorBirth: Temporal.PlainDate,
 *   generationGap: number = 25
 * ): Array<Temporal.PlainDate | null> {
 *   return [1, 2, 3, 4, 5].map(gen =>
 *     addYears(gen * generationGap)(ancestorBirth)
 *   )
 * }
 *
 * const ancestor = Temporal.PlainDate.from("1900-01-01")
 * getGenerationalDates(ancestor)
 * // Approximate birth years for 5 generations
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new date without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property LeapAware - Handles leap year edge cases automatically
 */
const addYears = (years: number) =>
(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| null => {
	if (date == null) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth)
	) {
		return null
	}

	try {
		return date.add({ years })
	} catch {
		return null
	}
}

export default addYears
