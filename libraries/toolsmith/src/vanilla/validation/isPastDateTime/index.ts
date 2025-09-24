import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is in the past relative to the current moment
 *
 * Validates whether a given datetime is strictly before the current datetime
 * in the system's current time zone. Uses Temporal.Now.plainDateTimeISO()
 * to get the current datetime and compares it with the input. Accepts various
 * datetime formats and converts them to Temporal.PlainDateTime for comparison.
 * Returns false for the current moment, future datetimes, or invalid inputs.
 *
 * Past datetime rules:
 * - Must be strictly before the current moment
 * - Current datetime returns false (not considered past)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The datetime to check (string, Date, Temporal types, or datetime-like object)
 * @returns true if the datetime is in the past, false otherwise
 * @example
 * ```typescript
 * // Basic past datetime validation
 * const now = Temporal.Now.plainDateTimeISO()
 * const lastHour = now.subtract({ hours: 1 })
 * const nextHour = now.add({ hours: 1 })
 *
 * isPastDateTime(lastHour)        // true
 * isPastDateTime(now)             // false (current moment)
 * isPastDateTime(nextHour)        // false (future)
 *
 * // Using ISO datetime strings
 * isPastDateTime("2023-01-15T14:00:00")  // true (past)
 * isPastDateTime("2025-01-15T15:00:00")  // false (future)
 *
 * // Log validation
 * const validateLog = (timestamp: unknown): string | null => {
 *   return !isPastDateTime(timestamp)
 *     ? "Log timestamp cannot be in the future"
 *     : null
 * }
 *
 * // Session timeout checking
 * const isSessionExpired = (
 *   lastActivity: Temporal.PlainDateTime,
 *   timeoutMinutes: number = 30
 * ): boolean => {
 *   if (!isPastDateTime(lastActivity)) return false
 *   const timeout = lastActivity.add({ minutes: timeoutMinutes })
 *   return Temporal.PlainDateTime.compare(
 *     Temporal.Now.plainDateTimeISO(),
 *     timeout
 *   ) > 0
 * }
 *
 * // Invalid inputs
 * isPastDateTime(null)            // false
 * isPastDateTime("invalid")       // false
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isPastDateTime = (
	value: DateTimeInput | null | undefined,
): boolean => {
	const dateTime = toPlainDateTime(value)

	if (!dateTime) {
		return false
	}

	try {
		const now = Temporal.Now.plainDateTimeISO()
		return Temporal.PlainDateTime.compare(dateTime, now) < 0
	} catch {
		return false
	}
}

export default isPastDateTime
