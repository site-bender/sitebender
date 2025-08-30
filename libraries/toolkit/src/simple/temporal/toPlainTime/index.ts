/**
 * Converts various Temporal types to Temporal.PlainTime
 *
 * Extracts or converts the time portion from various Temporal objects to a
 * PlainTime. For datetime objects, extracts just the time components. For
 * strings, attempts to parse as a time. For durations, converts to time
 * representation (wrapping at 24 hours). Returns null for invalid inputs to
 * support safe error handling.
 *
 * @param temporal - The value to convert to PlainTime
 * @returns PlainTime representation, or null if invalid
 * @example
 * ```typescript
 * // Extract time from various Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45.123")
 * toPlainTime(datetime)                   // PlainTime 14:30:45.123
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toPlainTime(zonedDateTime)              // PlainTime 14:30:00
 *
 * // Convert Duration to time (wraps at 24 hours)
 * const duration = Temporal.Duration.from({ hours: 2, minutes: 30, seconds: 45 })
 * toPlainTime(duration)                   // PlainTime 02:30:45
 *
 * const longDuration = Temporal.Duration.from({ hours: 26, minutes: 15 })
 * toPlainTime(longDuration)               // PlainTime 02:15:00 (26 mod 24)
 *
 * // Parse time strings
 * toPlainTime("14:30:45")                // PlainTime 14:30:45
 * toPlainTime("2024-03-15T14:30:45")     // PlainTime 14:30:45 (extracts time)
 *
 * // Batch time extraction
 * const datetimes = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * ]
 * datetimes.map(toPlainTime)  // [09:00:00, 14:30:00]
 *
 * // Generate time slots using functional approach
 * const generateTimeSlots = (
 *   start: string,
 *   end: string,
 *   intervalMinutes: number
 * ): Array<Temporal.PlainTime> => {
 *   const startTime = toPlainTime(start)
 *   const endTime = toPlainTime(end)
 *   if (!startTime || !endTime) return []
 *   
 *   const slots = []
 *   const totalMinutes = startTime.until(endTime).total({ unit: 'minutes' })
 *   const steps = Math.floor(totalMinutes / intervalMinutes) + 1
 *   
 *   return Array.from({ length: steps }, (_, i) => 
 *     startTime.add({ minutes: i * intervalMinutes })
 *   )
 * }
 *
 * // Invalid inputs return null
 * toPlainTime(null)                       // null
 * toPlainTime("invalid")                  // null
 * ```
 * @pure
 * @immutable
 * @safe
 */
import isNullish from "../../validation/isNullish/index.ts"

const toPlainTime = (
	temporal:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Duration
		| string
		| null
		| undefined,
): Temporal.PlainTime | null => {
	if (isNullish(temporal)) {
		return null
	}

	try {
		// Handle PlainTime - return as-is
		if (temporal instanceof Temporal.PlainTime) {
			return temporal
		}

		// Handle PlainDateTime - extract time portion
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toPlainTime()
		}

		// Handle ZonedDateTime - extract local time
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainTime()
		}

		// Handle Duration - convert to time (wrap at 24 hours)
		if (temporal instanceof Temporal.Duration) {
			const totalNanoseconds = temporal.total({ unit: "nanoseconds" })
			const nanosecondsIn24Hours = 24 * 60 * 60 * 1_000_000_000
			const wrappedNanoseconds = totalNanoseconds % nanosecondsIn24Hours

			const hours = Math.floor(wrappedNanoseconds / (60 * 60 * 1_000_000_000))
			const minutes = Math.floor(
				(wrappedNanoseconds % (60 * 60 * 1_000_000_000)) / (60 * 1_000_000_000),
			)
			const seconds = Math.floor(
				(wrappedNanoseconds % (60 * 1_000_000_000)) / 1_000_000_000,
			)
			const nanoseconds = wrappedNanoseconds % 1_000_000_000

			return Temporal.PlainTime.from({
				hour: hours,
				minute: minutes,
				second: seconds,
				millisecond: Math.floor(nanoseconds / 1_000_000),
				microsecond: Math.floor((nanoseconds % 1_000_000) / 1_000),
				nanosecond: nanoseconds % 1_000,
			})
		}

		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainTime first
			try {
				return Temporal.PlainTime.from(temporal)
			} catch {
				// Try to parse as PlainDateTime and extract time
				try {
					const datetime = Temporal.PlainDateTime.from(temporal)
					return datetime.toPlainTime()
				} catch {
					// Try to parse as ZonedDateTime and extract time
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainTime()
					} catch {
						return null
					}
				}
			}
		}

		return null
	} catch {
		return null
	}
}

export default toPlainTime
