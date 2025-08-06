/**
 * DateTime component
 *
 * Adaptive component that renders date and time together. Works as
 * PlainDateTime without timezone (local wall-clock time), or as
 * ZonedDateTime when timezone is provided.
 *
 * Example usage:
 *
 * // Local datetime (no timezone)
 * <DateTime value="2024-01-15T14:30:00" />
 *
 * // With locale formatting
 * <DateTime value="2024-01-15T14:30:00" locale="en-GB" />
 * // → 15 January 2024, 14:30
 *
 * // With timezone (becomes ZonedDateTime)
 * <DateTime 
 *   value="2024-01-15T14:30:00"
 *   timezone="America/New_York"
 *   locale="en-US"
 * />
 * // → January 15, 2024, 2:30 PM EST
 *
 * // With calendar system
 * <DateTime
 *   value="2024-01-15T14:30:00"
 *   timezone="Asia/Tokyo"
 *   calendar="japanese"
 *   locale="ja-JP"
 * />
 * // → 令和6年1月15日 14:30
 *
 * // UTC instant (Z suffix)
 * <DateTime value="2024-01-15T19:30:00Z" showZone />
 * // → January 15, 2024, 7:30 PM UTC
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"
import parseTemporalString from "../../../parsers/parseTemporalString/index.ts"
import buildDateTimeAttribute from "../../../parsers/buildDateTimeAttribute/index.ts"
import formatDate from "../../../formatters/formatDate/index.ts"
import formatRelativeTime from "../../../formatters/formatRelativeTime/index.ts"
import getTimezoneAbbreviation from "../../../formatters/getTimezoneAbbreviation/index.ts"

export type Props = TemporalBaseProps & {
	// Show seconds in time display
	showSeconds?: boolean
	// Show milliseconds/microseconds (requires showSeconds)
	showMilliseconds?: boolean
	showMicroseconds?: boolean
}

export default function DateTime({
	value,
	timezone,
	locale,
	calendar,
	format = "medium",
	formatOptions,
	relativeTo,
	showZone,
	showSeconds,
	showMilliseconds,
	showMicroseconds,
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0 
		? undefined 
		: childrenProp
	// Parse the value
	const parsed = typeof value === "string"
		? parseTemporalString(value)
		: {
			year: value.getFullYear(),
			month: value.getMonth() + 1,
			day: value.getDate(),
			hour: value.getHours(),
			minute: value.getMinutes(),
			second: value.getSeconds(),
			millisecond: value.getMilliseconds(),
			type: "datetime" as const,
			original: value.toISOString()
		}
	
	// Add timezone and calendar to parsed result
	if (timezone) parsed.timezone = timezone
	if (calendar) parsed.calendar = calendar
	
	// For instant values (with Z or offset), extract timezone
	if (parsed.offset && !timezone) {
		parsed.timezone = parsed.offset === "Z" ? "UTC" : undefined
	}
	
	// Build datetime attribute
	const datetime = buildDateTimeAttribute(parsed, true, true)
	
	// Format the display
	let display: string
	if (format === "relative" && relativeTo) {
		const date = new Date(
			parsed.year!,
			parsed.month! - 1,
			parsed.day!,
			parsed.hour!,
			parsed.minute!,
			parsed.second || 0,
			parsed.millisecond || 0
		)
		display = formatRelativeTime(date, relativeTo instanceof Date ? relativeTo : new Date(relativeTo), locale)
	} else {
		const date = new Date(
			parsed.year!,
			parsed.month! - 1,
			parsed.day!,
			parsed.hour!,
			parsed.minute!,
			parsed.second || 0,
			parsed.millisecond || 0
		)
		
		// Determine format options
		const options = formatOptions || {
			...(format !== "iso" && {
				dateStyle: format as any,
				timeStyle: format === "full" || format === "long" ? "medium" : format as any
			}),
			...(format === "iso" && {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: showSeconds ? "2-digit" : undefined,
				fractionalSecondDigits: showMicroseconds ? 6 : showMilliseconds ? 3 : undefined,
				hour12: false
			}),
			...(showSeconds && { second: "2-digit" }),
			...(showMilliseconds && { fractionalSecondDigits: 3 }),
			...(showMicroseconds && { fractionalSecondDigits: 6 }),
			timeZone: parsed.timezone || timezone,
			calendar
		}
		
		display = formatDate(date, locale, options)
		
		// Add timezone abbreviation if requested
		if (showZone && (parsed.timezone || timezone)) {
			const tz = parsed.timezone || timezone || "UTC"
			const tzAbbr = getTimezoneAbbreviation(tz, date, locale)
			display += ` ${tzAbbr}`
		}
	}
	
	// Handle render prop
	if (typeof children === "function") {
		const tz = parsed.timezone || timezone
		return (
			<time
				dateTime={datetime}
				className={className}
				{...props}
			>
				{children({ 
					display, 
					datetime,
					timezone: tz ? getTimezoneAbbreviation(tz, new Date(), locale) : undefined
				})}
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