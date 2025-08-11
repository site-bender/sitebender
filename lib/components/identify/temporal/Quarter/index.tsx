/**
 * Quarter component
 *
 * Represents a calendar or fiscal quarter of a year.
 * Supports different fiscal year start months.
 *
 * Example usage:
 *
 * // Calendar quarter
 * <Quarter value="2024-Q1" />
 * // → Q1 2024
 *
 * // From date
 * <Quarter value="2024-04-15" />
 * // → Q2 2024
 *
 * // With date range
 * <Quarter value="2024-Q3" showRange />
 * // → Q3 2024 (Jul - Sep)
 *
 * // Fiscal quarter (fiscal year starts in April)
 * <Quarter value="2024-04-15" fiscalYearStart={4} />
 * // → Q1 FY2024
 *
 * // Full format with months
 * <Quarter value="2024-Q2" format="long" showRange />
 * // → 2nd Quarter 2024 (April - June)
 *
 * // With locale
 * <Quarter value="2024-Q1" locale="fr-FR" showRange />
 * // → T1 2024 (janv. - mars)
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"

import getQuarter from "../../../../utilities/calendars/getQuarter/index.ts"
import formatDate from "../../../../utilities/formatters/formatDate/index.ts"
import parseTemporalString from "../../../../utilities/parsers/parseTemporalString/index.ts"

export type Props =
	& Omit<TemporalBaseProps, "showZone" | "timezone" | "calendar">
	& {
		// Display format
		format?: "short" | "medium" | "long"

		// Show date range
		showRange?: boolean

		// Fiscal year start month (1-12, default 1 for January)
		fiscalYearStart?: number

		// Show year
		showYear?: boolean

		// Fiscal year label
		fiscalYearLabel?: string
	}

// Parse quarter format (YYYY-Qn)
function parseQuarterString(
	value: string,
): { year: number; quarter: number } | null {
	const match = value.match(/^(\d{4})-Q([1-4])$/)
	if (!match) return null
	return {
		year: parseInt(match[1]),
		quarter: parseInt(match[2]),
	}
}

// Get fiscal quarter based on fiscal year start
function getFiscalQuarter(date: Date, fiscalYearStart: number): number {
	const month = date.getMonth() + 1
	const adjustedMonth = month >= fiscalYearStart
		? month - fiscalYearStart
		: month + 12 - fiscalYearStart
	return Math.ceil((adjustedMonth + 1) / 3)
}

// Get fiscal year based on fiscal year start
function getFiscalYear(date: Date, fiscalYearStart: number): number {
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	return month >= fiscalYearStart ? year : year - 1
}

// Get quarter start and end dates
function getQuarterDates(
	year: number,
	quarter: number,
	fiscalYearStart: number = 1,
): { start: Date; end: Date } {
	const startMonth = fiscalYearStart + (quarter - 1) * 3 - 1
	const start = new Date(year, startMonth % 12, 1)
	if (startMonth >= 12) start.setFullYear(year + 1)

	const endMonth = startMonth + 3
	const end = new Date(year, endMonth % 12, 0)
	if (endMonth >= 12) end.setFullYear(year + 1)

	return { start, end }
}

export default function Quarter({
	value,
	locale,
	format = "medium",
	showRange = false,
	fiscalYearStart = 1,
	showYear = true,
	fiscalYearLabel = "FY",
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0
		? undefined
		: childrenProp
	let year: number
	let quarter: number
	let isFiscal = fiscalYearStart !== 1

	// Parse the value
	if (typeof value === "string") {
		const parsed = parseQuarterString(value)
		if (parsed) {
			year = parsed.year
			quarter = parsed.quarter
		} else {
			// Parse as date
			const dateParsed = parseTemporalString(value)
			const date = new Date(
				dateParsed.year!,
				dateParsed.month! - 1,
				dateParsed.day!,
			)

			if (isFiscal) {
				year = getFiscalYear(date, fiscalYearStart)
				quarter = getFiscalQuarter(date, fiscalYearStart)
			} else {
				year = dateParsed.year!
				quarter = getQuarter(date)
			}
		}
	} else {
		if (isFiscal) {
			year = getFiscalYear(value, fiscalYearStart)
			quarter = getFiscalQuarter(value, fiscalYearStart)
		} else {
			year = value.getFullYear()
			quarter = getQuarter(value)
		}
	}

	// Get quarter dates
	const { start, end } = getQuarterDates(year, quarter, fiscalYearStart)

	// Build datetime attribute
	const datetime = `${String(year).padStart(4, "0")}-Q${quarter}`

	// Format the display
	let display: string

	// Get localized quarter label
	let quarterLabel: string
	if (format === "short") {
		// Many languages use Q for quarter
		quarterLabel = locale?.startsWith("fr") ? "T" : "Q"
		display = `${quarterLabel}${quarter}`
	} else if (format === "long") {
		// Long format with ordinal
		const ordinals = ["1st", "2nd", "3rd", "4th"]
		const ordinal = new Intl.PluralRules(locale || "en-US", { type: "ordinal" })
			.select(quarter)
		// Note: Using hardcoded "Quarter" as Intl.DisplayNames support for "quarter" is inconsistent
		const quarterWord = "Quarter"
		display = `${ordinals[quarter - 1]} ${quarterWord}`
	} else {
		// Medium format
		quarterLabel = locale?.startsWith("fr") ? "T" : "Q"
		display = `${quarterLabel}${quarter}`
	}

	// Add year if requested
	if (showYear) {
		const yearLabel = isFiscal ? ` ${fiscalYearLabel}${year}` : ` ${year}`
		display += yearLabel
	}

	// Add date range if requested
	if (showRange) {
		const monthFormat: Intl.DateTimeFormatOptions = {
			month: format === "short" ? "short" : "long",
		}

		const startMonth = formatDate(start, locale, monthFormat)
		const endMonth = formatDate(end, locale, monthFormat)

		display += ` (${startMonth} - ${endMonth})`
	}

	// Handle render prop
	if (typeof children === "function") {
		return (
			<time
				dateTime={datetime}
				className={className}
				data-quarter={quarter}
				data-year={year}
				data-fiscal={isFiscal}
				{...props}
			>
				{children({
					display,
					datetime,
					quarter,
					year,
					startDate: start,
					endDate: end,
					isFiscal,
				})}
			</time>
		)
	}

	return (
		<time
			dateTime={datetime}
			className={className}
			data-quarter={quarter}
			data-year={year}
			data-fiscal={isFiscal}
			{...props}
		>
			{children || display}
		</time>
	)
}
