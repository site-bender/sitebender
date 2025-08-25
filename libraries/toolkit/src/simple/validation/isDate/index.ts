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
 * @param value - The value to check
 * @returns True if the value is a Date object, false otherwise
 * @example
 * ```typescript
 * // Valid Date objects
 * isDate(new Date())                      // true
 * isDate(new Date("2024-01-01"))         // true
 * isDate(new Date(2024, 0, 1))           // true
 * isDate(new Date(Date.now()))           // true
 *
 * // Invalid Date objects (still Date instances)
 * isDate(new Date("invalid"))            // true (Invalid Date)
 * isDate(new Date(NaN))                  // true (Invalid Date)
 * isDate(new Date("2024-13-45"))         // true (Invalid Date)
 *
 * // Not Date objects
 * isDate(Date.now())                     // false (number)
 * isDate("2024-01-01")                   // false (string)
 * isDate("January 1, 2024")              // false (string)
 * isDate(1704067200000)                  // false (timestamp)
 * isDate(null)                           // false
 * isDate(undefined)                      // false
 * isDate({})                             // false
 * isDate([2024, 1, 1])                   // false
 *
 * // Date-like objects are not Dates
 * isDate({
 *   getTime: () => Date.now(),
 *   toISOString: () => "2024-01-01"
 * })                                     // false
 *
 * // Type narrowing in TypeScript
 * function formatDate(value: unknown): string {
 *   if (isDate(value)) {
 *     // TypeScript knows value is Date here
 *     return value.toISOString()
 *   }
 *   return "Not a date"
 * }
 *
 * formatDate(new Date())                 // "2024-01-01T00:00:00.000Z"
 * formatDate("2024-01-01")               // "Not a date"
 * formatDate(Date.now())                 // "Not a date"
 *
 * // Checking for valid dates
 * function isValidDate(value: unknown): boolean {
 *   return isDate(value) && !isNaN(value.getTime())
 * }
 *
 * isValidDate(new Date())                // true
 * isValidDate(new Date("2024-01-01"))    // true
 * isValidDate(new Date("invalid"))       // false
 * isValidDate("2024-01-01")              // false
 *
 * // Filtering dates from mixed array
 * const mixed = [
 *   new Date("2024-01-01"),
 *   "2024-01-01",
 *   Date.now(),
 *   new Date("invalid"),
 *   null,
 *   new Date(2024, 0, 15)
 * ]
 *
 * const dates = mixed.filter(isDate)
 * // [Date("2024-01-01"), Date("Invalid Date"), Date("2024-01-15")]
 *
 * const validDates = mixed.filter(value =>
 *   isDate(value) && !isNaN(value.getTime())
 * )
 * // [Date("2024-01-01"), Date("2024-01-15")]
 *
 * // Date comparison helper
 * function compareDates(a: unknown, b: unknown): number {
 *   if (!isDate(a) || !isDate(b)) {
 *     throw new Error("Both values must be dates")
 *   }
 *   return a.getTime() - b.getTime()
 * }
 *
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-06-01")
 * compareDates(date1, date2)             // negative (date1 before date2)
 *
 * // Date range validation
 * function isInRange(
 *   value: unknown,
 *   start: Date,
 *   end: Date
 * ): boolean {
 *   if (!isDate(value)) return false
 *   const time = value.getTime()
 *   return time >= start.getTime() && time <= end.getTime()
 * }
 *
 * const testDate = new Date("2024-03-15")
 * const rangeStart = new Date("2024-01-01")
 * const rangeEnd = new Date("2024-12-31")
 * isInRange(testDate, rangeStart, rangeEnd)  // true
 * isInRange("2024-03-15", rangeStart, rangeEnd) // false
 *
 * // Age calculation
 * function calculateAge(birthDate: unknown): number | null {
 *   if (!isDate(birthDate)) return null
 *
 *   const today = new Date()
 *   const birth = birthDate
 *   let age = today.getFullYear() - birth.getFullYear()
 *   const monthDiff = today.getMonth() - birth.getMonth()
 *
 *   if (monthDiff < 0 ||
 *       (monthDiff === 0 && today.getDate() < birth.getDate())) {
 *     age--
 *   }
 *
 *   return age
 * }
 *
 * calculateAge(new Date("1990-06-15"))   // 34 (in 2024)
 * calculateAge("1990-06-15")             // null (not a Date)
 *
 * // Parsing with validation
 * function parseDate(value: unknown): Date | null {
 *   if (isDate(value)) {
 *     return value
 *   }
 *   if (typeof value === "string" || typeof value === "number") {
 *     const date = new Date(value)
 *     return isNaN(date.getTime()) ? null : date
 *   }
 *   return null
 * }
 *
 * parseDate(new Date())                  // Date object
 * parseDate("2024-01-01")                // Date object
 * parseDate(1704067200000)               // Date object
 * parseDate("invalid")                   // null
 * parseDate({})                          // null
 *
 * // Event scheduling
 * interface Event {
 *   name: string
 *   date: unknown
 * }
 *
 * function getUpcomingEvents(events: Event[]): Event[] {
 *   const now = new Date()
 *   return events.filter(event =>
 *     isDate(event.date) && event.date.getTime() > now.getTime()
 *   )
 * }
 *
 * // Date serialization check
 * function serializeDate(value: unknown): string | null {
 *   if (isDate(value)) {
 *     return value.toJSON()
 *   }
 *   return null
 * }
 *
 * serializeDate(new Date("2024-01-01"))  // "2024-01-01T00:00:00.000Z"
 * serializeDate("2024-01-01")            // null
 * serializeDate(new Date("invalid"))     // null (toJSON returns null)
 *
 * // Temporal operations safety
 * function addDays(date: unknown, days: number): Date | null {
 *   if (!isDate(date)) return null
 *
 *   const result = new Date(date)
 *   result.setDate(result.getDate() + days)
 *   return result
 * }
 *
 * addDays(new Date("2024-01-01"), 30)    // Date("2024-01-31")
 * addDays("2024-01-01", 30)              // null
 *
 * // React component props
 * interface DatePickerProps {
 *   value?: unknown
 *   min?: Date
 *   max?: Date
 * }
 *
 * function DatePicker({ value, min, max }: DatePickerProps) {
 *   const currentValue = isDate(value) ? value : new Date()
 *   // ... render date picker
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to Date
 * @property Instanceof - Uses instanceof Date internally
 * @property Inclusive - Returns true for invalid Date objects too
 */
const isDate = (value: unknown): value is Date => value instanceof Date

export default isDate
