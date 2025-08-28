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
 * // Basic usage
 * const time = Temporal.PlainTime.from("10:30:45")
 * getSecond(time)                         // 45
 *
 * const precise = Temporal.PlainTime.from("14:23:17.456")
 * getSecond(precise)                      // 17 (ignores milliseconds)
 *
 * const topOfMinute = Temporal.PlainTime.from("09:15:00")
 * getSecond(topOfMinute)                  // 0
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:42")
 * getSecond(datetime)                     // 42
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:25:38-04:00[America/New_York]"
 * )
 * getSecond(zonedDateTime)                // 38
 *
 * // Composition example
 * const getSecondsUntilNextMinute = (time: Temporal.PlainTime): number => {
 *   const second = getSecond(time)
 *   return second === null || second === 0 ? 0 : 60 - second
 * }
 *
 * // Edge cases
 * getSecond(null)                         // null
 * getSecond(undefined)                    // null
 * getSecond("10:30:45")                  // null (string, not Temporal)
 * ```
 * @pure
 * @safe
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
