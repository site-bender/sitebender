/**
 * Date component
 *
 * Adaptive component that renders calendar dates. Works as PlainDate
 * without timezone, or as zoned date when timezone is provided.
 * Supports internationalization and multiple calendar systems.
 *
 * Example usage:
 *
 * // Simple date
 * <Date value="2024-01-15" />
 *
 * // With locale formatting
 * <Date value="2024-01-15" locale="fr-FR" />
 * // → 15 janvier 2024
 *
 * // With timezone (shows date in that timezone)
 * <Date value="2024-01-15" timezone="Asia/Tokyo" locale="ja-JP" />
 * // → 2024年1月15日
 *
 * // With calendar system
 * <Date value="2024-01-15" calendar="hebrew" locale="he-IL" />
 * // → כ״ג בטבת תשפ״ד
 *
 * // With custom content
 * <Date value="2024-01-15" format="full">
 *   {({ display }) => <>Born on {display}</>}
 * </Date>
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"
import parseTemporalString from "../parseTemporalString/index.ts"
import buildDateTimeAttribute from "../buildDateTimeAttribute/index.ts"
import formatDate from "../formatDate/index.ts"
import formatRelativeTime from "../formatRelativeTime/index.ts"
import getCalendarExtension from "../getCalendarExtension/index.ts"

export type Props = TemporalBaseProps & {
	// Additional Date-specific props could go here
}

export default function Date({
	value,
	timezone,
	locale,
	calendar,
	format = "medium",
	formatOptions,
	relativeTo,
	showZone,
	className,
	children,
	...props
}: Props): JSX.Element {
	// Parse the value
	const parsed = typeof value === "string" 
		? parseTemporalString(value)
		: {
			year: value.getFullYear(),
			month: value.getMonth() + 1,
			day: value.getDate(),
			type: "date" as const,
			original: value.toISOString().split("T")[0]
		}
	
	// Add timezone and calendar to parsed result
	if (timezone) parsed.timezone = timezone
	if (calendar) parsed.calendar = calendar
	
	// Build datetime attribute
	const datetime = buildDateTimeAttribute(parsed, true, true)
	
	// Format the display
	let display: string
	if (format === "relative" && relativeTo) {
		const date = new Date(parsed.year!, parsed.month! - 1, parsed.day!)
		display = formatRelativeTime(date, relativeTo instanceof Date ? relativeTo : new Date(relativeTo), locale)
	} else {
		const date = new Date(parsed.year!, parsed.month! - 1, parsed.day!)
		
		// Determine format options
		const options = formatOptions || {
			dateStyle: format === "iso" ? undefined : format as any,
			...(format === "iso" && {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			}),
			timeZone: timezone,
			calendar
		}
		
		display = formatDate(date, locale, options)
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