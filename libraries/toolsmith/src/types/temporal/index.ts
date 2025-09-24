/**
 * Temporal API type definitions for date/time operations
 *
 * Provides unified type definitions for various Temporal input formats
 * used throughout the toolsmith library. These types support flexible
 * input handling while maintaining type safety.
 */

/**
 * Plain date-like object structure
 * Represents the minimum required fields to construct a date
 */
export type PlainDateLike = {
	year: number
	month: number
	day: number
}

/**
 * Plain time-like object structure
 * Represents optional time fields for constructing time values
 */
export type PlainTimeLike = {
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
	microsecond?: number
	nanosecond?: number
}

/**
 * Plain datetime-like object structure
 * Combines date and time fields for constructing datetime values
 */
export type PlainDateTimeLike = {
	year: number
	month: number
	day: number
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
	microsecond?: number
	nanosecond?: number
}

/**
 * Flexible date input type
 * Accepts various formats that can be converted to Temporal.PlainDate
 */
export type DateInput =
	| string // ISO date string (YYYY-MM-DD)
	| Date // JavaScript Date object
	| Temporal.PlainDate // Native Temporal date
	| Temporal.PlainDateTime // Extract date part
	| Temporal.ZonedDateTime // Extract date part
	| PlainDateLike // Object with year/month/day

/**
 * Flexible time input type
 * Accepts various formats that can be converted to Temporal.PlainTime
 */
export type TimeInput =
	| string // ISO time string (HH:MM:SS)
	| Date // Extract time in local timezone
	| Temporal.PlainTime // Native Temporal time
	| Temporal.PlainDateTime // Extract time part
	| Temporal.ZonedDateTime // Extract time part
	| PlainTimeLike // Object with time fields

/**
 * Flexible datetime input type
 * Accepts various formats that can be converted to Temporal.PlainDateTime
 */
export type DateTimeInput =
	| string // ISO datetime string (YYYY-MM-DDTHH:MM:SS)
	| Date // JavaScript Date in local timezone
	| Temporal.PlainDateTime // Native Temporal datetime
	| Temporal.PlainDate // Add midnight time
	| Temporal.PlainTime // Add epoch date (1970-01-01)
	| Temporal.ZonedDateTime // Remove timezone info
	| PlainDateTimeLike // Object with date and time fields

/**
 * Flexible instant input type
 * Accepts various formats that can be converted to Temporal.Instant
 * Instants represent absolute points in time (UTC)
 */
export type InstantInput =
	| string // ISO instant string with Z suffix
	| number // Epoch milliseconds
