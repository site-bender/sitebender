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
	
	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		hour: options?.hour || "numeric",
		minute: options?.minute || "2-digit",
		second: options?.second,
		hour12: options?.hour12,
		timeZone: options?.timeZone,
		...options
	})
	
	return formatter.format(date)
}