/**
 * Gets the ISO week number of the year from a Temporal date or datetime
 * 
 * Returns the ISO 8601 week number (1-53) for a given date. ISO weeks start on
 * Monday and the first week of the year is the week containing the first Thursday
 * of January (or equivalently, the week containing January 4th). Some years have
 * 53 weeks. Returns null for invalid inputs to support safe error handling.
 * 
 * @param date - The Temporal object to get week number from
 * @returns The ISO week number (1-53), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const midYear = Temporal.PlainDate.from("2024-07-15")
 * getWeekOfYear(midYear)                  // 29 (29th week of 2024)
 * 
 * const firstWeek = Temporal.PlainDate.from("2024-01-04")
 * getWeekOfYear(firstWeek)                // 1 (always in week 1 by ISO definition)
 * 
 * const lastWeek2024 = Temporal.PlainDate.from("2024-12-30")
 * getWeekOfYear(lastWeek2024)             // 1 (belongs to week 1 of 2025!)
 * 
 * const actualLastWeek = Temporal.PlainDate.from("2024-12-29")
 * getWeekOfYear(actualLastWeek)           // 52 (last week of 2024)
 * 
 * // Edge cases around year boundaries
 * const dec31_2023 = Temporal.PlainDate.from("2023-12-31")
 * getWeekOfYear(dec31_2023)               // 52 (Sunday, last week of 2023)
 * 
 * const jan1_2024 = Temporal.PlainDate.from("2024-01-01")
 * getWeekOfYear(jan1_2024)                // 1 (Monday, first week of 2024)
 * 
 * const jan1_2025 = Temporal.PlainDate.from("2025-01-01")
 * getWeekOfYear(jan1_2025)                // 1 (Wednesday, still week 1)
 * 
 * // Years with 53 weeks
 * const week53_2020 = Temporal.PlainDate.from("2020-12-31")
 * getWeekOfYear(week53_2020)              // 53 (2020 had 53 weeks)
 * 
 * const week53_2026 = Temporal.PlainDate.from("2026-12-31")
 * getWeekOfYear(week53_2026)              // 53 (2026 will have 53 weeks)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-06-15T10:30:00")
 * getWeekOfYear(datetime)                 // 24
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getWeekOfYear(zonedDateTime)            // 11
 * 
 * // ISO week year vs calendar year
 * function getISOWeekYear(date: Temporal.PlainDate): number {
 *   const week = getWeekOfYear(date)
 *   if (week === null) return date.year
 *   
 *   // If in week 1 but in December, belongs to next year
 *   if (week === 1 && date.month === 12) {
 *     return date.year + 1
 *   }
 *   
 *   // If in week 52/53 but in January, belongs to previous year
 *   if (week >= 52 && date.month === 1) {
 *     return date.year - 1
 *   }
 *   
 *   return date.year
 * }
 * 
 * getISOWeekYear(Temporal.PlainDate.from("2024-12-30"))  // 2025
 * getISOWeekYear(Temporal.PlainDate.from("2024-01-01"))  // 2024
 * getISOWeekYear(Temporal.PlainDate.from("2023-01-01"))  // 2022 (belongs to week 52 of 2022)
 * 
 * // Week progress tracker
 * function getWeekProgress(date: Temporal.PlainDate): {
 *   week: number,
 *   dayOfWeek: number,
 *   progress: number
 * } | null {
 *   const week = getWeekOfYear(date)
 *   if (week === null) return null
 *   
 *   const dayOfWeek = date.dayOfWeek
 *   const progress = (dayOfWeek / 7) * 100
 *   
 *   return { week, dayOfWeek, progress }
 * }
 * 
 * getWeekProgress(Temporal.PlainDate.from("2024-03-11"))  // Monday
 * // { week: 11, dayOfWeek: 1, progress: 14.29 }
 * 
 * getWeekProgress(Temporal.PlainDate.from("2024-03-15"))  // Friday
 * // { week: 11, dayOfWeek: 5, progress: 71.43 }
 * 
 * // Total weeks in year
 * function getTotalWeeksInYear(year: number): number {
 *   const lastDay = Temporal.PlainDate.from({ year, month: 12, day: 31 })
 *   const lastWeek = getWeekOfYear(lastDay)
 *   
 *   // If last day is in week 1 of next year, check Dec 24 (always in last week)
 *   if (lastWeek === 1) {
 *     const dec24 = Temporal.PlainDate.from({ year, month: 12, day: 24 })
 *     return getWeekOfYear(dec24) ?? 52
 *   }
 *   
 *   return lastWeek ?? 52
 * }
 * 
 * getTotalWeeksInYear(2024)               // 52
 * getTotalWeeksInYear(2020)               // 53
 * getTotalWeeksInYear(2026)               // 53
 * 
 * // Null handling
 * getWeekOfYear(null)                     // null
 * getWeekOfYear(undefined)                // null
 * getWeekOfYear("2024-03-15")            // null (string, not Temporal object)
 * getWeekOfYear(new Date())               // null (Date, not Temporal)
 * 
 * // Weekly reporting periods
 * function getWeekDateRange(year: number, week: number): {
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate
 * } | null {
 *   if (week < 1 || week > 53) return null
 *   
 *   // Find first Thursday of the year
 *   let jan4 = Temporal.PlainDate.from({ year, month: 1, day: 4 })
 *   
 *   // Find Monday of week 1
 *   while (jan4.dayOfWeek !== 1) {
 *     jan4 = jan4.subtract({ days: 1 })
 *   }
 *   
 *   // Calculate start of requested week
 *   const start = jan4.add({ weeks: week - 1 })
 *   const end = start.add({ days: 6 })
 *   
 *   return { start, end }
 * }
 * 
 * getWeekDateRange(2024, 11)
 * // { start: 2024-03-11 (Monday), end: 2024-03-17 (Sunday) }
 * 
 * // Sprint planning (2-week sprints)
 * function getSprintNumber(date: Temporal.PlainDate): number {
 *   const week = getWeekOfYear(date)
 *   if (week === null) return 0
 *   
 *   return Math.ceil(week / 2)
 * }
 * 
 * getSprintNumber(Temporal.PlainDate.from("2024-03-15"))  // Sprint 6 (week 11)
 * getSprintNumber(Temporal.PlainDate.from("2024-01-08"))  // Sprint 1 (week 2)
 * 
 * // Biweekly payroll periods
 * function getPayPeriod(
 *   date: Temporal.PlainDate,
 *   firstPayWeek: number = 1
 * ): number {
 *   const week = getWeekOfYear(date)
 *   if (week === null) return 0
 *   
 *   const weeksSinceFirst = week - firstPayWeek
 *   return Math.floor(weeksSinceFirst / 2) + 1
 * }
 * 
 * getPayPeriod(Temporal.PlainDate.from("2024-03-15"), 1)  // Pay period 6
 * 
 * // Weekly sales comparison
 * function compareWeeklyPerformance(
 *   currentDate: Temporal.PlainDate,
 *   previousDate: Temporal.PlainDate
 * ): string {
 *   const currentWeek = getWeekOfYear(currentDate)
 *   const previousWeek = getWeekOfYear(previousDate)
 *   
 *   if (currentWeek === null || previousWeek === null) {
 *     return "Cannot compare"
 *   }
 *   
 *   const currentYear = getISOWeekYear(currentDate)
 *   const previousYear = getISOWeekYear(previousDate)
 *   
 *   if (currentYear === previousYear && currentWeek === previousWeek) {
 *     return "Same week"
 *   }
 *   
 *   return `Week ${previousWeek}/${previousYear} vs Week ${currentWeek}/${currentYear}`
 * }
 * 
 * // Manufacturing week codes (often used in production)
 * function getManufacturingWeekCode(date: Temporal.PlainDate): string {
 *   const week = getWeekOfYear(date)
 *   const year = getISOWeekYear(date)
 *   
 *   if (week === null) return "Unknown"
 *   
 *   // Format: YYWW (e.g., 2411 for week 11 of 2024)
 *   const yearCode = (year % 100).toString().padStart(2, '0')
 *   const weekCode = week.toString().padStart(2, '0')
 *   
 *   return yearCode + weekCode
 * }
 * 
 * getManufacturingWeekCode(Temporal.PlainDate.from("2024-03-15"))  // "2411"
 * getManufacturingWeekCode(Temporal.PlainDate.from("2024-12-30"))  // "2501" (2025 week 1)
 * 
 * // Academic calendar weeks
 * function getAcademicWeek(
 *   date: Temporal.PlainDate,
 *   semesterStart: Temporal.PlainDate
 * ): number {
 *   const currentWeek = getWeekOfYear(date)
 *   const startWeek = getWeekOfYear(semesterStart)
 *   
 *   if (currentWeek === null || startWeek === null) return 0
 *   
 *   // Handle year boundary
 *   if (currentWeek < startWeek) {
 *     const totalWeeks = getTotalWeeksInYear(semesterStart.year)
 *     return (totalWeeks - startWeek) + currentWeek + 1
 *   }
 *   
 *   return currentWeek - startWeek + 1
 * }
 * 
 * const semesterStart = Temporal.PlainDate.from("2024-09-02")
 * const currentDate = Temporal.PlainDate.from("2024-10-15")
 * getAcademicWeek(currentDate, semesterStart)  // Week 7 of semester
 * 
 * // Fiscal week calculations (many companies use 4-4-5 calendar)
 * function getFiscal445Week(
 *   date: Temporal.PlainDate,
 *   fiscalYearStart: Temporal.PlainDate
 * ): { period: number, week: number } | null {
 *   const weekNum = getWeekOfYear(date)
 *   const fiscalStartWeek = getWeekOfYear(fiscalYearStart)
 *   
 *   if (weekNum === null || fiscalStartWeek === null) return null
 *   
 *   let weeksSinceFiscalStart = weekNum - fiscalStartWeek
 *   if (weeksSinceFiscalStart < 0) {
 *     weeksSinceFiscalStart += getTotalWeeksInYear(fiscalYearStart.year)
 *   }
 *   
 *   // 4-4-5 pattern: 13 weeks per quarter
 *   const quarter = Math.floor(weeksSinceFiscalStart / 13) + 1
 *   const weekInQuarter = (weeksSinceFiscalStart % 13) + 1
 *   
 *   // Determine which period (month) in quarter
 *   let period: number
 *   let weekInPeriod: number
 *   
 *   if (weekInQuarter <= 4) {
 *     period = (quarter - 1) * 3 + 1
 *     weekInPeriod = weekInQuarter
 *   } else if (weekInQuarter <= 8) {
 *     period = (quarter - 1) * 3 + 2
 *     weekInPeriod = weekInQuarter - 4
 *   } else {
 *     period = (quarter - 1) * 3 + 3
 *     weekInPeriod = weekInQuarter - 8
 *   }
 *   
 *   return { period, week: weekInPeriod }
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property ISO8601 - Follows ISO 8601 week numbering rules
 * @property Range - Returns 1-53 (some years have 53 weeks)
 */
const getWeekOfYear = (
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
		return date.weekOfYear
	} catch {
		return null
	}
}

export default getWeekOfYear