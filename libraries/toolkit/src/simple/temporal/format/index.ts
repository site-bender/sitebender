/**
 * Formats a Temporal object to a string according to locale and options
 *
 * Converts Temporal dates, times, and datetimes to formatted strings using
 * Intl.DateTimeFormat. Supports various locales and formatting options.
 * Returns the ISO string as fallback for unsupported types or errors.
 * Works with PlainDate, PlainTime, PlainDateTime, ZonedDateTime, and Instant.
 *
 * @param locale - BCP 47 language tag (e.g., "en-US", "fr-FR")
 * @param options - Intl.DateTimeFormatOptions for formatting. Additionally supports
 *   an optional `timeZoneMode` extension for handling PlainDate/PlainTime/PlainDateTime
 *   conversion to JS Date:
 *   - "local" (default): interpret values in the local time zone
 *   - "utc": interpret values in UTC (e.g., PlainDate at 00:00:00 UTC)
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
import isNull from "../../validation/isNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

type FormatOptions = Intl.DateTimeFormatOptions & { timeZoneMode?: "local" | "utc" }

const format =
	(locale: string = "en-US") =>
	(options: FormatOptions = {}) =>
	(
		temporal:
			| unknown
			| null
			| undefined,
	): string => {
		if (isNullish(temporal)) {
			return ""
		}

		try {
			// Convert Temporal objects to a format Intl can use
			let dateToFormat: Date
			const tzMode = options.timeZoneMode ?? "local"

			if (temporal instanceof Temporal.PlainDate) {
				const t = temporal as unknown as { year: number; month: number; day: number }
				// Convert PlainDate to Date at midnight in selected time zone
				dateToFormat = tzMode === "utc"
					? new Date(Date.UTC(t.year, t.month - 1, t.day))
					: new Date(t.year, t.month - 1, t.day)
			} else if (temporal instanceof Temporal.PlainTime) {
				// Use today's date with the time, in selected time zone
				const t = temporal as unknown as {
					hour?: number
					minute?: number
					second?: number
					millisecond?: number
				}
				const today = new Date()
				dateToFormat = tzMode === "utc"
					? new Date(
						Date.UTC(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							t.hour ?? 0,
							t.minute ?? 0,
							t.second ?? 0,
							t.millisecond ?? 0,
						),
					)
					: new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						t.hour ?? 0,
						t.minute ?? 0,
						t.second ?? 0,
						t.millisecond ?? 0,
					)
			} else if (temporal instanceof Temporal.PlainDateTime) {
				// Convert PlainDateTime to Date in selected time zone
				const t = temporal as unknown as {
					year: number
					month: number
					day: number
					hour?: number
					minute?: number
					second?: number
					millisecond?: number
				}
				dateToFormat = tzMode === "utc"
					? new Date(
						Date.UTC(
							t.year,
							t.month - 1,
							t.day,
							t.hour ?? 0,
							t.minute ?? 0,
							t.second ?? 0,
							t.millisecond ?? 0,
						),
					)
					: new Date(
						t.year,
						t.month - 1,
						t.day,
						t.hour ?? 0,
						t.minute ?? 0,
						t.second ?? 0,
						t.millisecond ?? 0,
					)
			} else if (hasEpochMilliseconds(temporal)) {
				// Handle Temporal.Instant or Temporal.ZonedDateTime via duck typing
				dateToFormat = new Date(temporal.epochMilliseconds)
			} else {
				// Unsupported type, return ISO string
				const t = temporal as { toString?: () => string }
				return typeof t.toString === "function" ? t.toString() : ""
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

function hasEpochMilliseconds(x: unknown): x is { epochMilliseconds: number } {
	if (typeof x !== "object" || isNull(x)) return false
	const r = x as Record<string, unknown>
	return typeof r.epochMilliseconds === "number"
}

export default format
