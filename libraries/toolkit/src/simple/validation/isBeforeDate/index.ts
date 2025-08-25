import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is before another date
 *
 * Curried function that validates whether one date comes chronologically
 * before another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns false for equal dates, invalid inputs, or conversion failures.
 *
 * Date comparison rules:
 * - Strictly before: date must be chronologically earlier
 * - Equal dates return false (use isSameOrBeforeDate for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is before the reference
 * @example
 * ```typescript
 * // Using ISO date strings
 * const isBeforeJan15 = isBeforeDate("2024-01-15")
 *
 * isBeforeJan15("2024-01-10")     // true (Jan 10 is before Jan 15)
 * isBeforeJan15("2024-01-20")     // false (Jan 20 is after Jan 15)
 * isBeforeJan15("2024-01-15")     // false (same date)
 *
 * // Using Temporal PlainDate objects
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-01-10")
 *
 * const isBeforeDate1 = isBeforeDate(date1)
 * isBeforeDate1(date2)     // true
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * const isBeforeJsDate = isBeforeDate(jsDate)
 *
 * isBeforeJsDate("2024-01-10")  // true
 * isBeforeJsDate(new Date("2024-01-20"))  // false
 *
 * // Date-like objects
 * const isBeforeCustom = isBeforeDate({ year: 2024, month: 1, day: 15 })
 * isBeforeCustom({ year: 2024, month: 1, day: 10 })  // true
 * isBeforeCustom({ year: 2024, month: 1, day: 20 })  // false
 *
 * // Validation with today's date
 * const today = Temporal.Now.plainDateISO()
 * const isPastDate = isBeforeDate(today)
 *
 * const tomorrow = today.add({ days: 1 })
 * const yesterday = today.subtract({ days: 1 })
 *
 * isPastDate(yesterday)   // true
 * isPastDate(tomorrow)    // false
 * isPastDate(today)       // false
 *
 * // Filtering dates with mixed formats
 * const dates = [
 *   "2024-01-10",
 *   new Date("2024-01-15"),
 *   Temporal.PlainDate.from("2024-01-20"),
 *   { year: 2024, month: 1, day: 5 }
 * ]
 *
 * const pastDates = dates.filter(isBeforeDate("2024-01-15"))
 * // Filters to dates before Jan 15 (Jan 10 and Jan 5)
 *
 * // Birth date validation
 * const validateBirthDate = (
 *   birthDate: string | Date,
 *   maxDate: string | Date = Temporal.Now.plainDateISO().toString()
 * ): string | null => {
 *   if (!isBeforeDate(maxDate)(birthDate)) {
 *     return `Birth date must be before ${maxDate}`
 *   }
 *
 *   const minDate = Temporal.PlainDate.from("1900-01-01")
 *   if (isBeforeDate(minDate)(birthDate)) {
 *     return "Birth date seems too far in the past"
 *   }
 *
 *   return null
 * }
 *
 * validateBirthDate("1990-06-15")  // null (valid)
 * validateBirthDate("2030-01-01")  // "Birth date must be before..."
 * validateBirthDate("1850-01-01")  // "Birth date seems too far in the past"
 *
 * // Invalid inputs return false
 * const checker = isBeforeDate("2024-01-15")
 *
 * checker(null)              // false
 * checker(undefined)         // false
 * checker("")                // false (empty string)
 * checker("invalid-date")    // false (invalid format)
 * checker("2024-13-01")      // false (invalid month)
 * checker("2024-02-30")      // false (invalid day)
 * checker(123)               // false (not a date type)
 * checker({})                // false (missing date properties)
 * checker([2024, 1, 10])     // false (array not supported)
 *
 * // Expiration date checking
 * const isExpired = (
 *   expirationDate: string | Date
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isBeforeDate(today)(expirationDate)
 * }
 *
 * isExpired("2023-12-31")  // true (if today is after 2023-12-31)
 * isExpired("2025-12-31")  // false (if today is before 2025-12-31)
 *
 * // Date range validation
 * const isBeforeDateRange = (
 *   date: string | Date,
 *   rangeStart: string | Date,
 *   rangeEnd: string | Date
 * ): boolean => {
 *   return isBeforeDate(rangeStart)(date)
 * }
 *
 * isBeforeDateRange("2023-12-31", "2024-01-01", "2024-12-31")  // true
 * isBeforeDateRange("2024-06-15", "2024-01-01", "2024-12-31")  // false
 *
 * // Historical data validation
 * const validateHistoricalDate = (
 *   date: string,
 *   maxYearsAgo: number = 100
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const minDate = today.subtract({ years: maxYearsAgo })
 *
 *   return !isBeforeDate(minDate)(date) && isBeforeDate(today)(date)
 * }
 *
 * validateHistoricalDate("1950-01-01", 100)  // true
 * validateHistoricalDate("1850-01-01", 100)  // false (too old)
 * validateHistoricalDate("2030-01-01", 100)  // false (future)
 *
 * // Sorting helper
 * const sortByDateAscending = <T extends { date: DateInput }>(
 *   items: Array<T>
 * ): Array<T> => {
 *   return [...items].sort((a, b) => {
 *     if (isBeforeDate(b.date)(a.date)) return -1
 *     if (isBeforeDate(a.date)(b.date)) return 1
 *     return 0
 *   })
 * }
 *
 * const events = [
 *   { id: 1, date: "2024-03-15" },
 *   { id: 2, date: "2024-01-10" },
 *   { id: 3, date: "2024-02-20" }
 * ]
 *
 * sortByDateAscending(events)
 * // [{ id: 2, date: "2024-01-10" }, { id: 3, date: "2024-02-20" }, { id: 1, date: "2024-03-15" }]
 *
 * // Calendar-aware comparisons
 * const islamicDate = Temporal.PlainDate.from({
 *   year: 1445,
 *   month: 7,
 *   day: 15,
 *   calendar: "islamic"
 * })
 *
 * const gregorianDate = Temporal.PlainDate.from("2024-01-20")
 * const isBeforeGregorian = isBeforeDate(gregorianDate)
 *
 * // Works across calendar systems
 * isBeforeGregorian(islamicDate)  // Compares correctly across calendars
 *
 * // Finding earliest date
 * const findEarliestDate = (dates: Array<DateInput>): DateInput | null => {
 *   if (dates.length === 0) return null
 *
 *   return dates.reduce((earliest, date) => {
 *     return isBeforeDate(earliest)(date) ? date : earliest
 *   })
 * }
 *
 * findEarliestDate(["2024-03-15", "2024-01-10", "2024-02-20"])  // "2024-01-10"
 * findEarliestDate([])  // null
 *
 * // Booking system validation
 * const validateBookingDate = (
 *   bookingDate: string,
 *   minAdvanceDays: number = 1,
 *   maxAdvanceDays: number = 365
 * ): string | null => {
 *   const today = Temporal.Now.plainDateISO()
 *   const minDate = today.add({ days: minAdvanceDays })
 *   const maxDate = today.add({ days: maxAdvanceDays })
 *
 *   if (isBeforeDate(minDate)(bookingDate)) {
 *     return `Booking must be at least ${minAdvanceDays} days in advance`
 *   }
 *
 *   if (!isBeforeDate(maxDate)(bookingDate)) {
 *     return `Booking cannot be more than ${maxAdvanceDays} days in advance`
 *   }
 *
 *   return null
 * }
 *
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * const nextWeek = Temporal.Now.plainDateISO().add({ days: 7 })
 * const nextYear = Temporal.Now.plainDateISO().add({ days: 400 })
 *
 * validateBookingDate(tomorrow.toString())  // "Booking must be at least 1 days in advance"
 * validateBookingDate(nextWeek.toString())  // null (valid)
 * validateBookingDate(nextYear.toString())  // "Booking cannot be more than 365 days in advance"
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Exclusive - Returns false for equal dates
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isBeforeDate = (
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
		return Temporal.PlainDate.compare(compareDate, refDate) < 0
	} catch {
		return false
	}
}

export default isBeforeDate
