/**
 * Checks if a value is a Temporal.PlainTime instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.PlainTime class. This is useful for runtime type checking
 * when working with Temporal API time objects. Returns true only for
 * actual Temporal.PlainTime instances, not for time strings or other
 * time-like values that could be converted to PlainTime.
 *
 * Validation rules:
 * - Must be an actual Temporal.PlainTime instance
 * - Not just time-like or convertible to PlainTime
 * - Returns false for null, undefined, or any non-PlainTime value
 * - Type narrows to Temporal.PlainTime when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.PlainTime, false otherwise
 * @example
 * ```typescript
 * // Basic validation
 * const time = Temporal.PlainTime.from("14:30:00")
 * isTemporalTime(time)                  // true
 * isTemporalTime("14:30:00")            // false (string)
 * isTemporalTime(new Date())            // false (JS Date)
 * isTemporalTime(null)                  // false
 *
 * // Type narrowing
 * function processTime(value: unknown): string {
 *   if (isTemporalTime(value)) {
 *     return value.toString() // TypeScript knows it's PlainTime
 *   }
 *   return "Not a time"
 * }
 *
 * // Filtering arrays
 * const mixed = [
 *   Temporal.PlainTime.from("09:00"),
 *   "09:00",
 *   Temporal.PlainTime.from("17:30")
 * ]
 * const times = mixed.filter(isTemporalTime)
 * // [PlainTime("09:00"), PlainTime("17:30")]
 *
 * // Validation with null safety
 * function addMinutes(
 *   time: unknown,
 *   minutes: number
 * ): Temporal.PlainTime | null {
 *   return isTemporalTime(time)
 *     ? time.add({ minutes })
 *     : null
 * }
 * ```
 *
 * @predicate
 * @pure
 */
const isTemporalTime = (value: unknown): value is Temporal.PlainTime => {
	try {
		return value instanceof Temporal.PlainTime
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalTime
