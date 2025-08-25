/**
 * Checks if a date falls on a weekday (Monday-Friday)
 *
 * Determines whether a given Temporal date or datetime represents a weekday.
 * Weekdays are defined as Monday (1) through Friday (5) in the ISO 8601 system.
 * Returns true for Monday-Friday, false for Saturday-Sunday or invalid inputs.
 * This is useful for business logic, scheduling, and calendar applications.
 *
 * @param date - The Temporal object to check
 * @returns True if weekday (Mon-Fri), false if weekend or invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * isWeekday(monday)                       // true (Monday)
 *
 * const tuesday = Temporal.PlainDate.from("2024-03-12")
 * isWeekday(tuesday)                      // true (Tuesday)
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * isWeekday(friday)                       // true (Friday)
 *
 * const saturday = Temporal.PlainDate.from("2024-03-16")
 * isWeekday(saturday)                     // false (Saturday)
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * isWeekday(sunday)                       // false (Sunday)
 *
 * // With PlainDateTime
 * const weekdayMorning = Temporal.PlainDateTime.from("2024-03-13T09:00:00")
 * isWeekday(weekdayMorning)               // true (Wednesday)
 *
 * const weekendNight = Temporal.PlainDateTime.from("2024-03-16T23:59:59")
 * isWeekday(weekendNight)                 // false (Saturday)
 *
 * // With ZonedDateTime
 * const zonedWeekday = Temporal.ZonedDateTime.from(
 *   "2024-03-14T15:00:00-04:00[America/New_York]"
 * )
 * isWeekday(zonedWeekday)                 // true (Thursday)
 *
 * // Business days counter
 * function countBusinessDays(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number {
 *   let count = 0
 *   let current = startDate
 *
 *   while (Temporal.PlainDate.compare(current, endDate) <= 0) {
 *     if (isWeekday(current)) {
 *       count++
 *     }
 *     current = current.add({ days: 1 })
 *   }
 *
 *   return count
 * }
 *
 * const start = Temporal.PlainDate.from("2024-03-11")  // Monday
 * const end = Temporal.PlainDate.from("2024-03-17")    // Sunday
 * countBusinessDays(start, end)           // 5 (Mon-Fri)
 *
 * // Next business day finder
 * function getNextBusinessDay(date: Temporal.PlainDate): Temporal.PlainDate {
 *   let next = date.add({ days: 1 })
 *   while (!isWeekday(next)) {
 *     next = next.add({ days: 1 })
 *   }
 *   return next
 * }
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * getNextBusinessDay(friday)              // Monday 2024-03-18
 *
 * const thursday = Temporal.PlainDate.from("2024-03-14")
 * getNextBusinessDay(thursday)            // Friday 2024-03-15
 *
 * // Previous business day finder
 * function getPreviousBusinessDay(date: Temporal.PlainDate): Temporal.PlainDate {
 *   let prev = date.subtract({ days: 1 })
 *   while (!isWeekday(prev)) {
 *     prev = prev.subtract({ days: 1 })
 *   }
 *   return prev
 * }
 *
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * getPreviousBusinessDay(monday)          // Friday 2024-03-08
 *
 * // Business hours check
 * function isBusinessHours(datetime: Temporal.PlainDateTime): boolean {
 *   if (!isWeekday(datetime)) return false
 *
 *   const hour = datetime.hour
 *   return hour >= 9 && hour < 17  // 9 AM to 5 PM
 * }
 *
 * const weekdayMorning = Temporal.PlainDateTime.from("2024-03-13T10:30:00")
 * isBusinessHours(weekdayMorning)         // true
 *
 * const weekdayEvening = Temporal.PlainDateTime.from("2024-03-13T18:00:00")
 * isBusinessHours(weekdayEvening)         // false (after 5 PM)
 *
 * const weekendMorning = Temporal.PlainDateTime.from("2024-03-16T10:00:00")
 * isBusinessHours(weekendMorning)         // false (Saturday)
 *
 * // Null handling
 * isWeekday(null)                         // false
 * isWeekday(undefined)                    // false
 * isWeekday("2024-03-15")                // false (string, not Temporal object)
 * isWeekday(new Date())                   // false (Date, not Temporal)
 *
 * // Delivery date calculator
 * function calculateDeliveryDate(
 *   orderDate: Temporal.PlainDate,
 *   businessDays: number
 * ): Temporal.PlainDate {
 *   let deliveryDate = orderDate
 *   let daysAdded = 0
 *
 *   while (daysAdded < businessDays) {
 *     deliveryDate = deliveryDate.add({ days: 1 })
 *     if (isWeekday(deliveryDate)) {
 *       daysAdded++
 *     }
 *   }
 *
 *   return deliveryDate
 * }
 *
 * const orderDate = Temporal.PlainDate.from("2024-03-14")  // Thursday
 * calculateDeliveryDate(orderDate, 3)     // Tuesday 2024-03-19
 *
 * // SLA deadline calculator
 * function getSLADeadline(
 *   startDateTime: Temporal.PlainDateTime,
 *   hoursAllowed: number
 * ): Temporal.PlainDateTime {
 *   let deadline = startDateTime
 *   let hoursAdded = 0
 *
 *   while (hoursAdded < hoursAllowed) {
 *     deadline = deadline.add({ hours: 1 })
 *
 *     // Only count hours during weekdays 9-5
 *     if (isWeekday(deadline) &&
 *         deadline.hour >= 9 &&
 *         deadline.hour < 17) {
 *       hoursAdded++
 *     }
 *   }
 *
 *   return deadline
 * }
 *
 * // Weekday filter for arrays
 * function filterWeekdays(dates: Array<Temporal.PlainDate>): Array<Temporal.PlainDate> {
 *   return dates.filter(isWeekday)
 * }
 *
 * const marchDates = [
 *   Temporal.PlainDate.from("2024-03-11"),  // Mon
 *   Temporal.PlainDate.from("2024-03-12"),  // Tue
 *   Temporal.PlainDate.from("2024-03-16"),  // Sat
 *   Temporal.PlainDate.from("2024-03-17"),  // Sun
 * ]
 * filterWeekdays(marchDates).length       // 2 (Mon and Tue)
 *
 * // Meeting scheduler
 * function findNextAvailableWeekday(
 *   preferredDate: Temporal.PlainDate,
 *   blockedDates: Set<string>
 * ): Temporal.PlainDate {
 *   let date = preferredDate
 *
 *   while (!isWeekday(date) || blockedDates.has(date.toString())) {
 *     date = date.add({ days: 1 })
 *   }
 *
 *   return date
 * }
 *
 * // Payroll processing
 * function isPayrollProcessingDay(
 *   date: Temporal.PlainDate,
 *   processingDayOfMonth: number = 15
 * ): boolean {
 *   // Process on the day if weekday, otherwise previous weekday
 *   if (date.day === processingDayOfMonth) {
 *     return isWeekday(date)
 *   }
 *
 *   // Check if this is the last weekday before processing day
 *   const targetDate = date.with({ day: processingDayOfMonth })
 *   if (!isWeekday(targetDate)) {
 *     let adjustedDate = targetDate
 *     while (!isWeekday(adjustedDate)) {
 *       adjustedDate = adjustedDate.subtract({ days: 1 })
 *     }
 *     return date.equals(adjustedDate)
 *   }
 *
 *   return false
 * }
 *
 * // Workday percentage of month
 * function getWorkdayPercentage(yearMonth: Temporal.PlainYearMonth): number {
 *   const daysInMonth = yearMonth.daysInMonth
 *   let workdays = 0
 *
 *   for (let day = 1; day <= daysInMonth; day++) {
 *     const date = yearMonth.toPlainDate({ day })
 *     if (isWeekday(date)) {
 *       workdays++
 *     }
 *   }
 *
 *   return (workdays / daysInMonth) * 100
 * }
 *
 * const march2024 = Temporal.PlainYearMonth.from("2024-03")
 * getWorkdayPercentage(march2024)         // ~67.74% (21 weekdays out of 31)
 *
 * // Time tracking
 * function shouldTrackTime(datetime: Temporal.PlainDateTime): boolean {
 *   // Only track time during weekdays
 *   return isWeekday(datetime)
 * }
 *
 * // School day checker (with holidays consideration)
 * function isSchoolDay(
 *   date: Temporal.PlainDate,
 *   holidays: Set<string> = new Set()
 * ): boolean {
 *   // School days are weekdays that aren't holidays
 *   return isWeekday(date) && !holidays.has(date.toString())
 * }
 *
 * const holidays = new Set([
 *   "2024-03-15",  // Spring break Friday
 * ])
 *
 * isSchoolDay(Temporal.PlainDate.from("2024-03-14"), holidays)  // true
 * isSchoolDay(Temporal.PlainDate.from("2024-03-15"), holidays)  // false (holiday)
 * isSchoolDay(Temporal.PlainDate.from("2024-03-16"), holidays)  // false (Saturday)
 *
 * // Trading day checker (stock markets)
 * function isTradingDay(
 *   date: Temporal.PlainDate,
 *   marketHolidays: Set<string> = new Set()
 * ): boolean {
 *   // Markets open on weekdays except holidays
 *   return isWeekday(date) && !marketHolidays.has(date.toString())
 * }
 *
 * // Batch processing scheduler
 * function shouldRunBatch(datetime: Temporal.PlainDateTime): boolean {
 *   // Run batch jobs only on weekday nights
 *   return isWeekday(datetime) &&
 *          (datetime.hour >= 22 || datetime.hour <= 4)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns false for invalid inputs rather than throwing
 * @property ISO8601 - Uses ISO weekday numbering (1=Monday, 5=Friday)
 * @property Business-friendly - Designed for business logic and scheduling
 */
const isWeekday = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
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
		return dayOfWeek >= 1 && dayOfWeek <= 5
	} catch {
		return false
	}
}

export default isWeekday
