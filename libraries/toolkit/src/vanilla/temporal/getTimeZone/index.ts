import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets the time zone identifier from a Temporal ZonedDateTime
 *
 * Extracts the time zone identifier string from a Temporal ZonedDateTime object.
 * Returns the IANA time zone name (e.g., "America/New_York", "Europe/London",
 * "Asia/Tokyo") or an offset string (e.g., "+05:30", "-08:00"). Returns null
 * for invalid inputs or non-ZonedDateTime objects to support safe error handling.
 *
 * @param zonedDateTime - The ZonedDateTime to get time zone from
 * @returns The time zone identifier string, or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * const nyTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00-04:00[America/New_York]"
 * )
 * getTimeZone(nyTime)                     // "America/New_York"
 *
 * const tokyoTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T23:30:00+09:00[Asia/Tokyo]"
 * )
 * getTimeZone(tokyoTime)                  // "Asia/Tokyo"
 *
 * // Offset-only time zones
 * const offsetTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00+05:30[+05:30]"
 * )
 * getTimeZone(offsetTime)                 // "+05:30"
 *
 * const utcTime = Temporal.ZonedDateTime.from(
 *   "2024-03-15T10:30:00Z[UTC]"
 * )
 * getTimeZone(utcTime)                    // "UTC"
 *
 * // Composition example
 * const isSameTimeZone = (
 *   zdt1: Temporal.ZonedDateTime,
 *   zdt2: Temporal.ZonedDateTime
 * ): boolean => getTimeZone(zdt1) === getTimeZone(zdt2)
 *
 * // Edge cases - Non-ZonedDateTime objects
 * getTimeZone(null)                       // null
 * getTimeZone(undefined)                  // null
 * const plainDate = Temporal.PlainDate.from("2024-03-15")
 * getTimeZone(plainDate as any)           // null
 * ```
 * @pure
 * @safe
 */
const getTimeZone = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): string | null => {
	if (isNullish(zonedDateTime)) {
		return null
	}

	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}

	try {
		return zonedDateTime.timeZoneId
	} catch {
		return null
	}
}

export default getTimeZone
