import type {
	PlainTimeLike,
	TimeInput,
} from "../../../../types/temporal/index.ts"

/**
 * Parses values into Temporal PlainTime objects
 *
 * Converts various time representations to Temporal.PlainTime.
 * Returns null for invalid inputs rather than throwing errors.
 *
 * Parsing rules:
 * - Temporal.PlainTime: returned as-is
 * - Temporal.PlainDateTime/ZonedDateTime: extracts time portion
 * - Strings: ISO 8601 time format (HH:MM:SS or variants)
 * - Date objects: extracts time in local timezone
 * - PlainTimeLike objects: accepts hour, minute, second, etc.
 * - null/undefined: null
 *
 * @param value - The value to convert to PlainTime
 * @returns The PlainTime representation or null if invalid
 * @example
 * ```typescript
 * // ISO time strings
 * toPlainTime("14:30:00")          // PlainTime 14:30:00
 * toPlainTime("14:30")             // PlainTime 14:30:00
 * toPlainTime("14:30:00.123")      // PlainTime 14:30:00.123
 * toPlainTime("09:05:30")          // PlainTime 09:05:30
 * toPlainTime("00:00:00")          // PlainTime 00:00:00 (midnight)
 * toPlainTime("23:59:59")          // PlainTime 23:59:59
 *
 * // Invalid time strings
 * toPlainTime("25:00:00")          // null (hour 25 invalid)
 * toPlainTime("14:60:00")          // null (minute 60 invalid)
 * toPlainTime("14:30:60")          // null (second 60 invalid)
 * toPlainTime("2:30 PM")           // null (wrong format)
 * toPlainTime("14h30")             // null (wrong format)
 * toPlainTime("")                  // null
 *
 * // Date objects (extracts time)
 * const jsDate = new Date("2024-03-15T14:30:45.123Z")
 * toPlainTime(jsDate)              // PlainTime from local time
 *
 * // Temporal objects
 * const plainTime = Temporal.PlainTime.from("14:30:00")
 * toPlainTime(plainTime)           // PlainTime 14:30:00 (passes through)
 *
 * const dateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toPlainTime(dateTime)            // PlainTime 14:30:00
 *
 * // PlainTimeLike objects
 * toPlainTime({ hour: 14, minute: 30 })          // PlainTime 14:30:00
 * toPlainTime({ hour: 9, minute: 5, second: 30 }) // PlainTime 09:05:30
 * toPlainTime({ hour: 14 })                      // PlainTime 14:00:00
 * toPlainTime({ hour: 25 })                      // null (invalid hour)
 * toPlainTime({ minute: 30 })                    // PlainTime 00:30:00
 *
 * // Nullish values
 * toPlainTime(null)                // null
 * toPlainTime(undefined)           // null
 *
 * // Other types
 * toPlainTime(true)                // null
 * toPlainTime(123)                 // null (numbers not supported)
 * toPlainTime([14, 30, 0])         // null (arrays not supported)
 *
 * // Form input parsing
 * const timeInput = document.querySelector('input[type="time"]')
 * const time = toPlainTime(timeInput?.value)
 * if (time) {
 *   console.log(`Selected: ${time.hour}:${time.minute}`)
 * }
 *
 * // Time validation
 * function isBusinessHours(input: unknown): boolean {
 *   const time = toPlainTime(input)
 *   if (!time) return false
 *
 *   const start = Temporal.PlainTime.from("09:00")
 *   const end = Temporal.PlainTime.from("17:00")
 *
 *   return Temporal.PlainTime.compare(time, start) >= 0 &&
 *          Temporal.PlainTime.compare(time, end) <= 0
 * }
 *
 * isBusinessHours("10:30")         // true
 * isBusinessHours("08:30")         // false (before 9am)
 * isBusinessHours("18:00")         // false (after 5pm)
 *
 * // Time calculations
 * function minutesBetween(time1: unknown, time2: unknown): number | null {
 *   const t1 = toPlainTime(time1)
 *   const t2 = toPlainTime(time2)
 *
 *   if (!t1 || !t2) return null
 *
 *   // Convert to total minutes for comparison
 *   const minutes1 = t1.hour * 60 + t1.minute
 *   const minutes2 = t2.hour * 60 + t2.minute
 *
 *   return minutes2 - minutes1
 * }
 *
 * minutesBetween("09:00", "10:30")  // 90
 * minutesBetween("14:15", "14:45")  // 30
 *
 * // Working with time components
 * const time = toPlainTime("14:30:45.123")
 * if (time) {
 *   console.log(time.hour)          // 14
 *   console.log(time.minute)        // 30
 *   console.log(time.second)        // 45
 *   console.log(time.millisecond)   // 123
 *   console.log(time.microsecond)   // 0
 *   console.log(time.nanosecond)    // 0
 * }
 *
 * // Formatting for display
 * function formatTime(input: TimeInput): string {
 *   const time = toPlainTime(input)
 *   if (!time) return "Invalid time"
 *
 *   const h = String(time.hour).padStart(2, "0")
 *   const m = String(time.minute).padStart(2, "0")
 *   const s = String(time.second).padStart(2, "0")
 *
 *   return `${h}:${m}:${s}`
 * }
 *
 * formatTime("9:5:3")               // "09:05:03"
 * formatTime({ hour: 14 })          // "14:00:00"
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of throwing errors
 * @property Temporal - Uses Temporal API for precise time handling
 */
const toPlainTime = (
	value: TimeInput | null | undefined,
): Temporal.PlainTime | null => {
	// Handle nullish values
	if (value == null) {
		return null
	}

	// If already a PlainTime, return as-is
	if (value instanceof Temporal.PlainTime) {
		return value
	}

	// Handle strings (ISO format expected)
	if (typeof value === "string") {
		const trimmed = value.trim()
		if (trimmed.length === 0) {
			return null
		}

		try {
			// Temporal.PlainTime.from with strict validation
			return Temporal.PlainTime.from(trimmed, { overflow: "reject" })
		} catch {
			return null
		}
	}

	// Handle JavaScript Date objects
	if (value instanceof Date) {
		if (isNaN(value.getTime())) {
			return null
		}

		try {
			// Extract time components in local timezone
			return Temporal.PlainTime.from({
				hour: value.getHours(),
				minute: value.getMinutes(),
				second: value.getSeconds(),
				millisecond: value.getMilliseconds(),
			})
		} catch {
			return null
		}
	}

	// Handle PlainTimeLike objects
	if (
		typeof value === "object" &&
		("hour" in value || "minute" in value || "second" in value ||
			"millisecond" in value || "microsecond" in value || "nanosecond" in value)
	) {
		try {
			// Use 'reject' to ensure invalid times return null
			return Temporal.PlainTime.from(value as PlainTimeLike, {
				overflow: "reject",
			})
		} catch {
			return null
		}
	}

	// Handle PlainDateTime
	if (value instanceof Temporal.PlainDateTime) {
		return value.toPlainTime()
	}

	// Handle ZonedDateTime
	if (value instanceof Temporal.ZonedDateTime) {
		return value.toPlainTime()
	}

	// Exhaustive type check - should never reach here with proper types
	return null
}

export default toPlainTime
