import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is the same as or after another datetime
 *
 * Validates whether one datetime is chronologically the same as or after
 * another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Uses Temporal's built-in comparison
 * to ensure accurate datetime comparisons with nanosecond precision.
 * Returns true for equal datetimes, datetimes after the reference, and false
 * for datetimes before or invalid inputs.
 *
 * DateTime comparison rules:
 * - Same or after: datetime must be equal to or chronologically later
 * - Equal datetimes return true (inclusive comparison)
 * - Compares both date and time components
 * - Nanosecond precision comparison
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is same or after the reference
 * @example
 * ```typescript
 * // Basic usage with ISO datetime strings
 * const isSameOrAfterNoon = isSameOrAfterDateTime("2024-01-15T12:00:00")
 * isSameOrAfterNoon("2024-01-15T14:30:00")  // true (after)
 * isSameOrAfterNoon("2024-01-15T12:00:00")  // true (same)
 * isSameOrAfterNoon("2024-01-15T09:00:00")  // false (before)
 *
 * // With Temporal PlainDateTime
 * const dt = Temporal.PlainDateTime.from("2024-01-15T10:00:00")
 * const checker = isSameOrAfterDateTime(dt)
 * checker("2024-01-15T14:00:00")  // true
 * checker(dt)                      // true (same)
 *
 * // Validate appointment times
 * const validateAppointment = (appt: string, earliest: string): boolean =>
 *   isSameOrAfterDateTime(earliest)(appt)
 *
 * validateAppointment("2024-01-15T14:00:00", "2024-01-15T09:00:00")  // true
 * validateAppointment("2024-01-15T08:00:00", "2024-01-15T09:00:00")  // false
 *
 * // Filter events from datetime
 * const events = [
 *   { time: "2024-01-15T08:00:00", name: "Morning" },
 *   { time: "2024-01-15T12:00:00", name: "Lunch" },
 *   { time: "2024-01-15T18:00:00", name: "Evening" }
 * ]
 * const fromNoon = events.filter(e =>
 *   isSameOrAfterDateTime("2024-01-15T12:00:00")(e.time)
 * )  // [Lunch, Evening]
 *
 * // Check deadline compliance
 * const isOnTime = (submission: string, deadline: string): boolean => {
 *   const dl = toPlainDateTime(deadline)
 *   return dl ? !isSameOrAfterDateTime(dl.add({ seconds: 1 }).toString())(submission) : false
 * }
 * isOnTime("2024-01-15T23:59:59", "2024-01-15T23:59:59")  // true
 * isOnTime("2024-01-16T00:00:00", "2024-01-15T23:59:59")  // false
 *
 * // Edge cases
 * const check = isSameOrAfterDateTime("2024-01-15T12:00:00")
 * check(null)                      // false
 * check(undefined)                 // false
 * check("invalid-datetime")        // false
 * check("2024-13-01T00:00:00")     // false (invalid month)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSameOrAfterDateTime = (
	reference: DateTimeInput | null | undefined,
) =>
(
	dateTime: DateTimeInput | null | undefined,
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(dateTime)

	if (!refDateTime || !compareDateTime) {
		return false
	}

	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterDateTime
