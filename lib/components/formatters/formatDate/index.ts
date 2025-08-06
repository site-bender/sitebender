import type { FormatOptions } from "../../../../types/temporal/index.ts"

/**
 * Format a date value with internationalization
 */
export default function formatDate(
	value: Date | string,
	locale?: string,
	options?: FormatOptions
): string {
	const date = typeof value === "string" ? new Date(value) : value
	
	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		...options,
		timeZone: options?.timeZone,
		calendar: options?.calendar
	})
	
	return formatter.format(date)
}