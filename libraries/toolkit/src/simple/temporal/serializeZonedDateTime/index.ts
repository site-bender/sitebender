import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Serializes ZonedDateTime for storage/transmission
 *
 * Converts a Temporal.ZonedDateTime into a serializable JSON object that
 * preserves all timezone and instant information. The serialized format
 * can be safely stored in databases, transmitted over networks, or cached,
 * and later reconstructed back to a ZonedDateTime. Returns null for invalid
 * inputs to support safe error handling.
 *
 * @param zonedDateTime - The ZonedDateTime to serialize
 * @returns Serialized object with instant and timezone info, or null if invalid
 * @example
 * ```typescript
 * // Basic serialization
 * const zdt = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * serializeZonedDateTime(zdt)
 * // {
 * //   instant: "2024-03-15T18:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "iso8601",
 * //   offset: "-04:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710519000000000000"
 * // }
 *
 * // Serialize different timezone
 * const london = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[Europe/London]")
 * serializeZonedDateTime(london)
 * // {
 * //   instant: "2024-03-15T14:30:00Z",
 * //   timeZone: "Europe/London",
 * //   calendar: "iso8601",
 * //   offset: "+00:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710511800000000000"
 * // }
 *
 * // Serialize with subsecond precision
 * const precise = Temporal.ZonedDateTime.from("2024-03-15T14:30:00.123456789[UTC]")
 * serializeZonedDateTime(precise)
 * // {
 * //   instant: "2024-03-15T14:30:00.123456789Z",
 * //   timeZone: "UTC",
 * //   calendar: "iso8601",
 * //   offset: "+00:00",
 * //   plainDateTime: "2024-03-15T14:30:00.123456789",
 * //   epochNanoseconds: "1710511800123456789"
 * // }
 *
 * // Serialize during DST transition
 * const dstTime = Temporal.ZonedDateTime.from("2024-03-10T14:30:00[America/New_York]")
 * serializeZonedDateTime(dstTime)
 * // {
 * //   instant: "2024-03-10T19:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "iso8601",
 * //   offset: "-05:00", // Still EST before DST switch
 * //   plainDateTime: "2024-03-10T14:30:00",
 * //   epochNanoseconds: "1710094200000000000"
 * // }
 *
 * // Serialize with custom calendar
 * const customCal = zdt.withCalendar("hebrew")
 * serializeZonedDateTime(customCal)
 * // {
 * //   instant: "2024-03-15T18:30:00Z",
 * //   timeZone: "America/New_York",
 * //   calendar: "hebrew",
 * //   offset: "-04:00",
 * //   plainDateTime: "2024-03-15T14:30:00",
 * //   epochNanoseconds: "1710519000000000000"
 * // }
 *
 * // API response serialization
 * const events = [
 *   {
 *     name: "Meeting",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T09:00:00[America/New_York]")
 *   },
 *   {
 *     name: "Lunch",
 *     time: Temporal.ZonedDateTime.from("2024-03-15T12:30:00[America/New_York]")
 *   }
 * ]
 * const response = {
 *   events: events.map(event => ({
 *     name: event.name,
 *     time: serializeZonedDateTime(event.time)
 *   }))
 * }
 *
 * // Null/undefined handling
 * serializeZonedDateTime(null)                      // null
 * serializeZonedDateTime(undefined)                 // null
 *
 * // Batch serialization
 * const zdts = [
 *   Temporal.ZonedDateTime.from("2024-03-15T09:00:00[America/New_York]"),
 *   Temporal.ZonedDateTime.from("2024-03-15T14:00:00[Europe/London]")
 * ]
 * const serialized = zdts.map(serializeZonedDateTime)
 * 
 * // Round-trip example
 * const original = Temporal.ZonedDateTime.from("2024-03-15T14:30:00[America/New_York]")
 * const serialized2 = serializeZonedDateTime(original)
 * // Can later reconstruct using Temporal.Instant.from(serialized2.instant)
 * ```
 * @pure
 * @safe
 */
const serializeZonedDateTime = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): {
	instant: string
	timeZone: string
	calendar: string
	offset: string
	plainDateTime: string
	epochNanoseconds: string
} | null => {
	if (isNullish(zonedDateTime)) {
		return null
	}

	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}

	try {
		return {
			// ISO 8601 instant string (UTC) - universally compatible
			instant: zonedDateTime.toInstant().toString(),

			// Timezone identifier for reconstruction
			timeZone: zonedDateTime.timeZoneId,

			// Calendar system
			calendar: zonedDateTime.calendarId,

			// Current offset at this specific time (handles DST)
			offset: zonedDateTime.offset,

			// Local date/time representation
			plainDateTime: zonedDateTime.toPlainDateTime().toString(),

			// Nanoseconds since epoch for precise reconstruction
			epochNanoseconds: zonedDateTime.epochNanoseconds.toString(),
		}
	} catch {
		return null
	}
}

export default serializeZonedDateTime
