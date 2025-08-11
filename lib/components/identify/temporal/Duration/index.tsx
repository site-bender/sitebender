/**
 * Duration component
 *
 * Renders time durations with full internationalization support.
 * Uses ISO 8601 duration format (e.g., P3DT4H30M) or can be created
 * from individual units. Supports various display formats and locales.
 *
 * Example usage:
 *
 * // ISO 8601 duration string
 * <Duration value="PT2H30M" />
 * // → 2 hours, 30 minutes
 *
 * // Object notation
 * <Duration value={{ hours: 2, minutes: 30 }} locale="fr-FR" />
 * // → 2 heures et 30 minutes
 *
 * // Milliseconds
 * <Duration value={150000} format="narrow" />
 * // → 2m 30s
 *
 * // Relative format
 * <Duration value="PT48H" format="relative" />
 * // → in 2 days
 *
 * // Custom display
 * <Duration value="P1Y2M3D">
 *   {({ display }) => <>Duration: {display}</>}
 * </Duration>
 */

import type {
	DurationValue,
	FormatOptions,
} from "../../../../types/temporal/index.ts"

import formatDuration from "../../../formatters/formatDuration/index.ts"

export type Props = {
	// Duration value - ISO 8601 string, object, or milliseconds
	value: string | DurationValue | number

	// Locale for formatting
	locale?: string

	// Display format
	format?: "long" | "short" | "narrow" | "digital" | "relative"

	// Custom format options
	formatOptions?: FormatOptions

	// Show zero units (e.g., "0 hours, 5 minutes" vs "5 minutes")
	showZeroUnits?: boolean

	// Maximum number of units to display
	maxUnits?: number

	// Round to nearest unit
	roundTo?: "year" | "month" | "week" | "day" | "hour" | "minute" | "second"

	// For relative format - past or future
	relativeMode?: "past" | "future"

	// Custom className
	className?: string

	// Custom content or render prop
	children?:
		| string
		| ((formatted: { display: string; datetime: string }) => JSX.Element)
}

// Parse ISO 8601 duration string
function parseISO8601Duration(duration: string): DurationValue {
	const match = duration.match(
		/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
	)

	if (!match) {
		throw new Error(`Invalid ISO 8601 duration: ${duration}`)
	}

	return {
		years: match[1] ? parseInt(match[1]) : undefined,
		months: match[2] ? parseInt(match[2]) : undefined,
		weeks: match[3] ? parseInt(match[3]) : undefined,
		days: match[4] ? parseInt(match[4]) : undefined,
		hours: match[5] ? parseInt(match[5]) : undefined,
		minutes: match[6] ? parseInt(match[6]) : undefined,
		seconds: match[7] ? parseFloat(match[7]) : undefined,
	}
}

// Convert duration to ISO 8601 string
function toISO8601(duration: DurationValue): string {
	let result = "P"

	if (duration.years) result += `${duration.years}Y`
	if (duration.months) result += `${duration.months}M`
	if (duration.weeks) result += `${duration.weeks}W`
	if (duration.days) result += `${duration.days}D`

	const hasTime = duration.hours || duration.minutes || duration.seconds ||
		duration.milliseconds || duration.microseconds || duration.nanoseconds

	if (hasTime) {
		result += "T"
		if (duration.hours) result += `${duration.hours}H`
		if (duration.minutes) result += `${duration.minutes}M`

		if (
			duration.seconds || duration.milliseconds || duration.microseconds ||
			duration.nanoseconds
		) {
			let seconds = duration.seconds || 0
			if (duration.milliseconds) seconds += duration.milliseconds / 1000
			if (duration.microseconds) seconds += duration.microseconds / 1000000
			if (duration.nanoseconds) seconds += duration.nanoseconds / 1000000000
			result += `${seconds}S`
		}
	}

	// Handle empty duration
	if (result === "P") result = "PT0S"

	return result
}

// Round duration to specified unit
function roundDuration(
	duration: DurationValue,
	roundTo: string,
): DurationValue {
	// Convert to total milliseconds for easier calculation
	let totalMs = 0
	totalMs += (duration.years || 0) * 365.25 * 24 * 60 * 60 * 1000
	totalMs += (duration.months || 0) * 30.44 * 24 * 60 * 60 * 1000
	totalMs += (duration.weeks || 0) * 7 * 24 * 60 * 60 * 1000
	totalMs += (duration.days || 0) * 24 * 60 * 60 * 1000
	totalMs += (duration.hours || 0) * 60 * 60 * 1000
	totalMs += (duration.minutes || 0) * 60 * 1000
	totalMs += (duration.seconds || 0) * 1000
	totalMs += duration.milliseconds || 0

	// Round based on unit
	switch (roundTo) {
		case "year":
			return { years: Math.round(totalMs / (365.25 * 24 * 60 * 60 * 1000)) }
		case "month":
			return { months: Math.round(totalMs / (30.44 * 24 * 60 * 60 * 1000)) }
		case "week":
			return { weeks: Math.round(totalMs / (7 * 24 * 60 * 60 * 1000)) }
		case "day":
			return { days: Math.round(totalMs / (24 * 60 * 60 * 1000)) }
		case "hour":
			return { hours: Math.round(totalMs / (60 * 60 * 1000)) }
		case "minute":
			return { minutes: Math.round(totalMs / (60 * 1000)) }
		case "second":
			return { seconds: Math.round(totalMs / 1000) }
		default:
			return duration
	}
}

export default function Duration({
	value,
	locale,
	format = "long",
	formatOptions,
	showZeroUnits = false,
	maxUnits,
	roundTo,
	relativeMode = "future",
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0
		? undefined
		: childrenProp
	// Parse the duration value
	let duration: DurationValue

	if (typeof value === "string") {
		duration = parseISO8601Duration(value)
	} else if (typeof value === "number") {
		// Assume milliseconds
		const totalSeconds = Math.floor(value / 1000)
		const days = Math.floor(totalSeconds / (24 * 60 * 60))
		const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
		const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
		const seconds = totalSeconds % 60
		const milliseconds = value % 1000

		duration = { days, hours, minutes, seconds, milliseconds }
	} else {
		duration = value
	}

	// Apply rounding if requested
	if (roundTo) {
		duration = roundDuration(duration, roundTo)
	}

	// Generate ISO 8601 string for datetime attribute
	const datetime = toISO8601(duration)

	// Format the display
	const display = formatDuration(duration, locale, {
		format,
		showZeroUnits,
		maxUnits,
		relativeMode,
		...formatOptions,
	})

	// Handle render prop
	if (typeof children === "function") {
		return (
			<time
				dateTime={datetime}
				className={className}
				{...props}
			>
				{children({ display, datetime })}
			</time>
		)
	}

	return (
		<time
			dateTime={datetime}
			className={className}
			{...props}
		>
			{children || display}
		</time>
	)
}
