/**
 * Gets the year from a Temporal date or datetime
 *
 * Extracts the year component from a Temporal PlainDate, PlainDateTime,
 * PlainYearMonth, or ZonedDateTime. The year value depends on the calendar
 * system of the date. For the ISO calendar, negative years represent BCE
 * (Before Common Era). Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param date - The Temporal object to get year from
 * @returns The year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const currentYear = Temporal.PlainDate.from("2024-03-15")
 * getYear(currentYear)                    // 2024
 *
 * const ancientDate = Temporal.PlainDate.from("-000753-04-21")
 * getYear(ancientDate)                    // -753 (753 BCE - founding of Rome)
 *
 * const futureDate = Temporal.PlainDate.from("2150-01-01")
 * getYear(futureDate)                     // 2150
 *
 * const millennium = Temporal.PlainDate.from("2000-01-01")
 * getYear(millennium)                     // 2000
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * getYear(datetime)                       // 2024
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-09")
 * getYear(yearMonth)                      // 2024
 *
 * const fiscalYearMonth = Temporal.PlainYearMonth.from("2025-04")
 * getYear(fiscalYearMonth)                // 2025
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-12-31T23:59:59-05:00[America/New_York]"
 * )
 * getYear(zonedDateTime)                  // 2024
 *
 * // Different calendar systems
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 1,
 *   day: 1,
 *   calendar: "hebrew"
 * })
 * getYear(hebrewDate)                     // 5784 (Hebrew calendar year)
 *
 * const japaneseDate = Temporal.PlainDate.from({
 *   year: 2024,
 *   month: 1,
 *   day: 1,
 *   calendar: "japanese"
 * })
 * getYear(japaneseDate)                   // 2024 (Reiwa 6)
 *
 * // Century and millennium detection
 * function getCentury(date: Temporal.PlainDate): number {
 *   const year = getYear(date)
 *   if (year === null) return 0
 *
 *   return Math.ceil(year / 100)
 * }
 *
 * getCentury(Temporal.PlainDate.from("1999-12-31"))   // 20 (20th century)
 * getCentury(Temporal.PlainDate.from("2000-01-01"))   // 20 (20th century)
 * getCentury(Temporal.PlainDate.from("2001-01-01"))   // 21 (21st century)
 *
 * function getMillennium(date: Temporal.PlainDate): number {
 *   const year = getYear(date)
 *   if (year === null) return 0
 *
 *   return Math.ceil(year / 1000)
 * }
 *
 * getMillennium(Temporal.PlainDate.from("1999-12-31"))  // 2 (2nd millennium)
 * getMillennium(Temporal.PlainDate.from("2001-01-01"))  // 3 (3rd millennium)
 *
 * // Decade calculation
 * function getDecade(date: Temporal.PlainDate): number {
 *   const year = getYear(date)
 *   if (year === null) return 0
 *
 *   return Math.floor(year / 10) * 10
 * }
 *
 * getDecade(Temporal.PlainDate.from("2024-03-15"))  // 2020 (2020s)
 * getDecade(Temporal.PlainDate.from("1995-06-15"))  // 1990 (1990s)
 * getDecade(Temporal.PlainDate.from("2000-01-01"))  // 2000 (2000s)
 *
 * // Age calculation
 * function calculateAge(birthDate: Temporal.PlainDate): number {
 *   const today = Temporal.Now.plainDateISO()
 *   const birthYear = getYear(birthDate)
 *   const currentYear = getYear(today)
 *
 *   if (birthYear === null || currentYear === null) return 0
 *
 *   let age = currentYear - birthYear
 *
 *   // Adjust if birthday hasn't occurred this year
 *   if (today.month < birthDate.month ||
 *       (today.month === birthDate.month && today.day < birthDate.day)) {
 *     age--
 *   }
 *
 *   return age
 * }
 *
 * // Null handling
 * getYear(null)                           // null
 * getYear(undefined)                      // null
 * getYear("2024-03-15")                  // null (string, not Temporal object)
 * getYear(new Date())                     // null (Date, not Temporal)
 *
 * // Fiscal year helpers
 * function getFiscalYear(
 *   date: Temporal.PlainDate,
 *   fiscalYearStartMonth: number = 4  // April
 * ): number {
 *   const year = getYear(date)
 *   if (year === null) return 0
 *
 *   const month = date.month
 *
 *   // If before fiscal year start, belongs to previous fiscal year
 *   if (month < fiscalYearStartMonth) {
 *     return year - 1
 *   }
 *
 *   return year
 * }
 *
 * getFiscalYear(Temporal.PlainDate.from("2024-03-31"), 4)  // 2023 (FY2023)
 * getFiscalYear(Temporal.PlainDate.from("2024-04-01"), 4)  // 2024 (FY2024)
 *
 * // Academic year
 * function getAcademicYear(
 *   date: Temporal.PlainDate,
 *   academicYearStartMonth: number = 9  // September
 * ): string {
 *   const year = getYear(date)
 *   if (year === null) return "Unknown"
 *
 *   const month = date.month
 *
 *   if (month >= academicYearStartMonth) {
 *     return `${year}-${year + 1}`
 *   } else {
 *     return `${year - 1}-${year}`
 *   }
 * }
 *
 * getAcademicYear(Temporal.PlainDate.from("2024-09-15"))  // "2024-2025"
 * getAcademicYear(Temporal.PlainDate.from("2024-03-15"))  // "2023-2024"
 *
 * // Year comparison
 * function isSameYear(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate
 * ): boolean {
 *   return getYear(date1) === getYear(date2)
 * }
 *
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-12-31")
 * const date3 = Temporal.PlainDate.from("2025-01-01")
 * isSameYear(date1, date2)                // true
 * isSameYear(date2, date3)                // false
 *
 * // Historical era detection
 * function getEra(date: Temporal.PlainDate): string {
 *   const year = getYear(date)
 *   if (year === null) return "Unknown"
 *
 *   if (year < 0) return "BCE"
 *   if (year < 476) return "Ancient"
 *   if (year < 1453) return "Medieval"
 *   if (year < 1789) return "Early Modern"
 *   if (year < 1945) return "Modern"
 *   return "Contemporary"
 * }
 *
 * getEra(Temporal.PlainDate.from("-0500-01-01"))  // "BCE"
 * getEra(Temporal.PlainDate.from("0800-01-01"))   // "Medieval"
 * getEra(Temporal.PlainDate.from("1600-01-01"))   // "Early Modern"
 * getEra(Temporal.PlainDate.from("2024-01-01"))   // "Contemporary"
 *
 * // Leap year check helper
 * function isLeapYearFromDate(date: Temporal.PlainDate): boolean {
 *   const year = getYear(date)
 *   if (year === null) return false
 *
 *   return date.daysInYear === 366
 * }
 *
 * isLeapYearFromDate(Temporal.PlainDate.from("2024-03-15"))  // true
 * isLeapYearFromDate(Temporal.PlainDate.from("2023-03-15"))  // false
 *
 * // Year grouping for analytics
 * function groupByYear(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<number, Array<Temporal.PlainDate>>()
 *
 *   for (const date of dates) {
 *     const year = getYear(date)
 *     if (year !== null) {
 *       const group = grouped.get(year) ?? []
 *       group.push(date)
 *       grouped.set(year, group)
 *     }
 *   }
 *
 *   return grouped
 * }
 *
 * // Copyright year updater
 * function getCopyrightYears(startYear: number): string {
 *   const currentYear = getYear(Temporal.Now.plainDateISO())
 *   if (currentYear === null || currentYear === startYear) {
 *     return startYear.toString()
 *   }
 *
 *   return `${startYear}-${currentYear}`
 * }
 *
 * getCopyrightYears(2020)                 // "2020-2024" (assuming current year is 2024)
 *
 * // Generation categorization
 * function getGeneration(date: Temporal.PlainDate): string {
 *   const year = getYear(date)
 *   if (year === null) return "Unknown"
 *
 *   if (year >= 2013) return "Generation Alpha"
 *   if (year >= 1997) return "Generation Z"
 *   if (year >= 1981) return "Millennials"
 *   if (year >= 1965) return "Generation X"
 *   if (year >= 1946) return "Baby Boomers"
 *   if (year >= 1928) return "Silent Generation"
 *   if (year >= 1901) return "Greatest Generation"
 *   return "Lost Generation or earlier"
 * }
 *
 * getGeneration(Temporal.PlainDate.from("1985-06-15"))  // "Millennials"
 * getGeneration(Temporal.PlainDate.from("2000-01-01"))  // "Generation Z"
 *
 * // Olympic year detection
 * function isOlympicYear(date: Temporal.PlainDate): {
 *   summer: boolean,
 *   winter: boolean
 * } {
 *   const year = getYear(date)
 *   if (year === null) return { summer: false, winter: false }
 *
 *   // Summer Olympics: divisible by 4 (except 2020 held in 2021)
 *   const summer = year % 4 === 0 && year !== 2021
 *
 *   // Winter Olympics: even years not divisible by 4 (since 1994)
 *   const winter = year >= 1994 ?
 *     year % 4 === 2 :
 *     year % 4 === 0
 *
 *   return { summer, winter }
 * }
 *
 * isOlympicYear(Temporal.PlainDate.from("2024-07-15"))
 * // { summer: true, winter: false }
 *
 * isOlympicYear(Temporal.PlainDate.from("2026-02-15"))
 * // { summer: false, winter: true }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Calendar-aware - Respects the calendar system of the input
 * @property BCE-support - Negative years represent BCE dates
 */
const getYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (date == null) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.year
	} catch {
		return null
	}
}

export default getYear
