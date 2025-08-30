import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Gets the nanosecond component from a Temporal time or datetime
 *
 * Extracts the nanosecond component (0-999,999,999) from a Temporal PlainTime,
 * PlainDateTime, or ZonedDateTime. Nanoseconds represent the finest time precision
 * available in Temporal, where 1 second = 1,000,000,000 nanoseconds. This includes
 * the full sub-second precision: milliseconds, microseconds, and nanoseconds.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @param time - The Temporal object to get nanosecond from
 * @returns The nanosecond (0-999,999,999), or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainTime
 * const time = Temporal.PlainTime.from("10:30:45.123456789")
 * getNanosecond(time)                     // 123456789
 *
 * const milliPrecision = Temporal.PlainTime.from("10:30:45.123")
 * getNanosecond(milliPrecision)           // 123000000 (123 ms in nanoseconds)
 *
 * const noPrecision = Temporal.PlainTime.from("10:30:45")
 * getNanosecond(noPrecision)              // 0 (no sub-second precision)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:30:45.987654321")
 * getNanosecond(datetime)                 // 987654321
 *
 * // With ZonedDateTime  
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T16:30:45.500250125-05:00[America/New_York]"
 * )
 * getNanosecond(zonedDateTime)            // 500250125
 *
 * // Precision levels breakdown
 * const getPrecisionBreakdown = (time: Temporal.PlainTime): {
 *   milliseconds: number,
 *   microseconds: number,
 *   nanoseconds: number
 * } | null => {
 *   const totalNanos = getNanosecond(time)
 *   if (totalNanos === null) return null
 *
 *   const milliseconds = Math.floor(totalNanos / 1000000)
 *   const microseconds = Math.floor((totalNanos % 1000000) / 1000)
 *   const nanoseconds = totalNanos % 1000
 *
 *   return { milliseconds, microseconds, nanoseconds }
 * }
 *
 * getPrecisionBreakdown(Temporal.PlainTime.from("10:30:45.123456789"))
 * // { milliseconds: 123, microseconds: 456, nanoseconds: 789 }
 *
 * // Null handling
 * getNanosecond(null)                     // null
 * getNanosecond(undefined)                // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @precision Provides nanosecond precision (billionths of a second)
 * @range Returns 0-999,999,999 nanoseconds within a second
 */
const getNanosecond = (
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
		return time.nanosecond
	} catch {
		return null
	}
}

export default getNanosecond
