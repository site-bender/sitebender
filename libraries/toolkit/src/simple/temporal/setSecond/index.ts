/**
 * Returns a new time or datetime with the second set to the specified value
 * 
 * Creates a new Temporal time or datetime with the second changed to the specified
 * value (0-59). Other time components (hours, minutes, milliseconds, etc.) are
 * preserved. This is a curried function for easy composition. Returns null for
 * invalid inputs to support safe error handling.
 * 
 * @curried (second) => (time) => new time
 * @param second - The second to set (0-59)
 * @param time - The Temporal time to modify
 * @returns New time with updated second, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * setSecond(0)(time)                      // PlainTime 10:30:00
 * setSecond(15)(time)                     // PlainTime 10:30:15
 * setSecond(30)(time)                     // PlainTime 10:30:30
 * setSecond(59)(time)                     // PlainTime 10:30:59
 * 
 * // Preserves hours, minutes, and sub-second precision
 * const preciseTime = Temporal.PlainTime.from("14:30:45.123456789")
 * setSecond(15)(preciseTime)              // PlainTime 14:30:15.123456789
 * setSecond(0)(preciseTime)               // PlainTime 14:30:00.123456789
 * 
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setSecond(0)(datetime)                  // PlainDateTime 2024-03-15T10:30:00
 * setSecond(20)(datetime)                 // PlainDateTime 2024-03-15T10:30:20
 * setSecond(59)(datetime)                 // PlainDateTime 2024-03-15T10:30:59
 * 
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:45-04:00[America/New_York]"
 * )
 * setSecond(30)(zonedDateTime)            // ZonedDateTime 2024-03-15T10:30:30-04:00[America/New_York]
 * 
 * // Invalid second handling
 * setSecond(-1)(time)                     // null (negative second)
 * setSecond(60)(time)                     // null (second must be < 60)
 * setSecond(61)(time)                     // null (invalid second)
 * setSecond(30.5)(time)                   // null (must be integer)
 * 
 * // Null handling
 * setSecond(30)(null)                     // null
 * setSecond(30)(undefined)                // null
 * setSecond(30)("10:30:45" as any)       // null (string, not Temporal)
 * 
 * // Timer reset function
 * function resetSeconds(
 *   time: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   return setSecond(0)(time)
 * }
 * 
 * resetSeconds(Temporal.PlainTime.from("10:30:45"))  // 10:30:00
 * resetSeconds(Temporal.PlainTime.from("14:15:37"))  // 14:15:00
 * 
 * // Countdown timer setter
 * function setCountdown(
 *   baseTime: Temporal.PlainTime,
 *   seconds: number
 * ): Temporal.PlainTime | null {
 *   if (seconds < 0 || seconds > 59) return null
 *   return setSecond(seconds)(baseTime)
 * }
 * 
 * const timerBase = Temporal.PlainTime.from("00:05:00")
 * setCountdown(timerBase, 30)             // 00:05:30
 * setCountdown(timerBase, 45)             // 00:05:45
 * setCountdown(timerBase, 0)              // 00:05:00
 * 
 * // Synchronization helper
 * function syncToMinuteBoundary(
 *   time: Temporal.PlainTime,
 *   offsetSeconds: number = 0
 * ): Temporal.PlainTime | null {
 *   if (offsetSeconds < 0 || offsetSeconds > 59) return null
 *   return setSecond(offsetSeconds)(time)
 * }
 * 
 * const currentTime = Temporal.PlainTime.from("10:30:37")
 * syncToMinuteBoundary(currentTime)       // 10:30:00
 * syncToMinuteBoundary(currentTime, 15)   // 10:30:15
 * syncToMinuteBoundary(currentTime, 30)   // 10:30:30
 * 
 * // Batch time processing
 * const times = [
 *   Temporal.PlainTime.from("09:15:22"),
 *   Temporal.PlainTime.from("14:30:37"),
 *   Temporal.PlainTime.from("18:45:51")
 * ]
 * 
 * const resetToZero = setSecond(0)
 * times.map(resetToZero)
 * // [09:15:00, 14:30:00, 18:45:00]
 * 
 * // Heartbeat scheduler
 * function scheduleHeartbeat(
 *   time: Temporal.PlainDateTime,
 *   intervalSeconds: number
 * ): Array<Temporal.PlainDateTime | null> {
 *   const heartbeats: Array<Temporal.PlainDateTime | null> = []
 *   
 *   for (let s = 0; s < 60; s += intervalSeconds) {
 *     heartbeats.push(setSecond(s)(time))
 *   }
 *   
 *   return heartbeats
 * }
 * 
 * const baseTime = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * scheduleHeartbeat(baseTime, 15)
 * // [10:30:00, 10:30:15, 10:30:30, 10:30:45]
 * 
 * // Video timestamp normalizer
 * function normalizeVideoTimestamp(
 *   time: Temporal.PlainTime,
 *   frameRate: 24 | 30 | 60
 * ): Temporal.PlainTime | null {
 *   const second = time.second
 *   const frameInterval = 60 / frameRate
 *   
 *   // Round to nearest frame boundary
 *   const normalizedSecond = Math.round(second / frameInterval) * frameInterval
 *   
 *   if (normalizedSecond >= 60) {
 *     // Handle overflow to next minute
 *     const nextMinute = time.add({ minutes: 1 })
 *     return setSecond(0)(nextMinute)
 *   }
 *   
 *   return setSecond(Math.floor(normalizedSecond))(time)
 * }
 * 
 * const videoTime = Temporal.PlainTime.from("10:30:37")
 * normalizeVideoTimestamp(videoTime, 30)  // 10:30:36 (nearest 2-second boundary)
 * normalizeVideoTimestamp(videoTime, 24)  // 10:30:37.5 → 10:30:37
 * 
 * // Metronome tick generator
 * function generateMetronomeTicks(
 *   startTime: Temporal.PlainTime,
 *   bpm: number
 * ): Array<Temporal.PlainTime | null> {
 *   const secondsPerBeat = 60 / bpm
 *   const ticks: Array<Temporal.PlainTime | null> = []
 *   
 *   for (let beat = 0; beat * secondsPerBeat < 60; beat++) {
 *     const tickSecond = Math.floor(beat * secondsPerBeat)
 *     if (tickSecond < 60) {
 *       ticks.push(setSecond(tickSecond)(startTime))
 *     }
 *   }
 *   
 *   return ticks
 * }
 * 
 * const metronomStart = Temporal.PlainTime.from("10:30:00")
 * generateMetronomeTicks(metronomStart, 60)   // One tick per second
 * // [10:30:00, 10:30:01, 10:30:02, ...]
 * 
 * generateMetronomeTicks(metronomStart, 120)  // Two ticks per second
 * // [10:30:00, 10:30:00, 10:30:01, 10:30:01, ...]
 * 
 * // GPS timestamp adjuster
 * function adjustGPSTimestamp(
 *   time: Temporal.PlainDateTime,
 *   gpsSecond: number
 * ): Temporal.PlainDateTime | null {
 *   // GPS timestamps might have leap second considerations
 *   if (gpsSecond < 0 || gpsSecond > 60) return null  // Allow for leap second
 *   
 *   if (gpsSecond === 60) {
 *     // Handle leap second by moving to next minute
 *     const nextMinute = time.add({ minutes: 1 })
 *     return setSecond(0)(nextMinute)
 *   }
 *   
 *   return setSecond(gpsSecond)(time)
 * }
 * 
 * const gpsTime = Temporal.PlainDateTime.from("2024-03-15T23:59:00")
 * adjustGPSTimestamp(gpsTime, 59)         // 2024-03-15T23:59:59
 * adjustGPSTimestamp(gpsTime, 60)         // 2024-03-16T00:00:00 (leap second handling)
 * 
 * // Cron second setter
 * function setCronSecond(
 *   time: Temporal.PlainDateTime,
 *   cronSecond: number | "*"
 * ): Temporal.PlainDateTime | null {
 *   if (cronSecond === "*") return time
 *   
 *   if (typeof cronSecond !== "number") return null
 *   return setSecond(cronSecond)(time)
 * }
 * 
 * const cronTime = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * setCronSecond(cronTime, 0)              // 2024-03-15T10:30:00
 * setCronSecond(cronTime, 30)             // 2024-03-15T10:30:30
 * setCronSecond(cronTime, "*")            // 2024-03-15T10:30:45 (unchanged)
 * 
 * // Network time protocol (NTP) adjustment
 * function applyNTPAdjustment(
 *   localTime: Temporal.PlainTime,
 *   ntpSecond: number,
 *   preserveSubseconds: boolean = true
 * ): Temporal.PlainTime | null {
 *   const adjusted = setSecond(ntpSecond)(localTime)
 *   
 *   if (!preserveSubseconds && adjusted) {
 *     // Reset sub-second precision
 *     return adjusted.with({ 
 *       millisecond: 0, 
 *       microsecond: 0, 
 *       nanosecond: 0 
 *     })
 *   }
 *   
 *   return adjusted
 * }
 * 
 * const localWithPrecision = Temporal.PlainTime.from("10:30:45.123456789")
 * applyNTPAdjustment(localWithPrecision, 30, true)   // 10:30:30.123456789
 * applyNTPAdjustment(localWithPrecision, 30, false)  // 10:30:30.000000000
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Immutable - Returns new instance, doesn't modify original
 * @property Preserving - Preserves other time components including sub-second precision
 */
const setSecond = (second: number) => (
	time: Temporal.PlainTime | Temporal.PlainDateTime | 
	      Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
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
	
	// Validate second is in valid range
	if (second < 0 || second > 59 || !Number.isInteger(second)) {
		return null
	}
	
	try {
		return time.with({ second })
	} catch {
		return null
	}
}

export default setSecond