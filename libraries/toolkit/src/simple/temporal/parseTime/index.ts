import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Parses time strings into Temporal.PlainTime objects
 * 
 * Converts various time string formats into Temporal.PlainTime objects with
 * flexible parsing support for common time formats. Handles 12-hour and 24-hour
 * formats, optional seconds, and various separators. Returns null for invalid
 * inputs to support safe error handling. Uses strict validation to ensure
 * parsed times are valid.
 * 
 * @param timeString - Time string in various supported formats
 * @returns Temporal.PlainTime object or null if invalid
 * @example
 * ```typescript
 * // 24-hour format
 * parseTime("14:30:00")   // PlainTime 14:30:00
 * parseTime("14:30")      // PlainTime 14:30:00
 * parseTime("23:59:59")   // PlainTime 23:59:59
 * 
 * // 12-hour format with AM/PM
 * parseTime("2:30 PM")    // PlainTime 14:30:00
 * parseTime("9:15 AM")    // PlainTime 09:15:00
 * parseTime("12:00 PM")   // PlainTime 12:00:00 (noon)
 * parseTime("12:00 AM")   // PlainTime 00:00:00 (midnight)
 * 
 * // Alternative separators and precision
 * parseTime("14.30.00")         // PlainTime 14:30:00
 * parseTime("14:30:00.500")    // PlainTime 14:30:00.500
 * 
 * // Schedule parsing with filtering
 * const schedule = ["9:00 AM", "10:30 AM", "2:15 PM"]
 * const parsedTimes = schedule
 *   .map(parseTime)
 *   .filter((time): time is Temporal.PlainTime => time !== null)
 * 
 * // Invalid input handling
 * parseTime("25:00")      // null (hour > 23)
 * parseTime("14:60")      // null (minute > 59)
 * parseTime(null)         // null
 * ```
 * @pure
 * @safe
 */
const parseTime = (
	timeString: string | null | undefined
): Temporal.PlainTime | null => {
	if (isNullish(timeString) || typeof timeString !== "string") {
		return null
	}
	
	const input = timeString.trim()
	if (input.length === 0) {
		return null
	}
	
	try {
		// Remove timezone indicators (Z, UTC, etc.) if present
		let cleanInput = input.replace(/[zZ]$/, "").trim()
		
		// Check for AM/PM format
		const ampmMatch = cleanInput.match(/^(.+?)\s*([ap])m?$/i)
		if (ampmMatch) {
			const timePart = ampmMatch[1].trim()
			const period = ampmMatch[2].toLowerCase()
			
			// Parse the time part (allow : or . as separator)
			const timeMatch = timePart.match(/^(\d{1,2})[:.:](\d{1,2})(?:[:.:](\d{1,2})(?:[.](\d+))?)?$/)
			if (!timeMatch) return null
			
			let hour = parseInt(timeMatch[1], 10)
			const minute = parseInt(timeMatch[2], 10)
			const second = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0
			const subsecondStr = timeMatch[4] || "0"
			
			// Validate basic ranges for 12-hour format
			if (hour < 1 || hour > 12 || minute > 59 || second > 59) {
				return null
			}
			
			// Convert to 24-hour format
			if (period === "a") {
				// AM: 12 AM becomes 0, others stay the same
				if (hour === 12) hour = 0
			} else {
				// PM: 12 PM stays 12, others add 12
				if (hour !== 12) hour += 12
			}
			
			// Parse subseconds
			let millisecond = 0
			let microsecond = 0
			let nanosecond = 0
			
			if (subsecondStr.length > 0) {
				// Pad or truncate to 9 digits (nanoseconds)
				const padded = subsecondStr.padEnd(9, "0").slice(0, 9)
				millisecond = parseInt(padded.slice(0, 3), 10)
				microsecond = parseInt(padded.slice(3, 6), 10)
				nanosecond = parseInt(padded.slice(6, 9), 10)
			}
			
			return Temporal.PlainTime.from({
				hour,
				minute,
				second,
				millisecond,
				microsecond,
				nanosecond
			})
		}
		
		// Try 24-hour format (allow : or . as separator)
		const time24Match = cleanInput.match(/^(\d{1,2})[:.:](\d{1,2})(?:[:.:](\d{1,2})(?:[.](\d+))?)?$/)
		if (time24Match) {
			const hour = parseInt(time24Match[1], 10)
			const minute = parseInt(time24Match[2], 10)
			const second = time24Match[3] ? parseInt(time24Match[3], 10) : 0
			const subsecondStr = time24Match[4] || "0"
			
			// Validate 24-hour ranges
			if (hour > 23 || minute > 59 || second > 59) {
				return null
			}
			
			// Parse subseconds
			let millisecond = 0
			let microsecond = 0
			let nanosecond = 0
			
			if (subsecondStr.length > 0) {
				// Pad or truncate to 9 digits (nanoseconds)
				const padded = subsecondStr.padEnd(9, "0").slice(0, 9)
				millisecond = parseInt(padded.slice(0, 3), 10)
				microsecond = parseInt(padded.slice(3, 6), 10)
				nanosecond = parseInt(padded.slice(6, 9), 10)
			}
			
			return Temporal.PlainTime.from({
				hour,
				minute,
				second,
				millisecond,
				microsecond,
				nanosecond
			})
		}
		
		// Try direct Temporal.PlainTime parsing as fallback
		return Temporal.PlainTime.from(cleanInput)
	} catch {
		return null
	}
}

export default parseTime