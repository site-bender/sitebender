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
 * // 24-hour format (ISO standard)
 * parseTime("14:30:00")                // PlainTime 14:30:00
 * parseTime("09:15:30")                // PlainTime 09:15:30
 * parseTime("23:59:59")                // PlainTime 23:59:59
 * parseTime("00:00:00")                // PlainTime 00:00:00
 * 
 * // 24-hour format without seconds
 * parseTime("14:30")                   // PlainTime 14:30:00
 * parseTime("09:15")                   // PlainTime 09:15:00
 * parseTime("23:59")                   // PlainTime 23:59:00
 * 
 * // 12-hour format with AM/PM
 * parseTime("2:30 PM")                 // PlainTime 14:30:00
 * parseTime("2:30 pm")                 // PlainTime 14:30:00
 * parseTime("2:30PM")                  // PlainTime 14:30:00
 * parseTime("9:15 AM")                 // PlainTime 09:15:00
 * parseTime("9:15 am")                 // PlainTime 09:15:00
 * parseTime("12:00 PM")                // PlainTime 12:00:00 (noon)
 * parseTime("12:00 AM")                // PlainTime 00:00:00 (midnight)
 * 
 * // 12-hour format with seconds
 * parseTime("2:30:45 PM")              // PlainTime 14:30:45
 * parseTime("9:15:30 AM")              // PlainTime 09:15:30
 * 
 * // Alternative separators
 * parseTime("14.30.00")                // PlainTime 14:30:00
 * parseTime("14.30")                   // PlainTime 14:30:00
 * parseTime("2.30 PM")                 // PlainTime 14:30:00
 * 
 * // Subsecond precision
 * parseTime("14:30:00.500")            // PlainTime 14:30:00.500
 * parseTime("14:30:00.123456")         // PlainTime 14:30:00.123456
 * parseTime("2:30:00.500 PM")          // PlainTime 14:30:00.500
 * 
 * // Edge cases for 12-hour format
 * parseTime("12:30 AM")                // PlainTime 00:30:00 (after midnight)
 * parseTime("12:30 PM")                // PlainTime 12:30:00 (afternoon)
 * parseTime("11:59 PM")                // PlainTime 23:59:00
 * parseTime("1:00 AM")                 // PlainTime 01:00:00
 * 
 * // Common input variations
 * parseTime("2:30p")                   // PlainTime 14:30:00
 * parseTime("2:30a")                   // PlainTime 02:30:00
 * parseTime("14:30:00Z")               // PlainTime 14:30:00 (ignores Z)
 * 
 * // Meeting times
 * const meetingStart = parseTime("9:30 AM")
 * const meetingEnd = parseTime("10:30 AM")
 * if (meetingStart && meetingEnd) {
 *   const duration = meetingEnd.since(meetingStart)
 *   console.log(\`Meeting duration: \${duration}\`)
 * }
 * 
 * // Schedule parsing
 * const schedule = [
 *   "9:00 AM",
 *   "10:30 AM", 
 *   "2:15 PM",
 *   "4:45 PM"
 * ]
 * const parsedTimes = schedule
 *   .map(parseTime)
 *   .filter((time): time is Temporal.PlainTime => time !== null)
 * 
 * // Time validation
 * function isValidTimeString(timeStr: string): boolean {
 *   return parseTime(timeStr) !== null
 * }
 * 
 * isValidTimeString("14:30")           // true
 * isValidTimeString("2:30 PM")         // true
 * isValidTimeString("25:00")           // false (invalid hour)
 * isValidTimeString("14:70")           // false (invalid minute)
 * 
 * // Business hours checking
 * function isBusinessHours(timeStr: string): boolean {
 *   const time = parseTime(timeStr)
 *   if (!time) return false
 *   
 *   const startBusiness = Temporal.PlainTime.from("09:00")
 *   const endBusiness = Temporal.PlainTime.from("17:00")
 *   
 *   return Temporal.PlainTime.compare(time, startBusiness) >= 0 &&
 *          Temporal.PlainTime.compare(time, endBusiness) <= 0
 * }
 * 
 * isBusinessHours("10:30 AM")          // true
 * isBusinessHours("6:00 PM")           // false
 * 
 * // Time formatting consistency
 * function normalizeTimeString(timeStr: string): string | null {
 *   const time = parseTime(timeStr)
 *   return time ? time.toString() : null
 * }
 * 
 * normalizeTimeString("2:30 PM")       // "14:30:00"
 * normalizeTimeString("14:30")         // "14:30:00"
 * normalizeTimeString("invalid")       // null
 * 
 * // Clock input parsing
 * function parseClockInput(input: string): Temporal.PlainTime | null {
 *   // Handle common user input variations
 *   const cleaned = input.trim().replace(/\s+/g, " ")
 *   return parseTime(cleaned)
 * }
 * 
 * parseClockInput("  2:30   PM  ")     // PlainTime 14:30:00
 * parseClockInput("14:30   ")          // PlainTime 14:30:00
 * 
 * // Time range parsing
 * function parseTimeRange(
 *   rangeStr: string
 * ): { start: Temporal.PlainTime; end: Temporal.PlainTime } | null {
 *   const parts = rangeStr.split(/\s*[-–—]\s*/)
 *   if (parts.length !== 2) return null
 *   
 *   const start = parseTime(parts[0])
 *   const end = parseTime(parts[1])
 *   
 *   return (start && end) ? { start, end } : null
 * }
 * 
 * parseTimeRange("9:00 AM - 5:00 PM")
 * // { start: PlainTime 09:00:00, end: PlainTime 17:00:00 }
 * 
 * parseTimeRange("14:30 – 16:15")
 * // { start: PlainTime 14:30:00, end: PlainTime 16:15:00 }
 * 
 * // Invalid input handling
 * parseTime("")                        // null
 * parseTime("invalid")                 // null
 * parseTime("25:00")                   // null (hour > 23)
 * parseTime("14:60")                   // null (minute > 59)
 * parseTime("14:30:60")                // null (second > 59)
 * parseTime("13:30 AM")                // null (13 with AM/PM)
 * parseTime("0:30 PM")                 // null (0 with PM)
 * 
 * // Null/undefined handling
 * parseTime(null)                      // null
 * parseTime(undefined)                 // null
 * 
 * // Batch time parsing
 * function parseTimes(timeStrings: Array<string>): Array<Temporal.PlainTime> {
 *   return timeStrings
 *     .map(parseTime)
 *     .filter((time): time is Temporal.PlainTime => time !== null)
 * }
 * 
 * const times = parseTimes([
 *   "9:00 AM",
 *   "invalid",
 *   "2:30 PM",
 *   "14:45"
 * ])
 * // [PlainTime 09:00:00, PlainTime 14:30:00, PlainTime 14:45:00]
 * 
 * // Form input processing
 * function processTimeInput(
 *   formData: { startTime?: string; endTime?: string }
 * ): { start?: Temporal.PlainTime; end?: Temporal.PlainTime } {
 *   return {
 *     ...(formData.startTime && { start: parseTime(formData.startTime) }),
 *     ...(formData.endTime && { end: parseTime(formData.endTime) })
 *   }
 * }
 * 
 * // Calendar event time parsing
 * function parseEventTime(
 *   timeStr: string,
 *   defaultPeriod?: "AM" | "PM"
 * ): Temporal.PlainTime | null {
 *   let input = timeStr.trim()
 *   
 *   // Add default period if missing and time appears to be 12-hour format
 *   if (defaultPeriod && !/[ap]m?$/i.test(input) && /:/.test(input)) {
 *     const hourMatch = input.match(/^(\d{1,2})/)
 *     if (hourMatch && parseInt(hourMatch[1]) <= 12) {
 *       input = \`\${input} \${defaultPeriod}\`
 *     }
 *   }
 *   
 *   return parseTime(input)
 * }
 * 
 * parseEventTime("2:30", "PM")         // PlainTime 14:30:00
 * parseEventTime("14:30", "PM")        // PlainTime 14:30:00 (24-hr overrides default)
 * parseEventTime("2:30 AM")            // PlainTime 02:30:00 (explicit period)
 * 
 * // Time slot availability
 * function isTimeSlotAvailable(
 *   requestedTime: string,
 *   bookedTimes: Array<string>
 * ): boolean {
 *   const requested = parseTime(requestedTime)
 *   if (!requested) return false
 *   
 *   const booked = bookedTimes
 *     .map(parseTime)
 *     .filter((time): time is Temporal.PlainTime => time !== null)
 *   
 *   return !booked.some(time => 
 *     Temporal.PlainTime.compare(time, requested) === 0
 *   )
 * }
 * 
 * const bookedSlots = ["9:00 AM", "2:30 PM", "4:15 PM"]
 * isTimeSlotAvailable("10:30 AM", bookedSlots)  // true
 * isTimeSlotAvailable("2:30 PM", bookedSlots)   // false
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null for invalid inputs
 * @property Flexible - Supports multiple time formats
 * @property Precise - Handles subsecond precision
 * @property Strict - Validates time values are within valid ranges
 */
const parseTime = (
	timeString: string | null | undefined
): Temporal.PlainTime | null => {
	if (timeString == null || typeof timeString !== "string") {
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