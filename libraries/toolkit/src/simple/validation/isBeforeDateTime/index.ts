import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is before another datetime
 *
 * Curried function that validates whether one datetime comes chronologically
 * before another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Compares both date and time components
 * with nanosecond precision. Returns false for equal datetimes, invalid inputs,
 * or conversion failures.
 *
 * DateTime comparison rules:
 * - Compares date first, then time if dates are equal
 * - Strictly before: datetime must be chronologically earlier
 * - Equal datetimes return false (use isSameOrBeforeDateTime for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time comparisons
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is before the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isBefore230PM = isBeforeDateTime("2024-01-15T14:30:00")
 * isBefore230PM("2024-01-15T13:30:00")  // true
 * isBefore230PM("2024-01-15T15:30:00")  // false
 * isBefore230PM("2024-01-15T14:30:00")  // false (same)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T14:30:00")
 * isBeforeDateTime(jsDate)("2024-01-15T13:30:00")  // true
 *
 * // Filtering events
 * const events = [
 *   { time: "2024-01-15T09:00:00" },
 *   { time: "2024-01-15T14:00:00" }
 * ]
 * events.filter(e => isBeforeDateTime("2024-01-15T12:00:00")(e.time))
 * // [{ time: "2024-01-15T09:00:00" }]
 *
 * // Nanosecond precision
 * const precise = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000002")
 * isBeforeDateTime(precise)("2024-01-15T12:00:00.000000001")  // true
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isBeforeDateTime = (
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
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) < 0
	} catch {
		return false
	}
}

export default isBeforeDateTime
