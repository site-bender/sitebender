/**
 * Formats a Temporal object to a string according to locale and options
 *
 * Converts Temporal dates, times, and datetimes to formatted strings using
 * Intl.DateTimeFormat. Supports various locales and formatting options.
 * Returns the ISO string as fallback for unsupported types or errors.
 * Works with PlainDate, PlainTime, PlainDateTime, ZonedDateTime, and Instant.
 *
 * @param locale - BCP 47 language tag (e.g., "en-US", "fr-FR")
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param temporal - The Temporal object to format
 * @returns Formatted string, or ISO string if formatting fails
 * @example
 * ```typescript
 * // Basic usage
 * const date = Temporal.PlainDate.from("2024-03-15")
 * format()()(date)                        // "3/15/2024" (US default)
 * format("en-US")()(date)                 // "3/15/2024"
 * format("en-GB")()(date)                 // "15/03/2024"
 * format("de-DE")()(date)                 // "15.03.2024"
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
 * // Different types
 * const time = Temporal.PlainTime.from("14:30:00")
 * format("en-US")()(time)                 // "2:30 PM"
 * format("en-US")({ hour12: false })(time) // "14:30"
 *
 * // Partial application
 * const formatUS = format("en-US")()
 * const formatUK = format("en-GB")()
 * const formatJP = format("ja-JP")()
 *
 * // Date styles
 * const styles = {
 *   full: format("en-US")({ dateStyle: "full" }),
 *   long: format("en-US")({ dateStyle: "long" }),
 *   short: format("en-US")({ dateStyle: "short" })
 * }
 *
 * // Edge cases
 * format()()(null)                        // ""
 * format()()(undefined)                   // ""
 * ```
 * @pure
 * @safe
 * @curried
 */
const format =
	(locale: string = "en-US") =>
	(options: Intl.DateTimeFormatOptions = {}) =>
	(
		temporal:
			| Temporal.PlainDate
			| Temporal.PlainTime
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| Temporal.Instant
			| null
			| undefined,
	): string => {
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
					temporal.millisecond,
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
					temporal.millisecond,
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
