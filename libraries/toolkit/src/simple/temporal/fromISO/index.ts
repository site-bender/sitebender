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
 * // Different ISO formats
 * fromISO("2024-03-15")                   // Temporal.PlainDate
 * fromISO("14:30:00")                     // Temporal.PlainTime
 * fromISO("2024-03-15T14:30:00")          // Temporal.PlainDateTime
 * fromISO("2024-03-15T14:30:00Z")         // Temporal.Instant (UTC)
 * fromISO("2024-03")                      // Temporal.PlainYearMonth
 * fromISO("P1Y2M3DT4H5M6S")               // Temporal.Duration
 *
 * // Invalid formats
 * fromISO("2024-13-01")                   // null
 * fromISO("not-a-date")                   // null
 * fromISO(null as any)                    // null
 *
 * // Type checking
 * const parseDate = (input: string): Temporal.PlainDate | null => {
 *   const parsed = fromISO(input)
 *   return parsed instanceof Temporal.PlainDate ? parsed : null
 * }
 *
 * // Batch processing
 * const validDates = [
 *   "2024-03-15",
 *   "2024-03-16",
 *   "invalid"
 * ].map(fromISO).filter((d): d is Temporal.PlainDate =>
 *   d instanceof Temporal.PlainDate
 * )
 *
 * // Type detection
 * const getTemporalType = (isoStr: string): string => {
 *   const parsed = fromISO(isoStr)
 *   if (!parsed) return "invalid"
 *   if (parsed instanceof Temporal.PlainDate) return "date"
 *   if (parsed instanceof Temporal.PlainTime) return "time"
 *   if (parsed instanceof Temporal.PlainDateTime) return "datetime"
 *   if (parsed instanceof Temporal.Duration) return "duration"
 *   return "unknown"
 * }
 * ```
 * @pure
 * @safe
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
