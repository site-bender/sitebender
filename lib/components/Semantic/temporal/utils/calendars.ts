/**
 * Calendar system types and utilities
 */

export type CalendarSystem = 
	| "iso8601"          // Default Gregorian calendar
	| "buddhist"         // Buddhist calendar
	| "chinese"          // Traditional Chinese calendar
	| "coptic"           // Coptic calendar
	| "dangi"            // Korean calendar
	| "ethioaa"          // Ethiopian calendar (Amete Alem)
	| "ethiopic"         // Ethiopian calendar (Amete Mihret)
	| "gregory"          // Gregorian calendar
	| "hebrew"           // Hebrew calendar
	| "indian"           // Indian national calendar
	| "islamic"          // Islamic calendar
	| "islamic-civil"    // Islamic calendar (tabular)
	| "islamic-rgsa"     // Islamic calendar (Saudi Arabia)
	| "islamic-tbla"     // Islamic calendar (tabular)
	| "islamic-umalqura" // Islamic calendar (Umm al-Qura)
	| "japanese"         // Japanese calendar
	| "persian"          // Persian calendar
	| "roc"              // Republic of China calendar

/**
 * Week numbering systems
 */
export type WeekNumberingSystem = 
	| "iso"       // ISO 8601 (Monday start, week 1 has Jan 4)
	| "us"        // US (Sunday start)
	| "islamic"   // Islamic (Saturday start)
	| "hebrew"    // Hebrew (Sunday start)

/**
 * First day of week by locale/culture
 */
export const WEEK_START_DAY: Record<string, number> = {
	// 0 = Sunday, 1 = Monday, etc.
	"en-US": 0,      // Sunday
	"en-GB": 1,      // Monday
	"ar-SA": 6,      // Saturday
	"he-IL": 0,      // Sunday
	"default": 1     // Monday (ISO)
}

/**
 * Get calendar extension for datetime attribute
 */
export function getCalendarExtension(calendar?: CalendarSystem): string {
	if (!calendar || calendar === "iso8601" || calendar === "gregory") {
		return ""
	}
	return `[u-ca=${calendar}]`
}

/**
 * Get week start day for locale
 */
export function getWeekStartDay(locale?: string): number {
	if (!locale) return WEEK_START_DAY.default
	
	const baseLocale = locale.split("-")[0]
	return WEEK_START_DAY[locale] ?? WEEK_START_DAY[baseLocale] ?? WEEK_START_DAY.default
}

/**
 * Format quarter based on locale
 */
export function formatQuarter(quarter: number, locale?: string): string {
	// Most locales use Q1, Q2, etc.
	// Some might have specific formatting
	const formatter = new Intl.DateTimeFormat(locale, {
		month: "long"
	})
	
	// Get first month of quarter
	const firstMonth = (quarter - 1) * 3 + 1
	const date = new Date(2024, firstMonth - 1, 1)
	
	// For now, use Q format universally
	// Could be extended for locale-specific formats
	return `Q${quarter}`
}

/**
 * Calculate ISO week number
 */
export function getISOWeekNumber(date: Date): number {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const dayNum = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

/**
 * Calculate Julian Day Number
 */
export function getJulianDayNumber(date: Date): number {
	const a = Math.floor((14 - (date.getMonth() + 1)) / 12)
	const y = date.getFullYear() + 4800 - a
	const m = (date.getMonth() + 1) + 12 * a - 3
	
	return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
		Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}