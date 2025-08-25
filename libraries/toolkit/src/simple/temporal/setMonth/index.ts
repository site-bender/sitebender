/**
 * Returns a new date with the month set to the specified value
 *
 * Creates a new Temporal date or datetime with the month changed to the specified
 * value (1-12, where 1 is January and 12 is December). If the day doesn't exist
 * in the target month (e.g., January 31 → February 31), it will be constrained
 * to the last valid day of that month (February 28/29). This is a curried function
 * for easy composition. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @curried (month) => (date) => new date
 * @param month - The month to set (1-12)
 * @param date - The Temporal date to modify
 * @returns New date with updated month, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * setMonth(1)(date)                       // PlainDate 2024-01-15 (January)
 * setMonth(6)(date)                       // PlainDate 2024-06-15 (June)
 * setMonth(12)(date)                      // PlainDate 2024-12-15 (December)
 *
 * // Day overflow handling (31st to shorter months)
 * const endOfMonth = Temporal.PlainDate.from("2024-01-31")
 * setMonth(2)(endOfMonth)                 // PlainDate 2024-02-29 (leap year, constrained)
 * setMonth(4)(endOfMonth)                 // PlainDate 2024-04-30 (April has 30 days)
 * setMonth(6)(endOfMonth)                 // PlainDate 2024-06-30 (June has 30 days)
 * setMonth(9)(endOfMonth)                 // PlainDate 2024-09-30 (September has 30 days)
 * setMonth(11)(endOfMonth)                // PlainDate 2024-11-30 (November has 30 days)
 *
 * // Non-leap year February
 * const nonLeapDate = Temporal.PlainDate.from("2023-01-31")
 * setMonth(2)(nonLeapDate)                // PlainDate 2023-02-28 (constrained)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setMonth(1)(datetime)                   // PlainDateTime 2024-01-15T10:30:45
 * setMonth(7)(datetime)                   // PlainDateTime 2024-07-15T10:30:45
 * setMonth(12)(datetime)                  // PlainDateTime 2024-12-15T10:30:45
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * setMonth(1)(zonedDateTime)              // ZonedDateTime 2024-01-15T10:30:00-05:00[America/New_York]
 * // Note: offset may change due to DST
 *
 * // Invalid month handling
 * setMonth(0)(date)                       // null (month must be >= 1)
 * setMonth(13)(date)                      // null (month must be <= 12)
 * setMonth(-1)(date)                      // null (negative month)
 * setMonth(6.5)(date)                     // null (must be integer)
 *
 * // Null handling
 * setMonth(6)(null)                       // null
 * setMonth(6)(undefined)                  // null
 * setMonth(6)("2024-03-15" as any)       // null (string, not Temporal)
 *
 * // Quarter selector
 * function setToQuarter(
 *   date: Temporal.PlainDate,
 *   quarter: 1 | 2 | 3 | 4
 * ): Temporal.PlainDate | null {
 *   const quarterMonths = {
 *     1: 1,  // January
 *     2: 4,  // April
 *     3: 7,  // July
 *     4: 10  // October
 *   }
 *
 *   return setMonth(quarterMonths[quarter])(date)
 * }
 *
 * const someDate = Temporal.PlainDate.from("2024-06-15")
 * setToQuarter(someDate, 1)               // 2024-01-15 (Q1)
 * setToQuarter(someDate, 2)               // 2024-04-15 (Q2)
 * setToQuarter(someDate, 3)               // 2024-07-15 (Q3)
 * setToQuarter(someDate, 4)               // 2024-10-15 (Q4)
 *
 * // Fiscal year calculator
 * function setToFiscalMonth(
 *   date: Temporal.PlainDate,
 *   fiscalMonth: number,
 *   fiscalYearStart: number = 4  // April by default
 * ): Temporal.PlainDate | null {
 *   if (fiscalMonth < 1 || fiscalMonth > 12) return null
 *
 *   const calendarMonth = ((fiscalMonth - 1 + fiscalYearStart - 1) % 12) + 1
 *   return setMonth(calendarMonth)(date)
 * }
 *
 * const businessDate = Temporal.PlainDate.from("2024-06-15")
 * setToFiscalMonth(businessDate, 1, 4)    // 2024-04-15 (fiscal month 1 = April)
 * setToFiscalMonth(businessDate, 12, 4)   // 2024-03-15 (fiscal month 12 = March)
 *
 * // Birthday month adjuster
 * function adjustToBirthdayMonth(
 *   currentDate: Temporal.PlainDate,
 *   birthMonth: number
 * ): Temporal.PlainDate | null {
 *   const adjusted = setMonth(birthMonth)(currentDate)
 *
 *   // If the birthday hasn't happened yet this year
 *   if (adjusted && adjusted.month === birthMonth &&
 *       currentDate.month > birthMonth) {
 *     return adjusted.add({ years: 1 })
 *   }
 *
 *   return adjusted
 * }
 *
 * const today = Temporal.PlainDate.from("2024-08-15")
 * adjustToBirthdayMonth(today, 3)         // 2025-03-15 (March already passed)
 * adjustToBirthdayMonth(today, 10)        // 2024-10-15 (October still coming)
 *
 * // Monthly report generator
 * function generateMonthlyReports(
 *   year: number,
 *   day: number
 * ): Array<Temporal.PlainDate | null> {
 *   const baseDate = Temporal.PlainDate.from({ year, month: 1, day })
 *   const reports: Array<Temporal.PlainDate | null> = []
 *
 *   for (let month = 1; month <= 12; month++) {
 *     reports.push(setMonth(month)(baseDate))
 *   }
 *
 *   return reports
 * }
 *
 * generateMonthlyReports(2024, 15)
 * // [Jan 15, Feb 15, Mar 15, ..., Dec 15] all in 2024
 *
 * generateMonthlyReports(2024, 31)
 * // [Jan 31, Feb 29, Mar 31, Apr 30, May 31, Jun 30, Jul 31, Aug 31, Sep 30, Oct 31, Nov 30, Dec 31]
 * // Note: constrained for shorter months
 *
 * // Season setter
 * function setToSeason(
 *   date: Temporal.PlainDate,
 *   season: "spring" | "summer" | "autumn" | "winter"
 * ): Temporal.PlainDate | null {
 *   const seasonMonths = {
 *     spring: 3,   // March
 *     summer: 6,   // June
 *     autumn: 9,   // September
 *     winter: 12   // December
 *   }
 *
 *   return setMonth(seasonMonths[season])(date)
 * }
 *
 * const currentDate = Temporal.PlainDate.from("2024-01-15")
 * setToSeason(currentDate, "spring")      // 2024-03-15
 * setToSeason(currentDate, "summer")      // 2024-06-15
 * setToSeason(currentDate, "autumn")      // 2024-09-15
 * setToSeason(currentDate, "winter")      // 2024-12-15
 *
 * // Batch date processing
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-15"),
 *   Temporal.PlainDate.from("2024-03-15")
 * ]
 *
 * const setToJune = setMonth(6)
 * dates.map(setToJune)
 * // [2024-06-15, 2024-06-15, 2024-06-15]
 *
 * // Contract renewal calculator
 * function calculateRenewalDate(
 *   startDate: Temporal.PlainDate,
 *   contractMonths: number
 * ): Temporal.PlainDate | null {
 *   const renewalDate = startDate.add({ months: contractMonths })
 *
 *   // Ensure same day of month if possible
 *   return setMonth(renewalDate.month)(
 *     startDate.with({ year: renewalDate.year })
 *   )
 * }
 *
 * const contractStart = Temporal.PlainDate.from("2024-01-31")
 * calculateRenewalDate(contractStart, 6)  // 2024-07-31
 * calculateRenewalDate(contractStart, 13) // 2025-02-28 (constrained for February)
 *
 * // Academic semester setter
 * function setToSemester(
 *   date: Temporal.PlainDate,
 *   semester: "fall" | "spring" | "summer"
 * ): Temporal.PlainDate | null {
 *   const semesterMonths = {
 *     fall: 9,    // September
 *     spring: 1,  // January
 *     summer: 5   // May
 *   }
 *
 *   return setMonth(semesterMonths[semester])(date)
 * }
 *
 * const academicDate = Temporal.PlainDate.from("2024-03-15")
 * setToSemester(academicDate, "fall")     // 2024-09-15
 * setToSemester(academicDate, "spring")   // 2024-01-15
 * setToSemester(academicDate, "summer")   // 2024-05-15
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Constrained - Automatically constrains days to valid range for month
 */
const setMonth = (month: number) =>
(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| null => {
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

	// Validate month is in valid range
	if (month < 1 || month > 12 || !Number.isInteger(month)) {
		return null
	}

	try {
		// Use 'constrain' overflow mode to handle day overflow gracefully
		return date.with({ month }, { overflow: "constrain" })
	} catch {
		return null
	}
}

export default setMonth
