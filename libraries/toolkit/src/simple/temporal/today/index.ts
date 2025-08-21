/**
 * Gets the current PlainDate in the system's time zone
 * 
 * Returns a Temporal.PlainDate representing today's date in the system's local
 * time zone. This is a pure function that captures the current date at the
 * moment of execution. The result contains only the date components (year,
 * month, day) without any time information. Useful for date comparisons,
 * age calculations, and daily operations.
 * 
 * @returns Current date as Temporal.PlainDate
 * @example
 * ```typescript
 * // Basic usage
 * const currentDate = today()             // PlainDate 2024-03-15 (example)
 * 
 * // Date properties
 * const todayDate = today()
 * todayDate.year                          // 2024
 * todayDate.month                         // 3
 * todayDate.day                           // 15
 * todayDate.dayOfWeek                     // 5 (Friday)
 * todayDate.dayOfYear                     // 74
 * todayDate.weekOfYear                    // 11
 * todayDate.daysInMonth                   // 31
 * todayDate.daysInYear                    // 366 (leap year)
 * 
 * // Age calculator
 * function calculateAge(birthDate: Temporal.PlainDate): number {
 *   const currentDate = today()
 *   const years = birthDate.until(currentDate, { largestUnit: 'years' }).years
 *   return Math.floor(years)
 * }
 * 
 * const birthDate = Temporal.PlainDate.from("1990-06-15")
 * calculateAge(birthDate)                 // Age in years
 * 
 * // Days until event
 * function daysUntil(eventDate: Temporal.PlainDate): number {
 *   const currentDate = today()
 *   const duration = currentDate.until(eventDate)
 *   return Math.ceil(duration.total({ unit: 'days' }))
 * }
 * 
 * const christmas = Temporal.PlainDate.from("2024-12-25")
 * daysUntil(christmas)                    // Days until Christmas
 * 
 * // Check if date is today
 * function isToday(date: Temporal.PlainDate): boolean {
 *   const currentDate = today()
 *   return date.equals(currentDate)
 * }
 * 
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * isToday(someDate)                       // true/false depending on current date
 * 
 * // Check if date is in the past
 * function isPastDate(date: Temporal.PlainDate): boolean {
 *   const currentDate = today()
 *   return date.compare(currentDate) < 0
 * }
 * 
 * const oldDate = Temporal.PlainDate.from("2020-01-01")
 * isPastDate(oldDate)                     // true
 * 
 * // Check if date is in the future
 * function isFutureDate(date: Temporal.PlainDate): boolean {
 *   const currentDate = today()
 *   return date.compare(currentDate) > 0
 * }
 * 
 * const futureDate = Temporal.PlainDate.from("2025-01-01")
 * isFutureDate(futureDate)                // true
 * 
 * // Get relative dates
 * function getRelativeDates(): {
 *   today: Temporal.PlainDate;
 *   yesterday: Temporal.PlainDate;
 *   tomorrow: Temporal.PlainDate;
 *   lastWeek: Temporal.PlainDate;
 *   nextWeek: Temporal.PlainDate;
 *   lastMonth: Temporal.PlainDate;
 *   nextMonth: Temporal.PlainDate;
 * } {
 *   const currentDate = today()
 *   
 *   return {
 *     today: currentDate,
 *     yesterday: currentDate.subtract({ days: 1 }),
 *     tomorrow: currentDate.add({ days: 1 }),
 *     lastWeek: currentDate.subtract({ weeks: 1 }),
 *     nextWeek: currentDate.add({ weeks: 1 }),
 *     lastMonth: currentDate.subtract({ months: 1 }),
 *     nextMonth: currentDate.add({ months: 1 })
 *   }
 * }
 * 
 * const dates = getRelativeDates()
 * // Object with various relative dates
 * 
 * // Daily task checker
 * function shouldRunDailyTask(lastRun: Temporal.PlainDate | null): boolean {
 *   if (!lastRun) return true
 *   
 *   const currentDate = today()
 *   return !lastRun.equals(currentDate)
 * }
 * 
 * const lastRunDate = Temporal.PlainDate.from("2024-03-14")
 * shouldRunDailyTask(lastRunDate)         // true if today is different
 * 
 * // Birthday checker
 * function isBirthdayToday(birthDate: Temporal.PlainDate): boolean {
 *   const currentDate = today()
 *   return birthDate.month === currentDate.month && 
 *          birthDate.day === currentDate.day
 * }
 * 
 * const birthday = Temporal.PlainDate.from("1990-03-15")
 * isBirthdayToday(birthday)               // true if today is March 15
 * 
 * // Current quarter calculator
 * function getCurrentQuarter(): {
 *   quarter: number;
 *   start: Temporal.PlainDate;
 *   end: Temporal.PlainDate;
 * } {
 *   const currentDate = today()
 *   const month = currentDate.month
 *   const quarter = Math.ceil(month / 3)
 *   
 *   const quarterStartMonth = (quarter - 1) * 3 + 1
 *   const quarterEndMonth = quarter * 3
 *   
 *   const start = currentDate.with({ month: quarterStartMonth, day: 1 })
 *   const end = currentDate.with({ month: quarterEndMonth }).with({ 
 *     day: Temporal.PlainDate.from({ 
 *       year: currentDate.year, 
 *       month: quarterEndMonth, 
 *       day: 1 
 *     }).daysInMonth 
 *   })
 *   
 *   return { quarter, start, end }
 * }
 * 
 * getCurrentQuarter()
 * // { quarter: 1, start: 2024-01-01, end: 2024-03-31 }
 * 
 * // Weekend checker
 * function isWeekendToday(): boolean {
 *   const currentDate = today()
 *   const dayOfWeek = currentDate.dayOfWeek
 *   return dayOfWeek === 6 || dayOfWeek === 7  // Saturday or Sunday
 * }
 * 
 * isWeekendToday()                        // true if Saturday or Sunday
 * 
 * // Business day checker
 * function isBusinessDay(): boolean {
 *   const currentDate = today()
 *   const dayOfWeek = currentDate.dayOfWeek
 *   return dayOfWeek >= 1 && dayOfWeek <= 5  // Monday to Friday
 * }
 * 
 * isBusinessDay()                         // true if Monday-Friday
 * 
 * // Days in current month
 * function getDaysInCurrentMonth(): number {
 *   const currentDate = today()
 *   return currentDate.daysInMonth
 * }
 * 
 * getDaysInCurrentMonth()                 // 28, 29, 30, or 31
 * 
 * // Days remaining in year
 * function getDaysRemainingInYear(): number {
 *   const currentDate = today()
 *   const yearEnd = currentDate.with({ month: 12, day: 31 })
 *   const duration = currentDate.until(yearEnd)
 *   return Math.ceil(duration.total({ unit: 'days' }))
 * }
 * 
 * getDaysRemainingInYear()                // Days until Dec 31
 * 
 * // Subscription expiry checker
 * function checkSubscriptionStatus(
 *   expiryDate: Temporal.PlainDate
 * ): "active" | "expired" | "expiring_soon" {
 *   const currentDate = today()
 *   const daysUntilExpiry = currentDate.until(expiryDate).total({ unit: 'days' })
 *   
 *   if (daysUntilExpiry < 0) return "expired"
 *   if (daysUntilExpiry <= 7) return "expiring_soon"
 *   return "active"
 * }
 * 
 * const subscription = Temporal.PlainDate.from("2024-03-20")
 * checkSubscriptionStatus(subscription)   // Status based on current date
 * 
 * // Timezone-aware comparison
 * function getTodayInTimezone(timeZone: string): Temporal.PlainDate {
 *   // Note: This gets today in a specific timezone
 *   return Temporal.Now.plainDateISO(timeZone)
 * }
 * 
 * const tokyoToday = getTodayInTimezone("Asia/Tokyo")
 * const nyToday = getTodayInTimezone("America/New_York")
 * // These might be different dates depending on current time
 * 
 * // File timestamp generator
 * function generateDailyFilename(prefix: string): string {
 *   const currentDate = today()
 *   const year = currentDate.year
 *   const month = String(currentDate.month).padStart(2, '0')
 *   const day = String(currentDate.day).padStart(2, '0')
 *   
 *   return `${prefix}_${year}-${month}-${day}`
 * }
 * 
 * generateDailyFilename("backup")         // "backup_2024-03-15"
 * generateDailyFilename("report")         // "report_2024-03-15"
 * 
 * // Cache key with daily expiry
 * function getDailyCacheKey(base: string): string {
 *   const currentDate = today()
 *   return `${base}_${currentDate.toString()}`
 * }
 * 
 * getDailyCacheKey("user_data")           // "user_data_2024-03-15"
 * 
 * // Seasonal checker
 * function getCurrentSeason(): "spring" | "summer" | "autumn" | "winter" {
 *   const currentDate = today()
 *   const month = currentDate.month
 *   
 *   if (month >= 3 && month <= 5) return "spring"
 *   if (month >= 6 && month <= 8) return "summer"
 *   if (month >= 9 && month <= 11) return "autumn"
 *   return "winter"
 * }
 * 
 * getCurrentSeason()                      // Current season
 * ```
 * @property Pure - Returns current date at time of execution
 * @property System-aware - Uses system's local time zone
 * @property Date-only - Returns only date components, no time
 * @property Immutable - Returns new PlainDate instance
 */
const today = (): Temporal.PlainDate => {
	return Temporal.Now.plainDateISO()
}

export default today