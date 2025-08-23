import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is the same as or before another date
 * 
 * Validates whether one date is chronologically the same as or before
 * another date. Accepts various date formats and converts them to
 * Temporal.PlainDate for comparison. Uses Temporal's built-in comparison
 * to ensure accurate date comparisons across different calendars.
 * Returns true for equal dates, dates before the reference, and false
 * for dates after or invalid inputs.
 * 
 * Date comparison rules:
 * - Same or before: date must be equal to or chronologically earlier
 * - Equal dates return true (inclusive comparison)
 * - Calendar-aware comparison (respects calendar systems)
 * - Year, month, and day are all considered
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param reference - The reference date (string, Date, Temporal types, or date-like object)
 * @returns A predicate function that checks if a date is same or before the reference
 * @example
 * ```typescript
 * // Using ISO date strings
 * const isSameOrBeforeJan15 = isSameOrBeforeDate("2024-01-15")
 * 
 * isSameOrBeforeJan15("2024-01-10")     // true (Jan 10 is before Jan 15)
 * isSameOrBeforeJan15("2024-01-15")     // true (same date)
 * isSameOrBeforeJan15("2024-01-20")     // false (Jan 20 is after Jan 15)
 * 
 * // Using Temporal PlainDate objects
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = Temporal.PlainDate.from("2024-01-10")
 * 
 * const isSameOrBeforeDate1 = isSameOrBeforeDate(date1)
 * isSameOrBeforeDate1(date2)     // true
 * isSameOrBeforeDate1(date1)     // true (same date)
 * 
 * // Mixed input types
 * const jsDate = new Date("2024-01-15")
 * const isSameOrBeforeJsDate = isSameOrBeforeDate(jsDate)
 * 
 * isSameOrBeforeJsDate("2024-01-10")  // true
 * isSameOrBeforeJsDate("2024-01-15")  // true
 * isSameOrBeforeJsDate(new Date("2024-01-20"))  // false
 * 
 * // Date-like objects
 * const isSameOrBeforeCustom = isSameOrBeforeDate({ year: 2024, month: 1, day: 15 })
 * isSameOrBeforeCustom({ year: 2024, month: 1, day: 10 })  // true
 * isSameOrBeforeCustom({ year: 2024, month: 1, day: 15 })  // true
 * isSameOrBeforeCustom({ year: 2024, month: 1, day: 20 })  // false
 * 
 * // Validation with maximum date
 * const maxDate = Temporal.PlainDate.from("2024-12-31")
 * const isValidEndDate = isSameOrBeforeDate(maxDate)
 * 
 * isValidEndDate("2024-12-31")   // true (same as maximum)
 * isValidEndDate("2024-06-15")   // true (before maximum)
 * isValidEndDate("2025-01-01")   // false (after maximum)
 * 
 * // Age verification (must be at least X years old)
 * const verifyMinimumAge = (
 *   birthDate: string,
 *   minimumAge: number
 * ): boolean => {
 *   const maxBirthDate = Temporal.Now.plainDateISO().subtract({ years: minimumAge })
 *   return isSameOrBeforeDate(maxBirthDate)(birthDate)
 * }
 * 
 * verifyMinimumAge("2005-01-15", 18)  // true if born on/before cutoff
 * verifyMinimumAge("2010-01-15", 18)  // false if too young
 * 
 * // Filter historical dates
 * const dates = [
 *   "2024-01-10",
 *   "2024-01-15",
 *   "2024-01-20",
 *   "2024-01-25",
 *   "2024-01-30"
 * ]
 * 
 * const cutoffDate = "2024-01-20"
 * const historicalDates = dates.filter(isSameOrBeforeDate(cutoffDate))
 * // ["2024-01-10", "2024-01-15", "2024-01-20"]
 * 
 * // Contract expiration check
 * const isContractExpired = (
 *   expirationDate: Temporal.PlainDate
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isSameOrBeforeDate(today)(expirationDate)
 * }
 * 
 * const expDate = Temporal.PlainDate.from("2024-12-31")
 * isContractExpired(expDate)  // false if today is before Dec 31, 2024
 * 
 * // Project milestone validation
 * const validateMilestoneDate = (
 *   milestoneDate: string,
 *   projectDeadline: string
 * ): string | null => {
 *   if (!isSameOrBeforeDate(projectDeadline)(milestoneDate)) {
 *     return "Milestone must be on or before project deadline"
 *   }
 *   return null
 * }
 * 
 * validateMilestoneDate("2024-06-15", "2024-12-31")  // null (valid)
 * validateMilestoneDate("2024-12-31", "2024-12-31")  // null (on deadline)
 * validateMilestoneDate("2025-01-15", "2024-12-31")  // "Milestone must be..."
 * 
 * // Past events filter
 * const getPastEvents = (
 *   events: Array<{ date: string; name: string }>,
 *   currentDate: string
 * ): Array<typeof events[0]> => {
 *   return events
 *     .filter(e => isSameOrBeforeDate(currentDate)(e.date))
 *     .sort((a, b) => {
 *       const dateA = toPlainDate(a.date)
 *       const dateB = toPlainDate(b.date)
 *       if (!dateA || !dateB) return 0
 *       return Temporal.PlainDate.compare(dateB, dateA) // Descending
 *     })
 * }
 * 
 * const events = [
 *   { date: "2024-01-01", name: "New Year" },
 *   { date: "2024-07-04", name: "Independence Day" },
 *   { date: "2024-12-25", name: "Christmas" }
 * ]
 * 
 * getPastEvents(events, "2024-07-04")
 * // Returns New Year and Independence Day
 * 
 * // Booking availability (no future bookings beyond limit)
 * const canBookDate = (
 *   requestedDate: string,
 *   maxAdvanceBooking: string
 * ): boolean => {
 *   return isSameOrBeforeDate(maxAdvanceBooking)(requestedDate)
 * }
 * 
 * canBookDate("2024-06-15", "2024-12-31")  // true
 * canBookDate("2025-01-15", "2024-12-31")  // false
 * 
 * // Historical data validation
 * const isHistoricalData = (dataDate: Temporal.PlainDate): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isSameOrBeforeDate(today)(dataDate)
 * }
 * 
 * const dataDate = Temporal.PlainDate.from("2024-01-15")
 * isHistoricalData(dataDate)  // true if today is on/after Jan 15, 2024
 * 
 * // Date range validation
 * const isInDateRange = (
 *   date: Temporal.PlainDate,
 *   rangeStart: Temporal.PlainDate,
 *   rangeEnd: Temporal.PlainDate
 * ): boolean => {
 *   return !isSameOrBeforeDate(rangeStart.subtract({ days: 1 }))(date) && 
 *          isSameOrBeforeDate(rangeEnd)(date)
 * }
 * 
 * const testDate = Temporal.PlainDate.from("2024-06-15")
 * const start = Temporal.PlainDate.from("2024-01-01")
 * const end = Temporal.PlainDate.from("2024-12-31")
 * 
 * isInDateRange(testDate, start, end)  // true
 * 
 * // Invalid inputs return false
 * const checker = isSameOrBeforeDate("2024-01-15")
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
 * // Discount eligibility (early bird)
 * const qualifiesForEarlyBird = (
 *   registrationDate: string,
 *   earlyBirdDeadline: string
 * ): boolean => {
 *   return isSameOrBeforeDate(earlyBirdDeadline)(registrationDate)
 * }
 * 
 * qualifiesForEarlyBird("2024-05-15", "2024-06-01")  // true
 * qualifiesForEarlyBird("2024-06-01", "2024-06-01")  // true (on deadline)
 * qualifiesForEarlyBird("2024-06-02", "2024-06-01")  // false
 * 
 * // Warranty validation
 * const isUnderWarranty = (
 *   purchaseDate: string,
 *   warrantyYears: number
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const warrantyEnd = toPlainDate(purchaseDate)?.add({ years: warrantyYears })
 *   
 *   if (!warrantyEnd) return false
 *   return !isSameOrBeforeDate(warrantyEnd.subtract({ days: 1 }))(today.toString())
 * }
 * 
 * isUnderWarranty("2022-01-15", 2)  // depends on current date
 * 
 * // Task due date checking
 * const isOverdue = (
 *   dueDate: Temporal.PlainDate
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   return isSameOrBeforeDate(dueDate.subtract({ days: 1 }))(today.toString())
 * }
 * 
 * const taskDue = Temporal.PlainDate.from("2024-01-15")
 * isOverdue(taskDue)  // true if today is after Jan 15, 2024
 * 
 * // Promotion period validation
 * const isPromotionActive = (
 *   currentDate: string,
 *   promoEndDate: string
 * ): boolean => {
 *   return isSameOrBeforeDate(promoEndDate)(currentDate)
 * }
 * 
 * isPromotionActive("2024-06-15", "2024-06-30")  // true
 * isPromotionActive("2024-06-30", "2024-06-30")  // true (last day)
 * isPromotionActive("2024-07-01", "2024-06-30")  // false
 * 
 * // Academic semester validation
 * const isWithinSemester = (
 *   date: string,
 *   semesterStart: string,
 *   semesterEnd: string
 * ): boolean => {
 *   const startDate = toPlainDate(semesterStart)
 *   if (!startDate) return false
 *   
 *   return !isSameOrBeforeDate(startDate.subtract({ days: 1 }))(date) &&
 *          isSameOrBeforeDate(semesterEnd)(date)
 * }
 * 
 * isWithinSemester("2024-02-15", "2024-01-15", "2024-05-15")  // true
 * isWithinSemester("2024-01-14", "2024-01-15", "2024-05-15")  // false
 * isWithinSemester("2024-05-16", "2024-01-15", "2024-05-15")  // false
 * 
 * // License expiration warning
 * const needsRenewal = (
 *   expirationDate: string,
 *   warningDays: number = 30
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const warningDate = toPlainDate(expirationDate)?.subtract({ days: warningDays })
 *   
 *   if (!warningDate) return false
 *   return !isSameOrBeforeDate(warningDate.subtract({ days: 1 }))(today.toString())
 * }
 * 
 * needsRenewal("2024-12-31", 30)  // true if within 30 days of expiration
 * 
 * // Fiscal year validation
 * const isInFiscalYear = (
 *   date: string,
 *   fiscalYearEnd: string
 * ): boolean => {
 *   const fyEnd = toPlainDate(fiscalYearEnd)
 *   if (!fyEnd) return false
 *   
 *   const fyStart = fyEnd.subtract({ years: 1 }).add({ days: 1 })
 *   return !isSameOrBeforeDate(fyStart.subtract({ days: 1 }))(date) &&
 *          isSameOrBeforeDate(fiscalYearEnd)(date)
 * }
 * 
 * isInFiscalYear("2024-03-15", "2024-06-30")  // true
 * isInFiscalYear("2023-06-30", "2024-06-30")  // false
 * isInFiscalYear("2024-07-01", "2024-06-30")  // false
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Calendar-aware - Respects different calendar systems
 * @property Inclusive - Returns true for equal dates
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isSameOrBeforeDate = (
	reference: DateInput | null | undefined
) => (
	date: DateInput | null | undefined
): boolean => {
	const refDate = toPlainDate(reference)
	const compareDate = toPlainDate(date)
	
	if (!refDate || !compareDate) {
		return false
	}
	
	try {
		return Temporal.PlainDate.compare(compareDate, refDate) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeDate