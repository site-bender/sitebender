import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date represents yesterday
 *
 * Validates whether a given date matches yesterday's date in the ISO calendar.
 * Accepts various date formats and converts them to Temporal.PlainDate for
 * accurate comparison. Uses the system's current date minus one day for comparison.
 * Returns true only if the date represents yesterday, false for any other date
 * or invalid input.
 *
 * Date comparison rules:
 * - Compares only the date portion (year, month, day)
 * - Time components are ignored if present
 * - Uses ISO calendar for comparison
 * - Yesterday is determined by system timezone
 * - Invalid inputs return false (safe for chaining)
 *
 * @param date - The date to check (string, Date, Temporal types, or date-like object)
 * @returns True if the date is yesterday, false otherwise
 * @example
 * ```typescript
 * // Assuming today is 2024-01-15
 * isYesterday("2024-01-14")          // true
 * isYesterday("2024-01-14T10:30:00") // true (time ignored)
 * isYesterday("2024-01-15")          // false (today)
 * isYesterday("2024-01-13")          // false (two days ago)
 *
 * // Using Temporal PlainDate
 * const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
 * isYesterday(yesterday)              // true
 *
 * // Invalid inputs return false
 * isYesterday(null)                   // false
 * isYesterday("invalid-date")         // false
 *
 * // Filtering records
 * const logs = [
 *   { date: "2024-01-14", msg: "A" },
 *   { date: "2024-01-15", msg: "B" }
 * ]
 * const yesterdaysLogs = logs.filter(log => isYesterday(log.date))
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isYesterday = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
		return Temporal.PlainDate.compare(checkDate, yesterday) === 0
	} catch {
		return false
	}
}

export default isYesterday
