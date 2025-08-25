/**
 * Subtracts a Temporal.Duration from a date/time
 *
 * Creates a new Temporal date/time by subtracting the specified duration. Handles
 * various Temporal types including dates, times, datetimes, and instants. The
 * operation respects calendar rules, time zones, and daylight saving transitions
 * when applicable. This is a curried function for easy composition. Returns null
 * for invalid inputs to support safe error handling.
 *
 * @curried (duration) => (temporal) => new temporal
 * @param duration - The Temporal.Duration to subtract
 * @param temporal - The Temporal object to subtract from
 * @returns New temporal with duration subtracted, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const duration = Temporal.Duration.from({ days: 10 })
 * subtractDuration(duration)(date)        // PlainDate 2024-03-05
 *
 * // Multiple units
 * const complexDuration = Temporal.Duration.from({
 *   years: 1,
 *   months: 2,
 *   days: 3
 * })
 * subtractDuration(complexDuration)(date) // PlainDate 2023-01-12
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * const timeDuration = Temporal.Duration.from({
 *   hours: 2,
 *   minutes: 15,
 *   seconds: 30
 * })
 * subtractDuration(timeDuration)(datetime) // PlainDateTime 2024-03-15T12:15:15
 *
 * // With PlainTime (wraps around midnight)
 * const time = Temporal.PlainTime.from("02:30:00")
 * const hoursDuration = Temporal.Duration.from({ hours: 3 })
 * subtractDuration(hoursDuration)(time)   // PlainTime 23:30:00 (previous day)
 *
 * // With ZonedDateTime (handles DST)
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-11T03:00:00-04:00[America/New_York]"  // Day after DST
 * )
 * const dayDuration = Temporal.Duration.from({ days: 1 })
 * subtractDuration(dayDuration)(zonedDateTime)
 * // 2024-03-10T03:00:00-05:00[America/New_York] (different offset)
 *
 * // With Instant
 * const instant = Temporal.Instant.from("2024-03-15T12:00:00Z")
 * const instantDuration = Temporal.Duration.from({
 *   hours: 24,
 *   minutes: 30
 * })
 * subtractDuration(instantDuration)(instant)
 * // Instant 2024-03-14T11:30:00Z
 *
 * // Month-end handling
 * const monthEnd = Temporal.PlainDate.from("2024-03-31")
 * const monthDuration = Temporal.Duration.from({ months: 1 })
 * subtractDuration(monthDuration)(monthEnd) // PlainDate 2024-02-29 (leap year)
 *
 * const monthEnd2 = Temporal.PlainDate.from("2023-03-31")
 * subtractDuration(monthDuration)(monthEnd2) // PlainDate 2023-02-28 (non-leap)
 *
 * // Deadline calculator
 * function calculateStartDate(
 *   deadline: Temporal.PlainDate,
 *   leadTime: Temporal.Duration
 * ): Temporal.PlainDate | null {
 *   return subtractDuration(leadTime)(deadline)
 * }
 *
 * const projectDeadline = Temporal.PlainDate.from("2024-12-31")
 * const developmentTime = Temporal.Duration.from({ months: 6, weeks: 2 })
 * calculateStartDate(projectDeadline, developmentTime)
 * // PlainDate 2024-06-17
 *
 * // Time ago calculator
 * function getTimeAgo(
 *   duration: Temporal.Duration
 * ): Temporal.Instant | null {
 *   const now = Temporal.Now.instant()
 *   return subtractDuration(duration)(now)
 * }
 *
 * const oneHourAgo = getTimeAgo(Temporal.Duration.from({ hours: 1 }))
 * const oneWeekAgo = getTimeAgo(Temporal.Duration.from({ weeks: 1 }))
 * const thirtyDaysAgo = getTimeAgo(Temporal.Duration.from({ days: 30 }))
 *
 * // Meeting time adjustment
 * function rescheduleEarlier(
 *   meeting: Temporal.PlainDateTime,
 *   earlier: Temporal.Duration
 * ): Temporal.PlainDateTime | null {
 *   return subtractDuration(earlier)(meeting)
 * }
 *
 * const originalMeeting = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * const thirtyMinEarlier = Temporal.Duration.from({ minutes: 30 })
 * rescheduleEarlier(originalMeeting, thirtyMinEarlier)
 * // PlainDateTime 2024-03-15T13:30:00
 *
 * // Batch processing with partial application
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-06-15"),
 *   Temporal.PlainDate.from("2024-09-15")
 * ]
 *
 * const goBackOneMonth = subtractDuration(
 *   Temporal.Duration.from({ months: 1 })
 * )
 * dates.map(goBackOneMonth)
 * // [2024-02-15, 2024-05-15, 2024-08-15]
 *
 * // Retention period calculator
 * function getRetentionCutoffDate(
 *   retentionPeriod: Temporal.Duration
 * ): Temporal.PlainDate | null {
 *   const today = Temporal.Now.plainDateISO()
 *   return subtractDuration(retentionPeriod)(today)
 * }
 *
 * const thirtyDayRetention = Temporal.Duration.from({ days: 30 })
 * const cutoffDate = getRetentionCutoffDate(thirtyDayRetention)
 * // Date 30 days ago from today
 *
 * // Billing cycle calculator
 * function getPreviousBillingDate(
 *   currentBilling: Temporal.PlainDate,
 *   billingCycle: "monthly" | "quarterly" | "annually"
 * ): Temporal.PlainDate | null {
 *   const durations = {
 *     monthly: Temporal.Duration.from({ months: 1 }),
 *     quarterly: Temporal.Duration.from({ months: 3 }),
 *     annually: Temporal.Duration.from({ years: 1 })
 *   }
 *
 *   return subtractDuration(durations[billingCycle])(currentBilling)
 * }
 *
 * const billing = Temporal.PlainDate.from("2024-03-15")
 * getPreviousBillingDate(billing, "monthly")    // 2024-02-15
 * getPreviousBillingDate(billing, "quarterly")  // 2023-12-15
 * getPreviousBillingDate(billing, "annually")   // 2023-03-15
 *
 * // Invalid duration handling
 * subtractDuration(null)(date)            // null
 * subtractDuration(undefined)(date)       // null
 * subtractDuration("P1D")(date)          // null (string, not Duration)
 *
 * // Invalid temporal handling
 * subtractDuration(duration)(null)        // null
 * subtractDuration(duration)(undefined)   // null
 * subtractDuration(duration)("2024-03-15") // null (string, not Temporal)
 *
 * // Lookback window calculator
 * function getLookbackWindow(
 *   endDate: Temporal.PlainDateTime,
 *   windowSize: Temporal.Duration
 * ): { start: Temporal.PlainDateTime | null; end: Temporal.PlainDateTime } {
 *   const start = subtractDuration(windowSize)(endDate)
 *   return { start, end: endDate }
 * }
 *
 * const analysisEnd = Temporal.PlainDateTime.from("2024-03-15T23:59:59")
 * const thirtyDayWindow = Temporal.Duration.from({ days: 30 })
 * getLookbackWindow(analysisEnd, thirtyDayWindow)
 * // { start: 2024-02-14T23:59:59, end: 2024-03-15T23:59:59 }
 *
 * // Cache expiry calculator
 * function getCacheTimestamp(
 *   ttl: Temporal.Duration
 * ): Temporal.Instant | null {
 *   const now = Temporal.Now.instant()
 *   return subtractDuration(ttl)(now)
 * }
 *
 * const fiveMinuteTTL = Temporal.Duration.from({ minutes: 5 })
 * const cacheTime = getCacheTimestamp(fiveMinuteTTL)
 * // Instant from 5 minutes ago
 *
 * // Historical data fetcher
 * function getHistoricalDateRange(
 *   periods: number,
 *   periodDuration: Temporal.Duration
 * ): Array<Temporal.PlainDate | null> {
 *   const today = Temporal.Now.plainDateISO()
 *   const dates: Array<Temporal.PlainDate | null> = [today]
 *
 *   for (let i = 1; i <= periods; i++) {
 *     const totalDuration = Temporal.Duration.from({
 *       days: periodDuration.days * i,
 *       months: periodDuration.months * i,
 *       years: periodDuration.years * i
 *     })
 *     dates.push(subtractDuration(totalDuration)(today))
 *   }
 *
 *   return dates
 * }
 *
 * const monthlyDuration = Temporal.Duration.from({ months: 1 })
 * getHistoricalDateRange(3, monthlyDuration)
 * // [today, 1 month ago, 2 months ago, 3 months ago]
 *
 * // Relative time display
 * function getRelativeTimePoint(
 *   relativeDescription: "yesterday" | "lastWeek" | "lastMonth" | "lastYear"
 * ): Temporal.PlainDate | null {
 *   const durations = {
 *     yesterday: Temporal.Duration.from({ days: 1 }),
 *     lastWeek: Temporal.Duration.from({ weeks: 1 }),
 *     lastMonth: Temporal.Duration.from({ months: 1 }),
 *     lastYear: Temporal.Duration.from({ years: 1 })
 *   }
 *
 *   const today = Temporal.Now.plainDateISO()
 *   return subtractDuration(durations[relativeDescription])(today)
 * }
 *
 * getRelativeTimePoint("yesterday")       // Yesterday's date
 * getRelativeTimePoint("lastWeek")        // Date from 1 week ago
 * getRelativeTimePoint("lastMonth")       // Date from 1 month ago
 * getRelativeTimePoint("lastYear")        // Date from 1 year ago
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Calendar-aware - Respects calendar rules and time zones
 */
const subtractDuration = (duration: Temporal.Duration | null | undefined) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| null => {
	if (duration == null || temporal == null) {
		return null
	}

	// Validate duration is a Temporal.Duration
	if (!(duration instanceof Temporal.Duration)) {
		return null
	}

	// Validate temporal is a valid Temporal type
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainTime ||
		temporal instanceof Temporal.ZonedDateTime ||
		temporal instanceof Temporal.Instant

	if (!isValidTemporal) {
		return null
	}

	try {
		// Handle PlainTime specially (it doesn't have a subtract method)
		if (temporal instanceof Temporal.PlainTime) {
			// Convert to PlainDateTime for calculation
			const refDate = Temporal.PlainDate.from("2000-01-01")
			const dateTime = refDate.toPlainDateTime(temporal)
			const result = dateTime.subtract(duration)
			return result.toPlainTime()
		}

		// For all other types, use the subtract method
		// @ts-ignore - TypeScript doesn't recognize the common subtract method
		return temporal.subtract(duration)
	} catch {
		return null
	}
}

export default subtractDuration
