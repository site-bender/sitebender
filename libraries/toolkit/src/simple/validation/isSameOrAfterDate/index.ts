import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is the same as or after another date
 *
 * Validates whether one date is chronologically the same as or after
 * another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns true for equal dates, dates after the reference, and false
 * for dates before or invalid inputs.
 *
 * Date comparison rules:
 * - Same or after: date must be equal to or chronologically later
 * - Equal dates return true (inclusive comparison)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is same or after the reference
 * @example
 * ```typescript
 * // Basic usage with ISO date strings
 * const isSameOrAfterJan15 = isSameOrAfterDate("2024-01-15")
 * isSameOrAfterJan15("2024-01-20")  // true (after)
 * isSameOrAfterJan15("2024-01-15")  // true (same)
 * isSameOrAfterJan15("2024-01-10")  // false (before)
 *
 * // With Temporal PlainDate
 * const date = Temporal.PlainDate.from("2024-01-15")
 * const checker = isSameOrAfterDate(date)
 * checker("2024-01-20")              // true
 * checker(date)                       // true (same)
 *
 * // Validate date ranges
 * const validateEndDate = (start: string, end: string): boolean =>
 *   isSameOrAfterDate(start)(end)
 *
 * validateEndDate("2024-01-01", "2024-12-31")  // true
 * validateEndDate("2024-12-31", "2024-01-01")  // false
 *
 * // Filter dates from cutoff
 * const dates = ["2024-01-10", "2024-01-15", "2024-01-20"]
 * const fromJan15 = dates.filter(isSameOrAfterDate("2024-01-15"))
 * // ["2024-01-15", "2024-01-20"]
 *
 * // Check minimum date
 * const isValidStartDate = isSameOrAfterDate("2024-01-01")
 * isValidStartDate("2024-06-15")     // true
 * isValidStartDate("2023-12-31")     // false
 *
 * // Edge cases
 * const check = isSameOrAfterDate("2024-01-15")
 * check(null)                        // false
 * check(undefined)                   // false
 * check("invalid-date")              // false
 * check("2024-13-01")                // false (invalid month)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSameOrAfterDate = (
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
		return Temporal.PlainDate.compare(compareDate, refDate) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterDate
