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
 * const half = Temporal.PlainTime.from("09:30:00")
 * getMinute(half)                         // 30
 *
 * const threeQuarter = Temporal.PlainTime.from("16:45:30")
 * getMinute(threeQuarter)                 // 45
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
 * const precise = Temporal.PlainDateTime.from("2024-03-15T23:37:45.123")
 * getMinute(precise)                      // 37
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:25:00-04:00[America/New_York]"
 * )
 * getMinute(zonedDateTime)                // 25
 *
 * // Different time zones preserve local minute
 * const tokyo = Temporal.ZonedDateTime.from(
 *   "2024-03-15T09:48:00+09:00[Asia/Tokyo]"
 * )
 * getMinute(tokyo)                        // 48
 *
 * // Quarter-hour detection
 * function isQuarterHour(time: Temporal.PlainTime): boolean {
 *   const minute = getMinute(time)
 *   return minute === 0 || minute === 15 || minute === 30 || minute === 45
 * }
 *
 * isQuarterHour(Temporal.PlainTime.from("10:15:00"))  // true
 * isQuarterHour(Temporal.PlainTime.from("10:20:00"))  // false
 * isQuarterHour(Temporal.PlainTime.from("10:45:00"))  // true
 *
 * // Minutes until next hour
 * function minutesUntilNextHour(time: Temporal.PlainTime): number {
 *   const minute = getMinute(time)
 *   if (minute === null) return 0
 *
 *   return minute === 0 ? 0 : 60 - minute
 * }
 *
 * minutesUntilNextHour(Temporal.PlainTime.from("10:42:00"))  // 18
 * minutesUntilNextHour(Temporal.PlainTime.from("10:00:00"))  // 0
 * minutesUntilNextHour(Temporal.PlainTime.from("10:59:30"))  // 1
 *
 * // Time rounding to nearest 5 minutes
 * function roundToNearest5Minutes(time: Temporal.PlainTime): Temporal.PlainTime | null {
 *   const minute = getMinute(time)
 *   if (minute === null) return null
 *
 *   const rounded = Math.round(minute / 5) * 5
 *
 *   if (rounded === 60) {
 *     return time.add({ hours: 1 }).with({ minute: 0, second: 0, millisecond: 0 })
 *   }
 *
 *   return time.with({ minute: rounded, second: 0, millisecond: 0 })
 * }
 *
 * roundToNearest5Minutes(Temporal.PlainTime.from("10:32:00"))  // 10:30:00
 * roundToNearest5Minutes(Temporal.PlainTime.from("10:33:00"))  // 10:35:00
 * roundToNearest5Minutes(Temporal.PlainTime.from("10:58:00"))  // 11:00:00
 *
 * // Meeting slot alignment
 * function getNextMeetingSlot(
 *   time: Temporal.PlainTime,
 *   slotMinutes: number = 30
 * ): Temporal.PlainTime | null {
 *   const minute = getMinute(time)
 *   if (minute === null) return null
 *
 *   const nextSlot = Math.ceil(minute / slotMinutes) * slotMinutes
 *
 *   if (nextSlot >= 60) {
 *     return time.add({ hours: 1 }).with({ minute: nextSlot - 60 })
 *   }
 *
 *   return time.with({ minute: nextSlot })
 * }
 *
 * getNextMeetingSlot(Temporal.PlainTime.from("10:25:00"), 30)  // 10:30:00
 * getNextMeetingSlot(Temporal.PlainTime.from("10:45:00"), 30)  // 11:00:00
 * getNextMeetingSlot(Temporal.PlainTime.from("10:10:00"), 15)  // 10:15:00
 *
 * // Null handling
 * getMinute(null)                         // null
 * getMinute(undefined)                    // null
 * getMinute("10:30:00")                  // null (string, not Temporal object)
 * getMinute(new Date())                   // null (Date, not Temporal)
 *
 * // Time formatting helper
 * function formatMinuteDescription(time: Temporal.PlainTime): string {
 *   const minute = getMinute(time)
 *   if (minute === null) return "Unknown"
 *
 *   if (minute === 0) return "on the hour"
 *   if (minute === 15) return "quarter past"
 *   if (minute === 30) return "half past"
 *   if (minute === 45) return "quarter to"
 *   if (minute < 30) return `${minute} past`
 *   return `${60 - minute} to`
 * }
 *
 * formatMinuteDescription(Temporal.PlainTime.from("10:00:00"))  // "on the hour"
 * formatMinuteDescription(Temporal.PlainTime.from("10:15:00"))  // "quarter past"
 * formatMinuteDescription(Temporal.PlainTime.from("10:30:00"))  // "half past"
 * formatMinuteDescription(Temporal.PlainTime.from("10:45:00"))  // "quarter to"
 * formatMinuteDescription(Temporal.PlainTime.from("10:20:00"))  // "20 past"
 * formatMinuteDescription(Temporal.PlainTime.from("10:50:00"))  // "10 to"
 *
 * // Pomodoro timer helper
 * function getPomodoroPhase(time: Temporal.PlainTime): string {
 *   const minute = getMinute(time)
 *   if (minute === null) return "Unknown"
 *
 *   // Standard Pomodoro: 25 min work, 5 min break
 *   const cycleMinute = minute % 30
 *   return cycleMinute < 25 ? "Work" : "Break"
 * }
 *
 * getPomodoroPhase(Temporal.PlainTime.from("10:10:00"))  // "Work"
 * getPomodoroPhase(Temporal.PlainTime.from("10:27:00"))  // "Break"
 * getPomodoroPhase(Temporal.PlainTime.from("10:35:00"))  // "Work"
 *
 * // Cron-like minute matching
 * function matchesMinutePattern(
 *   time: Temporal.PlainTime,
 *   pattern: string
 * ): boolean {
 *   const minute = getMinute(time)
 *   if (minute === null) return false
 *
 *   if (pattern === "*") return true
 *   if (pattern.includes("/")) {
 *     const interval = parseInt(pattern.split("/")[1])
 *     return minute % interval === 0
 *   }
 *   if (pattern.includes(",")) {
 *     const values = pattern.split(",").map(v => parseInt(v))
 *     return values.includes(minute)
 *   }
 *
 *   return minute === parseInt(pattern)
 * }
 *
 * const time = Temporal.PlainTime.from("10:30:00")
 * matchesMinutePattern(time, "30")        // true
 * matchesMinutePattern(time, "*\/15")      // true (every 15 minutes)
 * matchesMinutePattern(time, "0,15,30,45") // true
 * matchesMinutePattern(time, "*\/10")      // true (every 10 minutes)
 *
 * // Time slot availability
 * function getAvailableMinutes(
 *   start: Temporal.PlainTime,
 *   end: Temporal.PlainTime,
 *   bookedSlots: Array<{ start: Temporal.PlainTime, duration: number }>
 * ): number {
 *   const startMinute = start.hour * 60 + (getMinute(start) ?? 0)
 *   const endMinute = end.hour * 60 + (getMinute(end) ?? 0)
 *   let totalMinutes = endMinute - startMinute
 *
 *   for (const slot of bookedSlots) {
 *     const slotStart = slot.start.hour * 60 + (getMinute(slot.start) ?? 0)
 *     if (slotStart >= startMinute && slotStart < endMinute) {
 *       totalMinutes -= Math.min(slot.duration, endMinute - slotStart)
 *     }
 *   }
 *
 *   return totalMinutes
 * }
 *
 * // Grouping times by minute intervals
 * function groupByMinuteInterval(
 *   times: Array<Temporal.PlainTime>,
 *   interval: number = 10
 * ): Map<number, Array<Temporal.PlainTime>> {
 *   const grouped = new Map<number, Array<Temporal.PlainTime>>()
 *
 *   for (const time of times) {
 *     const minute = getMinute(time)
 *     if (minute !== null) {
 *       const bucket = Math.floor(minute / interval) * interval
 *       const group = grouped.get(bucket) ?? []
 *       group.push(time)
 *       grouped.set(bucket, group)
 *     }
 *   }
 *
 *   return grouped
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for invalid inputs
 * @property Range - Returns minutes in standard range (0-59)
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
