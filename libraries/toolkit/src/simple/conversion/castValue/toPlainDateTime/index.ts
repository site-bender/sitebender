import type {
	DateTimeInput,
	PlainDateTimeLike,
} from "../../../../types/temporal/index.ts"

/**
 * Parses values into Temporal PlainDateTime objects
 *
 * Converts various date-time representations to Temporal.PlainDateTime.
 * Returns null for invalid inputs rather than throwing errors.
 *
 * Parsing rules:
 * - Temporal.PlainDateTime: returned as-is
 * - Temporal.ZonedDateTime: removes timezone
 * - Strings: ISO 8601 datetime format (YYYY-MM-DDTHH:MM:SS)
 * - Date objects: converted to PlainDateTime in local timezone
 * - PlainDate: becomes midnight (00:00:00) of that date
 * - PlainTime: becomes that time on 1970-01-01
 * - PlainDateTimeLike: object with year, month, day, and optional time fields
 * - null/undefined: null
 *
 * @param value - The value to convert to PlainDateTime
 * @returns The PlainDateTime representation or null if invalid
 * @example
 * ```typescript
 * // ISO datetime strings
 * toPlainDateTime("2024-03-15T14:30:00")     // PlainDateTime 2024-03-15 14:30:00
 * toPlainDateTime("2024-03-15")              // PlainDateTime 2024-03-15 00:00:00
 *
 * // Temporal objects
 * const plainDate = Temporal.PlainDate.from("2024-03-15")
 * toPlainDateTime(plainDate)                 // PlainDateTime 2024-03-15 00:00:00
 *
 * const plainTime = Temporal.PlainTime.from("14:30:00")
 * toPlainDateTime(plainTime)                 // PlainDateTime 1970-01-01 14:30:00
 *
 * // PlainDateTimeLike objects
 * toPlainDateTime({
 *   year: 2024, month: 3, day: 15,
 *   hour: 14, minute: 30
 * })                                          // PlainDateTime 2024-03-15 14:30:00
 *
 * // Invalid inputs
 * toPlainDateTime("2024-13-01T12:00:00")     // null (month 13 invalid)
 * toPlainDateTime(null)                      // null
 * toPlainDateTime(123)                       // null
 *
 * // Date objects
 * const jsDate = new Date("2024-03-15T14:30:45.123Z")
 * toPlainDateTime(jsDate)                    // PlainDateTime in local timezone
 * ```
 * @pure
 * @safe
 */
const toPlainDateTime = (
	value: DateTimeInput | null | undefined,
): Temporal.PlainDateTime | null => {
	// Handle nullish values
	if (value == null) {
		return null
	}

	// If already a PlainDateTime, return as-is
	if (value instanceof Temporal.PlainDateTime) {
		return value
	}

	// Handle strings (ISO format expected)
	if (typeof value === "string") {
		const trimmed = value.trim()
		if (trimmed.length === 0) {
			return null
		}

		try {
			// Temporal.PlainDateTime.from with strict validation
			// It also accepts date-only strings and defaults time to 00:00:00
			return Temporal.PlainDateTime.from(trimmed, { overflow: "reject" })
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
			// Convert to PlainDateTime in local timezone
			return Temporal.PlainDateTime.from({
				year: value.getFullYear(),
				month: value.getMonth() + 1, // JS months are 0-based
				day: value.getDate(),
				hour: value.getHours(),
				minute: value.getMinutes(),
				second: value.getSeconds(),
				millisecond: value.getMilliseconds(),
			})
		} catch {
			return null
		}
	}

	// Handle PlainDate (becomes midnight of that date)
	if (value instanceof Temporal.PlainDate) {
		return value.toPlainDateTime()
	}

	// Handle PlainTime (becomes that time on 1970-01-01)
	if (value instanceof Temporal.PlainTime) {
		return Temporal.PlainDate.from("1970-01-01").toPlainDateTime(value)
	}

	// Handle ZonedDateTime
	if (value instanceof Temporal.ZonedDateTime) {
		return value.toPlainDateTime()
	}

	// Handle PlainDateTimeLike objects
	if (
		typeof value === "object" &&
		"year" in value &&
		"month" in value &&
		"day" in value
	) {
		try {
			// Use 'reject' to ensure invalid datetimes return null
			return Temporal.PlainDateTime.from(value as PlainDateTimeLike, {
				overflow: "reject",
			})
		} catch {
			return null
		}
	}

	// Exhaustive type check - should never reach here with proper types
	return null
}

export default toPlainDateTime
