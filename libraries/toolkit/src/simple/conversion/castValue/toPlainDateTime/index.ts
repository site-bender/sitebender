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
 * toPlainDateTime("2024-03-15T14:30:00.123") // PlainDateTime 2024-03-15 14:30:00.123
 * toPlainDateTime("2024-03-15T09:05:30")     // PlainDateTime 2024-03-15 09:05:30
 * toPlainDateTime("2024-12-31T23:59:59")     // PlainDateTime 2024-12-31 23:59:59
 *
 * // Date-only strings (time defaults to midnight)
 * toPlainDateTime("2024-03-15")              // PlainDateTime 2024-03-15 00:00:00
 * toPlainDateTime("2024-12-31")              // PlainDateTime 2024-12-31 00:00:00
 *
 * // Invalid datetime strings
 * toPlainDateTime("2024-13-01T12:00:00")     // null (month 13 invalid)
 * toPlainDateTime("2024-03-15T25:00:00")     // null (hour 25 invalid)
 * toPlainDateTime("03/15/2024 2:30 PM")      // null (wrong format)
 * toPlainDateTime("")                        // null
 *
 * // Date objects
 * const jsDate = new Date("2024-03-15T14:30:45.123Z")
 * toPlainDateTime(jsDate)                    // PlainDateTime in local timezone
 *
 * // Temporal objects
 * const plainDateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toPlainDateTime(plainDateTime)             // PlainDateTime 2024-03-15 14:30:00 (passes through)
 *
 * const plainDate = Temporal.PlainDate.from("2024-03-15")
 * toPlainDateTime(plainDate)                 // PlainDateTime 2024-03-15 00:00:00
 *
 * const plainTime = Temporal.PlainTime.from("14:30:00")
 * toPlainDateTime(plainTime)                 // PlainDateTime 1970-01-01 14:30:00
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * toPlainDateTime(zonedDateTime)             // PlainDateTime 2024-03-15 14:30:00
 *
 * // Nullish values
 * toPlainDateTime(null)                      // null
 * toPlainDateTime(undefined)                 // null
 *
 * // PlainDateTimeLike objects
 * toPlainDateTime({
 *   year: 2024, month: 3, day: 15,
 *   hour: 14, minute: 30
 * })                                          // PlainDateTime 2024-03-15 14:30:00
 * toPlainDateTime({
 *   year: 2024, month: 3, day: 15
 * })                                          // PlainDateTime 2024-03-15 00:00:00
 *
 * // Other types
 * toPlainDateTime(true)                      // null
 * toPlainDateTime(123)                       // null (numbers not supported)
 * toPlainDateTime([2024, 3, 15])             // null (arrays not supported)
 *
 * // Form input parsing
 * const dateInput = document.querySelector('input[type="date"]')?.value
 * const timeInput = document.querySelector('input[type="time"]')?.value
 * const combined = dateInput && timeInput ? `${dateInput}T${timeInput}` : null
 * const dateTime = toPlainDateTime(combined)
 *
 * // DateTime validation
 * function isInFuture(input: unknown): boolean {
 *   const dateTime = toPlainDateTime(input)
 *   if (!dateTime) return false
 *
 *   const now = Temporal.Now.plainDateTimeISO()
 *   return Temporal.PlainDateTime.compare(dateTime, now) > 0
 * }
 *
 * isInFuture("2025-01-01T00:00:00")         // depends on current date
 * isInFuture("2020-01-01T00:00:00")         // false
 *
 * // DateTime calculations
 * function hoursBetween(dt1: unknown, dt2: unknown): number | null {
 *   const dateTime1 = toPlainDateTime(dt1)
 *   const dateTime2 = toPlainDateTime(dt2)
 *
 *   if (!dateTime1 || !dateTime2) return null
 *
 *   const duration = dateTime2.since(dateTime1, { largestUnit: "hours" })
 *   return duration.hours + (duration.minutes / 60)
 * }
 *
 * hoursBetween(
 *   "2024-03-15T10:00:00",
 *   "2024-03-15T14:30:00"
 * )                                          // 4.5
 *
 * // Event scheduling
 * function scheduleEvent(dateInput: DateTimeInput, timeInput: DateTimeInput): Temporal.PlainDateTime | null {
 *   const date = toPlainDateTime(dateInput)
 *   if (!date) return null
 *
 *   const time = toPlainDateTime(timeInput)
 *   if (!time) return date
 *
 *   // Combine date from first input with time from second
 *   return date.with({
 *     hour: time.hour,
 *     minute: time.minute,
 *     second: time.second
 *   })
 * }
 *
 * scheduleEvent("2024-03-15", "14:30:00")
 * // PlainDateTime 2024-03-15 14:30:00
 *
 * // Working with datetime components
 * const dateTime = toPlainDateTime("2024-03-15T14:30:45.123")
 * if (dateTime) {
 *   console.log(dateTime.year)              // 2024
 *   console.log(dateTime.month)             // 3
 *   console.log(dateTime.day)               // 15
 *   console.log(dateTime.hour)              // 14
 *   console.log(dateTime.minute)            // 30
 *   console.log(dateTime.second)            // 45
 *   console.log(dateTime.millisecond)       // 123
 *   console.log(dateTime.dayOfWeek)         // 5 (Friday)
 *   console.log(dateTime.dayOfYear)         // 75
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of throwing errors
 * @property Temporal - Uses Temporal API for precise datetime handling
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
