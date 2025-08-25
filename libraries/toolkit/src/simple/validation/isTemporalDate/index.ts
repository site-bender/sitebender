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
 * // Valid Temporal.PlainDate instances
 * const date1 = Temporal.PlainDate.from("2024-01-15")
 * const date2 = new Temporal.PlainDate(2024, 1, 15)
 * const date3 = Temporal.Now.plainDateISO()
 *
 * isTemporalDate(date1)  // true
 * isTemporalDate(date2)  // true
 * isTemporalDate(date3)  // true
 *
 * // Invalid - not PlainDate instances
 * isTemporalDate("2024-01-15")                    // false (string)
 * isTemporalDate(new Date("2024-01-15"))          // false (JS Date)
 * isTemporalDate({ year: 2024, month: 1, day: 15 }) // false (date-like object)
 * isTemporalDate(Temporal.PlainDateTime.from("2024-01-15T12:00:00")) // false (DateTime)
 * isTemporalDate(Temporal.PlainTime.from("12:00:00")) // false (Time)
 * isTemporalDate(null)                            // false
 * isTemporalDate(undefined)                       // false
 * isTemporalDate(123)                             // false
 * isTemporalDate([2024, 1, 15])                   // false
 *
 * // Type narrowing with TypeScript
 * function processDate(value: unknown): string {
 *   if (isTemporalDate(value)) {
 *     // TypeScript now knows value is Temporal.PlainDate
 *     return value.toString() // Can access PlainDate methods
 *   }
 *   return "Not a valid date"
 * }
 *
 * // Filtering mixed arrays
 * const mixedValues = [
 *   Temporal.PlainDate.from("2024-01-15"),
 *   "2024-01-15",
 *   new Date(),
 *   Temporal.PlainDate.from("2024-02-20"),
 *   null,
 *   { year: 2024, month: 3, day: 25 }
 * ]
 *
 * const onlyPlainDates = mixedValues.filter(isTemporalDate)
 * // [PlainDate("2024-01-15"), PlainDate("2024-02-20")]
 *
 * // Validation in function parameters
 * function addDaysToDate(
 *   date: unknown,
 *   days: number
 * ): Temporal.PlainDate | null {
 *   if (!isTemporalDate(date)) {
 *     return null
 *   }
 *   return date.add({ days })
 * }
 *
 * const validDate = Temporal.PlainDate.from("2024-01-15")
 * addDaysToDate(validDate, 5)     // PlainDate("2024-01-20")
 * addDaysToDate("2024-01-15", 5)  // null (string not accepted)
 *
 * // Strict type checking in APIs
 * function validateApiInput(input: unknown): {
 *   valid: boolean
 *   error?: string
 * } {
 *   if (input === null || input === undefined) {
 *     return { valid: false, error: "Date is required" }
 *   }
 *
 *   if (!isTemporalDate(input)) {
 *     return {
 *       valid: false,
 *       error: "Must be a Temporal.PlainDate instance"
 *     }
 *   }
 *
 *   return { valid: true }
 * }
 *
 * // Conditional operations
 * function formatDateValue(value: unknown): string {
 *   if (isTemporalDate(value)) {
 *     // Format as ISO date
 *     return value.toString()
 *   }
 *
 *   if (value instanceof Date) {
 *     // Convert JS Date to ISO string
 *     return value.toISOString().split('T')[0]
 *   }
 *
 *   if (typeof value === "string") {
 *     // Assume it's already a date string
 *     return value
 *   }
 *
 *   return "Invalid date"
 * }
 *
 * // Method chaining safety
 * function getMonthName(value: unknown): string | null {
 *   if (!isTemporalDate(value)) {
 *     return null
 *   }
 *
 *   // Safe to use PlainDate methods
 *   const monthNames = [
 *     "January", "February", "March", "April", "May", "June",
 *     "July", "August", "September", "October", "November", "December"
 *   ]
 *
 *   return monthNames[value.month - 1]
 * }
 *
 * // Comparing different Temporal types
 * function getTemporalType(value: unknown): string {
 *   if (isTemporalDate(value)) {
 *     return "PlainDate"
 *   }
 *
 *   // Would need separate checks for other types
 *   if (value instanceof Temporal.PlainDateTime) {
 *     return "PlainDateTime"
 *   }
 *
 *   if (value instanceof Temporal.PlainTime) {
 *     return "PlainTime"
 *   }
 *
 *   if (value instanceof Temporal.ZonedDateTime) {
 *     return "ZonedDateTime"
 *   }
 *
 *   if (value instanceof Temporal.Instant) {
 *     return "Instant"
 *   }
 *
 *   return "Not a Temporal type"
 * }
 *
 * // Working with optional dates
 * interface Event {
 *   name: string
 *   date?: unknown
 * }
 *
 * function getEventYear(event: Event): number | null {
 *   if (event.date && isTemporalDate(event.date)) {
 *     return event.date.year
 *   }
 *   return null
 * }
 *
 * // Data transformation pipeline
 * function processDateArray(values: Array<unknown>): Array<{
 *   original: unknown
 *   isValid: boolean
 *   formatted?: string
 * }> {
 *   return values.map(value => {
 *     if (isTemporalDate(value)) {
 *       return {
 *         original: value,
 *         isValid: true,
 *         formatted: value.toString()
 *       }
 *     }
 *
 *     return {
 *       original: value,
 *       isValid: false
 *     }
 *   })
 * }
 *
 * // Calendar operations
 * function isSameMonth(
 *   date1: unknown,
 *   date2: unknown
 * ): boolean {
 *   if (!isTemporalDate(date1) || !isTemporalDate(date2)) {
 *     return false
 *   }
 *
 *   return date1.year === date2.year && date1.month === date2.month
 * }
 *
 * // Sorting mixed date types
 * function sortDates(values: Array<unknown>): Array<Temporal.PlainDate> {
 *   return values
 *     .filter(isTemporalDate)
 *     .sort(Temporal.PlainDate.compare)
 * }
 *
 * // Date range validation
 * function isDateInRange(
 *   date: unknown,
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate
 * ): boolean {
 *   if (!isTemporalDate(date)) {
 *     return false
 *   }
 *
 *   return Temporal.PlainDate.compare(date, start) >= 0 &&
 *          Temporal.PlainDate.compare(date, end) <= 0
 * }
 *
 * // Serialization helper
 * function serializeValue(value: unknown): string {
 *   if (isTemporalDate(value)) {
 *     return JSON.stringify({
 *       type: "PlainDate",
 *       value: value.toString()
 *     })
 *   }
 *
 *   return JSON.stringify(value)
 * }
 *
 * // Factory pattern with validation
 * function createDateOrNull(value: unknown): Temporal.PlainDate | null {
 *   if (isTemporalDate(value)) {
 *     return value // Already a PlainDate
 *   }
 *
 *   if (typeof value === "string") {
 *     try {
 *       return Temporal.PlainDate.from(value)
 *     } catch {
 *       return null
 *     }
 *   }
 *
 *   return null
 * }
 *
 * // React/UI component prop validation
 * interface DateDisplayProps {
 *   date: unknown
 *   format?: string
 * }
 *
 * function DateDisplay({ date, format }: DateDisplayProps): string {
 *   if (!isTemporalDate(date)) {
 *     return "Invalid date provided"
 *   }
 *
 *   // Now safe to use PlainDate methods
 *   if (format === "long") {
 *     return `${date.day} ${getMonthName(date)} ${date.year}`
 *   }
 *
 *   return date.toString()
 * }
 *
 * // Testing utilities
 * function assertIsPlainDate(
 *   value: unknown
 * ): asserts value is Temporal.PlainDate {
 *   if (!isTemporalDate(value)) {
 *     throw new Error("Expected Temporal.PlainDate instance")
 *   }
 * }
 *
 * // Use in tests
 * function testDateOperation() {
 *   const result = someFunctionThatShouldReturnDate()
 *   assertIsPlainDate(result)
 *   // TypeScript now knows result is PlainDate
 *   expect(result.year).toBe(2024)
 * }
 * ```
 *
 * @property Type-guard - Narrows type to Temporal.PlainDate when true
 * @property Pure - No side effects, only checks type
 * @property Strict - Only returns true for actual PlainDate instances
 * @property Safe - Handles any input type without throwing
 * @property Runtime - Provides runtime type checking for Temporal types
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
