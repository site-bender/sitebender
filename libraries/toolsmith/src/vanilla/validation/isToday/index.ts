import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date represents today
 *
 * Validates whether a given date matches today's date in the ISO calendar.
 * Accepts various date formats and converts them to Temporal.PlainDate for
 * accurate comparison. Uses the system's current date for comparison.
 * Returns true only if the date represents today, false for any other date
 * or invalid input.
 *
 * Date comparison rules:
 * - Compares only the date portion (year, month, day)
 * - Time components are ignored if present
 * - Uses ISO calendar for comparison
 * - Today is determined by system timezone
 * - Invalid inputs return false (safe for chaining)
 *
 * @param date - The date to check (string, Date, Temporal types, or date-like object)
 * @returns True if the date is today, false otherwise
 * @example
 * ```typescript
 * // Basic usage (assuming today is 2024-01-15)
 * isToday("2024-01-15")          // true
 * isToday("2024-01-15T10:30:00") // true (time ignored)
 * isToday("2024-01-14")          // false (yesterday)
 * isToday("2024-01-16")          // false (tomorrow)
 *
 * // Using different date types
 * const today = Temporal.Now.plainDateISO()
 * isToday(today)                 // true
 * isToday(new Date())            // true
 * isToday(today.subtract({ days: 1 }))  // false
 *
 * // Filter today's tasks
 * interface Task {
 *   title: string
 *   dueDate: string
 * }
 * const tasks: Array<Task> = [
 *   { title: "Review code", dueDate: "2024-01-15" },
 *   { title: "Write tests", dueDate: "2024-01-16" }
 * ]
 * const todaysTasks = tasks.filter(task => isToday(task.dueDate))
 *
 * // Invalid inputs return false
 * isToday(null)              // false
 * isToday(undefined)         // false
 * isToday("invalid-date")    // false
 * isToday(123)               // false
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isToday = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(checkDate, today) === 0
	} catch {
		return false
	}
}

export default isToday
