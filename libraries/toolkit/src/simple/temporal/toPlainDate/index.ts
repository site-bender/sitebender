/**
 * Converts various Temporal types to Temporal.PlainDate
 * 
 * Extracts or converts the date portion from various Temporal objects to a
 * PlainDate. For datetime objects, extracts just the date components. For
 * zoned datetimes and instants, converts to the specified or system timezone
 * first. For strings, attempts to parse as an ISO date. This is a curried
 * function when a timezone is needed. Returns null for invalid inputs to
 * support safe error handling.
 * 
 * @curried (timeZone?) => (temporal) => PlainDate
 * @param timeZone - Optional timezone for Instant/ZonedDateTime conversion
 * @param temporal - The value to convert to PlainDate
 * @returns PlainDate representation, or null if invalid
 * @example
 * ```typescript
 * // From PlainDateTime - extracts date portion
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * toPlainDate()(datetime)                 // PlainDate 2024-03-15
 * 
 * // From PlainDate - returns as-is
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toPlainDate()(date)                     // PlainDate 2024-03-15
 * 
 * // From ZonedDateTime - converts to local date
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T23:30:00-04:00[America/New_York]"
 * )
 * toPlainDate()(zonedDateTime)            // PlainDate 2024-03-15
 * 
 * // Crossing midnight in timezone conversion
 * const lateNightNY = Temporal.ZonedDateTime.from(
 *   "2024-03-15T23:30:00-04:00[America/New_York]"  // 11:30 PM in NY
 * )
 * toPlainDate("Asia/Tokyo")(lateNightNY)  // PlainDate 2024-03-16 (next day in Tokyo)
 * 
 * // From Instant - requires timezone
 * const instant = Temporal.Instant.from("2024-03-15T12:00:00Z")
 * toPlainDate()(instant)                  // PlainDate 2024-03-15 (system timezone)
 * toPlainDate("America/New_York")(instant) // PlainDate 2024-03-15
 * toPlainDate("Asia/Tokyo")(instant)      // PlainDate 2024-03-15 (or 16 depending on time)
 * 
 * // From ISO string
 * toPlainDate()("2024-03-15")            // PlainDate 2024-03-15
 * toPlainDate()("2024-03-15T14:30:45")   // PlainDate 2024-03-15
 * toPlainDate()("2024-03-15T14:30:45Z")  // PlainDate 2024-03-15
 * 
 * // From PlainYearMonth - uses first day of month
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * toPlainDate()(yearMonth)                // PlainDate 2024-03-01
 * 
 * // Date extraction helper
 * function extractDateOnly<T>(
 *   temporal: T
 * ): Temporal.PlainDate | null {
 *   return toPlainDate()(temporal)
 * }
 * 
 * extractDateOnly(Temporal.PlainDateTime.from("2024-03-15T14:30:00"))
 * // PlainDate 2024-03-15
 * 
 * // Timezone-aware date converter
 * function getDateInTimezone(
 *   instant: Temporal.Instant,
 *   timezone: string
 * ): Temporal.PlainDate | null {
 *   return toPlainDate(timezone)(instant)
 * }
 * 
 * const utcTime = Temporal.Instant.from("2024-03-15T23:00:00Z")
 * getDateInTimezone(utcTime, "America/Los_Angeles")  // PlainDate 2024-03-15
 * getDateInTimezone(utcTime, "Europe/London")        // PlainDate 2024-03-15
 * getDateInTimezone(utcTime, "Asia/Sydney")          // PlainDate 2024-03-16
 * 
 * // Batch date extraction
 * const datetimes = [
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   Temporal.PlainDateTime.from("2024-02-20T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-25T18:45:00")
 * ]
 * 
 * const extractDate = toPlainDate()
 * const dates = datetimes.map(extractDate)
 * // [PlainDate 2024-01-15, PlainDate 2024-02-20, PlainDate 2024-03-25]
 * 
 * // Date normalization for comparison
 * function areSameDate(
 *   temporal1: Temporal.PlainDate | Temporal.PlainDateTime,
 *   temporal2: Temporal.PlainDate | Temporal.PlainDateTime
 * ): boolean {
 *   const date1 = toPlainDate()(temporal1)
 *   const date2 = toPlainDate()(temporal2)
 *   
 *   if (!date1 || !date2) return false
 *   return date1.equals(date2)
 * }
 * 
 * const morning = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const evening = Temporal.PlainDateTime.from("2024-03-15T21:00:00")
 * areSameDate(morning, evening)           // true
 * 
 * // Invalid input handling
 * toPlainDate()(null)                     // null
 * toPlainDate()(undefined)                // null
 * toPlainDate()(123)                      // null (number)
 * toPlainDate()("invalid")                // null (invalid string)
 * toPlainDate()(new Date())               // null (Date object, not Temporal)
 * 
 * // Log date extractor
 * function extractLogDates(
 *   logs: Array<{ timestamp: Temporal.PlainDateTime; message: string }>
 * ): Array<Temporal.PlainDate | null> {
 *   return logs.map(log => toPlainDate()(log.timestamp))
 * }
 * 
 * const logs = [
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-15T09:15:00"), message: "Start" },
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-15T12:30:00"), message: "Process" },
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-16T14:00:00"), message: "Complete" }
 * ]
 * extractLogDates(logs)
 * // [PlainDate 2024-03-15, PlainDate 2024-03-15, PlainDate 2024-03-16]
 * 
 * // Daily aggregation key
 * function getDailyKey(
 *   temporal: Temporal.PlainDateTime | Temporal.ZonedDateTime
 * ): string {
 *   const date = toPlainDate()(temporal)
 *   if (!date) return "invalid"
 *   
 *   return date.toString()
 * }
 * 
 * getDailyKey(Temporal.PlainDateTime.from("2024-03-15T14:30:00"))
 * // "2024-03-15"
 * 
 * // Event date normalizer
 * function normalizeEventDates(
 *   events: Array<{
 *     name: string;
 *     datetime: Temporal.PlainDateTime | Temporal.ZonedDateTime;
 *   }>
 * ): Array<{ name: string; date: Temporal.PlainDate | null }> {
 *   return events.map(event => ({
 *     name: event.name,
 *     date: toPlainDate()(event.datetime)
 *   }))
 * }
 * 
 * // Database date converter
 * function convertDatabaseTimestamp(
 *   timestamp: string | Temporal.PlainDateTime
 * ): Temporal.PlainDate | null {
 *   if (typeof timestamp === "string") {
 *     try {
 *       const datetime = Temporal.PlainDateTime.from(timestamp)
 *       return toPlainDate()(datetime)
 *     } catch {
 *       return toPlainDate()(timestamp)
 *     }
 *   }
 *   return toPlainDate()(timestamp)
 * }
 * 
 * convertDatabaseTimestamp("2024-03-15T14:30:00")  // PlainDate 2024-03-15
 * convertDatabaseTimestamp("2024-03-15")           // PlainDate 2024-03-15
 * 
 * // Multi-timezone date display
 * function getDateAcrossTimezones(
 *   instant: Temporal.Instant,
 *   timezones: Array<string>
 * ): Map<string, Temporal.PlainDate | null> {
 *   const dates = new Map<string, Temporal.PlainDate | null>()
 *   
 *   for (const tz of timezones) {
 *     dates.set(tz, toPlainDate(tz)(instant))
 *   }
 *   
 *   return dates
 * }
 * 
 * const now = Temporal.Now.instant()
 * const zones = ["America/New_York", "Europe/London", "Asia/Tokyo"]
 * getDateAcrossTimezones(now, zones)
 * // Map with dates for each timezone (may differ near midnight)
 * 
 * // Filtering by date
 * function filterByDate(
 *   items: Array<{ timestamp: Temporal.PlainDateTime }>,
 *   targetDate: Temporal.PlainDate
 * ): Array<{ timestamp: Temporal.PlainDateTime }> {
 *   return items.filter(item => {
 *     const itemDate = toPlainDate()(item.timestamp)
 *     return itemDate?.equals(targetDate) ?? false
 *   })
 * }
 * 
 * const items = [
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-15T09:00:00") },
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-15T14:00:00") },
 *   { timestamp: Temporal.PlainDateTime.from("2024-03-16T10:00:00") }
 * ]
 * const targetDate = Temporal.PlainDate.from("2024-03-15")
 * filterByDate(items, targetDate)
 * // Returns first two items (both on March 15)
 * ```
 * @property Curried - Optionally takes timezone for Instant conversion
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Handles multiple input types
 * @property Timezone-aware - Respects timezone for conversions
 */
