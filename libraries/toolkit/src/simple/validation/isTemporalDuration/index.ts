/**
 * Checks if a value is a Temporal.Duration instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.Duration class. This is useful for runtime type checking
 * when working with Temporal API duration objects. Returns true only for
 * actual Temporal.Duration instances, not for duration strings or other
 * duration-like values that could be converted to Duration.
 *
 * Validation rules:
 * - Must be an actual Temporal.Duration instance
 * - Not just duration-like or convertible to Duration
 * - Returns false for null, undefined, or any non-Duration value
 * - Type narrows to Temporal.Duration when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.Duration, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const dur = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * isTemporalDuration(dur)                        // true
 * isTemporalDuration("PT2H30M")                  // false
 * isTemporalDuration({ hours: 2, minutes: 30 })  // false
 * isTemporalDuration(null)                       // false
 *
 * // Type narrowing
 * function processDuration(value: unknown): string {
 *   if (isTemporalDuration(value)) {
 *     return value.toString() // Safe to access Duration methods
 *   }
 *   return "Not a valid duration"
 * }
 *
 * // Filtering arrays
 * const mixedValues = [
 *   Temporal.Duration.from({ hours: 1 }),
 *   "PT1H",
 *   { hours: 2 },
 *   Temporal.Duration.from({ days: 1 })
 * ]
 * const onlyDurations = mixedValues.filter(isTemporalDuration)
 * // [Duration(PT1H), Duration(P1D)]
 *
 * // Total duration calculation
 * const durations = [
 *   Temporal.Duration.from({ hours: 2 }),
 *   Temporal.Duration.from({ minutes: 30 })
 * ]
 * const total = durations
 *   .filter(isTemporalDuration)
 *   .reduce((sum, dur) => sum.add(dur), Temporal.Duration.from({ hours: 0 }))
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isTemporalDuration = (value: unknown): value is Temporal.Duration => {
	try {
		return value instanceof Temporal.Duration
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalDuration
