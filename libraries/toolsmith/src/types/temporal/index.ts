//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type PlainDateLike = {
	year: number
	month: number
	day: number
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type PlainTimeLike = {
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
	microsecond?: number
	nanosecond?: number
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DateInput =
	| string // ISO date string (YYYY-MM-DD)
	| Date // JavaScript Date object
	| Temporal.PlainDate // Native Temporal date
	| Temporal.PlainDateTime // Extract date part
	| Temporal.ZonedDateTime // Extract date part
	| PlainDateLike // Object with year/month/day

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TimeInput =
	| string // ISO time string (HH:MM:SS)
	| Date // Extract time in local timezone
	| Temporal.PlainTime // Native Temporal time
	| Temporal.PlainDateTime // Extract time part
	| Temporal.ZonedDateTime // Extract time part
	| PlainTimeLike // Object with time fields

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DateTimeInput =
	| string // ISO datetime string (YYYY-MM-DDTHH:MM:SS)
	| Date // JavaScript Date in local timezone
	| Temporal.PlainDateTime // Native Temporal datetime
	| Temporal.PlainDate // Add midnight time
	| Temporal.PlainTime // Add epoch date (1970-01-01)
	| Temporal.ZonedDateTime // Remove timezone info
	| PlainDateTimeLike // Object with date and time fields

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type InstantInput =
	| string // ISO instant string with Z suffix
	| number // Epoch milliseconds
