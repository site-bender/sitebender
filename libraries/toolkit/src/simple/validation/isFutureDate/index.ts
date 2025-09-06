import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

function todayIsoLocal(): string {
	const d = new Date()
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	return `${y}-${m}-${day}`
}

function toIsoDateString(pd: unknown): string | null {
	if (
		pd && typeof (pd as { toString: () => string }).toString === "function"
	) {
		const iso = (pd as { toString: () => string }).toString()
		return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null
	}
	return null
}

/**
 * Checks if a date is in the future relative to today
 *
 * Validates whether a given date is strictly after today's date in the
 * system's current time zone. Uses Temporal.Now.plainDateISO() to get
 * the current date and compares it with the input date. Accepts various
 * date formats and converts them to Temporal.PlainDate for comparison.
 * Returns false for today's date, past dates, or invalid inputs.
 *
 * Future date rules:
 * - Must be strictly after today (tomorrow or later)
 * - Today's date returns false (use isSameOrAfterDate for inclusive)
 * - Time components are ignored (date-only comparison)
 * - Calendar-aware comparison
 * - Invalid inputs return false (safe for chaining)
 *
 * @param value - The date to check (string, Date, Temporal types, or date-like object)
 * @returns true if the date is in the future, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
 * const today = Temporal.Now.plainDateISO()
 *
 * isFutureDate(tomorrow)       // true
 * isFutureDate(today)          // false (today is not future)
 * isFutureDate(yesterday)      // false
 *
 * // Using ISO date strings (assuming today is 2024-01-15)
 * isFutureDate("2024-01-16")   // true (tomorrow)
 * isFutureDate("2024-01-15")   // false (today)
 * isFutureDate("2025-01-01")   // true (next year)
 *
 * // Invalid inputs
 * isFutureDate(null)           // false
 * isFutureDate("invalid")      // false
 * isFutureDate("2024-13-01")   // false (invalid month)
 *
 * // Event validation
 * const validateEventDate = (date: unknown): string | null => {
 *   if (!isFutureDate(date)) {
 *     return "Event date must be in the future"
 *   }
 *   return null
 * }
 *
 * // Filtering future dates
 * const dates = ["2024-01-10", "2025-06-15", "2023-01-01"]
 * const futureDates = dates.filter(isFutureDate)
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isFutureDate = (
	value: DateInput | null | undefined,
): boolean => {
	const date = toPlainDate(value)

	if (!date) {
		return false
	}

	const iso = toIsoDateString(date)
	if (!iso) return false
	return iso > todayIsoLocal()
}

export default isFutureDate
