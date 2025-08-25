import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is after another date
 *
 * Curried function that validates whether one date comes chronologically
 * after another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns false for equal dates, invalid inputs, or conversion failures.
 *
 * Date comparison rules:
 * - Strictly after: date must be chronologically later
 * - Equal dates return false (use isSameOrAfterDate for inclusive)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is after the reference
 * @example
 * ```typescript
 * // Using ISO date strings
 * const isAfterJan15 = isAfterDate("2024-01-15")
 *
 * isAfterJan15("2024-01-20")     // true (Jan 20 is after Jan 15)
 * isAfterJan15("2024-01-10")     // false (Jan 10 is before Jan 15)
 * isAfterJan15("2024-01-15")     // false (same date)
 *
 * // Using Temporal PlainDate objects
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-01-20")
 *
 * const isAfterDate1 = isAfterDate(date1)
 * isAfterDate1(date2)     // true
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * const isAfterJsDate = isAfterDate(jsDate)
 *
 * isAfterJsDate("2024-01-20")  // true
 * isAfterJsDate(new Date("2024-01-10"))  // false
 *
 * // Date-like objects
 * const isAfterCustom = isAfterDate({ year: 2024, month: 1, day: 15 })
 * isAfterCustom({ year: 2024, month: 1, day: 20 })  // true
 * isAfterCustom({ year: 2024, month: 1, day: 10 })  // false
 *
 * // Validation with today's date
 * const today = Temporal.Now.plainDateISO()
 * const isFutureDate = isAfterDate(today)
 *
 * const tomorrow = today.add({ days: 1 })
 * const yesterday = today.subtract({ days: 1 })
 *
 * isFutureDate(tomorrow)   // true
 * isFutureDate(yesterday)  // false
 * isFutureDate(today)      // false
 *
 * // Filtering dates with mixed formats
 * const dates = [
 *   "2024-01-10",
 *   new Date("2024-01-15"),
 *   Temporal.PlainDate.from("2024-01-20"),
 *   { year: 2024, month: 1, day: 25 }
 * ]
 *
 * const futureDates = dates.filter(isAfterDate("2024-01-15"))
 * // Filters to dates after Jan 15 (Jan 20 and Jan 25)
 *
 * // Event scheduling validation with flexible inputs
 * const validateEventDate = (
 *   eventDate: string | Date,
 *   minDate: string | Date
 * ): string | null => {
 *   if (!isAfterDate(minDate)(eventDate)) {
 *     return `Event must be after ${minDate}`
 *   }
 *   return null
 * }
 *
 * const minBookingDate = Temporal.Now.plainDateISO()
 * const eventDate = minBookingDate.add({ days: 7 })
 *
 * validateEventDate("2024-06-15", "2024-01-01")  // null (valid)
 * validateEventDate("2024-01-01", "2024-06-15")  // "Event must be after..."
 *
 * // Invalid inputs return false
 * const checker = isAfterDate("2024-01-15")
 *
 * checker(null)              // false
 * checker(undefined)         // false
 * checker("")                // false (empty string)
 * checker("invalid-date")    // false (invalid format)
 * checker("2024-13-01")      // false (invalid month)
 * checker("2024-02-30")      // false (invalid day)
 * checker(123)               // false (not a date type)
 * checker({})                // false (missing date properties)
 * checker([2024, 1, 20])     // false (array not supported)
 *
 * // Deadline checking
 * const checkDeadlinePassed = (
 *   deadline: Temporal.PlainDate
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isAfterDate(deadline)(today)
 * }
 *
 * const projectDeadline = Temporal.PlainDate.from("2024-12-31")
 * checkDeadlinePassed(projectDeadline)  // true/false depending on current date
 *
 * // Date range validation
 * const isInFutureDateRange = (
 *   date: Temporal.PlainDate,
 *   rangeStart: Temporal.PlainDate,
 *   rangeEnd: Temporal.PlainDate
 * ): boolean => {
 *   return isAfterDate(rangeStart)(date) &&
 *          !isAfterDate(rangeEnd)(date)
 * }
 *
 * const start = Temporal.PlainDate.from("2024-01-01")
 * const end = Temporal.PlainDate.from("2024-12-31")
 * const testDate = Temporal.PlainDate.from("2024-06-15")
 *
 * isInFutureDateRange(testDate, start, end)  // true
 *
 * // Subscription renewal dates
 * const getNextRenewalDates = (
 *   renewalDates: Array<Temporal.PlainDate>,
 *   afterDate: Temporal.PlainDate
 * ): Array<Temporal.PlainDate> => {
 *   return renewalDates
 *     .filter(isAfterDate(afterDate))
 *     .sort((a, b) => Temporal.PlainDate.compare(a, b))
 * }
 *
 * const renewals = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-02-15"),
 *   Temporal.PlainDate.from("2024-03-15")
 * ]
 *
 * const currentDate = Temporal.PlainDate.from("2024-01-20")
 * getNextRenewalDates(renewals, currentDate)
 * // [PlainDate("2024-02-15"), PlainDate("2024-03-15")]
 *
 * // Age verification
 * const isOldEnough = (
 *   birthDate: Temporal.PlainDate,
 *   minAge: number
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const minBirthDate = today.subtract({ years: minAge })
 *   return !isAfterDate(minBirthDate)(birthDate)
 * }
 *
 * const dob = Temporal.PlainDate.from("2005-06-15")
 * isOldEnough(dob, 18)  // true/false depending on current date
 *
 * // Historical data filtering
 * const getRecentRecords = <T extends { date: Temporal.PlainDate }>(
 *   records: Array<T>,
 *   sinceDate: Temporal.PlainDate
 * ): Array<T> => {
 *   return records.filter(record =>
 *     isAfterDate(sinceDate)(record.date)
 *   )
 * }
 *
 * const transactions = [
 *   { id: 1, date: Temporal.PlainDate.from("2024-01-10"), amount: 100 },
 *   { id: 2, date: Temporal.PlainDate.from("2024-01-20"), amount: 200 },
 *   { id: 3, date: Temporal.PlainDate.from("2024-01-30"), amount: 300 }
 * ]
 *
 * const since = Temporal.PlainDate.from("2024-01-15")
 * getRecentRecords(transactions, since)
 * // [{ id: 2, ... }, { id: 3, ... }]
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
 * const isAfterGregorian = isAfterDate(gregorianDate)
 *
 * // Works across calendar systems
 * isAfterGregorian(islamicDate)  // Compares correctly across calendars
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Exclusive - Returns false for equal dates
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isAfterDate = (
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
		return Temporal.PlainDate.compare(compareDate, refDate) > 0
	} catch {
		return false
	}
}

export default isAfterDate
