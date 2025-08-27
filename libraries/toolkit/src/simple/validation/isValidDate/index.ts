import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Validates if a date/time value represents a valid date
 *
 * Checks whether a value can be successfully converted to a valid date.
 * Unlike simple type checks, this validates that the date values are
 * actually valid (e.g., not February 30th or month 13). Accepts various
 * date formats including strings, Date objects, Temporal types, and
 * date-like objects. Returns true only for valid, parseable dates.
 *
 * Date validation rules:
 * - Must represent a real calendar date
 * - Month must be 1-12
 * - Day must be valid for the given month and year
 * - Handles leap years correctly
 * - Accepts ISO strings, Date objects, Temporal types
 * - Validates date-like objects with year/month/day properties
 * - Returns false for invalid dates like 2024-02-30
 * - Returns false for null, undefined, or unparseable values
 *
 * @param value - The value to validate as a date
 * @returns True if the value represents a valid date, false otherwise
 * @example
 * ```typescript
 * // Valid dates - ISO strings
 * isValidDate("2024-01-15")                    // true
 * isValidDate("2024-12-31")                    // true
 * isValidDate("2024-02-29")                    // true (leap year)
 * isValidDate("2024-01-15T10:30:00")           // true (time ignored)
 * isValidDate("2024-01-15T10:30:00Z")          // true
 *
 * // Invalid dates - impossible dates
 * isValidDate("2024-02-30")                    // false (Feb has max 29 days)
 * isValidDate("2024-04-31")                    // false (Apr has 30 days)
 * isValidDate("2023-02-29")                    // false (not a leap year)
 * isValidDate("2024-13-01")                    // false (invalid month)
 * isValidDate("2024-00-15")                    // false (month can't be 0)
 * isValidDate("2024-01-32")                    // false (Jan has 31 days)
 * isValidDate("2024-01-00")                    // false (day can't be 0)
 *
 * // JavaScript Date objects
 * isValidDate(new Date("2024-01-15"))          // true
 * isValidDate(new Date("invalid"))             // false (Invalid Date)
 * isValidDate(new Date("2024-02-30"))          // false (auto-corrected dates)
 *
 * // Temporal objects
 * isValidDate(Temporal.PlainDate.from("2024-01-15"))     // true
 * isValidDate(Temporal.PlainDateTime.from("2024-01-15T10:30:00")) // true
 * isValidDate(Temporal.Now.plainDateISO())     // true
 *
 * // Date-like objects
 * isValidDate({ year: 2024, month: 1, day: 15 })   // true
 * isValidDate({ year: 2024, month: 2, day: 29 })   // true (leap year)
 * isValidDate({ year: 2024, month: 2, day: 30 })   // false
 * isValidDate({ year: 2024, month: 13, day: 1 })   // false
 *
 * // Edge cases
 * isValidDate(null)                            // false
 * isValidDate(undefined)                       // false
 * isValidDate("")                              // false (empty string)
 * isValidDate("not a date")                    // false
 * isValidDate("2024/01/15")                    // true (alternative format)
 * isValidDate("01/15/2024")                    // true (US format)
 * isValidDate("15/01/2024")                    // true (UK format if parseable)
 * isValidDate(123456789)                       // false (number)
 * isValidDate([2024, 1, 15])                   // false (array)
 * isValidDate({})                              // false (empty object)
 *
 * // Form validation
 * function validateBirthDate(input: unknown): string | null {
 *   if (!input) {
 *     return "Birth date is required"
 *   }
 *
 *   if (!isValidDate(input)) {
 *     return "Please enter a valid date"
 *   }
 *
 *   const date = toPlainDate(input)
 *   const today = Temporal.Now.plainDateISO()
 *
 *   if (date && Temporal.PlainDate.compare(date, today) > 0) {
 *     return "Birth date cannot be in the future"
 *   }
 *
 *   return null
 * }
 *
 * // Data cleaning
 * interface Record {
 *   id: string
 *   date: string
 *   value: number
 * }
 *
 * function cleanRecords(records: Array<Record>): Array<Record> {
 *   return records.filter(record => isValidDate(record.date))
 * }
 *
 * // Date range validation
 * function validateDateRange(
 *   startDate: unknown,
 *   endDate: unknown
 * ): string | null {
 *   if (!isValidDate(startDate)) {
 *     return "Invalid start date"
 *   }
 *
 *   if (!isValidDate(endDate)) {
 *     return "Invalid end date"
 *   }
 *
 *   const start = toPlainDate(startDate)
 *   const end = toPlainDate(endDate)
 *
 *   if (start && end && Temporal.PlainDate.compare(start, end) > 0) {
 *     return "Start date must be before end date"
 *   }
 *
 *   return null
 * }
 *
 * // Leap year handling
 * function validateLeapDay(year: number, month: number, day: number): boolean {
 *   return isValidDate({ year, month, day })
 * }
 *
 * validateLeapDay(2024, 2, 29)  // true (2024 is leap year)
 * validateLeapDay(2023, 2, 29)  // false (2023 is not leap year)
 * validateLeapDay(2000, 2, 29)  // true (2000 is leap year)
 * validateLeapDay(1900, 2, 29)  // false (1900 is not leap year)
 *
 * // Month-end validation
 * function isValidMonthEnd(year: number, month: number, day: number): boolean {
 *   return isValidDate({ year, month, day })
 * }
 *
 * isValidMonthEnd(2024, 1, 31)   // true (Jan has 31 days)
 * isValidMonthEnd(2024, 2, 29)   // true (Feb in leap year)
 * isValidMonthEnd(2024, 3, 31)   // true (Mar has 31 days)
 * isValidMonthEnd(2024, 4, 30)   // true (Apr has 30 days)
 * isValidMonthEnd(2024, 4, 31)   // false (Apr has only 30 days)
 *
 * // Historical date validation
 * function isValidHistoricalDate(dateStr: string): boolean {
 *   if (!isValidDate(dateStr)) {
 *     return false
 *   }
 *
 *   const date = toPlainDate(dateStr)
 *   if (!date) return false
 *
 *   // Check if date is reasonable (e.g., after year 1000)
 *   return date.year >= 1000 && date.year <= Temporal.Now.plainDateISO().year
 * }
 *
 * // Batch date validation
 * function validateDates(dates: Array<unknown>): {
 *   valid: Array<string>
 *   invalid: Array<unknown>
 * } {
 *   const valid: Array<string> = []
 *   const invalid: Array<unknown> = []
 *
 *   for (const date of dates) {
 *     if (isValidDate(date)) {
 *       const plainDate = toPlainDate(date)
 *       if (plainDate) {
 *         valid.push(plainDate.toString())
 *       }
 *     } else {
 *       invalid.push(date)
 *     }
 *   }
 *
 *   return { valid, invalid }
 * }
 *
 * // Configuration date validation
 * interface Config {
 *   startDate: string
 *   endDate: string
 *   cutoffDate?: string
 * }
 *
 * function validateConfig(config: Config): Array<string> {
 *   const errors: Array<string> = []
 *
 *   if (!isValidDate(config.startDate)) {
 *     errors.push("Invalid start date")
 *   }
 *
 *   if (!isValidDate(config.endDate)) {
 *     errors.push("Invalid end date")
 *   }
 *
 *   if (config.cutoffDate && !isValidDate(config.cutoffDate)) {
 *     errors.push("Invalid cutoff date")
 *   }
 *
 *   return errors
 * }
 *
 * // Event scheduling validation
 * interface Event {
 *   name: string
 *   date: string
 *   recurring: boolean
 * }
 *
 * function getValidEvents(events: Array<Event>): Array<Event> {
 *   return events.filter(event => isValidDate(event.date))
 * }
 *
 * // Database migration validation
 * function validateMigrationDate(filename: string): boolean {
 *   // Extract date from filename like "20240115_create_users.sql"
 *   const match = filename.match(/^(\d{4})(\d{2})(\d{2})_/)
 *
 *   if (!match) {
 *     return false
 *   }
 *
 *   const [, year, month, day] = match
 *   return isValidDate({
 *     year: parseInt(year, 10),
 *     month: parseInt(month, 10),
 *     day: parseInt(day, 10)
 *   })
 * }
 *
 * validateMigrationDate("20240115_create_users.sql")   // true
 * validateMigrationDate("20240230_update_posts.sql")   // false
 * validateMigrationDate("20241301_add_column.sql")     // false
 *
 * // API response validation
 * interface ApiResponse {
 *   data: Array<{
 *     id: string
 *     createdAt: string
 *     updatedAt: string
 *   }>
 * }
 *
 * function validateApiDates(response: ApiResponse): boolean {
 *   return response.data.every(item =>
 *     isValidDate(item.createdAt) && isValidDate(item.updatedAt)
 *   )
 * }
 *
 * // Calendar generation
 * function generateMonthDays(year: number, month: number): Array<number> {
 *   const days: Array<number> = []
 *
 *   for (let day = 1; day <= 31; day++) {
 *     if (isValidDate({ year, month, day })) {
 *       days.push(day)
 *     } else {
 *       break // No more valid days in this month
 *     }
 *   }
 *
 *   return days
 * }
 *
 * generateMonthDays(2024, 2)   // [1, 2, ..., 29]
 * generateMonthDays(2023, 2)   // [1, 2, ..., 28]
 * generateMonthDays(2024, 4)   // [1, 2, ..., 30]
 * generateMonthDays(2024, 1)   // [1, 2, ..., 31]
 *
 * // Expiry date validation
 * function isValidExpiryDate(month: number, year: number): boolean {
 *   // Credit card expiry is usually end of month
 *   const currentDate = Temporal.Now.plainDateISO()
 *
 *   // Check if month/year combination is valid
 *   if (!isValidDate({ year, month, day: 1 })) {
 *     return false
 *   }
 *
 *   // Check if not expired (compare year and month)
 *   return year > currentDate.year ||
 *          (year === currentDate.year && month >= currentDate.month)
 * }
 *
 * // Log timestamp validation
 * function parseLogDate(logLine: string): Date | null {
 *   // Extract date from log format: [2024-01-15 10:30:00] INFO: message
 *   const match = logLine.match(/\[(\d{4}-\d{2}-\d{2})\s/)
 *
 *   if (!match || !isValidDate(match[1])) {
 *     return null
 *   }
 *
 *   return new Date(match[1])
 * }
 *
 * // Fiscal year validation
 * function isValidFiscalDate(
 *   date: string,
 *   fiscalYearStart: { month: number; day: number }
 * ): boolean {
 *   if (!isValidDate(date)) {
 *     return false
 *   }
 *
 *   const plainDate = toPlainDate(date)
 *   if (!plainDate) return false
 *
 *   // Validate fiscal year start date for the same year
 *   return isValidDate({
 *     year: plainDate.year,
 *     month: fiscalYearStart.month,
 *     day: fiscalYearStart.day
 *   })
 * }
 * ```
 *
 * @pure
 */
const isValidDate = (value: DateInput | null | undefined): boolean => {
	// Attempt to convert to PlainDate
	// toPlainDate returns null for invalid dates
	const date = toPlainDate(value)

	// If conversion succeeded, it's a valid date
	return date !== null
}

export default isValidDate
