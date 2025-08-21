/**
 * Formats a Temporal object to a string according to locale and options
 * 
 * Converts Temporal dates, times, and datetimes to formatted strings using
 * Intl.DateTimeFormat. Supports various locales and formatting options.
 * Returns the ISO string as fallback for unsupported types or errors.
 * Works with PlainDate, PlainTime, PlainDateTime, ZonedDateTime, and Instant.
 * 
 * @curried (locale?) => (options?) => (temporal) => result
 * @param locale - BCP 47 language tag (e.g., "en-US", "fr-FR")
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param temporal - The Temporal object to format
 * @returns Formatted string, or ISO string if formatting fails
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * format()()(date)                        // "3/15/2024" (US default)
 * format("en-US")()(date)                 // "3/15/2024"
 * format("en-GB")()(date)                 // "15/03/2024"
 * format("de-DE")()(date)                 // "15.03.2024"
 * format("ja-JP")()(date)                 // "2024/03/15"
 * 
 * // With formatting options
 * const longDate = format("en-US")({ 
 *   weekday: "long", 
 *   year: "numeric", 
 *   month: "long", 
 *   day: "numeric" 
 * })
 * longDate(date)                          // "Friday, March 15, 2024"
 * 
 * const shortDate = format("en-US")({ 
 *   year: "2-digit", 
 *   month: "2-digit", 
 *   day: "2-digit" 
 * })
 * shortDate(date)                         // "03/15/24"
 * 
 * // With PlainTime
 * const time = Temporal.PlainTime.from("14:30:00")
 * format("en-US")()(time)                 // "2:30 PM"
 * format("en-GB")()(time)                 // "14:30"
 * format("en-US")({ hour12: false })(time) // "14:30"
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * format("en-US")()(datetime)             // "3/15/2024, 2:30 PM"
 * 
 * const detailed = format("en-US")({
 *   dateStyle: "full",
 *   timeStyle: "short"
 * })
 * detailed(datetime)                      // "Friday, March 15, 2024 at 2:30 PM"
 * 
 * // Partial application for consistent formatting
 * const formatUS = format("en-US")()
 * const formatUK = format("en-GB")()
 * const formatJP = format("ja-JP")()
 * 
 * const someDate = Temporal.PlainDate.from("2024-12-25")
 * formatUS(someDate)                      // "12/25/2024"
 * formatUK(someDate)                      // "25/12/2024"
 * formatJP(someDate)                      // "2024/12/25"
 * 
 * // Currency date formatting
 * const invoiceFormat = format("en-US")({
 *   year: "numeric",
 *   month: "short",
 *   day: "numeric"
 * })
 * const invoiceDate = Temporal.PlainDate.from("2024-03-15")
 * invoiceFormat(invoiceDate)              // "Mar 15, 2024"
 * 
 * // Different date styles
 * const styles = {
 *   full: format("en-US")({ dateStyle: "full" }),
 *   long: format("en-US")({ dateStyle: "long" }),
 *   medium: format("en-US")({ dateStyle: "medium" }),
 *   short: format("en-US")({ dateStyle: "short" })
 * }
 * 
 * const testDate = Temporal.PlainDate.from("2024-03-15")
 * styles.full(testDate)                   // "Friday, March 15, 2024"
 * styles.long(testDate)                   // "March 15, 2024"
 * styles.medium(testDate)                 // "Mar 15, 2024"
 * styles.short(testDate)                  // "3/15/24"
 * 
 * // Time formatting options
 * const timeFormats = {
 *   standard: format("en-US")({ timeStyle: "medium" }),
 *   military: format("en-US")({ hour12: false, timeStyle: "medium" }),
 *   withSeconds: format("en-US")({ 
 *     hour: "2-digit", 
 *     minute: "2-digit", 
 *     second: "2-digit" 
 *   })
 * }
 * 
 * const testTime = Temporal.PlainTime.from("14:30:45")
 * timeFormats.standard(testTime)          // "2:30:45 PM"
 * timeFormats.military(testTime)          // "14:30:45"
 * timeFormats.withSeconds(testTime)       // "02:30:45 PM"
 * 
 * // Null handling (returns empty string)
 * format()()(null)                        // ""
 * format()()(undefined)                   // ""
 * 
 * // Locale-specific month names
 * const monthFormat = format("en-US")({ month: "long" })
 * const january = Temporal.PlainDate.from("2024-01-15")
 * monthFormat(january)                    // "January"
 * 
 * const frenchMonth = format("fr-FR")({ month: "long" })
 * frenchMonth(january)                    // "janvier"
 * 
 * // Day of week formatting
 * const weekdayFormat = format("en-US")({ weekday: "long" })
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * weekdayFormat(friday)                   // "Friday"
 * 
 * // Report headers
 * const reportHeader = format("en-US")({
 *   year: "numeric",
 *   month: "long"
 * })
 * const reportMonth = Temporal.PlainDate.from("2024-03")
 * reportHeader(reportMonth)               // "March 2024"
 * 
 * // Email timestamps
 * const emailTimestamp = format("en-US")({
 *   weekday: "short",
 *   month: "short",
 *   day: "numeric",
 *   hour: "numeric",
 *   minute: "2-digit"
 * })
 * const emailTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * emailTimestamp(emailTime)               // "Fri, Mar 15, 2:30 PM"
 * 
 * // File naming
 * const fileNameFormat = format("en-US")({
 *   year: "numeric",
 *   month: "2-digit",
 *   day: "2-digit"
 * })
 * const fileDate = Temporal.PlainDate.from("2024-03-15")
 * const fileName = fileNameFormat(fileDate).replace(/\//g, "-")
 * // "03-15-2024"
 * 
 * // International formats
 * const formats = {
 *   us: format("en-US")(),
 *   uk: format("en-GB")(),
 *   de: format("de-DE")(),
 *   fr: format("fr-FR")(),
 *   es: format("es-ES")(),
 *   it: format("it-IT")(),
 *   pt: format("pt-BR")(),
 *   ru: format("ru-RU")(),
 *   zh: format("zh-CN")(),
 *   ja: format("ja-JP")(),
 *   ko: format("ko-KR")(),
 *   ar: format("ar-SA")()
 * }
 * 
 * const internationalDate = Temporal.PlainDate.from("2024-03-15")
 * Object.entries(formats).forEach(([locale, formatter]) => {
 *   console.log(`${locale}: ${formatter(internationalDate)}`)
 * })
 * 
 * // Meeting invitations
 * const meetingFormat = format("en-US")({
 *   weekday: "long",
 *   month: "long",
 *   day: "numeric",
 *   hour: "numeric",
 *   minute: "2-digit",
 *   timeZoneName: "short"
 * })
 * 
 * // Log entries
 * const logFormat = format("en-US")({
 *   year: "numeric",
 *   month: "2-digit",
 *   day: "2-digit",
 *   hour: "2-digit",
 *   minute: "2-digit",
 *   second: "2-digit",
 *   hour12: false
 * })
 * const logTime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * logFormat(logTime)                      // "03/15/2024, 14:30:45"
 * 
 * // Relative date display helper
 * function formatRelativeDate(
 *   date: Temporal.PlainDate
 * ): string {
 *   const today = Temporal.Now.plainDateISO()
 *   const days = date.since(today).days
 *   
 *   if (days === 0) return "Today"
 *   if (days === 1) return "Tomorrow"
 *   if (days === -1) return "Yesterday"
 *   
 *   return format("en-US")({ 
 *     month: "short", 
 *     day: "numeric" 
 *   })(date)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Flexible - Supports all locales and format options
 * @property Safe - Returns ISO string on error
 * @property International - Full i18n support via Intl API
 */
const format = (locale: string = "en-US") =>
	(options: Intl.DateTimeFormatOptions = {}) =>
	(temporal: Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | 
	          Temporal.ZonedDateTime | Temporal.Instant | null | undefined): string => {
	if (temporal == null) {
		return ""
	}
	
	try {
		// Convert Temporal objects to a format Intl can use
		let dateToFormat: Date
		
		if (temporal instanceof Temporal.PlainDate) {
			// Convert PlainDate to Date at midnight UTC
			dateToFormat = new Date(temporal.year, temporal.month - 1, temporal.day)
		} else if (temporal instanceof Temporal.PlainTime) {
			// Use today's date with the time
			const today = new Date()
			dateToFormat = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				temporal.hour,
				temporal.minute,
				temporal.second,
				temporal.millisecond
			)
		} else if (temporal instanceof Temporal.PlainDateTime) {
			// Convert PlainDateTime to Date
			dateToFormat = new Date(
				temporal.year,
				temporal.month - 1,
				temporal.day,
				temporal.hour,
				temporal.minute,
				temporal.second,
				temporal.millisecond
			)
		} else if (temporal instanceof Temporal.ZonedDateTime) {
			// ZonedDateTime can be converted to Instant then Date
			dateToFormat = new Date(temporal.epochMilliseconds)
		} else if (temporal instanceof Temporal.Instant) {
			// Instant has epochMilliseconds
			dateToFormat = new Date(temporal.epochMilliseconds)
		} else {
			// Unsupported type, return ISO string
			return temporal.toString()
		}
		
		// Create formatter and format the date
		const formatter = new Intl.DateTimeFormat(locale, options)
		return formatter.format(dateToFormat)
	} catch {
		// On any error, try to return ISO string
		try {
			return temporal.toString()
		} catch {
			return ""
		}
	}
}

export default format