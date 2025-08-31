import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is the same as or before another datetime
 *
 * Validates whether one datetime is chronologically the same as or before
 * another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Compares both date and time components
 * with nanosecond precision. Returns true for equal datetimes, datetimes before
 * the reference, and false for datetimes after or invalid inputs.
 *
 * DateTime comparison rules:
 * - Same or before: datetime must be equal to or chronologically earlier
 * - Equal datetimes return true (inclusive comparison)
 * - Compares date and time components together
 * - Nanosecond precision for time comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference datetime to compare against
 * @returns A predicate function that checks if a datetime is same or before the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isSameOrBefore = isSameOrBeforeDateTime("2024-01-15T12:00:00")
 * isSameOrBefore("2024-01-15T11:00:00")  // true (before)
 * isSameOrBefore("2024-01-15T12:00:00")  // true (same)
 * isSameOrBefore("2024-01-15T13:00:00")  // false (after)
 *
 * // Different formats
 * const checker = isSameOrBeforeDateTime(
 *   Temporal.PlainDateTime.from("2024-01-15T12:00:00")
 * )
 * checker(new Date("2024-01-15T11:00:00"))  // true
 * checker("2024-01-16T12:00:00")            // false
 *
 * // Invalid inputs
 * checker(null)           // false
 * checker("invalid")      // false
 *
 * // Event scheduling
 * const cutoffTime = isSameOrBeforeDateTime("2024-12-31T23:59:59")
 * const events = [
 *   { name: "Event 1", time: "2024-12-31T22:00:00" },
 *   { name: "Event 2", time: "2025-01-01T00:00:01" },
 *   { name: "Event 3", time: "2024-12-31T23:59:59" }
 * ]
 * const beforeCutoff = events.filter(e => cutoffTime(e.time))
 * // [Event 1, Event 3]
 *
 * // Deadline tracking with time precision
 * const deadline = "2024-06-15T17:00:00"
 * const isBeforeDeadline = isSameOrBeforeDateTime(deadline)
 * isBeforeDeadline("2024-06-15T16:59:59")  // true
 * isBeforeDeadline("2024-06-15T17:00:01")  // false
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
const isSameOrBeforeDateTime = (
	reference: DateTimeInput | null | undefined,
) =>
(
	datetime: DateTimeInput | null | undefined,
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(datetime)

	if (!refDateTime || !compareDateTime) {
		return false
	}

	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeDateTime
