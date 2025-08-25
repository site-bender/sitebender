/**
 * Converts a Temporal object to its ISO 8601 string representation
 *
 * Converts any Temporal date/time object to its standard ISO 8601 string format.
 * Each Temporal type produces its appropriate ISO format: dates as YYYY-MM-DD,
 * times as HH:MM:SS.sss, datetimes combining both, and zoned datetimes including
 * timezone information. Returns null for invalid inputs to support safe error
 * handling.
 *
 * @param temporal - The Temporal object to convert
 * @returns ISO 8601 string representation, or null if invalid
 * @example
 * ```typescript
 * // PlainDate to ISO date string
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toISO(date)                             // "2024-03-15"
 *
 * const leapDay = Temporal.PlainDate.from("2024-02-29")
 * toISO(leapDay)                          // "2024-02-29"
 *
 * const ancientDate = Temporal.PlainDate.from("-0001-12-31")
 * toISO(ancientDate)                      // "-000001-12-31" (BCE date)
 *
 * // PlainTime to ISO time string
 * const time = Temporal.PlainTime.from("14:30:45.123")
 * toISO(time)                             // "14:30:45.123"
 *
 * const midnight = Temporal.PlainTime.from("00:00:00")
 * toISO(midnight)                         // "00:00:00"
 *
 * const preciseTime = Temporal.PlainTime.from("12:34:56.789012345")
 * toISO(preciseTime)                      // "12:34:56.789012345"
 *
 * // PlainDateTime to ISO datetime string
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * toISO(datetime)                         // "2024-03-15T14:30:45"
 *
 * const preciseDateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123456789")
 * toISO(preciseDateTime)                  // "2024-03-15T14:30:45.123456789"
 *
 * // ZonedDateTime to ISO string with timezone
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toISO(zonedDateTime)                    // "2024-03-15T14:30:00-04:00[America/New_York]"
 *
 * const utcZoned = Temporal.ZonedDateTime.from(
 *   "2024-03-15T18:30:00+00:00[UTC]"
 * )
 * toISO(utcZoned)                         // "2024-03-15T18:30:00+00:00[UTC]"
 *
 * // Instant to ISO string (always UTC)
 * const instant = Temporal.Instant.from("2024-03-15T18:30:00Z")
 * toISO(instant)                          // "2024-03-15T18:30:00Z"
 *
 * const epochInstant = Temporal.Instant.from("1970-01-01T00:00:00Z")
 * toISO(epochInstant)                     // "1970-01-01T00:00:00Z"
 *
 * // PlainYearMonth to ISO string
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * toISO(yearMonth)                        // "2024-03"
 *
 * // PlainMonthDay to ISO string
 * const monthDay = Temporal.PlainMonthDay.from("03-15")
 * toISO(monthDay)                         // "03-15"
 *
 * // Duration to ISO duration string
 * const duration = Temporal.Duration.from({
 *   years: 1,
 *   months: 2,
 *   days: 3,
 *   hours: 4,
 *   minutes: 5,
 *   seconds: 6
 * })
 * toISO(duration)                         // "P1Y2M3DT4H5M6S"
 *
 * const simpleDuration = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * toISO(simpleDuration)                   // "PT2H30M"
 *
 * // Database storage helper
 * function storeDateInDatabase(
 *   temporal: Temporal.PlainDate | Temporal.PlainDateTime
 * ): string | null {
 *   const isoString = toISO(temporal)
 *   if (!isoString) throw new Error("Invalid date for storage")
 *
 *   // Store ISO string in database
 *   return isoString
 * }
 *
 * const dbDate = Temporal.PlainDate.from("2024-03-15")
 * storeDateInDatabase(dbDate)             // "2024-03-15"
 *
 * // API response formatter
 * function formatApiResponse(data: {
 *   created: Temporal.PlainDateTime;
 *   updated: Temporal.PlainDateTime;
 *   expires: Temporal.PlainDate;
 * }): Record<string, string | null> {
 *   return {
 *     created: toISO(data.created),
 *     updated: toISO(data.updated),
 *     expires: toISO(data.expires)
 *   }
 * }
 *
 * const apiData = {
 *   created: Temporal.PlainDateTime.from("2024-03-01T10:00:00"),
 *   updated: Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   expires: Temporal.PlainDate.from("2024-12-31")
 * }
 * formatApiResponse(apiData)
 * // { created: "2024-03-01T10:00:00", updated: "2024-03-15T14:30:00", expires: "2024-12-31" }
 *
 * // Log entry formatter
 * function createLogEntry(
 *   message: string,
 *   timestamp: Temporal.Instant = Temporal.Now.instant()
 * ): string {
 *   const isoTime = toISO(timestamp)
 *   return `[${isoTime}] ${message}`
 * }
 *
 * createLogEntry("Application started")
 * // "[2024-03-15T18:30:00.123Z] Application started"
 *
 * // Null handling
 * toISO(null)                             // null
 * toISO(undefined)                        // null
 * toISO("2024-03-15")                    // null (string, not Temporal)
 * toISO(new Date())                       // null (Date, not Temporal)
 *
 * // Batch conversion
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-15"),
 *   Temporal.PlainDate.from("2024-03-15")
 * ]
 *
 * const isoStrings = dates.map(toISO)
 * // ["2024-01-15", "2024-02-15", "2024-03-15"]
 *
 * // URL parameter encoder
 * function encodeTemporalForUrl(
 *   temporal: Temporal.PlainDate | Temporal.PlainDateTime
 * ): string {
 *   const iso = toISO(temporal)
 *   if (!iso) return ""
 *   return encodeURIComponent(iso)
 * }
 *
 * const urlDate = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * encodeTemporalForUrl(urlDate)
 * // "2024-03-15T14%3A30%3A00"
 *
 * // Cookie expiry formatter
 * function setCookieExpiry(
 *   expiryDate: Temporal.Instant
 * ): string {
 *   const iso = toISO(expiryDate)
 *   if (!iso) return ""
 *
 *   // Convert to cookie date format if needed
 *   return `expires=${iso}`
 * }
 *
 * const expiry = Temporal.Now.instant().add({ hours: 24 })
 * setCookieExpiry(expiry)
 * // "expires=2024-03-16T18:30:00Z"
 *
 * // Configuration file writer
 * function saveConfiguration(config: {
 *   lastRun: Temporal.PlainDateTime;
 *   nextScheduled: Temporal.PlainDateTime;
 *   timezone: string;
 * }): Record<string, string | null> {
 *   return {
 *     lastRun: toISO(config.lastRun),
 *     nextScheduled: toISO(config.nextScheduled),
 *     timezone: config.timezone
 *   }
 * }
 *
 * // Audit trail formatter
 * function createAuditEntry(
 *   action: string,
 *   timestamp: Temporal.ZonedDateTime
 * ): { action: string; timestamp: string | null } {
 *   return {
 *     action,
 *     timestamp: toISO(timestamp)
 *   }
 * }
 *
 * const auditTime = Temporal.Now.zonedDateTimeISO("America/New_York")
 * createAuditEntry("USER_LOGIN", auditTime)
 * // { action: "USER_LOGIN", timestamp: "2024-03-15T14:30:00-04:00[America/New_York]" }
 *
 * // Export data formatter
 * function exportDataWithDates(
 *   records: Array<{ id: number; date: Temporal.PlainDate }>
 * ): Array<{ id: number; date: string | null }> {
 *   return records.map(record => ({
 *     id: record.id,
 *     date: toISO(record.date)
 *   }))
 * }
 *
 * const records = [
 *   { id: 1, date: Temporal.PlainDate.from("2024-01-15") },
 *   { id: 2, date: Temporal.PlainDate.from("2024-02-15") }
 * ]
 * exportDataWithDates(records)
 * // [{ id: 1, date: "2024-01-15" }, { id: 2, date: "2024-02-15" }]
 *
 * // Calendar event exporter
 * function exportCalendarEvent(event: {
 *   title: string;
 *   start: Temporal.PlainDateTime;
 *   end: Temporal.PlainDateTime;
 *   duration: Temporal.Duration;
 * }): Record<string, string | null> {
 *   return {
 *     title: event.title,
 *     start: toISO(event.start),
 *     end: toISO(event.end),
 *     duration: toISO(event.duration)
 *   }
 * }
 *
 * const event = {
 *   title: "Meeting",
 *   start: Temporal.PlainDateTime.from("2024-03-15T14:00:00"),
 *   end: Temporal.PlainDateTime.from("2024-03-15T15:00:00"),
 *   duration: Temporal.Duration.from({ hours: 1 })
 * }
 * exportCalendarEvent(event)
 * // { title: "Meeting", start: "2024-03-15T14:00:00", end: "2024-03-15T15:00:00", duration: "PT1H" }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Standard - Produces ISO 8601 compliant strings
 * @property Type-aware - Each Temporal type produces appropriate format
 */
const toISO = (
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.Duration
		| null
		| undefined,
): string | null => {
	if (temporal == null) {
		return null
	}

	// Validate temporal is a valid Temporal type with toString method
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainTime ||
		temporal instanceof Temporal.ZonedDateTime ||
		temporal instanceof Temporal.Instant ||
		temporal instanceof Temporal.PlainYearMonth ||
		temporal instanceof Temporal.PlainMonthDay ||
		temporal instanceof Temporal.Duration

	if (!isValidTemporal) {
		return null
	}

	try {
		// All Temporal types have a toString() method that produces ISO format
		return temporal.toString()
	} catch {
		return null
	}
}

export default toISO
