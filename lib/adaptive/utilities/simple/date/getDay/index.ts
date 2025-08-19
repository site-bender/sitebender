/**
 * Gets the day of month from a Temporal date or datetime
 * 
 * Extracts the day component (1-31) from a Temporal PlainDate, PlainDateTime,
 * PlainMonthDay, or ZonedDateTime. The day represents the day of the month
 * in the object's calendar system. Returns null for invalid inputs to support
 * safe error handling.
 * 
 * @param date - The Temporal object to get day from
 * @returns The day of month (1-31), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * getDay(date)                            // 15
 * 
 * const firstDay = Temporal.PlainDate.from("2024-01-01")
 * getDay(firstDay)                        // 1
 * 
 * const lastDay = Temporal.PlainDate.from("2024-01-31")
 * getDay(lastDay)                         // 31
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getDay(datetime)                        // 15
 * 
 * // With PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("03-15")
 * getDay(monthDay)                        // 15
 * 
 * const birthday = Temporal.PlainMonthDay.from("12-25")
 * getDay(birthday)                        // 25
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDay(zonedDateTime)                   // 15
 * 
 * // Different months have different max days
 * const feb28 = Temporal.PlainDate.from("2024-02-28")
 * getDay(feb28)                           // 28
 * 
 * const feb29 = Temporal.PlainDate.from("2024-02-29")
 * getDay(feb29)                           // 29 (leap year)
 * 
 * const apr30 = Temporal.PlainDate.from("2024-04-30")
 * getDay(apr30)                           // 30
 * 
 * // Non-Gregorian calendars
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getDay(hebrewDate)                      // 15
 * 
 * // Checking for specific days
 * function isFirstOfMonth(date: Temporal.PlainDate): boolean {
 *   return getDay(date) === 1
 * }
 * 
 * function isLastDayOfMonth(date: Temporal.PlainDate): boolean {
 *   const day = getDay(date)
 *   if (day === null) return false
 *   
 *   const nextDay = date.add({ days: 1 })
 *   return getDay(nextDay) === 1
 * }
 * 
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * isLastDayOfMonth(jan31)                 // true
 * 
 * const jan30 = Temporal.PlainDate.from("2024-01-30")
 * isLastDayOfMonth(jan30)                 // false
 * 
 * // Date formatting helper
 * function formatDayWithSuffix(date: Temporal.PlainDate): string {
 *   const day = getDay(date)
 *   if (day === null) return "Invalid"
 *   
 *   const suffix = 
 *     day === 1 || day === 21 || day === 31 ? "st" :
 *     day === 2 || day === 22 ? "nd" :
 *     day === 3 || day === 23 ? "rd" : "th"
 *   
 *   return `${day}${suffix}`
 * }
 * 
 * formatDayWithSuffix(Temporal.PlainDate.from("2024-03-01")) // "1st"
 * formatDayWithSuffix(Temporal.PlainDate.from("2024-03-22")) // "22nd"
 * formatDayWithSuffix(Temporal.PlainDate.from("2024-03-15")) // "15th"
 * 
 * // Null handling
 * getDay(null)                            // null
 * getDay(undefined)                       // null
 * getDay("2024-03-15")                   // null (string, not Temporal object)
 * getDay(new Date())                      // null (Date, not Temporal)
 * 
 * // Weekly schedule helper
 * function getWeeklyOccurrence(date: Temporal.PlainDate): number {
 *   const day = getDay(date)
 *   if (day === null) return 0
 *   
 *   return Math.ceil(day / 7)
 * }
 * 
 * const firstWeek = Temporal.PlainDate.from("2024-03-05")
 * getWeeklyOccurrence(firstWeek)          // 1 (first week)
 * 
 * const secondWeek = Temporal.PlainDate.from("2024-03-12")
 * getWeeklyOccurrence(secondWeek)         // 2 (second week)
 * 
 * const lastWeek = Temporal.PlainDate.from("2024-03-29")
 * getWeeklyOccurrence(lastWeek)           // 5 (fifth week)
 * 
 * // Monthly billing cycle
 * function getDaysUntilBilling(
 *   currentDate: Temporal.PlainDate,
 *   billingDay: number
 * ): number {
 *   const currentDay = getDay(currentDate)
 *   if (currentDay === null) return 0
 *   
 *   if (currentDay < billingDay) {
 *     return billingDay - currentDay
 *   }
 *   
 *   // Next month
 *   const nextMonth = currentDate.add({ months: 1 }).with({ day: billingDay })
 *   return currentDate.until(nextMonth).days
 * }
 * 
 * const today = Temporal.PlainDate.from("2024-03-10")
 * getDaysUntilBilling(today, 15)          // 5 days until the 15th
 * getDaysUntilBilling(today, 5)           // 26 days (next month's 5th)
 * 
 * // Grouping dates by day
 * function groupByDay(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<number, Array<Temporal.PlainDate>>()
 *   
 *   for (const date of dates) {
 *     const day = getDay(date)
 *     if (day !== null) {
 *       const group = grouped.get(day) ?? []
 *       group.push(date)
 *       grouped.set(day, group)
 *     }
 *   }
 *   
 *   return grouped
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Universal - Works with all Temporal date/time types that have day component
 */
const getDay = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | 
	      Temporal.PlainMonthDay | Temporal.ZonedDateTime | 
	      null | undefined
): number | null => {
	if (date == null) {
		return null
	}
	
	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}
	
	try {
		return date.day
	} catch {
		return null
	}
}

export default getDay