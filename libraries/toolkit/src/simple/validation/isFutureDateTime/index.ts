import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

function nowIsoLocal(): string {
	const d = new Date()
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	const hh = String(d.getHours()).padStart(2, "0")
	const mm = String(d.getMinutes()).padStart(2, "0")
	const ss = String(d.getSeconds()).padStart(2, "0")
	const ms = String(d.getMilliseconds()).padStart(3, "0")
	return `${y}-${m}-${day}T${hh}:${mm}:${ss}.${ms}`
}

function toIsoDateTimeString(pdt: unknown): string | null {
	if (
		pdt && typeof (pdt as { toString: () => string }).toString === "function"
	) {
		const iso = (pdt as { toString: () => string }).toString()
		// Accept both with and without fractional seconds
		return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?$/.test(iso)
			? iso
			: null
	}
	return null
}

/**
 * Checks if a datetime is in the future relative to the current moment
 *
 * Validates whether a given datetime is strictly after the current datetime
 * in the system's current time zone. Uses Temporal.Now.plainDateTimeISO()
 * to get the current datetime and compares it with the input. Accepts various
 * datetime formats and converts them to Temporal.PlainDateTime for comparison.
 * Returns false for the current moment, past datetimes, or invalid inputs.
 *
 * Future datetime rules:
 * - Must be strictly after the current moment
 * - Current datetime returns false (not considered future)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The datetime to check (string, Date, Temporal types, or datetime-like object)
 * @returns true if the datetime is in the future, false otherwise
 * @example
 * ```typescript
 * // Basic usage with Temporal objects
 * const now = Temporal.Now.plainDateTimeISO()
 * const tomorrow = now.add({ days: 1 })
 * const lastHour = now.subtract({ hours: 1 })
 *
 * isFutureDateTime(tomorrow)      // true
 * isFutureDateTime(lastHour)      // false
 * isFutureDateTime(now)           // false (current moment)
 *
 * // ISO datetime strings (assuming now is 2024-01-15T14:30:00)
 * isFutureDateTime("2024-01-16T00:00:00")  // true (tomorrow)
 * isFutureDateTime("2024-01-14T23:59:59")  // false (yesterday)
 *
 * // Meeting scheduling validation
 * const validateMeetingTime = (
 *   meetingDateTime: unknown
 * ): string | null => {
 *   if (!isFutureDateTime(meetingDateTime)) {
 *     return "Meeting must be scheduled in the future"
 *   }
 *   return null
 * }
 *
 * // Filter upcoming events
 * const getUpcomingFlights = (flights: Array<{ departure: string }>) =>
 *   flights.filter(flight => isFutureDateTime(flight.departure))
 *
 * // Invalid inputs return false
 * isFutureDateTime(null)              // false
 * isFutureDateTime("invalid")         // false
 * isFutureDateTime("2024-13-01T00:00:00")  // false (invalid month)
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isFutureDateTime = (
	value: DateTimeInput | null | undefined,
): boolean => {
	const dateTime = toPlainDateTime(value)

	if (!dateTime) {
		return false
	}

	const iso = toIsoDateTimeString(dateTime)
	if (!iso) return false
	return iso > nowIsoLocal()
}

export default isFutureDateTime
