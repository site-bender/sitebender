/**
 * Returns the start of day for a date (00:00:00)
 *
 * Creates a new Temporal date/datetime set to the beginning of the day (midnight,
 * 00:00:00.000000000). Preserves the date and timezone information while resetting
 * all time components to zero. This is useful for date comparisons, day boundaries,
 * and daily aggregations. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @param date - The Temporal date to get start of day for
 * @returns Date/datetime at start of day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * startOfDay(datetime)                     // PlainDateTime 2024-03-15T00:00:00
 *
 * const evening = Temporal.PlainDateTime.from("2024-03-15T23:59:59.999")
 * startOfDay(evening)                      // PlainDateTime 2024-03-15T00:00:00
 *
 * const midnight = Temporal.PlainDateTime.from("2024-03-15T00:00:00")
 * startOfDay(midnight)                     // PlainDateTime 2024-03-15T00:00:00 (unchanged)
 *
 * // With PlainDate (adds time component)
 * const date = Temporal.PlainDate.from("2024-03-15")
 * startOfDay(date)                         // PlainDateTime 2024-03-15T00:00:00
 *
 * // With ZonedDateTime (preserves timezone)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * startOfDay(zonedDateTime)                // ZonedDateTime 2024-03-15T00:00:00-04:00[America/New_York]
 *
 * // DST transition handling (Spring forward)
 * const dstDay = Temporal.ZonedDateTime.from(
 *   "2024-03-10T14:00:00-04:00[America/New_York]"
 * )
 * startOfDay(dstDay)                       // 2024-03-10T00:00:00-05:00[America/New_York]
 * // Note: Midnight is before DST transition
 *
 * // DST transition handling (Fall back)
 * const fallBack = Temporal.ZonedDateTime.from(
 *   "2024-11-03T14:00:00-05:00[America/New_York]"
 * )
 * startOfDay(fallBack)                     // 2024-11-03T00:00:00-04:00[America/New_York]
 * // Note: Midnight is before DST transition
 *
 * // Daily report generator
 * function generateDailyReportBoundaries(
 *   date: Temporal.PlainDate
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime | null } {
 *   const start = startOfDay(date)
 *   const end = start?.add({ days: 1, nanoseconds: -1 })
 *
 *   return { start, end }
 * }
 *
 * const reportDate = Temporal.PlainDate.from("2024-03-15")
 * generateDailyReportBoundaries(reportDate)
 * // { start: 2024-03-15T00:00:00, end: 2024-03-15T23:59:59.999999999 }
 *
 * // Date comparison helper
 * function isSameDay(
 *   date1: Temporal.PlainDateTime,
 *   date2: Temporal.PlainDateTime
 * ): boolean {
 *   const day1 = startOfDay(date1)
 *   const day2 = startOfDay(date2)
 *
 *   if (!day1 || !day2) return false
 *   return day1.equals(day2)
 * }
 *
 * const morning = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const evening = Temporal.PlainDateTime.from("2024-03-15T21:00:00")
 * const nextDay = Temporal.PlainDateTime.from("2024-03-16T09:00:00")
 *
 * isSameDay(morning, evening)              // true
 * isSameDay(morning, nextDay)              // false
 *
 * // Daily aggregation
 * function aggregateByDay(
 *   timestamps: Array<Temporal.PlainDateTime>
 * ): Map<string, Array<Temporal.PlainDateTime>> {
 *   const grouped = new Map<string, Array<Temporal.PlainDateTime>>()
 *
 *   for (const timestamp of timestamps) {
 *     const dayStart = startOfDay(timestamp)
 *     if (!dayStart) continue
 *
 *     const key = dayStart.toString()
 *     const group = grouped.get(key) ?? []
 *     group.push(timestamp)
 *     grouped.set(key, group)
 *   }
 *
 *   return grouped
 * }
 *
 * const events = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-16T10:00:00")
 * ]
 * aggregateByDay(events)
 * // Map with keys "2024-03-15T00:00:00" and "2024-03-16T00:00:00"
 *
 * // Cache key generator
 * function getDailyCacheKey(
 *   datetime: Temporal.PlainDateTime,
 *   prefix: string = "cache"
 * ): string {
 *   const dayStart = startOfDay(datetime)
 *   if (!dayStart) return `${prefix}_invalid`
 *
 *   return `${prefix}_${dayStart.year}_${dayStart.month}_${dayStart.day}`
 * }
 *
 * const cacheTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * getDailyCacheKey(cacheTime, "user_data") // "user_data_2024_3_15"
 *
 * // Daily reset timer
 * function getSecondsUntilDayReset(
 *   currentTime: Temporal.PlainDateTime
 * ): number {
 *   const tomorrow = currentTime.add({ days: 1 })
 *   const tomorrowStart = startOfDay(tomorrow)
 *
 *   if (!tomorrowStart) return 0
 *
 *   const duration = currentTime.until(tomorrowStart)
 *   return Math.floor(duration.total({ unit: 'seconds' }))
 * }
 *
 * const now = Temporal.PlainDateTime.from("2024-03-15T22:30:00")
 * getSecondsUntilDayReset(now)             // 5400 (1.5 hours)
 *
 * // Null handling
 * startOfDay(null)                         // null
 * startOfDay(undefined)                    // null
 * startOfDay("2024-03-15")                // null (string, not Temporal)
 *
 * // Log rotation helper
 * function shouldRotateLog(
 *   lastRotation: Temporal.PlainDateTime,
 *   currentTime: Temporal.PlainDateTime
 * ): boolean {
 *   const lastDay = startOfDay(lastRotation)
 *   const currentDay = startOfDay(currentTime)
 *
 *   if (!lastDay || !currentDay) return false
 *   return !lastDay.equals(currentDay)
 * }
 *
 * const lastLog = Temporal.PlainDateTime.from("2024-03-14T23:59:00")
 * const currentLog = Temporal.PlainDateTime.from("2024-03-15T00:01:00")
 * shouldRotateLog(lastLog, currentLog)     // true
 *
 * // Daily rate limit reset
 * function getRateLimitResetTime(
 *   requestTime: Temporal.ZonedDateTime
 * ): Temporal.ZonedDateTime | null {
 *   const tomorrow = requestTime.add({ days: 1 })
 *   return startOfDay(tomorrow)
 * }
 *
 * const request = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * getRateLimitResetTime(request)
 * // 2024-03-16T00:00:00-04:00[America/New_York]
 *
 * // Daily backup scheduler
 * function getNextBackupTime(
 *   lastBackup: Temporal.PlainDateTime,
 *   backupHour: number = 3
 * ): Temporal.PlainDateTime | null {
 *   const nextDay = lastBackup.add({ days: 1 })
 *   const nextDayStart = startOfDay(nextDay)
 *
 *   if (!nextDayStart) return null
 *   return nextDayStart.add({ hours: backupHour })
 * }
 *
 * const lastBackup = Temporal.PlainDateTime.from("2024-03-15T03:00:00")
 * getNextBackupTime(lastBackup, 3)         // 2024-03-16T03:00:00
 *
 * // Trading day boundaries
 * function getTradingDayBoundaries(
 *   date: Temporal.PlainDate,
 *   marketOpen: { hour: number; minute: number } = { hour: 9, minute: 30 },
 *   marketClose: { hour: number; minute: number } = { hour: 16, minute: 0 }
 * ): { open: Temporal.PlainDateTime | null; close: Temporal.PlainDateTime | null } {
 *   const dayStart = startOfDay(date)
 *   if (!dayStart) return { open: null, close: null }
 *
 *   const open = dayStart.add({
 *     hours: marketOpen.hour,
 *     minutes: marketOpen.minute
 *   })
 *   const close = dayStart.add({
 *     hours: marketClose.hour,
 *     minutes: marketClose.minute
 *   })
 *
 *   return { open, close }
 * }
 *
 * const tradingDate = Temporal.PlainDate.from("2024-03-15")
 * getTradingDayBoundaries(tradingDate)
 * // { open: 2024-03-15T09:30:00, close: 2024-03-15T16:00:00 }
 *
 * // Batch processing
 * const dates = [
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-16T09:15:00"),
 *   Temporal.PlainDateTime.from("2024-03-17T23:59:59")
 * ]
 *
 * dates.map(startOfDay)
 * // [2024-03-15T00:00:00, 2024-03-16T00:00:00, 2024-03-17T00:00:00]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Preserves - Maintains date and timezone information
 * @property Resets - Sets all time components to zero
 */
const startOfDay = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
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

	try {
		// Handle PlainDate by converting to PlainDateTime
		if (date instanceof Temporal.PlainDate) {
			return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// For PlainDateTime and ZonedDateTime, set time to midnight
		return date.with({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0,
		})
	} catch {
		return null
	}
}

export default startOfDay
