/**
 * Parsing utilities for Temporal strings and ISO 8601 formats
 */

import type { CalendarSystem } from "./calendars.ts"

export interface ParsedTemporal {
	// Core date/time values
	year?: number
	month?: number
	day?: number
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
	microsecond?: number
	nanosecond?: number
	
	// Timezone and calendar
	timezone?: string
	offset?: string
	calendar?: CalendarSystem
	
	// Original string
	original: string
	
	// Type of temporal value
	type: "date" | "time" | "datetime" | "instant" | "yearmonth" | "monthday" | "duration"
}

/**
 * Parse a Temporal-style string with bracket notation
 * Examples:
 * - "2024-01-15"
 * - "2024-01-15[America/New_York]"
 * - "2024-01-15[America/New_York][u-ca=hebrew]"
 * - "2024-01-15T14:30:00[America/New_York]"
 * - "14:30:00[Europe/Paris]"
 */
export function parseTemporalString(value: string): ParsedTemporal {
	const original = value
	
	// Extract timezone and calendar from brackets
	const bracketMatch = value.match(/\[([^\]]+)\]/g)
	let timezone: string | undefined
	let calendar: CalendarSystem | undefined
	let cleanValue = value
	
	if (bracketMatch) {
		bracketMatch.forEach(match => {
			const content = match.slice(1, -1) // Remove brackets
			
			if (content.startsWith("u-ca=")) {
				// Calendar extension
				calendar = content.slice(5) as CalendarSystem
			} else {
				// Timezone
				timezone = content
			}
			
			// Remove from clean value
			cleanValue = cleanValue.replace(match, "")
		})
	}
	
	// Detect type and parse accordingly
	if (cleanValue.includes("T")) {
		// DateTime or Instant
		return parseDateTimeString(cleanValue, timezone, calendar, original)
	} else if (cleanValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
		// Date
		return parseDateString(cleanValue, timezone, calendar, original)
	} else if (cleanValue.match(/^\d{2}:\d{2}(:\d{2})?(\.\d+)?$/)) {
		// Time
		return parseTimeString(cleanValue, timezone, calendar, original)
	} else if (cleanValue.match(/^\d{4}-\d{2}$/)) {
		// YearMonth
		return parseYearMonthString(cleanValue, calendar, original)
	} else if (cleanValue.match(/^--\d{2}-\d{2}$/)) {
		// MonthDay
		return parseMonthDayString(cleanValue, calendar, original)
	} else if (cleanValue.startsWith("P")) {
		// Duration
		return parseDurationString(cleanValue, original)
	}
	
	throw new Error(`Invalid temporal string: ${value}`)
}

function parseDateString(
	value: string,
	timezone?: string,
	calendar?: CalendarSystem,
	original?: string
): ParsedTemporal {
	const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
	if (!match) throw new Error(`Invalid date string: ${value}`)
	
	return {
		year: parseInt(match[1], 10),
		month: parseInt(match[2], 10),
		day: parseInt(match[3], 10),
		timezone,
		calendar,
		original: original || value,
		type: "date"
	}
}

function parseTimeString(
	value: string,
	timezone?: string,
	calendar?: CalendarSystem,
	original?: string
): ParsedTemporal {
	const match = value.match(/^(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d+))?$/)
	if (!match) throw new Error(`Invalid time string: ${value}`)
	
	const fractional = match[4]
	let millisecond = 0
	let microsecond = 0
	let nanosecond = 0
	
	if (fractional) {
		const padded = fractional.padEnd(9, "0")
		millisecond = parseInt(padded.slice(0, 3), 10)
		microsecond = parseInt(padded.slice(3, 6), 10)
		nanosecond = parseInt(padded.slice(6, 9), 10)
	}
	
	return {
		hour: parseInt(match[1], 10),
		minute: parseInt(match[2], 10),
		second: match[3] ? parseInt(match[3], 10) : 0,
		millisecond,
		microsecond,
		nanosecond,
		timezone,
		calendar,
		original: original || value,
		type: "time"
	}
}

