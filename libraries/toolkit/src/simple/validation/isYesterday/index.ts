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
 *
 * // Using ISO date strings
 * isYesterday("2024-01-14")         // true
 * isYesterday("2024-01-14T10:30:00") // true (time ignored)
 * isYesterday("2024-01-15")         // false (today)
 * isYesterday("2024-01-13")         // false (two days ago)
 *
 * // Using Temporal PlainDate objects
 * const today = Temporal.Now.plainDateISO()
 * const yesterday = today.subtract({ days: 1 })
 * const twoDaysAgo = today.subtract({ days: 2 })
 *
 * isYesterday(yesterday)  // true
 * isYesterday(today)      // false
 * isYesterday(twoDaysAgo) // false
 *
 * // Finding yesterday's records
 * interface LogEntry {
 *   date: string
 *   message: string
 *   level: string
 * }
 *
 * function getYesterdaysLogs(logs: Array<LogEntry>): Array<LogEntry> {
 *   return logs.filter(log => isYesterday(log.date))
 * }
 *
 * // Review reminder system
 * interface Review {
 *   submittedDate: string
 *   author: string
 *   status: string
 * }
 *
 * function getYesterdaysReviews(reviews: Array<Review>): Array<Review> {
 *   return reviews.filter(review => isYesterday(review.submittedDate))
 * }
 *
 * // Daily report comparison
 * function getDailyComparison(date: string): string {
 *   if (isYesterday(date)) {
 *     return "Yesterday's data"
 *   }
 *
 *   const checkDate = toPlainDate(date)
 *   const today = Temporal.Now.plainDateISO()
 *
 *   if (checkDate && Temporal.PlainDate.compare(checkDate, today) === 0) {
 *     return "Today's data"
 *   }
 *
 *   return "Historical data"
 * }
 *
 * // Invalid inputs return false
 * isYesterday(null)              // false
 * isYesterday(undefined)         // false
 * isYesterday("")                // false (empty string)
 * isYesterday("invalid-date")    // false (invalid format)
 * isYesterday("2024-13-01")      // false (invalid month)
 * isYesterday(123)               // false (not a date type)
 *
 * // Backup verification
 * function wasBackupRunYesterday(lastBackupDate: string): boolean {
 *   return isYesterday(lastBackupDate)
 * }
 *
 * // Sales tracking
 * interface Sale {
 *   date: string
 *   amount: number
 *   productId: string
 * }
 *
 * function getYesterdaysSales(sales: Array<Sale>): {
 *   total: number
 *   count: number
 * } {
 *   const yesterdaysSales = sales.filter(sale => isYesterday(sale.date))
 *
 *   return {
 *     total: yesterdaysSales.reduce((sum, sale) => sum + sale.amount, 0),
 *     count: yesterdaysSales.length
 *   }
 * }
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Uses ISO calendar for comparison
 * @property Time-agnostic - Ignores time components if present
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
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
