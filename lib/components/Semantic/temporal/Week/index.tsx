/**
 * Week component
 *
 * Represents a calendar week using various week numbering systems.
 * Supports ISO 8601 weeks, US weeks, and other regional systems.
 *
 * Example usage:
 *
 * // ISO week (YYYY-Www format)
 * <Week value="2024-W03" />
 * // → Week 3, 2024
 *
 * // From date with ISO week
 * <Week value="2024-01-15" />
 * // → Week 3, 2024
 *
 * // US week system
 * <Week value="2024-01-15" weekSystem="US" />
 * // → Week 3, 2024 (US)
 *
 * // Show date range
 * <Week value="2024-W03" showRange />
 * // → Week 3, 2024 (Jan 15 - Jan 21)
 *
 * // With locale
 * <Week value="2024-W03" locale="fr-FR" showRange />
 * // → Semaine 3, 2024 (15 janv. - 21 janv.)
 *
 * // Compact format
 * <Week value="2024-W03" format="short" />
 * // → W3 2024
 */

import type { TemporalBaseProps, WeekNumberingSystem } from "../../../../types/temporal/index.ts"
import parseTemporalString from "../../../parsers/parseTemporalString/index.ts"
import formatDate from "../../../formatters/formatDate/index.ts"
import getWeekNumber from "../../../calendars/getWeekNumber/index.ts"
import getWeekStartDate from "../../../calendars/getWeekStartDate/index.ts"

export type Props = Omit<TemporalBaseProps, "showZone" | "timezone" | "calendar"> & {
	// Week numbering system
	weekSystem?: WeekNumberingSystem
	
	// Display format
	format?: "short" | "medium" | "long"
	
	// Show date range
	showRange?: boolean
	
	// Show year
	showYear?: boolean
}

// Parse ISO week format (YYYY-Www)
function parseISOWeek(value: string): { year: number; week: number } | null {
	const match = value.match(/^(\d{4})-W(\d{2})$/)
	if (!match) return null
	return {
		year: parseInt(match[1]),
		week: parseInt(match[2])
	}
}

export default function Week({
	value,
	locale,
	format = "long",
	weekSystem = "ISO",
	showRange = false,
	showYear = true,
	className,
	children,
	...props
}: Props): JSX.Element {
	let year: number
	let weekNumber: number
	let referenceDate: Date
	
	// Parse the value
	if (typeof value === "string") {
		const isoWeek = parseISOWeek(value)
		if (isoWeek) {
			year = isoWeek.year
			weekNumber = isoWeek.week
			// Get the Monday of this ISO week
			const jan4 = new Date(year, 0, 4)
			const dayOfWeek = jan4.getDay()
			const isoWeekStart = new Date(jan4)
			isoWeekStart.setDate(jan4.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
			isoWeekStart.setDate(isoWeekStart.getDate() + (weekNumber - 1) * 7)
			referenceDate = isoWeekStart
		} else {
			// Parse as date
			const parsed = parseTemporalString(value)
			referenceDate = new Date(parsed.year!, parsed.month! - 1, parsed.day!)
			year = parsed.year!
			weekNumber = getWeekNumber(referenceDate, weekSystem)
		}
	} else {
		referenceDate = value
		year = value.getFullYear()
		weekNumber = getWeekNumber(value, weekSystem)
	}
	
	// Get week start date
	const weekStart = getWeekStartDate(referenceDate, weekSystem)
	const weekEnd = new Date(weekStart)
	weekEnd.setDate(weekEnd.getDate() + 6)
	
	// Adjust year for weeks that span year boundaries
	if (weekSystem === "ISO") {
		// In ISO system, week 1 might start in previous year
		if (weekNumber === 1 && referenceDate.getMonth() === 11) {
			year = referenceDate.getFullYear() + 1
		}
		// Or last week might extend into next year
		else if (weekNumber >= 52 && referenceDate.getMonth() === 0) {
			year = referenceDate.getFullYear() - 1
		}
	}
	
	// Build datetime attribute (ISO week format)
	const datetime = `${String(year).padStart(4, "0")}-W${String(weekNumber).padStart(2, "0")}`
	
	// Format the display
	let display: string
	
	// Get localized "Week" label
	const weekLabel = format === "short" ? "W" :
		new Intl.DisplayNames(locale || "en", { type: "dateTimeField" }).of("week") || "Week"
	
	if (format === "short") {
		display = `${weekLabel}${weekNumber}`
		if (showYear) display += ` ${year}`
	} else {
		display = `${weekLabel} ${weekNumber}`
		if (showYear) display += `, ${year}`
		
		if (weekSystem !== "ISO") {
			display += ` (${weekSystem})`
		}
	}
	
	// Add date range if requested
	if (showRange) {
		const rangeFormat: Intl.DateTimeFormatOptions = {
			month: format === "short" ? "numeric" : "short",
			day: "numeric"
		}
		
		const startStr = formatDate(weekStart, locale, rangeFormat)
		const endStr = formatDate(weekEnd, locale, rangeFormat)
		
		display += ` (${startStr} - ${endStr})`
	}
	
	// Handle render prop
	if (typeof children === "function") {
		return (
			<time
				dateTime={datetime}
				className={className}
				data-week-number={weekNumber}
				data-week-year={year}
				data-week-system={weekSystem}
				{...props}
			>
				{children({ 
					display, 
					datetime,
					weekNumber,
					year,
					startDate: weekStart,
					endDate: weekEnd
				})}
			</time>
		)
	}
	
	return (
		<time
			dateTime={datetime}
			className={className}
			data-week-number={weekNumber}
			data-week-year={year}
			data-week-system={weekSystem}
			{...props}
		>
			{children || display}
		</time>
	)
}