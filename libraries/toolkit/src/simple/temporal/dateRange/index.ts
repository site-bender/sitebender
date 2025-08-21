/**
 * Generates an array of dates between start and end dates
 * 
 * Creates an inclusive range of dates from start to end, with customizable
 * step size. The step can be specified as a Temporal.Duration for complex
 * intervals. Returns an empty array if start is after end. Handles month
 * and year boundaries correctly. Returns null for invalid inputs.
 * 
 * @curried (start) => (end) => (step?) => result
 * @param start - The starting date (inclusive)
 * @param end - The ending date (inclusive)
 * @param step - Optional duration between dates (defaults to 1 day)
 * @returns Array of dates in the range, or null if invalid
 * @example
 * ```typescript
 * // Basic daily range
 * const start = Temporal.PlainDate.from("2024-03-01")
 * const end = Temporal.PlainDate.from("2024-03-05")
 * dateRange(start)(end)()
 * // [2024-03-01, 2024-03-02, 2024-03-03, 2024-03-04, 2024-03-05]
 * 
 * // With custom step (every 2 days)
 * const step2Days = Temporal.Duration.from({ days: 2 })
 * dateRange(start)(end)(step2Days)
 * // [2024-03-01, 2024-03-03, 2024-03-05]
 * 
 * // Weekly intervals
 * const weekStart = Temporal.PlainDate.from("2024-03-01")
 * const weekEnd = Temporal.PlainDate.from("2024-03-31")
 * const weekly = Temporal.Duration.from({ weeks: 1 })
 * dateRange(weekStart)(weekEnd)(weekly)
 * // [2024-03-01, 2024-03-08, 2024-03-15, 2024-03-22, 2024-03-29]
 * 
 * // Monthly intervals
 * const yearStart = Temporal.PlainDate.from("2024-01-15")
 * const yearEnd = Temporal.PlainDate.from("2024-12-15")
 * const monthly = Temporal.Duration.from({ months: 1 })
 * dateRange(yearStart)(yearEnd)(monthly)
 * // [2024-01-15, 2024-02-15, 2024-03-15, ..., 2024-12-15]
 * 
 * // Partial application for common ranges
 * const thisWeek = dateRange(
 *   Temporal.Now.plainDateISO()
 * )(
 *   Temporal.Now.plainDateISO().add({ days: 6 })
 * )
 * thisWeek()  // Next 7 days including today
 * 
 * // Business days (weekdays only)
 * function getBusinessDays(
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate
 * ): Array<Temporal.PlainDate> {
 *   const allDays = dateRange(start)(end)()
 *   return allDays ? allDays.filter(date => {
 *     const dayOfWeek = date.dayOfWeek
 *     return dayOfWeek >= 1 && dayOfWeek <= 5  // Mon-Fri
 *   }) : []
 * }
 * 
 * const businessStart = Temporal.PlainDate.from("2024-03-04")  // Monday
 * const businessEnd = Temporal.PlainDate.from("2024-03-15")    // Friday
 * getBusinessDays(businessStart, businessEnd)
 * // Excludes weekends
 * 
 * // Calendar generation
 * function getCalendarMonth(
 *   year: number,
 *   month: number
 * ): Array<Temporal.PlainDate> | null {
 *   const firstDay = Temporal.PlainDate.from({ year, month, day: 1 })
 *   const lastDay = firstDay.with({ day: firstDay.daysInMonth })
 *   return dateRange(firstDay)(lastDay)()
 * }
 * 
 * getCalendarMonth(2024, 2)  // All days in February 2024 (leap year)
 * getCalendarMonth(2024, 4)  // All days in April 2024
 * 
 * // Project timeline
 * const projectStart = Temporal.PlainDate.from("2024-01-01")
 * const projectEnd = Temporal.PlainDate.from("2024-03-31")
 * const biweekly = Temporal.Duration.from({ weeks: 2 })
 * 
 * const sprintStarts = dateRange(projectStart)(projectEnd)(biweekly)
 * // Sprint start dates every 2 weeks
 * 
 * // Recurring events
 * function getRecurringDates(
 *   start: Temporal.PlainDate,
 *   occurrences: number,
 *   interval: Temporal.Duration
 * ): Array<Temporal.PlainDate> | null {
 *   const dates: Array<Temporal.PlainDate> = []
 *   let current = start
 *   
 *   for (let i = 0; i < occurrences; i++) {
 *     dates.push(current)
 *     current = current.add(interval)
 *   }
 *   
 *   return dates
 * }
 * 
 * // Payment schedule
 * const firstPayment = Temporal.PlainDate.from("2024-01-15")
 * const lastPayment = Temporal.PlainDate.from("2024-12-15")
 * const paymentDates = dateRange(firstPayment)(lastPayment)(
 *   Temporal.Duration.from({ months: 1 })
 * )
 * // Monthly payment dates
 * 
 * // Academic semester
 * function getSemesterDates(
 *   start: Temporal.PlainDate,
 *   weeks: number
 * ): Array<Temporal.PlainDate> | null {
 *   const end = start.add({ weeks: weeks - 1, days: 4 })  // Mon-Fri
 *   return dateRange(start)(end)()
 * }
 * 
 * const semesterStart = Temporal.PlainDate.from("2024-09-02")
 * getSemesterDates(semesterStart, 16)  // 16-week semester
 * 
 * // Backwards range (returns empty array)
 * const backwards = dateRange(
 *   Temporal.PlainDate.from("2024-03-10")
 * )(
 *   Temporal.PlainDate.from("2024-03-01")
 * )()
 * // []
 * 
 * // Single day range
 * const singleDay = dateRange(
 *   Temporal.PlainDate.from("2024-03-15")
 * )(
 *   Temporal.PlainDate.from("2024-03-15")
 * )()
 * // [2024-03-15]
 * 
 * // Null handling
 * dateRange(null)(end)()                  // null
 * dateRange(start)(null)()                // null
 * dateRange(start)(end)(null)             // Uses default step (1 day)
 * 
 * // Holiday calendar
 * function getHolidayDates(
 *   year: number,
 *   holidays: Array<{ month: number; day: number }>
 * ): Array<Temporal.PlainDate> {
 *   return holidays.map(h => 
 *     Temporal.PlainDate.from({ year, month: h.month, day: h.day })
 *   ).sort((a, b) => Temporal.PlainDate.compare(a, b))
 * }
 * 
 * // Availability slots
 * function getAvailableSlots(
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate,
 *   bookedDates: Set<string>
 * ): Array<Temporal.PlainDate> {
 *   const allDates = dateRange(start)(end)()
 *   return allDates ? allDates.filter(date => 
 *     !bookedDates.has(date.toString())
 *   ) : []
 * }
 * 
 * // Fiscal quarters
 * function getFiscalQuarterDates(
 *   fiscalYearStart: Temporal.PlainDate,
 *   quarter: number
 * ): Array<Temporal.PlainDate> | null {
 *   const quarterStart = fiscalYearStart.add({ months: (quarter - 1) * 3 })
 *   const quarterEnd = quarterStart.add({ months: 3, days: -1 })
 *   return dateRange(quarterStart)(quarterEnd)()
 * }
 * 
 * // Aging buckets
 * function getAgingPeriods(
 *   baseDate: Temporal.PlainDate,
 *   periods: Array<number>  // days
 * ): Array<Temporal.PlainDate> {
 *   return periods.map(days => baseDate.subtract({ days }))
 * }
 * 
 * const today = Temporal.Now.plainDateISO()
 * getAgingPeriods(today, [30, 60, 90, 120])
 * // Dates for 30, 60, 90, 120 days ago
 * 
 * // Date sampling
 * function sampleDates(
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate,
 *   samples: number
 * ): Array<Temporal.PlainDate> | null {
 *   const totalDays = end.since(start).days
 *   if (totalDays <= 0 || samples <= 0) return []
 *   
 *   const step = Math.floor(totalDays / (samples - 1))
 *   const stepDuration = Temporal.Duration.from({ days: step })
 *   
 *   return dateRange(start)(end)(stepDuration)
 * }
 * 
 * sampleDates(
 *   Temporal.PlainDate.from("2024-01-01"),
 *   Temporal.PlainDate.from("2024-12-31"),
 *   12
 * )
 * // Roughly monthly samples throughout the year
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new array without modifying inputs
 * @property Safe - Returns null for invalid inputs, empty array for invalid ranges
 * @property Flexible - Supports custom step durations
 */
const dateRange = (start: Temporal.PlainDate | null | undefined) =>
	(end: Temporal.PlainDate | null | undefined) =>
	(step: Temporal.Duration | null | undefined = Temporal.Duration.from({ days: 1 })): Array<Temporal.PlainDate> | null => {
	if (start == null || end == null) {
		return null
	}
	
	if (!(start instanceof Temporal.PlainDate) || 
	    !(end instanceof Temporal.PlainDate)) {
		return null
	}
	
	// Default to 1 day if step is null/undefined
	const duration = step ?? Temporal.Duration.from({ days: 1 })
	
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}
	
	try {
		const dates: Array<Temporal.PlainDate> = []
		
		// Return empty array if start is after end
		if (Temporal.PlainDate.compare(start, end) > 0) {
			return dates
		}
		
		// Generate dates from start to end
		let current = start
		while (Temporal.PlainDate.compare(current, end) <= 0) {
			dates.push(current)
			current = current.add(duration)
		}
		
		return dates
	} catch {
		return null
	}
}

export default dateRange