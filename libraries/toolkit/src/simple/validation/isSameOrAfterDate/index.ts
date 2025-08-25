import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is the same as or after another date
 *
 * Validates whether one date is chronologically the same as or after
 * another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns true for equal dates, dates after the reference, and false
 * for dates before or invalid inputs.
 *
 * Date comparison rules:
 * - Same or after: date must be equal to or chronologically later
 * - Equal dates return true (inclusive comparison)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is same or after the reference
 * @example
 * ```typescript
 * // Using ISO date strings
 * const isSameOrAfterJan15 = isSameOrAfterDate("2024-01-15")
 *
 * isSameOrAfterJan15("2024-01-20")     // true (Jan 20 is after Jan 15)
 * isSameOrAfterJan15("2024-01-15")     // true (same date)
 * isSameOrAfterJan15("2024-01-10")     // false (Jan 10 is before Jan 15)
 *
 * // Using Temporal PlainDate objects
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-01-20")
 *
 * const isSameOrAfterDate1 = isSameOrAfterDate(date1)
 * isSameOrAfterDate1(date2)     // true
 * isSameOrAfterDate1(date1)     // true (same date)
 *
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * const isSameOrAfterJsDate = isSameOrAfterDate(jsDate)
 *
 * isSameOrAfterJsDate("2024-01-20")  // true
 * isSameOrAfterJsDate("2024-01-15")  // true
 * isSameOrAfterJsDate(new Date("2024-01-10"))  // false
 *
 * // Date-like objects
 * const isSameOrAfterCustom = isSameOrAfterDate({ year: 2024, month: 1, day: 15 })
 * isSameOrAfterCustom({ year: 2024, month: 1, day: 20 })  // true
 * isSameOrAfterCustom({ year: 2024, month: 1, day: 15 })  // true
 * isSameOrAfterCustom({ year: 2024, month: 1, day: 10 })  // false
 *
 * // Validation with minimum date
 * const minDate = Temporal.PlainDate.from("2024-01-01")
 * const isValidStartDate = isSameOrAfterDate(minDate)
 *
 * isValidStartDate("2024-01-01")   // true (same as minimum)
 * isValidStartDate("2024-06-15")   // true (after minimum)
 * isValidStartDate("2023-12-31")   // false (before minimum)
 *
 * // Contract date validation
 * const validateContractDates = (
 *   startDate: string,
 *   endDate: string
 * ): string | null => {
 *   if (!isSameOrAfterDate(startDate)(endDate)) {
 *     return "End date must be same as or after start date"
 *   }
 *   return null
 * }
 *
 * validateContractDates("2024-01-01", "2024-12-31")  // null (valid)
 * validateContractDates("2024-01-01", "2024-01-01")  // null (same day contract)
 * validateContractDates("2024-12-31", "2024-01-01")  // "End date must be..."
 *
 * // Filter dates on or after cutoff
 * const dates = [
 *   "2024-01-10",
 *   "2024-01-15",
 *   "2024-01-20",
 *   "2024-01-25",
 *   "2024-01-30"
 * ]
 *
 * const cutoffDate = "2024-01-15"
 * const validDates = dates.filter(isSameOrAfterDate(cutoffDate))
 * // ["2024-01-15", "2024-01-20", "2024-01-25", "2024-01-30"]
 *
 * // Age verification (must be born on or before date)
 * const isOldEnough = (
 *   birthDate: Temporal.PlainDate,
 *   minimumAge: number
 * ): boolean => {
 *   const cutoffDate = Temporal.Now.plainDateISO().subtract({ years: minimumAge })
 *   // Person is old enough if birth date is NOT same-or-after cutoff
 *   // (i.e., they were born before or on the cutoff)
 *   return !isSameOrAfterDate(cutoffDate.add({ days: 1 }))(birthDate)
 * }
 *
 * const dob = Temporal.PlainDate.from("2005-01-15")
 * isOldEnough(dob, 18)  // true/false depending on current date
 *
 * // Project milestone tracking
 * const getMilestonesFromDate = (
 *   milestones: Array<{ date: string; name: string }>,
 *   fromDate: string
 * ): Array<typeof milestones[0]> => {
 *   return milestones
 *     .filter(m => isSameOrAfterDate(fromDate)(m.date))
 *     .sort((a, b) => {
 *       const dateA = toPlainDate(a.date)
 *       const dateB = toPlainDate(b.date)
 *       if (!dateA || !dateB) return 0
 *       return Temporal.PlainDate.compare(dateA, dateB)
 *     })
 * }
 *
 * const milestones = [
 *   { date: "2024-01-01", name: "Project Start" },
 *   { date: "2024-03-15", name: "Phase 1 Complete" },
 *   { date: "2024-06-30", name: "Phase 2 Complete" },
 *   { date: "2024-12-31", name: "Project End" }
 * ]
 *
 * getMilestonesFromDate(milestones, "2024-03-15")
 * // Returns Phase 1 Complete and all subsequent milestones
 *
 * // Subscription eligibility
 * const canRenewSubscription = (
 *   currentEndDate: Temporal.PlainDate
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const renewalWindow = currentEndDate.subtract({ days: 30 })
 *
 *   // Can renew if today is within 30 days of expiry (inclusive)
 *   return isSameOrAfterDate(renewalWindow)(today)
 * }
 *
 * const subscriptionEnd = Temporal.PlainDate.from("2024-12-31")
 * canRenewSubscription(subscriptionEnd)  // true if within renewal window
 *
 * // Date range validation
 * const isInDateRange = (
 *   date: Temporal.PlainDate,
 *   rangeStart: Temporal.PlainDate,
 *   rangeEnd: Temporal.PlainDate
 * ): boolean => {
 *   return isSameOrAfterDate(rangeStart)(date) &&
 *          !isSameOrAfterDate(rangeEnd.add({ days: 1 }))(date)
 * }
 *
 * const testDate = Temporal.PlainDate.from("2024-06-15")
 * const start = Temporal.PlainDate.from("2024-01-01")
 * const end = Temporal.PlainDate.from("2024-12-31")
 *
 * isInDateRange(testDate, start, end)  // true
 *
 * // Invalid inputs return false
 * const checker = isSameOrAfterDate("2024-01-15")
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
 * // Booking availability
 * const isDateAvailable = (
 *   requestedDate: string,
 *   earliestAvailable: string
 * ): boolean => {
 *   return isSameOrAfterDate(earliestAvailable)(requestedDate)
 * }
 *
 * isDateAvailable("2024-06-15", "2024-06-01")  // true
 * isDateAvailable("2024-05-15", "2024-06-01")  // false
 *
 * // Historical data cutoff
 * const getRecentData = <T extends { date: string }>(
 *   data: Array<T>,
 *   cutoffDate: string
 * ): Array<T> => {
 *   return data.filter(item =>
 *     isSameOrAfterDate(cutoffDate)(item.date)
 *   )
 * }
 *
 * const transactions = [
 *   { id: 1, date: "2024-01-10", amount: 100 },
 *   { id: 2, date: "2024-01-15", amount: 200 },
 *   { id: 3, date: "2024-01-20", amount: 300 }
 * ]
 *
 * getRecentData(transactions, "2024-01-15")
 * // [{ id: 2, ... }, { id: 3, ... }]
 *
 * // Policy effective date
 * const isPolicyActive = (
 *   policyEffectiveDate: Temporal.PlainDate
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isSameOrAfterDate(policyEffectiveDate)(today)
 * }
 *
 * const effectiveDate = Temporal.PlainDate.from("2024-01-01")
 * isPolicyActive(effectiveDate)  // true if today is on or after Jan 1, 2024
 *
 * // Employee tenure calculation
 * const hasMinimumTenure = (
 *   hireDate: string,
 *   requiredYears: number
 * ): boolean => {
 *   const requiredDate = Temporal.Now.plainDateISO().subtract({ years: requiredYears })
 *   return !isSameOrAfterDate(hireDate)(requiredDate.toString())
 * }
 *
 * hasMinimumTenure("2020-01-15", 3)  // true if hired 3+ years ago
 *
 * // Calendar event visibility
 * const getVisibleEvents = (
 *   events: Array<{ date: Temporal.PlainDate; title: string }>,
 *   viewStartDate: Temporal.PlainDate
 * ): Array<typeof events[0]> => {
 *   return events.filter(event =>
 *     isSameOrAfterDate(viewStartDate)(event.date)
 *   )
 * }
 *
 * // Deadline tracking
 * const isDeadlineMet = (
 *   completionDate: string,
 *   deadlineDate: string
 * ): boolean => {
 *   // Deadline is met if completion is NOT same-or-after deadline+1
 *   // (i.e., completed on or before deadline)
 *   const dayAfterDeadline = toPlainDate(deadlineDate)?.add({ days: 1 })
 *   if (!dayAfterDeadline) return false
 *
 *   return !isSameOrAfterDate(dayAfterDeadline.toString())(completionDate)
 * }
 *
 * isDeadlineMet("2024-01-15", "2024-01-15")  // true (on deadline)
 * isDeadlineMet("2024-01-14", "2024-01-15")  // true (before deadline)
 * isDeadlineMet("2024-01-16", "2024-01-15")  // false (after deadline)
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Inclusive - Returns true for equal dates
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isSameOrAfterDate = (
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
		return Temporal.PlainDate.compare(compareDate, refDate) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterDate
