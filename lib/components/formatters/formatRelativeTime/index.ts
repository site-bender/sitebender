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
	
	try {
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
	} catch (error) {
		// Fallback for environments without Intl.RelativeTimeFormat
		const abs = Math.abs(diffDays)
		const unit = abs >= 365 ? "year" : abs >= 30 ? "month" : abs >= 1 ? "day" : 
			Math.abs(diffHours) >= 1 ? "hour" : Math.abs(diffMins) >= 1 ? "minute" : "second"
		const value = unit === "year" ? Math.round(diffDays / 365) :
			unit === "month" ? Math.round(diffDays / 30) :
			unit === "day" ? diffDays :
			unit === "hour" ? diffHours :
			unit === "minute" ? diffMins : diffSecs
		
		const plural = Math.abs(value) !== 1 ? "s" : ""
		const ago = value < 0 ? " ago" : ""
		return `${Math.abs(value)} ${unit}${plural}${ago}`
	}
}