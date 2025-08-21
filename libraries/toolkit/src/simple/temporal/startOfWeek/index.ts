/**
 * Returns the start of week for a date (configurable week start)
 * 
 * Creates a new Temporal date/datetime set to the beginning of the week at
 * midnight (00:00:00.000000000). By default, weeks start on Monday (ISO 8601
 * standard), but this can be configured to any day. The week start day is
 * specified as 1-7 where 1=Monday and 7=Sunday. This is useful for weekly
 * reports, calendar views, and weekly aggregations. This is a curried function
 * for easy composition. Returns null for invalid inputs to support safe error
 * handling.
 * 
 * @curried (weekStartDay) => (date) => start of week
 * @param weekStartDay - Day week starts on (1=Mon to 7=Sun, default 1)
 * @param date - The Temporal date to get start of week for
 * @returns Date/datetime at start of week, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate (ISO week, starts Monday)
 * const friday = Temporal.PlainDate.from("2024-03-15")  // Friday
 * startOfWeek(1)(friday)                   // PlainDateTime 2024-03-11T00:00:00 (Monday)
 * 
 * const monday = Temporal.PlainDate.from("2024-03-11")  // Monday
 * startOfWeek(1)(monday)                   // PlainDateTime 2024-03-11T00:00:00 (same day)
 * 
 * const sunday = Temporal.PlainDate.from("2024-03-17")  // Sunday
 * startOfWeek(1)(sunday)                   // PlainDateTime 2024-03-11T00:00:00 (Monday)
 * 
 * // US week (starts Sunday)
 * startOfWeek(7)(friday)                   // PlainDateTime 2024-03-10T00:00:00 (Sunday)
 * startOfWeek(7)(sunday)                   // PlainDateTime 2024-03-17T00:00:00 (same day)
 * startOfWeek(7)(monday)                   // PlainDateTime 2024-03-10T00:00:00 (Sunday)
 * 
 * // Middle Eastern week (starts Saturday)
 * startOfWeek(6)(friday)                   // PlainDateTime 2024-03-09T00:00:00 (Saturday)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * startOfWeek(1)(datetime)                 // PlainDateTime 2024-03-11T00:00:00
 * 
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfWeek(1)(zonedDateTime)            // ZonedDateTime 2024-03-11T00:00:00-04:00[America/New_York]
 * 
 * // Helper for ISO weeks (Monday start)
 * const startOfISOWeek = startOfWeek(1)
 * startOfISOWeek(Temporal.PlainDate.from("2024-03-15"))  // 2024-03-11T00:00:00
 * 
 * // Helper for US weeks (Sunday start)
 * const startOfUSWeek = startOfWeek(7)
 * startOfUSWeek(Temporal.PlainDate.from("2024-03-15"))   // 2024-03-10T00:00:00
 * 
 * // Weekly reporting boundaries
 * function getWeeklyReportPeriod(
 *   date: Temporal.PlainDate,
 *   weekStartDay: number = 1
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const start = startOfWeek(weekStartDay)(date)
 *   const end = start?.add({ days: 6, hours: 23, minutes: 59, seconds: 59, nanoseconds: 999999999 })
 *   
 *   return { start, end }
 * }
 * 
 * const reportDate = Temporal.PlainDate.from("2024-03-15")
 * getWeeklyReportPeriod(reportDate, 1)
 * // { start: 2024-03-11T00:00:00, end: 2024-03-17T23:59:59.999999999 }
 * 
 * // Same week comparison
 * function isSameWeek(
 *   date1: Temporal.PlainDate,
 *   date2: Temporal.PlainDate,
 *   weekStartDay: number = 1
 * ): boolean {
 *   const week1 = startOfWeek(weekStartDay)(date1)
 *   const week2 = startOfWeek(weekStartDay)(date2)
 *   
 *   if (!week1 || !week2) return false
 *   return week1.equals(week2)
 * }
 * 
 * const tuesday = Temporal.PlainDate.from("2024-03-12")
 * const thursday = Temporal.PlainDate.from("2024-03-14")
 * const nextMonday = Temporal.PlainDate.from("2024-03-18")
 * 
 * isSameWeek(tuesday, thursday, 1)         // true (same ISO week)
 * isSameWeek(thursday, nextMonday, 1)      // false (different weeks)
 * 
 * // Weekly aggregation
 * function aggregateByWeek(
 *   dates: Array<Temporal.PlainDate>,
 *   weekStartDay: number = 1
 * ): Map<string, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<string, Array<Temporal.PlainDate>>()
 *   const getWeekStart = startOfWeek(weekStartDay)
 *   
 *   for (const date of dates) {
 *     const weekStart = getWeekStart(date)
 *     if (!weekStart) continue
 *     
 *     const key = weekStart.toString()
 *     const group = grouped.get(key) ?? []
 *     group.push(date)
 *     grouped.set(key, group)
 *   }
 *   
 *   return grouped
 * }
 * 
 * const activities = [
 *   Temporal.PlainDate.from("2024-03-11"),  // Monday
 *   Temporal.PlainDate.from("2024-03-13"),  // Wednesday
 *   Temporal.PlainDate.from("2024-03-18")   // Next Monday
 * ]
 * aggregateByWeek(activities, 1)
 * // Map with keys "2024-03-11T00:00:00" and "2024-03-18T00:00:00"
 * 
 * // Work week calculator (Mon-Fri)
 * function getWorkWeekDays(
 *   date: Temporal.PlainDate
 * ): Array<Temporal.PlainDate> {
 *   const weekStart = startOfWeek(1)(date)
 *   if (!weekStart) return []
 *   
 *   const workDays: Array<Temporal.PlainDate> = []
 *   for (let i = 0; i < 5; i++) {  // Monday to Friday
 *     workDays.push(weekStart.add({ days: i }).toPlainDate())
 *   }
 *   
 *   return workDays
 * }
 * 
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * getWorkWeekDays(someDate)
 * // [Mon Mar 11, Tue Mar 12, Wed Mar 13, Thu Mar 14, Fri Mar 15]
 * 
 * // Sprint planning (2-week sprints starting Monday)
 * function getSprintBoundaries(
 *   date: Temporal.PlainDate
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null; weekNumber: number } {
 *   const weekStart = startOfWeek(1)(date)
 *   if (!weekStart) return { start: null, end: null, weekNumber: 0 }
 *   
 *   // Determine if this is week 1 or week 2 of sprint
 *   const weekOfYear = date.weekOfYear
 *   const isFirstWeek = weekOfYear % 2 === 1
 *   
 *   const sprintStart = isFirstWeek 
 *     ? weekStart 
 *     : weekStart.subtract({ days: 7 })
 *   
 *   const sprintEnd = sprintStart.add({ days: 13, hours: 23, minutes: 59, seconds: 59 })
 *   
 *   return { 
 *     start: sprintStart, 
 *     end: sprintEnd, 
 *     weekNumber: isFirstWeek ? 1 : 2 
 *   }
 * }
 * 
 * // Invalid weekStartDay handling
 * startOfWeek(0)(friday)                   // null (invalid day)
 * startOfWeek(8)(friday)                   // null (invalid day)
 * startOfWeek(1.5)(friday)                 // null (must be integer)
 * 
 * // Null handling
 * startOfWeek(1)(null)                     // null
 * startOfWeek(1)(undefined)                // null
 * startOfWeek(1)("2024-03-15")            // null (string, not Temporal)
 * 
 * // Payroll week calculator
 * function getPayrollWeek(
 *   date: Temporal.PlainDate,
 *   payrollWeekStart: number = 7  // Sunday for many US companies
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null; days: number } {
 *   const start = startOfWeek(payrollWeekStart)(date)
 *   if (!start) return { start: null, end: null, days: 0 }
 *   
 *   const end = start.add({ days: 6, hours: 23, minutes: 59, seconds: 59 })
 *   
 *   return { start, end, days: 7 }
 * }
 * 
 * // TV schedule week (different in different regions)
 * function getTVWeek(
 *   date: Temporal.PlainDate,
 *   region: "US" | "UK" | "JP"
 * ): Temporal.PlainDateTime | null {
 *   const weekStarts = {
 *     US: 7,  // Sunday
 *     UK: 1,  // Monday
 *     JP: 1   // Monday
 *   }
 *   
 *   return startOfWeek(weekStarts[region])(date)
 * }
 * 
 * const tvDate = Temporal.PlainDate.from("2024-03-15")
 * getTVWeek(tvDate, "US")                  // 2024-03-10T00:00:00 (Sunday)
 * getTVWeek(tvDate, "UK")                  // 2024-03-11T00:00:00 (Monday)
 * 
 * // Academic week calculator
 * function getAcademicWeek(
 *   date: Temporal.PlainDate,
 *   semesterStart: Temporal.PlainDate
 * ): { weekNumber: number; start: Temporal.PlainDateTime | null } {
 *   const weekStart = startOfWeek(1)(date)
 *   const semesterWeekStart = startOfWeek(1)(semesterStart)
 *   
 *   if (!weekStart || !semesterWeekStart) {
 *     return { weekNumber: 0, start: null }
 *   }
 *   
 *   const weeksSinceSemesterStart = Math.floor(
 *     semesterWeekStart.until(weekStart).total({ unit: 'weeks' })
 *   ) + 1
 *   
 *   return { weekNumber: weeksSinceSemesterStart, start: weekStart }
 * }
 * 
 * // Batch processing with different week starts
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-13"),  // Wednesday
 *   Temporal.PlainDate.from("2024-03-16"),  // Saturday
 *   Temporal.PlainDate.from("2024-03-17")   // Sunday
 * ]
 * 
 * const mondayStart = startOfWeek(1)
 * dates.map(mondayStart)
 * // All map to 2024-03-11T00:00:00 (Monday)
 * 
 * const sundayStart = startOfWeek(7)
 * dates.map(sundayStart)
 * // [2024-03-10T00:00:00, 2024-03-10T00:00:00, 2024-03-17T00:00:00]
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Configurable - Supports different week start days (1-7)
 * @property ISO-compatible - Default follows ISO 8601 (Monday start)
 */
const startOfWeek = (weekStartDay: number = 1) => (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
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
	
	// Validate weekStartDay is in valid range (1-7)
	if (weekStartDay < 1 || weekStartDay > 7 || !Number.isInteger(weekStartDay)) {
		return null
	}
	
	try {
		// Get the current day of week (1=Monday, 7=Sunday)
		const currentDayOfWeek = date.dayOfWeek
		
		// Calculate days to subtract to get to week start
		let daysToSubtract = (currentDayOfWeek - weekStartDay + 7) % 7
		
		// Create the start of week date
		let startDate: Temporal.PlainDate
		
		if (date instanceof Temporal.PlainDate) {
			startDate = date.subtract({ days: daysToSubtract })
			return startDate.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		} else {
			// For PlainDateTime and ZonedDateTime
			const result = date.subtract({ days: daysToSubtract })
			return result.with({
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0,
				microsecond: 0,
				nanosecond: 0
			})
		}
	} catch {
		return null
	}
}

export default startOfWeek