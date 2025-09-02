/**
 * Checks if a value is a Temporal.PlainDateTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.PlainDateTime class. This is useful for runtime type checking
 * when working with Temporal API datetime objects. Returns true only for
 * actual Temporal.PlainDateTime instances, not for datetime strings or other
 * datetime-like values that could be converted to PlainDateTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.PlainDateTime instance
 * - Not just datetime-like or convertible to PlainDateTime
 * - Returns false for null, undefined, or any non-PlainDateTime value
 * - Type narrows to Temporal.PlainDateTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.PlainDateTime, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const dt = Temporal.PlainDateTime.from("2024-01-15T12:30:00")
 * isTemporalDateTime(dt)                         // true
 * isTemporalDateTime("2024-01-15T12:30:00")     // false
 * isTemporalDateTime(new Date())                 // false
 * isTemporalDateTime(null)                       // false
 *
 * // Type narrowing
 * function processDateTime(value: unknown): string {
 *   if (isTemporalDateTime(value)) {
 *     return value.toString() // Safe to access PlainDateTime methods
 *   }
 *   return "Not a valid datetime"
 * }
 *
 * // Filtering arrays
 * const mixedValues = [
 *   Temporal.PlainDateTime.from("2024-01-15T10:00:00"),
 *   "2024-01-15T10:00:00",
 *   new Date(),
 *   Temporal.PlainDateTime.from("2024-02-20T14:30:00")
 * ]
 * const onlyPlainDateTimes = mixedValues.filter(isTemporalDateTime)
 * // [PlainDateTime("2024-01-15T10:00:00"), PlainDateTime("2024-02-20T14:30:00")]
 *
 * // Different Temporal types
 * isTemporalDateTime(Temporal.PlainDate.from("2024-01-15"))      // false
 * isTemporalDateTime(Temporal.PlainTime.from("12:30:00"))        // false
 * isTemporalDateTime(Temporal.Instant.from("2024-01-15T12:30:00Z")) // false
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isTemporalDateTime = (
	value: unknown,
): value is Temporal.PlainDateTime => {
	try {
		return value instanceof Temporal.PlainDateTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalDateTime
