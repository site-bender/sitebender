/**
 * Checks if a value is a Temporal.PlainDate instance
 *
 * Type guard that validates whether a value is an instance of the
 * Temporal.PlainDate class. This is useful for runtime type checking
 * when working with Temporal API date objects. Returns true only for
 * actual Temporal.PlainDate instances, not for date strings or other
 * date-like values that could be converted to PlainDate.
 *
 * Validation rules:
 * - Must be an actual Temporal.PlainDate instance
 * - Not just date-like or convertible to PlainDate
 * - Returns false for null, undefined, or any non-PlainDate value
 * - Type narrows to Temporal.PlainDate when true
 *
 * @param value - The value to check
 * @returns True if value is a Temporal.PlainDate, false otherwise
 * @example
 * ```typescript
 * // Valid PlainDate instances
 * const date = Temporal.PlainDate.from("2024-01-15")
 * isTemporalDate(date)                  // true
 * isTemporalDate(Temporal.Now.plainDateISO())  // true
 *
 * // Invalid - not PlainDate instances
 * isTemporalDate("2024-01-15")          // false (string)
 * isTemporalDate(new Date())            // false (JS Date)
 * isTemporalDate({ year: 2024, month: 1, day: 15 })  // false
 * isTemporalDate(null)                  // false
 *
 * // Type narrowing
 * function processDate(value: unknown): string {
 *   if (isTemporalDate(value)) {
 *     return value.toString() // TypeScript knows it's PlainDate
 *   }
 *   return "Not a date"
 * }
 *
 * // Filtering arrays
 * const mixed = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   "2024-01-15",
 *   new Date(),
 *   Temporal.PlainDate.from("2024-02-20")
 * ]
 * const dates = mixed.filter(isTemporalDate)
 * // [PlainDate("2024-01-15"), PlainDate("2024-02-20")]
 *
 * // Validation with null safety
 * function addDays(
 *   date: unknown,
 *   days: number
 * ): Temporal.PlainDate | null {
 *   return isTemporalDate(date)
 *     ? date.add({ days })
 *     : null
 * }
 * ```
 *
 * @predicate
 * @pure
 * @safe
 */
const isTemporalDate = (value: unknown): value is Temporal.PlainDate => {
	try {
		return value instanceof Temporal.PlainDate
	} catch {
		// In case Temporal is not available
		return false
	}
}

export default isTemporalDate