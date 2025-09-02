/**
 * Checks if a year is a leap year
 *
 * Determines whether a given year or date represents a leap year. A leap year
 * occurs every 4 years, except for years divisible by 100 (which are not leap
 * years) unless they are also divisible by 400 (which are leap years). This
 * follows the Gregorian calendar rules. Accepts either a year number or a
 * Temporal date object. Returns false for invalid inputs to support safe error
 * handling.
 * @param yearOrDate - A year number or Temporal date object to check
 * @returns True if leap year, false otherwise (including invalid inputs)
 * @example
 * ```typescript
 * // Basic usage with year number
 * isLeapYear(2024)                        // true (divisible by 4)
 * isLeapYear(2023)                        // false
 * isLeapYear(2000)                        // true (divisible by 400)
 * isLeapYear(1900)                        // false (divisible by 100 but not 400)
 *
 * // With Temporal date objects
 * const leapDate = Temporal.PlainDate.from("2024-02-29")
 * isLeapYear(leapDate)                    // true
 *
 * const leapDateTime = Temporal.PlainDateTime.from("2024-07-04T12:00:00")
 * isLeapYear(leapDateTime)                // true
 *
 * // Century years edge cases
 * isLeapYear(1600)                        // true (divisible by 400)
 * isLeapYear(2100)                        // false (divisible by 100 but not 400)
 *
 * // Composition example
 * const getDaysInFebruary = (year: number): number =>
 *   isLeapYear(year) ? 29 : 28
 *
 * const upcomingYears = [2024, 2025, 2026, 2027, 2028]
 * upcomingYears.map(isLeapYear)           // [true, false, false, false, true]
 *
 * // Functional approach to find next leap year
 * const getNextLeapYear = (year: number): number => {
 *   const next = year + 1
 *   return isLeapYear(next) ? next : getNextLeapYear(next)
 * }
 *
 * // Edge cases
 * isLeapYear(null)                        // false
 * isLeapYear(undefined)                   // false
 * isLeapYear(NaN)                         // false
 * isLeapYear(Infinity)                    // false
 * ```
 * @pure
 * @safe
 * @predicate
 */
import isNullish from "../../../validation/isNullish"

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
	if (isNullish(yearOrDate)) {
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
