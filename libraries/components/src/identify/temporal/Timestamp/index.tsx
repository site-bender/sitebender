/**
 * Timestamp component
 *
 * Represents an exact instant in time (Temporal.Instant). Always has
 * timezone information (UTC by default) and supports microsecond precision.
 * Can display the instant in any timezone.
 *
 * Example usage:
 *
 * // UTC timestamp
 * <Timestamp value="2024-01-15T19:30:00.123456Z" />
 *
 * // Display in specific timezone
 * <Timestamp
 *   value="2024-01-15T19:30:00.123456Z"
 *   timezone="America/Los_Angeles"
 *   locale="en-US"
 * />
 * // → January 15, 2024, 11:30:00 AM PST
 *
 * // Show microseconds
 * <Timestamp
 *   value="2024-01-15T19:30:00.123456Z"
 *   showMicroseconds
 * />
 * // → January 15, 2024, 7:30:00.123456 PM UTC
 *
 * // Show as epoch milliseconds
 * <Timestamp
 *   value="2024-01-15T19:30:00.123456Z"
 *   format="epoch"
 * />
 * // → 1705347000123
 *
 * // Relative time
 * <Timestamp
 *   value="2024-01-15T19:30:00Z"
 *   format="relative"
 * />
 * // → 3 days ago
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"

import formatDate from "../../../helpers/formatters/formatDate/index.ts"
import formatRelativeTime from "../../../helpers/formatters/formatRelativeTime/index.ts"
import getTimezoneAbbreviation from "../../../helpers/formatters/getTimezoneAbbreviation/index.ts"
import buildDateTimeAttribute from "../../../helpers/parsers/buildDateTimeAttribute/index.ts"
import parseTemporalString from "../../../helpers/parsers/parseTemporalString/index.ts"

export type Props = Omit<TemporalBaseProps, "format"> & {
	// Show milliseconds in display
	showMilliseconds?: boolean
	// Show microseconds in display
	showMicroseconds?: boolean
	// Display as epoch milliseconds/microseconds
	format?:
		| "short"
		| "medium"
		| "long"
		| "full"
		| "iso"
		| "relative"
		| "epoch"
		| "epochMicro"
}

export default function Timestamp({
	value,
	timezone,
	locale,
	calendar: _calendar,
	format = "medium",
	formatOptions,
	relativeTo,
	showZone = true, // Default to true for timestamps
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
	const parsed = typeof value === "string" ? parseTemporalString(value) : {
		year: value.getUTCFullYear(),
		month: value.getUTCMonth() + 1,
		day: value.getUTCDate(),
		hour: value.getUTCHours(),
		minute: value.getUTCMinutes(),
		second: value.getUTCSeconds(),
		millisecond: value.getUTCMilliseconds(),
		offset: "Z",
		timezone: "UTC",
		type: "instant" as const,
		original: value.toISOString(),
	}

	// Validate that this is an instant (has offset)
	if (!parsed.offset && parsed.type !== "instant") {
		throw new Error(
			"Timestamp component requires an instant value with timezone/offset (e.g., ends with Z or +00:00)",
		)
	}

	// Build datetime attribute (always include the Z or offset)
	const datetime = buildDateTimeAttribute(parsed, false, true)

	// Create Date object for formatting
	const date = new Date(
		Date.UTC(
			parsed.year!,
			parsed.month! - 1,
			parsed.day!,
			parsed.hour!,
			parsed.minute!,
			parsed.second || 0,
			parsed.millisecond || 0,
		),
	)

	// Add microseconds if present
	const epochMicros = date.getTime() * 1000 + (parsed.microsecond || 0)

	// Format the display
	let display: string

	if (format === "epoch") {
		// Show as epoch milliseconds
		display = String(date.getTime())
	} else if (format === "epochMicro") {
		// Show as epoch microseconds
		display = String(epochMicros)
	} else if (format === "relative" && relativeTo) {
		// Relative time
		display = formatRelativeTime(
			date,
			relativeTo instanceof Date ? relativeTo : new Date(relativeTo),
			locale,
		)
	} else {
		// Standard date/time formatting
		const displayTimezone = timezone || parsed.timezone || "UTC"

		const options = formatOptions || {
			...(format !== "iso" && {
				dateStyle: format as any,
				timeStyle: format as any,
			}),
			...(format === "iso" && {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				fractionalSecondDigits: showMicroseconds
					? (3 as 1 | 2 | 3)
					: showMilliseconds
					? (3 as 1 | 2 | 3)
					: undefined,
				hour12: false,
				timeZoneName: "short",
			}),
			...(showMilliseconds && { fractionalSecondDigits: 3 as 1 | 2 | 3 }),
			...(showMicroseconds && { fractionalSecondDigits: 3 as 1 | 2 | 3 }),
			timeZone: displayTimezone,
		}

		display = formatDate(date, locale, options)

		// Add timezone abbreviation if not already included and requested
		if (showZone && format !== "iso" && !formatOptions?.timeZoneName) {
			const tzAbbr = getTimezoneAbbreviation(displayTimezone, date, locale)
			display += ` ${tzAbbr}`
		}
	}

	// Handle render prop
	if (typeof children === "function") {
		const displayTimezone = timezone || parsed.timezone || "UTC"
		return (
			<time
				dateTime={datetime}
				className={className}
				data-epoch-millis={date.getTime()}
				data-epoch-micros={showMicroseconds ? epochMicros : undefined}
				{...props}
			>
				{children({
					display,
					datetime,
					timezone: getTimezoneAbbreviation(displayTimezone, date, locale),
				})}
			</time>
		)
	}

	return (
		<time
			dateTime={datetime}
			className={className}
			data-epoch-millis={date.getTime()}
			data-epoch-micros={showMicroseconds ? epochMicros : undefined}
			{...props}
		>
			{children || display}
		</time>
	)
}
