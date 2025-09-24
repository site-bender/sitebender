/**
 * Gets the weekday from a Temporal date or datetime (alias for getDayOfWeek)
 *
 * Extracts the day of week (1-7) from a Temporal PlainDate, PlainDateTime,
 * or ZonedDateTime. Returns 1 for Monday through 7 for Sunday, following
 * ISO 8601 standard. This function is an alias for getDayOfWeek with a more
 * intuitive name. Returns null for invalid inputs to support safe error handling.
 *
 * @param date - The Temporal object to get weekday from
 * @returns The weekday (1=Monday, 7=Sunday), or null if invalid
 * @example
 * ```typescript
 * // Basic usage - ISO 8601 (1=Monday, 7=Sunday)
 * const monday = Temporal.PlainDate.from("2024-03-11")
 * getWeekday(monday)                      // 1 (Monday)
 *
 * const friday = Temporal.PlainDate.from("2024-03-15")
 * getWeekday(friday)                      // 5 (Friday)
 *
 * const sunday = Temporal.PlainDate.from("2024-03-17")
 * getWeekday(sunday)                      // 7 (Sunday)
 *
 * // With different Temporal types
 * const datetime = Temporal.PlainDateTime.from("2024-03-13T10:30:00")
 * getWeekday(datetime)                    // 3 (Wednesday)
 *
 * const zonedDateTime = Temporal.ZonedDateTime.from(
 *   "2024-03-16T10:30:00-04:00[America/New_York]"
 * )
 * getWeekday(zonedDateTime)               // 6 (Saturday)
 *
 * // Composition example
 * const getWeekdayName = (date: Temporal.PlainDate): string => {
 *   const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 *   const weekday = getWeekday(date)
 *   return weekday ? names[weekday - 1] : "Unknown"
 * }
 *
 * const isWeekend = (date: Temporal.PlainDate): boolean => {
 *   const weekday = getWeekday(date)
 *   return weekday === 6 || weekday === 7
 * }
 *
 * // Functional approach for finding next weekday
 * const getNextWeekday = (
 *   from: Temporal.PlainDate,
 *   target: number
 * ): Temporal.PlainDate => {
 *   const daysUntil = ((target - getWeekday(from) + 7) % 7) || 7
 *   return from.add({ days: daysUntil })
 * }
 *
 * // Edge cases
 * getWeekday(null)                        // null
 * getWeekday(undefined)                   // null
 * ```
 * @pure
 * @safe
 */
import getDayOfWeek from "../getDayOfWeek/index.ts"

const getWeekday = getDayOfWeek

export default getWeekday
