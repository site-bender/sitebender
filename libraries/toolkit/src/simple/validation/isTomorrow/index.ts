import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date represents tomorrow
 *
 * Validates whether a given date matches tomorrow's date in the ISO calendar.
 * Accepts various date formats and converts them to Temporal.PlainDate for
 * accurate comparison. Uses the system's current date plus one day for comparison.
 * Returns true only if the date represents tomorrow, false for any other date
 * or invalid input.
 *
 * Date comparison rules:
 * - Compares only the date portion (year, month, day)
 * - Time components are ignored if present
 * - Uses ISO calendar for comparison
 * - Tomorrow is determined by system timezone
 * - Invalid inputs return false (safe for chaining)
 *
 * @param date - The date to check (string, Date, Temporal types, or date-like object)
 * @returns True if the date is tomorrow, false otherwise
 * @example
 * ```typescript
 * // Basic usage (assuming today is 2024-01-15)
 * isTomorrow("2024-01-16")         // true
 * isTomorrow("2024-01-15")         // false (today)
 * isTomorrow("2024-01-17")         // false (day after)
 *
 * // Different input formats
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * isTomorrow(tomorrow)              // true
 * isTomorrow(new Date())            // false (today)
 * isTomorrow({ year: 2024, month: 1, day: 16 })  // true
 *
 * // Time components ignored
 * isTomorrow("2024-01-16T10:30:00") // true
 * isTomorrow("2024-01-16T23:59:59") // true
 *
 * // Invalid inputs
 * isTomorrow(null)                  // false
 * isTomorrow("invalid-date")        // false
 * isTomorrow("2024-13-01")          // false (invalid month)
 *
 * // Filtering collections
 * const tasks = [
 *   { title: "Review PR", dueDate: "2024-01-16" },
 *   { title: "Meeting", dueDate: "2024-01-15" }
 * ]
 * const tomorrowTasks = tasks.filter(t => isTomorrow(t.dueDate))
 * ```
 *
 * @predicate
 * @pure
 * @safe
 */
const isTomorrow = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
		return Temporal.PlainDate.compare(checkDate, tomorrow) === 0
	} catch {
		return false
	}
}

export default isTomorrow
