import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Converts ZonedDateTime to PlainDateTime
 *
 * Extracts the local date and time components from a ZonedDateTime, discarding
 * the timezone information. The resulting PlainDateTime represents the same
 * wall-clock time but without any timezone context. Also handles conversion
 * from PlainDate (adds midnight time), PlainTime (adds reference date), strings,
 * and Instant (via timezone). Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param temporal - The value to convert to PlainDateTime
 * @returns PlainDateTime representation, or null if invalid
 * @example
 * ```typescript
 * // Extract local datetime from ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T14:30:00-04:00[America/New_York]"
 * )
 * toPlainDateTime(zonedDateTime)          // PlainDateTime 2024-03-15T14:30:00
 *
 * // Convert from various types
 * const date = Temporal.PlainDate.from("2024-03-15")
 * toPlainDateTime(date)                   // PlainDateTime 2024-03-15T00:00:00
 *
 * const time = Temporal.PlainTime.from("14:30:00")
 * toPlainDateTime(time)                   // PlainDateTime 1970-01-01T14:30:00
 *
 * toPlainDateTime("2024-03-15T14:30:00")  // PlainDateTime 2024-03-15T14:30:00
 * toPlainDateTime("2024-03-15")           // PlainDateTime 2024-03-15T00:00:00
 *
 * // Batch conversion
 * const zonedDateTimes = [
 *   Temporal.ZonedDateTime.from("2024-01-15T10:00:00-05:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-02-15T14:00:00-05:00[America/New_York]")
 * ]
 * zonedDateTimes.map(toPlainDateTime)  // Local times without timezone
 *
 * // Recurring events using functional approach
 * const generateRecurringLocal = (
 *   start: Temporal.PlainDate,
 *   time: Temporal.PlainTime,
 *   count: number
 * ): Array<Temporal.PlainDateTime | null> => {
 *   return Array.from({ length: count }, (_, i) => {
 *     const date = start.add({ days: i * 7 })  // Weekly
 *     return toPlainDateTime(date.toPlainDateTime(time))
 *   })
 * }
 *
 * // Check local time equality
 * const haveSameLocalTime = (
 *   zdt1: Temporal.ZonedDateTime,
 *   zdt2: Temporal.ZonedDateTime
 * ): boolean => {
 *   const local1 = toPlainDateTime(zdt1)
 *   const local2 = toPlainDateTime(zdt2)
 *   return local1?.equals(local2) ?? false
 * }
 *
 * // Invalid inputs return null
 * toPlainDateTime(null)                   // null
 * toPlainDateTime("invalid")              // null
 * ```
 * @pure
 * @immutable
 * @safe
 */
const toPlainDateTime = (
	temporal:
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.Instant
		| string
		| null
		| undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(temporal)) {
		return null
	}

	try {
		// Handle PlainDateTime - return as-is
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal
		}

		// Handle ZonedDateTime - extract local datetime
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainDateTime()
		}

		// Handle PlainDate - add midnight time
		if (temporal instanceof Temporal.PlainDate) {
			return temporal.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// Handle PlainTime - use reference date (1970-01-01)
		if (temporal instanceof Temporal.PlainTime) {
			const refDate = Temporal.PlainDate.from("1970-01-01")
			return refDate.toPlainDateTime(temporal)
		}

		// Handle Instant - convert via system timezone
		if (temporal instanceof Temporal.Instant) {
			const timeZone = Temporal.Now.timeZoneId()
			const zoned = temporal.toZonedDateTimeISO(timeZone)
			return zoned.toPlainDateTime()
		}

		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainDateTime first
			try {
				return Temporal.PlainDateTime.from(temporal)
			} catch {
				// Try to parse as PlainDate and add midnight
				try {
					const date = Temporal.PlainDate.from(temporal)
					return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
				} catch {
					// Try to parse as ZonedDateTime and extract local
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainDateTime()
					} catch {
						// Try to parse as Instant and convert
						try {
							const instant = Temporal.Instant.from(temporal)
							const timeZone = Temporal.Now.timeZoneId()
							const zoned = instant.toZonedDateTimeISO(timeZone)
							return zoned.toPlainDateTime()
						} catch {
							return null
						}
					}
				}
			}
		}

		return null
	} catch {
		return null
	}
}

export default toPlainDateTime
