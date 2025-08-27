import type { FormatOptions } from "../../../../types/temporal/index.ts"

/**
 * Format a time value
 */
export default function formatTime(
	hours: number,
	minutes: number,
	seconds?: number,
	locale?: string,
	options?: FormatOptions,
): string {
	// Create a date object with just the time
	const date = new Date(2000, 0, 1, hours, minutes, seconds || 0)

	try {
		// Build Intl options explicitly to satisfy TS and clamp fractionalSecondDigits to 1-3
		const formatOptions: Intl.DateTimeFormatOptions = {
			hour: "numeric",
			minute: "2-digit",
			...(seconds !== undefined && { second: "2-digit" }),
			...(options?.hour12 !== undefined && { hour12: options.hour12 }),
			...(options?.timeZone && { timeZone: options.timeZone }),
			...(options?.fractionalSecondDigits
				? { fractionalSecondDigits: Math.min(3, Math.max(1, options.fractionalSecondDigits)) as 1 | 2 | 3 }
				: {}),
		}

		const formatter = new Intl.DateTimeFormat(locale || "en-US", formatOptions)
		return formatter.format(date)
	} catch (_error) {
		// Fallback formatting
		const h = String(hours).padStart(2, "0")
		const m = String(minutes).padStart(2, "0")
		const s = seconds !== undefined
			? `:${String(seconds).padStart(2, "0")}`
			: ""
		return `${h}:${m}${s}`
	}
}