const toPlainDate = (timeZone?: string) => (
	temporal: Temporal.PlainDate | Temporal.PlainDateTime | 
	          Temporal.ZonedDateTime | Temporal.Instant |
	          Temporal.PlainYearMonth | string | null | undefined
): Temporal.PlainDate | null => {
	if (temporal == null) {
		return null
	}
	
	try {
		// Handle PlainDate - return as-is
		if (temporal instanceof Temporal.PlainDate) {
			return temporal
		}
		
		// Handle PlainDateTime - extract date portion
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toPlainDate()
		}
		
		// Handle ZonedDateTime - convert to PlainDate
		if (temporal instanceof Temporal.ZonedDateTime) {
			if (timeZone) {
				// Convert to specified timezone first
				const converted = temporal.withTimeZone(timeZone)
				return converted.toPlainDate()
			}
			return temporal.toPlainDate()
		}
		
		// Handle Instant - convert via timezone
		if (temporal instanceof Temporal.Instant) {
			const tz = timeZone || Temporal.Now.timeZoneId()
			const zoned = temporal.toZonedDateTimeISO(tz)
			return zoned.toPlainDate()
		}
		
		// Handle PlainYearMonth - use first day of month
		if (temporal instanceof Temporal.PlainYearMonth) {
			return temporal.toPlainDate({ day: 1 })
		}
		
		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainDate first
			try {
				return Temporal.PlainDate.from(temporal)
			} catch {
				// Try to parse as PlainDateTime and extract date
				try {
					const datetime = Temporal.PlainDateTime.from(temporal)
					return datetime.toPlainDate()
				} catch {
					// Try to parse as Instant and convert
					try {
						const instant = Temporal.Instant.from(temporal)
						const tz = timeZone || Temporal.Now.timeZoneId()
						const zoned = instant.toZonedDateTimeISO(tz)
						return zoned.toPlainDate()
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

export default toPlainDate