/**
 * Checks if a value is a Temporal.Instant instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.Instant class. This is useful for runtime type checking
 * when working with Temporal API instant objects (exact moments in time).
 * Returns true only for actual Temporal.Instant instances, not for
 * timestamp strings or other values that could be converted to Instant.
 *
 * Validation rules:
 * - Must be an actual Temporal.Instant instance
 * - Not just instant-like or convertible to Instant
 * - Returns false for null, undefined, or any non-Instant value
 * - Type narrows to Temporal.Instant when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.Instant, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const inst = Temporal.Instant.from("2024-01-15T12:30:00Z")
 * isTemporalInstant(inst)                         // true
 * isTemporalInstant("2024-01-15T12:30:00Z")       // false
 * isTemporalInstant(Date.now())                   // false
 * isTemporalInstant(null)                         // false
 *
 * // Type narrowing
 * function processInstant(value: unknown): string {
 *   if (isTemporalInstant(value)) {
 *     return value.toString() // Safe to access Instant methods
 *   }
 *   return "Not a valid instant"
 * }
 *
 * // Filtering arrays
 * const mixedValues = [
 *   Temporal.Instant.from("2024-01-15T10:00:00Z"),
 *   "2024-01-15T10:00:00Z",
 *   Date.now(),
 *   Temporal.Now.instant()
 * ]
 * const onlyInstants = mixedValues.filter(isTemporalInstant)
 * // [Instant("2024-01-15T10:00:00Z"), Instant(now)]
 *
 * // Calculate elapsed time
 * function getElapsedSeconds(start: unknown, end: unknown): bigint | null {
 *   if (!isTemporalInstant(start) || !isTemporalInstant(end)) {
 *     return null
 *   }
 *   return (end.epochNanoseconds - start.epochNanoseconds) / 1000000000n
 * }
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isTemporalInstant = (value: unknown): value is Temporal.Instant => {
	try {
		return value instanceof Temporal.Instant
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalInstant
