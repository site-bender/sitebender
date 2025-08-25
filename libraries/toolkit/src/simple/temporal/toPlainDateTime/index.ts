/**
 * Converts ZonedDateTime to PlainDateTime
 *
 * Extracts the local date and time components from a ZonedDateTime, discarding
 * the timezone information. The resulting PlainDateTime represents the same
 * wall-clock time but without any timezone context. Also handles conversion
 * from PlainDate (adds midnight time), PlainTime (adds reference date), strings,
 * and Instant (via timezone). Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param temporal - The value to convert to PlainDateTime
 * @returns PlainDateTime representation, or null if invalid
 * @example
 * ```typescript
 * // From ZonedDateTime - extracts local datetime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toPlainDateTime(zonedDateTime)          // PlainDateTime 2024-03-15T14:30:00
 *
 * // Different timezones, same local time
 * const tokyoTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00+09:00[Asia/Tokyo]"
 * )
 * toPlainDateTime(tokyoTime)              // PlainDateTime 2024-03-15T14:30:00
 *
 * const londonTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00+00:00[Europe/London]"
 * )
 * toPlainDateTime(londonTime)             // PlainDateTime 2024-03-15T14:30:00
 *
 * // From PlainDateTime - returns as-is
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toPlainDateTime(datetime)               // PlainDateTime 2024-03-15T14:30:00
 *
 * // From PlainDate - adds midnight time
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toPlainDateTime(date)                   // PlainDateTime 2024-03-15T00:00:00
 *
 * // From PlainTime - uses reference date
 * const time = Temporal.PlainTime.from("14:30:00")
 * toPlainDateTime(time)                   // PlainDateTime 1970-01-01T14:30:00
 *
 * // From Instant - converts via system timezone
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * toPlainDateTime(instant)                // PlainDateTime in system timezone
 *
 * // From ISO string
 * toPlainDateTime("2024-03-15T14:30:00")  // PlainDateTime 2024-03-15T14:30:00
 * toPlainDateTime("2024-03-15")           // PlainDateTime 2024-03-15T00:00:00
 * toPlainDateTime("2024-03-15T14:30:00Z") // PlainDateTime 2024-03-15T14:30:00
 *
 * // Timezone stripping for local operations
 * function getLocalDateTime(
 *   zonedDateTime: Temporal.ZonedDateTime
 * ): Temporal.PlainDateTime | null {
 *   return toPlainDateTime(zonedDateTime)
 * }
 *
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * getLocalDateTime(nyTime)                // PlainDateTime 2024-03-15T14:30:00
 *
 * // Batch conversion
 * const zonedDateTimes = [
 *   Temporal.ZonedDateTime.from("2024-01-15T10:00:00-05:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-02-15T14:00:00-05:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T18:00:00-04:00[America/New_York]")
 * ]
 *
 * const localDateTimes = zonedDateTimes.map(toPlainDateTime)
 * // [2024-01-15T10:00:00, 2024-02-15T14:00:00, 2024-03-15T18:00:00]
 *
 * // Local time comparison
 * function haveSameLocalTime(
 *   zdt1: Temporal.ZonedDateTime,
 *   zdt2: Temporal.ZonedDateTime
 * ): boolean {
 *   const local1 = toPlainDateTime(zdt1)
 *   const local2 = toPlainDateTime(zdt2)
 *
 *   if (!local1 || !local2) return false
 *   return local1.equals(local2)
 * }
 *
 * const ny = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * const la = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-07:00[America/Los_Angeles]"
 * )
 * haveSameLocalTime(ny, la)               // true (same wall clock time)
 *
 * // Meeting scheduler - local time
 * function scheduleLocalMeeting(
 *   date: Temporal.PlainDate,
 *   time: Temporal.PlainTime
 * ): Temporal.PlainDateTime | null {
 *   const dateTime = date.toPlainDateTime(time)
 *   return toPlainDateTime(dateTime)
 * }
 *
 * const meetingDate = Temporal.PlainDate.from("2024-03-15")
 * const meetingTime = Temporal.PlainTime.from("14:30:00")
 * scheduleLocalMeeting(meetingDate, meetingTime)
 * // PlainDateTime 2024-03-15T14:30:00
 *
 * // Invalid input handling
 * toPlainDateTime(null)                   // null
 * toPlainDateTime(undefined)              // null
 * toPlainDateTime(123)                    // null (number)
 * toPlainDateTime("invalid")              // null (invalid string)
 * toPlainDateTime(new Date())             // null (Date object)
 *
 * // Database storage without timezone
 * function storeLocalDateTime(
 *   zonedDateTime: Temporal.ZonedDateTime
 * ): string | null {
 *   const localDateTime = toPlainDateTime(zonedDateTime)
 *   if (!localDateTime) return null
 *
 *   return localDateTime.toString()
 * }
 *
 * const eventTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * storeLocalDateTime(eventTime)           // "2024-03-15T14:30:00"
 *
 * // Display formatter
 * function formatForDisplay(
 *   temporal: Temporal.ZonedDateTime | Temporal.PlainDateTime
 * ): string {
 *   const plainDateTime = toPlainDateTime(temporal)
 *   if (!plainDateTime) return "Invalid date"
 *
 *   const date = plainDateTime.toPlainDate()
 *   const time = plainDateTime.toPlainTime()
 *
 *   return `${date.toString()} at ${time.toString()}`
 * }
 *
 * formatForDisplay(zonedDateTime)         // "2024-03-15 at 14:30:00"
 *
 * // Event normalizer
 * function normalizeEventTimes(
 *   events: Array<{
 *     name: string;
 *     time: Temporal.ZonedDateTime | Temporal.PlainDateTime;
 *   }>
 * ): Array<{ name: string; localTime: Temporal.PlainDateTime | null }> {
 *   return events.map(event => ({
 *     name: event.name,
 *     localTime: toPlainDateTime(event.time)
 *   }))
 * }
 *
 * // Calendar entry creator
 * function createCalendarEntry(
 *   title: string,
 *   zonedDateTime: Temporal.ZonedDateTime
 * ): { title: string; localDateTime: Temporal.PlainDateTime | null } {
 *   return {
 *     title,
 *     localDateTime: toPlainDateTime(zonedDateTime)
 *   }
 * }
 *
 * const meeting = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * createCalendarEntry("Team Meeting", meeting)
 * // { title: "Team Meeting", localDateTime: PlainDateTime 2024-03-15T14:30:00 }
 *
 * // Timestamp converter for logs
 * function convertLogTimestamp(
 *   timestamp: string | Temporal.ZonedDateTime | Temporal.PlainDateTime
 * ): Temporal.PlainDateTime | null {
 *   if (typeof timestamp === "string") {
 *     return toPlainDateTime(timestamp)
 *   }
 *   return toPlainDateTime(timestamp)
 * }
 *
 * convertLogTimestamp("2024-03-15T14:30:00")
 * // PlainDateTime 2024-03-15T14:30:00
 *
 * convertLogTimestamp(Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * ))
 * // PlainDateTime 2024-03-15T14:30:00
 *
 * // Recurring event generator
 * function generateRecurringLocal(
 *   start: Temporal.PlainDate,
 *   time: Temporal.PlainTime,
 *   count: number
 * ): Array<Temporal.PlainDateTime | null> {
 *   const events: Array<Temporal.PlainDateTime | null> = []
 *
 *   for (let i = 0; i < count; i++) {
 *     const date = start.add({ days: i * 7 })  // Weekly
 *     const datetime = date.toPlainDateTime(time)
 *     events.push(toPlainDateTime(datetime))
 *   }
 *
 *   return events
 * }
 *
 * const startDate = Temporal.PlainDate.from("2024-03-15")
 * const eventTime = Temporal.PlainTime.from("14:30:00")
 * generateRecurringLocal(startDate, eventTime, 4)
 * // [Mar 15, Mar 22, Mar 29, Apr 5 - all at 14:30:00]
 *
 * // Time slot checker
 * function isTimeSlotAvailable(
 *   slot: Temporal.PlainDateTime,
 *   bookings: Array<Temporal.ZonedDateTime>
 * ): boolean {
 *   const localBookings = bookings.map(toPlainDateTime)
 *
 *   return !localBookings.some(booking =>
 *     booking?.equals(slot) ?? false
 *   )
 * }
 *
 * const slot = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * const bookings = [
 *   Temporal.ZonedDateTime.from("2024-03-15T13:30:00-04:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T14:30:00-04:00[America/New_York]")
 * ]
 * isTimeSlotAvailable(slot, bookings)     // false (slot is booked)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Timezone-agnostic - Strips timezone information
 * @property Flexible - Handles multiple input types
 */
