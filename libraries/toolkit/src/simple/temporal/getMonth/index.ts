/**
 * Gets the month component from a Temporal date or datetime
 * 
 * Extracts the month component from a Temporal PlainDate, PlainDateTime,
 * PlainYearMonth, PlainMonthDay, or ZonedDateTime. Returns the month number
 * where 1 represents January through 12 for December. The value depends on
 * the calendar system of the date. Returns null for invalid inputs to support
 * safe error handling.
 * 
 * @param date - The Temporal object to get month from
 * @returns The month number (1-12 for Gregorian), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const january = Temporal.PlainDate.from("2024-01-15")
 * getMonth(january)                       // 1 (January)
 * 
 * const june = Temporal.PlainDate.from("2024-06-15")
 * getMonth(june)                          // 6 (June)
 * 
 * const december = Temporal.PlainDate.from("2024-12-31")
 * getMonth(december)                      // 12 (December)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getMonth(datetime)                      // 3 (March)
 * 
 * const summer = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * getMonth(summer)                        // 7 (July)
 * 
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-09")
 * getMonth(yearMonth)                     // 9 (September)
 * 
 * const fiscal = Temporal.PlainYearMonth.from("2024-04")
 * getMonth(fiscal)                        // 4 (April - common fiscal year start)
 * 
 * // With PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("02-14")
 * getMonth(monthDay)                      // 2 (February - Valentine's Day)
 * 
 * const christmas = Temporal.PlainMonthDay.from("12-25")
 * getMonth(christmas)                     // 12 (December)
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-10-31T18:00:00-05:00[America/New_York]"
 * )
 * getMonth(zonedDateTime)                 // 10 (October - Halloween)
 * 
 * // Month name helper
 * function getMonthName(date: Temporal.PlainDate): string {
 *   const monthNames = [
 *     "January", "February", "March", "April", "May", "June",
 *     "July", "August", "September", "October", "November", "December"
 *   ]
 *   const month = getMonth(date)
 *   return month ? monthNames[month - 1] : "Unknown"
 * }
 * 
 * getMonthName(Temporal.PlainDate.from("2024-01-15"))  // "January"
 * getMonthName(Temporal.PlainDate.from("2024-06-15"))  // "June"
 * getMonthName(Temporal.PlainDate.from("2024-12-25"))  // "December"
 * 
 * // Short month name helper
 * function getShortMonthName(date: Temporal.PlainDate): string {
 *   const shortNames = [
 *     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
 *     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
 *   ]
 *   const month = getMonth(date)
 *   return month ? shortNames[month - 1] : "???"
 * }
 * 
 * getShortMonthName(Temporal.PlainDate.from("2024-03-15"))  // "Mar"
 * getShortMonthName(Temporal.PlainDate.from("2024-09-01"))  // "Sep"
 * 
 * // Quarter calculation
 * function getQuarter(date: Temporal.PlainDate): number {
 *   const month = getMonth(date)
 *   if (month === null) return 0
 *   
 *   return Math.ceil(month / 3)
 * }
 * 
 * getQuarter(Temporal.PlainDate.from("2024-02-15"))  // 1 (Q1)
 * getQuarter(Temporal.PlainDate.from("2024-05-15"))  // 2 (Q2)
 * getQuarter(Temporal.PlainDate.from("2024-08-15"))  // 3 (Q3)
 * getQuarter(Temporal.PlainDate.from("2024-11-15"))  // 4 (Q4)
 * 
 * // Season detection (Northern Hemisphere)
 * function getSeason(date: Temporal.PlainDate): string {
 *   const month = getMonth(date)
 *   if (month === null) return "Unknown"
 *   
 *   if (month >= 3 && month <= 5) return "Spring"
 *   if (month >= 6 && month <= 8) return "Summer"
 *   if (month >= 9 && month <= 11) return "Autumn"
 *   return "Winter"
 * }
 * 
 * getSeason(Temporal.PlainDate.from("2024-01-15"))  // "Winter"
 * getSeason(Temporal.PlainDate.from("2024-04-15"))  // "Spring"
 * getSeason(Temporal.PlainDate.from("2024-07-15"))  // "Summer"
 * getSeason(Temporal.PlainDate.from("2024-10-15"))  // "Autumn"
 * 
 * // Fiscal year helpers
 * function getFiscalQuarter(
 *   date: Temporal.PlainDate,
 *   fiscalYearStart: number = 4  // April
 * ): number {
 *   const month = getMonth(date)
 *   if (month === null) return 0
 *   
 *   const fiscalMonth = month >= fiscalYearStart ? 
 *     month - fiscalYearStart + 1 : 
 *     month + 13 - fiscalYearStart
 *   
 *   return Math.ceil(fiscalMonth / 3)
 * }
 * 
 * getFiscalQuarter(Temporal.PlainDate.from("2024-04-15"), 4)  // 1 (FQ1)
 * getFiscalQuarter(Temporal.PlainDate.from("2024-07-15"), 4)  // 2 (FQ2)
 * getFiscalQuarter(Temporal.PlainDate.from("2024-01-15"), 4)  // 4 (FQ4)
 * 
 * // Null handling
 * getMonth(null)                          // null
 * getMonth(undefined)                     // null
 * getMonth("2024-03-15")                 // null (string, not Temporal object)
 * getMonth(new Date())                    // null (Date, not Temporal)
 * 
 * // Month comparison
 * function isSameMonth(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   return getMonth(date1) === getMonth(date2)
 * }
 * 
 * const d1 = Temporal.PlainDate.from("2024-03-10")
 * const d2 = Temporal.PlainDate.from("2024-03-25")
 * const d3 = Temporal.PlainDate.from("2024-04-01")
 * isSameMonth(d1, d2)                     // true
 * isSameMonth(d1, d3)                     // false
 * 
 * // Birthday month check
 * function isBirthdayMonth(
 *   date: Temporal.PlainDate,
 *   birthMonth: number
 * ): boolean {
 *   return getMonth(date) === birthMonth
 * }
 * 
 * const today = Temporal.PlainDate.from("2024-03-15")
 * isBirthdayMonth(today, 3)               // true (March)
 * isBirthdayMonth(today, 6)               // false
 * 
 * // Monthly grouping
 * function groupByMonth(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<number, Array<Temporal.PlainDate>>()
 *   
 *   for (const date of dates) {
 *     const month = getMonth(date)
 *     if (month !== null) {
 *       const group = grouped.get(month) ?? []
 *       group.push(date)
 *       grouped.set(month, group)
 *     }
 *   }
 *   
 *   return grouped
 * }
 * 
 * // Monthly statistics
 * function getMonthlyStats(
 *   dates: Array<Temporal.PlainDate>
 * ): Record<string, number> {
 *   const stats: Record<string, number> = {}
 *   const monthNames = [
 *     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
 *     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
 *   ]
 *   
 *   for (const date of dates) {
 *     const month = getMonth(date)
 *     if (month !== null) {
 *       const name = monthNames[month - 1]
 *       stats[name] = (stats[name] ?? 0) + 1
 *     }
 *   }
 *   
 *   return stats
 * }
 * 
 * // Zodiac sign helper
 * function getZodiacSign(date: Temporal.PlainDate): string {
 *   const month = getMonth(date)
 *   const day = date.day
 *   
 *   if (month === null) return "Unknown"
 *   
 *   const signs = [
 *     { name: "Capricorn", start: [12, 22], end: [1, 19] },
 *     { name: "Aquarius", start: [1, 20], end: [2, 18] },
 *     { name: "Pisces", start: [2, 19], end: [3, 20] },
 *     { name: "Aries", start: [3, 21], end: [4, 19] },
 *     { name: "Taurus", start: [4, 20], end: [5, 20] },
 *     { name: "Gemini", start: [5, 21], end: [6, 20] },
 *     { name: "Cancer", start: [6, 21], end: [7, 22] },
 *     { name: "Leo", start: [7, 23], end: [8, 22] },
 *     { name: "Virgo", start: [8, 23], end: [9, 22] },
 *     { name: "Libra", start: [9, 23], end: [10, 22] },
 *     { name: "Scorpio", start: [10, 23], end: [11, 21] },
 *     { name: "Sagittarius", start: [11, 22], end: [12, 21] }
 *   ]
 *   
 *   for (const sign of signs) {
 *     const [startMonth, startDay] = sign.start
 *     const [endMonth, endDay] = sign.end
 *     
 *     if ((month === startMonth && day >= startDay) ||
 *         (month === endMonth && day <= endDay)) {
 *       return sign.name
 *     }
 *   }
 *   
 *   return "Capricorn"  // Dec 22 - Jan 19 wraps around
 * }
 * 
 * getZodiacSign(Temporal.PlainDate.from("2024-03-15"))  // "Pisces"
 * getZodiacSign(Temporal.PlainDate.from("2024-07-04"))  // "Cancer"
 * getZodiacSign(Temporal.PlainDate.from("2024-12-25"))  // "Capricorn"
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input
 * @property Range - Returns 1-12 for Gregorian calendar, varies for others
 */
const getMonth = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.PlainYearMonth | Temporal.PlainMonthDay |
	      Temporal.ZonedDateTime | null | undefined
): number | null => {
	if (date == null) {
		return null
	}
	
	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}
	
	try {
		return date.month
	} catch {
		return null
	}
}

export default getMonth