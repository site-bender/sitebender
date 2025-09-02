import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is in the past relative to today
 *
 * Validates whether a given date is strictly before today's date in the
 * system's current time zone. Uses Temporal.Now.plainDateISO() to get
 * the current date and compares it with the input date. Accepts various
 * date formats and converts them to Temporal.PlainDate for comparison.
 * Returns false for today's date, future dates, or invalid inputs.
 *
 * Past date rules:
 * - Must be strictly before today (yesterday or earlier)
 * - Today's date returns false (use isSameOrBeforeDate for inclusive)
 * - Time components are ignored (date-only comparison)
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The date to check (string, Date, Temporal types, or date-like object)
 * @returns true if the date is in the past, false otherwise
 * @example
 * ```typescript
 * // Basic past date validation
 * const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
 * const today = Temporal.Now.plainDateISO()
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 *
 * isPastDate(yesterday)        // true
 * isPastDate(today)            // false (today is not past)
 * isPastDate(tomorrow)         // false
 *
 * // Using ISO strings
 * isPastDate("2023-12-31")     // true (past year)
 * isPastDate("2025-01-01")     // false (future)
 *
 * // Birth date validation
 * const validateBirthDate = (date: unknown): string | null => {
 *   return !isPastDate(date) ? "Birth date must be in the past" : null
 * }
 *
 * // Filter historical transactions
 * const transactions = [
 *   { date: "2023-01-10", amount: 100 },
 *   { date: "2025-01-20", amount: 200 }
 * ]
 * const historical = transactions.filter(t => isPastDate(t.date))
 *
 * // Invalid inputs
 * isPastDate(null)             // false
 * isPastDate("invalid")        // false
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isPastDate = (
	value: DateInput | null | undefined,
): boolean => {
	const date = toPlainDate(value)

	if (!date) {
		return false
	}

	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(date, today) < 0
	} catch {
		return false
	}
}

export default isPastDate
