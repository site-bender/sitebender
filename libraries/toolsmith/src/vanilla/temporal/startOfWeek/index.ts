import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the start of week for a date (configurable week start)
 *
 * Creates a new Temporal date/datetime set to the beginning of the week at
 * midnight (00:00:00.000000000). By default, weeks start on Monday (ISO 8601
 * standard), but this can be configured to any day. The week start day is
 * specified as 1-7 where 1=Monday and 7=Sunday. This is useful for weekly
 * reports, calendar views, and weekly aggregations. Returns null for invalid
 * inputs to support safe error handling.
 * @param weekStartDay - Day week starts on (1=Mon to 7=Sun, default 1)
 * @param date - The Temporal date to get start of week for
 * @returns Date/datetime at start of week, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate (ISO week, starts Monday)
 * const friday = Temporal.PlainDate.from("2024-03-15")  // Friday
 * startOfWeek(1)(friday)                   // PlainDateTime 2024-03-11T00:00:00 (Monday)
 * startOfWeek(1)(Temporal.PlainDate.from("2024-03-11"))  // Same Monday
 *
 * // US week (starts Sunday)
 * startOfWeek(7)(friday)                   // PlainDateTime 2024-03-10T00:00:00 (Sunday)
 *
 * // With PlainDateTime and ZonedDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:45")
 * startOfWeek(1)(datetime)                 // PlainDateTime 2024-03-11T00:00:00
 *
 * // Partial application for different week systems
 * const startOfISOWeek = startOfWeek(1)    // Monday start
 * const startOfUSWeek = startOfWeek(7)     // Sunday start
 *
 * // Work week days (Monday to Friday)
 * const getWorkWeekDays = (date: Temporal.PlainDate): Array<Temporal.PlainDate> => {
 *   const weekStart = startOfWeek(1)(date)
 *   if (!weekStart) return []
 *   return Array.from({ length: 5 }, (_, i) =>
 *     weekStart.add({ days: i }).toPlainDate()
 *   )
 * }
 *
 * // Weekly aggregation using functional approach
 * const aggregateByWeek = (
 *   dates: Array<Temporal.PlainDate>,
 *   weekStartDay: number = 1
 * ): Map<string, Array<Temporal.PlainDate>> => {
 *   return dates.reduce((grouped, date) => {
 *     const weekStart = startOfWeek(weekStartDay)(date)
 *     if (!weekStart) return grouped
 *     const key = weekStart.toString()
 *     const group = grouped.get(key) ?? []
 *     return grouped.set(key, [...group, date])
 *   }, new Map<string, Array<Temporal.PlainDate>>())
 * }
 *
 * // Invalid inputs return null
 * startOfWeek(0)(friday)                   // null (invalid day)
 * startOfWeek(1)(null)                     // null
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
export default function startOfWeek(weekStartDay: number = 1) {
	return function getStartOfWeekForDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	): Temporal.PlainDateTime | Temporal.ZonedDateTime | null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime) &&
			!(date instanceof Temporal.ZonedDateTime)
		) {
			return null
		}

		// Validate weekStartDay is in valid range (1-7)
		if (
			weekStartDay < 1 || weekStartDay > 7 || !Number.isInteger(weekStartDay)
		) {
			return null
		}

		try {
			// Get the current day of week (1=Monday, 7=Sunday)
			const currentDayOfWeek = date.dayOfWeek

			// Calculate days to subtract to get to week start
			const daysToSubtract = (currentDayOfWeek - weekStartDay + 7) % 7

			// Create the start of week date
			let startDate: Temporal.PlainDate

			if (date instanceof Temporal.PlainDate) {
				startDate = date.subtract({ days: daysToSubtract })
				return startDate.toPlainDateTime(
					Temporal.PlainTime.from("00:00:00"),
				)
			} else {
				// For PlainDateTime and ZonedDateTime
				const result = date.subtract({ days: daysToSubtract })
				return result.with({
					hour: 0,
					minute: 0,
					second: 0,
					millisecond: 0,
					microsecond: 0,
					nanosecond: 0,
				})
			}
		} catch {
			return null
		}
	}
}
