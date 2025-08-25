/**
 * Returns the end of day for a given date (23:59:59.999999999)
 *
 * Creates a PlainDateTime representing the last nanosecond of the given day.
 * Useful for date range queries, filtering, and day boundary calculations.
 * The time is set to 23:59:59.999999999 (maximum precision). Works with
 * PlainDate and PlainDateTime inputs. Returns null for invalid inputs.
 *
 * @param date - The date to get end of day for
 * @returns PlainDateTime at end of day, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * endOfDay(date)
 * // PlainDateTime 2024-03-15T23:59:59.999999999
 *
 * // With PlainDateTime (time replaced)
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * endOfDay(datetime)
 * // PlainDateTime 2024-03-15T23:59:59.999999999
 *
 * // Today's end of day
 * const today = Temporal.Now.plainDateISO()
 * const todayEnd = endOfDay(today)
 * // Today at 23:59:59.999999999
 *
 * // Date range queries
 * function isWithinToday(
 *   timestamp: Temporal.PlainDateTime
 * ): boolean {
 *   const today = Temporal.Now.plainDateISO()
 *   const start = today.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   const end = endOfDay(today)
 *
 *   if (!end) return false
 *
 *   return Temporal.PlainDateTime.compare(timestamp, start) >= 0 &&
 *          Temporal.PlainDateTime.compare(timestamp, end) <= 0
 * }
 *
 * // Daily report cutoff
 * function getDailyReportCutoff(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(date)
 * }
 *
 * const reportDate = Temporal.PlainDate.from("2024-03-15")
 * getDailyReportCutoff(reportDate)
 * // PlainDateTime 2024-03-15T23:59:59.999999999
 *
 * // Event filtering
 * function getEventsBeforeEndOfDay(
 *   events: Array<{ time: Temporal.PlainDateTime; name: string }>,
 *   date: Temporal.PlainDate
 * ): Array<{ time: Temporal.PlainDateTime; name: string }> {
 *   const cutoff = endOfDay(date)
 *   if (!cutoff) return []
 *
 *   return events.filter(event =>
 *     Temporal.PlainDateTime.compare(event.time, cutoff) <= 0
 *   )
 * }
 *
 * // Deadline checking
 * function isBeforeDeadline(
 *   submission: Temporal.PlainDateTime,
 *   deadlineDate: Temporal.PlainDate
 * ): boolean {
 *   const deadline = endOfDay(deadlineDate)
 *   if (!deadline) return false
 *
 *   return Temporal.PlainDateTime.compare(submission, deadline) <= 0
 * }
 *
 * const submission = Temporal.PlainDateTime.from("2024-03-15T23:45:00")
 * const deadline = Temporal.PlainDate.from("2024-03-15")
 * isBeforeDeadline(submission, deadline)  // true (before 23:59:59)
 *
 * // Store hours
 * function getStoreClosingTime(
 *   date: Temporal.PlainDate,
 *   is24Hour: boolean = false
 * ): Temporal.PlainDateTime | null {
 *   if (is24Hour) {
 *     return endOfDay(date)
 *   }
 *   // Regular store hours (e.g., 9 PM)
 *   return date.toPlainDateTime(Temporal.PlainTime.from("21:00:00"))
 * }
 *
 * // Null handling
 * endOfDay(null)                          // null
 * endOfDay(undefined)                     // null
 *
 * // Cache expiration
 * function getCacheExpiry(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(date)  // Cache expires at end of day
 * }
 *
 * // Daily aggregation periods
 * function getDailyPeriod(
 *   date: Temporal.PlainDate
 * ): { start: Temporal.PlainDateTime; end: Temporal.PlainDateTime | null } {
 *   const start = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   const end = endOfDay(date)
 *   return { start, end }
 * }
 *
 * const analysisDate = Temporal.PlainDate.from("2024-03-15")
 * getDailyPeriod(analysisDate)
 * // { start: 2024-03-15T00:00:00, end: 2024-03-15T23:59:59.999999999 }
 *
 * // Booking availability
 * function getLastBookingTime(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   // Last possible booking time for the day
 *   return endOfDay(date)
 * }
 *
 * // Log rotation
 * function getLogRotationTime(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(date)  // Rotate logs at end of day
 * }
 *
 * // Trading day end
 * function getTradingDayEnd(
 *   date: Temporal.PlainDate,
 *   isExtendedHours: boolean = false
 * ): Temporal.PlainDateTime | null {
 *   if (isExtendedHours) {
 *     // Extended hours until 8 PM
 *     return date.toPlainDateTime(Temporal.PlainTime.from("20:00:00"))
 *   }
 *   // Regular market close at 4 PM
 *   return date.toPlainDateTime(Temporal.PlainTime.from("16:00:00"))
 * }
 *
 * // Daily task deadline
 * function getDailyTaskDeadline(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(date)
 * }
 *
 * const taskDate = Temporal.PlainDate.from("2024-03-15")
 * const taskDeadline = getDailyTaskDeadline(taskDate)
 * // Tasks must be completed by 23:59:59.999999999
 *
 * // Promotion expiry
 * function getPromotionExpiry(
 *   lastDay: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(lastDay)  // Promotion valid until last second
 * }
 *
 * // Daily statistics window
 * function getStatsWindow(
 *   date: Temporal.PlainDate
 * ): { from: Temporal.PlainDateTime; to: Temporal.PlainDateTime | null } {
 *   const from = date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 *   const to = endOfDay(date)
 *   return { from, to }
 * }
 *
 * // Shift end time
 * function getShiftEnd(
 *   date: Temporal.PlainDate,
 *   shiftType: "day" | "evening" | "night"
 * ): Temporal.PlainDateTime | null {
 *   switch (shiftType) {
 *     case "day":
 *       return date.toPlainDateTime(Temporal.PlainTime.from("15:00:00"))
 *     case "evening":
 *       return date.toPlainDateTime(Temporal.PlainTime.from("23:00:00"))
 *     case "night":
 *       // Night shift ends at 7 AM next day
 *       return date.add({ days: 1 })
 *         .toPlainDateTime(Temporal.PlainTime.from("07:00:00"))
 *     default:
 *       return endOfDay(date)
 *   }
 * }
 *
 * // Subscription validity
 * function getSubscriptionValidUntil(
 *   expiryDate: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   return endOfDay(expiryDate)  // Valid through last second of expiry date
 * }
 *
 * // Event registration cutoff
 * function getRegistrationCutoff(
 *   eventDate: Temporal.PlainDate,
 *   daysBefore: number = 1
 * ): Temporal.PlainDateTime | null {
 *   const cutoffDate = eventDate.subtract({ days: daysBefore })
 *   return endOfDay(cutoffDate)
 * }
 *
 * const event = Temporal.PlainDate.from("2024-03-20")
 * getRegistrationCutoff(event, 2)
 * // Registration closes at end of day 2 days before event
 *
 * // Comparison with start of day
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * const dayStart = someDate.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
 * const dayEnd = endOfDay(someDate)
 *
 * if (dayEnd) {
 *   const fullDayNanoseconds = dayEnd.since(dayStart).nanoseconds
 *   // 86,399,999,999,999 nanoseconds (almost 24 hours)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new datetime without modifying input
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Sets time to maximum precision (nanoseconds)
 */
const endOfDay = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDateTime | null => {
	if (date == null) {
		return null
	}

	try {
		// Convert to PlainDate if needed
		let plainDate: Temporal.PlainDate

		if (date instanceof Temporal.PlainDateTime) {
			plainDate = date.toPlainDate()
		} else if (date instanceof Temporal.PlainDate) {
			plainDate = date
		} else {
			return null
		}

		// Create end of day time (23:59:59.999999999)
		const endTime = Temporal.PlainTime.from({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
			microsecond: 999,
			nanosecond: 999,
		})

		// Combine date with end time
		return plainDate.toPlainDateTime(endTime)
	} catch {
		return null
	}
}

export default endOfDay
