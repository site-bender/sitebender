/**
 * Format relative time (e.g., "3 days ago")
 */
export default function formatRelativeTime(
	date: Date | string,
	relativeTo: Date = new Date(),
	locale?: string
): string {
	const targetDate = typeof date === "string" ? new Date(date) : date
	const diffMs = targetDate.getTime() - relativeTo.getTime()
	const diffSecs = Math.round(diffMs / 1000)
	const diffMins = Math.round(diffSecs / 60)
	const diffHours = Math.round(diffMins / 60)
	const diffDays = Math.round(diffHours / 24)
	
	const rtf = new Intl.RelativeTimeFormat(locale || "en-US", {
		numeric: "auto"
	})
	
	if (Math.abs(diffSecs) < 60) {
		return rtf.format(diffSecs, "second")
	} else if (Math.abs(diffMins) < 60) {
		return rtf.format(diffMins, "minute")
	} else if (Math.abs(diffHours) < 24) {
		return rtf.format(diffHours, "hour")
	} else if (Math.abs(diffDays) < 30) {
		return rtf.format(diffDays, "day")
	} else if (Math.abs(diffDays) < 365) {
		return rtf.format(Math.round(diffDays / 30), "month")
	} else {
		return rtf.format(Math.round(diffDays / 365), "year")
	}
}