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
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
 * const today = Temporal.Now.plainDateISO()
 *
 * isPastDate(yesterday)        // true
 * isPastDate(today)            // false (today is not past)
 * isPastDate(tomorrow)         // false (future)
 *
 * // Using ISO date strings
 * // Assuming today is 2024-01-15
 * isPastDate("2024-01-14")     // true (yesterday)
 * isPastDate("2024-01-15")     // false (today)
 * isPastDate("2024-01-16")     // false (tomorrow)
 * isPastDate("2023-12-31")     // true (last year)
 * isPastDate("2025-01-01")     // false (next year)
 *
 * // Using Date objects
 * const pastDate = new Date()
 * pastDate.setDate(pastDate.getDate() - 7)  // 7 days ago
 *
 * isPastDate(pastDate)         // true
 * isPastDate(new Date())       // false (today)
 *
 * // Using date-like objects
 * const today = Temporal.Now.plainDateISO()
 * const pastObj = {
 *   year: today.year - 1,
 *   month: today.month,
 *   day: today.day
 * }
 *
 * isPastDate(pastObj)          // true (last year)
 * isPastDate({ year: 2025, month: 1, day: 1 })  // false (future)
 *
 * // Historical data validation
 * const validateHistoricalDate = (date: unknown): string | null => {
 *   if (!date) {
 *     return "Date is required"
 *   }
 *
 *   if (!isPastDate(date)) {
 *     return "Date must be in the past"
 *   }
 *
 *   return null
 * }
 *
 * const lastWeek = Temporal.Now.plainDateISO().subtract({ weeks: 1 })
 * validateHistoricalDate(lastWeek)       // null (valid)
 * validateHistoricalDate("2025-01-01")   // "Date must be in the past"
 *
 * // Filtering past dates
 * const dates = [
 *   "2023-01-01",
 *   "2024-12-31",
 *   "2025-06-15",
 *   Temporal.Now.plainDateISO().subtract({ days: 30 }),
 *   Temporal.Now.plainDateISO()
 * ]
 *
 * const pastDates = dates.filter(isPastDate)
 * // Returns only dates before today
 *
 * // Birth date validation
 * const validateBirthDate = (
 *   birthDate: unknown
 * ): string | null => {
 *   if (!birthDate) {
 *     return "Birth date is required"
 *   }
 *
 *   if (!isPastDate(birthDate)) {
 *     return "Birth date must be in the past"
 *   }
 *
 *   const birth = toPlainDate(birthDate)
 *   if (!birth) {
 *     return "Invalid birth date"
 *   }
 *
 *   const hundredYearsAgo = Temporal.Now.plainDateISO().subtract({ years: 100 })
 *   if (Temporal.PlainDate.compare(birth, hundredYearsAgo) < 0) {
 *     return "Birth date seems incorrect"
 *   }
 *
 *   return null
 * }
 *
 * validateBirthDate("1990-01-15")  // null (valid)
 * validateBirthDate("2025-01-15")  // "Birth date must be in the past"
 * validateBirthDate("1850-01-15")  // "Birth date seems incorrect"
 *
 * // Transaction history
 * const getCompletedTransactions = (
 *   transactions: Array<{ date: string; status: string; amount: number }>
 * ): Array<typeof transactions[0]> => {
 *   return transactions.filter(txn =>
 *     txn.status === "completed" && isPastDate(txn.date)
 *   )
 * }
 *
 * const transactions = [
 *   { date: "2024-01-10", status: "completed", amount: 100 },
 *   { date: "2024-01-20", status: "completed", amount: 200 },  // future
 *   { date: "2024-01-05", status: "pending", amount: 300 },
 * ]
 *
 * // Returns only completed transactions with past dates
 * getCompletedTransactions(transactions)
 *
 * // Employment history validation
 * const validateEmploymentDates = (
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate | null
 * ): string | null => {
 *   if (!isPastDate(startDate)) {
 *     return "Start date must be in the past"
 *   }
 *
 *   if (endDate && !isPastDate(endDate)) {
 *     return "End date must be in the past or empty for current job"
 *   }
 *
 *   if (endDate && Temporal.PlainDate.compare(endDate, startDate) < 0) {
 *     return "End date must be after start date"
 *   }
 *
 *   return null
 * }
 *
 * const startDate = Temporal.PlainDate.from("2020-01-15")
 * const endDate = Temporal.PlainDate.from("2023-12-31")
 * validateEmploymentDates(startDate, endDate)  // null if dates are in past
 *
 * // Archive date checking
 * const shouldArchive = (
 *   lastModified: Temporal.PlainDate,
 *   daysOld: number = 90
 * ): boolean => {
 *   if (!isPastDate(lastModified)) {
 *     return false  // Don't archive future-dated items
 *   }
 *
 *   const cutoffDate = Temporal.Now.plainDateISO().subtract({ days: daysOld })
 *   return Temporal.PlainDate.compare(lastModified, cutoffDate) < 0
 * }
 *
 * const fileDate = Temporal.PlainDate.from("2023-01-01")
 * shouldArchive(fileDate, 90)  // true if more than 90 days old
 *
 * // Invalid inputs
 * isPastDate(null)                // false
 * isPastDate(undefined)           // false
 * isPastDate("")                  // false (empty string)
 * isPastDate("invalid-date")      // false (invalid format)
 * isPastDate("2024-13-01")        // false (invalid month)
 * isPastDate("2024-02-30")        // false (invalid day)
 * isPastDate(123)                 // false (not a date type)
 * isPastDate({})                  // false (missing date properties)
 * isPastDate([2024, 1, 20])       // false (array not supported)
 *
 * // Historical event validation
 * const isHistoricalEvent = (eventDate: string): boolean => {
 *   return isPastDate(eventDate)
 * }
 *
 * isHistoricalEvent("1969-07-20")  // true (moon landing)
 * isHistoricalEvent("2025-01-01")  // false (future)
 *
 * // Audit log filtering
 * type AuditEntry = {
 *   date: Temporal.PlainDate
 *   action: string
 *   user: string
 * }
 *
 * const getHistoricalAuditEntries = (
 *   entries: Array<AuditEntry>
 * ): Array<AuditEntry> => {
 *   return entries
 *     .filter(entry => isPastDate(entry.date))
 *     .sort((a, b) => Temporal.PlainDate.compare(b.date, a.date))
 * }
 *
 * // Certificate expiration
 * const isCertificateExpired = (
 *   expiryDate: Temporal.PlainDate
 * ): boolean => {
 *   // Certificate is expired if expiry date is in the past
 *   return isPastDate(expiryDate)
 * }
 *
 * const certExpiry = Temporal.PlainDate.from("2023-12-31")
 * isCertificateExpired(certExpiry)  // true if past
 *
 * // Due date checking
 * const isOverdue = (dueDate: string): boolean => {
 *   // Item is overdue if due date is in the past
 *   return isPastDate(dueDate)
 * }
 *
 * isOverdue("2024-01-01")  // true/false based on current date
 *
 * // Contract validation
 * const validateContract = (
 *   signedDate: Temporal.PlainDate,
 *   effectiveDate: Temporal.PlainDate
 * ): string | null => {
 *   if (!isPastDate(signedDate)) {
 *     return "Contract must be signed in the past"
 *   }
 *
 *   if (Temporal.PlainDate.compare(effectiveDate, signedDate) < 0) {
 *     return "Effective date cannot be before signed date"
 *   }
 *
 *   return null
 * }
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Date-only - Ignores time components
 * @property Exclusive - Returns false for today's date
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
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
