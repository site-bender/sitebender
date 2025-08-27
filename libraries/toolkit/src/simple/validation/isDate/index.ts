/**
 * Type guard that checks if a value is a Date object
 *
 * Determines whether a value is an instance of the Date constructor. This includes
 * both valid and invalid dates (e.g., new Date("invalid")). To check if a date is
 * valid, combine with !isNaN(date.getTime()). This function provides TypeScript type
 * narrowing to the Date type, enabling safe date operations.
 *
 * Date detection:
 * - Date instances: created with new Date() or Date.parse()
 * - Invalid dates: still returns true for Invalid Date objects
 * - Cross-realm: may fail for dates from different contexts (iframes)
 * - Not included: date strings, timestamps, or date-like objects
 * - Type narrowing: provides TypeScript type guard
 *
 * @pure
 * @predicate
 * @param value - The value to check
 * @returns True if the value is a Date object, false otherwise
 * @example
 * ```typescript
 * // Valid Date objects
 * isDate(new Date())                      // true
 * isDate(new Date("2024-01-01"))         // true
 * isDate(new Date(Date.now()))           // true
 *
 * // Invalid Date objects (still Date instances)
 * isDate(new Date("invalid"))            // true (Invalid Date)
 *
 * // Not Date objects
 * isDate(Date.now())                     // false (number)
 * isDate("2024-01-01")                   // false (string)
 * isDate(null)                           // false
 *
 * // Type narrowing
 * function formatDate(value: unknown): string {
 *   if (isDate(value)) {
 *     return value.toISOString()  // TypeScript knows it's Date
 *   }
 *   return "Not a date"
 * }
 *
 * // Checking for valid dates
 * const isValidDate = (value: unknown): boolean =>
 *   isDate(value) && !isNaN(value.getTime())
 *
 * // Filtering dates
 * const mixed = [new Date(), "2024-01-01", Date.now(), null]
 * mixed.filter(isDate)  // [Date object]
 * ```
 */
const isDate = (value: unknown): value is Date => value instanceof Date

export default isDate
