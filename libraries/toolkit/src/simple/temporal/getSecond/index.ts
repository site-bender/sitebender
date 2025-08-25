/**
 * Gets the second component from a Temporal time or datetime
 *
 * Extracts the second component (0-59) from a Temporal PlainTime, PlainDateTime,
 * or ZonedDateTime. Seconds represent the portion of a minute from 0 to 59.
 * Note that Temporal does not use leap seconds. Returns null for invalid inputs
 * to support safe error handling.
 *
 * @param time - The Temporal object to get second from
 * @returns The second (0-59), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * getSecond(time)                         // 45
 *
 * const precise = Temporal.PlainTime.from("14:23:17.456")
 * getSecond(precise)                      // 17 (ignores milliseconds)
 *
 * const topOfMinute = Temporal.PlainTime.from("09:15:00")
 * getSecond(topOfMinute)                  // 0
 *
 * const endOfMinute = Temporal.PlainTime.from("18:45:59")
 * getSecond(endOfMinute)                  // 59
 *
 * const halfMinute = Temporal.PlainTime.from("12:00:30")
 * getSecond(halfMinute)                   // 30
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:42")
 * getSecond(datetime)                     // 42
 *
 * const midnight = Temporal.PlainDateTime.from("2024-03-15T00:00:00")
 * getSecond(midnight)                     // 0
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:25:38-04:00[America/New_York]"
 * )
 * getSecond(zonedDateTime)                // 38
 *
 * // Different time zones preserve local second
 * const tokyo = Temporal.ZonedDateTime.from(
 *   "2024-03-15T09:48:52+09:00[Asia/Tokyo]"
 * )
 * getSecond(tokyo)                        // 52
 *
 * // Countdown timer helper
 * function getSecondsUntilNextMinute(time: Temporal.PlainTime): number {
 *   const second = getSecond(time)
 *   if (second === null) return 0
 *
 *   return second === 0 ? 0 : 60 - second
 * }
 *
 * getSecondsUntilNextMinute(Temporal.PlainTime.from("10:30:45"))  // 15
 * getSecondsUntilNextMinute(Temporal.PlainTime.from("10:30:00"))  // 0
 * getSecondsUntilNextMinute(Temporal.PlainTime.from("10:30:59"))  // 1
 *
 * // Round to nearest 10 seconds
 * function roundToNearest10Seconds(time: Temporal.PlainTime): Temporal.PlainTime | null {
 *   const second = getSecond(time)
 *   if (second === null) return null
 *
 *   const rounded = Math.round(second / 10) * 10
 *
 *   if (rounded === 60) {
 *     return time.add({ minutes: 1 }).with({ second: 0, millisecond: 0 })
 *   }
 *
 *   return time.with({ second: rounded, millisecond: 0 })
 * }
 *
 * roundToNearest10Seconds(Temporal.PlainTime.from("10:30:44"))  // 10:30:40
 * roundToNearest10Seconds(Temporal.PlainTime.from("10:30:45"))  // 10:30:50
 * roundToNearest10Seconds(Temporal.PlainTime.from("10:30:58"))  // 10:31:00
 *
 * // Heartbeat/pulse detection
 * function isPulseSecond(
 *   time: Temporal.PlainTime,
 *   interval: number = 5
 * ): boolean {
 *   const second = getSecond(time)
 *   if (second === null) return false
 *
 *   return second % interval === 0
 * }
 *
 * isPulseSecond(Temporal.PlainTime.from("10:30:00"), 5)  // true (0 % 5 = 0)
 * isPulseSecond(Temporal.PlainTime.from("10:30:15"), 5)  // true (15 % 5 = 0)
 * isPulseSecond(Temporal.PlainTime.from("10:30:17"), 5)  // false
 *
 * // Null handling
 * getSecond(null)                         // null
 * getSecond(undefined)                    // null
 * getSecond("10:30:45")                  // null (string, not Temporal object)
 * getSecond(new Date())                   // null (Date, not Temporal)
 *
 * // Stopwatch display
 * function formatStopwatch(time: Temporal.PlainTime): string {
 *   const hours = time.hour
 *   const minutes = time.minute
 *   const seconds = getSecond(time)
 *
 *   if (seconds === null) return "00:00:00"
 *
 *   const h = hours.toString().padStart(2, '0')
 *   const m = minutes.toString().padStart(2, '0')
 *   const s = seconds.toString().padStart(2, '0')
 *
 *   return `${h}:${m}:${s}`
 * }
 *
 * formatStopwatch(Temporal.PlainTime.from("01:05:09"))  // "01:05:09"
 * formatStopwatch(Temporal.PlainTime.from("00:00:07"))  // "00:00:07"
 *
 * // Time since last whole second
 * function getMillisecondsSinceSecond(time: Temporal.PlainTime): number {
 *   return time.millisecond +
 *          time.microsecond / 1000 +
 *          time.nanosecond / 1000000
 * }
 *
 * const preciseTime = Temporal.PlainTime.from("10:30:45.123456789")
 * getMillisecondsSinceSecond(preciseTime)  // 123.456789
 *
 * // Cron-like second matching
 * function matchesSecondPattern(
 *   time: Temporal.PlainTime,
 *   pattern: string
 * ): boolean {
 *   const second = getSecond(time)
 *   if (second === null) return false
 *
 *   if (pattern === "*") return true
 *   if (pattern.includes("/")) {
 *     const interval = parseInt(pattern.split("/")[1])
 *     return second % interval === 0
 *   }
 *   if (pattern.includes(",")) {
 *     const values = pattern.split(",").map(v => parseInt(v))
 *     return values.includes(second)
 *   }
 *   if (pattern.includes("-")) {
 *     const [start, end] = pattern.split("-").map(v => parseInt(v))
 *     return second >= start && second <= end
 *   }
 *
 *   return second === parseInt(pattern)
 * }
 *
 * const time = Temporal.PlainTime.from("10:30:15")
 * matchesSecondPattern(time, "15")        // true
 * matchesSecondPattern(time, "*\/15")      // true (every 15 seconds)
 * matchesSecondPattern(time, "0,15,30,45") // true
 * matchesSecondPattern(time, "10-20")     // true (seconds 10-20)
 *
 * // Video timestamp formatting
 * function formatVideoTimestamp(time: Temporal.PlainTime): string {
 *   const totalSeconds = time.hour * 3600 + time.minute * 60 + (getSecond(time) ?? 0)
 *
 *   if (totalSeconds < 3600) {
 *     // Under an hour: MM:SS
 *     const minutes = Math.floor(totalSeconds / 60)
 *     const seconds = totalSeconds % 60
 *     return `${minutes}:${seconds.toString().padStart(2, '0')}`
 *   } else {
 *     // Over an hour: HH:MM:SS
 *     const hours = Math.floor(totalSeconds / 3600)
 *     const minutes = Math.floor((totalSeconds % 3600) / 60)
 *     const seconds = totalSeconds % 60
 *     return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
 *   }
 * }
 *
 * formatVideoTimestamp(Temporal.PlainTime.from("00:05:30"))  // "5:30"
 * formatVideoTimestamp(Temporal.PlainTime.from("01:23:45"))  // "1:23:45"
 *
 * // Rate limiting check (requests per second)
 * function canMakeRequest(
 *   lastRequest: Temporal.PlainTime,
 *   current: Temporal.PlainTime,
 *   minIntervalSeconds: number = 1
 * ): boolean {
 *   if (lastRequest.hour !== current.hour ||
 *       lastRequest.minute !== current.minute) {
 *     return true  // Different minute, definitely enough time passed
 *   }
 *
 *   const lastSecond = getSecond(lastRequest)
 *   const currentSecond = getSecond(current)
 *
 *   if (lastSecond === null || currentSecond === null) return false
 *
 *   return currentSecond - lastSecond >= minIntervalSeconds
 * }
 *
 * // Progress bar for current minute
 * function getMinuteProgress(time: Temporal.PlainTime): number {
 *   const second = getSecond(time)
 *   if (second === null) return 0
 *
 *   const millisecond = time.millisecond
 *   const totalMs = second * 1000 + millisecond
 *
 *   return (totalMs / 60000) * 100  // Percentage of minute completed
 * }
 *
 * getMinuteProgress(Temporal.PlainTime.from("10:30:00"))     // 0%
 * getMinuteProgress(Temporal.PlainTime.from("10:30:30"))     // 50%
 * getMinuteProgress(Temporal.PlainTime.from("10:30:45.500")) // 75.83%
 *
 * // Unix timestamp second alignment
 * function getUnixSeconds(datetime: Temporal.PlainDateTime): number {
 *   // Note: This is simplified - real implementation would need epoch reference
 *   const second = getSecond(datetime)
 *   if (second === null) return 0
 *
 *   // Calculate total seconds since Unix epoch (simplified)
 *   const date = datetime.toPlainDate()
 *   const daysSinceEpoch = date.since(
 *     Temporal.PlainDate.from("1970-01-01")
 *   ).days
 *
 *   return daysSinceEpoch * 86400 +
 *          datetime.hour * 3600 +
 *          datetime.minute * 60 +
 *          second
 * }
 *
 * // Animation frame timing (60 fps = ~16.67ms per frame)
 * function getFrameInSecond(time: Temporal.PlainTime, fps: number = 60): number {
 *   const second = getSecond(time)
 *   if (second === null) return 0
 *
 *   const millisIntoSecond = time.millisecond +
 *                           time.microsecond / 1000 +
 *                           time.nanosecond / 1000000
 *
 *   return Math.floor(millisIntoSecond / (1000 / fps))
 * }
 *
 * getFrameInSecond(Temporal.PlainTime.from("10:30:45.500"))  // 30 (frame index 30, halfway through second)
 *
 * // Grouping times by second intervals
 * function groupBySecondInterval(
 *   times: Array<Temporal.PlainTime>,
 *   interval: number = 10
 * ): Map<number, Array<Temporal.PlainTime>> {
 *   const grouped = new Map<number, Array<Temporal.PlainTime>>()
 *
 *   for (const time of times) {
 *     const second = getSecond(time)
 *     if (second !== null) {
 *       const bucket = Math.floor(second / interval) * interval
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
 * @property Range - Returns seconds in standard range (0-59)
 * @property No-leap-seconds - Temporal does not use leap seconds
 */
const getSecond = (
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
		return time.second
	} catch {
		return null
	}
}

export default getSecond