function parseDateTimeString(
	value: string,
	timezone?: string,
	calendar?: CalendarSystem,
	original?: string
): ParsedTemporal {
	const match = value.match(
		/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d+))?(?:Z|([+-]\d{2}:\d{2}))?$/
	)
	if (!match) throw new Error(`Invalid datetime string: ${value}`)
	
	const fractional = match[7]
	let millisecond = 0
	let microsecond = 0
	let nanosecond = 0
	
	if (fractional) {
		const padded = fractional.padEnd(9, "0")
		millisecond = parseInt(padded.slice(0, 3), 10)
		microsecond = parseInt(padded.slice(3, 6), 10)
		nanosecond = parseInt(padded.slice(6, 9), 10)
	}
	
	const offset = value.endsWith("Z") ? "Z" : match[8]
	const isInstant = !!offset
	
	return {
		year: parseInt(match[1], 10),
		month: parseInt(match[2], 10),
		day: parseInt(match[3], 10),
		hour: parseInt(match[4], 10),
		minute: parseInt(match[5], 10),
		second: match[6] ? parseInt(match[6], 10) : 0,
		millisecond,
		microsecond,
		nanosecond,
		timezone: timezone || (offset === "Z" ? "UTC" : undefined),
		offset,
		calendar,
		original: original || value,
		type: isInstant ? "instant" : "datetime"
	}
}

function parseYearMonthString(
	value: string,
	calendar?: CalendarSystem,
	original?: string
): ParsedTemporal {
	const match = value.match(/^(\d{4})-(\d{2})$/)
	if (!match) throw new Error(`Invalid year-month string: ${value}`)
	
	return {
		year: parseInt(match[1], 10),
		month: parseInt(match[2], 10),
		calendar,
		original: original || value,
		type: "yearmonth"
	}
}

function parseMonthDayString(
	value: string,
	calendar?: CalendarSystem,
	original?: string
): ParsedTemporal {
	const match = value.match(/^--(\d{2})-(\d{2})$/)
	if (!match) throw new Error(`Invalid month-day string: ${value}`)
	
	return {
		month: parseInt(match[1], 10),
		day: parseInt(match[2], 10),
		calendar,
		original: original || value,
		type: "monthday"
	}
}

function parseDurationString(value: string, original?: string): ParsedTemporal {
	// For now, just validate and return the original
	// Full parsing would extract all components
	if (!value.match(/^P/)) {
		throw new Error(`Invalid duration string: ${value}`)
	}
	
	return {
		original: original || value,
		type: "duration"
	}
}

/**
 * Build a datetime attribute value from components
 */
export function buildDateTimeAttribute(
	parsed: ParsedTemporal,
	includeTimezone = true,
	includeCalendar = true
): string {
	let result = ""
	
	// Build base value
	switch (parsed.type) {
		case "date":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`
			break
			
		case "time":
			result = `${String(parsed.hour).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}`
			if (parsed.second !== undefined) {
				result += `:${String(parsed.second).padStart(2, "0")}`
				if (parsed.microsecond || parsed.nanosecond) {
					const fractional = String(parsed.millisecond || 0).padStart(3, "0") +
						String(parsed.microsecond || 0).padStart(3, "0") +
						String(parsed.nanosecond || 0).padStart(3, "0")
					result += `.${fractional.replace(/0+$/, "")}`
				} else if (parsed.millisecond) {
					result += `.${String(parsed.millisecond).padStart(3, "0")}`
				}
			}
			break
			
		case "datetime":
		case "instant":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`
			result += `T${String(parsed.hour).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}`
			if (parsed.second !== undefined) {
				result += `:${String(parsed.second).padStart(2, "0")}`
				if (parsed.microsecond || parsed.nanosecond) {
					const fractional = String(parsed.millisecond || 0).padStart(3, "0") +
						String(parsed.microsecond || 0).padStart(3, "0") +
						String(parsed.nanosecond || 0).padStart(3, "0")
					result += `.${fractional.replace(/0+$/, "")}`
				} else if (parsed.millisecond) {
					result += `.${String(parsed.millisecond).padStart(3, "0")}`
				}
			}
			if (parsed.offset) {
				result += parsed.offset
			}
			break
			
		case "yearmonth":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}`
			break
			
		case "monthday":
			result = `--${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`
			break
			
		case "duration":
			return parsed.original
	}
	
	// Add timezone bracket
	if (includeTimezone && parsed.timezone && parsed.timezone !== "UTC") {
		result += `[${parsed.timezone}]`
	}
	
	// Add calendar bracket
	if (includeCalendar && parsed.calendar && parsed.calendar !== "iso8601" && parsed.calendar !== "gregory") {
		result += `[u-ca=${parsed.calendar}]`
	}
	
	return result
}