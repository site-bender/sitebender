/**
 * Temporal types for date/time components and utilities
 */

// Calendar system types
export type CalendarSystem =
	| "iso8601" // Default Gregorian calendar
	| "buddhist" // Buddhist calendar
	| "chinese" // Traditional Chinese calendar
	| "coptic" // Coptic calendar
	| "dangi" // Korean calendar
	| "ethioaa" // Ethiopian calendar (Amete Alem)
	| "ethiopic" // Ethiopian calendar (Amete Mihret)
	| "gregory" // Gregorian calendar
	| "hebrew" // Hebrew calendar
	| "indian" // Indian national calendar
	| "islamic" // Islamic calendar
	| "islamic-civil" // Islamic calendar (tabular)
	| "islamic-rgsa" // Islamic calendar (Saudi Arabia)
	| "islamic-tbla" // Islamic calendar (tabular)
	| "islamic-umalqura" // Islamic calendar (Umm al-Qura)
	| "japanese" // Japanese calendar
	| "persian" // Persian calendar
	| "roc" // Republic of China calendar

// Week numbering systems
export type WeekNumberingSystem =
	| "ISO" // ISO 8601 (Monday start, week 1 has Jan 4)
	| "US" // US (Sunday start)
	| "Islamic" // Islamic (Saturday start)
	| "Hebrew" // Hebrew (Sunday start)

// Formatting types
export type DateStyle = "short" | "medium" | "long" | "full"
export type TimeStyle = "short" | "medium" | "long" | "full"

export type FormatOptions = Intl.DateTimeFormatOptions & {
	dateStyle?: DateStyle
	timeStyle?: TimeStyle
	calendar?: CalendarSystem
}

// Base props for temporal components
export type TemporalBaseProps = {
	// Core value - can be string or Date
	value: string | Date

	// Timezone (IANA name) - makes component "zoned"
	timezone?: string

	// Locale for formatting (BCP 47)
	locale?: string

	// Calendar system
	calendar?: CalendarSystem

	// Display format preset
	format?: "short" | "medium" | "long" | "full" | "iso" | "relative"

	// Custom format options (overrides format preset)
	formatOptions?: FormatOptions

	// For relative time display
	relativeTo?: string | Date

	// Show timezone in output
	showZone?: boolean

	// Custom className
	className?: string

	// Custom content (render prop)
	children?: string | ((formatted: FormattedTemporal) => JSX.Element)
}

export type FormattedTemporal = {
	// Formatted display string
	display: string

	// Machine-readable datetime attribute value
	datetime: string

	// Individual parts if needed
	parts?: Intl.DateTimeFormatPart[]

	// Relative time if applicable
	relative?: string

	// Timezone abbreviation if applicable
	timezone?: string
}

// Parsed temporal string result
export type ParsedTemporal = {
	year?: number
	month?: number
	day?: number
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
	microsecond?: number
	nanosecond?: number
	offset?: string
	timezone?: string
	calendar?: string
	type: "date" | "time" | "datetime" | "yearmonth" | "monthday" | "instant"
	original: string
}

// Duration value type
export type DurationValue = {
	years?: number
	months?: number
	weeks?: number
	days?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
	microseconds?: number
	nanoseconds?: number
}

// TimeZone component info
export type TimeZoneInfo = {
	// Timezone abbreviation (e.g., "EST")
	abbreviation: string

	// Full timezone name (e.g., "Eastern Standard Time")
	fullName?: string

	// UTC offset string (e.g., "-05:00")
	offset?: string

	// Offset in minutes from UTC
	offsetMinutes?: number

	// Current time in timezone (if requested)
	currentTime?: string

	// Is currently in DST
	isDST?: boolean
}
