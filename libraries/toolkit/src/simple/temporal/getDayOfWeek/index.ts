import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the day of week from a Temporal date or datetime
 *
 * Extracts the day of week (1-7) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for Monday through 7 for Sunday, following
 * ISO 8601 standard. This is consistent across all calendar systems.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get day of week from
 * @returns The day of week (1=Monday, 7=Sunday), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * getDayOfWeek(monday)                    // 1 (Monday)
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * getDayOfWeek(friday)                    // 5 (Friday)
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * getDayOfWeek(sunday)                    // 7 (Sunday)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * getDayOfWeek(datetime)                  // 5 (Friday)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getDayOfWeek(zonedDateTime)             // 5 (Friday)
 *
 * // Non-Gregorian calendars still use ISO weekdays
 * const hebrewDate = Temporal.PlainDate.from({
 *   year: 5784,
 *   month: 12,
 *   day: 15,
 *   calendar: "hebrew"
 * })
 * getDayOfWeek(hebrewDate)                // Returns ISO day of week
 *
 * // Day name helper
 * const getDayName = (date: Temporal.PlainDate): string => {
 *   const names = [
 *     "Monday", "Tuesday", "Wednesday", "Thursday",
 *     "Friday", "Saturday", "Sunday"
 *   ]
 *   const dayOfWeek = getDayOfWeek(date)
 *   return dayOfWeek ? names[dayOfWeek - 1] : "Unknown"
 * }
 *
 * getDayName(Temporal.PlainDate.from("2024-03-15"))  // "Friday"
 * getDayName(Temporal.PlainDate.from("2024-03-17"))  // "Sunday"
 *
 * // Null handling
 * getDayOfWeek(null)                      // null
 * getDayOfWeek(undefined)                 // null
 *
 * // Business days calculation (functional)
 * const addBusinessDays = (
 *   start: Temporal.PlainDate,
 *   days: number
 * ): Temporal.PlainDate => {
 *   const isBusinessDay = (date: Temporal.PlainDate) => {
 *     const day = getDayOfWeek(date)
 *     return day !== null && day >= 1 && day <= 5
 *   }
 *   
 *   const addDayRecursive = (
 *     current: Temporal.PlainDate,
 *     remaining: number,
 *     direction: number
 *   ): Temporal.PlainDate => {
 *     if (remaining === 0) return current
 *     const next = current.add({ days: direction })
 *     const decrement = isBusinessDay(next) ? 1 : 0
 *     return addDayRecursive(next, remaining - decrement, direction)
 *   }
 *   
 *   return addDayRecursive(start, Math.abs(days), days > 0 ? 1 : -1)
 * }
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @iso8601 Returns ISO 8601 weekday numbering (1=Monday, 7=Sunday)
 */
const getDayOfWeek = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
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

	try {
		return date.dayOfWeek
	} catch {
		return null
	}
}

export default getDayOfWeek
