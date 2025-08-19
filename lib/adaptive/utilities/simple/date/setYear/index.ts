/**
 * Returns a new date with the year set to the specified value
 * 
 * Creates a new Temporal date or datetime with the year changed to the specified
 * value. Handles leap year transitions gracefully - if setting a non-leap year
 * on February 29, it will be constrained to February 28. This is a curried
 * function for easy composition. Returns null for invalid inputs to support safe
 * error handling.
 * 
 * @curried (year) => (date) => new date
 * @param year - The year to set
 * @param date - The Temporal date to modify
 * @returns New date with updated year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setYear(2025)(date)                     // PlainDate 2025-03-15
 * setYear(2000)(date)                     // PlainDate 2000-03-15
 * setYear(2030)(date)                     // PlainDate 2030-03-15
 * setYear(1999)(date)                     // PlainDate 1999-03-15
 * 
 * // Leap year handling (February 29)
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * setYear(2024)(leapDay)                  // PlainDate 2024-02-29 (leap year)
 * setYear(2023)(leapDay)                  // PlainDate 2023-02-28 (constrained)
 * setYear(2025)(leapDay)                  // PlainDate 2025-02-28 (constrained)
 * setYear(2028)(leapDay)                  // PlainDate 2028-02-29 (leap year)
 * 
 * // Century leap year rules
 * setYear(2000)(leapDay)                  // PlainDate 2000-02-29 (divisible by 400)
 * setYear(1900)(leapDay)                  // PlainDate 1900-02-28 (not divisible by 400)
 * setYear(2100)(leapDay)                  // PlainDate 2100-02-28 (not divisible by 400)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setYear(2025)(datetime)                 // PlainDateTime 2025-03-15T10:30:45
 * setYear(2020)(datetime)                 // PlainDateTime 2020-03-15T10:30:45
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setYear(2025)(zonedDateTime)            // ZonedDateTime 2025-03-15T10:30:00-04:00[America/New_York]
 * 
 * // Historical dates
 * const historicalDate = Temporal.PlainDate.from("2024-07-04")
 * setYear(1776)(historicalDate)           // PlainDate 1776-07-04
 * setYear(1492)(historicalDate)           // PlainDate 1492-07-04
 * 
 * // Future dates
 * const futureDate = Temporal.PlainDate.from("2024-01-01")
 * setYear(2100)(futureDate)               // PlainDate 2100-01-01
 * setYear(3000)(futureDate)               // PlainDate 3000-01-01
 * 
 * // Invalid year handling
 * setYear(-1)(date)                       // PlainDate -0001-03-15 (1 BCE)
 * setYear(0)(date)                        // PlainDate 0000-03-15 (valid in Temporal)
 * setYear(275760)(date)                   // null (exceeds Temporal max year)
 * setYear(-271821)(date)                  // null (exceeds Temporal min year)
 * setYear(2024.5)(date)                   // null (must be integer)
 * 
 * // Null handling
 * setYear(2025)(null)                     // null
 * setYear(2025)(undefined)                // null
 * setYear(2025)("2024-03-15" as any)     // null (string, not Temporal)
 * 
 * // Anniversary calculator
 * function calculateAnniversary(
 *   originalDate: Temporal.PlainDate,
 *   yearsLater: number
 * ): Temporal.PlainDate | null {
 *   const targetYear = originalDate.year + yearsLater
 *   return setYear(targetYear)(originalDate)
 * }
 * 
 * const weddingDate = Temporal.PlainDate.from("2000-06-15")
 * calculateAnniversary(weddingDate, 25)   // PlainDate 2025-06-15 (25th anniversary)
 * calculateAnniversary(weddingDate, 50)   // PlainDate 2050-06-15 (50th anniversary)
 * 
 * // Leap year birthday adjustment
 * const leapBirthday = Temporal.PlainDate.from("2000-02-29")
 * calculateAnniversary(leapBirthday, 1)   // PlainDate 2001-02-28 (constrained)
 * calculateAnniversary(leapBirthday, 4)   // PlainDate 2004-02-29 (leap year)
 * 
 * // Fiscal year converter
 * function setToFiscalYear(
 *   date: Temporal.PlainDate,
 *   fiscalYear: number,
 *   fiscalYearStartMonth: number = 4  // April by default
 * ): Temporal.PlainDate | null {
 *   // Determine calendar year based on fiscal year and current month
 *   const calendarYear = date.month >= fiscalYearStartMonth 
 *     ? fiscalYear 
 *     : fiscalYear - 1
 *   
 *   return setYear(calendarYear)(date)
 * }
 * 
 * const taxDate = Temporal.PlainDate.from("2024-01-15")
 * setToFiscalYear(taxDate, 2024, 4)       // PlainDate 2023-01-15 (before April)
 * 
 * const laterDate = Temporal.PlainDate.from("2024-06-15")
 * setToFiscalYear(laterDate, 2024, 4)     // PlainDate 2024-06-15 (after April)
 * 
 * // Academic year setter
 * function setToAcademicYear(
 *   date: Temporal.PlainDate,
 *   academicYear: number
 * ): Temporal.PlainDate | null {
 *   // Academic year typically starts in September
 *   const calendarYear = date.month >= 9 
 *     ? academicYear 
 *     : academicYear + 1
 *   
 *   return setYear(calendarYear)(date)
 * }
 * 
 * const fallSemester = Temporal.PlainDate.from("2024-10-15")
 * setToAcademicYear(fallSemester, 2024)   // PlainDate 2024-10-15
 * 
 * const springSemester = Temporal.PlainDate.from("2024-02-15")
 * setToAcademicYear(springSemester, 2024) // PlainDate 2025-02-15
 * 
 * // Historical event mapper
 * function mapToHistoricalYear(
 *   modernDate: Temporal.PlainDate,
 *   historicalYear: number
 * ): Temporal.PlainDate | null {
 *   return setYear(historicalYear)(modernDate)
 * }
 * 
 * const currentEvent = Temporal.PlainDate.from("2024-07-14")
 * mapToHistoricalYear(currentEvent, 1789) // PlainDate 1789-07-14 (Bastille Day)
 * 
 * // Batch year processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-06-30"),
 *   Temporal.PlainDate.from("2024-12-25")
 * ]
 * 
 * const setTo2025 = setYear(2025)
 * dates.map(setTo2025)
 * // [2025-01-15, 2025-06-30, 2025-12-25]
 * 
 * // Decade jumper
 * function jumpDecades(
 *   date: Temporal.PlainDate,
 *   decades: number
 * ): Temporal.PlainDate | null {
 *   const targetYear = date.year + (decades * 10)
 *   return setYear(targetYear)(date)
 * }
 * 
 * const startDate = Temporal.PlainDate.from("2024-03-15")
 * jumpDecades(startDate, 1)               // PlainDate 2034-03-15
 * jumpDecades(startDate, -2)              // PlainDate 2004-03-15
 * jumpDecades(startDate, 5)               // PlainDate 2074-03-15
 * 
 * // Century marker
 * function setCentury(
 *   date: Temporal.PlainDate,
 *   century: number
 * ): Temporal.PlainDate | null {
 *   const baseYear = (century - 1) * 100
 *   const yearInCentury = date.year % 100
 *   return setYear(baseYear + yearInCentury)(date)
 * }
 * 
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * setCentury(someDate, 19)                // PlainDate 1824-03-15
 * setCentury(someDate, 20)                // PlainDate 1924-03-15
 * setCentury(someDate, 21)                // PlainDate 2024-03-15
 * setCentury(someDate, 22)                // PlainDate 2124-03-15
 * 
 * // Millennium setter
 * function setMillennium(
 *   date: Temporal.PlainDate,
 *   millennium: number
 * ): Temporal.PlainDate | null {
 *   const baseYear = (millennium - 1) * 1000
 *   const yearInMillennium = date.year % 1000
 *   return setYear(baseYear + yearInMillennium)(date)
 * }
 * 
 * const currentDate = Temporal.PlainDate.from("2024-03-15")
 * setMillennium(currentDate, 2)           // PlainDate 1024-03-15
 * setMillennium(currentDate, 3)           // PlainDate 2024-03-15
 * setMillennium(currentDate, 4)           // PlainDate 3024-03-15
 * 
 * // Contract renewal with year update
 * function renewContract(
 *   contractDate: Temporal.PlainDate,
 *   renewalYears: number
 * ): Temporal.PlainDate | null {
 *   const renewalYear = contractDate.year + renewalYears
 *   
 *   // Handle Feb 29 for multi-year contracts
 *   return setYear(renewalYear)(contractDate)
 * }
 * 
 * const contractStart = Temporal.PlainDate.from("2020-02-29")
 * renewContract(contractStart, 1)         // PlainDate 2021-02-28 (constrained)
 * renewContract(contractStart, 4)         // PlainDate 2024-02-29 (leap year)
 * renewContract(contractStart, 5)         // PlainDate 2025-02-28 (constrained)
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Constrained - Handles leap year transitions gracefully
 */
const setYear = (year: number) => (
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
	
	// Validate year is an integer
	if (!Number.isInteger(year)) {
		return null
	}
	
	// Temporal year limits
	const MIN_YEAR = -271821
	const MAX_YEAR = 275760
	
	if (year < MIN_YEAR || year > MAX_YEAR) {
		return null
	}
	
	try {
		// Use 'constrain' overflow mode to handle Feb 29 in non-leap years
		return date.with({ year }, { overflow: 'constrain' })
	} catch {
		return null
	}
}

export default setYear