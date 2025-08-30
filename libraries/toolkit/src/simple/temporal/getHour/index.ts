import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the hour component from a Temporal time or datetime
 *
 * Extracts the hour component (0-23) from a Temporal PlainTime, PlainDateTime,
 * or ZonedDateTime. Returns hours in 24-hour format where 0 represents midnight
 * and 23 represents 11 PM. Returns null for invalid inputs to support safe
 * error handling.
 *
 * @param time - The Temporal object to get hour from
 * @returns The hour (0-23), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const morning = Temporal.PlainTime.from("09:30:00")
 * getHour(morning)                        // 9
 *
 * const afternoon = Temporal.PlainTime.from("14:45:30")
 * getHour(afternoon)                      // 14 (2:45 PM)
 *
 * const midnight = Temporal.PlainTime.from("00:00:00")
 * getHour(midnight)                       // 0
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * getHour(datetime)                       // 10
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:30:00-04:00[America/New_York]"
 * )
 * getHour(zonedDateTime)                  // 16 (4:30 PM local time)
 *
 * // 12-hour format conversion
 * const to12HourFormat = (time: Temporal.PlainTime): {
 *   hour: number,
 *   period: "AM" | "PM"
 * } | null => {
 *   const hour24 = getHour(time)
 *   if (hour24 === null) return null
 *
 *   const period = hour24 < 12 ? "AM" : "PM"
 *   const hour12 = hour24 === 0 ? 12 :
 *                  hour24 > 12 ? hour24 - 12 :
 *                  hour24
 *
 *   return { hour: hour12, period }
 * }
 *
 * to12HourFormat(Temporal.PlainTime.from("00:30:00"))  // { hour: 12, period: "AM" }
 * to12HourFormat(Temporal.PlainTime.from("13:45:00"))  // { hour: 1, period: "PM" }
 *
 * // Hourly schedule builder (functional)
 * const getHourlySchedule = (
 *   startTime: Temporal.PlainTime,
 *   endTime: Temporal.PlainTime
 * ): Array<number> => {
 *   const startHour = getHour(startTime)
 *   const endHour = getHour(endTime)
 *   if (startHour === null || endHour === null) return []
 *
 *   return Array.from(
 *     { length: endHour - startHour + 1 },
 *     (_, i) => startHour + i
 *   )
 * }
 *
 * getHourlySchedule(
 *   Temporal.PlainTime.from("09:00:00"),
 *   Temporal.PlainTime.from("17:00:00")
 * )                                        // [9, 10, 11, 12, 13, 14, 15, 16, 17]
 *
 * // Null handling
 * getHour(null)                           // null
 * getHour(undefined)                      // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @twentyFourHour Returns hours in 24-hour format (0-23)
 */
const getHour = (
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(time)) {
		return null
	}

	if (
		!(time instanceof Temporal.PlainTime) &&
		!(time instanceof Temporal.PlainDateTime) &&
		!(time instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return time.hour
	} catch {
		return null
	}
}

export default getHour
