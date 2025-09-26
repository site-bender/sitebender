import isNullish from "../../validation/isNullish/index.ts"

/**
 * Adds days to a Temporal PlainDate or PlainDateTime
 *
 * Immutably adds the specified number of days to a date or datetime.
 * Returns a new Temporal object with the days added. Negative values
 * subtract days. Handles month and year boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (days) => (date) => result
 * @param days - Number of days to add (negative to subtract)
 * @param date - The PlainDate or PlainDateTime to add days to
 * @returns New date/datetime with days added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * addDays(5)(date)                        // PlainDate 2024-03-20
 * addDays(10)(date)                       // PlainDate 2024-03-25
 * addDays(-5)(date)                       // PlainDate 2024-03-10
 *
 * // Month boundary crossing
 * const endOfMonth = Temporal.PlainDate.from("2024-03-31")
 * addDays(1)(endOfMonth)                  // PlainDate 2024-04-01
 * addDays(5)(endOfMonth)                  // PlainDate 2024-04-05
 *
 * // Year boundary crossing
 * const endOfYear = Temporal.PlainDate.from("2024-12-31")
 * addDays(1)(endOfYear)                   // PlainDate 2025-01-01
 * addDays(32)(endOfYear)                  // PlainDate 2025-02-01
 *
 * // Leap year handling
 * const leapDay = Temporal.PlainDate.from("2024-02-28")
 * addDays(1)(leapDay)                     // PlainDate 2024-02-29
 * addDays(2)(leapDay)                     // PlainDate 2024-03-01
 *
 * const nonLeapDay = Temporal.PlainDate.from("2023-02-28")
 * addDays(1)(nonLeapDay)                  // PlainDate 2023-03-01
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * addDays(7)(datetime)                    // PlainDateTime 2024-03-22T10:30:00
 * addDays(-30)(datetime)                  // PlainDateTime 2024-02-14T10:30:00
 *
 * // Partial application for specific operations
 * const addWeek = addDays(7)
 * const addMonth = addDays(30)
 * const yesterday = addDays(-1)
 * const tomorrow = addDays(1)
 *
 * const today = Temporal.Now.plainDateISO()
 * tomorrow(today)                         // Tomorrow's date
 * yesterday(today)                        // Yesterday's date
 * addWeek(today)                          // Date one week from now
 *
 * // Working with date ranges
 * const startDate = Temporal.PlainDate.from("2024-01-01")
 * const addBusinessDay = addDays(1)
 * const businessDays = [
 *   startDate,
 *   addBusinessDay(startDate),
 *   addDays(2)(startDate),
 *   addDays(3)(startDate),
 *   addDays(4)(startDate)
 * ]
 * // [Mon, Tue, Wed, Thu, Fri] (assuming start is Monday)
 *
 * // Null handling
 * addDays(5)(null)                        // null
 * addDays(5)(undefined)                   // null
 * addDays(5)("invalid")                   // null
 *
 * // Project deadline calculation
 * function calculateDeadline(
 *   start: Temporal.PlainDate,
 *   workDays: number
 * ): Temporal.PlainDate {
 *   // Simple version (doesn't skip weekends)
 *   return addDays(workDays)(start) ?? start
 * }
 *
 * const projectStart = Temporal.PlainDate.from("2024-03-01")
 * calculateDeadline(projectStart, 14)     // PlainDate 2024-03-15
 *
 * // Subscription renewal dates
 * function getNextRenewal(
 *   lastRenewal: Temporal.PlainDate,
 *   intervalDays: number
 * ): Temporal.PlainDate | null {
 *   return addDays(intervalDays)(lastRenewal)
 * }
 *
 * const subscription = Temporal.PlainDate.from("2024-01-15")
 * getNextRenewal(subscription, 30)        // PlainDate 2024-02-14
 * getNextRenewal(subscription, 365)       // PlainDate 2025-01-15
 *
 * // Date series generation
 * function generateDates(
 *   start: Temporal.PlainDate,
 *   count: number,
 *   step: number = 1
 * ): Array<Temporal.PlainDate> {
 *   const addStep = addDays(step)
 *   return Array.from({ length: count }, (_, i) =>
 *     i === 0 ? start :
 *     Array.from({ length: i }, () => null)
 *       .reduce((acc) => addStep(acc), start)
 *   ).filter((d): d is Temporal.PlainDate => d !== null)
 * }
 *
 * generateDates(Temporal.PlainDate.from("2024-01-01"), 5, 7)
 * // Weekly dates: [Jan 1, Jan 8, Jan 15, Jan 22, Jan 29]
 *
 * // Age calculation helper
 * function daysUntilBirthday(
 *   birthday: Temporal.PlainDate
 * ): number {
 *   const today = Temporal.Now.plainDateISO()
 *   const thisYear = birthday.withYear(today.year)
 *   const nextYear = birthday.withYear(today.year + 1)
 *
 *   const target = Temporal.PlainDate.compare(thisYear, today) >= 0
 *     ? thisYear
 *     : nextYear
 *
 *   return today.until(target).days
 * }
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
export default function addDays(days: number) {
	return function addDaysToDate(
		date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): Temporal.PlainDate | Temporal.PlainDateTime | null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime)
		) {
			return null
		}

		try {
			return date.add({ days })
		} catch {
			return null
		}
	}
}
