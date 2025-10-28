import type { FormatOptions } from "../../../../types/temporal/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function formatDate(
	value: Date | string,
	locale?: string,
	options?: FormatOptions | Intl.DateTimeFormatOptions,
): string {
	const date = typeof value === "string" ? new Date(value) : value

	// Check if date is valid
	if (isNaN(date.getTime())) {
		return value.toString()
	}

	try {
		const formatter = new Intl.DateTimeFormat(
			locale || "en-US",
			options || {},
		)
		return formatter.format(date)
	} catch (_error) {
		// Fallback to ISO string if Intl fails
		return date.toISOString().split("T")[0]
	}
}
