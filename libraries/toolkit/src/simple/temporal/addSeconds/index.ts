/**
 * Adds seconds to a Temporal PlainTime, PlainDateTime, or ZonedDateTime
 *
 * Immutably adds the specified number of seconds to a time or datetime.
 * Returns a new Temporal object with the seconds added. Negative values
 * subtract seconds. Handles minute, hour, and day boundaries automatically.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (seconds) => (time) => result
 * @param seconds - Number of seconds to add (negative to subtract)
 * @param time - The PlainTime, PlainDateTime, or ZonedDateTime to add seconds to
 * @returns New time/datetime with seconds added, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45")
 * addSeconds(15)(time)                    // PlainTime 10:31:00
 * addSeconds(30)(time)                    // PlainTime 10:31:15
 * addSeconds(-20)(time)                   // PlainTime 10:30:25
 * addSeconds(75)(time)                    // PlainTime 10:32:00
 *
 * // Minute boundary crossing
 * const nearMinute = Temporal.PlainTime.from("10:30:55")
 * addSeconds(10)(nearMinute)              // PlainTime 10:31:05
 * addSeconds(65)(nearMinute)              // PlainTime 10:32:00
 *
 * // Hour boundary crossing
 * const nearHour = Temporal.PlainTime.from("10:59:50")
 * addSeconds(15)(nearHour)                // PlainTime 11:00:05
 * addSeconds(70)(nearHour)                // PlainTime 11:01:00
 *
 * // Day boundary with PlainTime (wraps)
 * const nearMidnight = Temporal.PlainTime.from("23:59:50")
 * addSeconds(15)(nearMidnight)            // PlainTime 00:00:05
 * addSeconds(-10)(Temporal.PlainTime.from("00:00:05")) // PlainTime 23:59:55
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T23:59:50")
 * addSeconds(10)(datetime)                // PlainDateTime 2024-03-16T00:00:00
 * addSeconds(15)(datetime)                // PlainDateTime 2024-03-16T00:00:05
 * addSeconds(-60)(datetime)               // PlainDateTime 2024-03-15T23:58:50
 *
 * // Partial application for common intervals
 * const addHalfMinute = addSeconds(30)
 * const addMinute = addSeconds(60)
 * const addFiveSeconds = addSeconds(5)
 * const subtractSecond = addSeconds(-1)
 *
 * const timer = Temporal.PlainTime.from("00:00:00")
 * addFiveSeconds(timer)                   // PlainTime 00:00:05
 * addHalfMinute(timer)                    // PlainTime 00:00:30
 * addMinute(timer)                        // PlainTime 00:01:00
 *
 * // Stopwatch functionality
 * function updateStopwatch(
 *   current: Temporal.PlainTime,
 *   elapsed: number
 * ): Temporal.PlainTime | null {
 *   return addSeconds(elapsed)(current)
 * }
 *
 * const stopwatchStart = Temporal.PlainTime.from("00:00:00")
 * updateStopwatch(stopwatchStart, 125)    // PlainTime 00:02:05
 * updateStopwatch(stopwatchStart, 3661)   // PlainTime 01:01:01
 *
 * // Countdown timer
 * function countdown(
 *   start: Temporal.PlainTime,
 *   totalSeconds: number
 * ): Array<Temporal.PlainTime | null> {
 *   return Array.from(
 *     { length: Math.floor(totalSeconds / 10) + 1 },
 *     (_, i) => addSeconds(-(i * 10))(start)
 *   )
 * }
 *
 * const countdownFrom = Temporal.PlainTime.from("00:01:00")
 * countdown(countdownFrom, 60)
 * // [00:01:00, 00:00:50, 00:00:40, 00:00:30, 00:00:20, 00:00:10, 00:00:00]
 *
 * // Animation frame timing
 * function getFrameTimes(
 *   start: Temporal.PlainTime,
 *   fps: number,
 *   duration: number
 * ): Array<Temporal.PlainTime | null> {
 *   const frameInterval = 1 / fps
 *   const totalFrames = Math.floor(duration * fps)
 *   
 *   return Array.from(
 *     { length: totalFrames + 1 },
 *     (_, i) => addSeconds(i * frameInterval)(start)
 *   )
 * }
 *
 * const animationStart = Temporal.PlainTime.from("00:00:00")
 * const frameTimings = getFrameTimes(animationStart, 30, 2)
 * // 60 frames over 2 seconds at 30fps
 *
 * // Video playback positions
 * function seek(
 *   currentPosition: Temporal.PlainTime,
 *   seekSeconds: number
 * ): Temporal.PlainTime | null {
 *   return addSeconds(seekSeconds)(currentPosition)
 * }
 *
 * const videoPosition = Temporal.PlainTime.from("00:12:30")
 * seek(videoPosition, 10)                 // PlainTime 00:12:40 (forward)
 * seek(videoPosition, -30)                // PlainTime 00:12:00 (rewind)
 * seek(videoPosition, 90)                 // PlainTime 00:14:00 (skip ahead)
 *
 * // Rate limiting / throttling
 * function getNextAllowedTime(
 *   lastRequest: Temporal.PlainDateTime,
 *   cooldownSeconds: number
 * ): Temporal.PlainDateTime | null {
 *   return addSeconds(cooldownSeconds)(lastRequest)
 * }
 *
 * const lastApiCall = Temporal.PlainDateTime.from("2024-03-15T10:30:45")
 * getNextAllowedTime(lastApiCall, 5)      // PlainDateTime 2024-03-15T10:30:50
 *
 * // Heartbeat monitoring
 * function getHeartbeatTimes(
 *   start: Temporal.PlainTime,
 *   bpm: number,
 *   duration: number
 * ): Array<Temporal.PlainTime | null> {
 *   const intervalSeconds = 60 / bpm
 *   const beatCount = Math.floor(duration / intervalSeconds)
 *   
 *   return Array.from(
 *     { length: beatCount + 1 },
 *     (_, i) => addSeconds(i * intervalSeconds)(start)
 *   )
 * }
 *
 * const monitorStart = Temporal.PlainTime.from("00:00:00")
 * const heartbeats = getHeartbeatTimes(monitorStart, 72, 10)
 * // Heartbeat times for 72 BPM over 10 seconds
 *
 * // Microwave timer
 * function microwaveTimer(
 *   inputSeconds: number
 * ): Temporal.PlainTime | null {
 *   const start = Temporal.PlainTime.from("00:00:00")
 *   return addSeconds(inputSeconds)(start)
 * }
 *
 * microwaveTimer(90)                      // PlainTime 00:01:30
 * microwaveTimer(125)                     // PlainTime 00:02:05
 * microwaveTimer(30)                      // PlainTime 00:00:30
 *
 * // Null handling
 * addSeconds(30)(null)                    // null
 * addSeconds(30)(undefined)               // null
 * addSeconds(30)("invalid")               // null
 *
 * // GPS timestamp updates
 * function updateGPSTime(
 *   lastFix: Temporal.PlainDateTime,
 *   driftSeconds: number
 * ): Temporal.PlainDateTime | null {
 *   return addSeconds(driftSeconds)(lastFix)
 * }
 *
 * // Audio/video sync adjustment
 * function adjustSync(
 *   timestamp: Temporal.PlainTime,
 *   offsetMs: number
 * ): Temporal.PlainTime | null {
 *   const offsetSeconds = offsetMs / 1000
 *   return addSeconds(offsetSeconds)(timestamp)
 * }
 *
 * const audioTime = Temporal.PlainTime.from("00:05:23.500")
 * adjustSync(audioTime, 250)              // Adjust by 250ms forward
 * adjustSync(audioTime, -500)             // Adjust by 500ms backward
 *
 * // Server response timeout
 * function getTimeout(
 *   requestTime: Temporal.PlainDateTime,
 *   timeoutSeconds: number = 30
 * ): Temporal.PlainDateTime | null {
 *   return addSeconds(timeoutSeconds)(requestTime)
 * }
 *
 * const requestSent = Temporal.Now.plainDateTimeISO()
 * const timeoutAt = getTimeout(requestSent, 10)
 * // Request will timeout 10 seconds from now
 * ```
 * @pure
 * @immutable
 * @safe
 * @curried
 */
const addSeconds = (seconds: number) =>
(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
):
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| null => {
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
		return time.add({ seconds })
	} catch {
		return null
	}
}

export default addSeconds
