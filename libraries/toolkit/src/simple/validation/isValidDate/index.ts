import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"
import isNotNull from "../isNotNull/index.ts"

/**
 * Validates if a date/time value represents a valid date
 *
 * Checks whether a value can be successfully converted to a valid date.
 * Unlike simple type checks, this validates that the date values are
 * actually valid (e.g., not February 30th or month 13). Accepts various
 * date formats including strings, Date objects, Temporal types, and
 * date-like objects. Returns true only for valid, parseable dates.
 *
 * Date validation rules:
 * - Must represent a real calendar date
 * - Month must be 1-12
 * - Day must be valid for the given month and year
 * - Handles leap years correctly
 * - Accepts ISO strings, Date objects, Temporal types
 * - Validates date-like objects with year/month/day properties
 * - Returns false for invalid dates like 2024-02-30
 * - Returns false for null, undefined, or unparseable values
 *
 * @param value - The value to validate as a date
 * @returns True if the value represents a valid date, false otherwise
 * @example
 * ```typescript
 * // Valid dates
 * isValidDate("2024-01-15")                    // true
 * isValidDate("2024-02-29")                    // true (leap year)
 * isValidDate(new Date("2024-01-15"))          // true
 * isValidDate(Temporal.PlainDate.from("2024-01-15"))  // true
 *
 * // Invalid dates
 * isValidDate("2024-02-30")                    // false (Feb has max 29 days)
 * isValidDate("2023-02-29")                    // false (not a leap year)
 * isValidDate("2024-13-01")                    // false (invalid month)
 * isValidDate("2024-00-15")                    // false (month can't be 0)
 * isValidDate(new Date("invalid"))             // false
 *
 * // Date-like objects
 * isValidDate({ year: 2024, month: 1, day: 15 })   // true
 * isValidDate({ year: 2024, month: 2, day: 30 })   // false
 *
 * // Null/undefined
 * isValidDate(null)                            // false
 * isValidDate(undefined)                       // false
 *
 * // Form validation
 * const validateForm = (input: string): string | null => {
 *   if (!isValidDate(input)) {
 *     return "Please enter a valid date"
 *   }
 *   return null
 * }
 *
 * // Filtering valid dates
 * const dates = ["2024-01-15", "invalid", "2024-02-30", "2024-03-15"]
 * const validDates = dates.filter(isValidDate)
 * // ["2024-01-15", "2024-03-15"]
 * ```
 *
 * @predicate
 * @pure
 * @safe
 */
const isValidDate = (value: DateInput | null | undefined): boolean => {
	// Attempt to convert to PlainDate
	// toPlainDate returns null for invalid dates
	const date = toPlainDate(value)

	// If conversion succeeded, it's a valid date
	return isNotNull(date)
}

export default isValidDate
