//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNull from "../../validation/isNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

type FormatOptions = Intl.DateTimeFormatOptions & {
	timeZoneMode?: "local" | "utc"
}

export default function format(locale: string = "en-US") {
	return function formatWithLocale(options: FormatOptions = {}) {
		return function formatTemporal(
			temporal:
				| unknown
				| null
				| undefined,
		): string {
			if (isNullish(temporal)) {
				return ""
			}

			try {
				// Convert Temporal objects to a format Intl can use
				let dateToFormat: Date
				const tzMode = options.timeZoneMode ?? "local"

				if (temporal instanceof Temporal.PlainDate) {
					const t = temporal as unknown as {
						year: number
						month: number
						day: number
					}
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
	}
}

function hasEpochMilliseconds(x: unknown): x is { epochMilliseconds: number } {
	if (typeof x !== "object" || isNull(x)) return false
	const r = x as Record<string, unknown>
	return typeof r.epochMilliseconds === "number"
}
