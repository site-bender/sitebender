import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is before another date
 *
 * Curried function that validates whether one date comes chronologically
 * before another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns false for equal dates, invalid inputs, or conversion failures.
 *
 * Date comparison rules:
 * - Strictly before: date must be chronologically earlier
 * - Equal dates return false (use isSameOrBeforeDate for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is before the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isBeforeJan15 = isBeforeDate("2024-01-15")
 * isBeforeJan15("2024-01-10")  // true
 * isBeforeJan15("2024-01-20")  // false
 * isBeforeJan15("2024-01-15")  // false (same date)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * isBeforeDate(jsDate)("2024-01-10")  // true
 *
 * // Filtering past dates
 * const dates = ["2024-01-10", "2024-01-20", "2024-01-30"]
 * dates.filter(isBeforeDate("2024-01-15"))  // ["2024-01-10"]
 *
 * // Invalid inputs return false
 * isBeforeDate("2024-01-15")(null)  // false
 * isBeforeDate("2024-01-15")("invalid")  // false
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isBeforeDate = (
	reference: DateInput | null | undefined,
) =>
(
	date: DateInput | null | undefined,
): boolean => {
	const refDate = toPlainDate(reference)
	const compareDate = toPlainDate(date)

	if (!refDate || !compareDate) {
		return false
	}

	try {
		return Temporal.PlainDate.compare(compareDate, refDate) < 0
	} catch {
		return false
	}
}

export default isBeforeDate
