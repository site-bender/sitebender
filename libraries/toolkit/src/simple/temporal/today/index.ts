/**
 * Gets the current PlainDate in the system's time zone
 *
 * Returns a Temporal.PlainDate representing today's date in the system's local
 * time zone. This function captures the current date at the moment of execution.
 * The result contains only the date components (year, month, day) without any
 * time information. Useful for date comparisons, age calculations, and daily
 * operations.
 *
 * @returns Current date as Temporal.PlainDate
 * @example
 * ```typescript
 * // Basic usage
 * const currentDate = today()             // PlainDate 2024-03-15 (example)
 * currentDate.year                        // 2024
 * currentDate.month                       // 3
 * currentDate.day                         // 15
 *
 * // Age calculator
 * const calculateAge = (birthDate: Temporal.PlainDate): number => {
 *   const currentDate = today()
 *   const years = birthDate.until(currentDate, { largestUnit: 'years' }).years
 *   return Math.floor(years)
 * }
 *
 * // Check if date is today
 * const isToday = (date: Temporal.PlainDate): boolean => {
 *   return date.equals(today())
 * }
 *
 * // Get relative dates
 * const getRelativeDates = () => {
 *   const currentDate = today()
 *   return {
 *     today: currentDate,
 *     yesterday: currentDate.subtract({ days: 1 }),
 *     tomorrow: currentDate.add({ days: 1 }),
 *     lastWeek: currentDate.subtract({ weeks: 1 }),
 *     nextWeek: currentDate.add({ weeks: 1 })
 *   }
 * }
 *
 * // Daily file timestamp generator
 * const generateDailyFilename = (prefix: string): string => {
 *   const currentDate = today()
 *   const year = currentDate.year
 *   const month = String(currentDate.month).padStart(2, '0')
 *   const day = String(currentDate.day).padStart(2, '0')
 *   return `${prefix}_${year}-${month}-${day}`
 * }
 *
 * // Weekend checker
 * const isWeekendToday = (): boolean => {
 *   const dayOfWeek = today().dayOfWeek
 *   return dayOfWeek === 6 || dayOfWeek === 7  // Saturday or Sunday
 * }
 *
 * // Days until event
 * const daysUntil = (eventDate: Temporal.PlainDate): number => {
 *   const duration = today().until(eventDate)
 *   return Math.ceil(duration.total({ unit: 'days' }))
 * }
 * ```
 * @impure
 * @immutable
 */
const today = (): Temporal.PlainDate => {
	return Temporal.Now.plainDateISO()
}

export default today
