/**
 * Checks if a year is a leap year
 *
 * Determines whether a given year or date represents a leap year. A leap year
 * occurs every 4 years, except for years divisible by 100 (which are not leap
 * years) unless they are also divisible by 400 (which are leap years). This
 * follows the Gregorian calendar rules. The function is curried and accepts
 * either a year number or a Temporal date object. Returns false for invalid
 * inputs to support safe error handling.
 *
 * @curried
 * @param yearOrDate - A year number or Temporal date object to check
 * @returns True if leap year, false otherwise (including invalid inputs)
 * @example
 * ```typescript
 * // Basic usage with year number
 * isLeapYear(2024)                        // true (divisible by 4)
 * isLeapYear(2023)                        // false (not divisible by 4)
 * isLeapYear(2000)                        // true (divisible by 400)
 * isLeapYear(1900)                        // false (divisible by 100 but not 400)
 * isLeapYear(2100)                        // false (divisible by 100 but not 400)
 *
 * // With Temporal.PlainDate
 * const leapDate = Temporal.PlainDate.from("2024-02-29")
 * isLeapYear(leapDate)                    // true
 *
 * const nonLeapDate = Temporal.PlainDate.from("2023-03-15")
 * isLeapYear(nonLeapDate)                 // false
 *
 * // With Temporal.PlainDateTime
 * const leapDateTime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * isLeapYear(leapDateTime)                // true
 *
 * // With Temporal.PlainYearMonth
 * const leapYearMonth = Temporal.PlainYearMonth.from("2024-02")
 * isLeapYear(leapYearMonth)               // true
 *
 * // With Temporal.ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-12-31T23:59:59-05:00[America/New_York]"
 * )
 * isLeapYear(zonedDateTime)               // true
 *
 * // Century years
 * isLeapYear(1600)                        // true (divisible by 400)
 * isLeapYear(1700)                        // false (divisible by 100 but not 400)
 * isLeapYear(1800)                        // false
 * isLeapYear(1900)                        // false
 * isLeapYear(2000)                        // true (divisible by 400)
 *
 * // Upcoming leap years
 * const upcomingYears = [2024, 2025, 2026, 2027, 2028]
 * upcomingYears.map(isLeapYear)           // [true, false, false, false, true]
 *
 * // Historical leap years
 * isLeapYear(1984)                        // true (Orwell's year)
 * isLeapYear(1969)                        // false (Moon landing)
 * isLeapYear(1776)                        // true (US Independence)
 * isLeapYear(1492)                        // true (Columbus)
 *
 * // February days calculator
 * function getDaysInFebruary(year: number): number {
 *   return isLeapYear(year) ? 29 : 28
 * }
 *
 * getDaysInFebruary(2024)                 // 29
 * getDaysInFebruary(2023)                 // 28
 * getDaysInFebruary(2000)                 // 29
 * getDaysInFebruary(1900)                 // 28
 *
 * // Leap day birthday handler
 * function getActualBirthday(
 *   birthYear: number,
 *   currentYear: number
 * ): Temporal.PlainDate {
 *   const birthDate = Temporal.PlainDate.from({
 *     year: birthYear,
 *     month: 2,
 *     day: 29
 *   })
 *
 *   if (isLeapYear(currentYear)) {
 *     return Temporal.PlainDate.from({
 *       year: currentYear,
 *       month: 2,
 *       day: 29
 *     })
 *   } else {
 *     // Celebrate on March 1 in non-leap years
 *     return Temporal.PlainDate.from({
 *       year: currentYear,
 *       month: 3,
 *       day: 1
 *     })
 *   }
 * }
 *
 * // Days in year calculator
 * function getDaysInYear(year: number): number {
 *   return isLeapYear(year) ? 366 : 365
 * }
 *
 * getDaysInYear(2024)                     // 366
 * getDaysInYear(2023)                     // 365
 *
 * // Null/invalid handling
 * isLeapYear(null)                        // false
 * isLeapYear(undefined)                   // false
 * isLeapYear("2024")                     // false (string, not number)
 * isLeapYear(NaN)                         // false
 * isLeapYear(Infinity)                    // false
 *
 * // Leap year frequency in range
 * function countLeapYears(startYear: number, endYear: number): number {
 *   let count = 0
 *   for (let year = startYear; year <= endYear; year++) {
 *     if (isLeapYear(year)) count++
 *   }
 *   return count
 * }
 *
 * countLeapYears(2000, 2100)              // 25 leap years in 101 years
 * countLeapYears(1900, 2000)              // 25 leap years (2000 is, 1900 isn't)
 *
 * // Next leap year finder
 * function getNextLeapYear(fromYear: number): number {
 *   let year = fromYear + 1
 *   while (!isLeapYear(year)) {
 *     year++
 *   }
 *   return year
 * }
 *
 * getNextLeapYear(2023)                   // 2024
 * getNextLeapYear(2024)                   // 2028
 * getNextLeapYear(2099)                   // 2104 (skips 2100)
 *
 * // Previous leap year finder
 * function getPreviousLeapYear(fromYear: number): number {
 *   let year = fromYear - 1
 *   while (!isLeapYear(year)) {
 *     year--
 *   }
 *   return year
 * }
 *
 * getPreviousLeapYear(2025)               // 2024
 * getPreviousLeapYear(2024)               // 2020
 * getPreviousLeapYear(1901)               // 1896 (skips 1900)
 *
 * // Leap year cycle analysis
 * function getLeapYearCycle(year: number): string {
 *   if (!isLeapYear(year)) return "Not a leap year"
 *
 *   if (year % 400 === 0) return "400-year cycle leap year"
 *   if (year % 100 === 0) return "Should not be leap (but check 400 rule)"
 *   if (year % 4 === 0) return "Regular 4-year cycle leap year"
 *
 *   return "Not a leap year"
 * }
 *
 * getLeapYearCycle(2024)                  // "Regular 4-year cycle leap year"
 * getLeapYearCycle(2000)                  // "400-year cycle leap year"
 * getLeapYearCycle(2100)                  // "Not a leap year"
 *
 * // Olympic Games correlation (Summer Olympics usually in leap years)
 * function isOlympicYear(year: number): boolean {
 *   // Modern Summer Olympics are typically in leap years
 *   // (with exceptions like 2021 for Tokyo due to COVID)
 *   if (year === 2021) return true  // Tokyo Olympics postponed
 *   return isLeapYear(year) && year >= 1896 && year !== 1916 && year !== 1940 && year !== 1944
 * }
 *
 * isOlympicYear(2024)                     // true (Paris)
 * isOlympicYear(2020)                     // true (Tokyo, held in 2021)
 * isOlympicYear(2023)                     // false
 *
 * // Payroll calculations (bi-weekly = 27 pay periods in leap years)
 * function getPayPeriods(year: number): number {
 *   // Most years have 26 bi-weekly pay periods
 *   // Leap years starting on Thursday or Friday have 27
 *   const jan1 = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   const dayOfWeek = jan1.dayOfWeek
 *
 *   if (isLeapYear(year) && (dayOfWeek === 4 || dayOfWeek === 5)) {
 *     return 27
 *   }
 *
 *   return 26
 * }
 *
 * // Annual interest calculations
 * function getAnnualInterestDays(year: number): number {
 *   // Many financial calculations use actual days in year
 *   return isLeapYear(year) ? 366 : 365
 * }
 *
 * function calculateDailyInterest(
 *   principal: number,
 *   annualRate: number,
 *   year: number
 * ): number {
 *   const daysInYear = getAnnualInterestDays(year)
 *   return (principal * annualRate) / daysInYear
 * }
 *
 * // Leap second years (not directly related but often confused)
 * function mightHaveLeapSecond(year: number): boolean {
 *   // Leap seconds are irregular, this is just illustrative
 *   // They don't correlate with leap years
 *   return year >= 1972  // First leap second was in 1972
 * }
 *
 * // Statistical analysis
 * function getLeapYearProbability(years: Array<number>): number {
 *   const leapCount = years.filter(isLeapYear).length
 *   return (leapCount / years.length) * 100
 * }
 *
 * const century21 = Array.from({ length: 100 }, (_, i) => 2001 + i)
 * getLeapYearProbability(century21)       // ~24% (24 leap years from 2001-2100)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns false for invalid inputs rather than throwing
 * @property Gregorian - Follows Gregorian calendar leap year rules
 * @property Versatile - Accepts both year numbers and Temporal date objects
 */
const isLeapYear = (
	yearOrDate:
		| number
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean => {
	if (yearOrDate == null) {
		return false
	}

	let year: number

	if (typeof yearOrDate === "number") {
		// Direct year number
		if (!Number.isFinite(yearOrDate) || !Number.isInteger(yearOrDate)) {
			return false
		}
		year = yearOrDate
	} else if (
		yearOrDate instanceof Temporal.PlainDate ||
		yearOrDate instanceof Temporal.PlainDateTime ||
		yearOrDate instanceof Temporal.PlainYearMonth ||
		yearOrDate instanceof Temporal.ZonedDateTime
	) {
		// Temporal date object - check daysInYear property
		try {
			return yearOrDate.daysInYear === 366
		} catch {
			return false
		}
	} else {
		return false
	}

	// Calculate leap year for number input
	if (year % 400 === 0) return true
	if (year % 100 === 0) return false
	if (year % 4 === 0) return true
	return false
}

export default isLeapYear
