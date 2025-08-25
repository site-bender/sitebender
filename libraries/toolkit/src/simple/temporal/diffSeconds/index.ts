/**
 * Calculates the difference in seconds between two times or datetimes
 *
 * Computes the number of seconds from the first time to the second time.
 * Returns a positive number if the second time is later, negative if
 * earlier. Works with PlainTime, PlainDateTime, and ZonedDateTime.
 * For PlainTime, assumes same day unless crossing midnight. Returns
 * fractional seconds for sub-second precision. Returns null for invalid inputs.
 *
 * @curried (from) => (to) => result
 * @param from - The starting time/datetime
 * @param to - The ending time/datetime
 * @returns Number of seconds difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time1 = Temporal.PlainTime.from("10:00:00")
 * const time2 = Temporal.PlainTime.from("10:00:30")
 * diffSeconds(time1)(time2)               // 30 seconds
 * diffSeconds(time2)(time1)               // -30 seconds
 * diffSeconds(time1)(time1)               // 0 seconds
 *
 * // With milliseconds
 * const start = Temporal.PlainTime.from("10:00:00.500")
 * const end = Temporal.PlainTime.from("10:00:01.750")
 * diffSeconds(start)(end)                 // 1.25 seconds
 *
 * // Minute crossing
 * const before = Temporal.PlainTime.from("10:00:55")
 * const after = Temporal.PlainTime.from("10:01:05")
 * diffSeconds(before)(after)              // 10 seconds
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T10:01:30")
 * diffSeconds(dt1)(dt2)                   // 90 seconds
 *
 * // Crossing day boundary
 * const night = Temporal.PlainDateTime.from("2024-03-15T23:59:50")
 * const morning = Temporal.PlainDateTime.from("2024-03-16T00:00:10")
 * diffSeconds(night)(morning)             // 20 seconds
 *
 * // High precision with nanoseconds
 * const precise1 = Temporal.PlainTime.from("10:00:00.123456789")
 * const precise2 = Temporal.PlainTime.from("10:00:00.987654321")
 * diffSeconds(precise1)(precise2)         // 0.864197532 seconds
 *
 * // Partial application for stopwatch
 * const startTime = Temporal.Now.plainTimeISO()
 * const elapsed = diffSeconds(startTime)
 *
 * // Later...
 * const currentTime = Temporal.Now.plainTimeISO()
 * elapsed(currentTime)                    // Seconds elapsed
 *
 * // Reaction time measurement
 * function measureReactionTime(
 *   stimulus: Temporal.PlainDateTime,
 *   response: Temporal.PlainDateTime
 * ): number | null {
 *   return diffSeconds(stimulus)(response)
 * }
 *
 * const stimulusTime = Temporal.PlainDateTime.from("2024-03-15T10:00:00.000")
 * const responseTime = Temporal.PlainDateTime.from("2024-03-15T10:00:00.350")
 * measureReactionTime(stimulusTime, responseTime)  // 0.35 seconds
 *
 * // Animation frame timing
 * function getFrameTime(
 *   lastFrame: Temporal.PlainTime,
 *   currentFrame: Temporal.PlainTime
 * ): number | null {
 *   return diffSeconds(lastFrame)(currentFrame)
 * }
 *
 * const frame1 = Temporal.PlainTime.from("10:00:00.000")
 * const frame2 = Temporal.PlainTime.from("10:00:00.033")
 * getFrameTime(frame1, frame2)            // 0.033 seconds (~30 FPS)
 *
 * // Download speed calculation
 * function calculateDownloadSpeed(
 *   startTime: Temporal.PlainDateTime,
 *   endTime: Temporal.PlainDateTime,
 *   bytesDownloaded: number
 * ): { seconds: number; mbps: number } | null {
 *   const seconds = diffSeconds(startTime)(endTime)
 *   if (seconds === null || seconds === 0) return null
 *
 *   const megabits = (bytesDownloaded * 8) / 1_000_000
 *   const mbps = megabits / seconds
 *
 *   return { seconds, mbps }
 * }
 *
 * const downloadStart = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const downloadEnd = Temporal.PlainDateTime.from("2024-03-15T10:00:45")
 * calculateDownloadSpeed(downloadStart, downloadEnd, 50_000_000)
 * // { seconds: 45, mbps: 8.89 }
 *
 * // Heartbeat interval
 * function getHeartbeatInterval(
 *   beats: Array<Temporal.PlainTime>
 * ): Array<number> {
 *   const intervals: Array<number> = []
 *
 *   for (let i = 1; i < beats.length; i++) {
 *     const interval = diffSeconds(beats[i - 1])(beats[i])
 *     if (interval !== null) intervals.push(interval)
 *   }
 *
 *   return intervals
 * }
 *
 * const heartbeats = [
 *   Temporal.PlainTime.from("10:00:00.000"),
 *   Temporal.PlainTime.from("10:00:00.833"),
 *   Temporal.PlainTime.from("10:00:01.667"),
 *   Temporal.PlainTime.from("10:00:02.500")
 * ]
 * getHeartbeatInterval(heartbeats)        // [0.833, 0.834, 0.833] ~72 BPM
 *
 * // Null handling
 * diffSeconds(null)(time2)                // null
 * diffSeconds(time1)(null)                // null
 * diffSeconds(null)(null)                 // null
 *
 * // Rate limiting check
 * function canMakeRequest(
 *   lastRequest: Temporal.PlainDateTime,
 *   minIntervalSeconds: number = 1
 * ): boolean {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const elapsed = diffSeconds(lastRequest)(now)
 *   return elapsed !== null && elapsed >= minIntervalSeconds
 * }
 *
 * // Audio/video sync
 * function getAudioVideoOffset(
 *   audioTimestamp: Temporal.PlainTime,
 *   videoTimestamp: Temporal.PlainTime
 * ): { offset: number; direction: "audio-ahead" | "video-ahead" | "synced" } | null {
 *   const offset = diffSeconds(audioTimestamp)(videoTimestamp)
 *   if (offset === null) return null
 *
 *   if (Math.abs(offset) < 0.040) {  // 40ms tolerance
 *     return { offset: 0, direction: "synced" }
 *   }
 *
 *   return {
 *     offset: Math.abs(offset),
 *     direction: offset > 0 ? "video-ahead" : "audio-ahead"
 *   }
 * }
 *
 * const audio = Temporal.PlainTime.from("10:00:00.100")
 * const video = Temporal.PlainTime.from("10:00:00.150")
 * getAudioVideoOffset(audio, video)       // { offset: 0.05, direction: "video-ahead" }
 *
 * // Game physics timestep
 * function getPhysicsTimestep(
 *   lastUpdate: Temporal.PlainTime,
 *   currentTime: Temporal.PlainTime,
 *   maxTimestep: number = 0.1  // 100ms max
 * ): number {
 *   const delta = diffSeconds(lastUpdate)(currentTime)
 *   if (delta === null || delta < 0) return 0
 *
 *   return Math.min(delta, maxTimestep)
 * }
 *
 * // Network latency
 * function measureLatency(
 *   sentTime: Temporal.PlainDateTime,
 *   receivedTime: Temporal.PlainDateTime
 * ): { latency: number; milliseconds: number } | null {
 *   const seconds = diffSeconds(sentTime)(receivedTime)
 *   if (seconds === null) return null
 *
 *   return {
 *     latency: seconds,
 *     milliseconds: seconds * 1000
 *   }
 * }
 *
 * const ping = Temporal.PlainDateTime.from("2024-03-15T10:00:00.000")
 * const pong = Temporal.PlainDateTime.from("2024-03-15T10:00:00.047")
 * measureLatency(ping, pong)              // { latency: 0.047, milliseconds: 47 }
 *
 * // Countdown timer
 * function getCountdown(
 *   targetTime: Temporal.PlainDateTime
 * ): { seconds: number; display: string } | null {
 *   const now = Temporal.Now.plainDateTimeISO()
 *   const seconds = diffSeconds(now)(targetTime)
 *
 *   if (seconds === null || seconds < 0) {
 *     return { seconds: 0, display: "00:00" }
 *   }
 *
 *   const minutes = Math.floor(seconds / 60)
 *   const secs = Math.floor(seconds % 60)
 *   const display = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
 *
 *   return { seconds, display }
 * }
 *
 * // Performance timing
 * function measurePerformance<T>(
 *   operation: () => T
 * ): { result: T; seconds: number } | null {
 *   const start = Temporal.Now.plainTimeISO()
 *   const result = operation()
 *   const end = Temporal.Now.plainTimeISO()
 *
 *   const seconds = diffSeconds(start)(end)
 *   if (seconds === null) return null
 *
 *   return { result, seconds }
 * }
 *
 * // GPS update frequency
 * function getUpdateFrequency(
 *   updates: Array<Temporal.PlainDateTime>
 * ): { avgSeconds: number; frequency: number } | null {
 *   if (updates.length < 2) return null
 *
 *   let totalSeconds = 0
 *   let count = 0
 *
 *   for (let i = 1; i < updates.length; i++) {
 *     const interval = diffSeconds(updates[i - 1])(updates[i])
 *     if (interval !== null) {
 *       totalSeconds += interval
 *       count++
 *     }
 *   }
 *
 *   if (count === 0) return null
 *
 *   const avgSeconds = totalSeconds / count
 *   const frequency = 1 / avgSeconds  // Hz
 *
 *   return { avgSeconds, frequency }
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past times, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Returns fractional seconds with nanosecond precision
 */
const diffSeconds = (
	from:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
) =>
(
	to:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (from == null || to == null) {
		return null
	}

	try {
		// Handle different Temporal types
		if (
			from instanceof Temporal.PlainTime && to instanceof Temporal.PlainTime
		) {
			// For PlainTime, calculate assuming same day
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
				from.second * 1e9 +
				from.millisecond * 1e6 + from.microsecond * 1e3 + from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
				to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 1e9 // Convert nanoseconds to seconds
		}

		if (
			from instanceof Temporal.PlainDateTime &&
			to instanceof Temporal.PlainDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours * 3600 + duration.minutes * 60 + duration.seconds +
				duration.milliseconds / 1000 + duration.microseconds / 1000000 +
				duration.nanoseconds / 1000000000
		}

		if (
			from instanceof Temporal.ZonedDateTime &&
			to instanceof Temporal.ZonedDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours * 3600 + duration.minutes * 60 + duration.seconds +
				duration.milliseconds / 1000 + duration.microseconds / 1000000 +
				duration.nanoseconds / 1000000000
		}

		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffSeconds
