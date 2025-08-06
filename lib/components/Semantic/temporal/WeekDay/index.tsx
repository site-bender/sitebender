/**
 * WeekDay component
 *
 * Represents a day of the week with optional week number, quarter,
 * and other calendar information. Supports various week numbering
 * systems (ISO 8601, US, etc.).
 *
 * Example usage:
 *
 * // Simple weekday
 * <WeekDay value="2024-01-15" />
 * // → Monday
 *
 * // With week number (ISO 8601)
 * <WeekDay value="2024-01-15" showWeek />
 * // → Monday, Week 3
 *
 * // With quarter
 * <WeekDay value="2024-04-01" showQuarter />
 * // → Monday, Q2
 *
 * // Full information
 * <WeekDay 
 *   value="2024-01-15" 
 *   showWeek 
 *   showQuarter
 *   showDayOfYear
 *   locale="en-GB"
 * />
 * // → Monday, Week 3, Q1, Day 15
 *
 * // Different week systems
 * <WeekDay value="2024-01-01" showWeek weekSystem="US" />
 * // → Monday, Week 1 (US week starts on Sunday)
 *
 * // Julian day number
 * <WeekDay value="2024-01-15" showJulianDay />
 * // → Monday (JD 2460325)
 */

import type { TemporalBaseProps, WeekNumberingSystem } from "../../../../types/temporal/index.ts"
import parseTemporalString from "../../../parsers/parseTemporalString/index.ts"
import formatWeekday from "../../../formatters/formatWeekday/index.ts"
import getWeekNumber from "../../../calendars/getWeekNumber/index.ts"
import getQuarter from "../../../calendars/getQuarter/index.ts"
import getJulianDayNumber from "../../../calendars/getJulianDayNumber/index.ts"

export type Props = Omit<TemporalBaseProps, "showZone" | "timezone"> & {
	// Weekday format
	format?: "narrow" | "short" | "long"
	
	// Show week number
	showWeek?: boolean
	
	// Week numbering system
	weekSystem?: WeekNumberingSystem
	
	// Show quarter
	showQuarter?: boolean
	
	// Show day of year
	showDayOfYear?: boolean
	
	// Show Julian day number
	showJulianDay?: boolean
	
	// Show numeric day (1-7)
	showNumeric?: boolean
}

// Get day of year (1-366)
function getDayOfYear(date: Date): number {
	const start = new Date(date.getFullYear(), 0, 0)
	const diff = date.getTime() - start.getTime()
	return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// Get numeric day of week based on locale
function getNumericDayOfWeek(date: Date, locale?: string, weekSystem?: WeekNumberingSystem): number {
	const dayIndex = date.getDay() // 0 = Sunday, 6 = Saturday
	
	// For US system or when explicitly requested, Sunday = 1
	if (weekSystem === "US" || locale?.startsWith("en-US")) {
		return dayIndex === 0 ? 7 : dayIndex
	}
	
	// ISO 8601 and most other systems: Monday = 1, Sunday = 7
	return dayIndex === 0 ? 7 : dayIndex
}

export default function WeekDay({
	value,
	locale,
	calendar,
	format = "long",
	formatOptions,
	showWeek,
	weekSystem = "ISO",
	showQuarter,
	showDayOfYear,
	showJulianDay,
	showNumeric,
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
	
	// Create date object
	const date = new Date(parsed.year!, parsed.month! - 1, parsed.day!)
	
	// Build datetime attribute (full date for context)
	const datetime = `${String(parsed.year).padStart(4, "0")}-${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}`
	
	// Format the weekday
	let display = formatWeekday(date, locale, format)
	
	// Build additional information
	const parts: string[] = [display]
	
	if (showNumeric) {
		const numericDay = getNumericDayOfWeek(date, locale, weekSystem)
		parts.push(`(${numericDay})`)
	}
	
	if (showWeek) {
		const week = getWeekNumber(date, weekSystem)
		// Note: Intl.DisplayNames doesn't support "week", so we use a simple approach
		const weekLabel = "Week"
		parts.push(`${weekLabel} ${week}`)
	}
	
	if (showQuarter) {
		const quarter = getQuarter(date)
		parts.push(`Q${quarter}`)
	}
	
	if (showDayOfYear) {
		const dayOfYear = getDayOfYear(date)
		const dayLabel = "Day"
		parts.push(`${dayLabel} ${dayOfYear}`)
	}
	
	if (showJulianDay) {
		const jd = getJulianDayNumber(date)
		parts.push(`(JD ${jd})`)
	}
	
	// Join parts with appropriate separator
	display = parts.join(", ")
	
	// Handle render prop
	if (typeof children === "function") {
		const additionalInfo = {
			weekNumber: showWeek ? getWeekNumber(date, weekSystem) : undefined,
			quarter: showQuarter ? getQuarter(date) : undefined,
			dayOfYear: showDayOfYear ? getDayOfYear(date) : undefined,
			julianDay: showJulianDay ? getJulianDayNumber(date) : undefined,
			numericDay: showNumeric ? getNumericDayOfWeek(date, locale, weekSystem) : undefined
		}
		
		return (
			<time
				dateTime={datetime}
				className={className}
				data-weekday={date.getDay()}
				data-week={showWeek ? getWeekNumber(date, weekSystem) : undefined}
				data-quarter={showQuarter ? getQuarter(date) : undefined}
				data-day-of-year={showDayOfYear ? getDayOfYear(date) : undefined}
				data-julian-day={showJulianDay ? getJulianDayNumber(date) : undefined}
				{...props}
			>
				{children({ display, datetime, ...additionalInfo })}
			</time>
		)
	}
	
	return (
		<time
			dateTime={datetime}
			className={className}
			data-weekday={date.getDay()}
			data-week={showWeek ? getWeekNumber(date, weekSystem) : undefined}
			data-quarter={showQuarter ? getQuarter(date) : undefined}
			data-day-of-year={showDayOfYear ? getDayOfYear(date) : undefined}
			data-julian-day={showJulianDay ? getJulianDayNumber(date) : undefined}
			{...props}
		>
			{children || display}
		</time>
	)
}