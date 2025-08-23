import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

/**
 * Checks if a date is between two other dates (inclusive)
 * 
 * Curried function that validates whether a date falls within a date range,
 * including the boundary dates. Accepts various date formats and converts them
 * to Temporal.PlainDate for comparison. Returns true if the date is greater than
 * or equal to the start date AND less than or equal to the end date. Returns
 * false for invalid inputs, conversion failures, or dates outside the range.
 * 
 * Date range rules:
 * - Inclusive boundaries: date can equal start or end date
 * - Start date must be before or equal to end date
 * - Invalid range (start > end) always returns false
 * - Calendar-aware comparison (respects calendar systems)
 * - Invalid inputs return false (safe for chaining)
 * 
 * @param startDate - The start of the date range (inclusive)
 * @param endDate - The end of the date range (inclusive)
 * @returns A predicate function that checks if a date is within the range
 * @example
 * ```typescript
 * // Using ISO date strings
 * const isInJanuary = isBetweenDates("2024-01-01", "2024-01-31")
 * 
 * isInJanuary("2024-01-15")     // true (middle of range)
 * isInJanuary("2024-01-01")     // true (start boundary)
 * isInJanuary("2024-01-31")     // true (end boundary)
 * isInJanuary("2023-12-31")     // false (before range)
 * isInJanuary("2024-02-01")     // false (after range)
 * 
 * // Using Temporal PlainDate objects
 * const startDate = Temporal.PlainDate.from("2024-01-01")
 * const endDate = Temporal.PlainDate.from("2024-12-31")
 * 
 * const isIn2024 = isBetweenDates(startDate, endDate)
 * 
 * isIn2024("2024-06-15")         // true (mid-year)
 * isIn2024("2024-01-01")         // true (first day)
 * isIn2024("2024-12-31")         // true (last day)
 * isIn2024("2023-12-31")         // false (previous year)
 * isIn2024("2025-01-01")         // false (next year)
 * 
 * // Mixed input types
 * const jsStartDate = new Date("2024-03-01")
 * const jsEndDate = new Date("2024-03-31")
 * 
 * const isInMarch = isBetweenDates(jsStartDate, jsEndDate)
 * 
 * isInMarch(new Date("2024-03-15"))  // true
 * isInMarch("2024-03-01")            // true
 * isInMarch("2024-04-01")            // false
 * 
 * // Date-like objects
 * const isInQ1 = isBetweenDates(
 *   { year: 2024, month: 1, day: 1 },
 *   { year: 2024, month: 3, day: 31 }
 * )
 * 
 * isInQ1({ year: 2024, month: 2, day: 15 })  // true (February)
 * isInQ1({ year: 2024, month: 4, day: 1 })   // false (April)
 * 
 * // Validation with current date
 * const today = Temporal.Now.plainDateISO()
 * const thirtyDaysAgo = today.subtract({ days: 30 })
 * const thirtyDaysFromNow = today.add({ days: 30 })
 * 
 * const isWithin30Days = isBetweenDates(thirtyDaysAgo, thirtyDaysFromNow)
 * 
 * isWithin30Days(today)                      // true
 * isWithin30Days(today.subtract({ days: 15 }))  // true
 * isWithin30Days(today.add({ days: 31 }))       // false
 * 
 * // Invalid range (start > end) returns false
 * const invalidRange = isBetweenDates("2024-12-31", "2024-01-01")
 * 
 * invalidRange("2024-06-15")    // false (range is invalid)
 * invalidRange("2024-01-01")    // false
 * invalidRange("2024-12-31")    // false
 * 
 * // Age validation
 * const validateAge = (
 *   birthDate: DateInput,
 *   minAge: number = 18,
 *   maxAge: number = 100
 * ): boolean => {
 *   const today = Temporal.Now.plainDateISO()
 *   const maxBirthDate = today.subtract({ years: minAge })
 *   const minBirthDate = today.subtract({ years: maxAge })
 *   
 *   return isBetweenDates(minBirthDate, maxBirthDate)(birthDate)
 * }
 * 
 * // Born in 1990 (assuming current year is 2024)
 * validateAge("1990-06-15")     // true (34 years old)
 * validateAge("2010-01-01")     // false (14 years old, too young)
 * validateAge("1920-01-01")     // false (104 years old, too old)
 * 
 * // Fiscal year validation
 * const isInFiscalYear = (
 *   date: DateInput,
 *   fiscalYearStart: string = "04-01"  // April 1st
 * ): boolean => {
 *   const d = toPlainDate(date)
 *   if (!d) return false
 *   
 *   const year = d.year
 *   const [month, day] = fiscalYearStart.split("-").map(Number)
 *   
 *   const fyStart = Temporal.PlainDate.from({ year, month, day })
 *   const fyEnd = fyStart.add({ years: 1 }).subtract({ days: 1 })
 *   
 *   // Adjust if date is before fiscal year start
 *   const adjustedStart = d.month < month || (d.month === month && d.day < day)
 *     ? fyStart.subtract({ years: 1 })
 *     : fyStart
 *   
 *   const adjustedEnd = adjustedStart.add({ years: 1 }).subtract({ days: 1 })
 *   
 *   return isBetweenDates(adjustedStart, adjustedEnd)(date)
 * }
 * 
 * isInFiscalYear("2024-06-15")   // true (FY 2024-2025)
 * isInFiscalYear("2024-03-31")   // true (FY 2023-2024)
 * 
 * // Seasonal date checking
 * const isInSeason = (
 *   date: DateInput,
 *   season: "spring" | "summer" | "fall" | "winter"
 * ): boolean => {
 *   const d = toPlainDate(date)
 *   if (!d) return false
 *   
 *   const year = d.year
 *   const seasons = {
 *     spring: { start: { month: 3, day: 20 }, end: { month: 6, day: 20 } },
 *     summer: { start: { month: 6, day: 21 }, end: { month: 9, day: 22 } },
 *     fall: { start: { month: 9, day: 23 }, end: { month: 12, day: 20 } },
 *     winter: { start: { month: 12, day: 21 }, end: { month: 3, day: 19 } }
 *   }
 *   
 *   const { start, end } = seasons[season]
 *   const startDate = Temporal.PlainDate.from({ year, ...start })
 *   
 *   // Handle winter crossing year boundary
 *   const endDate = season === "winter" && d.month <= 3
 *     ? Temporal.PlainDate.from({ year, ...end })
 *     : season === "winter"
 *     ? Temporal.PlainDate.from({ year: year + 1, ...end })
 *     : Temporal.PlainDate.from({ year, ...end })
 *   
 *   return isBetweenDates(startDate, endDate)(date)
 * }
 * 
 * isInSeason("2024-07-15", "summer")  // true
 * isInSeason("2024-01-15", "winter")  // true
 * isInSeason("2024-04-15", "spring")  // true
 * isInSeason("2024-10-15", "fall")    // true
 * 
 * // Business quarter validation
 * const getQuarter = (date: DateInput): number | null => {
 *   const quarters = [
 *     { q: 1, start: "01-01", end: "03-31" },
 *     { q: 2, start: "04-01", end: "06-30" },
 *     { q: 3, start: "07-01", end: "09-30" },
 *     { q: 4, start: "10-01", end: "12-31" }
 *   ]
 *   
 *   const d = toPlainDate(date)
 *   if (!d) return null
 *   
 *   for (const { q, start, end } of quarters) {
 *     const [startMonth, startDay] = start.split("-").map(Number)
 *     const [endMonth, endDay] = end.split("-").map(Number)
 *     
 *     const qStart = Temporal.PlainDate.from({ 
 *       year: d.year, month: startMonth, day: startDay 
 *     })
 *     const qEnd = Temporal.PlainDate.from({ 
 *       year: d.year, month: endMonth, day: endDay 
 *     })
 *     
 *     if (isBetweenDates(qStart, qEnd)(date)) {
 *       return q
 *     }
 *   }
 *   
 *   return null
 * }
 * 
 * getQuarter("2024-02-15")  // 1
 * getQuarter("2024-05-20")  // 2
 * getQuarter("2024-08-10")  // 3
 * getQuarter("2024-11-30")  // 4
 * 
 * // Date range overlap detection
 * const hasOverlap = (
 *   range1Start: DateInput,
 *   range1End: DateInput,
 *   range2Start: DateInput,
 *   range2End: DateInput
 * ): boolean => {
 *   const isInRange1 = isBetweenDates(range1Start, range1End)
 *   const isInRange2 = isBetweenDates(range2Start, range2End)
 *   
 *   return isInRange1(range2Start) || isInRange1(range2End) ||
 *          isInRange2(range1Start) || isInRange2(range1End)
 * }
 * 
 * hasOverlap(
 *   "2024-01-01", "2024-01-31",
 *   "2024-01-15", "2024-02-15"
 * )  // true (overlaps in January)
 * 
 * hasOverlap(
 *   "2024-01-01", "2024-01-31",
 *   "2024-02-01", "2024-02-28"
 * )  // false (adjacent but no overlap)
 * 
 * // Booking availability check
 * const isDateAvailable = (
 *   date: DateInput,
 *   blackoutPeriods: Array<{ start: DateInput, end: DateInput }>
 * ): boolean => {
 *   return !blackoutPeriods.some(period => 
 *     isBetweenDates(period.start, period.end)(date)
 *   )
 * }
 * 
 * const blackouts = [
 *   { start: "2024-12-24", end: "2024-12-26" },  // Christmas
 *   { start: "2024-12-31", end: "2025-01-01" }   // New Year
 * ]
 * 
 * isDateAvailable("2024-12-20", blackouts)  // true
 * isDateAvailable("2024-12-25", blackouts)  // false (Christmas)
 * isDateAvailable("2025-01-01", blackouts)  // false (New Year)
 * 
 * // Historical period validation
 * const isInHistoricalPeriod = (
 *   date: DateInput,
 *   period: "ancient" | "medieval" | "renaissance" | "modern"
 * ): boolean => {
 *   const periods = {
 *     ancient: { start: "-3000-01-01", end: "0476-09-04" },
 *     medieval: { start: "0476-09-05", end: "1453-05-29" },
 *     renaissance: { start: "1453-05-30", end: "1600-12-31" },
 *     modern: { start: "1601-01-01", end: "2024-12-31" }
 *   }
 *   
 *   const { start, end } = periods[period]
 *   return isBetweenDates(start, end)(date)
 * }
 * 
 * isInHistoricalPeriod("1485-08-22", "medieval")     // true
 * isInHistoricalPeriod("1492-10-12", "renaissance")  // true
 * isInHistoricalPeriod("1776-07-04", "modern")       // true
 * 
 * // Invalid inputs
 * const checker = isBetweenDates("2024-01-01", "2024-12-31")
 * 
 * checker(null)              // false
 * checker(undefined)         // false
 * checker("")                // false
 * checker("invalid-date")    // false
 * checker("2024-13-01")      // false (invalid month)
 * checker("2024-02-30")      // false (invalid day)
 * 
 * // Calendar-aware comparisons
 * const islamicDate = Temporal.PlainDate.from({
 *   year: 1445,
 *   month: 7,
 *   day: 15,
 *   calendar: "islamic"
 * })
 * 
 * const gregorianStart = Temporal.PlainDate.from("2024-01-01")
 * const gregorianEnd = Temporal.PlainDate.from("2024-12-31")
 * 
 * const isInGregorianYear = isBetweenDates(gregorianStart, gregorianEnd)
 * 
 * // Works across calendar systems
 * isInGregorianYear(islamicDate)  // Compares correctly across calendars
 * 
 * // Pay period validation
 * const isInPayPeriod = (
 *   date: DateInput,
 *   payPeriodStart: DateInput,
 *   periodLengthDays: number = 14
 * ): boolean => {
 *   const start = toPlainDate(payPeriodStart)
 *   if (!start) return false
 *   
 *   const end = start.add({ days: periodLengthDays - 1 })
 *   return isBetweenDates(start, end)(date)
 * }
 * 
 * isInPayPeriod("2024-01-10", "2024-01-01", 14)  // true
 * isInPayPeriod("2024-01-15", "2024-01-01", 14)  // false
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Inclusive - Both start and end dates are included in the range
 * @property Calendar-aware - Respects different calendar systems
 * @property Flexible - Accepts strings, Dates, Temporal types, and date-like objects
 * @property Safe - Returns false for invalid inputs instead of throwing
 */
const isBetweenDates = (
	startDate: DateInput | null | undefined,
	endDate: DateInput | null | undefined
) => (
	date: DateInput | null | undefined
): boolean => {
	const start = toPlainDate(startDate)
	const end = toPlainDate(endDate)
	const checkDate = toPlainDate(date)
	
	if (!start || !end || !checkDate) {
		return false
	}
	
	try {
		// Check if range is valid (start <= end)
		if (Temporal.PlainDate.compare(start, end) > 0) {
			return false
		}
		
		// Check if date is >= start AND <= end
		return Temporal.PlainDate.compare(checkDate, start) >= 0 &&
		       Temporal.PlainDate.compare(checkDate, end) <= 0
	} catch {
		return false
	}
}

export default isBetweenDates