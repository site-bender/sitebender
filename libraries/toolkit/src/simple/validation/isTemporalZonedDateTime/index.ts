/**
 * Checks if a value is a Temporal.ZonedDateTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.ZonedDateTime class. This is useful for runtime type checking
 * when working with Temporal API zoned datetime objects (datetime with timezone).
 * Returns true only for actual Temporal.ZonedDateTime instances, not for
 * datetime strings or other values that could be converted to ZonedDateTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.ZonedDateTime instance
 * - Not just datetime-like or convertible to ZonedDateTime
 * - Returns false for null, undefined, or any non-ZonedDateTime value
 * - Type narrows to Temporal.ZonedDateTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.ZonedDateTime, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const zdt = Temporal.ZonedDateTime.from("2024-01-15T12:30:00-05:00[America/New_York]")
 * isTemporalZonedDateTime(zdt)                    // true
 * isTemporalZonedDateTime("2024-01-15T12:30:00Z") // false
 * isTemporalZonedDateTime(new Date())             // false
 * isTemporalZonedDateTime(null)                   // false
 *
 * // Type narrowing
 * function processZonedDateTime(value: unknown): string {
 *   if (isTemporalZonedDateTime(value)) {
 *     return value.toString() // Safe to access ZonedDateTime methods
 *   }
 *   return "Not a valid zoned datetime"
 * }
 *
 * // Filtering arrays
 * const mixedValues = [
 *   Temporal.ZonedDateTime.from("2024-01-15T10:00:00-05:00[America/New_York]"),
 *   "2024-01-15T10:00:00Z",
 *   new Date(),
 *   Temporal.Now.zonedDateTimeISO("Europe/Paris")
 * ]
 * const onlyZonedDateTimes = mixedValues.filter(isTemporalZonedDateTime)
 * // [ZonedDateTime(NY), ZonedDateTime(Paris)]
 *
 * // Timezone conversion
 * function convertToTimezone(value: unknown, tz: string): Temporal.ZonedDateTime | null {
 *   if (!isTemporalZonedDateTime(value)) {
 *     return null
 *   }
 *   return value.withTimeZone(tz)
 * }
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isTemporalZonedDateTime = (
	value: unknown,
): value is Temporal.ZonedDateTime => {
	try {
		return value instanceof Temporal.ZonedDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalZonedDateTime
