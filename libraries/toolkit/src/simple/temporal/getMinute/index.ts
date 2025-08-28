/**
 * Gets the minute component from a Temporal time or datetime
 *
 * Extracts the minute component (0-59) from a Temporal PlainTime, PlainDateTime,
 * or ZonedDateTime. Minutes represent the portion of an hour from 0 to 59.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param time - The Temporal object to get minute from
 * @returns The minute (0-59), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * getMinute(time)                         // 30
 *
 * const quarter = Temporal.PlainTime.from("14:15:00")
 * getMinute(quarter)                      // 15
 *
 * const topOfHour = Temporal.PlainTime.from("12:00:00")
 * getMinute(topOfHour)                    // 0
 *
 * const endOfHour = Temporal.PlainTime.from("18:59:59")
 * getMinute(endOfHour)                    // 59
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:42:30")
 * getMinute(datetime)                     // 42
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:25:00-04:00[America/New_York]"
 * )
 * getMinute(zonedDateTime)                // 25
 *
 * // Quarter-hour detection
 * const isQuarterHour = (time: Temporal.PlainTime): boolean => {
 *   const minute = getMinute(time)
 *   return minute === 0 || minute === 15 || minute === 30 || minute === 45
 * }
 *
 * isQuarterHour(Temporal.PlainTime.from("10:15:00"))  // true
 * isQuarterHour(Temporal.PlainTime.from("10:20:00"))  // false
 *
 * // Time slot availability (functional)
 * const getAvailableMinutes = (
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime,
 *   bookedSlots: Array<{ start: Temporal.PlainTime, duration: number }>
 * ): number => {
 *   const startMinute = start.hour * 60 + (getMinute(start) ?? 0)
 *   const endMinute = end.hour * 60 + (getMinute(end) ?? 0)
 *   
 *   return bookedSlots.reduce((available, slot) => {
 *     const slotStart = slot.start.hour * 60 + (getMinute(slot.start) ?? 0)
 *     if (slotStart >= startMinute && slotStart < endMinute) {
 *       return available - Math.min(slot.duration, endMinute - slotStart)
 *     }
 *     return available
 *   }, endMinute - startMinute)
 * }
 *
 * // Grouping times by minute intervals (functional)
 * const groupByMinuteInterval = (
 *   times: Array<Temporal.PlainTime>,
 *   interval: number = 10
 * ): Map<number, Array<Temporal.PlainTime>> =>
 *   times.reduce((grouped, time) => {
 *     const minute = getMinute(time)
 *     if (minute !== null) {
 *       const bucket = Math.floor(minute / interval) * interval
 *       const group = grouped.get(bucket) ?? []
 *       grouped.set(bucket, [...group, time])
 *     }
 *     return grouped
 *   }, new Map<number, Array<Temporal.PlainTime>>())
 *
 * // Null handling
 * getMinute(null)                         // null
 * getMinute(undefined)                    // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @range Returns minutes in standard range (0-59)
 */
const getMinute = (
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (time == null) {
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
		return time.minute
	} catch {
		return null
	}
}

export default getMinute
