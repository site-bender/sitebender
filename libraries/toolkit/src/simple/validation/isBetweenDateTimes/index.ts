import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is between two other datetimes (inclusive)
 *
 * Curried function that validates whether a datetime falls within a datetime range,
 * including the boundary times. Accepts various datetime formats and converts them
 * to Temporal.PlainDateTime for comparison. Returns true if the datetime is greater
 * than or equal to the start datetime AND less than or equal to the end datetime.
 * Returns false for invalid inputs, conversion failures, or invalid ranges where
 * end is before start.
 *
 * DateTime range rules:
 * - Inclusive boundaries: datetime can equal start or end datetime
 * - Start must be before or equal to end (no wraparound)
 * - Compares full datetime (date and time components)
 * - Nanosecond precision comparison
 * - Invalid inputs return false (safe for chaining)
 * - No timezone awareness (uses plain/local datetime)
 *
 * @param startDateTime - The start of the datetime range (inclusive)
 * @param endDateTime - The end of the datetime range (inclusive)
 * @returns A predicate function that checks if a datetime is within the range
 * @example
 * ```typescript
 * // Basic usage
 * const isInRange = isBetweenDateTimes(
 *   "2024-01-15T09:00:00",
 *   "2024-01-15T17:00:00"
 * )
 * isInRange("2024-01-15T12:00:00")  // true
 * isInRange("2024-01-15T08:59:59")  // false
 * isInRange("2024-01-16T12:00:00")  // false (next day)
 *
 * // Multi-day ranges
 * const isConferencePeriod = isBetweenDateTimes(
 *   "2024-03-15T08:00:00",
 *   "2024-03-17T18:00:00"
 * )
 * isConferencePeriod("2024-03-16T14:30:00")  // true
 * isConferencePeriod("2024-03-14T23:59:59")  // false
 *
 * // Boundary conditions
 * const checker = isBetweenDateTimes(
 *   "2024-01-01T00:00:00",
 *   "2024-12-31T23:59:59"
 * )
 * checker("2024-01-01T00:00:00")  // true (start boundary)
 * checker("2024-12-31T23:59:59")  // true (end boundary)
 *
 * // Invalid inputs
 * checker(null)                    // false
 * checker("invalid")               // false
 *
 * // Event scheduling
 * const isEventActive = isBetweenDateTimes(
 *   "2024-06-01T10:00:00",
 *   "2024-06-03T22:00:00"
 * )
 * const events = [
 *   { name: "Setup", time: "2024-06-01T08:00:00" },
 *   { name: "Opening", time: "2024-06-01T10:00:00" },
 *   { name: "Closing", time: "2024-06-03T22:00:00" }
 * ]
 * const activeEvents = events.filter(e => isEventActive(e.time))
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
const isBetweenDateTimes = (
	startDateTime: DateTimeInput | null | undefined,
	endDateTime: DateTimeInput | null | undefined,
) =>
(
	datetime: DateTimeInput | null | undefined,
): boolean => {
	const start = toPlainDateTime(startDateTime)
	const end = toPlainDateTime(endDateTime)
	const checkDateTime = toPlainDateTime(datetime)

	if (!start || !end || !checkDateTime) {
		return false
	}

	try {
		// Check if range is valid (start <= end)
		if (Temporal.PlainDateTime.compare(start, end) > 0) {
			return false
		}

		// Check if datetime is >= start AND <= end
		return Temporal.PlainDateTime.compare(checkDateTime, start) >= 0 &&
			Temporal.PlainDateTime.compare(checkDateTime, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenDateTimes