import type { DurationValue } from "../../../../types/temporal/index.ts"

import formatRelativeTime from "../formatRelativeTime/index.ts"
import formatDurationPart from "./formatDurationPart/index.ts"

/**
 * Format a duration to human-readable text
 */
export default function formatDuration(
	duration: DurationValue,
	locale?: string,
	options?: {
		format?: "long" | "short" | "narrow" | "digital" | "relative"
		showZeroUnits?: boolean
		maxUnits?: number
		relativeMode?: "past" | "future"
	},
): string {
	const format = options?.format || "long"
	const showZeroUnits = options?.showZeroUnits || false
	const maxUnits = options?.maxUnits
	const relativeMode = options?.relativeMode || "future"

	// Handle relative format
	if (format === "relative") {
		// Convert to milliseconds for relative time
		let totalMs = 0
		totalMs += (duration.years || 0) * 365.25 * 24 * 60 * 60 * 1000
		totalMs += (duration.months || 0) * 30.44 * 24 * 60 * 60 * 1000
		totalMs += (duration.weeks || 0) * 7 * 24 * 60 * 60 * 1000
		totalMs += (duration.days || 0) * 24 * 60 * 60 * 1000
		totalMs += (duration.hours || 0) * 60 * 60 * 1000
		totalMs += (duration.minutes || 0) * 60 * 1000
		totalMs += (duration.seconds || 0) * 1000
		totalMs += duration.milliseconds || 0

		const now = new Date()
		const target = new Date(
			now.getTime() + (relativeMode === "future" ? totalMs : -totalMs),
		)
		return formatRelativeTime(target, now, locale)
	}

	// Handle digital format
	if (format === "digital") {
		const totalSeconds = (duration.years || 0) * 365.25 * 24 * 60 * 60 +
			(duration.months || 0) * 30.44 * 24 * 60 * 60 +
			(duration.weeks || 0) * 7 * 24 * 60 * 60 +
			(duration.days || 0) * 24 * 60 * 60 +
			(duration.hours || 0) * 60 * 60 +
			(duration.minutes || 0) * 60 +
			(duration.seconds || 0)

		const hours = Math.floor(totalSeconds / 3600)
		const mins = Math.floor((totalSeconds % 3600) / 60)
		const secs = totalSeconds % 60

		if (hours > 0) {
			return `${hours}:${mins.toString().padStart(2, "0")}:${
				secs.toString().padStart(2, "0")
			}`
		}
		return `${mins}:${secs.toString().padStart(2, "0")}`
	}

	// Build parts array
	const parts: string[] = []
	const units = [
		{ value: duration.years, unit: "year" as const },
		{ value: duration.months, unit: "month" as const },
		{ value: duration.weeks, unit: "week" as const },
		{ value: duration.days, unit: "day" as const },
		{ value: duration.hours, unit: "hour" as const },
		{ value: duration.minutes, unit: "minute" as const },
		{ value: duration.seconds, unit: "second" as const },
	]

	let unitCount = 0
	for (const { value, unit } of units) {
		if (value && (value > 0 || showZeroUnits)) {
			if (maxUnits && unitCount >= maxUnits) break

			const style = format === "narrow"
				? "narrow"
				: format === "short"
				? "short"
				: "long"
			parts.push(formatDurationPart(value, unit, locale, style))
			unitCount++
		}
	}

	// Handle milliseconds/microseconds for narrow/short formats
	if (format === "narrow" || format === "short") {
		if (duration.milliseconds && duration.milliseconds > 0) {
			parts.push(`${duration.milliseconds}ms`)
		} else if (duration.microseconds && duration.microseconds > 0) {
			parts.push(`${duration.microseconds}μs`)
		}
	}

	// Join with locale-appropriate list formatting
	if (parts.length === 0) {
		return "0"
	}

	try {
		const formatter = new Intl.ListFormat(locale || "en-US", {
			style: format === "narrow" ? "narrow" : "long",
			type: "conjunction",
		})
		return formatter.format(parts)
	} catch (_error) {
		// Fallback to simple join
		return parts.join(", ")
	}
}
