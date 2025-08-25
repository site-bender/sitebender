/**
 * TimeZone component
 *
 * Displays timezone information with proper names, abbreviations,
 * and offsets. Handles DST transitions and supports various display
 * formats. Can show current time in the timezone.
 *
 * Example usage:
 *
 * // Simple timezone abbreviation
 * <TimeZone value="America/New_York" />
 * // → EST (or EDT in summer)
 *
 * // With full name
 * <TimeZone value="Europe/London" format="long" />
 * // → Greenwich Mean Time
 *
 * // With offset
 * <TimeZone value="Asia/Tokyo" showOffset />
 * // → JST (UTC+9)
 *
 * // Show current time in timezone
 * <TimeZone value="Australia/Sydney" showTime />
 * // → AEDT (3:45 PM)
 *
 * // All available info
 * <TimeZone
 *   value="America/Los_Angeles"
 *   format="long"
 *   showOffset
 *   showTime
 * />
 * // → Pacific Standard Time (UTC-8, 11:30 AM)
 *
 * // Custom reference date (for DST)
 * <TimeZone
 *   value="Europe/Paris"
 *   referenceDate="2024-07-15"
 * />
 * // → CEST (summer time)
 */

import type { TimeZoneInfo } from "../../../../../types/temporal/index.ts"

import getTimezoneAbbreviation from "../../../../utilities/formatters/getTimezoneAbbreviation/index.ts"

export type Props = {
	// IANA timezone name
	value: string

	// Display format
	format?: "short" | "long"

	// Show UTC offset
	showOffset?: boolean

	// Show current time in timezone
	showTime?: boolean

	// Time format when showTime is true
	timeFormat?: "short" | "medium" | "long"

	// Reference date for DST calculation
	referenceDate?: string | Date

	// Locale for formatting
	locale?: string

	// Custom className
	className?: string

	// Custom content or static content
	children?: string | ((info: TimeZoneInfo) => JSX.Element)
}

// Get timezone offset in minutes
function getTimezoneOffset(timezone: string, date: Date): number {
	// Create formatter that includes timezone offset
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone: timezone,
		timeZoneName: "longOffset",
	})

	const parts = formatter.formatToParts(date)
	const offsetPart = parts.find((part) => part.type === "timeZoneName")

	if (!offsetPart?.value) return 0

	// Parse offset like "GMT-5" or "GMT+5:30"
	const match = offsetPart.value.match(/GMT([+-])(\d+)(?::(\d+))?/)
	if (!match) return 0

	const sign = match[1] === "+" ? 1 : -1
	const hours = parseInt(match[2])
	const minutes = parseInt(match[3] || "0")

	return sign * (hours * 60 + minutes)
}

// Format offset as string
function formatOffset(minutes: number): string {
	const sign = minutes >= 0 ? "+" : "-"
	const absMinutes = Math.abs(minutes)
	const hours = Math.floor(absMinutes / 60)
	const mins = absMinutes % 60

	if (mins === 0) {
		return `UTC${sign}${hours}`
	}
	return `UTC${sign}${hours}:${mins.toString().padStart(2, "0")}`
}

// Check if timezone is in DST
function isDaylightSaving(timezone: string, date: Date): boolean {
	const jan = new Date(date.getFullYear(), 0, 1)
	const jul = new Date(date.getFullYear(), 6, 1)

	const janOffset = getTimezoneOffset(timezone, jan)
	const julOffset = getTimezoneOffset(timezone, jul)
	const currentOffset = getTimezoneOffset(timezone, date)

	// Northern hemisphere: DST in summer (larger offset)
	// Southern hemisphere: DST in winter
	const maxOffset = Math.max(janOffset, julOffset)
	return currentOffset === maxOffset
}

export default function TimeZone({
	value,
	format = "short",
	showOffset = false,
	showTime = false,
	timeFormat = "short",
	referenceDate,
	locale,
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0
		? undefined
		: childrenProp
	// Get reference date
	const refDate = referenceDate
		? (typeof referenceDate === "string"
			? new Date(referenceDate)
			: referenceDate)
		: new Date()

	// Get timezone information
	const abbreviation = getTimezoneAbbreviation(value, refDate, locale)

	// Build timezone info object
	const info: TimeZoneInfo = {
		abbreviation,
	}

	// Add full name if requested
	if (format === "long") {
		const formatter = new Intl.DateTimeFormat(locale || "en-US", {
			timeZone: value,
			timeZoneName: "long",
		})
		const parts = formatter.formatToParts(refDate)
		const tzPart = parts.find((part) => part.type === "timeZoneName")
		info.fullName = tzPart?.value
	}

	// Add offset if requested
	if (showOffset) {
		const offsetMinutes = getTimezoneOffset(value, refDate)
		info.offsetMinutes = offsetMinutes
		info.offset = formatOffset(offsetMinutes)
		info.isDST = isDaylightSaving(value, refDate)
	}

	// Add current time if requested
	if (showTime) {
		const timeFormatter = new Intl.DateTimeFormat(locale || "en-US", {
			timeZone: value,
			timeStyle: timeFormat,
		})
		info.currentTime = timeFormatter.format(new Date())
	}

	// Build display string
	let display = format === "long" && info.fullName
		? info.fullName
		: abbreviation

	if (showOffset && info.offset) {
		display += ` (${info.offset})`
	}

	if (showTime && info.currentTime) {
		display += `, ${info.currentTime}`
	}

	// Handle render prop
	if (typeof children === "function") {
		return (
			<span
				className={className}
				data-timezone={value}
				data-offset={info.offsetMinutes}
				data-dst={info.isDST}
				{...props}
			>
				{children(info)}
			</span>
		)
	}

	return (
		<span
			className={className}
			data-timezone={value}
			data-offset={info.offsetMinutes}
			data-dst={info.isDST}
			{...props}
		>
			{children || display}
		</span>
	)
}
