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
	
	// Check if date is valid
	if (isNaN(date.getTime())) {
		return value.toString()
	}
	
	try {
		const formatter = new Intl.DateTimeFormat(locale || "en-US", options || {})
		return formatter.format(date)
	} catch (error) {
		// Fallback to ISO string if Intl fails
		return date.toISOString().split('T')[0]
	}
}