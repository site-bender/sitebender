/**
 * Gets the day of year from a Temporal date or datetime
 * 
 * Extracts the day of year (1-366) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for January 1st through 365/366 for December 31st
 * (depending on leap year). The value depends on the calendar system of the date.
 * Returns null for invalid inputs to support safe error handling.
 * 
 * @param date - The Temporal object to get day of year from
 * @returns The day of year (1-366), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const jan1 = Temporal.PlainDate.from("2024-01-01")
 * getDayOfYear(jan1)                      // 1 (first day of year)
 * 
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * getDayOfYear(jan31)                     // 31 (31st day of year)
 * 
 * const feb1 = Temporal.PlainDate.from("2024-02-01")
 * getDayOfYear(feb1)                      // 32 (32nd day of year)
 * 
 * const mar1 = Temporal.PlainDate.from("2024-03-01")
 * getDayOfYear(mar1)                      // 61 (31 + 29 + 1 in leap year)
 * 
 * const dec31 = Temporal.PlainDate.from("2024-12-31")
 * getDayOfYear(dec31)                     // 366 (leap year)
 * 
 * // Non-leap year
 * const mar1NonLeap = Temporal.PlainDate.from("2023-03-01")
 * getDayOfYear(mar1NonLeap)               // 60 (31 + 28 + 1)
 * 
 * const dec31NonLeap = Temporal.PlainDate.from("2023-12-31")
 * getDayOfYear(dec31NonLeap)              // 365 (non-leap year)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * getDayOfYear(datetime)                  // 186 (Independence Day)
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDayOfYear(zonedDateTime)             // 75
 * 
 * // Special dates
 * const valentines = Temporal.PlainDate.from("2024-02-14")
 * getDayOfYear(valentines)                // 45
 * 
 * const halloween = Temporal.PlainDate.from("2024-10-31")
 * getDayOfYear(halloween)                 // 305
 * 
 * const christmas = Temporal.PlainDate.from("2024-12-25")
 * getDayOfYear(christmas)                 // 360
 * 
 * // Leap day
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * getDayOfYear(leapDay)                   // 60
 * 
 * // Progress through year calculator
 * function yearProgress(date: Temporal.PlainDate): number {
 *   const dayOfYear = getDayOfYear(date)
 *   if (dayOfYear === null) return 0
 *   
 *   const daysInYear = date.daysInYear
 *   return (dayOfYear / daysInYear) * 100
 * }
 * 
 * const midYear = Temporal.PlainDate.from("2024-07-01")
 * yearProgress(midYear)                   // ~50.27% (183/366)
 * 
 * const endYear = Temporal.PlainDate.from("2024-12-31")
 * yearProgress(endYear)                   // 100%
 * 
 * // Days remaining in year
 * function daysRemainingInYear(date: Temporal.PlainDate): number {
 *   const dayOfYear = getDayOfYear(date)
 *   if (dayOfYear === null) return 0
 *   
 *   return date.daysInYear - dayOfYear
 * }
 * 
 * const today = Temporal.PlainDate.from("2024-03-15")
 * daysRemainingInYear(today)              // 291 days remaining
 * 
 * // Quarter calculation
 * function getQuarterFromDayOfYear(date: Temporal.PlainDate): number {
 *   const day = getDayOfYear(date)
 *   if (day === null) return 0
 *   
 *   // Approximate quarters (not exact due to varying month lengths)
 *   if (day <= 90) return 1       // Q1: ~Jan-Mar
 *   if (day <= 181) return 2      // Q2: ~Apr-Jun
 *   if (day <= 273) return 3      // Q3: ~Jul-Sep
 *   return 4                      // Q4: ~Oct-Dec
 * }
 * 
 * // Null handling
 * getDayOfYear(null)                      // null
 * getDayOfYear(undefined)                 // null
 * getDayOfYear("2024-03-15")             // null (string, not Temporal object)
 * getDayOfYear(new Date())                // null (Date, not Temporal)
 * 
 * // Date from day of year
 * function dateFromDayOfYear(
 *   year: number,
 *   dayOfYear: number
 * ): Temporal.PlainDate | null {
 *   try {
 *     const jan1 = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *     return jan1.add({ days: dayOfYear - 1 })
 *   } catch {
 *     return null
 *   }
 * }
 * 
 * dateFromDayOfYear(2024, 75)             // 2024-03-15
 * dateFromDayOfYear(2024, 366)            // 2024-12-31
 * 
 * // Julian date helper
 * function isJulianDayNumber(date: Temporal.PlainDate, target: number): boolean {
 *   return getDayOfYear(date) === target
 * }
 * 
 * const testDate = Temporal.PlainDate.from("2024-05-01")
 * isJulianDayNumber(testDate, 122)        // true (May 1 is day 122 in leap year)
 * 
 * // Seasonal calculations (Northern Hemisphere approximation)
 * function getSeason(date: Temporal.PlainDate): string {
 *   const day = getDayOfYear(date)
 *   if (day === null) return "Unknown"
 *   
 *   // Approximate seasonal boundaries
 *   if (day < 80 || day >= 355) return "Winter"
 *   if (day < 172) return "Spring"
 *   if (day < 264) return "Summer"
 *   return "Autumn"
 * }
 * 
 * getSeason(Temporal.PlainDate.from("2024-01-15"))  // "Winter"
 * getSeason(Temporal.PlainDate.from("2024-04-15"))  // "Spring"
 * getSeason(Temporal.PlainDate.from("2024-07-15"))  // "Summer"
 * getSeason(Temporal.PlainDate.from("2024-10-15"))  // "Autumn"
 * 
 * // Academic calendar helper
 * function getAcademicWeek(date: Temporal.PlainDate, startDay: number = 244): number {
 *   // Assuming academic year starts around September 1 (day 244)
 *   const day = getDayOfYear(date)
 *   if (day === null) return 0
 *   
 *   const academicDay = day >= startDay ? 
 *     day - startDay + 1 : 
 *     date.daysInYear - startDay + day + 1
 *   
 *   return Math.ceil(academicDay / 7)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input date
 */
const getDayOfYear = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): number | null => {
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
		return date.dayOfYear
	} catch {
		return null
	}
}

export default getDayOfYear