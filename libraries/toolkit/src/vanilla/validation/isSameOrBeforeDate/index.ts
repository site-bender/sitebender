import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is the same as or before another date
 *
 * Validates whether one date is chronologically the same as or before
 * another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns true for equal dates, dates before the reference, and false
 * for dates after or invalid inputs.
 *
 * Date comparison rules:
 * - Same or before: date must be equal to or chronologically earlier
 * - Equal dates return true (inclusive comparison)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is same or before the reference
 * @example
 * ```typescript
 * // Basic usage
 * const isSameOrBeforeJan15 = isSameOrBeforeDate("2024-01-15")
 * isSameOrBeforeJan15("2024-01-10")     // true (before)
 * isSameOrBeforeJan15("2024-01-15")     // true (same)
 * isSameOrBeforeJan15("2024-01-20")     // false (after)
 *
 * // Different date formats
 * const checker = isSameOrBeforeDate(new Date("2024-01-15"))
 * checker(Temporal.PlainDate.from("2024-01-10"))  // true
 * checker({ year: 2024, month: 1, day: 15 })      // true
 *
 * // Invalid inputs
 * checker(null)                    // false
 * checker("invalid-date")          // false
 *
 * // Deadline checking
 * const isBeforeDeadline = isSameOrBeforeDate("2024-12-31")
 * const tasks = [
 *   { name: "Task 1", dueDate: "2024-11-30" },
 *   { name: "Task 2", dueDate: "2025-01-15" },
 *   { name: "Task 3", dueDate: "2024-12-31" }
 * ]
 * const onTimeTasks = tasks.filter(t => isBeforeDeadline(t.dueDate))
 * // [Task 1, Task 3]
 *
 * // Age verification
 * const isAdult = isSameOrBeforeDate(
 *   Temporal.Now.plainDateISO().subtract({ years: 18 })
 * )
 * isAdult("2000-01-01")  // true (if current year is 2024)
 * isAdult("2010-01-01")  // false (if current year is 2024)
 * ```
 *
 * @curried
 * @predicate
 * @pure
 * @safe
 */
const isSameOrBeforeDate = (
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
		return Temporal.PlainDate.compare(compareDate, refDate) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeDate
