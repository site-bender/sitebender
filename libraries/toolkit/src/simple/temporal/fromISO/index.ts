/**
 * Parses an ISO 8601 string to the appropriate Temporal object
 *
 * Automatically detects the format and returns the corresponding Temporal type:
 * PlainDate for dates, PlainTime for times, PlainDateTime for date-times,
 * ZonedDateTime for zoned date-times, YearMonth for year-months, or Duration
 * for durations. Returns null for invalid or unrecognized formats.
 *
 * @param isoString - ISO 8601 formatted string
 * @returns Appropriate Temporal object, or null if invalid
 * @example
 * ```typescript
 * // PlainDate formats (YYYY-MM-DD)
 * fromISO("2024-03-15")                   // Temporal.PlainDate
 * fromISO("2024-12-31")                   // Temporal.PlainDate
 * fromISO("2024-02-29")                   // Temporal.PlainDate (leap year)
 *
 * // PlainTime formats (HH:MM:SS)
 * fromISO("14:30:00")                     // Temporal.PlainTime
 * fromISO("09:15:30.500")                 // Temporal.PlainTime with milliseconds
 * fromISO("23:59:59.999999999")           // Temporal.PlainTime with nanoseconds
 *
 * // PlainDateTime formats (YYYY-MM-DDTHH:MM:SS)
 * fromISO("2024-03-15T14:30:00")          // Temporal.PlainDateTime
 * fromISO("2024-03-15T09:15:30.500")      // Temporal.PlainDateTime
 *
 * // ZonedDateTime formats (with timezone)
 * fromISO("2024-03-15T14:30:00-04:00[America/New_York]")
 * // Temporal.ZonedDateTime
 *
 * fromISO("2024-03-15T14:30:00Z")         // Temporal.Instant (UTC)
 * fromISO("2024-03-15T14:30:00+09:00")    // With offset
 *
 * // YearMonth formats (YYYY-MM)
 * fromISO("2024-03")                      // Temporal.PlainYearMonth
 * fromISO("2024-12")                      // Temporal.PlainYearMonth
 *
 * // Duration formats (P...)
 * fromISO("P1Y2M3DT4H5M6S")               // Temporal.Duration
 * fromISO("PT1H30M")                      // Temporal.Duration (1h 30m)
 * fromISO("P7D")                          // Temporal.Duration (7 days)
 * fromISO("P1M")                          // Temporal.Duration (1 month)
 *
 * // Invalid formats
 * fromISO("2024-13-01")                   // null (invalid month)
 * fromISO("2024-02-30")                   // null (invalid day)
 * fromISO("25:00:00")                     // null (invalid hour)
 * fromISO("not-a-date")                   // null
 * fromISO("")                             // null
 *
 * // Parsing user input
 * function parseUserDate(input: string): Temporal.PlainDate | null {
 *   const parsed = fromISO(input)
 *   if (parsed instanceof Temporal.PlainDate) {
 *     return parsed
 *   }
 *   return null
 * }
 *
 * parseUserDate("2024-03-15")             // PlainDate
 * parseUserDate("14:30:00")               // null (not a date)
 *
 * // API response parsing
 * function parseAPITimestamp(
 *   timestamp: string
 * ): Temporal.PlainDateTime | Temporal.ZonedDateTime | null {
 *   const parsed = fromISO(timestamp)
 *   if (parsed instanceof Temporal.PlainDateTime ||
 *       parsed instanceof Temporal.ZonedDateTime) {
 *     return parsed
 *   }
 *   return null
 * }
 *
 * // Database date handling
 * function parseDBDate(dateStr: string): Temporal.PlainDate | null {
 *   const parsed = fromISO(dateStr)
 *   return parsed instanceof Temporal.PlainDate ? parsed : null
 * }
 *
 * // Form validation
 * function validateDateInput(input: string): {
 *   valid: boolean
 *   date?: Temporal.PlainDate
 *   error?: string
 * } {
 *   const parsed = fromISO(input)
 *
 *   if (parsed instanceof Temporal.PlainDate) {
 *     return { valid: true, date: parsed }
 *   }
 *
 *   return {
 *     valid: false,
 *     error: "Please enter a valid date (YYYY-MM-DD)"
 *   }
 * }
 *
 * // Null handling
 * fromISO(null as any)                    // null
 * fromISO(undefined as any)                // null
 *
 * // Configuration file parsing
 * const config = {
 *   startDate: "2024-03-15",
 *   endDate: "2024-12-31",
 *   dailyBackupTime: "03:00:00",
 *   maintenanceWindow: "PT4H"
 * }
 *
 * const parsed = {
 *   startDate: fromISO(config.startDate),          // PlainDate
 *   endDate: fromISO(config.endDate),              // PlainDate
 *   dailyBackupTime: fromISO(config.dailyBackupTime), // PlainTime
 *   maintenanceWindow: fromISO(config.maintenanceWindow) // Duration
 * }
 *
 * // Log file parsing
 * function parseLogTimestamp(line: string): Temporal.PlainDateTime | null {
 *   // Extract ISO timestamp from log line
 *   const match = line.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
 *   if (!match) return null
 *
 *   const parsed = fromISO(match[0])
 *   return parsed instanceof Temporal.PlainDateTime ? parsed : null
 * }
 *
 * // JSON date revival
 * function reviveJSON(key: string, value: any): any {
 *   if (typeof value === "string") {
 *     const parsed = fromISO(value)
 *     if (parsed) return parsed
 *   }
 *   return value
 * }
 *
 * const jsonStr = '{"date":"2024-03-15","time":"14:30:00"}'
 * const obj = JSON.parse(jsonStr, reviveJSON)
 * // obj.date is Temporal.PlainDate
 * // obj.time is Temporal.PlainTime
 *
 * // Schedule parsing
 * const schedule = [
 *   "2024-03-15T09:00:00",
 *   "2024-03-15T11:00:00",
 *   "2024-03-15T14:00:00"
 * ].map(fromISO).filter(Boolean)
 * // Array of PlainDateTime objects
 *
 * // Duration calculations
 * const durations = [
 *   "PT30M",      // 30 minutes
 *   "PT1H",       // 1 hour
 *   "P1D",        // 1 day
 *   "P1W"         // 1 week
 * ].map(fromISO).filter(d => d instanceof Temporal.Duration)
 *
 * // Calendar event parsing
 * function parseCalendarEvent(event: {
 *   start: string
 *   duration: string
 * }): {
 *   start: Temporal.PlainDateTime | null
 *   end: Temporal.PlainDateTime | null
 * } {
 *   const start = fromISO(event.start)
 *   const duration = fromISO(event.duration)
 *
 *   if (start instanceof Temporal.PlainDateTime &&
 *       duration instanceof Temporal.Duration) {
 *     return {
 *       start,
 *       end: start.add(duration)
 *     }
 *   }
 *
 *   return { start: null, end: null }
 * }
 *
 * // Batch date processing
 * const dates = [
 *   "2024-03-15",
 *   "2024-03-16",
 *   "invalid",
 *   "2024-03-17"
 * ]
 *
 * const validDates = dates
 *   .map(fromISO)
 *   .filter((d): d is Temporal.PlainDate =>
 *     d instanceof Temporal.PlainDate
 *   )
 * // [PlainDate, PlainDate, PlainDate] (invalid filtered out)
 *
 * // Migration from Date to Temporal
 * function migrateDate(dateStr: string): Temporal.PlainDate | null {
 *   // Try ISO format first
 *   const parsed = fromISO(dateStr)
 *   if (parsed instanceof Temporal.PlainDate) {
 *     return parsed
 *   }
 *
 *   // Try other formats...
 *   return null
 * }
 *
 * // Type detection
 * function getTemporalType(isoStr: string): string {
 *   const parsed = fromISO(isoStr)
 *   if (!parsed) return "invalid"
 *
 *   if (parsed instanceof Temporal.PlainDate) return "date"
 *   if (parsed instanceof Temporal.PlainTime) return "time"
 *   if (parsed instanceof Temporal.PlainDateTime) return "datetime"
 *   if (parsed instanceof Temporal.ZonedDateTime) return "zoned"
 *   if (parsed instanceof Temporal.PlainYearMonth) return "yearmonth"
 *   if (parsed instanceof Temporal.Duration) return "duration"
 *   if (parsed instanceof Temporal.Instant) return "instant"
 *
 *   return "unknown"
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Flexible - Auto-detects and parses multiple ISO formats
 * @property Safe - Returns null for invalid inputs
 * @property Complete - Supports all major Temporal types
 */
const fromISO = (
	isoString: string | null | undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.PlainYearMonth
	| Temporal.Duration
	| Temporal.Instant
	| null => {
	if (isoString == null || typeof isoString !== "string") {
		return null
	}

	const trimmed = isoString.trim()
	if (trimmed.length === 0) {
		return null
	}

	try {
		// Try to detect and parse different formats

		// Duration format (starts with P)
		if (trimmed.startsWith("P")) {
			return Temporal.Duration.from(trimmed)
		}

		// Check for time-only format (HH:MM:SS)
		if (/^\d{2}:\d{2}(:\d{2})?/.test(trimmed) && !trimmed.includes("-")) {
			return Temporal.PlainTime.from(trimmed)
		}

		// Check for year-month format (YYYY-MM)
		if (/^\d{4}-\d{2}$/.test(trimmed)) {
			return Temporal.PlainYearMonth.from(trimmed)
		}

		// Check for date-only format (YYYY-MM-DD)
		if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
			return Temporal.PlainDate.from(trimmed)
		}

		// Check for datetime with timezone or offset
		if (trimmed.includes("[") || /[+-]\d{2}:\d{2}/.test(trimmed)) {
			return Temporal.ZonedDateTime.from(trimmed)
		}

		// Check for UTC instant (ends with Z)
		if (trimmed.endsWith("Z")) {
			return Temporal.Instant.from(trimmed)
		}

		// Check for plain datetime format (YYYY-MM-DDTHH:MM:SS)
		if (trimmed.includes("T")) {
			return Temporal.PlainDateTime.from(trimmed)
		}

		// Fallback: try as PlainDate
		return Temporal.PlainDate.from(trimmed)
	} catch {
		// If all parsing attempts fail, return null
		return null
	}
}

export default fromISO
