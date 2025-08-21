/**
 * Checks if a date falls on a weekend (Saturday or Sunday)
 * 
 * Determines whether a given Temporal date or datetime represents a weekend day.
 * Weekends are defined as Saturday (6) and Sunday (7) in the ISO 8601 system.
 * Returns true for Saturday-Sunday, false for Monday-Friday or invalid inputs.
 * This is useful for scheduling, calendar applications, and leisure planning.
 * 
 * @param date - The Temporal object to check
 * @returns True if weekend (Sat-Sun), false if weekday or invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWeekend(saturday)                     // true (Saturday)
 * 
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * isWeekend(sunday)                       // true (Sunday)
 * 
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * isWeekend(monday)                       // false (Monday)
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWeekend(friday)                       // false (Friday)
 * 
 * const wednesday = Temporal.PlainDate.from("2024-03-13")
 * isWeekend(wednesday)                    // false (Wednesday)
 * 
 * // With PlainDateTime
 * const saturdayNight = Temporal.PlainDateTime.from("2024-03-16T23:59:59")
 * isWeekend(saturdayNight)                // true (Saturday night)
 * 
 * const sundayMorning = Temporal.PlainDateTime.from("2024-03-17T06:00:00")
 * isWeekend(sundayMorning)                // true (Sunday morning)
 * 
 * const fridayNight = Temporal.PlainDateTime.from("2024-03-15T23:59:59")
 * isWeekend(fridayNight)                  // false (still Friday)
 * 
 * // With ZonedDateTime
 * const zonedWeekend = Temporal.ZonedDateTime.from(
 *   "2024-03-16T12:00:00-04:00[America/New_York]"
 * )
 * isWeekend(zonedWeekend)                 // true (Saturday)
 * 
 * // Weekend counter
 * function countWeekendDays(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number {
 *   let count = 0
 *   let current = startDate
 *   
 *   while (Temporal.PlainDate.compare(current, endDate) <= 0) {
 *     if (isWeekend(current)) {
 *       count++
 *     }
 *     current = current.add({ days: 1 })
 *   }
 *   
 *   return count
 * }
 * 
 * const monthStart = Temporal.PlainDate.from("2024-03-01")
 * const monthEnd = Temporal.PlainDate.from("2024-03-31")
 * countWeekendDays(monthStart, monthEnd)  // 10 weekend days in March 2024
 * 
 * // Next weekend finder
 * function getNextWeekendDay(date: Temporal.PlainDate): Temporal.PlainDate {
 *   let next = date
 *   do {
 *     next = next.add({ days: 1 })
 *   } while (!isWeekend(next))
 *   return next
 * }
 * 
 * const thursday = Temporal.PlainDate.from("2024-03-14")
 * getNextWeekendDay(thursday)             // Saturday 2024-03-16
 * 
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * getNextWeekendDay(saturday)             // Sunday 2024-03-17
 * 
 * // Weekend getaway planner
 * function getWeekendDates(date: Temporal.PlainDate): {
 *   saturday: Temporal.PlainDate,
 *   sunday: Temporal.PlainDate
 * } {
 *   // Find the Saturday of the week containing the date
 *   let saturday = date
 *   while (saturday.dayOfWeek !== 6) {
 *     saturday = saturday.add({ days: 1 })
 *   }
 *   
 *   const sunday = saturday.add({ days: 1 })
 *   
 *   return { saturday, sunday }
 * }
 * 
 * const midweek = Temporal.PlainDate.from("2024-03-13")
 * getWeekendDates(midweek)
 * // { saturday: 2024-03-16, sunday: 2024-03-17 }
 * 
 * // Null handling
 * isWeekend(null)                         // false
 * isWeekend(undefined)                    // false
 * isWeekend("2024-03-16")                // false (string, not Temporal object)
 * isWeekend(new Date())                   // false (Date, not Temporal)
 * 
 * // Weekend overtime calculator
 * function isOvertimeEligible(datetime: Temporal.PlainDateTime): boolean {
 *   // Weekend work always counts as overtime
 *   if (isWeekend(datetime)) return true
 *   
 *   // Weekday overtime after 5 PM or before 9 AM
 *   const hour = datetime.hour
 *   return hour < 9 || hour >= 17
 * }
 * 
 * const saturdayWork = Temporal.PlainDateTime.from("2024-03-16T10:00:00")
 * isOvertimeEligible(saturdayWork)        // true (weekend)
 * 
 * const weekdayEvening = Temporal.PlainDateTime.from("2024-03-13T19:00:00")
 * isOvertimeEligible(weekdayEvening)      // true (after 5 PM)
 * 
 * const weekdayNormal = Temporal.PlainDateTime.from("2024-03-13T14:00:00")
 * isOvertimeEligible(weekdayNormal)       // false
 * 
 * // Weekend filter for arrays
 * function filterWeekends(dates: Array<Temporal.PlainDate>): Array<Temporal.PlainDate> {
 *   return dates.filter(isWeekend)
 * }
 * 
 * const marchDates = [
 *   Temporal.PlainDate.from("2024-03-15"),  // Fri
 *   Temporal.PlainDate.from("2024-03-16"),  // Sat
 *   Temporal.PlainDate.from("2024-03-17"),  // Sun
 *   Temporal.PlainDate.from("2024-03-18"),  // Mon
 * ]
 * filterWeekends(marchDates).length       // 2 (Sat and Sun)
 * 
 * // Restaurant busy hours
 * function isPeakDiningTime(datetime: Temporal.PlainDateTime): boolean {
 *   const hour = datetime.hour
 *   
 *   if (isWeekend(datetime)) {
 *     // Weekend: brunch (10-14) and dinner (17-21)
 *     return (hour >= 10 && hour < 14) || (hour >= 17 && hour < 21)
 *   } else {
 *     // Weekday: mainly dinner (18-20)
 *     return hour >= 18 && hour < 20
 *   }
 * }
 * 
 * const saturdayBrunch = Temporal.PlainDateTime.from("2024-03-16T11:00:00")
 * isPeakDiningTime(saturdayBrunch)        // true
 * 
 * const weekdayLunch = Temporal.PlainDateTime.from("2024-03-13T12:00:00")
 * isPeakDiningTime(weekdayLunch)          // false
 * 
 * // Parking rates calculator
 * function getParkingRate(datetime: Temporal.PlainDateTime): number {
 *   if (isWeekend(datetime)) {
 *     return 5  // Flat $5 weekend rate
 *   }
 *   
 *   // Weekday: $3/hour, max $20
 *   const hour = datetime.hour
 *   if (hour >= 6 && hour < 18) {
 *     return 3  // Per hour during business hours
 *   }
 *   
 *   return 2  // Evening rate
 * }
 * 
 * // Maintenance window scheduler
 * function isMaintenanceWindow(datetime: Temporal.PlainDateTime): boolean {
 *   // Maintenance windows: weekend nights 2-6 AM
 *   if (!isWeekend(datetime)) return false
 *   
 *   const hour = datetime.hour
 *   return hour >= 2 && hour < 6
 * }
 * 
 * const sundayEarlyMorning = Temporal.PlainDateTime.from("2024-03-17T03:00:00")
 * isMaintenanceWindow(sundayEarlyMorning) // true
 * 
 * const saturdayAfternoon = Temporal.PlainDateTime.from("2024-03-16T14:00:00")
 * isMaintenanceWindow(saturdayAfternoon)  // false
 * 
 * // Weekend percentage of month
 * function getWeekendPercentage(yearMonth: Temporal.PlainYearMonth): number {
 *   const daysInMonth = yearMonth.daysInMonth
 *   let weekendDays = 0
 *   
 *   for (let day = 1; day <= daysInMonth; day++) {
 *     const date = yearMonth.toPlainDate({ day })
 *     if (isWeekend(date)) {
 *       weekendDays++
 *     }
 *   }
 *   
 *   return (weekendDays / daysInMonth) * 100
 * }
 * 
 * const march2024 = Temporal.PlainYearMonth.from("2024-03")
 * getWeekendPercentage(march2024)         // ~32.26% (10 weekend days out of 31)
 * 
 * // Leisure activity scheduler
 * function canScheduleLeisure(
 *   datetime: Temporal.PlainDateTime,
 *   requireDaylight: boolean = true
 * ): boolean {
 *   if (!isWeekend(datetime)) return false
 *   
 *   const hour = datetime.hour
 *   
 *   if (requireDaylight) {
 *     // Daylight hours approximation
 *     return hour >= 8 && hour < 18
 *   }
 *   
 *   // Any reasonable hour
 *   return hour >= 8 && hour < 22
 * }
 * 
 * // Church service times (typically Sunday mornings)
 * function isTypicalServiceTime(datetime: Temporal.PlainDateTime): boolean {
 *   if (datetime.dayOfWeek !== 7) return false  // Not Sunday
 *   
 *   const hour = datetime.hour
 *   return hour >= 9 && hour < 13  // 9 AM to 1 PM
 * }
 * 
 * // Sports league scheduler
 * function isSportsLeagueTime(datetime: Temporal.PlainDateTime): boolean {
 *   // Most recreational leagues play on weekends
 *   if (!isWeekend(datetime)) return false
 *   
 *   const hour = datetime.hour
 *   
 *   // Saturday: 8 AM - 8 PM
 *   if (datetime.dayOfWeek === 6) {
 *     return hour >= 8 && hour < 20
 *   }
 *   
 *   // Sunday: 10 AM - 6 PM (later start)
 *   return hour >= 10 && hour < 18
 * }
 * 
 * // Family time tracker
 * function isFamilyTime(datetime: Temporal.PlainDateTime): boolean {
 *   if (isWeekend(datetime)) {
 *     // All weekend is potential family time
 *     const hour = datetime.hour
 *     return hour >= 7 && hour < 22
 *   }
 *   
 *   // Weekday evenings
 *   const hour = datetime.hour
 *   return hour >= 18 && hour < 21
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns false for invalid inputs rather than throwing
 * @property ISO8601 - Uses ISO weekday numbering (6=Saturday, 7=Sunday)
 * @property Leisure-friendly - Designed for weekend and leisure planning
 */
const isWeekend = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): boolean => {
	if (date == null) {
		return false
	}
	
	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return false
	}
	
	try {
		const dayOfWeek = date.dayOfWeek
		return dayOfWeek === 6 || dayOfWeek === 7
	} catch {
		return false
	}
}

export default isWeekend