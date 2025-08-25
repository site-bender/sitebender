/**
 * Changes the calendar system of a date
 *
 * Converts a Temporal date/datetime to use a different calendar system while
 * preserving the same instant in time. Supports various calendar systems like
 * Islamic, Hebrew, Buddhist, Chinese, and others. The date representation may
 * change but the underlying point in time remains the same. This is a curried
 * function for easy composition. Returns null for invalid inputs to support
 * safe error handling.
 *
 * @curried (calendar) => (temporal) => temporal with new calendar
 * @param calendar - The calendar system to use (e.g., "iso8601", "hebrew", "islamic", "buddhist", "chinese", "japanese")
 * @param temporal - The Temporal date to convert
 * @returns Date with new calendar system, or null if invalid
 * @example
 * ```typescript
 * // Convert to Hebrew calendar
 * const isoDate = Temporal.PlainDate.from("2024-03-15")
 * withCalendar("hebrew")(isoDate)         // PlainDate in Hebrew calendar
 * // Displays as something like 5784-12-05 (5th of Adar II, 5784)
 *
 * // Convert to Islamic calendar
 * withCalendar("islamic")(isoDate)        // PlainDate in Islamic calendar
 * // Displays as something like 1445-09-05 (5th of Ramadan, 1445)
 *
 * // Convert to Buddhist calendar
 * withCalendar("buddhist")(isoDate)       // PlainDate in Buddhist calendar
 * // Year is 543 years ahead of Gregorian
 *
 * // Convert to Chinese calendar
 * withCalendar("chinese")(isoDate)        // PlainDate in Chinese calendar
 * // Displays with Chinese year/month/day system
 *
 * // Convert to Japanese calendar
 * withCalendar("japanese")(isoDate)       // PlainDate in Japanese calendar
 * // Shows era name (e.g., Reiwa 6)
 *
 * // With PlainDateTime
 * const datetime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * withCalendar("hebrew")(datetime)        // PlainDateTime in Hebrew calendar
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-03")
 * withCalendar("islamic")(yearMonth)      // PlainYearMonth in Islamic calendar
 *
 * // With PlainMonthDay
 * const monthDay = Temporal.PlainMonthDay.from("03-15")
 * withCalendar("hebrew")(monthDay)        // PlainMonthDay in Hebrew calendar
 *
 * // Round-trip conversion
 * const original = Temporal.PlainDate.from("2024-03-15")
 * const hebrew = withCalendar("hebrew")(original)
 * const backToISO = withCalendar("iso8601")(hebrew)
 * // backToISO equals original date
 *
 * // Multi-calendar display
 * function displayInCalendars(
 *   date: Temporal.PlainDate,
 *   calendars: Array<string>
 * ): Map<string, Temporal.PlainDate | null> {
 *   const results = new Map<string, Temporal.PlainDate | null>()
 *
 *   for (const cal of calendars) {
 *     results.set(cal, withCalendar(cal)(date))
 *   }
 *
 *   return results
 * }
 *
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const calendars = ["iso8601", "hebrew", "islamic", "chinese"]
 * displayInCalendars(date, calendars)
 * // Map with date in each calendar system
 *
 * // Holiday calculator across calendars
 * function findHolidayDates(
 *   holiday: { calendar: string; month: number; day: number },
 *   targetYear: number
 * ): Temporal.PlainDate | null {
 *   // Create date in holiday's calendar
 *   const dateInCalendar = Temporal.PlainDate.from({
 *     year: targetYear,
 *     month: holiday.month,
 *     day: holiday.day,
 *     calendar: holiday.calendar
 *   })
 *
 *   // Convert to ISO calendar for standard processing
 *   return withCalendar("iso8601")(dateInCalendar)
 * }
 *
 * // Passover starts on 15th of Nisan (month 1) in Hebrew calendar
 * findHolidayDates({ calendar: "hebrew", month: 1, day: 15 }, 5784)
 * // Returns ISO date when Passover starts
 *
 * // Batch calendar conversion
 * const dates = [
 *   Temporal.PlainDate.from("2024-01-01"),
 *   Temporal.PlainDate.from("2024-06-15"),
 *   Temporal.PlainDate.from("2024-12-31")
 * ]
 *
 * const toHebrew = withCalendar("hebrew")
 * const hebrewDates = dates.map(toHebrew)
 * // Array of dates in Hebrew calendar
 *
 * // Invalid input handling
 * withCalendar("hebrew")(null)            // null
 * withCalendar("hebrew")(undefined)       // null
 * withCalendar("invalid")(isoDate)        // null (invalid calendar)
 * withCalendar("hebrew")("2024-03-15")    // null (string, not Temporal)
 *
 * // Calendar-aware age calculator
 * function calculateAgeInCalendar(
 *   birthDate: Temporal.PlainDate,
 *   calendar: string
 * ): { years: number; date: Temporal.PlainDate | null } {
 *   const birthInCalendar = withCalendar(calendar)(birthDate)
 *   const todayInCalendar = withCalendar(calendar)(Temporal.Now.plainDateISO())
 *
 *   if (!birthInCalendar || !todayInCalendar) {
 *     return { years: 0, date: null }
 *   }
 *
 *   const duration = birthInCalendar.until(todayInCalendar)
 *   const years = Math.floor(duration.total({ unit: 'years' }))
 *
 *   return { years, date: birthInCalendar }
 * }
 *
 * const birth = Temporal.PlainDate.from("2000-01-01")
 * calculateAgeInCalendar(birth, "buddhist")
 * // Age in Buddhist calendar (years will be 543 higher)
 *
 * // Religious date converter
 * function convertReligiousDate(
 *   date: Temporal.PlainDate,
 *   fromCalendar: string,
 *   toCalendar: string
 * ): Temporal.PlainDate | null {
 *   // First ensure date is in the source calendar
 *   const inSourceCalendar = withCalendar(fromCalendar)(date)
 *   if (!inSourceCalendar) return null
 *
 *   // Then convert to target calendar
 *   return withCalendar(toCalendar)(inSourceCalendar)
 * }
 *
 * // Lunar calendar checker
 * function isLunarCalendar(calendar: string): boolean {
 *   const lunarCalendars = ["islamic", "hebrew", "chinese"]
 *   return lunarCalendars.includes(calendar)
 * }
 *
 * // Calendar system information
 * function getCalendarInfo(
 *   date: Temporal.PlainDate
 * ): { calendar: string; era?: string; eraYear?: number } {
 *   const calendar = date.calendarId
 *
 *   // Some calendars have eras
 *   if (calendar === "japanese" || calendar === "chinese") {
 *     return {
 *       calendar,
 *       era: date.era,
 *       eraYear: date.eraYear
 *     }
 *   }
 *
 *   return { calendar }
 * }
 *
 * const japaneseDate = withCalendar("japanese")(
 *   Temporal.PlainDate.from("2024-03-15")
 * )
 * if (japaneseDate) {
 *   getCalendarInfo(japaneseDate)
 *   // { calendar: "japanese", era: "reiwa", eraYear: 6 }
 * }
 *
 * // Festival date finder
 * function findFestivalDate(
 *   festival: { name: string; calendar: string; month: number; day: number },
 *   isoYear: number
 * ): { name: string; isoDate: Temporal.PlainDate | null } {
 *   try {
 *     // Create a reference date in ISO calendar
 *     const isoDate = Temporal.PlainDate.from({ year: isoYear, month: 1, day: 1 })
 *
 *     // Convert to festival calendar
 *     const dateInCalendar = withCalendar(festival.calendar)(isoDate)
 *     if (!dateInCalendar) return { name: festival.name, isoDate: null }
 *
 *     // Create festival date in that calendar's year
 *     const festivalDate = dateInCalendar.with({
 *       month: festival.month,
 *       day: festival.day
 *     })
 *
 *     // Convert back to ISO
 *     return {
 *       name: festival.name,
 *       isoDate: withCalendar("iso8601")(festivalDate)
 *     }
 *   } catch {
 *     return { name: festival.name, isoDate: null }
 *   }
 * }
 *
 * // Diwali is on 1st of Kartik (month 8) in Hindu calendar
 * findFestivalDate(
 *   { name: "Diwali", calendar: "indian", month: 8, day: 1 },
 *   2024
 * )
 *
 * // Calendar epoch calculator
 * function getCalendarEpoch(calendar: string): Temporal.PlainDate | null {
 *   try {
 *     // Year 1, Month 1, Day 1 in the specified calendar
 *     const epochInCalendar = Temporal.PlainDate.from({
 *       year: 1,
 *       month: 1,
 *       day: 1,
 *       calendar
 *     })
 *
 *     // Convert to ISO to see the equivalent date
 *     return withCalendar("iso8601")(epochInCalendar)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * getCalendarEpoch("hebrew")     // Hebrew calendar epoch in ISO
 * getCalendarEpoch("islamic")    // Islamic calendar epoch in ISO
 * getCalendarEpoch("buddhist")   // Buddhist calendar epoch in ISO
 * ```
 * @property Curried - Takes calendar system first for easy partial application
 * @property Safe - Returns null for invalid inputs
 * @property Preserves - Maintains the same instant in time
 * @property Multi-calendar - Supports various world calendar systems
 */
const withCalendar = (calendar: string) =>
(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| null
		| undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null => {
	if (temporal == null) {
		return null
	}

	// Validate temporal is a type that supports calendar
	const isValidTemporal = temporal instanceof Temporal.PlainDate ||
		temporal instanceof Temporal.PlainDateTime ||
		temporal instanceof Temporal.PlainYearMonth ||
		temporal instanceof Temporal.PlainMonthDay

	if (!isValidTemporal) {
		return null
	}

	try {
		// Validate calendar by attempting to create a test date
		Temporal.PlainDate.from({ year: 2000, month: 1, day: 1, calendar })

		// Use withCalendar method to change the calendar system
		// @ts-ignore - TypeScript doesn't recognize the common withCalendar method
		return temporal.withCalendar(calendar)
	} catch {
		return null
	}
}

export default withCalendar
