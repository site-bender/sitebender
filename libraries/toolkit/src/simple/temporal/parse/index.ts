/**
 * Parses date/time from string with flexible format support
 *
 * Attempts to parse a string into the appropriate Temporal object based on
 * the format detected. Supports ISO 8601 formats and common date/time patterns.
 * Returns the most specific Temporal type that matches the input format.
 * This is a curried function for easy composition. Returns null for invalid
 * inputs to support safe error handling.
 *
 * @curried (string) => Temporal object or null
 * @param dateString - The date/time string to parse
 * @returns Parsed Temporal object (PlainDate, PlainTime, PlainDateTime, etc.) or null
 * @example
 * ```typescript
 * // Basic date parsing
 * parse("2024-03-15")                     // Temporal.PlainDate
 * parse("2024-03-15T10:30:45")           // Temporal.PlainDateTime
 * parse("10:30:45")                       // Temporal.PlainTime
 * parse("2024-03")                        // Temporal.PlainYearMonth
 * parse("03-15")                          // Temporal.PlainMonthDay
 * parse("--03-15")                        // Temporal.PlainMonthDay (ISO format)
 *
 * // With time zones
 * parse("2024-03-15T10:30:45Z")          // Temporal.Instant
 * parse("2024-03-15T10:30:45-04:00[America/New_York]")  // Temporal.ZonedDateTime
 * parse("2024-03-15T10:30:45+09:00[Asia/Tokyo]")        // Temporal.ZonedDateTime
 *
 * // With fractional seconds
 * parse("2024-03-15T10:30:45.123")       // PlainDateTime with milliseconds
 * parse("10:30:45.123456789")            // PlainTime with nanoseconds
 *
 * // Date variations
 * parse("2024/03/15")                     // PlainDate (slash separator)
 * parse("2024.03.15")                     // PlainDate (dot separator)
 * parse("15-03-2024")                     // PlainDate (day first)
 * parse("03/15/2024")                     // PlainDate (US format)
 *
 * // Time variations
 * parse("10:30")                          // PlainTime (no seconds)
 * parse("10:30:45.123")                   // PlainTime with milliseconds
 * parse("T10:30:45")                      // PlainTime (with T prefix)
 *
 * // Invalid inputs
 * parse("invalid")                        // null
 * parse("")                               // null
 * parse("2024-13-45")                     // null (invalid month/day)
 *
 * // Type detection helper
 * function getTemporalType(dateString: string): string | null {
 *   const parsed = parse(dateString)
 *   if (parsed === null) return null
 *
 *   if (parsed instanceof Temporal.PlainDate) return "date"
 *   if (parsed instanceof Temporal.PlainTime) return "time"
 *   if (parsed instanceof Temporal.PlainDateTime) return "datetime"
 *   if (parsed instanceof Temporal.ZonedDateTime) return "zoned"
 *   if (parsed instanceof Temporal.Instant) return "instant"
 *   if (parsed instanceof Temporal.PlainYearMonth) return "yearmonth"
 *   if (parsed instanceof Temporal.PlainMonthDay) return "monthday"
 *
 *   return "unknown"
 * }
 *
 * getTemporalType("2024-03-15")           // "date"
 * getTemporalType("10:30:45")             // "time"
 * getTemporalType("2024-03-15T10:30:45Z") // "instant"
 *
 * // Safe date parsing with fallback
 * function parseWithDefault<T extends Temporal.PlainDate | Temporal.PlainDateTime>(
 *   dateString: string,
 *   defaultValue: T
 * ): T {
 *   const parsed = parse(dateString)
 *   return (parsed as T) ?? defaultValue
 * }
 *
 * const defaultDate = Temporal.PlainDate.from("2024-01-01")
 * parseWithDefault("invalid", defaultDate) // Returns defaultDate
 *
 * // Batch parsing with validation
 * function parseDates(dateStrings: Array<string>): Array<Temporal.PlainDate | null> {
 *   return dateStrings.map(str => {
 *     const parsed = parse(str)
 *     if (parsed instanceof Temporal.PlainDate) {
 *       return parsed
 *     }
 *     return null
 *   })
 * }
 *
 * parseDates(["2024-03-15", "2024-03-16", "invalid"])
 * // [PlainDate, PlainDate, null]
 *
 * // Format guesser
 * function guessDateFormat(dateString: string): string {
 *   const patterns = [
 *     { regex: /^\d{4}-\d{2}-\d{2}$/, format: "YYYY-MM-DD" },
 *     { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: "YYYY/MM/DD" },
 *     { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: "MM/DD/YYYY" },
 *     { regex: /^\d{2}-\d{2}-\d{4}$/, format: "DD-MM-YYYY" },
 *     { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, format: "ISO DateTime" },
 *     { regex: /^\d{2}:\d{2}:\d{2}$/, format: "HH:MM:SS" },
 *     { regex: /^\d{2}:\d{2}$/, format: "HH:MM" },
 *   ]
 *
 *   for (const { regex, format } of patterns) {
 *     if (regex.test(dateString)) {
 *       return format
 *     }
 *   }
 *
 *   return "Unknown"
 * }
 *
 * // Null handling
 * parse(null as any)                      // null
 * parse(undefined as any)                 // null
 * parse("")                               // null
 *
 * // Flexible parser for user input
 * function parseUserInput(input: string): Temporal.PlainDate | null {
 *   // Try various formats
 *   const formats = [
 *     input,                               // As-is
 *     input.replace(/\//g, "-"),          // Replace slashes with dashes
 *     input.replace(/\./g, "-"),          // Replace dots with dashes
 *   ]
 *
 *   for (const format of formats) {
 *     const parsed = parse(format)
 *     if (parsed instanceof Temporal.PlainDate ||
 *         parsed instanceof Temporal.PlainDateTime) {
 *       return parsed instanceof Temporal.PlainDate ?
 *         parsed : parsed.toPlainDate()
 *     }
 *   }
 *
 *   return null
 * }
 *
 * parseUserInput("2024/03/15")            // PlainDate 2024-03-15
 * parseUserInput("2024.03.15")            // PlainDate 2024-03-15
 * parseUserInput("15-03-2024")            // PlainDate 2024-03-15
 *
 * // Log parser
 * function parseLogTimestamp(logLine: string): Temporal.Instant | null {
 *   // Extract timestamp from log line
 *   const match = logLine.match(/\[([\d\-T:\.Z\+\-]+)\]/)
 *   if (!match) return null
 *
 *   const parsed = parse(match[1])
 *
 *   if (parsed instanceof Temporal.Instant) {
 *     return parsed
 *   }
 *   if (parsed instanceof Temporal.ZonedDateTime) {
 *     return parsed.toInstant()
 *   }
 *
 *   return null
 * }
 *
 * parseLogTimestamp("[2024-03-15T10:30:45.123Z] Error occurred")
 * // Temporal.Instant
 *
 * // API response parser
 * function parseApiDate(response: any): Temporal.PlainDate | null {
 *   if (typeof response?.date === 'string') {
 *     const parsed = parse(response.date)
 *     if (parsed instanceof Temporal.PlainDate) {
 *       return parsed
 *     }
 *     if (parsed instanceof Temporal.PlainDateTime) {
 *       return parsed.toPlainDate()
 *     }
 *   }
 *   return null
 * }
 *
 * // CSV date column parser
 * function parseCsvDates(
 *   rows: Array<Record<string, string>>,
 *   dateColumn: string
 * ): Array<Temporal.PlainDate | null> {
 *   return rows.map(row => {
 *     const dateStr = row[dateColumn]
 *     if (!dateStr) return null
 *
 *     const parsed = parse(dateStr)
 *     if (parsed instanceof Temporal.PlainDate) {
 *       return parsed
 *     }
 *     if (parsed instanceof Temporal.PlainDateTime) {
 *       return parsed.toPlainDate()
 *     }
 *
 *     return null
 *   })
 * }
 *
 * // Duration parser helper
 * function parseDurationBetween(
 *   startStr: string,
 *   endStr: string
 * ): Temporal.Duration | null {
 *   const start = parse(startStr)
 *   const end = parse(endStr)
 *
 *   if (start instanceof Temporal.PlainDateTime &&
 *       end instanceof Temporal.PlainDateTime) {
 *     return start.until(end)
 *   }
 *
 *   if (start instanceof Temporal.PlainDate &&
 *       end instanceof Temporal.PlainDate) {
 *     return start.until(end)
 *   }
 *
 *   return null
 * }
 *
 * parseDurationBetween("2024-03-15", "2024-03-20")
 * // Temporal.Duration P5D
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Supports multiple date/time formats
 * @property Type-aware - Returns appropriate Temporal type based on input
 */
