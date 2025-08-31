import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is between two other dates (inclusive)
 *
 * Curried function that validates whether a date falls within a date range,
 * including the boundary dates. Accepts various date formats and converts them
 * to Temporal.PlainDate for comparison. Returns true if the date is greater than
 * or equal to the start date AND less than or equal to the end date. Returns
 * false for invalid inputs, conversion failures, or dates outside the range.
 *
 * Date range rules:
 * - Inclusive boundaries: date can equal start or end date
 * - Start date must be before or equal to end date
 * - Invalid range (start > end) always returns false
 * - Calendar-aware comparison (respects calendar systems)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param startDate - The start of the date range (inclusive)
 * @param endDate - The end of the date range (inclusive)
 * @returns A predicate function that checks if a date is within the range
 * @example
 * ```typescript
 * // Basic usage
 * const isInJanuary = isBetweenDates("2024-01-01", "2024-01-31")
 * isInJanuary("2024-01-15")     // true
 * isInJanuary("2023-12-31")     // false
 * isInJanuary("2024-02-01")     // false
 *
 * // Year range check
 * const isIn2024 = isBetweenDates(
 *   "2024-01-01",
 *   "2024-12-31"
 * )
 * isIn2024("2024-06-15")         // true
 * isIn2024("2023-12-31")         // false
 *
 * // Boundary conditions
 * const checker = isBetweenDates("2024-01-01", "2024-01-31")
 * checker("2024-01-01")          // true (start boundary)
 * checker("2024-01-31")          // true (end boundary)
 *
 * // Invalid inputs
 * checker(null)                  // false
 * checker("invalid")             // false
 *
 * // Filtering dates
 * const dates = [
 *   "2024-01-15",
 *   "2024-02-01",
 *   "2024-01-20",
 *   "2023-12-31"
 * ]
 * const januaryDates = dates.filter(isInJanuary)
 * // ["2024-01-15", "2024-01-20"]
 *
 * // Business quarter check
 * const isQ1 = isBetweenDates("2024-01-01", "2024-03-31")
 * const isQ2 = isBetweenDates("2024-04-01", "2024-06-30")
 *
 * const getQuarter = (date: DateInput): number =>
 *   isQ1(date) ? 1
 *   : isQ2(date) ? 2
 *   : isBetweenDates("2024-07-01", "2024-09-30")(date) ? 3
 *   : isBetweenDates("2024-10-01", "2024-12-31")(date) ? 4
 *   : 0
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
const isBetweenDates = (
	startDate: DateInput | null | undefined,
	endDate: DateInput | null | undefined,
) =>
(
	date: DateInput | null | undefined,
): boolean => {
	const start = toPlainDate(startDate)
	const end = toPlainDate(endDate)
	const checkDate = toPlainDate(date)

	if (!start || !end || !checkDate) {
		return false
	}

	try {
		// Check if range is valid (start <= end)
		if (Temporal.PlainDate.compare(start, end) > 0) {
			return false
		}

		// Check if date is >= start AND <= end
		return Temporal.PlainDate.compare(checkDate, start) >= 0 &&
			Temporal.PlainDate.compare(checkDate, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenDates
