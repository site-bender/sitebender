/**
 * Converts various Temporal types to Temporal.PlainTime
 * 
 * Extracts or converts the time portion from various Temporal objects to a
 * PlainTime. For datetime objects, extracts just the time components. For
 * strings, attempts to parse as a time. For durations, converts to time
 * representation (wrapping at 24 hours). Returns null for invalid inputs to
 * support safe error handling.
 * 
 * @param temporal - The value to convert to PlainTime
 * @returns PlainTime representation, or null if invalid
 * @example
 * ```typescript
 * // From PlainDateTime - extracts time portion
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * toPlainTime(datetime)                   // PlainTime 14:30:45.123
 * 
 * // From ZonedDateTime - extracts local time
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toPlainTime(zonedDateTime)              // PlainTime 14:30:00
 * 
 * // From PlainTime - returns as-is
 * const time = Temporal.PlainTime.from("14:30:45")
 * toPlainTime(time)                       // PlainTime 14:30:45
 * 
 * // From Duration - converts to time (wraps at 24 hours)
 * const duration = Temporal.Duration.from({ hours: 2, minutes: 30, seconds: 45 })
 * toPlainTime(duration)                   // PlainTime 02:30:45
 * 
 * const longDuration = Temporal.Duration.from({ hours: 26, minutes: 15 })
 * toPlainTime(longDuration)               // PlainTime 02:15:00 (26 mod 24)
 * 
 * // From ISO string
 * toPlainTime("14:30:45")                // PlainTime 14:30:45
 * toPlainTime("14:30:45.123")            // PlainTime 14:30:45.123
 * toPlainTime("14:30")                   // PlainTime 14:30:00
 * toPlainTime("2024-03-15T14:30:45")     // PlainTime 14:30:45 (extracts time)
 * 
 * // Precision preservation
 * const preciseDatetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123456789")
 * toPlainTime(preciseDatetime)            // PlainTime 14:30:45.123456789
 * 
 * // Edge cases
 * toPlainTime("00:00:00")                // PlainTime 00:00:00 (midnight)
 * toPlainTime("23:59:59.999999999")      // PlainTime 23:59:59.999999999
 * 
 * // Time extraction helper
 * function extractTimeOnly<T>(
 *   temporal: T
 * ): Temporal.PlainTime | null {
 *   return toPlainTime(temporal)
 * }
 * 
 * extractTimeOnly(Temporal.PlainDateTime.from("2024-03-15T14:30:00"))
 * // PlainTime 14:30:00
 * 
 * // Duration to time converter
 * function durationToTime(
 *   duration: Temporal.Duration
 * ): Temporal.PlainTime | null {
 *   return toPlainTime(duration)
 * }
 * 
 * durationToTime(Temporal.Duration.from({ hours: 8, minutes: 30 }))
 * // PlainTime 08:30:00
 * 
 * // Batch time extraction
 * const datetimes = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T18:45:30")
 * ]
 * 
 * const times = datetimes.map(toPlainTime)
 * // [09:00:00, 14:30:00, 18:45:30]
 * 
 * // Time comparison helper
 * function haveSameTime(
 *   temporal1: Temporal.PlainDateTime | Temporal.ZonedDateTime,
 *   temporal2: Temporal.PlainDateTime | Temporal.ZonedDateTime
 * ): boolean {
 *   const time1 = toPlainTime(temporal1)
 *   const time2 = toPlainTime(temporal2)
 *   
 *   if (!time1 || !time2) return false
 *   return time1.equals(time2)
 * }
 * 
 * const morning1 = Temporal.PlainDateTime.from("2024-03-15T09:30:00")
 * const morning2 = Temporal.PlainDateTime.from("2024-03-16T09:30:00")
 * haveSameTime(morning1, morning2)        // true (same time, different days)
 * 
 * // Invalid input handling
 * toPlainTime(null)                       // null
 * toPlainTime(undefined)                  // null
 * toPlainTime(123)                        // null (number)
 * toPlainTime("invalid")                  // null (invalid string)
 * toPlainTime(new Date())                 // null (Date object)
 * 
 * // Schedule time extractor
 * function getScheduleTimes(
 *   schedule: Array<{ event: string; datetime: Temporal.PlainDateTime }>
 * ): Array<{ event: string; time: Temporal.PlainTime | null }> {
 *   return schedule.map(item => ({
 *     event: item.event,
 *     time: toPlainTime(item.datetime)
 *   }))
 * }
 * 
 * const schedule = [
 *   { event: "Meeting", datetime: Temporal.PlainDateTime.from("2024-03-15T09:00:00") },
 *   { event: "Lunch", datetime: Temporal.PlainDateTime.from("2024-03-15T12:30:00") },
 *   { event: "Review", datetime: Temporal.PlainDateTime.from("2024-03-15T15:00:00") }
 * ]
 * getScheduleTimes(schedule)
 * // [{ event: "Meeting", time: 09:00:00 }, { event: "Lunch", time: 12:30:00 }, ...]
 * 
 * // Alarm time formatter
 * function formatAlarmTime(
 *   alarm: Temporal.PlainDateTime | Temporal.PlainTime | string
 * ): string {
 *   const time = toPlainTime(alarm)
 *   if (!time) return "Invalid time"
 *   
 *   const hour = time.hour
 *   const minute = String(time.minute).padStart(2, '0')
 *   const period = hour < 12 ? "AM" : "PM"
 *   const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
 *   
 *   return `${hour12}:${minute} ${period}`
 * }
 * 
 * formatAlarmTime("07:30:00")             // "7:30 AM"
 * formatAlarmTime("14:30:00")             // "2:30 PM"
 * formatAlarmTime("00:00:00")             // "12:00 AM"
 * 
 * // Work hours calculator
 * function calculateWorkHours(
 *   start: Temporal.PlainDateTime,
 *   end: Temporal.PlainDateTime
 * ): Temporal.Duration | null {
 *   const startTime = toPlainTime(start)
 *   const endTime = toPlainTime(end)
 *   
 *   if (!startTime || !endTime) return null
 *   
 *   // Handle same day
 *   if (start.toPlainDate().equals(end.toPlainDate())) {
 *     return startTime.until(endTime)
 *   }
 *   
 *   // Handle overnight
 *   const midnight = Temporal.PlainTime.from("00:00:00")
 *   const untilMidnight = startTime.until(Temporal.PlainTime.from("23:59:59.999999999"))
 *   const fromMidnight = midnight.until(endTime)
 *   
 *   return untilMidnight.add(fromMidnight).add({ nanoseconds: 1 })
 * }
 * 
 * // Timer display
 * function formatTimer(
 *   duration: Temporal.Duration
 * ): string {
 *   const time = toPlainTime(duration)
 *   if (!time) return "00:00:00"
 *   
 *   const hours = String(time.hour).padStart(2, '0')
 *   const minutes = String(time.minute).padStart(2, '0')
 *   const seconds = String(time.second).padStart(2, '0')
 *   
 *   return `${hours}:${minutes}:${seconds}`
 * }
 * 
 * formatTimer(Temporal.Duration.from({ hours: 1, minutes: 23, seconds: 45 }))
 * // "01:23:45"
 * 
 * // Database time storage
 * function storeTimeOnly(
 *   datetime: Temporal.PlainDateTime | Temporal.ZonedDateTime
 * ): string | null {
 *   const time = toPlainTime(datetime)
 *   if (!time) return null
 *   
 *   return time.toString()
 * }
 * 
 * const eventDateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * storeTimeOnly(eventDateTime)            // "14:30:45"
 * 
 * // Time slot generator
 * function generateTimeSlots(
 *   start: string,
 *   end: string,
 *   intervalMinutes: number
 * ): Array<Temporal.PlainTime | null> {
 *   const startTime = toPlainTime(start)
 *   const endTime = toPlainTime(end)
 *   
 *   if (!startTime || !endTime) return []
 *   
 *   const slots: Array<Temporal.PlainTime | null> = []
 *   let current = startTime
 *   
 *   while (current.compare(endTime) <= 0) {
 *     slots.push(current)
 *     current = current.add({ minutes: intervalMinutes })
 *   }
 *   
 *   return slots
 * }
 * 
 * generateTimeSlots("09:00", "17:00", 30)
 * // [09:00:00, 09:30:00, 10:00:00, ..., 17:00:00]
 * 
 * // Meeting time normalizer
 * function normalizeToQuarterHour(
 *   time: Temporal.PlainTime | Temporal.PlainDateTime | string
 * ): Temporal.PlainTime | null {
 *   const plainTime = toPlainTime(time)
 *   if (!plainTime) return null
 *   
 *   const minutes = plainTime.minute
 *   const roundedMinutes = Math.round(minutes / 15) * 15
 *   
 *   if (roundedMinutes === 60) {
 *     return plainTime.add({ hours: 1 }).with({ minute: 0 })
 *   }
 *   
 *   return plainTime.with({ minute: roundedMinutes })
 * }
 * 
 * normalizeToQuarterHour("14:23:00")      // PlainTime 14:30:00
 * normalizeToQuarterHour("14:37:00")      // PlainTime 14:30:00
 * normalizeToQuarterHour("14:38:00")      // PlainTime 14:45:00
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Handles multiple input types
 * @property Preserves - Maintains time precision (nanoseconds)
 */