const parse = (
	dateString: string | null | undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null => {
	if (dateString == null || dateString === "") {
		return null
	}

	// Clean the input
	const cleaned = dateString.trim()

	try {
		// Try Instant (ends with Z)
		if (cleaned.endsWith("Z")) {
			return Temporal.Instant.from(cleaned)
		}

		// Try ZonedDateTime (has timezone)
		if (cleaned.includes("[") || /[+-]\d{2}:\d{2}/.test(cleaned)) {
			return Temporal.ZonedDateTime.from(cleaned)
		}

		// Try PlainDateTime (has both date and time)
		if (
			cleaned.includes("T") || /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(cleaned)
		) {
			return Temporal.PlainDateTime.from(cleaned)
		}

		// Try PlainTime (time only patterns)
		if (/^T?\d{1,2}:\d{2}(:\d{2})?(\.\d+)?$/.test(cleaned)) {
			const timeStr = cleaned.startsWith("T") ? cleaned.slice(1) : cleaned
			return Temporal.PlainTime.from(timeStr)
		}

		// Try PlainYearMonth (YYYY-MM)
		if (/^\d{4}-\d{2}$/.test(cleaned)) {
			return Temporal.PlainYearMonth.from(cleaned)
		}

		// Try PlainMonthDay (--MM-DD or MM-DD)
		if (/^(--)?\d{2}-\d{2}$/.test(cleaned)) {
			const mdStr = cleaned.startsWith("--") ? cleaned.slice(2) : cleaned
			return Temporal.PlainMonthDay.from(mdStr)
		}

		// Try PlainDate with various separators
		// Handle US format (MM/DD/YYYY)
		if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleaned)) {
			const [month, day, year] = cleaned.split("/")
			return Temporal.PlainDate.from({
				year: parseInt(year),
				month: parseInt(month),
				day: parseInt(day),
			})
		}

		// Handle European format (DD-MM-YYYY or DD.MM.YYYY)
		if (/^\d{1,2}[-\.]\d{1,2}[-\.]\d{4}$/.test(cleaned)) {
			const parts = cleaned.split(/[-\.]/)
			const [day, month, year] = parts
			return Temporal.PlainDate.from({
				year: parseInt(year),
				month: parseInt(month),
				day: parseInt(day),
			})
		}

		// Handle YYYY/MM/DD or YYYY.MM.DD
		if (/^\d{4}[\/\.]\d{1,2}[\/\.]\d{1,2}$/.test(cleaned)) {
			const normalized = cleaned.replace(/[\/\.]/g, "-")
			return Temporal.PlainDate.from(normalized)
		}

		// Try standard ISO date (YYYY-MM-DD)
		if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
			return Temporal.PlainDate.from(cleaned)
		}

		// Last resort: try to parse as-is
		return Temporal.PlainDate.from(cleaned)
	} catch {
		// If all parsing attempts fail, return null
		return null
	}
}

export default parse
