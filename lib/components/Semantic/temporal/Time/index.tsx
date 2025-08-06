/**
 * Time component
 *
 * Adaptive component that renders times of day. Works as PlainTime
 * without timezone, or shows local time in specified timezone when
 * timezone is provided.
 *
 * Example usage:
 *
 * // Simple time
 * <Time value="14:30:00" />
 *
 * // 12-hour format with locale
 * <Time value="14:30:00" locale="en-US" />
 * // → 2:30 PM
 *
 * // 24-hour format
 * <Time value="14:30:00" locale="fr-FR" />
 * // → 14:30
 *
 * // With timezone
 * <Time value="14:30:00" timezone="Europe/Paris" showZone />
 * // → 14:30 CET
 *
 * // With seconds and microseconds
 * <Time value="14:30:45.123456" showSeconds showMicroseconds />
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"
import parseTemporalString from "../parseTemporalString/index.ts"
import buildDateTimeAttribute from "../buildDateTimeAttribute/index.ts"
import formatTime from "../formatTime/index.ts"
import getTimezoneAbbreviation from "../getTimezoneAbbreviation/index.ts"

export type Props = TemporalBaseProps & {
	// Show seconds in display
	showSeconds?: boolean
	// Show microseconds in display (requires showSeconds)
	showMicroseconds?: boolean
	// Force 12/24 hour format
	hour12?: boolean
}

export default function Time({
	value,
	timezone,
	locale,
	format = "medium",
	formatOptions,
	showZone,
	showSeconds,
	showMicroseconds,
	hour12,
	className,
	children,
	...props
}: Props): JSX.Element {
	// Parse the value
	const parsed = typeof value === "string"
		? parseTemporalString(value)
		: {
			hour: value.getHours(),
			minute: value.getMinutes(),
			second: value.getSeconds(),
			millisecond: value.getMilliseconds(),
			type: "time" as const,
			original: value.toTimeString().split(" ")[0]
		}
	
	// Add timezone to parsed result
	if (timezone) parsed.timezone = timezone
	
	// Build datetime attribute
	const datetime = buildDateTimeAttribute(parsed, true, false)
	
	// Format the display
	const options = formatOptions || {
		hour: "numeric",
		minute: "2-digit",
		...(showSeconds && { second: "2-digit" }),
		...(showMicroseconds && showSeconds && { fractionalSecondDigits: 6 }),
		...(hour12 !== undefined && { hour12 }),
		...(timezone && { timeZone: timezone })
	}
	
	let display = formatTime(
		parsed.hour!,
		parsed.minute!,
		showSeconds ? parsed.second : undefined,
		locale,
		options
	)
	
	// Add timezone abbreviation if requested
	if (showZone && timezone) {
		const tzAbbr = getTimezoneAbbreviation(timezone, new Date(), locale)
		display += ` ${tzAbbr}`
	}
	
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