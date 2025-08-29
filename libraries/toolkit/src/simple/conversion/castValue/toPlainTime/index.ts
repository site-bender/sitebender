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
 *
 * // Temporal objects
 * const dateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toPlainTime(dateTime)            // PlainTime 14:30:00
 *
 * // PlainTimeLike objects
 * toPlainTime({ hour: 14, minute: 30 })          // PlainTime 14:30:00
 * toPlainTime({ hour: 9, minute: 5, second: 30 }) // PlainTime 09:05:30
 *
 * // Invalid inputs
 * toPlainTime("25:00:00")          // null (hour 25 invalid)
 * toPlainTime(null)                // null
 * toPlainTime(123)                 // null
 *
 * // Date objects (extracts time)
 * const jsDate = new Date("2024-03-15T14:30:45.123Z")
 * toPlainTime(jsDate)              // PlainTime from local time
 * ```
 * @pure
 * @safe
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
