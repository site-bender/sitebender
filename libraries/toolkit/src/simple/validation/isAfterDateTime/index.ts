import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

/**
 * Checks if a datetime is after another datetime
 *
 * Curried function that validates whether one datetime comes chronologically
 * after another datetime. Accepts various datetime formats and converts them to
 * Temporal.PlainDateTime for comparison. Compares both date and time components
 * with nanosecond precision. Returns false for equal datetimes, invalid inputs,
 * or conversion failures.
 *
 * DateTime comparison rules:
 * - Compares date first, then time if dates are equal
 * - Strictly after: datetime must be chronologically later
 * - Equal datetimes return false (use isSameOrAfterDateTime for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Nanosecond precision for time comparisons
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference datetime (string, Date, Temporal types, or datetime-like object)
 * @returns A predicate function that checks if a datetime is after the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isAfter230PM = isAfterDateTime("2024-01-15T14:30:00")
 * isAfter230PM("2024-01-15T15:30:00")  // true
 * isAfter230PM("2024-01-15T13:30:00")  // false
 * isAfter230PM("2024-01-15T14:30:00")  // false (same)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15T14:30:00")
 * isAfterDateTime(jsDate)("2024-01-15T15:30:00")  // true
 *
 * // Filtering events
 * const events = [
 *   { time: "2024-01-15T09:00:00" },
 *   { time: "2024-01-15T14:00:00" }
 * ]
 * events.filter(e => isAfterDateTime("2024-01-15T12:00:00")(e.time))
 * // [{ time: "2024-01-15T14:00:00" }]
 *
 * // Nanosecond precision
 * const precise = Temporal.PlainDateTime.from("2024-01-15T12:00:00.000000001")
 * isAfterDateTime(precise)("2024-01-15T12:00:00.000000002")  // true
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isAfterDateTime = (
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
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) > 0
	} catch {
		return false
	}
}

export default isAfterDateTime
