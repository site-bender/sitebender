import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

function toIsoDateString(pd: unknown): string | null {
	// Best-effort use of toString for Temporal.PlainDate
	if (
		pd && typeof (pd as { toString: () => string }).toString === "function"
	) {
		const iso = (pd as { toString: () => string }).toString()
		return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null
	}
	return null
}

/**
 * Checks if a date is after another date
 *
 * Curried function that validates whether one date comes chronologically
 * after another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns false for equal dates, invalid inputs, or conversion failures.
 *
 * Date comparison rules:
 * - Strictly after: date must be chronologically later
 * - Equal dates return false (use isSameOrAfterDate for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is after the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isAfterJan15 = isAfterDate("2024-01-15")
 * isAfterJan15("2024-01-20")  // true
 * isAfterJan15("2024-01-10")  // false
 * isAfterJan15("2024-01-15")  // false (same date)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * isAfterDate(jsDate)("2024-01-20")  // true
 *
 * // Filtering future dates
 * const dates = ["2024-01-10", "2024-01-20", "2024-01-30"]
 * dates.filter(isAfterDate("2024-01-15"))  // ["2024-01-20", "2024-01-30"]
 *
 * // Invalid inputs return false
 * isAfterDate("2024-01-15")(null)  // false
 * isAfterDate("2024-01-15")("invalid")  // false
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isAfterDate = (
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

	const a = toIsoDateString(compareDate)
	const b = toIsoDateString(refDate)
	if (!a || !b) return false
	return a > b
}

export default isAfterDate
