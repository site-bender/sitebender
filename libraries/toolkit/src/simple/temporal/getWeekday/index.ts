/**
 * Gets the weekday from a Temporal date or datetime (alias for getDayOfWeek)
 * 
 * Extracts the day of week (1-7) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for Monday through 7 for Sunday, following
 * ISO 8601 standard. This function is an alias for getDayOfWeek with a more
 * intuitive name. Returns null for invalid inputs to support safe error handling.
 * 
 * @param date - The Temporal object to get weekday from
 * @returns The weekday (1=Monday, 7=Sunday), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * getWeekday(monday)                      // 1 (Monday)
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * getWeekday(friday)                      // 5 (Friday)
 * 
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * getWeekday(sunday)                      // 7 (Sunday)
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-13T10:30:00")
 * getWeekday(datetime)                    // 3 (Wednesday)
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-16T10:30:00-04:00[America/New_York]"
 * )
 * getWeekday(zonedDateTime)               // 6 (Saturday)
 * 
 * // Weekday name helper
 * function getWeekdayName(date: Temporal.PlainDate): string {
 *   const weekdayNames = [
 *     "Monday", "Tuesday", "Wednesday", "Thursday",
 *     "Friday", "Saturday", "Sunday"
 *   ]
 *   const weekday = getWeekday(date)
 *   return weekday ? weekdayNames[weekday - 1] : "Unknown"
 * }
 * 
 * getWeekdayName(Temporal.PlainDate.from("2024-03-11"))  // "Monday"
 * getWeekdayName(Temporal.PlainDate.from("2024-03-15"))  // "Friday"
 * getWeekdayName(Temporal.PlainDate.from("2024-03-17"))  // "Sunday"
 * 
 * // Short weekday name helper
 * function getShortWeekdayName(date: Temporal.PlainDate): string {
 *   const shortNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 *   const weekday = getWeekday(date)
 *   return weekday ? shortNames[weekday - 1] : "???"
 * }
 * 
 * getShortWeekdayName(Temporal.PlainDate.from("2024-03-13"))  // "Wed"
 * getShortWeekdayName(Temporal.PlainDate.from("2024-03-16"))  // "Sat"
 * 
 * // Workday vs weekend detection
 * function isWorkday(date: Temporal.PlainDate): boolean {
 *   const weekday = getWeekday(date)
 *   return weekday !== null && weekday >= 1 && weekday <= 5
 * }
 * 
 * function isWeekend(date: Temporal.PlainDate): boolean {
 *   const weekday = getWeekday(date)
 *   return weekday === 6 || weekday === 7
 * }
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWorkday(friday)                       // true
 * isWeekend(friday)                       // false
 * 
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWorkday(saturday)                     // false
 * isWeekend(saturday)                     // true
 * 
 * // Business days calculator
 * function addBusinessDays(
 *   start: Temporal.PlainDate,
 *   days: number
 * ): Temporal.PlainDate {
 *   let current = start
 *   let remaining = Math.abs(days)
 *   const direction = days > 0 ? 1 : -1
 *   
 *   while (remaining > 0) {
 *     current = current.add({ days: direction })
 *     if (isWorkday(current)) {
 *       remaining--
 *     }
 *   }
 *   
 *   return current
 * }
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * addBusinessDays(friday, 1)              // Monday 2024-03-18
 * addBusinessDays(friday, 5)              // Friday 2024-03-22
 * 
 * // Next specific weekday finder
 * function getNextWeekday(
 *   from: Temporal.PlainDate,
 *   targetWeekday: number  // 1-7
 * ): Temporal.PlainDate {
 *   let current = from
 *   do {
 *     current = current.add({ days: 1 })
 *   } while (getWeekday(current) !== targetWeekday)
 *   return current
 * }
 * 
 * const today = Temporal.PlainDate.from("2024-03-13")  // Wednesday
 * getNextWeekday(today, 1)                // Next Monday (2024-03-18)
 * getNextWeekday(today, 5)                // Next Friday (2024-03-15)
 * 
 * // Previous specific weekday finder
 * function getPreviousWeekday(
 *   from: Temporal.PlainDate,
 *   targetWeekday: number  // 1-7
 * ): Temporal.PlainDate {
 *   let current = from
 *   do {
 *     current = current.subtract({ days: 1 })
 *   } while (getWeekday(current) !== targetWeekday)
 *   return current
 * }
 * 
 * const date = Temporal.PlainDate.from("2024-03-15")  // Friday
 * getPreviousWeekday(date, 1)             // Previous Monday (2024-03-11)
 * 
 * // Null handling
 * getWeekday(null)                        // null
 * getWeekday(undefined)                   // null
 * getWeekday("2024-03-15")               // null (string, not Temporal object)
 * getWeekday(new Date())                  // null (Date, not Temporal)
 * 
 * // Weekday frequency analysis
 * function countWeekdays(
 *   dates: Array<Temporal.PlainDate>
 * ): Record<string, number> {
 *   const counts: Record<string, number> = {
 *     Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0,
 *     Friday: 0, Saturday: 0, Sunday: 0
 *   }
 *   
 *   const names = [
 *     "Monday", "Tuesday", "Wednesday", "Thursday",
 *     "Friday", "Saturday", "Sunday"
 *   ]
 *   
 *   for (const date of dates) {
 *     const weekday = getWeekday(date)
 *     if (weekday !== null) {
 *       counts[names[weekday - 1]]++
 *     }
 *   }
 *   
 *   return counts
 * }
 * 
 * // Recurring weekly event scheduler
 * function getWeeklyOccurrences(
 *   start: Temporal.PlainDate,
 *   weekday: number,
 *   count: number
 * ): Array<Temporal.PlainDate> {
 *   const dates: Array<Temporal.PlainDate> = []
 *   let current = start
 *   
 *   // Find first occurrence
 *   while (getWeekday(current) !== weekday) {
 *     current = current.add({ days: 1 })
 *   }
 *   
 *   // Collect occurrences
 *   for (let i = 0; i < count; i++) {
 *     dates.push(current)
 *     current = current.add({ weeks: 1 })
 *   }
 *   
 *   return dates
 * }
 * 
 * const start = Temporal.PlainDate.from("2024-03-01")
 * getWeeklyOccurrences(start, 3, 4)       // Next 4 Wednesdays
 * 
 * // Workweek position
 * function getWorkweekPosition(date: Temporal.PlainDate): string {
 *   const weekday = getWeekday(date)
 *   if (weekday === null) return "Unknown"
 *   
 *   switch (weekday) {
 *     case 1: return "Start of workweek"
 *     case 2: 
 *     case 3: 
 *     case 4: return "Midweek"
 *     case 5: return "End of workweek"
 *     case 6:
 *     case 7: return "Weekend"
 *     default: return "Unknown"
 *   }
 * }
 * 
 * getWorkweekPosition(Temporal.PlainDate.from("2024-03-11"))  // "Start of workweek"
 * getWorkweekPosition(Temporal.PlainDate.from("2024-03-13"))  // "Midweek"
 * getWorkweekPosition(Temporal.PlainDate.from("2024-03-15"))  // "End of workweek"
 * getWorkweekPosition(Temporal.PlainDate.from("2024-03-16"))  // "Weekend"
 * 
 * // Alternative work schedules (e.g., 4-day workweek)
 * function isFourDayWorkday(
 *   date: Temporal.PlainDate,
 *   workdays: Array<number> = [1, 2, 3, 4]  // Mon-Thu
 * ): boolean {
 *   const weekday = getWeekday(date)
 *   return weekday !== null && workdays.includes(weekday)
 * }
 * 
 * const thursday = Temporal.PlainDate.from("2024-03-14")
 * isFourDayWorkday(thursday)              // true
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isFourDayWorkday(friday)                // false (Friday off in 4-day week)
 * 
 * // Meeting scheduler avoiding certain weekdays
 * function findMeetingDate(
 *   preferredDate: Temporal.PlainDate,
 *   avoidWeekdays: Array<number> = [1, 5]  // Avoid Mondays and Fridays
 * ): Temporal.PlainDate {
 *   let date = preferredDate
 *   while (avoidWeekdays.includes(getWeekday(date) ?? 0)) {
 *     date = date.add({ days: 1 })
 *   }
 *   return date
 * }
 * 
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * findMeetingDate(monday, [1, 5])         // Tuesday 2024-03-12
 * 
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * findMeetingDate(friday, [1, 5])         // Saturday 2024-03-16
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property ISO8601 - Returns ISO 8601 weekday numbering (1=Monday, 7=Sunday)
 * @property Alias - This is an alias for getDayOfWeek with a clearer name
 */
import getDayOfWeek from "../getDayOfWeek/index.ts"

const getWeekday = getDayOfWeek

export default getWeekday