const toPlainDateTime = (
	temporal:
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.Instant
		| string
		| null
		| undefined,
): Temporal.PlainDateTime | null => {
	if (temporal == null) {
		return null
	}

	try {
		// Handle PlainDateTime - return as-is
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal
		}

		// Handle ZonedDateTime - extract local datetime
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainDateTime()
		}

		// Handle PlainDate - add midnight time
		if (temporal instanceof Temporal.PlainDate) {
			return temporal.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// Handle PlainTime - use reference date (1970-01-01)
		if (temporal instanceof Temporal.PlainTime) {
			const refDate = Temporal.PlainDate.from("1970-01-01")
			return refDate.toPlainDateTime(temporal)
		}

		// Handle Instant - convert via system timezone
		if (temporal instanceof Temporal.Instant) {
			const timeZone = Temporal.Now.timeZoneId()
			const zoned = temporal.toZonedDateTimeISO(timeZone)
			return zoned.toPlainDateTime()
		}

		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainDateTime first
			try {
				return Temporal.PlainDateTime.from(temporal)
			} catch {
				// Try to parse as PlainDate and add midnight
				try {
					const date = Temporal.PlainDate.from(temporal)
					return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
				} catch {
					// Try to parse as ZonedDateTime and extract local
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainDateTime()
					} catch {
						// Try to parse as Instant and convert
						try {
							const instant = Temporal.Instant.from(temporal)
							const timeZone = Temporal.Now.timeZoneId()
							const zoned = instant.toZonedDateTimeISO(timeZone)
							return zoned.toPlainDateTime()
						} catch {
							return null
						}
					}
				}
			}
		}

		return null
	} catch {
		return null
	}
}

export default toPlainDateTime
