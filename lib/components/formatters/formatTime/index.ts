import type { FormatOptions } from "../../../../types/temporal/index.ts"

/**
 * Format a time value
 */
export default function formatTime(
	hours: number,
	minutes: number,
	seconds?: number,
	locale?: string,
	options?: FormatOptions
): string {
	// Create a date object with just the time
	const date = new Date(2000, 0, 1, hours, minutes, seconds || 0)
	
	try {
		const formatOptions = {
			hour: "numeric",
			minute: "2-digit",
			...(seconds !== undefined && { second: "2-digit" }),
			...options
		}
		
		const formatter = new Intl.DateTimeFormat(locale || "en-US", formatOptions)
		return formatter.format(date)
	} catch (error) {
		// Fallback formatting
		const h = String(hours).padStart(2, "0")
		const m = String(minutes).padStart(2, "0")
		const s = seconds !== undefined ? `:${String(seconds).padStart(2, "0")}` : ""
		return `${h}:${m}${s}`
	}
}