/**
 * Date and time formatting utilities using Intl.DateTimeFormat
 */

import type { CalendarSystem } from "./calendars.ts"

export type DateStyle = "short" | "medium" | "long" | "full"
export type TimeStyle = "short" | "medium" | "long" | "full"

export interface FormatOptions extends Intl.DateTimeFormatOptions {
	dateStyle?: DateStyle
	timeStyle?: TimeStyle
	calendar?: CalendarSystem
}

/**
 * Format a date value with internationalization
 */
export function formatDate(
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

/**
 * Format a time value
 */
export function formatTime(
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

/**
 * Format a duration to human-readable text
 */
export function formatDuration(
	duration: {
		years?: number
		months?: number
		weeks?: number
		days?: number
		hours?: number
		minutes?: number
		seconds?: number
		milliseconds?: number
		microseconds?: number
		nanoseconds?: number
	},
	locale?: string,
	options?: {
		format?: "long" | "short" | "narrow" | "digital" | "relative"
		showZeroUnits?: boolean
		maxUnits?: number
		relativeMode?: "past" | "future"
	}
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
		totalMs += (duration.milliseconds || 0)
		
		const now = new Date()
		const target = new Date(now.getTime() + (relativeMode === "future" ? totalMs : -totalMs))
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
			return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
		{ value: duration.seconds, unit: "second" as const }
	]
	
	let unitCount = 0
	for (const { value, unit } of units) {
		if (value && (value > 0 || showZeroUnits)) {
			if (maxUnits && unitCount >= maxUnits) break
			
			const style = format === "narrow" ? "narrow" : format === "short" ? "short" : "long"
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
	const formatter = new Intl.ListFormat(locale || "en-US", {
		style: format === "narrow" ? "narrow" : "long",
		type: "conjunction"
	})
	
	return formatter.format(parts) || "0"
}

function formatDurationPart(
	value: number,
	unit: Intl.RelativeTimeFormatUnit,
	locale?: string,
	style: "short" | "long" = "long"
): string {
	// Format as positive relative time, then remove "in" prefix
	const rtf = new Intl.RelativeTimeFormat(locale || "en-US", {
		numeric: "always",
		style
	})
	
	// Get the formatted string and clean it up
	const formatted = rtf.format(value, unit)
	// Remove "in" prefix for future times in various languages
	return formatted.replace(/^(in |dans |tra |في |בעוד |через |om |en |за |में |)\s*/i, "")
}

/**
 * Format relative time (e.g., "3 days ago")
 */
export function formatRelativeTime(
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

/**
 * Format weekday name
 */
export function formatWeekday(
	date: Date | string,
	locale?: string,
	format: "narrow" | "short" | "long" = "long"
): string {
	const d = typeof date === "string" ? new Date(date) : date
	
	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		weekday: format
	})
	
	return formatter.format(d)
}

/**
 * Get timezone abbreviation
 */
export function getTimezoneAbbreviation(
	timezone: string,
	date: Date = new Date(),
	locale?: string
): string {
	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		timeZoneName: "short",
		timeZone: timezone
	})
	
	const parts = formatter.formatToParts(date)
	const timeZonePart = parts.find(part => part.type === "timeZoneName")
	
	return timeZonePart?.value || timezone
}