const toPlainTime = (
	temporal: Temporal.PlainTime | Temporal.PlainDateTime | 
	          Temporal.ZonedDateTime | Temporal.Duration |
	          string | null | undefined
): Temporal.PlainTime | null => {
	if (temporal == null) {
		return null
	}
	
	try {
		// Handle PlainTime - return as-is
		if (temporal instanceof Temporal.PlainTime) {
			return temporal
		}
		
		// Handle PlainDateTime - extract time portion
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toPlainTime()
		}
		
		// Handle ZonedDateTime - extract local time
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainTime()
		}
		
		// Handle Duration - convert to time (wrap at 24 hours)
		if (temporal instanceof Temporal.Duration) {
			const totalNanoseconds = temporal.total({ unit: 'nanoseconds' })
			const nanosecondsIn24Hours = 24 * 60 * 60 * 1_000_000_000
			const wrappedNanoseconds = totalNanoseconds % nanosecondsIn24Hours
			
			const hours = Math.floor(wrappedNanoseconds / (60 * 60 * 1_000_000_000))
			const minutes = Math.floor((wrappedNanoseconds % (60 * 60 * 1_000_000_000)) / (60 * 1_000_000_000))
			const seconds = Math.floor((wrappedNanoseconds % (60 * 1_000_000_000)) / 1_000_000_000)
			const nanoseconds = wrappedNanoseconds % 1_000_000_000
			
			return Temporal.PlainTime.from({
				hour: hours,
				minute: minutes,
				second: seconds,
				millisecond: Math.floor(nanoseconds / 1_000_000),
				microsecond: Math.floor((nanoseconds % 1_000_000) / 1_000),
				nanosecond: nanoseconds % 1_000
			})
		}
		
		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainTime first
			try {
				return Temporal.PlainTime.from(temporal)
			} catch {
				// Try to parse as PlainDateTime and extract time
				try {
					const datetime = Temporal.PlainDateTime.from(temporal)
					return datetime.toPlainTime()
				} catch {
					// Try to parse as ZonedDateTime and extract time
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainTime()
					} catch {
						return null
					}
				}
			}
		}
		
		return null
	} catch {
		return null
	}
}

export default toPlainTime