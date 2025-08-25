/**
 * Gets the day of week from a Temporal date or datetime
 *
 * Extracts the day of week (1-7) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for Monday through 7 for Sunday, following
 * ISO 8601 standard. This is consistent across all calendar systems.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get day of week from
 * @returns The day of week (1=Monday, 7=Sunday), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * getDayOfWeek(monday)                    // 1 (Monday)
 *
 * const tuesday = Temporal.PlainDate.from("2024-03-12")
 * getDayOfWeek(tuesday)                   // 2 (Tuesday)
 *
 * const wednesday = Temporal.PlainDate.from("2024-03-13")
 * getDayOfWeek(wednesday)                 // 3 (Wednesday)
 *
 * const thursday = Temporal.PlainDate.from("2024-03-14")
 * getDayOfWeek(thursday)                  // 4 (Thursday)
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * getDayOfWeek(friday)                    // 5 (Friday)
 *
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * getDayOfWeek(saturday)                  // 6 (Saturday)
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * getDayOfWeek(sunday)                    // 7 (Sunday)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getDayOfWeek(datetime)                  // 5 (Friday)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDayOfWeek(zonedDateTime)             // 5 (Friday)
 *
 * // Works across different years
 * const newYear2024 = Temporal.PlainDate.from("2024-01-01")
 * getDayOfWeek(newYear2024)               // 1 (Monday)
 *
 * const newYear2025 = Temporal.PlainDate.from("2025-01-01")
 * getDayOfWeek(newYear2025)               // 3 (Wednesday)
 *
 * // Non-Gregorian calendars still use ISO weekdays
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getDayOfWeek(hebrewDate)                // Returns ISO day of week
 *
 * // Weekday/weekend detection
 * function isWeekday(date: Temporal.PlainDate): boolean {
 *   const dayOfWeek = getDayOfWeek(date)
 *   return dayOfWeek !== null && dayOfWeek >= 1 && dayOfWeek <= 5
 * }
 *
 * function isWeekend(date: Temporal.PlainDate): boolean {
 *   const dayOfWeek = getDayOfWeek(date)
 *   return dayOfWeek === 6 || dayOfWeek === 7
 * }
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWeekday(friday)                       // true
 * isWeekend(friday)                       // false
 *
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWeekday(saturday)                     // false
 * isWeekend(saturday)                     // true
 *
 * // Day name helper
 * function getDayName(date: Temporal.PlainDate): string {
 *   const names = [
 *     "Monday", "Tuesday", "Wednesday", "Thursday",
 *     "Friday", "Saturday", "Sunday"
 *   ]
 *   const dayOfWeek = getDayOfWeek(date)
 *   return dayOfWeek ? names[dayOfWeek - 1] : "Unknown"
 * }
 *
 * getDayName(Temporal.PlainDate.from("2024-03-15"))  // "Friday"
 * getDayName(Temporal.PlainDate.from("2024-03-17"))  // "Sunday"
 *
 * // Short day name helper
 * function getShortDayName(date: Temporal.PlainDate): string {
 *   const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 *   const dayOfWeek = getDayOfWeek(date)
 *   return dayOfWeek ? names[dayOfWeek - 1] : "???"
 * }
 *
 * // Null handling
 * getDayOfWeek(null)                      // null
 * getDayOfWeek(undefined)                 // null
 * getDayOfWeek("2024-03-15")             // null (string, not Temporal object)
 * getDayOfWeek(new Date())                // null (Date, not Temporal)
 *
 * // Business days calculation
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
 *     const dayOfWeek = getDayOfWeek(current)
 *     if (dayOfWeek && dayOfWeek >= 1 && dayOfWeek <= 5) {
 *       remaining--
 *     }
 *   }
 *
 *   return current
 * }
 *
 * const start = Temporal.PlainDate.from("2024-03-15") // Friday
 * addBusinessDays(start, 1)               // Monday 2024-03-18
 * addBusinessDays(start, 5)               // Friday 2024-03-22
 *
 * // Next occurrence of specific weekday
 * function nextWeekday(
 *   from: Temporal.PlainDate,
 *   targetDay: number // 1-7
 * ): Temporal.PlainDate {
 *   let current = from
 *   do {
 *     current = current.add({ days: 1 })
 *   } while (getDayOfWeek(current) !== targetDay)
 *   return current
 * }
 *
 * const today = Temporal.PlainDate.from("2024-03-15") // Friday
 * nextWeekday(today, 1)                   // Next Monday (2024-03-18)
 * nextWeekday(today, 5)                   // Next Friday (2024-03-22)
 *
 * // Grouping dates by day of week
 * function groupByDayOfWeek(
 *   dates: Array<Temporal.PlainDate>
 * ): Map<number, Array<Temporal.PlainDate>> {
 *   const grouped = new Map<number, Array<Temporal.PlainDate>>()
 *
 *   for (const date of dates) {
 *     const day = getDayOfWeek(date)
 *     if (day !== null) {
 *       const group = grouped.get(day) ?? []
 *       group.push(date)
 *       grouped.set(day, group)
 *     }
 *   }
 *
 *   return grouped
 * }
 *
 * // Recurring weekly events
 * function getWeeklyOccurrences(
 *   start: Temporal.PlainDate,
 *   weekday: number,
 *   count: number
 * ): Array<Temporal.PlainDate> {
 *   const dates: Array<Temporal.PlainDate> = []
 *   let current = start
 *
 *   // Find first occurrence
 *   while (getDayOfWeek(current) !== weekday) {
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
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property ISO8601 - Returns ISO 8601 weekday numbering (1=Monday, 7=Sunday)
 */
const getDayOfWeek = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
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
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.dayOfWeek
	} catch {
		return null
	}
}

export default getDayOfWeek
