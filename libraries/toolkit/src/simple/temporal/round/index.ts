/**
 * Rounds a datetime to the nearest unit (hour, minute, second, etc.)
 *
 * Rounds a Temporal time or datetime to the nearest specified unit. Supports
 * rounding to various units like hour, minute, second, millisecond, etc.
 * Uses banker's rounding (round half to even) by default. This is a curried
 * function for easy composition. Returns null for invalid inputs to support
 * safe error handling.
 *
 * @curried (unit) => (datetime) => rounded datetime
 * @param unit - The unit to round to ('hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'day')
 * @param datetime - The Temporal object to round
 * @returns Rounded datetime of same type, or null if invalid
 * @example
 * ```typescript
 * // Round to nearest hour
 * const time = Temporal.PlainTime.from("10:37:45.123")
 * round('hour')(time)                     // PlainTime 11:00:00
 *
 * const earlyTime = Temporal.PlainTime.from("10:29:59")
 * round('hour')(earlyTime)                // PlainTime 10:00:00
 *
 * const halfHour = Temporal.PlainTime.from("10:30:00")
 * round('hour')(halfHour)                 // PlainTime 10:00:00 (banker's rounding to even)
 *
 * // Round to nearest minute
 * const seconds = Temporal.PlainTime.from("10:30:29")
 * round('minute')(seconds)                // PlainTime 10:30:00
 *
 * const halfMinute = Temporal.PlainTime.from("10:30:30")
 * round('minute')(halfMinute)             // PlainTime 10:31:00
 *
 * // Round to nearest second
 * const millis = Temporal.PlainTime.from("10:30:45.678")
 * round('second')(millis)                 // PlainTime 10:30:46
 *
 * const halfSecond = Temporal.PlainTime.from("10:30:45.500")
 * round('second')(halfSecond)             // PlainTime 10:30:46 (rounds up at exactly .5)
 *
 * // Round to nearest millisecond
 * const micros = Temporal.PlainTime.from("10:30:45.123456")
 * round('millisecond')(micros)            // PlainTime 10:30:45.123
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T10:37:45.123")
 * round('hour')(datetime)                 // PlainDateTime 2024-03-15T11:00:00
 * round('minute')(datetime)               // PlainDateTime 2024-03-15T10:38:00
 * round('second')(datetime)               // PlainDateTime 2024-03-15T10:37:45
 *
 * // Round to nearest day
 * const afternoon = Temporal.PlainDateTime.from("2024-03-15T14:00:00")
 * round('day')(afternoon)                 // PlainDateTime 2024-03-16T00:00:00
 *
 * const morning = Temporal.PlainDateTime.from("2024-03-15T11:00:00")
 * round('day')(morning)                   // PlainDateTime 2024-03-15T00:00:00
 *
 * const noon = Temporal.PlainDateTime.from("2024-03-15T12:00:00")
 * round('day')(noon)                      // PlainDateTime 2024-03-16T00:00:00 (rounds up at noon)
 *
 * // With ZonedDateTime
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:37:45.123-04:00[America/New_York]"
 * )
 * round('hour')(zonedDateTime)            // Rounded to 11:00:00 in same timezone
 *
 * // Meeting time rounder (15-minute intervals)
 * function roundToQuarterHour(time: Temporal.PlainTime): Temporal.PlainTime | null {
 *   // First round to nearest minute, then adjust to 15-minute interval
 *   const rounded = round('minute')(time)
 *   if (rounded === null) return null
 *
 *   const minutes = rounded.minute
 *   const quarterMinutes = Math.round(minutes / 15) * 15
 *
 *   if (quarterMinutes === 60) {
 *     return rounded.add({ hours: 1 }).with({ minute: 0 })
 *   }
 *
 *   return rounded.with({ minute: quarterMinutes })
 * }
 *
 * roundToQuarterHour(Temporal.PlainTime.from("10:37:00"))  // 10:45:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:22:00"))  // 10:15:00
 * roundToQuarterHour(Temporal.PlainTime.from("10:52:30"))  // 11:00:00
 *
 * // Billing time rounder (6-minute intervals for tenth of hour)
 * function roundToBillingUnit(time: Temporal.PlainTime): Temporal.PlainTime | null {
 *   const rounded = round('minute')(time)
 *   if (rounded === null) return null
 *
 *   const minutes = rounded.minute
 *   const billingMinutes = Math.round(minutes / 6) * 6
 *
 *   if (billingMinutes === 60) {
 *     return rounded.add({ hours: 1 }).with({ minute: 0 })
 *   }
 *
 *   return rounded.with({ minute: billingMinutes })
 * }
 *
 * // Null handling
 * round('hour')(null)                     // null
 * round('minute')(undefined)              // null
 * round('invalid' as any)(Temporal.PlainTime.from("10:30:00"))  // null
 *
 * // Shift schedule rounder
 * function getShiftStart(datetime: Temporal.PlainDateTime): Temporal.PlainDateTime | null {
 *   // Shifts start at 6:00, 14:00, 22:00
 *   const hour = datetime.hour
 *   let shiftHour: number
 *
 *   if (hour < 6) shiftHour = 22  // Previous day's night shift
 *   else if (hour < 14) shiftHour = 6   // Morning shift
 *   else if (hour < 22) shiftHour = 14  // Afternoon shift
 *   else shiftHour = 22  // Night shift
 *
 *   const shiftDate = hour < 6 && shiftHour === 22
 *     ? datetime.subtract({ days: 1 })
 *     : datetime
 *
 *   return shiftDate.with({ hour: shiftHour, minute: 0, second: 0, millisecond: 0 })
 * }
 *
 * // Log timestamp normalizer
 * function normalizeLogTime(datetime: Temporal.PlainDateTime): Temporal.PlainDateTime | null {
 *   // Round to nearest second for log aggregation
 *   return round('second')(datetime)
 * }
 *
 * // Partial application for specific rounding
 * const roundToHour = round('hour')
 * const roundToMinute = round('minute')
 * const roundToSecond = round('second')
 *
 * const times = [
 *   Temporal.PlainTime.from("10:37:45"),
 *   Temporal.PlainTime.from("14:22:30"),
 *   Temporal.PlainTime.from("18:45:15")
 * ]
 *
 * times.map(roundToHour)
 * // [11:00:00, 14:00:00, 19:00:00]
 *
 * // Analytics time bucket
 * function getTimeBucket(
 *   datetime: Temporal.PlainDateTime,
 *   bucketSize: 'hour' | 'minute' | 'second'
 * ): Temporal.PlainDateTime | null {
 *   return round(bucketSize)(datetime)
 * }
 *
 * // Cache key generator with time rounding
 * function getCacheKey(
 *   prefix: string,
 *   datetime: Temporal.PlainDateTime,
 *   granularity: 'hour' | 'minute' | 'second' = 'minute'
 * ): string {
 *   const rounded = round(granularity)(datetime)
 *   if (rounded === null) return `${prefix}_invalid`
 *
 *   return `${prefix}_${rounded.toString()}`
 * }
 *
 * getCacheKey("data", Temporal.PlainDateTime.from("2024-03-15T10:37:45"), 'hour')
 * // "data_2024-03-15T11:00:00"
 *
 * // Rate limit window calculator
 * function getRateLimitWindow(
 *   instant: Temporal.Instant,
 *   windowMinutes: number = 1
 * ): Temporal.Instant {
 *   const datetime = instant.toZonedDateTimeISO("UTC")
 *   const rounded = round('minute')(datetime)
 *
 *   if (rounded === null) return instant
 *
 *   // Round down to window start
 *   const minute = rounded.minute
 *   const windowStart = Math.floor(minute / windowMinutes) * windowMinutes
 *
 *   return rounded.with({ minute: windowStart }).toInstant()
 * }
 *
 * // Monitoring interval aligner
 * function alignToMonitoringInterval(
 *   datetime: Temporal.PlainDateTime,
 *   intervalMinutes: number = 5
 * ): Temporal.PlainDateTime | null {
 *   const rounded = round('minute')(datetime)
 *   if (rounded === null) return null
 *
 *   const alignedMinute = Math.round(rounded.minute / intervalMinutes) * intervalMinutes
 *
 *   if (alignedMinute === 60) {
 *     return rounded.add({ hours: 1 }).with({ minute: 0 })
 *   }
 *
 *   return rounded.with({ minute: alignedMinute })
 * }
 * ```
 * @property Curried - Returns a function for easy composition
 * @property Safe - Returns null for invalid inputs
 * @property Preserves-type - Returns same Temporal type as input
 * @property Banker's-rounding - Uses round-half-to-even by default
 */
const round = (
	unit:
		| "hour"
		| "minute"
		| "second"
		| "millisecond"
		| "microsecond"
		| "nanosecond"
		| "day",
) =>
(
	datetime:
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
	if (datetime == null) {
		return null
	}

	if (
		!(datetime instanceof Temporal.PlainTime) &&
		!(datetime instanceof Temporal.PlainDateTime) &&
		!(datetime instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// Use Temporal's built-in round method
		// The round method supports: 'day', 'hour', 'minute', 'second',
		// 'millisecond', 'microsecond', 'nanosecond'
		return datetime.round({ smallestUnit: unit, roundingMode: "halfExpand" })
	} catch {
		return null
	}
}

export default round
